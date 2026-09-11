"""Crea una versión editable en Word del manual de identidad de CodePath.

El texto, las tablas y los valores de color son editables en Word. Los logos se
insertan como imágenes para conservar la geometría; los SVG editables están en
docs/identidad/assets/.
"""
from pathlib import Path
import os
import re
import sys

from PIL import Image, ImageDraw, ImageFont
from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK, WD_LINE_SPACING
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'output/docx/CodePath_Identidad_Visual_Editables.docx'
TMP = ROOT / 'tmp/docx'
OUT.parent.mkdir(parents=True, exist_ok=True)
TMP.mkdir(parents=True, exist_ok=True)

V = '5B4BDB'; Y = 'FFC857'; I = '17243D'; B = 'F7F8FF'; W = 'FFFFFF'
G = '218739'; R = 'C62828'; M = '536078'; L = 'E0E3EF'; T = 'EEEBFF'
FONT = 'Roboto'; MONO = 'Consolas'

def rgb(value):
    value = value.lstrip('#')
    return RGBColor.from_string(value)

def font_for(size, bold=False, color=I, name=FONT):
    f = {'name': name, 'size': size, 'bold': bold, 'color': color}
    return f

def set_cell_shading(cell, fill):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = tcPr.find(qn('w:shd'))
    if shd is None:
        shd = OxmlElement('w:shd'); tcPr.append(shd)
    shd.set(qn('w:fill'), fill)

def set_cell_border(cell, color=L, size='6'):
    tc = cell._tc; tcPr = tc.get_or_add_tcPr()
    borders = tcPr.first_child_found_in('w:tcBorders')
    if borders is None:
        borders = OxmlElement('w:tcBorders'); tcPr.append(borders)
    for edge in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV'):
        tag = 'w:' + edge
        element = borders.find(qn(tag))
        if element is None:
            element = OxmlElement(tag); borders.append(element)
        element.set(qn('w:val'), 'single'); element.set(qn('w:sz'), size)
        element.set(qn('w:space'), '0'); element.set(qn('w:color'), color)

def set_cell_margins(cell, top=100, start=140, bottom=100, end=140):
    tc = cell._tc; tcPr = tc.get_or_add_tcPr()
    margins = tcPr.first_child_found_in('w:tcMar')
    if margins is None:
        margins = OxmlElement('w:tcMar'); tcPr.append(margins)
    for m, val in (('top', top), ('start', start), ('bottom', bottom), ('end', end)):
        node = margins.find(qn('w:' + m))
        if node is None:
            node = OxmlElement('w:' + m); margins.append(node)
        node.set(qn('w:w'), str(val)); node.set(qn('w:type'), 'dxa')

def set_repeat_table_header(row):
    trPr = row._tr.get_or_add_trPr(); el = OxmlElement('w:tblHeader'); el.set(qn('w:val'), 'true'); trPr.append(el)

def cell_text(cell, value, size=9.2, color=I, bold=False, name=FONT, align=None):
    cell.text = ''
    p = cell.paragraphs[0]
    if align is not None: p.alignment = align
    p.paragraph_format.space_after = Pt(0); p.paragraph_format.space_before = Pt(0)
    r = p.add_run(str(value)); r.font.name = name; r._element.rPr.rFonts.set(qn('w:ascii'), name); r._element.rPr.rFonts.set(qn('w:hAnsi'), name)
    r.font.size = Pt(size); r.font.bold = bold; r.font.color.rgb = rgb(color)
    cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
    set_cell_margins(cell)
    set_cell_border(cell)

def style_run(run, size=11, color=I, bold=False, name=FONT, italic=False):
    run.font.name = name; run._element.rPr.rFonts.set(qn('w:ascii'), name); run._element.rPr.rFonts.set(qn('w:hAnsi'), name)
    run.font.size = Pt(size); run.font.bold = bold; run.font.italic = italic; run.font.color.rgb = rgb(color)
    return run

def paragraph(doc, text='', size=10.5, color=I, bold=False, align=None, space_after=6, style=None):
    p = doc.add_paragraph(style=style)
    if align is not None: p.alignment = align
    p.paragraph_format.space_after = Pt(space_after); p.paragraph_format.line_spacing = 1.16
    if text: style_run(p.add_run(text), size, color, bold)
    return p

