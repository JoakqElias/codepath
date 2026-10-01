# Verificaciones y tareas pendientes

**Ampliación del 1 de octubre:** [recorridos y avance por porcentajes](recorridos-progreso.md). Las cantidades y reglas que siguen son históricas.

**Registro vigente de la segunda entrega:** [pruebas del 17 de septiembre](recorridos-progreso.md). Los resultados y cantidades que siguen son registros históricos de versiones anteriores.

Actualización: 16 de septiembre de 2026. Las verificaciones históricas del 11 de septiembre se conservan debajo; la ampliación actual incorpora perfil persistente y actividades en ventanas. Las reglas vigentes están en [Perfil y actividades](perfil-y-actividades.md).

## Resultado de la entrega

Se modificó el proyecto CodePath existente, conservando Vue.js, Quasar, Vue Router y el modo SPA con rutas hash. No se creó un proyecto separado. Ahora incluye el recorrido inicial de JavaScript con cinco unidades, diez lecciones y veinte ejercicios, además de las 27 prácticas introductorias.

## Compilación

Comando ejecutado en este equipo: npm.cmd run build, equivalente a npm run build.

Resultado: **correcto**, salida en dist/spa. Compilación realizada con las nuevas vistas, datos, eventos y reglas de avance. Versiones informadas por el build: Quasar 2.31.0, @quasar/app-vite 2.6.2 y Vite 6.4.3. Node.js del entorno: 24.21.0.

## Pruebas de datos y corrección

Comando: npm.cmd test.

**11 pruebas aprobadas**, sin fallos (las siete originales más cuatro de perfil):

- Nueve propuestas con identificadores esperados, textos y representaciones; JavaScript disponible y ocho cursos pendientes, sin avances ficticios.
- Veintisiete actividades, tres por tecnología, sin identificadores duplicados ni referencias a cursos inexistentes.
- Comprobación de las 81 alternativas: corrección consistente, explicación correspondiente y rechazo de opciones inválidas.
- Cálculo de resultados para sesiones vacías, todo correcto, todo incorrecto y respuestas mixtas.
- Cinco unidades, diez lecciones, veinte actividades específicas y ausencia de colisiones entre los 47 identificadores de ejercicios. Corrección de las 60 opciones adicionales del recorrido.
- Desbloqueo secuencial de las diez lecciones y transición Disponible → Completada de cada unidad.
- Rechazo de respuestas incompletas, incorrectas, repetidas, ajenas o pertenecientes a una lección bloqueada. Los reintentos no duplican ni borran aprobaciones.
- Habilidad ponderada por respuestas, XP y subida de nivel; racha estrictamente mayor al 40 %, mejor racha e interrupciones.
- Respuestas y finalizaciones idempotentes; recuperación de JSON corrupto e intentos activos al recargar.

## Ampliación de perfil y ventana de actividades del 16 de septiembre

Se verificaron los **23 escenarios de navegador** en Edge/Chromium en ejecuciones sucesivas: 11 escenarios de catálogo, prácticas y navegación; 6 comprobaciones de anchos, rutas y recorrido completo; y una ejecución final de 6 escenarios de perfil, foco y bloqueos. No se presenta como una única ejecución completa sin fallos: las primeras pasadas detectaron el foco al cerrar, una página de error incompatible con el diálogo y una espera faltante para su animación. Se corrigieron y se repitieron los escenarios afectados, con resultado aprobado.

- Ventana sobre el catálogo con fondo gris desenfocado; fondo inerte, navegación con Tab contenida, Escape, confirmación de abandono y regreso del foco al disparador.
- Sin desborde de página ni del contenido del diálogo a 320, 390, 768 y 1440 px.
- Perfil vacío sin porcentajes ficticios, edición de nombre y avatar, habilidad general y por tecnología, XP, subida de nivel, racha, mejor racha e historial.
- Racha que aumenta con prácticas suficientes y se reinicia al fallar o abandonar. Las respuestas erróneas se conservan; resultados y XP no se duplican por cerrar o recargar.
- Persistencia de identidad, porcentajes y racha después de recargar; las diez lecciones de JavaScript también permanecen completadas.
- Reintentos, desbloqueo secuencial, acceso directo a rutas e identificadores desconocidos.
- Recuperación ante almacenamiento corrupto y aviso al impedir el navegador guardar datos.
- Revisión de capturas del diálogo y el perfil en escritorio y móvil. El servidor de desarrollo emitió avisos de ResizeObserver durante algunos cambios de distribución; no impidieron las comprobaciones ni aparecieron excepciones de aplicación en los recorridos que las registran.

Las pruebas nuevas están en tests/profile.test.js y tests/e2e/profile.spec.js. Las capturas de esta ampliación se generan en test-results/modal-{escritorio,movil}.png y test-results/perfil-{escritorio,movil}.png. El detalle de las reglas está en docs/perfil-y-actividades.md.

## Pruebas de interfaz de la entrega del 11 de septiembre

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
- Ampliar el perfil local con insignias, reinicio explícito del progreso, migraciones y sincronización entre dispositivos. Persistencia local, niveles, habilidad, rachas e historial ya funcionan en la ampliación del 16 de septiembre.
- Definir autenticación, backend y base de datos cuando el alcance lo requiera.
- Revisar el contenido con el docente y probarlo con estudiantes principiantes.
- Probar en celulares físicos, Safari, Firefox y lectores de pantalla; las pruebas actuales usan Edge/Chromium con tamaños de viewport.
- Evaluar empaquetado móvil y despliegue. Esta entrega es una SPA adaptable.
- Mantener dependencias: la instalación informó cuatro avisos de seguridad, dos de nivel bajo y dos moderado. No se aplicaron actualizaciones automáticas fuera del alcance ni se realizó una auditoría de seguridad.
