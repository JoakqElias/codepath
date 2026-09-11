# Verificaciones y tareas pendientes

Actualización: 11 de septiembre de 2026.

## Resultado de la entrega

Se modificó el proyecto CodePath existente, conservando Vue.js, Quasar, Vue Router y el modo SPA con rutas hash. No se creó un proyecto separado. Ahora incluye el recorrido inicial de JavaScript con cinco unidades, diez lecciones y veinte ejercicios, además de las 27 prácticas introductorias.

## Compilación

Comando ejecutado en este equipo: npm.cmd run build, equivalente a npm run build.

Resultado: **correcto**, salida en dist/spa. Compilación realizada con las nuevas vistas, datos, eventos y reglas de avance. Versiones informadas por el build: Quasar 2.31.0, @quasar/app-vite 2.6.2 y Vite 6.4.3. Node.js del entorno: 24.21.0.

## Pruebas de datos y corrección

Comando: npm.cmd test.

**7 pruebas aprobadas**, sin fallos:

- Nueve propuestas con identificadores esperados, textos y representaciones; JavaScript disponible y ocho cursos pendientes, sin avances ficticios.
- Veintisiete actividades, tres por tecnología, sin identificadores duplicados ni referencias a cursos inexistentes.
- Comprobación de las 81 alternativas: corrección consistente, explicación correspondiente y rechazo de opciones inválidas.
- Cálculo de resultados para sesiones vacías, todo correcto, todo incorrecto y respuestas mixtas.
- Cinco unidades, diez lecciones, veinte actividades específicas y ausencia de colisiones entre los 47 identificadores de ejercicios. Corrección de las 60 opciones adicionales del recorrido.
- Desbloqueo secuencial de las diez lecciones y transición Disponible → Completada de cada unidad.
- Rechazo de respuestas incompletas, incorrectas, repetidas, ajenas o pertenecientes a una lección bloqueada. Los reintentos no duplican ni borran aprobaciones.

## Pruebas de interfaz

Comando: npm.cmd run test:e2e, con PLAYWRIGHT_CHANNEL=msedge.

**19 pruebas verificadas con resultado aprobado**, en una instancia de Edge/Chromium aislada y sin ventana. La ejecución inicial aprobó 18; una práctica introductoria se reinició mientras se ejecutaba también el build. Se repitió esa prueba con los archivos estables y pasó. No quedan fallos pendientes.

- Inicio, llamada al catálogo, nueve tarjetas y ocho accesos a cursos completos deshabilitados, más acceso real al recorrido de JavaScript.
- Botón principal con el color calculado rgb(91, 75, 219), correspondiente a #5B4BDB.
- Selección de las nueve prácticas mediante botones que emiten el evento al padre; también selección del recorrido de JavaScript.
- Recorrido completo por cada práctica: una respuesta incorrecta y dos correctas, explicación inmediata y resultado real de 2/3.
- Imposibilidad de comprobar dos veces la misma respuesta mediante la interfaz; reinicio con cero respuestas.
- Menú móvil con cuatro accesos, cierre con Escape, retorno del foco al botón, cierre al navegar y foco en un único elemento principal.
- Recarga de la práctica sin restaurar respuestas; cambio de tecnología sin mezclar sesiones.
- Inicio, Cursos, práctica de Node.js, Lecciones, Perfil, recorrido JavaScript, unidad, lección y ejercicio sin desborde horizontal a **320, 390, 768 y 1440 px**.
- Catálogo con una, dos o tres columnas según el ancho.
- Avisos explícitos en Lecciones y Perfil; rutas inexistentes y práctica de tecnología desconocida.
- Ausencia de errores de JavaScript en el recorrido de Inicio, catálogo y enlaces de escritorio observado por la prueba.
- Recorrido completo de JavaScript: veinte respuestas correctas aprueban las diez lecciones y completan las cinco unidades. El resumen final muestra 10 de 10 y recargar vuelve a 0 de 10.
- En móvil, un intento con un error no aprueba; reintentar correctamente habilita la siguiente lección. Repasar luego con errores no borra la aprobación anterior.
- Bloqueos efectivos al pegar URLs de unidades, lecciones y ejercicios, incluso al cambiar parámetros de la misma ruta. Unidades y lecciones inexistentes muestran recuperación hacia el catálogo.

