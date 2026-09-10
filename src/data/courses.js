// Formato común de integración: docs/formato-cursos.md.
// El curso completo sigue pendiente, independientemente de la práctica disponible.
const course = (id, name, description, label, caption, category) => ({
  id, name, description, visual: { label, caption }, category,
  status: 'coming-soon', entryRoute: null, units: []
})

export const courses = [
  course('html', 'HTML', 'Construí la estructura de una página con etiquetas, enlaces, imágenes y formularios.', 'HTML', 'La estructura de la web', 'Desarrollo web'),
  course('css', 'CSS', 'Dale estilo a tus páginas con colores, tipografías, modelo de caja y diseño adaptable.', 'CSS', 'Ideas que toman forma', 'Desarrollo web'),
  course('javascript', 'JavaScript', 'Conocé variables, operadores, condiciones, bucles y funciones para dar tus primeros pasos.', 'JS', 'Tu primera interacción', 'Programación'),
  course('vue', 'Tutorial de Vue.js', 'Descubrí componentes, directivas, reactividad y eventos para crear interfaces.', 'Vue', 'Interfaces por componentes', 'Interfaces'),
  course('react', 'Tutorial de React', 'Explorá componentes, JSX, propiedades y estado para construir interfaces.', 'React', 'Piezas que se conectan', 'Interfaces'),
  course('sql', 'SQL', 'Organizá datos en tablas y aprendé consultas, filtros y operaciones básicas.', 'SQL', 'Preguntas para tus datos', 'Datos'),
  course('php', 'PHP', 'Aprendé sintaxis, variables y formularios para introducirte al desarrollo del lado del servidor.', 'PHP', 'Detrás de cada página', 'Servidor'),
  course('java', 'Java', 'Empezá con variables, estructuras de control, métodos y clases.', 'Java', 'Bases para construir', 'Programación'),
  course('node', 'Node.js', 'Ejecutá JavaScript en el servidor y conocé módulos y primeras rutas.', 'Node', 'JavaScript en el servidor', 'Servidor')
]
