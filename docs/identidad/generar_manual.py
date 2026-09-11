"""Genera el manual y las variantes SVG desde los recursos locales del proyecto.

Requiere: reportlab y fonttools; npm ci para obtener Roboto de Quasar.
Uso: python docs/identidad/generar_manual.py
En Windows usa Consolas; en otros sistemas definir CODEPATH_MONO_FONT (ruta TTF).
"""
from pathlib import Path
import colorsys
import os
import re
import shutil
import sys

ROOT = Path(__file__).resolve().parents[2]
TMP = ROOT / 'tmp/pdfs'
sys.path.insert(0, str(TMP / 'python'))
from fontTools.ttLib import TTFont as FontToolsFont
from fontTools.pens.svgPathPen import SVGPathPen
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

OUT = ROOT / 'output/pdf/CodePath_Identidad_Visual.pdf'
ASSETS = ROOT / 'docs/identidad/assets'
for folder in (TMP, OUT.parent, ASSETS):
    folder.mkdir(parents=True, exist_ok=True)

FONT_DIR = ROOT / 'node_modules/@quasar/extras/roboto-font'
font_css = (FONT_DIR / 'roboto-font.css').read_text(encoding='utf-8')
font_paths = {}
for weight in (400, 500, 700, 900):
    block = next(b for b in font_css.split('}') if f'font-weight: {weight};' in b)
    relative = re.search(r'url\([\'\"]?([^\)\'\"]+)', block).group(1)
    font = FontToolsFont(FONT_DIR / relative)
    font.flavor = None
    dest = TMP / f'Roboto-{weight}.ttf'
    font.save(dest)
    font_paths[weight] = dest
    pdfmetrics.registerFont(TTFont(f'R{weight}', str(dest)))
mono = Path(os.environ.get('CODEPATH_MONO_FONT', 'C:/Windows/Fonts/consola.ttf'))
if not mono.exists():
    raise FileNotFoundError('Definí CODEPATH_MONO_FONT con la ruta de una fuente monoespaciada TTF.')
pdfmetrics.registerFont(TTFont('Mono', str(mono)))
pdfmetrics.registerFontFamily('R400', normal='R400', bold='R700', italic='R400', boldItalic='R700')
shutil.copyfile(FONT_DIR / 'LICENSE', ASSETS / 'LICENSE-Roboto.txt')

V = '#5B4BDB'; Y = '#FFC857'; I = '#17243D'; B = '#F7F8FF'
W = '#FFFFFF'; G = '#218739'; R = '#C62828'; M = '#536078'; L = '#E0E3EF'; T = '#EEEBFF'
PW, PH = A4
C = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
C.setTitle('CodePath | Manual de identidad visual')
C.setAuthor('Joaquín Villalva')
C.setSubject('Aplicaciones Móviles - identidad visual, logo, tipografía y colorimetría')
C.setCreator('CodePath / ReportLab')
PAGE = 0

def box(x, y, w, h, fill=W, radius=0, stroke=None, sw=1):
    C.setFillColor(HexColor(fill))
    C.setStrokeColor(HexColor(stroke or fill)); C.setLineWidth(sw)
    C.roundRect(x, PH-y-h, w, h, radius, fill=1, stroke=bool(stroke))

def line(x1, y1, x2, y2, color=L, width=1):
    C.setStrokeColor(HexColor(color)); C.setLineWidth(width)
    C.line(x1, PH-y1, x2, PH-y2)

def text(value, x, y, size=11, font='R400', color=I):
    C.setFillColor(HexColor(color)); C.setFont(font, size)
    C.drawString(x, PH-y-size*.82, str(value))

def para(value, x, y, w, size=11, color=I, leading=None, font='R400'):
    p = Paragraph(value, ParagraphStyle('p', fontName=font, fontSize=size,
        leading=leading or size*1.48, textColor=HexColor(color)))
    _, h = p.wrap(w, 1000)
    p.drawOn(C, x, PH-y-h)
    return y+h

def pill(value, x, y, fill=T, color=V, width=None):
    width = width or pdfmetrics.stringWidth(value,'R500',10)+22
    box(x,y,width,25,fill,12)
    text(value,x+11,y+8,10,'R500',color)

