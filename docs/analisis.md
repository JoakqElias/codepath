# Análisis de CodePath

## Datos académicos

Proyecto: CodePath. Integrante: Joaquín Villalva. Materia: Aplicaciones Móviles. Docente: Aragón Lautaro.

## Problema

Una persona sin experiencia suele encontrar documentación extensa, conceptos sin contexto y ejercicios con una dificultad demasiado alta para empezar. La variedad de tecnologías también dificulta elegir un primer tema. Esto puede generar frustración y abandono antes de construir una base.

CodePath propone una entrada gradual: conceptos pequeños, ejemplos claros, actividades breves y una devolución que explique el resultado. La inspiración en Duolingo se refiere al aprendizaje progresivo. Ahora cuenta con niveles por XP, habilidad y rachas calculadas desde respuestas reales.

## Objetivo y usuarios

Facilitar el primer contacto con programación y desarrollo web, desde el celular o una computadora, con lenguaje cercano y recorridos que puedan ampliarse.

Usuarios principales: estudiantes de nivel inicial, personas que exploran una orientación tecnológica y adultos sin conocimientos previos. Necesitan instrucciones sencillas, errores explicados, botones cómodos y una navegación reconocible.

Usuarios colaboradores: docentes y equipos que aporten cursos mediante un formato común, sin editar cada tarjeta o duplicar componentes.

## Funcionalidades previstas

Recorridos por unidades y lecciones para todas las tecnologías, actividades de distintos formatos, recuperación de avances entre sesiones, perfiles y logros. Las nueve tecnologías ya tienen recorridos iniciales con lecciones, corrección y resultados. Más adelante se evaluarán cuentas, backend, base de datos y empaquetado móvil.

## Alcance real de esta entrega

Implementado:

- Página de inicio que presenta la propuesta y conduce al catálogo.
- Nueve tarjetas de cursos y tutoriales basadas en datos separados.
- Identidad visual, logo SVG, favicon, navegación accesible y diseño adaptable.
- Ampliación solicitada: 27 actividades de opción única, tres por tecnología. Cada una incluye un concepto previo, ejemplo, pregunta y explicación.
- Nueve recorridos iniciales: 26 lecciones y 104 preguntas. JavaScript tiene diez lecciones; las otras tecnologías, dos cada una. Cada lección tiene cuatro preguntas.
- CourseCard comunica la selección al padre mediante un evento; UnitCard muestra estados y progreso por unidad.
- Perfil local persistente con nombre, avatar, habilidad, XP, nivel, racha e historial. Las lecciones aprobadas también se conservan al recargar.
- Corrección inmediata con texto e ícono, bloqueo de respuestas ya comprobadas, resultados basados en las respuestas reales y reinicio de práctica.
- Actividades en un diálogo sobre el catálogo o la lección, con fondo desenfocado, foco contenido y cierre confirmado si se empezó a responder. El índice general de Lecciones permite explorar las nueve tecnologías.
- Tratamiento de rutas desconocidas y tecnologías inexistentes.
- Documentación, wireframes y pruebas repetibles.

No implementado: unidades avanzadas para las otras ocho tecnologías, ejecución libre de código, sincronización remota, autenticación, APIs de negocio, base de datos, insignias y aplicación nativa instalada.

Las nueve tecnologías se presentan como recorridos iniciales disponibles. Las prácticas introductorias son independientes y no terminan unidades. Al terminar las cuatro preguntas se puede seguir, aunque haya errores; se conserva el mejor porcentaje de cada lección.

## Vistas y recorrido

1. **Inicio (/):** propuesta, eslogan, llamado al catálogo, ejemplo ilustrativo y recorrido aprender–practicar–progresar.
2. **Cursos (/#/cursos):** nueve propuestas con nombre, descripción, representación, estado y acciones. Desde una práctica siempre se puede volver aquí.
3. **Unidades y Lecciones (/#/lecciones):** índice desplegable por tecnología. Recorridos en /#/cursos/:courseId, unidades en /unidades/:unitId y lecciones en /lecciones/:lessonId.
4. **Ejercicio (/#/cursos/:courseId/actividades):** práctica introductoria de opción única. Las lecciones de todas las tecnologías reutilizan esa pantalla en /#/cursos/:courseId/unidades/:unitId/lecciones/:lessonId/actividades, con sus propios ejercicios y reglas de aprobación.
5. **Resultados:** al terminar la práctica, dentro de su ventana. Resume aciertos y errores, informa XP y racha y permite repetir, continuar o consultar el perfil.
6. **Perfil (/#/perfil):** nombre y avatar editables; nivel, habilidad general y por tecnología, racha actual y mejor racha e historial de las últimas ocho prácticas. Guardado local, sin cuenta ni sincronización remota.
7. **Página no encontrada:** recuperación hacia el catálogo para rutas inválidas.

Flujos actuales: Inicio → Cursos → tecnología → unidad → lección → actividades → resultados → siguiente lección. Terminar permite avanzar; 3/4 muestra 75 % y repetir con 4/4 mejora a 100 %. La mejor marca no baja. [Reglas vigentes](recorridos-progreso.md).

## Criterios de aceptación

Nueve tarjetas; navegación disponible en móvil y escritorio; ausencia de progreso ficticio; recorridos con contenido real; prácticas utilizables y diferenciadas de los cursos; feedback comprensible sin depender del color; presentación sin desborde horizontal; compilación de producción correcta.