def rich_paragraph(doc, parts, size=10.5, space_after=6, align=None):
    p = doc.add_paragraph();
    if align is not None: p.alignment = align
    p.paragraph_format.space_after = Pt(space_after); p.paragraph_format.line_spacing = 1.16
    for text_value, opts in parts:
        style_run(p.add_run(text_value), size=size, **opts)
    return p

def add_page_number(paragraph_obj):
    paragraph_obj.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = paragraph_obj.add_run('CodePath  |  Manual de identidad visual  |  ')
    style_run(run, 8, M)
    fld = OxmlElement('w:fldSimple'); fld.set(qn('w:instr'), 'PAGE'); paragraph_obj._p.append(fld)

def setup_document():
    doc = Document()
    sec = doc.sections[0]
    sec.top_margin = Inches(.62); sec.bottom_margin = Inches(.62); sec.left_margin = Inches(.72); sec.right_margin = Inches(.72)
    styles = doc.styles
    normal = styles['Normal']; normal.font.name = FONT; normal._element.rPr.rFonts.set(qn('w:ascii'), FONT); normal._element.rPr.rFonts.set(qn('w:hAnsi'), FONT); normal.font.size = Pt(10.5); normal.font.color.rgb = rgb(I)
    normal.paragraph_format.line_spacing = 1.16; normal.paragraph_format.space_after = Pt(6)
    for key, size in [('Title', 29), ('Heading 1', 23), ('Heading 2', 15), ('Heading 3', 11)]:
        st = styles[key]; st.font.name = FONT; st._element.rPr.rFonts.set(qn('w:ascii'), FONT); st._element.rPr.rFonts.set(qn('w:hAnsi'), FONT); st.font.size = Pt(size); st.font.bold = True; st.font.color.rgb = rgb('000000'); st.paragraph_format.space_before = Pt(8); st.paragraph_format.space_after = Pt(8)
    footer = sec.footer
    add_page_number(footer.paragraphs[0])
    doc.core_properties.title = 'Manual de identidad visual CodePath'
    doc.core_properties.author = 'Joaquín Villalva'
    doc.core_properties.subject = 'Aplicaciones Móviles'
    return doc

def logo_png(path, dark=False, width=920, height=270):
    image = Image.new('RGBA', (width, height), (255, 255, 255, 0)); d = ImageDraw.Draw(image)
    bg = tuple(int(V[i:i+2],16) for i in (0,2,4)); fg = (255,255,255); slash = tuple(int(Y[i:i+2],16) for i in (0,2,4))
    d.rounded_rectangle((12, 38, 204, 230), radius=54, fill=bg)
    d.line((80, 100, 52, 134, 80, 168), fill=fg, width=14, joint='curve')
    d.line((136, 100, 164, 134, 136, 168), fill=fg, width=14, joint='curve')
    d.line((119, 184, 96, 84), fill=slash, width=14)
    font_path = 'C:/Windows/Fonts/arialbd.ttf'
    font = ImageFont.truetype(font_path, 116)
    word_color = fg if dark else tuple(int(I[i:i+2],16) for i in (0,2,4))
    d.text((248, 67), 'CodePath', fill=word_color, font=font)
    image.save(path)

def add_logo(doc, width=Inches(3.2), dark=False):
    path = TMP / ('logo-dark.png' if dark else 'logo-light.png')
    logo_png(path, dark=dark)
    p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_after = Pt(12)
    p.add_run().add_picture(str(path), width=width)

def page_title(doc, kicker, title, subtitle=None):
    p = doc.add_paragraph(); p.paragraph_format.space_after = Pt(3)
    style_run(p.add_run(kicker.upper()), 9, V, True)
    p = doc.add_paragraph(style='Heading 1'); p.paragraph_format.space_before = Pt(0); p.paragraph_format.space_after = Pt(4); style_run(p.add_run(title), 23, '000000', True)
    if subtitle: paragraph(doc, subtitle, 10.5, M, space_after=12)

def heading(doc, title):
    p = doc.add_paragraph(style='Heading 2'); p.paragraph_format.space_before = Pt(8); p.paragraph_format.space_after = Pt(5); style_run(p.add_run(title), 15, '000000', True); return p