Las pruebas están en tests/practice.test.js, tests/learning.test.js y tests/e2e/{codepath,learning}.spec.js. La configuración de navegador está en playwright.config.js. Las capturas y trazas se generan en test-results/. La repetición se ejecutó con npm.cmd run test:e2e -- --grep 'práctica completa de JavaScript' --output test-results/recheck-javascript.

## Revisión visual

Se revisaron capturas de Inicio, catálogo y práctica en la entrega inicial. En esta ampliación se revisaron el recorrido de JavaScript en escritorio y móvil y la lectura de una lección en móvil. Los wireframes de Inicio y Cursos tienen versiones de escritorio y móvil y vistas previas PNG.

Fuentes editables: docs/wireframes/inicio.svg y docs/wireframes/cursos.svg. Vistas previas: docs/wireframes/previews/inicio.png y docs/wireframes/previews/cursos.png.

Se verificaron contraste, legibilidad, jerarquía, presencia de las representaciones de tecnologías, menú alternativo y distinción entre prácticas disponibles y cursos pendientes.

## Contraste de la paleta

Relaciones calculadas mediante luminancia relativa sRGB:

- Blanco sobre violeta principal: **6,04:1**.
- Azul oscuro sobre amarillo: **10,07:1**.
- Texto secundario #536078 sobre fondo #F7F8FF: **5,99:1**.
- Verde #218739 sobre blanco: **4,58:1**.
- Rojo #C62828 sobre blanco: **5,62:1**.

Estas combinaciones superan 4,5:1 para texto normal. Los estados también tienen texto e íconos. Esta comprobación no constituye una auditoría integral con tecnologías de asistencia.

## Problemas corregidos

- Curso marcado como disponible sin contenido funcional.
- Barras de avance y promesas de guardado sin implementación.
- Portada centrada exclusivamente en JavaScript.
- Navegación oculta en celular sin alternativa.
- Colores de Quasar sin configurar con la identidad solicitada.
- Falta de logo reutilizable, favicon, recuperación de rutas y documentación académica.
- src/main.js con un arranque paralelo que Quasar CLI no utiliza; ahora explica el punto de entrada real.
- Script lint que invocaba ESLint sin dependencia ni configuración: se retiró. No se presenta el proyecto como analizado por ESLint.
- Elemento main duplicado detectado por la prueba móvil: se utiliza el main propio de QPage y se mantiene el foco accesible.

## Pendientes y límites

### Manual de identidad visual (11 de septiembre de 2026)

- PDF final de 13 páginas, renderizado y revisado visualmente página por página: sin texto recortado ni superpuesto en la versión entregada.
- Texto extraíble verificado, incluidos los datos académicos, colores y nombres de fuentes.
- Roboto y Consolas incrustadas; SVG de logos con letras convertidas en curvas, sin fuentes externas.
- Ratios de contraste calculados sobre los valores sRGB del proyecto. CMYK identificado como aproximación sin perfil ICC.
- Se incluyen el generador, sus dependencias y la licencia de Roboto para reproducir el documento y reutilizar los logos.
- Esta ampliación agrega documentación y recursos de marca. Las verificaciones funcionales de la aplicación están detalladas arriba; no se modificó su código para producir el PDF.

### Próximas etapas

- Ampliar JavaScript con temas avanzados y desarrollar los recorridos de las otras ocho tecnologías. Ya existen cinco unidades funcionales de JavaScript y tres prácticas introductorias por tecnología.
- Agregar más formatos de ejercicio; no se ejecuta código escrito por el usuario.
- Incorporar persistencia entre sesiones, historial, logros y Perfil funcional. El avance durante la navegación ya funciona en memoria.
- Definir autenticación, backend y base de datos cuando el alcance lo requiera.
- Revisar el contenido con el docente y probarlo con estudiantes principiantes.
- Probar en celulares físicos, Safari, Firefox y lectores de pantalla; las pruebas actuales usan Edge/Chromium con tamaños de viewport.
- Evaluar empaquetado móvil y despliegue. Esta entrega es una SPA adaptable.
- Mantener dependencias: la instalación informó cuatro avisos de seguridad, dos de nivel bajo y dos moderado. No se aplicaron actualizaciones automáticas fuera del alcance ni se realizó una auditoría de seguridad.