def symbol(x,y,s=48,bg=V,fg=W,slash=Y):
    C.saveState(); C.translate(x,PH-y-s); C.scale(s/48,s/48)
    C.setFillColor(HexColor(bg)); C.roundRect(0,0,48,48,14,fill=1,stroke=0)
    C.setStrokeColor(HexColor(fg)); C.setLineWidth(3); C.setLineCap(1); C.setLineJoin(1)
    p=C.beginPath(); p.moveTo(17,31); p.lineTo(10,24); p.lineTo(17,17)
    p.moveTo(31,31); p.lineTo(38,24); p.lineTo(31,17); C.drawPath(p)
    C.setStrokeColor(HexColor(slash)); C.line(27,34,21,14); C.restoreState()

def logo(x,y,s=48,word=I,bg=V,fg=W,slash=Y):
    C.saveState()
    symbol(x,y,s,bg,fg,slash)
    C.setFillColor(HexColor(word))
    t=C.beginText(x+s*1.25, PH-y-s*.70)
    t.setFont('R900',s*.58); t.setCharSpace(-s*.0319); t.textOut('CodePath'); C.drawText(t)
    C.restoreState()

def start(section, title, sub=None):
    global PAGE
    if PAGE: C.showPage()
    PAGE+=1
    box(0,0,PW,PH,B)
    symbol(42,30,24)
    text('CODEPATH  /  IDENTIDAD VISUAL',78,37,9,'R700',M)
    text(f'{PAGE:02}',PW-62,37,10,'R700',V)
    line(42,70,PW-42,70)
    text(section.upper(),42,94,10,'R700',V)
    text(title,42,117,30,'R900')
    if sub: para(sub,42,162,PW-84,11,M)
    line(42,PH-49,PW-42,PH-49)
    text('Joaquín Villalva  ·  Aplicaciones Móviles',42,PH-34,8,'R400',M)
    text('Versión 1.1  /  Septiembre 2026',PW-202,PH-34,8,'R400',M)

def title_small(value,x,y): text(value,x,y,15,'R700')

def svg_symbol(bg=V,fg=W,slash=Y):
    return f'<rect width="48" height="48" rx="14" fill="{bg}"/><path d="m17 17-7 7 7 7m14-14 7 7-7 7" fill="none" stroke="{fg}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="m27 14-6 20" stroke="{slash}" stroke-width="3" stroke-linecap="round"/>'

# Letras convertidas a curvas para que los SVG no dependan de fuentes instaladas.
ff=FontToolsFont(font_paths[900]); glyphs=ff.getGlyphSet(); cmap=ff.getBestCmap()
scale=27.84/ff['head'].unitsPerEm; xpos=60; paths=[]
for char in 'CodePath':
    glyph=glyphs[cmap[ord(char)]]; pen=SVGPathPen(glyphs); glyph.draw(pen)
    paths.append(f'<path transform="translate({xpos:.4f} 33.6) scale({scale:.7f} {-scale:.7f})" d="{pen.getCommands()}"/>')
    xpos+=glyph.width*scale-1.5312
for name,bg,fg,slash,word in [('logo-principal',V,W,Y,I),('logo-negativo',V,W,Y,W),('logo-monocromo',I,W,W,I)]:
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {xpos+2:.2f} 48" role="img" aria-label="CodePath">{svg_symbol(bg,fg,slash)}<g fill="{word}">{"".join(paths)}</g></svg>'
    (ASSETS/f'{name}.svg').write_text(svg,encoding='utf-8')
(ASSETS/'simbolo.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" aria-label="CodePath">{svg_symbol()}</svg>',encoding='utf-8')

