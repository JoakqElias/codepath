# Modelo entidad-relación

![Diagrama relacional de CodePath](modelo.svg)

Versión editable en Mermaid:

```mermaid
erDiagram
  COURSES ||--o{ UNITS : contiene
  UNITS ||--o{ LESSONS : contiene
  LESSONS |o--o{ QUESTIONS : leccion
  COURSES |o--o{ QUESTIONS : practica_introductoria
  QUESTIONS ||--o{ ANSWER_OPTIONS : ofrece
  QUESTIONS ||--o| PRIVATE_SOLUTIONS : tiene
  ANSWER_OPTIONS ||--o| PRIVATE_SOLUTIONS : opcion_correcta
  COURSES {
    text id PK
    text name
    int position UK
    text publication_status
  }
  UNITS {
    text id PK
    text course_id FK
    text title
    int position "UNIQUE course_id, position"
    boolean is_available
    text publication_status
  }
  LESSONS {
    text id PK
    text unit_id FK
    text title
    text_array content
    text code
    int position "UNIQUE unit_id, position"
    text publication_status
  }
  QUESTIONS {
    text id PK
    text lesson_id FK "XOR intro_course_id"
    text intro_course_id FK "XOR lesson_id"
    text prompt
    text concept
    text code
    int position
    text publication_status
  }
  ANSWER_OPTIONS {
    text id PK
    text question_id FK
    text label
    int position "UNIQUE question_id, position"
  }
  PRIVATE_SOLUTIONS {
    text question_id PK,FK
    text correct_option_id FK "FK compuesta question_id, correct_option_id"
    text explanation
  }
```

Una pregunta pertenece **exclusivamente** a una lección o a la práctica introductoria de un curso. No pertenece a ambos. Una lección tiene una unidad y una unidad tiene un curso. No se almacena `course_id` en las lecciones ni en sus preguntas.

Una pregunta tiene cero o una solución mientras se edita como borrador, y debe tener una solución antes de publicarse. El control administrativo `verify.sql` comprueba esa completitud, además del mínimo de preguntas/opciones. El `CHECK`, las FK y los índices únicos son restricciones obligatorias del servidor; la completitud editorial se revisa antes de publicar.

Las FK usan `ON DELETE CASCADE`: eliminar un curso desde administración elimina su contenido dependiente. Los visitantes carecen de permisos de borrado. Para retirar contenido sin perderlo se usa `publication_status = 'archived'`.

`position` se exige positivo y único entre hermanos. La aplicación siempre consulta con `ORDER BY position`, incluso si los registros se insertaron o editaron en otra secuencia. El array de párrafos conserva el orden interno de lectura y no contiene entidades relacionadas ni soluciones.
