# CodePath

**Aprendé a programar, paso a paso.** Aplicación educativa en Vue 3 y Quasar.

- Integrante: Joaquín Villalva.
- Materia: Aplicaciones Móviles. Docente: Aragón Lautaro.

## Etapa 3: Supabase

El contenido se obtiene desde Supabase mediante un repositorio asíncrono central.
Los componentes muestran carga, errores con reintento, catálogos vacíos y contenido
no encontrado. La corrección de práctica se ejecuta mediante una función SQL del
servidor; el navegador no descarga las soluciones antes de responder.

**Estado de conexión:** la integración está implementada y verificada localmente.
La creación del proyecto remoto y la aceptación contra Supabase Cloud requieren
conectar la cuenta del equipo. No hay un proyecto remoto creado desde esta sesión.

La carga inicial conserva los nueve cursos. JavaScript tiene cinco unidades, con
dos lecciones publicadas de cuatro preguntas cada una en la primera unidad; las
otras cuatro unidades se muestran como no disponibles. Sus contenidos anteriores
se preservan como borradores. Los otros ocho recorridos y las 27 preguntas
introductorias se conservan. Las soluciones están en el esquema `private`.

[Documentación y puesta en marcha de Supabase](docs/supabase/README.md).

## Instalación

Requiere Node.js 22 o posterior compatible con las dependencias del lockfile.

1. Crear el proyecto de Supabase del equipo y ejecutar la migración y el seed,
   siguiendo [los pasos detallados](docs/supabase/README.md).
2. Copiar `.env.example` a `.env` y completar `SUPABASE_URL` y
   `SUPABASE_PUBLISHABLE_KEY`. Usar exclusivamente una clave `sb_publishable_…`.
   Estas variables son públicas en el frontend. No usar claves secretas.
3. Ejecutar:

```bash
npm ci
npm run dev
```

En PowerShell, usar `npm.cmd` si npm.ps1 está bloqueado. Para un puerto fijo:

```bash
npm run dev -- --hostname 127.0.0.1 --port 9000
```

```bash
npm run build
npm test
npm run test:e2e
```

El build genera `dist/spa`; servir por HTTP. Se conservan las rutas hash:
`/#/cursos/:courseId/unidades/:unitId/lecciones/:lessonId`, con `/actividades`
para resolver la lección. También existen Inicio, Cursos, Lecciones y Perfil.

Las pruebas de navegador usan Edge y Chrome instalados (escritorio y viewport
móvil). Se pueden ejecutar con otro canal instalado mediante
`PLAYWRIGHT_CHANNEL`. Usan PostgreSQL local en memoria y un adaptador HTTP de
prueba; no consumen un proyecto remoto ni modifican datos reales. No mantener
otros servidores en los puertos 9000 y 54329 al ejecutarlas.

## Modelo y seguridad

- [Diagrama entidad-relación](docs/supabase/modelo.md) y [SVG](docs/supabase/modelo.svg).
- [Diccionario de datos](docs/supabase/diccionario.md).
- [SQL: tablas, claves, restricciones, políticas RLS y función de comprobación](supabase/migrations/202610150001_content.sql).
- [SQL: carga inicial](supabase/seed.sql).
- [SQL: verificaciones administrativas](supabase/verify.sql).
- [Ejemplo de variables de entorno](.env.example).
- [Registro de pruebas, correcciones y aceptación remota pendiente](docs/supabase/pruebas.md).

Cinco tablas públicas contienen cursos, unidades, lecciones, preguntas y opciones.
`private.solutions` contiene una solución por pregunta y su explicación. Las FK
impiden contenidos huérfanos y soluciones de otra pregunta. Se usa `position`
para ordenar y RLS para consultar exclusivamente contenido publicado. No se
conceden permisos de escritura a visitantes.

La RPC `check_practice_answer` valida disponibilidad y pertenencia de la opción,
y devuelve corrección y explicación. La carga de contenido corresponde a las
herramientas administrativas de Supabase; todavía no hay panel administrativo
ni puntajes oficiales de competencia.

## Progreso personal

El nombre, avatar, intentos, mejores marcas, XP y racha permanecen en
localStorage. Completar una lección habilita la siguiente aunque haya errores;
el mejor porcentaje nunca baja. Cada acierto suma 10 XP, cada 100 XP un nivel.
La racha cuenta prácticas terminadas con más del 40 % de aciertos. Si el
almacenamiento falla se informa y se continúa en memoria.

Estos resultados pertenecen a la práctica local, no a un ranking compartido.
No hay autenticación ni sincronización del progreso entre dispositivos. Los
contenidos sí se comparten desde la base de datos. Los ejemplos se muestran
como texto, sin ejecutar código.

## Organización

- `src/services/supabase.js`: cliente único y configuración pública.
- `src/services/contentRepository.js`: consultas, relaciones y RPC.
- `src/composables/useContent.js`: carga, error, reintento y descarte de respuestas antiguas.
- `src/pages/`, `src/components/`, `src/layouts/`: interfaz Vue/Quasar.
- `src/domain/`, `src/stores/`: progreso y perfil personal.
- `supabase/`: migración reproducible, seed y verificación.
- `tests/`: pruebas vigentes de base de datos, repositorio, lógica y navegadores.
- `tests/fixtures/legacy/`: contenido anterior, usado solo para generar el seed.
- `tests/legacy-unit/`, `tests/legacy-e2e/`: pruebas históricas de la fuente local,
  fuera de las suites vigentes.

`npm run db:seed:generate` regenera el seed desde los archivos archivados.
No sobrescribe contenidos remotos. Para nuevas ediciones reproducibles crear
migraciones o exportaciones, además de editar desde Supabase.

## Documentación anterior

Los documentos de etapas anteriores se conservan como antecedentes. Las reglas
de contenido, seguridad y acceso actuales están en `docs/supabase/`.

- [Análisis y usuarios](docs/analisis.md).
- [Identidad visual](docs/diseno.md).
- [Manual PDF](output/pdf/CodePath_Identidad_Visual.pdf) y [Word](output/docx/CodePath_Identidad_Visual_Editables.docx).
- [Logos y regeneración del manual](docs/identidad/README.md).
- [Wireframes](docs/wireframes/cursos.svg).
- [Perfil y actividades locales](docs/perfil-y-actividades.md).