# 01 / Portada
PAGE=1
box(0,0,PW,PH,I)
box(360,-100,380,620,V,100)
box(438,465,160,12,Y,6)
logo(48,53,52,word=W)
pill('MANUAL DE MARCA  /  1.1',48,174,Y,I)
text('Identidad',48,232,58,'R900',W)
text('visual',48,295,58,'R900',W)
para('Un lenguaje visual para aprender<br/>a programar, paso a paso.',48,387,430,20,W,27)
symbol(48,510,112)
para('LOGO  /  TIPOGRAFÍA  /  COLOR<br/>COMPONENTES  /  ACCESIBILIDAD',186,541,350,11,W,19,'R700')
line(48,685,PW-48,685,'#536078')
text('Proyecto CodePath',48,710,13,'R700',W)
text('Integrante: Joaquín Villalva',48,736,11,'R400',W)
text('Materia: Aplicaciones Móviles',48,756,11,'R400',W)
text('Docente: Aragón Lautaro',48,776,11,'R400',W)
text('SEPTIEMBRE 2026',PW-164,778,9,'R700',Y)

# 02 / Marca
start('01 / Fundamentos','Una marca que acompaña','CodePath acerca la programación y el desarrollo web a personas que empiezan desde cero.')
box(42,218,511,136,W,18)
text('Aprendé a programar,',64,242,26,'R900',V)
text('paso a paso',64,277,26,'R900',V)
text('Eslogan oficial',64,321,10,'R500',M)
for y,num,title,body in [(386,'01','Claridad','Explicaciones breves, navegación predecible y una acción principal por pantalla.'),(477,'02','Cercanía','Voseo rioplatense: aprendé, elegí, practicá. Retroalimentación respetuosa y concreta.'),(568,'03','Progreso real','Los estados reflejan acciones realizadas. El error abre una oportunidad para volver a intentar.')]:
    pill(num,42,y,width=38); title_small(title,94,y); para(body,94,y+28,445,11,M)
para('<b>Cómo usar este manual.</b> Logo y variantes: páginas 3 a 5. Color y contraste: 6 a 8. Tipografías: 9 y 10. Componentes y aplicaciones: 11 y 12. Recursos y fuentes: 13.',42,687,511,11)

# 03 / Logo maestro
start('02 / Identificador','El logo principal','El símbolo de código y el nombre forman una firma simple, compacta y reconocible.')
box(42,216,511,158,W,18)
logo(86,259,75)
text('Símbolo + denominación',64,348,10,'R500',M)
symbol(72,411,144)
line(72,399,216,399,V); text('48 unidades',104,382,10,'R500',V)
line(228,411,228,555,V); text('H',237,476,12,'R700',V)
title_small('Una forma, tres ideas',285,408)
para('<b>&lt; &gt;</b> Lenguaje de programación.<br/><br/><b>/</b> Trazo amarillo: dirección y avance.<br/><br/><b>Base redondeada.</b> Cercanía y continuidad con las tarjetas de la interfaz.',285,441,260,11)
box(42,597,511,149,T,16)
title_small('Construcción del símbolo',62,618)
para('Cuadrícula de 48 × 48. Esquinas de radio 14. Trazos de 3 unidades, con extremos y uniones redondeados. El nombre conserva la escritura <b>CodePath</b>, sin espacio y con C y P mayúsculas.',62,647,467,11)
text('Fuente de verdad: src/components/BrandLogo.vue',62,719,9,'Mono',V)

# 04 / Variantes
start('03 / Sistema de logos','Versiones y formatos','La versión principal se usa sobre superficies claras. Las variantes amplían sus aplicaciones.')
box(42,214,511,116,W,16); logo(63,237,51); text('Principal / fondos claros',63,306,10,'R500',M)
box(42,345,511,116,I,16); logo(63,368,51,W); text('Negativa / nombre blanco en fondo oscuro',63,437,10,'R500',W)
box(42,476,511,116,W,16); logo(63,499,51,I,I,W,W); text('Monocroma / una tinta oscura y reserva blanca',63,568,10,'R500',M)
title_small('Símbolo reducido / favicon',42,623)
for x,s in [(45,16),(98,24),(162,32),(238,48)]:
    symbol(x,661,s); text(f'{s}px',x,722,9,'R500',M)
para('El favicon reutiliza el símbolo SVG, sin el nombre. Conservá los trazos y comprobá la lectura a tamaño real en el navegador.',332,658,211,11)