def palette_table(doc, rows):
    table = doc.add_table(rows=1, cols=5); table.alignment = WD_TABLE_ALIGNMENT.CENTER; table.autofit = False
    widths = [Inches(1.15), Inches(1.0), Inches(1.25), Inches(1.25), Inches(2.2)]
    headers = ['Muestra', 'HEX', 'RGB', 'HSL', 'Uso recomendado']
    for i, h in enumerate(headers):
        table.columns[i].width = widths[i]; set_cell_shading(table.rows[0].cells[i], I); cell_text(table.rows[0].cells[i], h, 8.5, W, True)
    set_repeat_table_header(table.rows[0])
    for idx, row in enumerate(rows):
        cells = table.add_row().cells
        for i, w in enumerate(widths): cells[i].width = w
        set_cell_shading(cells[0], row[1] if row[1] != W else W); cell_text(cells[0], row[0], 9, I if row[1] in (Y,W,B) else W, True)
        for i, value in enumerate(row[2:]): cell_text(cells[i+1], value, 8.3, I)
        if idx % 2 == 1:
            for c in cells[1:]: set_cell_shading(c, 'F5F6FA')
    paragraph(doc, 'CMYK se expresa como conversión matemática aproximada sin perfil ICC. Para imprenta, ajustar con el proveedor y hacer una prueba física.', 8.5, M, space_after=8)
    return table

def add_cover(doc):
    p = doc.add_paragraph(); p.paragraph_format.space_after = Pt(10); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run('CODEPATH'); style_run(r, 10, V, True)
    add_logo(doc, Inches(3.6))
    p = doc.add_paragraph(style='Title'); p.alignment = WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_after = Pt(8); style_run(p.add_run('Manual de identidad visual'), 29, '000000', True)
    p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_after = Pt(20); style_run(p.add_run('Aprendé a programar, paso a paso'), 16, V, True)
    t = doc.add_table(rows=4, cols=2); t.alignment = WD_TABLE_ALIGNMENT.CENTER; t.autofit = False
    values = [('Proyecto','CodePath'), ('Integrante','Joaquín Villalva'), ('Materia','Aplicaciones Móviles'), ('Docente','Aragón Lautaro')]
    for i,(a,b) in enumerate(values):
        t.rows[i].cells[0].width=Inches(1.5); t.rows[i].cells[1].width=Inches(3.7); set_cell_shading(t.rows[i].cells[0], T); cell_text(t.rows[i].cells[0], a, 9, V, True); cell_text(t.rows[i].cells[1], b, 9.5, I)
    paragraph(doc, 'Versión editable para Word  |  Septiembre 2026', 9, M, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=0)

