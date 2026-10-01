# Correspondencia con la consigna

Proyecto: CodePath. Integrante: Joaquín Villalva. Materia: Aplicaciones Móviles. Docente: Aragón Lautaro.

1. **Objetivo, problema, usuarios y funcionalidades:** docs/analisis.md.
2. **Estructura de vistas:** docs/analisis.md y src/router/index.js. Incluye Inicio, Cursos, curso de JavaScript, unidades, lecciones, ejercicios, resultados e interfaz de Perfil preparada.
3. **Wireframes:** docs/wireframes/inicio.svg y cursos.svg, con escritorio y móvil, además de sus PNG de vista previa.
4. **Identidad y justificación:** docs/diseno.md; paleta real en quasar.config.js; estilos en src/css/app.scss; BrandLogo.vue y public/favicon.svg.
5. **Estructura Vue:** src/pages, components, layouts, data, domain, stores, router y css; recursos públicos en public.
6. **Inicio con propósito y forma de comenzar:** HomePage.vue conduce al catálogo.
7. **Catálogo con nombre, descripción, estado y representación:** CoursesPage.vue y nueve propuestas en courses.js. Las nueve tecnologías tienen recorridos iniciales y prácticas introductorias independientes.
8. **Componente de curso con props y comunicación al padre:** CourseCard.vue recibe course/practiceCount y emite seleccionar. CoursesPage.vue recibe el evento y navega.
9. **Datos separados de las plantillas:** courses.js, activities.js y javascriptCourse.js.
10. **Vue Router con nombres y direcciones coherentes:** src/router/index.js. Rutas home, courses, practice, course, course-unit, course-lesson y course-exercise, además de las vistas preparadas y el manejo de direcciones inválidas.
11. **Página de JavaScript con recorrido:** CoursePage.vue en /#/cursos/javascript.
12. **Cinco unidades con título, descripción y estado:** variables y tipos de datos; operadores y expresiones; condicionales; bucles; funciones. Sus datos y estados iniciales están en javascriptCourse.js. El estado actual se deriva del avance.
13. **Componente reutilizable de unidad y progreso:** UnitCard.vue, con Disponible/Bloqueada/Completada, conteo de lecciones, barra y acción accesible. Recibe datos por props y emite seleccionar.
14. **Sistema de lecciones con diferentes actividades por unidad:** UnitPage.vue y LessonPage.vue. Trece unidades, 26 lecciones y 104 actividades; todas las lecciones tienen cuatro preguntas.
15. **Datos de ejercicios con consigna, opciones y solución:** activities.js y javascriptCourse.js, con question, options, answerId, concept, code y explanation. practice.js evalúa las respuestas.
16. **Pantalla para resolver actividades:** PracticePage.vue, reutilizada por las prácticas introductorias y las lecciones. Incluye enunciado, radios, comprobación, devolución, siguiente ejercicio y resultados.

## Demostración sugerida

Abrir Inicio → Cursos → HTML → primera unidad → primera lección. Resolver 3/4: se muestra 75 % y se habilita la siguiente. Repetir con 4/4 mejora a 100 %. Ver [guion y reglas](recorridos-progreso.md).

Los resultados y los estados son reales y se guardan en el perfil de este navegador, junto con las lecciones aprobadas. Perfil ya es funcional; el índice de todas las lecciones permite navegar por tecnología. La ampliación del 16 de septiembre agrega actividades en un diálogo, habilidad, niveles y rachas, sin autenticación ni backend. Las reglas están en docs/perfil-y-actividades.md.

El alcance vigente y las reglas se documentan en [Recorridos y progreso](recorridos-progreso.md).