# 05 / Normas
start('04 / Uso del logo','Espacio para reconocerlo','Estas reglas de aplicación complementan el componente actual y ordenan las próximas piezas.')
box(42,216,511,160,W,18)
box(95.75,248.75,xpos*57/48+28.5,85.5,T,0,stroke=V)
logo(110,263,57)
text('x = H / 4',63,350,10,'R700',V)
para('<b>Área de seguridad.</b> Dejá al menos x alrededor del conjunto. Medí H sobre el alto del símbolo. Ningún texto, borde, imagen ni otro logo debe invadir esa reserva.',42,400,511,11)
box(42,474,247,111,W,16); box(306,474,247,111,W,16)
title_small('Tamaño digital',60,493)
para('Firma completa: H mínimo 32px.<br/>Símbolo solo: mínimo 16px.<br/>Encabezado actual: 40px / móvil: 36px.',60,522,209,10)
title_small('Tamaño impreso',324,493)
para('Firma completa: H sugerido 10mm.<br/>Símbolo solo: mínimo sugerido 5mm.<br/>Validar en una prueba física.',324,522,209,10)
title_small('Usos que se deben evitar',42,620)
for x,label,mode in [(42,'No deformar','stretch'),(218,'No recolorear','color'),(394,'No girar','rotate')]:
    box(x,650,159,95,W,14)
    if mode=='stretch':
        C.saveState(); C.translate(x+47,PH-666); C.scale(1.5,1); symbol(0,PH,38); C.restoreState()
    elif mode=='color': symbol(x+60,666,38,bg=R,slash=W)
    else:
        C.saveState(); C.translate(x+79,PH-687); C.rotate(18); symbol(-19,PH-19,38); C.restoreState()
    text(label,x+14,723,10,'R700',R)

def metrics(h):
    rgb=tuple(int(h[i:i+2],16) for i in (1,3,5)); rr,gg,bb=[n/255 for n in rgb]
    hh,ll,ss=colorsys.rgb_to_hls(rr,gg,bb); k=1-max(rr,gg,bb)
    cmyk=(0,0,0,1) if k==1 else ((1-rr-k)/(1-k),(1-gg-k)/(1-k),(1-bb-k)/(1-k),k)
    return ' / '.join(map(str,rgb)), f'{round(hh*360)}° / {round(ss*100)}% / {round(ll*100)}%', ' / '.join(str(round(v*100)) for v in cmyk)+' %'

def swatch(y,name,h,role,usage):
    box(42,y,124,138,h,16,stroke=L if h==W else None)
    text(h,56,y+106,13,'Mono',I if h in (Y,W,B) else W)
    text(name,185,y+1,20,'R700')
    text(role,185,y+31,10,'R700',V)
    rgb,hsl,cmyk=metrics(h)
    text('RGB    '+rgb,185,y+54,10,'Mono')
    text('HSL    '+hsl,185,y+72,10,'Mono')
    text('CMYK*  '+cmyk,185,y+90,10,'Mono')
    para(usage,185,y+113,356,10,M,14)

# 06 / Colores primarios
start('05 / Colorimetría','Los colores de la marca','Valores digitales en sRGB. El violeta guía la acción; el amarillo destaca y el azul oscuro sostiene la lectura.')
swatch(219,'Violeta CodePath',V,'PRINCIPAL / QUASAR PRIMARY','Botones principales, enlaces, marca y foco. Siempre con texto blanco en botones rellenos.')
swatch(389,'Amarillo avance',Y,'DETALLE / QUASAR SECONDARY Y WARNING','Detalles, insignias y logros. Usar texto azul oscuro; no usar blanco sobre amarillo.')
swatch(559,'Azul profundo',I,'TEXTO / QUASAR DARK','Títulos, cuerpo, iconos y superficies oscuras de marca.')
para('* CMYK: conversión matemática aproximada, sin perfil ICC. No son valores de imprenta certificados. Ajustar con el proveedor y realizar prueba de color.',42,731,511,9,M,13)

