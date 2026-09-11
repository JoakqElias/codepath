# Análisis de CodePath

## Datos académicos

Proyecto: CodePath. Integrante: Joaquín Villalva. Materia: Aplicaciones Móviles. Docente: Aragón Lautaro.

## Problema

Una persona sin experiencia suele encontrar documentación extensa, conceptos sin contexto y ejercicios con una dificultad demasiado alta para empezar. La variedad de tecnologías también dificulta elegir un primer tema. Esto puede generar frustración y abandono antes de construir una base.

CodePath propone una entrada gradual: conceptos pequeños, ejemplos claros, actividades breves y una devolución que explique el resultado. La inspiración en Duolingo se refiere al aprendizaje progresivo; no implica copiar sus recursos visuales ni afirmar que ya existe un sistema de niveles o recompensas.

## Objetivo y usuarios

Facilitar el primer contacto con programación y desarrollo web, desde el celular o una computadora, con lenguaje cercano y recorridos que puedan ampliarse.

Usuarios principales: estudiantes de nivel inicial, personas que exploran una orientación tecnológica y adultos sin conocimientos previos. Necesitan instrucciones sencillas, errores explicados, botones cómodos y una navegación reconocible.

Usuarios colaboradores: docentes y equipos que aporten cursos mediante un formato común, sin editar cada tarjeta o duplicar componentes.

## Funcionalidades previstas

Recorridos por unidades y lecciones para todas las tecnologías, actividades de distintos formatos, recuperación de avances entre sesiones, perfiles y logros. El primer recorrido, JavaScript, ya tiene lecciones, corrección y resultados. Más adelante se evaluarán cuentas, backend, base de datos y empaquetado móvil.

## Alcance real de esta entrega

Implementado:

- Página de inicio que presenta la propuesta y conduce al catálogo.
- Nueve tarjetas de cursos y tutoriales basadas en datos separados.
- Identidad visual, logo SVG, favicon, navegación accesible y diseño adaptable.
- Ampliación solicitada: 27 actividades de opción única, tres por tecnología. Cada una incluye un concepto previo, ejemplo, pregunta y explicación.
- Curso inicial de JavaScript: cinco unidades, diez lecciones y veinte ejercicios adicionales, con lectura previa y desbloqueo progresivo.
- CourseCard comunica la selección al padre mediante un evento; UnitCard muestra estados y progreso por unidad.
- Avance compartido en memoria: las lecciones aprobadas se conservan al navegar, hasta recargar o cerrar la pestaña.
- Corrección inmediata con texto e ícono, bloqueo de respuestas ya comprobadas, resultados basados en las respuestas reales y reinicio de práctica.
- Vistas de Lecciones y Perfil preparadas, con avisos de desarrollo.
- Tratamiento de rutas desconocidas y tecnologías inexistentes.
- Documentación, wireframes y pruebas repetibles.

No implementado: los recorridos completos de las otras ocho tecnologías, ejecución libre de código, persistencia, autenticación, APIs de negocio, base de datos, logros e historial permanente y aplicación nativa instalada.

JavaScript se presenta como curso inicial disponible porque sus cinco unidades son funcionales. Los otros ocho cursos siguen como “Próximamente”. Las prácticas introductorias tienen un acceso independiente y no completan unidades. El progreso visible se calcula únicamente desde las lecciones aprobadas durante la sesión.

## Vistas y recorrido

1. **Inicio (/):** propuesta, eslogan, llamado al catálogo, ejemplo ilustrativo y recorrido aprender–practicar–progresar.
2. **Cursos (/#/cursos):** nueve propuestas con nombre, descripción, representación, estado y acciones. Desde una práctica siempre se puede volver aquí.
3. **Unidades y Lecciones (/#/lecciones):** hoy es una vista en desarrollo. Más adelante ofrecerá unidades ordenadas por curso, objetivos y lecciones.
   El recorrido de JavaScript sí está implementado en /#/cursos/javascript. Sus unidades se abren en /#/cursos/javascript/unidades/:unitId y sus lecciones en /#/cursos/javascript/unidades/:unitId/lecciones/:lessonId.
4. **Ejercicio (/#/cursos/:courseId/actividades):** práctica introductoria de opción única. Las lecciones de JavaScript reutilizan esa pantalla en /#/cursos/javascript/unidades/:unitId/lecciones/:lessonId/actividades, con sus propios ejercicios y reglas de aprobación.
5. **Resultados:** implementado al terminar la práctica, dentro de su misma ruta. Resume aciertos y errores de esa sesión y permite repetir o cambiar de tecnología. El historial y los resultados por curso se planifican para después.
6. **Perfil (/#/perfil):** hoy muestra un aviso de desarrollo y aclara que no hay cuentas ni avances guardados. Más adelante presentará historial y logros.
7. **Página no encontrada:** recuperación hacia el catálogo para rutas inválidas.

Flujos actuales: Inicio → Cursos → práctica introductoria → resultados; o Cursos → JavaScript → unidad → lección → ejercicios → resultados → siguiente lección. Dos actividades correctas aprueban una lección; todas las lecciones de una unidad aprueban esa unidad. Los errores permiten reintentar y no borran aprobaciones anteriores.

## Criterios de aceptación

Nueve tarjetas; navegación disponible en móvil y escritorio; ausencia de progreso ficticio; cursos pendientes bloqueados; prácticas utilizables y diferenciadas de los cursos; feedback comprensible sin depender del color; presentación sin desborde horizontal; compilación de producción correcta.
