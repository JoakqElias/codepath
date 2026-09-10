# CodePath

**Aprendé a programar, paso a paso.**

Primera entrega de una aplicación educativa para personas que empiezan desde cero. Se trabaja sobre el proyecto Vue.js + Quasar original, correspondiente a CodePath_Proyecto_Vue_Quasar.zip.

- **Integrante:** Joaquín Villalva.
- **Materia:** Aplicaciones Móviles.
- **Docente:** Aragón Lautaro.

## Qué funciona

Inicio, navegación adaptable, catálogo con nueve tarjetas reutilizables y **27 actividades introductorias**: tres por tecnología, con explicación previa, corrección inmediata y resultados de la práctica actual. Se pueden repetir.

Cursos y tutoriales: HTML, CSS, JavaScript, Tutorial de Vue.js, Tutorial de React, SQL, PHP, Java y Node.js.

Los **cursos completos siguen como Próximamente**, con acceso deshabilitado. Las prácticas tienen su propio botón habilitado porque sí son funcionales. Lecciones y Perfil indican que están en desarrollo. No hay autenticación, backend, base de datos ni guardado de progreso. Salir de la práctica o recargar la página reinicia sus respuestas. Los ejemplos de código se muestran como texto y no se ejecutan.

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

- src/pages/: Inicio, Cursos, práctica y vistas en desarrollo.
- src/components/: CourseCard y BrandLogo reutilizables.
- src/layouts/: estructura, encabezado, menú móvil y pie.
- src/router/: rutas, títulos y vista de dirección desconocida.
- src/data/: catálogo y actividades, separados de la presentación.
- src/domain/: evaluación de respuestas y cálculo de resultados.
- src/css/: estilos globales y distribución adaptable.
- public/: favicon SVG.
- docs/: análisis, diseño, wireframes, contrato de datos y verificaciones.
- tests/: pruebas de integridad, corrección y navegación.
- quasar.config.js: paleta de Quasar, Roboto, Material Icons y configuración.

Quasar CLI genera el punto de entrada desde src/App.vue. src/main.js se conserva como referencia sin duplicar el montaje; las inicializaciones futuras corresponden a archivos boot configurados en Quasar.

## Documentación de la entrega

- [Análisis, usuarios, alcance y vistas](docs/analisis.md).
- [Identidad visual y decisiones de interfaz](docs/diseno.md).
- [Wireframes de Inicio, escritorio y móvil](docs/wireframes/inicio.svg).
- [Wireframes de Cursos, escritorio y móvil](docs/wireframes/cursos.svg).
- [Formato de integración de cursos y actividades](docs/formato-cursos.md).
- [Planificación de siguientes etapas](docs/planificacion.md).
- [Verificaciones y pendientes](docs/verificaciones.md).

La entrega es una SPA adaptable a celulares y computadoras. El empaquetado móvil nativo, el recorrido completo por unidades y la persistencia quedan para siguientes etapas.