# 07 / Colores funcionales
start('06 / Colorimetría','Fondos y respuestas','Los colores funcionales aportan señales constantes. Cada estado lleva también una etiqueta o un icono.')
for x,y,name,h,role in [(42,218,'Fondo general',B,'Página y áreas de descanso'),(306,218,'Superficie',W,'Tarjetas, paneles y menús'),(42,443,'Correcto',G,'Quasar positive / acierto'),(306,443,'Error',R,'Quasar negative / revisión')]:
    box(x,y,247,197,W,16,stroke=L)
    box(x+14,y+14,219,54,h,10,stroke=L if h in (B,W) else None)
    text(name,x+16,y+82,15,'R700'); text(role,x+16,y+104,9,'R500',M)
    rgb,hsl,cmyk=metrics(h)
    for j,st in enumerate([f'HEX   {h}',f'RGB   {rgb}',f'HSL   {hsl}',f'CMYK* {cmyk}']): text(st,x+16,y+124+j*15,9,'Mono')
para('<b>Apoyos de la interfaz.</b> Texto secundario #536078; bordes #E0E3EF; violeta suave #EEEBFF. Son tonos auxiliares, no sustituyen los siete colores principales.',42,666,511,10,M)
para('* Las aproximaciones CMYK no incorporan papel, tintas ni perfil de salida. El manual está orientado a pantalla y no es un PDF/X de producción gráfica.',42,728,511,9,M,13)

def luminance(h):
    vals=[int(h[i:i+2],16)/255 for i in (1,3,5)]
    vals=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in vals]
    return sum(a*b for a,b in zip(vals,[.2126,.7152,.0722]))
def contrast(a,b):
    lo,hi=sorted([luminance(a),luminance(b)]); return (hi+.05)/(lo+.05)

# 08 / Contraste
start('07 / Accesibilidad','Color que se puede leer','Contrastes calculados con luminancia relativa sRGB. Se evalúa el valor completo; se muestran dos decimales.')
text('MUESTRA',56,221,9,'R700',M); text('COMBINACIÓN',169,221,9,'R700',M); text('RATIO',419,221,9,'R700',M); text('AA TEXTO',482,221,9,'R700',M)
pairs=[(W,V,'Blanco / violeta'),(I,Y,'Azul oscuro / amarillo'),(I,B,'Azul oscuro / fondo'),(M,B,'Texto secundario / fondo'),(W,G,'Blanco / correcto'),(W,R,'Blanco / error'),(W,Y,'Blanco / amarillo')]
for n,(fg,bg,label) in enumerate(pairs):
    yy=247+n*51
    box(42,yy-5,511,44,W,8)
    box(54,yy+2,88,28,bg,7); text('Aa 123',64,yy+10,12,'R700',fg)
    text(label,169,yy+11,10); ratio=contrast(fg,bg)
    text(f'{ratio:.2f}:1',419,yy+11,10,'R700')
    text('Sí' if ratio>=4.5 else 'No',487,yy+11,10,'R700',G if ratio>=4.5 else R)
para('<b>Regla de lectura.</b> WCAG AA exige al menos 4,5:1 para texto normal y 3:1 para texto grande (18pt regular o 14pt en negrita). Los componentes y gráficos que comunican información necesitan 3:1 respecto de colores adyacentes pertinentes.',42,624,511,11)
para('<b>Además del color.</b> Escribir Correcto, Revisá tu respuesta o Próximamente; mantener foco visible y controles cómodos. El verde principal queda cerca del mínimo: no aclararlo ni reducir su opacidad sobre blanco.',42,707,511,10,M)

# 09 / Tipografía
start('08 / Tipografía','Roboto para aprender','Una familia legible y familiar, con buena diferenciación de pesos y soporte completo para el español.')
box(42,216,511,162,W,18)
text('Aa Bb Cc  0123',64,238,49,'R400',V)
text('ABCDEFGHIJKLMNÑOPQRSTUVWXYZ',64,305,20,'R500')
text('abcdefghijklmnñopqrstuvwxyz  áéíóúü ¿? ¡!',64,340,16,'R400')
for yy,weight,label in [(410,400,'Regular / cuerpo y descripciones'),(462,500,'Medium / navegación y etiquetas'),(514,700,'Bold / subtítulos y énfasis'),(566,900,'Black / referencia del nombre de marca')]:
    text(str(weight),42,yy+4,10,'Mono',M)
    text('Aprendé, practicá, progresá.',101,yy,21,f'R{weight}')
    text(label,101,yy+29,9,'R400',M)
