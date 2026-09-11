# Formato común de cursos y actividades

Los datos se mantienen en src/data/courses.js, src/data/activities.js y src/data/javascriptCourse.js. La vista recorre colecciones; CourseCard recibe course y practiceCount desde el padre. La corrección se encuentra en src/domain/practice.js y las reglas de avance en src/domain/learning.js.

## Curso o tutorial

Ejemplo del formato actual:

```js
{
  id: 'html',
  name: 'HTML',
  description: 'Estructura, etiquetas, enlaces, imágenes y formularios.',
  visual: { label: 'HTML', caption: 'La estructura de la web' },
  category: 'Desarrollo web',
  status: 'coming-soon',
  entryRoute: null,
  units: []
}
```

id es un slug estable y único: no se cambia al retitular el curso. name y description son textos visibles; visual contiene una abreviatura legible y una leyenda. category orienta al usuario sin afirmar que todas las propuestas sean lenguajes.

Estados de curso: coming-soon, con entryRoute null y units vacío, para los ocho recorridos pendientes; available, con unidades y ruta funcional, para JavaScript. CourseCard solo muestra el acceso al recorrido si el estado, la ruta y las unidades están presentes. Antes de habilitar otro curso hay que implementar su ruta y comprobar todo su contenido.

CourseCard emite seleccionar con { courseId, destination: 'course' | 'practice' }. CoursesPage recibe el evento, valida el curso y realiza la navegación. La tarjeta no depende del router. UnitCard recibe unit, number, status y completedLessons, y emite seleccionar con el id de unidad; JavaScriptCoursePage decide la navegación.

## Actividad de opción única

```js
{
  id: 'html-heading',
  courseId: 'html',
  type: 'single-choice',
  title: 'Una página con estructura',
  concept: 'HTML describe la estructura del contenido...',
  code: '<h1>Mi primera página</h1>',
  question: '¿Qué etiqueta representa el encabezado principal?',
  options: [
    { id: 'a', label: '<p>' },
    { id: 'b', label: '<h1>' },
    { id: 'c', label: '<img>' }
  ],
  answerId: 'b',
  explanation: 'h1 es el encabezado de mayor nivel...'
}
```

Cada actividad tiene id globalmente único y courseId existente. Las opciones deben tener identificadores únicos dentro de la pregunta y exactamente una debe coincidir con answerId. Todos los campos explicativos son obligatorios. Solo se admite single-choice en esta entrega.

activitiesForCourse(id) entrega las tres preguntas introductorias de una tecnología, en orden editorial. CoursesPage pasa su cantidad a CourseCard. Las veinte actividades del recorrido están en las lecciones de javascriptCourse.js; javascriptActivities permite recorrerlas en una colección plana. Ambos grupos usan el mismo contrato y el mismo evaluador, con identificadores globalmente únicos.

Los ejemplos y alternativas se muestran mediante interpolación de texto. No usar v-html, eval ni ejecución de código aportado por cursos. Esta práctica es pedagógica, sin calificación oficial: la solución está en el cliente.

## Incorporar contenido de otro equipo

1. Acordar un id estable sin colisiones.
2. Incorporar el objeto de curso al catálogo, conservando su estado pendiente si el recorrido completo no existe.
3. Añadir preguntas con courseId coincidente, explicación previa, alternativas y una solución comprobada.
4. Revisar precisión del contenido, legibilidad móvil, acentos y extensión.
5. Adaptar las expectativas de cantidad de las pruebas si se amplía el catálogo, manteniendo las validaciones de integridad.
6. Ejecutar npm test, npm run test:e2e y npm run build.

No agregar markup de tarjetas o lógica de corrección por cada tecnología. Las diferencias corresponden a los datos.

## Unidades y lecciones implementadas

Formato del recorrido actual:

```js
{
  id: 'variables',
  title: 'Variables y tipos de datos',
  description: 'Guardá información y distinguí sus tipos.',
  status: 'available', // Estado inicial; las siguientes unidades empiezan locked.
  icon: 'inventory_2',
  lessons: [{
    id: 'guardar-valores',
    title: 'Guardá tus primeros valores',
    description: 'Conocé let y const.',
    content: ['Explicación del concepto.', 'Desarrollo con un ejemplo.'],
    code: 'let puntos = 1;',
    activities: [/* objetos single-choice; incluyen lessonId */]
  }]
}
```

El orden es el de las colecciones. UnitPage y LessonPage presentan esos datos. PracticePage recibe unitId y lessonId para elegir los ejercicios del recorrido, y se reinicia cuando cambia cualquiera de esos parámetros.

Estado visible de unidad: available (Disponible), locked (Bloqueada) o completed (Completada). Se calcula desde las lecciones aprobadas: todas las unidades anteriores deben estar completas; dentro de una unidad deben aprobarse las lecciones anteriores. Una lección se aprueba únicamente si se respondieron todas sus actividades correctamente. Reintentar no duplica ni borra aprobaciones.

src/stores/learningProgress.js conserva los identificadores aprobados en un ref compartido y de lectura pública. No utiliza localStorage, sessionStorage ni servicios externos. Al recargar se pierde el avance. Un guard global de Vue Router también verifica el acceso cuando se pega una dirección o cambian sus parámetros. Son reglas pedagógicas del cliente, no un sistema de evaluación con protección contra manipulación.

Para incorporar recorridos de otros equipos, usar estos formatos y ampliar el acceso a cursos, los selectores de contenido y las rutas; por ahora el recorrido secuencial se conecta específicamente a JavaScript. La persistencia futura deberá guardar identificadores estables y versión de contenido.
