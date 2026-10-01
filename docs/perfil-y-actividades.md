# Perfil y actividades sobre la página

Ampliación del 16 de septiembre de 2026.

## Presentación

Las rutas de actividad siguen siendo compartibles. MainLayout conserva el catálogo como fondo de las prácticas introductorias y la lección como fondo de los ejercicios de JavaScript. Un QDialog presenta la actividad con velo gris, desenfoque de 8 px y sombra suave. La ventana se desplaza por dentro y conserva un margen también en celular.

El fondo queda inerte mientras el diálogo está abierto. El foco se mantiene dentro y el botón de cierre permanece visible. Escape y el botón Cerrar actividad solicitan confirmación si ya se respondió. Cerrar sin empezar no altera las estadísticas. Volver con el navegador o recargar interrumpe el intento; las respuestas ya comprobadas se conservan.

## Reglas

- Habilidad general y por tecnología: respuestas correctas / respuestas comprobadas × 100, redondeado a un decimal. No se promedian porcentajes de prácticas con diferentes cantidades de preguntas. Sin respuestas se muestra «Sin datos».
- Cada acierto suma 10 XP; nivel = 1 + parte entera de XP / 100. Los errores no quitan XP y los reintentos también suman. Los nombres de nivel son etiquetas de motivación, no una certificación profesional.
- La racha cuenta prácticas consecutivas terminadas con más de 2/5 de aciertos, es decir, estrictamente más del 40 %. Con cinco preguntas se necesitan tres; con tres se necesitan dos; con dos se necesita una. No se agregaron preguntas ficticias para llegar a cinco.
- Finalizar con 40 % o menos reinicia la racha. Abandonar o recargar después de responder también la reinicia. La mejor racha queda registrada. No es una racha diaria.
- Las respuestas se guardan al comprobar, no al ver los resultados. No se vuelve a puntuar una respuesta del mismo intento, ni se finaliza dos veces. Un intento terminado conserva su resultado al cerrar el diálogo.
- Las lecciones de todas las tecnologías se habilitan al terminar la anterior, con cualquier porcentaje. Repetir permite mejorar hasta el 100 % y conserva la mejor marca.

## Datos y alcance

`src/domain/profile.js` contiene las reglas puras y la validación del estado restaurado. `src/stores/userProfile.js` expone estado de solo lectura y operaciones de guardado bajo la clave `codepath.profile.v1` de localStorage. `learningProgress.js` reutiliza el perfil para conservar por separado lecciones completadas y aprobadas.

Se guarda nombre, avatar elegido, intentos (identificador, tecnología, título, cantidad de preguntas, estado y respuestas correctas/incorrectas) e identificadores de lecciones completadas y aprobadas. El perfil muestra las ocho prácticas más recientes, pero las estadísticas usan todos los intentos guardados.

Es un perfil de este navegador y este origen web, sin contraseña ni servidor. Otro navegador, dispositivo o puerto usa almacenamiento diferente. Borrar los datos del sitio elimina el perfil. Si localStorage está bloqueado o sin espacio, se muestra un aviso y la práctica sigue en memoria. JSON inválido se recupera con un perfil vacío; campos e intentos inválidos se descartan. No hay sincronización entre pestañas: practicar simultáneamente desde varias pestañas puede sobrescribir el último guardado. Se recomienda una pestaña por perfil.

Pendientes: cuentas y sincronización, selector de varios usuarios, reinicio explícito, migraciones de contenido e insignias. Los manuales PDF y Word conservan la edición de identidad visual de septiembre; no se regeneraron en esta ampliación funcional.

Actualización del 17 de septiembre: [reglas y resultados por intento de la segunda entrega](recorridos-progreso.md).

## Ajuste de espacio · 1 de octubre de 2026

El diálogo usa hasta 1120 px de ancho y casi toda la altura disponible. La barra de cierre y las acciones de comprobar/avanzar permanecen visibles; solo se desplaza el contenido. En escritorio se muestran código y respuestas en dos columnas. En celular se apilan con menos espacios y textos repetidos.

Las lecciones ofrecen «Repasar el concepto» desplegable (la lectura ya está en la pantalla de lección); las prácticas introductorias mantienen su explicación abierta al comenzar. Los resultados muestran primero las métricas y acciones, y permiten desplegar la revisión detallada. Confirmar lleva el foco a la devolución y se mantiene el recorrido de teclado dentro del diálogo, incluidos los desplegables.

Comprobación visual: primera actividad de Variables completa sin scroll a 1366 × 768 y 390 × 844. A 320 × 640 el contenido necesita desplazamiento, pero el botón permanece dentro de la pantalla antes y después de confirmar. Se conservan fuente legible y controles táctiles de al menos 46 px en las respuestas y acciones principales.

Verificación de este ajuste: `npm run build` correcto. Los 23 casos de navegador quedaron comprobados entre ejecuciones: 22 pasaron en la corrida general y el restante pasó al actualizar el selector que buscaba el antiguo título, sustituido ahora por la consigna. La comprobación visual adicional verificó la posición de los botones antes y después de responder a 1366 × 768, 390 × 844 y 320 × 640.

Reglas vigentes del 1 de octubre: [nueve recorridos y porcentajes](recorridos-progreso.md). La mejor marca de una lección y la habilidad histórica del perfil son métricas diferentes.