para('<b>Fuente en la aplicación.</b> Roboto se carga con @quasar/extras; Arial y sans-serif son alternativas. Los pesos disponibles son 100, 300, 400, 500, 700 y 900. El CSS declara 800 para el logo y algunos títulos: con estas fuentes estáticas, el navegador resuelve ese peso con 900.',42,649,511,10)
para('<b>Recursos.</b> Las muestras de este PDF llevan Roboto incrustada. Los logos SVG exportados tienen letras trazadas. Roboto se distribuye bajo Apache 2.0; se adjunta su licencia con los recursos.',42,723,511,9,M)

# 10 / Jerarquía
start('09 / Tipografía aplicada','Ritmo y jerarquía','La escala mantiene una lectura ordenada y permite que cada pantalla muestre qué hacer a continuación.')
rows=[('Título principal','40-60,8px / peso 800','Interlineado 1,16; escala adaptable.'),('Título de sección','26,4-34,4px / peso 700','Separa bloques de contenido.'),('Título de tarjeta','21,6px / peso 700','Identifica cada curso o tutorial.'),('Texto de interfaz','16px / peso 400','Interlineado habitual 1,6.'),('Estado y ayuda','14px / peso 500','Etiqueta explícita, breve y legible.')]
for n,(label,style,desc) in enumerate(rows):
    yy=215+n*66
    text(label,42,yy,15,'R700'); text(style,267,yy,11,'R500',V)
    text(desc,267,yy+23,10,'R400',M); line(42,yy+51,553,yy+51)
title_small('Código con ancho constante',42,575)
box(42,609,511,91,I,14)
text('const nombre = "CodePath";',62,629,14,'Mono',W)
text('console.log(`Hola, ${nombre}`);',62,657,14,'Mono',Y)
para('Pila de código: Cascadia Code, Consolas, Liberation Mono, monospace. El manual muestra Consolas. Conservar la indentación y habilitar desplazamiento horizontal cuando una línea no entre. Las medidas de interfaz son CSS px; las del PDF son puntos.',42,719,511,10,M)

def button(label,x,y,w=160,kind='primary'):
    fill,fg,stroke=(V,W,None) if kind=='primary' else (W,V,V) if kind=='secondary' else ('#E9EAF2','#596177',None)
    box(x,y,w,48,fill,12,stroke)
    width=pdfmetrics.stringWidth(label,'R500',12)
    text(label,x+(w-width)/2,y+18,12,'R500',fg)

# 11 / Componentes
start('10 / Interfaz','Una familia de componentes','Ejemplos vectoriales del sistema de interfaz. Quasar utiliza la misma paleta en botones, estados y navegación.')
button('Ver cursos',42,216,156)
button('Volver al catálogo',215,216,176,'secondary')
button('Próximamente',408,216,145,'disabled')
text('Principal / violeta y blanco',42,278,9,'R500',M)
text('Secundaria / borde violeta',215,278,9,'R500',M)
text('Acceso deshabilitado',408,278,9,'R500',M)
box(42,321,247,319,W,18,stroke=L)
box(62,342,62,62,'#FFF2D3',14); text('JS',73,356,29,'R900','#6E5208')
text('JavaScript',62,427,23,'R700')
para('Variables, operadores, condiciones, bucles y funciones.',62,467,207,12,M)
pill('Disponible',62,530,'#EBF6EE','#17632A')
button('Explorar curso',62,570,207)
title_small('Forma y espacio',315,329)
para('<b>Botones.</b> Alto principal de 48px, radio 12px y etiqueta clara. Secundarios con borde violeta.<br/><br/><b>Tarjetas.</b> Radio 18px, fondo blanco, borde suave y espacio interior cómodo.<br/><br/><b>Foco.</b> Contorno visible de 3px con separación de 3 a 4px.<br/><br/><b>Iconos.</b> Material Icons en toda la aplicación; abreviaturas legibles para cada tecnología.',315,363,234,11)
box(42,667,511,80,T,14)
para('<b>Estados honestos.</b> Un curso sin recorrido funcional muestra Próximamente y su acceso está deshabilitado. Las prácticas introductorias son una acción separada. Una unidad completada se reconoce por texto, icono y avance real.',62,685,471,10)

