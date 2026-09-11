# Correspondencia con la consigna

Proyecto: CodePath. Integrante: Joaquín Villalva. Materia: Aplicaciones Móviles. Docente: Aragón Lautaro.

1. **Objetivo, problema, usuarios y funcionalidades:** docs/analisis.md.
2. **Estructura de vistas:** docs/analisis.md y src/router/index.js. Incluye Inicio, Cursos, curso de JavaScript, unidades, lecciones, ejercicios, resultados e interfaz de Perfil preparada.
3. **Wireframes:** docs/wireframes/inicio.svg y cursos.svg, con escritorio y móvil, además de sus PNG de vista previa.
4. **Identidad y justificación:** docs/diseno.md; paleta real en quasar.config.js; estilos en src/css/app.scss; BrandLogo.vue y public/favicon.svg.
5. **Estructura Vue:** src/pages, components, layouts, data, domain, stores, router y css; recursos públicos en public.
6. **Inicio con propósito y forma de comenzar:** HomePage.vue conduce al catálogo.
7. **Catálogo con nombre, descripción, estado y representación:** CoursesPage.vue y nueve propuestas en courses.js. JavaScript tiene recorrido disponible y las otras tecnologías, prácticas introductorias.
8. **Componente de curso con props y comunicación al padre:** CourseCard.vue recibe course/practiceCount y emite seleccionar. CoursesPage.vue recibe el evento y navega.
9. **Datos separados de las plantillas:** courses.js, activities.js y javascriptCourse.js.
10. **Vue Router con nombres y direcciones coherentes:** src/router/index.js. Rutas home, courses, practice, javascript-course, javascript-unit, javascript-lesson y javascript-exercise, además de las vistas preparadas y el manejo de direcciones inválidas.
11. **Página de JavaScript con recorrido:** JavaScriptCoursePage.vue en /#/cursos/javascript.
12. **Cinco unidades con título, descripción y estado:** variables y tipos de datos; operadores y expresiones; condicionales; bucles; funciones. Sus datos y estados iniciales están en javascriptCourse.js. El estado actual se deriva del avance.
13. **Componente reutilizable de unidad y progreso:** UnitCard.vue, con Disponible/Bloqueada/Completada, conteo de lecciones, barra y acción accesible. Recibe datos por props y emite seleccionar.
14. **Sistema de lecciones con diferentes actividades por unidad:** UnitPage.vue y LessonPage.vue. Cinco unidades × dos lecciones × dos ejercicios = veinte actividades específicas del recorrido.
15. **Datos de ejercicios con consigna, opciones y solución:** activities.js y javascriptCourse.js, con question, options, answerId, concept, code y explanation. practice.js evalúa las respuestas.
16. **Pantalla para resolver actividades:** PracticePage.vue, reutilizada por las prácticas introductorias y las lecciones. Incluye enunciado, radios, comprobación, devolución, siguiente ejercicio y resultados.

## Demostración sugerida

Abrir Inicio, ir a Cursos y tutoriales y elegir Ver unidades en JavaScript. Entrar a Variables y tipos de datos, abrir la primera lección y resolver sus dos actividades. Equivocarse permite ver la devolución y reintentar; dos respuestas correctas habilitan la segunda lección. Al aprobar ambas, la unidad se marca como Completada y se habilita Operadores.

Los resultados y los estados son reales durante la sesión. Recargar reinicia el avance y se informa en pantalla. La consigna no exige en esta etapa autenticación, backend, base de datos ni persistencia entre sesiones. El índice de todas las lecciones y Perfil siguen claramente identificados como vistas en desarrollo.
