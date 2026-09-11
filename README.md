# CodePath

**Aprendé a programar, paso a paso.**

Primera entrega de una aplicación educativa para personas que empiezan desde cero. Se trabaja sobre el proyecto Vue.js + Quasar original, correspondiente a CodePath_Proyecto_Vue_Quasar.zip.

- **Integrante:** Joaquín Villalva.
- **Materia:** Aplicaciones Móviles.
- **Docente:** Aragón Lautaro.

## Qué funciona

Inicio, navegación adaptable, catálogo con nueve tarjetas reutilizables y **27 actividades introductorias**: tres por tecnología, con explicación previa, corrección inmediata y resultados de la práctica actual. Se pueden repetir.

Cursos y tutoriales: HTML, CSS, JavaScript, Tutorial de Vue.js, Tutorial de React, SQL, PHP, Java y Node.js.

**JavaScript desde cero ya está disponible:** cinco unidades, diez lecciones y veinte actividades adicionales. El recorrido enseña variables y tipos, operadores, condicionales, bucles y funciones. Cada lección tiene explicación, ejemplo y dos ejercicios; requiere dos aciertos para aprobar. Las lecciones y unidades se desbloquean en orden. Hay **47 actividades en total**, contando las 27 prácticas introductorias.

Los otros ocho cursos siguen como Próximamente, con acceso al curso deshabilitado y prácticas introductorias habilitadas. El índice general de Lecciones y Perfil siguen en desarrollo; las unidades y lecciones de JavaScript sí funcionan.

El avance de JavaScript se mantiene **en memoria mientras navegás por la aplicación**. Se reinicia al recargar o cerrar la pestaña. Las prácticas sueltas reinician sus respuestas al salir y no completan unidades. No hay autenticación, backend, base de datos ni persistencia. Los ejemplos de código se muestran como texto y no se ejecutan.

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

## Organización

- src/pages/: Inicio, Cursos, JavaScriptCoursePage, UnitPage, LessonPage, práctica y vistas en desarrollo.
- src/components/: CourseCard, UnitCard y BrandLogo reutilizables.
- src/layouts/: estructura, encabezado, menú móvil y pie.
- src/router/: rutas, títulos y vista de dirección desconocida.
- src/data/: catálogo, prácticas y javascriptCourse.js con unidades, lecciones y ejercicios.
- src/domain/: evaluación, resultados y reglas de desbloqueo.
- src/stores/: avance compartido en memoria, sin almacenamiento persistente.
- src/css/: estilos globales y distribución adaptable.
- public/: favicon SVG.
- docs/: análisis, diseño, wireframes, contrato de datos y verificaciones.
- tests/: pruebas de integridad, corrección y navegación.
- quasar.config.js: paleta de Quasar, Roboto, Material Icons y configuración.

Quasar CLI genera el punto de entrada desde src/App.vue. src/main.js se conserva como referencia sin duplicar el montaje; las inicializaciones futuras corresponden a archivos boot configurados en Quasar.

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

La entrega es una SPA adaptable a celulares y computadoras. El empaquetado móvil nativo, los recorridos de las otras ocho tecnologías y la persistencia quedan para siguientes etapas.
