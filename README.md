# CodePath

**Aprendé a programar, paso a paso.**

Aplicación educativa para personas que empiezan desde cero. Se trabaja sobre el proyecto Vue.js + Quasar original, correspondiente a CodePath_Proyecto_Vue_Quasar.zip.

- **Integrante:** Joaquín Villalva.
- **Materia:** Aplicaciones Móviles.
- **Docente:** Aragón Lautaro.

## Qué funciona

Inicio, navegación adaptable, catálogo con nueve tarjetas reutilizables y **27 actividades introductorias**: tres por tecnología, con explicación previa, corrección inmediata y resultados de la práctica actual. Se pueden repetir.

Cursos y tutoriales: HTML, CSS, JavaScript, Tutorial de Vue.js, Tutorial de React, SQL, PHP, Java y Node.js.

**Las nueve tecnologías tienen un recorrido inicial disponible:** JavaScript ofrece cinco unidades y diez lecciones; las otras ocho tecnologías, una unidad de dos lecciones cada una. Todas las lecciones tienen explicación, código y cuatro preguntas. Son **26 lecciones y 104 actividades**, más las 27 prácticas introductorias: **131 actividades en total**.

Terminá una lección para habilitar la siguiente, aunque tengas errores. Con 3/4 se muestra **75 % completo**. Podés repetir para llegar al 100 % y siempre se conserva la mejor marca. El índice de Lecciones permite explorar todos los recorridos.

Las actividades se abren en una ventana sobre el catálogo o la lección, con fondo gris desenfocado. El perfil permite editar nombre y avatar y consultar habilidad, nivel, XP, racha e historial. El perfil, las mejores marcas y las lecciones terminadas se guardan en este navegador mediante localStorage. No hay autenticación, backend ni sincronización entre dispositivos. Si el almacenamiento falla, se informa y se continúa en memoria.

Habilidad = aciertos / respuestas de todos los intentos; sin respuestas se muestra «Sin datos». Cada acierto suma 10 XP y cada 100 XP se gana un nivel. La racha aumenta al finalizar una práctica con **más del 40 %** (2/4 o 2/3); terminar con 40 % o menos o abandonar una práctica empezada la reinicia. Los errores se guardan al comprobar la respuesta, incluso si se abandona. Los reintentos también cuentan. La racha y la habilidad son independientes de las mejores marcas de lección; avanzar solo requiere terminar. [Reglas completas y alcance del perfil](docs/perfil-y-actividades.md).

Las prácticas sueltas no completan unidades. Al cerrar o recargar se reinicia el ejercicio abierto, pero se conservan las respuestas realizadas en las estadísticas. Los ejemplos de código se muestran como texto y no se ejecutan.

## Nuevas funciones

### Lecciones en las nueve tecnologías

- **HTML y CSS:** estructura, enlaces, imágenes, formularios, estilos, tipografías, modelo de caja y diseño adaptable.
- **JavaScript:** variables, tipos, operadores, condiciones, bucles y funciones, organizados en cinco unidades.
- **Vue.js y React:** componentes, plantillas o JSX, propiedades, datos reactivos, estado y eventos.
- **SQL y PHP:** consultas, filtros, operaciones sobre datos, sintaxis del servidor y recepción de formularios.
- **Java y Node.js:** tipos, métodos, clases, objetos, módulos y primeras respuestas HTTP.

Son **13 unidades y 26 lecciones**, todas con explicación, ejemplo de código y cuatro actividades de opción múltiple. El catálogo habilita el acceso a los nueve recorridos. El índice de **Lecciones** permite desplegar cada tecnología y consultar sus lecciones disponibles, bloqueadas y terminadas.

### Avanzar, equivocarse y mejorar

1. Elegí una opción y confirmá: el botón permanece deshabilitado hasta seleccionar una respuesta.
2. Recibí una devolución textual con la solución explicada. La respuesta queda bloqueada y no puede contabilizarse dos veces.
3. Terminá las cuatro actividades y abrí los resultados para habilitar la próxima lección, incluso si hubo errores. No se exige un porcentaje mínimo para continuar.
4. Consultá cantidad de actividades, correctas, incorrectas y porcentaje de ese intento; podés volver a la unidad, continuar o repetir.
5. Repetí para mejorar la marca: **3/4 = 75 % completo** y **4/4 = 100 % completo**. Siempre se conserva el mejor intento; obtener 50 % después de 75 % no borra el 75 %.

El porcentaje indica aciertos, no pantallas visitadas. Para llegar al 100 % hay que responder todo correctamente en un mismo intento. Cada repetición empieza sin respuestas ni selección, pero conserva la mejor marca histórica. Un intento abandonado no termina la lección ni desbloquea la siguiente.

Las unidades se habilitan al terminar las lecciones anteriores. El resumen del curso distingue lecciones terminadas del promedio de mejores porcentajes: terminar un recorrido no significa haberlo resuelto al 100 %.

### Actividades con menos desplazamiento

- Ventana amplia sobre la misma página, con fondo gris desenfocado.
- Código y opciones en dos columnas en escritorio; distribución compacta en celular.
- Cierre y botones **Comprobar / Siguiente actividad** siempre visibles mientras se resuelve.
- Concepto de repaso desplegable en las lecciones; explicación introductoria abierta en las prácticas sueltas.
- Resultados compactos con revisión detallada desplegable.
- Foco visible, navegación por teclado dentro del diálogo, devolución enfocada al confirmar y retorno al botón de origen al cerrar.

En pantallas pequeñas o con ejemplos extensos, el contenido puede desplazarse dentro de la ventana sin perder los controles principales.

### Perfil, niveles y progreso local

