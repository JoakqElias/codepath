# Nueve recorridos y avance por porcentajes

Actualización del 1 de octubre de 2026, solicitada por Joaquín Villalva. Proyecto CodePath, Aplicaciones Móviles, docente Aragón Lautaro. Estas reglas reemplazan el requisito anterior de acertar todo para avanzar.

## Contenido disponible

Todos los cursos del catálogo tienen un recorrido inicial utilizable:

| Tecnología | Lecciones | Actividades | Temas |
|---|---:|---:|---|
| HTML | 2 | 8 | Estructura, títulos, párrafos, enlaces, imágenes y formularios |
| CSS | 2 | 8 | Selectores, colores, tipografía, modelo de caja, flex y media queries |
| JavaScript | 10 | 40 | Variables, tipos, operadores, decisiones, bucles y funciones |
| Vue.js | 2 | 8 | Componentes, interpolación, directivas, ref, eventos y v-model |
| React | 2 | 8 | Componentes, JSX, props, useState y eventos |
| SQL | 2 | 8 | Tablas, SELECT, WHERE, ORDER BY, claves, INSERT, UPDATE y DELETE |
| PHP | 2 | 8 | Sintaxis, variables, decisiones, POST y validación del servidor |
| Java | 2 | 8 | Tipos, condiciones, métodos, clases, constructores e instancias |
| Node.js | 2 | 8 | Ejecución, módulos ES, HTTP, rutas y respuestas |

Total: **13 unidades, 26 lecciones y 104 actividades de lección**. Cada lección contiene una explicación, un ejemplo y exactamente **cuatro preguntas de opción única**, con solución explicada. Se conservan además las 27 prácticas introductorias: **131 actividades en total**. Son recorridos iniciales, no cursos exhaustivos de cada tecnología.

## Reglas de avance

- **Terminar:** responder y confirmar las cuatro preguntas, luego abrir los resultados. Se habilita la siguiente lección aunque existan errores; incluso 0/4 permite continuar. Al terminar todas las lecciones de una unidad se habilita la siguiente.
- **Porcentaje de la lección:** aciertos / 4 × 100. Un intento puede dar 0, 25, 50, 75 o 100 %. La etiqueta “75 % completo” representa los aciertos del mejor intento, no el número de pantallas visitadas.
- **Mejor resultado:** se conserva el máximo alcanzado en un intento completo. Si se obtiene 75 %, después 50 % y finalmente 100 %, la mejor marca evoluciona 75 → 75 → 100.
- **Resultados del intento:** muestran únicamente las respuestas de ese intento. Se presenta aparte la mejor marca. Tener 100 % histórico no convierte en perfectas las respuestas equivocadas del intento actual.
- **Reintentar:** limpia selección, respuestas y resultado actual. Las preguntas vuelven a la primera y requieren confirmación. No se suman aciertos de intentos diferentes para fabricar un 100 %: hay que contestar todo bien en un mismo intento.
- **Intentos incompletos:** no finalizan la lección ni registran una mejor marca. Repetir la confirmación no contabiliza otra respuesta. Las rutas siguen impidiendo saltar una lección que nunca se terminó.
- **Resumen de unidad/curso:** muestra cantidad de lecciones terminadas y promedio de mejores porcentajes, incluyendo cero para las no realizadas. Una unidad puede estar terminada y tener 75 % de aciertos: se puede seguir y repasar después.

## Perfil y compatibilidad

El perfil conserva nombre, avatar, XP, rachas y respuestas anteriores. `completedLessons` determina el desbloqueo; `lessonScores` guarda la mejor marca por identificador de lección. `passedLessons` conserva el registro histórico de intentos al 100 %, pero ya no bloquea el avance.

Las aprobaciones de la versión previa se conservan como 100 % histórico; no se recalculan al ampliar el contenido. Si una lección estaba terminada sin nota almacenada, permanece accesible y pide repetir para registrar su porcentaje, sin inventarlo.

La **habilidad del perfil** sigue usando todas las respuestas históricas, por lo que puede bajar si se cometen errores. Es diferente de la mejor marca de una lección. La racha sigue aumentando al terminar con más del 40 %: con cuatro preguntas, dos aciertos. Los XP siguen sumando diez por acierto. Todo se guarda en este navegador, sin cuentas ni sincronización remota.

## Organización

- `src/data/contentFactory.js`: contrato común para preguntas, opciones, lecciones y publicación.
- `src/data/javascriptCourse.js` y `javascriptExtras.js`: cinco unidades, diez lecciones y ampliaciones de JavaScript.
- `src/data/technologyCourses.js`: contenido específico de las otras ocho tecnologías.
- `src/services/contentRepository.js`: acceso común; valida la pertenencia curso → unidad → lección.
- `CoursePage.vue`, `UnitPage.vue`, `LessonPage.vue` y `PracticePage.vue`: vistas compartidas por todos los cursos.
- `LessonsPage.vue`: índice desplegable de las nueve tecnologías.
- `src/domain/learning.js`: finalización válida, desbloqueo, porcentajes y mejor marca.
- `src/stores/learningProgress.js`: conecta las reglas con el perfil reactivo.

Rutas: `/#/cursos/:courseId`, `/unidades/:unitId`, `/lecciones/:lessonId` y `/actividades` concatenadas en ese orden. Las direcciones antiguas de JavaScript se conservan. Los nombres de rutas son `course`, `course-unit`, `course-lesson` y `course-exercise`. El contenido no se mezcla cuando se combinan identificadores de distintas tecnologías.

## Demostración

1. Entrar al catálogo y elegir HTML → Tu primera página → Organizá una página con HTML.
2. Responder tres preguntas correctamente y una incorrectamente. Finalizar: se muestran 3/4, 75 % y el enlace a la próxima lección.
3. Volver a la unidad: queda “75 % completo” y la segunda lección está habilitada, también después de recargar.
4. Repetir con dos aciertos: el intento muestra 50 %, la mejor marca permanece en 75 %.
5. Repetir con cuatro aciertos: la mejor marca pasa a 100 %. Un intento posterior peor no la borra.
6. Usar el índice Lecciones para elegir otra tecnología y comprobar que su avance es independiente.

Pruebas de integridad y reglas: `npm test`. Navegación, resultados, móvil y persistencia: `npm run test:e2e`. Compilación: `npm run build`. **Verificado el 1 de octubre:** 16 pruebas de lógica/integridad aprobadas y compilación de producción correcta. La ejecución general del navegador aprobó 32 de 33 casos; el caso del índice esperaba el texto visible dentro del nombre accesible y falló. Se estableció una etiqueta explícita en español y se corrigió ese selector: la repetición pasó (1/1). Los 33 casos distintos quedaron verificados entre ambas ejecuciones. Incluyen las dos lecciones iniciales de las nueve tecnologías con 75 %, reintento al 50 %, persistencia y finalización al 0 %; también el recorrido completo de 40 preguntas de JavaScript, mejora al 100 %, móvil, teclado y perfil.

[Captura de HTML: 75 % y siguiente lección disponible](avances/html-progreso-75.png).

Pendiente: más unidades para los ocho recorridos nuevos, ejecución interactiva de código, cuentas y base compartida. Las preguntas actuales evalúan lectura y comprensión de ejemplos; no ejecutan código del estudiante.
