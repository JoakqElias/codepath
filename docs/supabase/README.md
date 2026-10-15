# Etapa 3: contenidos compartidos en Supabase

## Registro del proyecto

- **Nombre preparado:** `codepath-contenidos`.
- **Propósito:** servir cursos, unidades, lecciones, preguntas y opciones publicados; corregir respuestas de práctica en el servidor.
- **Equipo:** CodePath. La organización propietaria se elige en la cuenta Supabase del equipo.
- **Estado remoto:** pendiente de creación/conexión a una cuenta autorizada. No se dispone de una conexión Supabase en esta sesión. Este registro no afirma que exista un proyecto remoto.
- **Organización:** `public` contiene cinco tablas de lectura; `private.solutions` guarda soluciones y explicaciones. Solo `public` se expone en la Data API.
- **Credenciales:** no se registran contraseñas, tokens de administración ni claves secretas en esta documentación.

La implementación, el SQL, el contenido inicial y las pruebas locales están incluidos. El cierre de la entrega requiere ejecutar esos scripts en el proyecto remoto y completar las pruebas de aceptación contra su API real.

## Puesta en marcha, paso a paso

1. Ingresar a [Supabase Dashboard](https://supabase.com/dashboard) con la cuenta del equipo. Crear o elegir su organización y crear el proyecto **codepath-contenidos**. La contraseña de base de datos se introduce y conserva en Supabase; no se copia a este repositorio. Elegir la región y el plan desde la cuenta del equipo.
2. Esperar a que el proyecto esté listo. En **SQL Editor**, ejecutar completo [202610150001_content.sql](../../supabase/migrations/202610150001_content.sql), como administrador. Se aplica una sola vez sobre un proyecto nuevo; no borra tablas existentes.
3. Ejecutar [seed.sql](../../supabase/seed.sql) para cargar el contenido inicial. `ON CONFLICT DO NOTHING` permite repetir la carga sin duplicar registros ni pisar títulos editados. No es una sincronización de contenidos.
4. En la configuración de **Data API**, comprobar que se expone `public` y que **no se expone `private`**. Ejecutar [verify.sql](../../supabase/verify.sql); las consultas de inconsistencias deben quedar vacías y los permisos deben coincidir con sus comentarios.
5. En **Connect / API Keys**, copiar **Project URL** y la **Publishable key** (`sb_publishable_…`). Crear `.env` a partir de [.env.example](../../.env.example) y completar esas dos variables. Ambas son públicas en el navegador. La aplicación rechaza claves que no tengan el prefijo publicable.
6. Ejecutar `npm ci`, `npm run dev` y abrir la dirección que informa Quasar. En PowerShell se puede usar `npm.cmd`. Reiniciar el servidor o reconstruir la aplicación después de cambiar la configuración. `npm run build` genera `dist/spa`.
7. Completar la sección de aceptación remota en [pruebas.md](pruebas.md), registrando la organización, el identificador no secreto del proyecto, fecha y evidencias. Nunca registrar las claves en ese informe.

Alternativa con Supabase CLI, si el equipo ya la utiliza: enlazar el proyecto autorizado y aplicar la migración con `supabase db push`; cargar el seed desde SQL Editor. Para un entorno local con Docker: `supabase start` y `supabase db reset` usan [config.toml](../../supabase/config.toml), migraciones y seed. `db reset` se limita a la base local descartable y elimina sus datos; no usarlo para actualizar contenidos de un proyecto remoto.

## Revisión de los datos anteriores

Antes existían cursos anidados con unidades, lecciones y actividades en `src/data`. Cada actividad repetía `courseId`, `lessonId`, el concepto de su lección, el código y la solución. Algunas opciones introductorias tenían identificadores `a`, `b`, `c` reutilizados entre preguntas.

Ahora cada entidad tiene su tabla y un identificador estable. La pregunta de una lección guarda solo `lesson_id`: su curso se obtiene por `lessons → units → courses`. El concepto y el código se heredan de la lección salvo que la pregunta tenga un ejemplo específico. El título de una pregunta puede ser NULL para reutilizar su enunciado sin copiarlo. Las opciones tienen identificadores globales (`pregunta-op-1`) y una FK a su pregunta. Las soluciones tienen una única fila por pregunta y una FK compuesta que garantiza que la opción correcta le pertenece.

Se conservaron las 27 prácticas introductorias: esas preguntas usan `intro_course_id`, sin lección. Un `CHECK` exige exactamente un padre, lección o curso introductorio. Esto conserva el catálogo previo sin duplicar cursos en cada pregunta de lección. Las actividades de esta etapa son preguntas de opción única; no existe otra tabla con una copia del ejercicio.

Los archivos anteriores se trasladaron a `tests/fixtures/legacy`. Solo los usa el generador de seed y las pruebas; la aplicación no los importa ni los entrega en el build.

## Contenido inicial

Se conservan nueve cursos y 13 unidades. JavaScript tiene las cinco unidades originales, en este orden:

1. Variables y tipos de datos: disponible, dos lecciones publicadas.
2. Operadores y expresiones: no disponible.
3. Condicionales: no disponible.
4. Bucles: no disponible.
5. Funciones: no disponible.

Las lecciones publicadas de JavaScript son **Guardá tus primeros valores** y **Números, textos y booleanos**, con lectura, ejemplo de código y **cuatro preguntas cada una** (supera el mínimo de tres), tres opciones y una solución explicada por pregunta. Las otras ocho lecciones de JavaScript se preservan como borradores y sus unidades tienen `is_available = false`.

Los otros ocho cursos conservan sus dos lecciones publicadas cada uno. La carga contiene 26 lecciones (18 publicadas, ocho borradores), 131 preguntas (99 publicadas, 32 borradores), 393 opciones y 131 soluciones. Las opciones de borradores quedan ocultas por RLS. Hay 27 preguntas introductorias y 72 preguntas de lecciones publicadas.

`npm run db:seed:generate` reproduce `supabase/seed.sql` desde los datos archivados. Una edición hecha desde Supabase se conserva al repetir el seed. Las ediciones administrativas futuras deben documentarse con nuevas migraciones o exportaciones cuando sea necesario reproducirlas.

## Acceso a los datos y recorrido

[`src/services/supabase.js`](../../src/services/supabase.js) crea un único cliente. Quasar inyecta exclusivamente `SUPABASE_URL` y `SUPABASE_PUBLISHABLE_KEY` desde el entorno; una lista permitida evita incluir otros valores de `.env`. Si la clave configurada no es publicable, la compilación se detiene antes de incluirla en el bundle.

[`contentRepository.js`](../../src/services/contentRepository.js) concentra las consultas asíncronas:

- `getCourses()` y `getCourse(id)`: cursos publicados, ordenados por `position`.
- `getUnits(courseId)`: unidades del curso por `course_id`, ordenadas por `position`, incluidas las anunciadas como no disponibles.
- `getLessons(unitId)`: lecciones por `unit_id`, con cantidad pública de preguntas.
- `getQuestions(lessonId)`: preguntas por `lesson_id`.
- `getOptions(questionId)`: opciones por `question_id`.
- `getCourseTree`, `getLessonContent`, `getIntroContent`: ensamblan los datos para las vistas, comprobando pertenencia. Solo se descargan las preguntas y opciones de la lección o práctica solicitada.
- `checkAnswer(questionId, optionId)`: invoca `check_practice_answer`, sin leer soluciones.

No hay fallback de contenido local. Un curso desconocido, una relación incorrecta o una lección no publicada devuelve una vista de contenido no encontrado. `useContent` presenta carga/error y descarta consultas antiguas al cambiar los parámetros. Reintentar o volver a consultar solicita nuevos datos, sin actualización en tiempo real.

Completar una lección habilita la siguiente y conserva la mejor marca en este navegador. La disponibilidad editorial (`is_available` y `publication_status`) es independiente del desbloqueo por progreso. El perfil, XP y resultados siguen siendo locales, modificables por el propio usuario y sin validez como puntajes oficiales de competencia.

## Seguridad y comprobación

Las seis tablas tienen RLS. `anon` y `authenticated` solo reciben `SELECT` sobre las cinco tablas públicas; no existen políticas de escritura. Las políticas de cada tabla verifican sus padres mediante las políticas correspondientes, de modo que despublicar un curso oculta también sus descendientes. Una unidad no disponible anuncia su título pero oculta sus lecciones y preguntas.

`private.solutions` no tiene permisos de esquema, de tabla ni políticas para visitantes. El cliente no consulta esa tabla. Las explicaciones se entregan únicamente después de enviar una opción válida a la función RPC.

La función SQL corre en el servidor con `SECURITY DEFINER`, `search_path = ''` y referencias calificadas. Comprueba la publicación de pregunta, lección, unidad y curso y la disponibilidad de unidad; valida la FK de la opción y consulta la solución privada. Devuelve exclusivamente `is_correct` y `explanation`. Rechaza identificadores inexistentes/no disponibles (`P0002`), opciones ajenas (`22023`) y preguntas sin solución (`55000`). Solo esa firma recibe `EXECUTE` para visitantes.

Durante la comprobación se deshabilitan el envío y el cambio de opción. Un error de red no genera una respuesta incorrecta, no suma XP ni registra un intento y permite reintentar. Las respuestas confirmadas quedan bloqueadas para evitar registros duplicados. Se establece un tiempo máximo de 15 segundos por solicitud.

La carga se hace desde **SQL Editor** o herramientas administrativas de Supabase: cursos → unidades → lecciones → preguntas → opciones → soluciones. Para editar soluciones, usar SQL Editor sobre el esquema privado. Guardar contenido nuevo como borrador, ejecutar `verify.sql` y publicar solo cuando esté completo; habilitar la unidad al finalizar. El panel administrativo de la aplicación y la competencia quedan para la siguiente etapa.

Referencias oficiales utilizadas: [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [funciones y seguridad](https://supabase.com/docs/guides/database/functions), [claves publicables](https://supabase.com/docs/guides/getting-started/api-keys). El diseño aplica permisos mínimos y una función de comprobación con privilegios restringidos a su operación.

## Entregables

- [Diagrama entidad-relación](modelo.md).
- [Diccionario de datos](diccionario.md).
- [Tablas, restricciones, RLS y función](../../supabase/migrations/202610150001_content.sql).
- [Carga inicial](../../supabase/seed.sql) y [verificaciones administrativas](../../supabase/verify.sql).
- [Ejemplo de entorno](../../.env.example).
- [Registro de pruebas y correcciones](pruebas.md).