# 12 / Aplicaciones
start('11 / Aplicación del sistema','De escritorio a celular','El mismo lenguaje visual se adapta al espacio disponible sin ocultar el acceso a la navegación.')
box(42,218,319,225,W,15,stroke=L)
logo(56,234,22); text('Inicio   Cursos',254,241,7,'R500',M)
line(56,270,347,270)
pill('APRENDIZAJE PASO A PASO',57,282,width=208)
text('Tu primer paso',57,323,23,'R900')
text('en programación.',57,351,23,'R900',V)
button('Ver cursos y tutoriales',57,394,194)
box(390,218,163,338,I,24)
box(398,233,147,306,B,17)
logo(410,251,18)
for y in (255,260,265): line(518,y,530,y,I,1.5)
text('Cursos y',410,290,18,'R900'); text('tutoriales',410,313,18,'R900',V)
box(410,353,122,167,W,12,stroke=L)
box(422,365,36,36,'#FFF2D3',8); text('JS',430,373,16,'R900','#6E5208')
text('JavaScript',422,412,13,'R700')
text('Desde cero',422,435,9,'R400',M)
pill('Disponible',420,458,'#EBF6EE','#17632A',103)
text('Explorar curso',427,497,10,'R700',V)
text('Esquemas de aplicación, no capturas del producto.',42,469,9,'R400',M)
title_small('Reglas adaptables',42,582)
para('<b>Catálogo.</b> Una columna debajo de 600px; dos entre 600 y 1023px; tres desde 1024px.<br/><br/><b>Navegación.</b> Bajo 768px, menú alternativo accesible con los mismos destinos. Los controles principales mantienen un área cómoda para tocar.<br/><br/><b>Contenido.</b> Aprender, practicar y progresar guían el inicio. Los iconos de tecnologías son abreviaturas consistentes: HTML, CSS, JS, Vue, React, SQL, PHP, Java y Node.',42,615,511,11)

# 13 / Entrega
start('12 / Recursos y fuentes','Una identidad para continuar','El manual documenta la marca aplicada y deja recursos reutilizables para las próximas etapas de CodePath.')
title_small('Archivos incluidos',42,221)
for n,(a,b) in enumerate([('logo-principal.svg','Firma a color sobre fondos claros.'),('logo-negativo.svg','Nombre blanco para superficies oscuras.'),('logo-monocromo.svg','Firma en una tinta oscura y reserva blanca.'),('simbolo.svg','Identificador aislado, escalable y apto para favicon.')]):
    text(a,42,255+n*44,11,'Mono',V); text(b,42,274+n*44,10,'R400',M)
para('Ubicación: <b>docs/identidad/assets/</b>. SVG con letras trazadas; sin dependencias de fuentes. El favicon del sitio permanece en public/. El componente BrandLogo es la referencia del logo de la aplicación.',42,444,511,10)
title_small('Fuentes de especificación',42,516)
para('Implementación local: src/components/BrandLogo.vue, src/css/app.scss y quasar.config.js. Tipografía: @quasar/extras/roboto-font y su licencia Apache 2.0. Las variantes y reglas de reserva de este manual complementan esos archivos.',42,547,511,10)
para('<link href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" color="#5B4BDB">W3C WCAG 2.2: contraste mínimo (1.4.3)</link><br/><link href="https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html" color="#5B4BDB">W3C WCAG 2.2: contraste no textual (1.4.11)</link>',42,615,511,10,leading=20)
box(42,680,511,75,T,14)
para('<b>Alcance.</b> Identidad visual y guía digital. Los ratios incluidos verifican combinaciones concretas; no constituyen una auditoría integral WCAG. La impresión profesional requiere ajustar el perfil de salida y validar una prueba física.',62,696,471,10)
C.save()
print(f'Generado: {OUT} ({PAGE} páginas)')
print('SVG: '+', '.join(p.name for p in ASSETS.glob('*.svg')))
