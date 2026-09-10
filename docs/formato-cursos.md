# Formato común de cursos y actividades

Los datos se mantienen en src/data/courses.js y src/data/activities.js. La vista recorre colecciones; CourseCard recibe un objeto course. La corrección se encuentra en src/domain/practice.js.

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

En esta entrega el único estado de curso admitido es coming-soon, con entryRoute null y units vacío. El acceso al curso completo está deshabilitado en el componente. No se habilita automáticamente por cambiar un dato: cuando se implemente el recorrido completo deberán agregarse su vista, navegación, validaciones, estado available y pruebas antes de modificar ese acceso.

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

activitiesForCourse(id) entrega las preguntas en su orden editorial. CourseCard cuenta esas preguntas y habilita “Probar actividades” únicamente si hay contenido. Una propuesta sin actividades conserva únicamente el acceso deshabilitado al curso completo.

Los ejemplos y alternativas se muestran mediante interpolación de texto. No usar v-html, eval ni ejecución de código aportado por cursos. Esta práctica es pedagógica, sin calificación oficial: la solución está en el cliente.

## Incorporar contenido de otro equipo

1. Acordar un id estable sin colisiones.
2. Incorporar el objeto de curso al catálogo, conservando su estado pendiente si el recorrido completo no existe.
3. Añadir preguntas con courseId coincidente, explicación previa, alternativas y una solución comprobada.
4. Revisar precisión del contenido, legibilidad móvil, acentos y extensión.
5. Adaptar las expectativas de cantidad de las pruebas si se amplía el catálogo, manteniendo las validaciones de integridad.
6. Ejecutar npm test, npm run test:e2e y npm run build.

No agregar markup de tarjetas o lógica de corrección por cada tecnología. Las diferencias corresponden a los datos.

## Estructura prevista para unidades

Contrato propuesto para una etapa futura; todavía no tiene renderer:

```js
{
  id: 'html-estructura',
  title: 'Estructura de una página',
  lessons: [{
    id: 'html-primera-pagina',
    title: 'Tu primera página',
    content: [{ type: 'paragraph', text: '...' }, { type: 'code', text: '...' }],
    activityIds: ['html-heading']
  }]
}
```

El orden será el de las colecciones. La persistencia futura guardará resultados por identificadores estables y versión de contenido; no se debe almacenar progreso inventado en los objetos de catálogo.