def add_doc():
    doc = setup_document(); add_cover(doc); doc.add_page_break()
    page_title(doc, '01 / Fundamentos', 'Una marca que acompaña', 'CodePath acerca la programación y el desarrollo web a personas que empiezan desde cero.')
    heading(doc, 'Propósito y tono')
    paragraph(doc, 'La identidad comunica un aprendizaje progresivo: cada pantalla propone un paso claro, permite practicar y devuelve una señal comprensible. El tono usa voseo rioplatense, frases breves y una retroalimentación respetuosa.')
    table = doc.add_table(rows=1, cols=3); table.alignment=WD_TABLE_ALIGNMENT.CENTER
    for i,h in enumerate(['Claridad','Cercanía','Progreso real']): set_cell_shading(table.rows[0].cells[i], T); cell_text(table.rows[0].cells[i], h, 10, V, True)
    for vals in [('Una acción principal por pantalla.','Aprendé, elegí y practicá.','Los estados reflejan acciones realizadas.'), ('Explicaciones breves.','Errores como oportunidades.','Sin avances ficticios.')]:
        cells=table.add_row().cells
        for i,v in enumerate(vals): cell_text(cells[i],v,9.2,I)
    heading(doc, 'Cómo leer este manual')
    paragraph(doc, 'Las páginas siguientes documentan el identificador, las variantes, el espacio de seguridad, la paleta, el contraste, las tipografías y los componentes que se usan en la aplicación. Los valores digitales están expresados en sRGB. Las pautas impresas son recomendaciones para futuras piezas.')
    doc.add_page_break()
    page_title(doc, '02 / Identificador', 'El logo principal', 'El símbolo de código y el nombre forman una firma simple, compacta y reconocible.')
    add_logo(doc, Inches(3.5))
    heading(doc, 'Construcción del símbolo')
    paragraph(doc, 'El símbolo usa una cuadrícula de 48 por 48 unidades, esquinas de radio 14 y trazos de 3 unidades con extremos redondeados. Los signos menor y mayor representan el código; la barra amarilla comunica dirección y avance.')
    specs=doc.add_table(rows=1,cols=3); specs.alignment=WD_TABLE_ALIGNMENT.CENTER
    for i,h in enumerate(['Elemento','Valor','Significado']): set_cell_shading(specs.rows[0].cells[i], I); cell_text(specs.rows[0].cells[i],h,8.8,W,True)
    for row in [('Símbolo','48 x 48','Código y avance'),('Nombre','CodePath','C y P mayúsculas, sin espacio'),('Referencia','BrandLogo.vue','Componente de la aplicación')]:
        cells=specs.add_row().cells
        for i,v in enumerate(row): cell_text(cells[i],v,9.2,I)
    heading(doc, 'Espacio de seguridad')
    paragraph(doc, 'Medir H sobre el alto del símbolo y reservar al menos H/4 alrededor del conjunto. Ningún texto, borde, imagen u otro logo debe invadir esa reserva.')
    doc.add_page_break()
    page_title(doc, '03 / Sistema de logos', 'Versiones y uso', 'La versión principal se usa sobre superficies claras. Las variantes amplían sus aplicaciones.')
    variants=doc.add_table(rows=1,cols=3); variants.alignment=WD_TABLE_ALIGNMENT.CENTER
    for i,h in enumerate(['Versión','Fondo recomendado','Uso']): set_cell_shading(variants.rows[0].cells[i], I); cell_text(variants.rows[0].cells[i],h,8.8,W,True)
    for row in [('Principal','Blanco o #F7F8FF','Firma habitual de la aplicación'),('Negativa','#17243D o violeta','Nombre blanco en superficie oscura'),('Monocroma','Fondo claro','Una tinta azul oscuro y reserva blanca'),('Símbolo','Cualquier superficie con contraste','Favicon, avatar y tamaños reducidos')]:
        cells=variants.add_row().cells
        for i,v in enumerate(row): cell_text(cells[i],v,9.2,I)
    heading(doc, 'Tamaños mínimos')
    paragraph(doc, 'Firma completa: H mínimo 32 px en digital y 10 mm como sugerencia para impresión. Símbolo aislado: mínimo 16 px digital y 5 mm impreso. Validar siempre la lectura a tamaño real.')
    heading(doc, 'Usos que se deben evitar')
    paragraph(doc, 'No deformar, girar, recolorear ni reducir el contraste. No aplicar sombras, contornos o fondos con textura que compitan con el símbolo. Mantener la relación de aspecto y la separación del nombre.')
    doc.add_page_break()
    page_title(doc, '04 / Colorimetría', 'Paleta principal', 'El violeta guía la acción; el amarillo destaca y el azul oscuro sostiene la lectura.')
    palette_table(doc, [
        ('Violeta CodePath',V,'#5B4BDB','91 / 75 / 219','247° / 67% / 58%','Botones principales, enlaces, marca y foco.'),
        ('Amarillo avance',Y,'#FFC857','255 / 200 / 87','40° / 100% / 67%','Detalles, insignias y logros. Texto oscuro.'),
        ('Azul profundo',I,'#17243D','23 / 36 / 61','219° / 45% / 16%','Títulos, cuerpo, iconos y superficies oscuras.'),
    ])
    heading(doc, 'Fondos y respuestas')
    palette_table(doc, [
        ('Fondo general',B,'#F7F8FF','247 / 248 / 255','232° / 100% / 98%','Página y áreas de descanso.'),
        ('Superficie',W,'#FFFFFF','255 / 255 / 255','0° / 0% / 100%','Tarjetas, paneles y menús.'),
        ('Correcto',G,'#218739','33 / 135 / 57','134° / 61% / 33%','Acierto y respuesta correcta.'),
        ('Error',R,'#C62828','198 / 40 / 40','0° / 66% / 47%','Revisión y respuesta incorrecta.'),
    ])
    doc.add_page_break()
    page_title(doc, '05 / Accesibilidad', 'Color que se puede leer', 'Cada estado lleva también una etiqueta o un icono. El significado nunca depende solo del color.')
    table=doc.add_table(rows=1,cols=4); table.alignment=WD_TABLE_ALIGNMENT.CENTER
    for i,h in enumerate(['Combinación','Ratio','Texto normal','Aplicación']): set_cell_shading(table.rows[0].cells[i], I); cell_text(table.rows[0].cells[i],h,8.8,W,True)
    pairs=[('Blanco / violeta','6.04:1','Sí','Botón principal'),('Azul oscuro / amarillo','10.07:1','Sí','Logro o detalle'),('Azul oscuro / fondo','14.62:1','Sí','Títulos'),('Secundario / fondo','5.99:1','Sí','Texto de apoyo'),('Blanco / correcto','4.58:1','Sí','Estado correcto'),('Blanco / error','5.62:1','Sí','Estado de error'),('Blanco / amarillo','1.54:1','No','Evitar texto blanco')]
    for row in pairs:
        cells=table.add_row().cells
        for i,v in enumerate(row): cell_text(cells[i],v,9.2, G if i==2 and v=='Sí' else R if i==2 else I, i==2)
    paragraph(doc, 'WCAG AA recomienda al menos 4,5:1 para texto normal y 3:1 para texto grande. Los componentes y gráficos que comunican información necesitan 3:1 respecto de colores adyacentes pertinentes. Ratios calculados sobre luminancia relativa sRGB.', 9.6, M)
    heading(doc, 'Aplicación accesible')
    paragraph(doc, 'Escribir Disponible, Próximamente, Correcto o Revisá tu respuesta. Mantener foco visible de 3 px con separación de 3 a 4 px y controles con un área cómoda para tocar. El verde #218739 queda cerca del mínimo: no aclararlo ni reducir su opacidad sobre blanco.')
    doc.add_page_break()
    page_title(doc, '06 / Tipografía', 'Roboto para aprender', 'Una familia legible y familiar, con buena diferenciación de pesos y soporte para el español.')
    p=doc.add_paragraph(); style_run(p.add_run('Aa Bb Cc  0123  áéíóúü ¿? ¡!'), 31, V, False)
    heading(doc, 'Pesos y usos')
    typ=doc.add_table(rows=1,cols=3); typ.alignment=WD_TABLE_ALIGNMENT.CENTER
    for i,h in enumerate(['Peso','Muestra','Uso']): set_cell_shading(typ.rows[0].cells[i], I); cell_text(typ.rows[0].cells[i],h,8.8,W,True)
    for weight, sample, use in [('400','Aprendé, practicá, progresá.','Cuerpo y descripciones'),('500','Aprendé, practicá, progresá.','Navegación y etiquetas'),('700','Aprendé, practicá, progresá.','Subtítulos y énfasis'),('900','Aprendé, practicá, progresá.','Referencia del nombre de marca')]:
        cells=typ.add_row().cells; cell_text(cells[0],weight,9.2,V,True); cell_text(cells[1],sample,11,I,weight=='900'); cell_text(cells[2],use,9.2,I)
    heading(doc, 'Jerarquía aplicada')
    hierarchy=doc.add_table(rows=1,cols=3); hierarchy.alignment=WD_TABLE_ALIGNMENT.CENTER
    for i,h in enumerate(['Elemento','Medida / peso','Regla']): set_cell_shading(hierarchy.rows[0].cells[i], I); cell_text(hierarchy.rows[0].cells[i],h,8.8,W,True)
    for row in [('Título principal','40-60,8 px / 800','Interlineado 1,16; escala adaptable'),('Sección','26,4-34,4 px / 700','Separar bloques'),('Tarjeta','21,6 px / 700','Identificar curso o tutorial'),('Interfaz','16 px / 400','Interlineado 1,6'),('Estado','14 px / 500','Etiqueta breve y explícita')]:
        cells=hierarchy.add_row().cells
        for i,v in enumerate(row): cell_text(cells[i],v,9.2,I)
    paragraph(doc, 'El CSS declara peso 800 para el logo y algunos títulos; el paquete estático de Quasar contiene 900 y el navegador resuelve ese peso con el archivo disponible. Para código se usa Cascadia Code, Consolas, Liberation Mono o monospace.', 9.5, M)
    doc.add_page_break()
    page_title(doc, '07 / Componentes', 'Una familia de interfaz', 'Los componentes conservan la misma paleta en botones, estados, tarjetas y navegación.')
    heading(doc, 'Botones')
    btn=doc.add_table(rows=1,cols=3); btn.alignment=WD_TABLE_ALIGNMENT.CENTER
    for i,(label,fill,fg) in enumerate([('Ver cursos',V,W),('Volver al catálogo',W,V),('Próximamente','E9EAF2','596177')]):
        set_cell_shading(btn.rows[0].cells[i], fill); cell_text(btn.rows[0].cells[i],label,10,fg,True,align=WD_ALIGN_PARAGRAPH.CENTER)
    paragraph(doc, 'Alto principal de 48 px, radio 12 px y etiqueta clara. Las acciones principales usan violeta con texto blanco; las secundarias usan borde y texto violeta. Los accesos deshabilitados explican el estado.')
    heading(doc, 'Tarjetas e iconos')
    cards=doc.add_table(rows=1,cols=2); cards.alignment=WD_TABLE_ALIGNMENT.CENTER
    cell_text(cards.rows[0].cells[0], 'Tarjeta de curso\nRadio 18 px\nFondo blanco, borde #E0E3EF\nPadding cómodo', 10, I)
    cell_text(cards.rows[0].cells[1], 'Iconos\nMaterial Icons\nAbreviaturas legibles\nHTML, CSS, JS, Vue, React, SQL, PHP, Java y Node', 10, I)
    heading(doc, 'Estados honestos')
    paragraph(doc, 'Un curso sin recorrido funcional muestra Próximamente y su acceso está deshabilitado. Las prácticas introductorias son una acción separada. Una unidad completada se reconoce por texto, icono y avance real.')
    doc.add_page_break()
    page_title(doc, '08 / Aplicación', 'De escritorio a celular', 'El mismo lenguaje visual se adapta al espacio disponible sin ocultar el acceso a la navegación.')
    resp=doc.add_table(rows=1,cols=3); resp.alignment=WD_TABLE_ALIGNMENT.CENTER
    for i,h in enumerate(['Regla','Escritorio','Celular']): set_cell_shading(resp.rows[0].cells[i], I); cell_text(resp.rows[0].cells[i],h,8.8,W,True)
    for row in [('Catálogo','Tres columnas desde 1024 px','Una columna debajo de 600 px'),('Catálogo intermedio','Dos columnas entre 600 y 1023 px','Tarjetas verticales'),('Encabezado','Navegación completa desde 768 px','Menú alternativo accesible'),('Logo','Símbolo de 40 px','Símbolo de 36 px')]:
        cells=resp.add_row().cells
        for i,v in enumerate(row): cell_text(cells[i],v,9.2,I)
    heading(doc, 'Recorrido visual')
    paragraph(doc, 'Aprender, practicar y progresar guían el inicio. Los cursos y tutoriales se presentan con tarjetas reutilizables; JavaScript cuenta con unidades, lecciones y actividades. Los estados distinguen lo disponible de lo que llegará próximamente.')
    paragraph(doc, 'Los wireframes editables de Inicio y Cursos están en docs/wireframes/. Las reglas de este manual toman como referencia src/components/BrandLogo.vue, src/css/app.scss y quasar.config.js.')
    doc.add_page_break()
    page_title(doc, '09 / Recursos', 'Una identidad para continuar', 'Este documento se puede modificar en Word y los recursos vectoriales se conservan por separado.')
    heading(doc, 'Archivos de marca')
    files=doc.add_table(rows=1,cols=2); files.alignment=WD_TABLE_ALIGNMENT.CENTER
    for i,h in enumerate(['Archivo','Uso']): set_cell_shading(files.rows[0].cells[i], I); cell_text(files.rows[0].cells[i],h,8.8,W,True)
    for row in [('logo-principal.svg','Firma a color sobre fondos claros'),('logo-negativo.svg','Nombre blanco para superficies oscuras'),('logo-monocromo.svg','Firma en una tinta y reserva blanca'),('simbolo.svg','Identificador aislado para favicon o avatar'),('LICENSE-Roboto.txt','Licencia Apache 2.0 de Roboto')]:
        cells=files.add_row().cells; cell_text(cells[0],row[0],9.2,V); cell_text(cells[1],row[1],9.2,I)
    heading(doc, 'Fuentes y referencias')
    paragraph(doc, 'Tipografía local: @quasar/extras/roboto-font. Código: Cascadia Code, Consolas, Liberation Mono o monospace. Referencias de accesibilidad: W3C WCAG 2.2, contraste mínimo y contraste no textual. Los valores CMYK son aproximados y requieren un perfil de salida.')
    heading(doc, 'Información del proyecto')
    paragraph(doc, 'CodePath | Joaquín Villalva | Aplicaciones Móviles | Docente: Aragón Lautaro | Versión 1.1, septiembre de 2026')
    paragraph(doc, 'La versión Word mantiene el contenido del manual PDF, pero deja editables los textos, tablas, colores de celda, tamaños, estilos y datos académicos. Los SVG de assets/ son la fuente vectorial para reemplazar o adaptar el logo.', 9.5, M)
    doc.save(OUT)
    print(f'Generado: {OUT}')

if __name__ == '__main__':
    add_doc()
