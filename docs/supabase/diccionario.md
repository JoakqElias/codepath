# Diccionario de datos

Todos los identificadores son `text` con PK, no nulos y patrón `^[a-z0-9][a-z0-9-]*$`. Se conservan los IDs de las rutas anteriores. Las FK no nulas se indican; las demás aceptan NULL expresamente. `publication_status` es `text NOT NULL DEFAULT 'draft'`, con valores `draft`, `published`, `archived` en las cuatro tablas editoriales. `position` es `integer NOT NULL CHECK (position > 0)`.

## public.courses

| Campo | Tipo / nulabilidad | Restricción o significado |
|---|---|---|
| id | text, no nulo | PK; identificador del curso |
| name | text, no nulo | Nombre no vacío después de trim |
| description | text, no nulo | Descripción; predeterminado `''` |
| category | text, no nulo | Categoría visual; predeterminado `''` |
| visual_label | text, no nulo | Sigla mostrada, por ejemplo JS; predeterminado `''` |
| visual_caption | text, no nulo | Texto de la tarjeta; predeterminado `''` |
| position | integer, no nulo | Orden global único |
| publication_status | text, no nulo | Estado editorial |
| created_at | timestamptz, no nulo | Fecha de alta; predeterminado `now()` |

## public.units

| Campo | Tipo / nulabilidad | Restricción o significado |
|---|---|---|
| id | text, no nulo | PK |
| course_id | text, no nulo | FK courses.id; borrado en cascada |
| title | text, no nulo | Título no vacío |
| description | text, no nulo | Descripción; predeterminado `''` |
| icon | text, no nulo | Material Icon; predeterminado `auto_stories` |
| position | integer, no nulo | UNIQUE (course_id, position) |
| is_available | boolean, no nulo | Predeterminado false; anuncia si hay contenido habilitado |
| publication_status | text, no nulo | Estado editorial; una unidad publicada puede estar no disponible |

## public.lessons

| Campo | Tipo / nulabilidad | Restricción o significado |
|---|---|---|
| id | text, no nulo | PK |
| unit_id | text, no nulo | FK units.id; cascada |
| title | text, no nulo | Título no vacío |
| description | text, no nulo | Resumen; predeterminado `''` |
| content | text[], no nulo | Uno o más párrafos; `cardinality(content) > 0` |
| code | text, no nulo | Ejemplo mostrado como texto; predeterminado `''` |
| position | integer, no nulo | UNIQUE (unit_id, position) |
| publication_status | text, no nulo | Estado editorial |

## public.questions

| Campo | Tipo / nulabilidad | Restricción o significado |
|---|---|---|
| id | text, no nulo | PK |
| lesson_id | text, nullable | FK lessons.id; cascada; exclusivo con intro_course_id |
| intro_course_id | text, nullable | FK courses.id; cascada; solo preguntas introductorias |
| title | text, nullable | Título específico no vacío; NULL usa prompt sin duplicarlo |
| prompt | text, no nulo | Enunciado no vacío |
| concept | text, nullable | Concepto específico; NULL hereda el contenido de la lección |
| code | text, nullable | Ejemplo específico; NULL hereda el de la lección |
| position | integer, no nulo | UNIQUE (lesson_id, position) y UNIQUE (intro_course_id, position) |
| publication_status | text, no nulo | Estado editorial |

`CHECK num_nonnulls(lesson_id, intro_course_id) = 1` garantiza un único padre. No incluye ningún indicador de respuesta correcta ni explicación de solución.

## public.answer_options

| Campo | Tipo / nulabilidad | Restricción o significado |
|---|---|---|
| id | text, no nulo | PK global; ejemplo `js-let-op-2` |
| question_id | text, no nulo | FK questions.id; cascada |
| label | text, no nulo | Texto de opción no vacío |
| position | integer, no nulo | UNIQUE (question_id, position) |

UNIQUE (question_id, id) permite la FK compuesta de soluciones. La publicación se hereda de la pregunta mediante RLS; no se duplica su estado. Todas las opciones son candidatas sin información de corrección.

## private.solutions

| Campo | Tipo / nulabilidad | Restricción o significado |
|---|---|---|
| question_id | text, no nulo | PK y FK questions.id; una solución por pregunta, cascada |
| correct_option_id | text, no nulo | FK (question_id, correct_option_id) → answer_options(question_id, id), cascada |
| explanation | text, no nulo | Justificación no vacía; se entrega solo al comprobar una selección válida |

Sin permisos de lectura/escritura para anon/authenticated. RLS habilitado sin políticas de visitantes. El esquema no se expone en la Data API.

## Datos derivados y locales

No se almacenan copias de las unidades dentro del curso ni opciones dentro de las preguntas. El repositorio ensambla esos objetos para las vistas. Cantidad de actividades, estados de desbloqueo, promedios y resultados se derivan; `isCorrect` solo llega desde la RPC después de responder. El historial y las mejores marcas permanecen en localStorage, fuera de estas tablas.
