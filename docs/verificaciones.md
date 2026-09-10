# Verificaciones y tareas pendientes

Fecha: 10 de septiembre de 2026.

## Resultado de la entrega

Se modificó el proyecto CodePath existente, conservando Vue.js, Quasar, Vue Router y el modo SPA con rutas hash. No se creó un proyecto separado.

## Compilación

Comando ejecutado en este equipo: npm.cmd run build, equivalente a npm run build.

Resultado: **correcto**, salida en dist/spa. Compilación final realizada después de corregir el elemento principal duplicado. Versiones informadas por el build: Quasar 2.31.0, @quasar/app-vite 2.6.2 y Vite 6.4.3. Node.js del entorno: 24.21.0.

## Pruebas de datos y corrección

Comando: npm.cmd test.

**4 pruebas aprobadas**, sin fallos:

- Nueve propuestas con identificadores esperados, textos y representaciones; todos los cursos completos pendientes, sin avances ficticios.
- Veintisiete actividades, tres por tecnología, sin identificadores duplicados ni referencias a cursos inexistentes.
- Comprobación de las 81 alternativas: corrección consistente, explicación correspondiente y rechazo de opciones inválidas.
- Cálculo de resultados para sesiones vacías, todo correcto, todo incorrecto y respuestas mixtas.

## Pruebas de interfaz

Comando: npm.cmd run test:e2e, con PLAYWRIGHT_CHANNEL=msedge.

**16 pruebas aprobadas**, sin fallos, en una instancia de Edge/Chromium aislada y sin ventana:

- Inicio, llamada al catálogo, nueve tarjetas y nueve accesos a cursos completos deshabilitados.
- Botón principal con el color calculado rgb(91, 75, 219), correspondiente a #5B4BDB.
- Enlaces de práctica para las nueve tecnologías.
- Recorrido completo por cada práctica: una respuesta incorrecta y dos correctas, explicación inmediata y resultado real de 2/3.
- Imposibilidad de comprobar dos veces la misma respuesta mediante la interfaz; reinicio con cero respuestas.
- Menú móvil con cuatro accesos, cierre con Escape, retorno del foco al botón, cierre al navegar y foco en un único elemento principal.
- Recarga de la práctica sin restaurar respuestas; cambio de tecnología sin mezclar sesiones.
- Inicio, Cursos, práctica de Node.js, Lecciones y Perfil sin desborde horizontal a **320, 390, 768 y 1440 px**.
- Catálogo con una, dos o tres columnas según el ancho.
- Avisos explícitos en Lecciones y Perfil; rutas inexistentes y práctica de tecnología desconocida.
- Ausencia de errores de JavaScript en el recorrido de Inicio, catálogo y enlaces de escritorio observado por la prueba.

Las pruebas están en tests/practice.test.js y tests/e2e/codepath.spec.js. La configuración de navegador está en playwright.config.js. Las capturas y trazas se generan en test-results/.

## Revisión visual

Se revisaron capturas de Inicio en escritorio y móvil, del catálogo en escritorio y de una práctica móvil. Los wireframes de Inicio y Cursos se renderizaron y revisaron en PNG, cada uno con versiones de escritorio y móvil.

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

- Completar unidades y lecciones; actualmente solo existen tres actividades introductorias por tecnología.
- Agregar más formatos de ejercicio; no se ejecuta código escrito por el usuario.
- Incorporar guardado de progreso, historial, logros y Perfil funcional.
- Definir autenticación, backend y base de datos cuando el alcance lo requiera.
- Revisar el contenido con el docente y probarlo con estudiantes principiantes.
- Probar en celulares físicos, Safari, Firefox y lectores de pantalla; las pruebas actuales usan Edge/Chromium con tamaños de viewport.
- Evaluar empaquetado móvil y despliegue. Esta entrega es una SPA adaptable.
- Mantener dependencias: la instalación informó cuatro avisos de seguridad, dos de nivel bajo y dos moderado. No se aplicaron actualizaciones automáticas fuera del alcance ni se realizó una auditoría de seguridad.