- Nombre y avatar editables.
- Habilidad general y por tecnología, calculada con todas las respuestas históricas.
- Diez XP por acierto y un nivel adicional por cada cien XP, incluidos los reintentos.
- Racha de prácticas consecutivas terminadas con más del 40 % de aciertos, mejor racha e historial reciente.
- Lecciones terminadas y mejores marcas guardadas en este navegador.

La habilidad histórica puede bajar con los errores; la mejor marca de una lección no baja. Son métricas diferentes. La racha cuenta prácticas, no días. El guardado local conserva el perfil previo y funciona en memoria si el navegador no permite persistir datos. Todavía no hay cuentas, ranking compartido ni sincronización entre dispositivos.

## Instalación y ejecución

Requiere Node.js y npm. Entorno verificado: Node.js 24.21.0. Usar una versión compatible con las dependencias del lockfile.

```bash
npm ci
npm run dev
```

Abrir la dirección que informa Quasar. Para usar un puerto fijo:

```bash
npm run dev -- --hostname 127.0.0.1 --port 9000
```

En PowerShell, si la política del equipo bloquea npm.ps1, usar **npm.cmd** en lugar de npm; no hace falta cambiar la política de ejecución.

```bash
npm run build
npm test
```

El build genera **dist/spa**. Se debe servir por HTTP; no abrir index.html con file://. Se conservan las rutas hash, por ejemplo /#/cursos, para facilitar el alojamiento estático.

## Pruebas de navegador

```bash
npx playwright install chromium
npm run test:e2e
```

Alternativa en Windows con Edge ya instalado, sin descargar Chromium:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm.cmd run test:e2e
```

Playwright inicia el servidor local si no existe uno en 127.0.0.1:9000. Usa una sesión de navegador aislada y sin ventana. Las capturas y trazas quedan en test-results/ y no se versionan.

Última verificación funcional, **1 de octubre de 2026**: `npm run build` correcto y **16 pruebas de lógica e integridad aprobadas**. Se verificaron **33 casos distintos de navegador entre ejecuciones**: la corrida general aprobó 32; se corrigió el selector y la etiqueta accesible del índice, y el caso restante pasó al repetirlo. Incluyen los nueve recorridos, avance con errores, mejora al 100 %, persistencia, rutas inválidas, teclado y pantallas móviles. [Registro y reglas detalladas](docs/recorridos-progreso.md).

## Organización

- src/pages/: Inicio, Cursos, CoursePage, UnitPage, LessonPage, índice de Lecciones, práctica y Perfil.
- src/components/: CourseCard, UnitCard y BrandLogo reutilizables.
- src/layouts/: estructura, encabezado, menú móvil y pie.
- src/router/: rutas, títulos y vista de dirección desconocida.
- src/services/: repositorio central de contenido, separado del progreso del participante.
- src/data/: catálogo, prácticas, fábrica común y recorridos de las nueve tecnologías.
- src/domain/: evaluación, resultados y reglas de desbloqueo.
- src/stores/: perfil, lecciones terminadas y mejores porcentajes con guardado local versionado.
- src/css/: estilos globales y distribución adaptable.
- public/: favicon SVG.
- docs/: análisis, diseño, wireframes, contrato de datos y verificaciones.
- tests/: pruebas de integridad, corrección y navegación.
- quasar.config.js: paleta de Quasar, Roboto, Material Icons y configuración.

Quasar CLI genera el punto de entrada desde src/App.vue. src/main.js se conserva como referencia sin duplicar el montaje; las inicializaciones futuras corresponden a archivos boot configurados en Quasar.

`contentFactory.js` define el formato común de preguntas y lecciones; `javascriptCourse.js`, `javascriptExtras.js` y `technologyCourses.js` contienen los recorridos. Las pantallas solicitan contenido a `src/services/contentRepository.js`, mientras que `src/domain/learning.js` y los stores gestionan finalización y mejores marcas. La publicación del contenido permanece separada del progreso del participante.

Rutas principales: `/#/`, `/#/cursos`, `/#/lecciones` y `/#/perfil`. Cada recorrido usa `/#/cursos/:courseId/unidades/:unitId/lecciones/:lessonId`, con `/actividades` para practicar. Se conservan las direcciones de JavaScript y se comprueba que los identificadores pertenezcan al curso indicado.

## Recorridos y reglas vigentes

[Contenido, porcentajes, desbloqueo y demostración](docs/recorridos-progreso.md). Los datos siguen en JavaScript; no hay conexión a una base compartida ni ranking. Se conservan las actividades en ventana amplia, botones visibles y perfil local.

## Documentación de la entrega

- [Análisis, usuarios, alcance y vistas](docs/analisis.md).
- [Identidad visual y decisiones de interfaz](docs/diseno.md).
- [Manual de identidad visual en PDF (13 páginas)](output/pdf/CodePath_Identidad_Visual.pdf).
- [Manual de identidad visual editable en Word](output/docx/CodePath_Identidad_Visual_Editables.docx).
- [Logos SVG, especificaciones y regeneración del manual](docs/identidad/README.md).
- [Wireframes de Inicio, escritorio y móvil](docs/wireframes/inicio.svg).
- [Wireframes de Cursos, escritorio y móvil](docs/wireframes/cursos.svg).
- [Formato de integración de cursos y actividades](docs/formato-cursos.md).
- [Planificación de siguientes etapas](docs/planificacion.md).
- [Verificaciones y pendientes](docs/verificaciones.md).
- [Correspondencia con los 16 requisitos](docs/requisitos.md).

La entrega es una SPA adaptable a celulares y computadoras. El empaquetado móvil nativo, más unidades y actividades avanzadas y la sincronización de perfiles entre dispositivos quedan para siguientes etapas.
