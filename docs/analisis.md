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

Recorridos por unidades y lecciones, actividades variadas, retroalimentación inmediata, resultados, recuperación de avances, perfiles y logros. Más adelante se evaluarán cuentas, backend, base de datos y empaquetado móvil. No son requisitos resueltos por esta entrega.

## Alcance real de esta entrega

Implementado:

- Página de inicio que presenta la propuesta y conduce al catálogo.
- Nueve tarjetas de cursos y tutoriales basadas en datos separados.
- Identidad visual, logo SVG, favicon, navegación accesible y diseño adaptable.
- Ampliación solicitada: 27 actividades de opción única, tres por tecnología. Cada una incluye un concepto previo, ejemplo, pregunta y explicación.
- Corrección inmediata con texto e ícono, bloqueo de respuestas ya comprobadas, resultados basados en las respuestas reales y reinicio de práctica.
- Vistas de Lecciones y Perfil preparadas, con avisos de desarrollo.
- Tratamiento de rutas desconocidas y tecnologías inexistentes.
- Documentación, wireframes y pruebas repetibles.

No implementado: los nueve cursos completos, secuencias pedagógicas completas, ejecución libre de código, persistencia, autenticación, APIs de negocio, base de datos, logros reales y aplicación nativa instalada.

El estado del curso completo es “Próximamente”. Una práctica introductoria funcional no convierte al curso completo en disponible. Se muestran dos accesos distintos: práctica habilitada y curso completo deshabilitado. No se muestran porcentajes inventados de avance.

## Vistas y recorrido

1. **Inicio (/):** propuesta, eslogan, llamado al catálogo, ejemplo ilustrativo y recorrido aprender–practicar–progresar.
2. **Cursos (/#/cursos):** nueve propuestas con nombre, descripción, representación, estado y acciones. Desde una práctica siempre se puede volver aquí.
3. **Unidades y Lecciones (/#/lecciones):** hoy es una vista en desarrollo. Más adelante ofrecerá unidades ordenadas por curso, objetivos y lecciones.
4. **Ejercicio (/#/cursos/:courseId/actividades):** implementado como práctica introductoria de opción única; permite leer, elegir y comprobar. Próximamente se ampliará con más formatos y lecciones asociadas.
5. **Resultados:** implementado al terminar la práctica, dentro de su misma ruta. Resume aciertos y errores de esa sesión y permite repetir o cambiar de tecnología. El historial y los resultados por curso se planifican para después.
6. **Perfil (/#/perfil):** hoy muestra un aviso de desarrollo y aclara que no hay cuentas ni avances guardados. Más adelante presentará historial y logros.
7. **Página no encontrada:** recuperación hacia el catálogo para rutas inválidas.

Flujo actual: Inicio → Cursos → práctica de una tecnología → respuesta y devolución → siguiente actividad → resultados → repetir o volver a Cursos.

## Criterios de aceptación

Nueve tarjetas; navegación disponible en móvil y escritorio; ausencia de progreso ficticio; cursos pendientes bloqueados; prácticas utilizables y diferenciadas de los cursos; feedback comprensible sin depender del color; presentación sin desborde horizontal; compilación de producción correcta.
