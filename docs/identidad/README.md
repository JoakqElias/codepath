# Identidad visual de CodePath

[Abrir el manual de identidad visual (PDF, 13 páginas)](../../output/pdf/CodePath_Identidad_Visual.pdf).

[Abrir la versión editable para Word](../../output/docx/CodePath_Identidad_Visual_Editables.docx).

Versión 1.1, septiembre de 2026. Proyecto de Joaquín Villalva para Aplicaciones Móviles, docente Aragón Lautaro.

## Contenido

El manual presenta el propósito y tono de marca, construcción y significado del logo, versiones, espacio de seguridad, tamaños mínimos, usos incorrectos, paleta completa, contraste, tipografías, jerarquías y ejemplos de componentes y distribución adaptable.

Los valores digitales están expresados en sRGB (HEX, RGB y HSL). CMYK es una conversión aproximada; requiere ajuste con un perfil de imprenta y prueba física. El documento no es PDF/X ni una certificación de accesibilidad integral.

## Logos para reutilizar

- [Principal](assets/logo-principal.svg): símbolo violeta y amarillo con nombre azul oscuro, para fondos claros.
- [Negativo](assets/logo-negativo.svg): nombre blanco para fondos oscuros. Su fondo es transparente; al verlo sobre blanco, el nombre no se distingue.
- [Monocromo](assets/logo-monocromo.svg): firma en una tinta azul oscuro y reserva blanca, para fondos claros.
- [Símbolo](assets/simbolo.svg): versión sin nombre, adecuada para favicon o avatar.

Los archivos son vectoriales y las letras están convertidas a curvas. Mantener la relación de aspecto; no estirar. Reservar al menos un cuarto del alto del símbolo alrededor del logo. Se adjunta la [licencia Apache 2.0 de Roboto](assets/LICENSE-Roboto.txt).

El símbolo coincide con `src/components/BrandLogo.vue`. En la firma normalizada a 48 unidades de alto, la separación entre símbolo y nombre es de 12 unidades y la tipografía mide 27,84 unidades con espaciado de -0,055em. El peso CSS 800 usa el archivo estático 900 que trae el paquete de Quasar. El SVG utiliza ese mismo peso y permite reproducir el nombre sin tener Roboto instalada.

## Regenerar el documento

La aplicación no requiere Python. Estas dependencias solo se necesitan para volver a producir el manual:

```bash
npm ci
python -m pip install -r docs/identidad/requirements.txt
python docs/identidad/generar_manual.py
```

Roboto se obtiene de `node_modules/@quasar/extras/roboto-font`. Para código se usa Consolas de Windows. En otro sistema, definir `CODEPATH_MONO_FONT` con la ruta de una fuente TTF monoespaciada compatible y con permiso de incrustación; actualizar la descripción de la muestra si se cambia de familia. No se redistribuyen archivos TTF de Consolas.

El generador escribe el PDF en `output/pdf/` y los SVG en `docs/identidad/assets/`. Usa `tmp/pdfs/` para fuentes temporales; esa carpeta no se versiona y se puede eliminar después de revisar el resultado. No requiere conexión a Internet durante la generación si las dependencias ya están instaladas.

Para revisar la salida visual con Poppler:

```bash
pdftoppm -r 120 -png output/pdf/CodePath_Identidad_Visual.pdf tmp/pdfs/manual
```

Las páginas 11 y 12 muestran esquemas vectoriales de aplicación de la marca, no capturas del producto. Las reglas de reserva y tamaños impresos son pautas complementarias del manual, mientras que colores, fuentes, radios y puntos de adaptación toman como referencia el proyecto implementado.
