# Registro de pruebas y correcciones

Fecha de verificación: **15 de octubre de 2026**. Entorno: Windows, Node.js,
Vue 3, Quasar, cliente oficial `@supabase/supabase-js`, PostgreSQL en memoria
mediante PGlite, Playwright, Microsoft Edge y Google Chrome instalados.

## Alcance de la evidencia

Las pruebas SQL ejecutan la migración y el seed reales. Usan `SET LOCAL ROLE anon`
y `authenticated`, sin privilegios administrativos en las consultas de visitantes.
Las pruebas de repositorio usan el cliente oficial de Supabase contra un adaptador
HTTP local que consulta esa base aplicando RLS. Las pruebas de navegador cargan
la aplicación Vue/Quasar y utilizan ese mismo adaptador.

**No se han ejecutado contra Supabase Cloud.** No hay una cuenta conectada ni
un proyecto remoto creado en esta sesión. El adaptador no reproduce todas las
funciones de PostgREST ni la infraestructura de Supabase. La prueba móvil usa
Chrome con viewport táctil de 390 × 844, no un teléfono físico; Edge usa
1440 × 1000. Son dos navegadores distintos, con sesiones aisladas.

## Resultados locales

- `npm test`: **23 pruebas aprobadas** entre SQL, repositorio, progreso, perfil y configuración.
- `npm run test:e2e`: **16 pruebas aprobadas**; ocho escenarios en cada navegador.
- `npm run build`: compilación de producción correcta en `dist/spa`.
- El build no incluye los datos archivados ni el conjunto de soluciones.

| Requisito | Procedimiento ejecutado | Resultado local |
|---|---|---|
| Dos navegadores | Edge escritorio y Chrome con viewport móvil consultan el mismo backend PostgreSQL local | Aprobado; aceptación remota pendiente |
| Modificar un título | UPDATE administrativo del título de JavaScript, nueva consulta con el cliente y botón Volver a consultar | Se muestra el título actualizado; edición en Dashboard pendiente |
| Relaciones | Consultar curso/unidad/lección/pregunta por FK; probar combinación de CSS con unidad de JavaScript | No aparecen contenidos ajenos |
| Orden | Consultas con ORDER BY position; edición de título/registro sin cambiar position | Se conserva la secuencia de unidades y lecciones |
| Identificador inexistente | Rutas de curso, unidad y lección inexistentes; RPC con pregunta inexistente | Vistas no encontrado y RPC rechazada |
| Sin conexión | Abort de solicitudes de contenido en Playwright, restauración y reintento | Error visible, ruta conservada y recuperación |
| Fallo al corregir | HTTP 503 al comprobar la primera respuesta, luego reintentar | Cero respuestas contabilizadas antes del reintento; nunca se marca incorrecta por el fallo |
| Escrituras de visitante | INSERT/UPDATE/DELETE de las cinco tablas con roles anon y authenticated | Todas rechazadas por permisos |
| Soluciones privadas | SELECT private.solutions con ambos roles y revisión de objetos públicos | Acceso denegado; no hay answerId ni explanation en preguntas descargadas |
| Finalizar una lección | Resolver sus cuatro actividades mediante RPC, abrir resultado y siguiente lección | 4/4, 100 %, próxima lección habilitada y avance conservado al recargar |
| Unidad no disponible | Cuatro unidades JS sin contenido público; acceso directo a operadores | Aviso de no disponibilidad; cero lecciones públicas |
| Catálogo vacío | Respuesta válida vacía, distinta de error HTTP | Mensaje No hay cursos disponibles |
| Carga | Demorar consulta de curso | Indicador Cargando contenidos visible |
| Borradores | Despublicar curso, unidad, lección o pregunta; deshabilitar unidad | RLS oculta descendientes y RPC los rechaza |
| Integridad | FK huérfana, posición cero/repetida, padre ambiguo y solución de otra pregunta | Restricciones rechazan cada operación |
| Configuración | URL ausente, clave ausente, marcador de ejemplo, clave secreta ficticia y JWT ficticio | Cliente rechaza configuración inválida, sin enviar solicitudes |
| Seed repetible | Repetir seed después de modificar un título | No duplica ni pisa la edición administrativa |

Archivos de prueba vigentes: `tests/database.test.js`,
`tests/content-repository.test.js`, `tests/learning.test.js`,
`tests/profile.test.js`, `tests/supabase-config.test.js` y
`tests/e2e/supabase.spec.js`. El adaptador de pruebas se limita a loopback y
no se incluye en el build de la aplicación.

## Correcciones realizadas

1. Se reemplazó el repositorio síncrono y las guardas que dependían de archivos
   locales. Cada vista carga primero y comprueba las relaciones; los fallos de
   red no se confunden con identificadores inexistentes ni bloquean la navegación.
2. Se retiró la corrección por `activity.answerId` del frontend. El resultado
   local se calcula con las respuestas recibidas por RPC después de comprobarlas.
3. Los identificadores a/b/c de opciones introductorias se convirtieron en IDs
   globales ligados a su pregunta. La FK compuesta impide soluciones cruzadas.
4. Se distinguió No disponible (contenido editorial pendiente) de Bloqueada
   (progreso local pendiente), incluidas etiquetas accesibles de los botones.
5. La primera corrida de navegador tuvo cuatro fallos: dos por buscar el texto
   visual de un botón cuyo nombre accesible era distinto; dos porque los reintentos
   automáticos del SDK demoraban la vista de error sin conexión. Se corrigió la
   etiqueta, su selector y se deshabilitaron los reintentos automáticos de base
   de datos. El reintento ahora corresponde al botón del usuario. La siguiente
   corrida completa aprobó los 16 casos.
6. Una expectativa inicial de prueba usaba `condiciones` en vez del identificador
   original `condicionales`; se corrigió la prueba y se conservó el ID de la aplicación.
7. Se evitaron duplicaciones del enunciado, concepto y código de lecciones en
   preguntas mediante herencia al ensamblar las vistas.
8. Se limitó la inyección de entorno a dos variables públicas y se agregó un
   rechazo de claves no publicables antes de la compilación, además del control
   en el cliente. No se generan archivos con credenciales privadas.

## Evidencias

- [Resultado en Edge, escritorio](evidencias/edge-resultado.png).
- [Resultado en Chrome, viewport móvil](evidencias/chrome-movil-resultado.png).
- Playwright conserva capturas y trazas de fallos en `test-results/`, ignorado
  por git. Las capturas finales anteriores se copiaron a la documentación.

## Aceptación remota pendiente

Completar sobre el proyecto real, sin pegar claves en el registro:

- [ ] Registrar nombre, organización, ID público del proyecto y fecha de creación.
- [ ] Aplicar migración y seed, ejecutar `verify.sql` y registrar el resultado.
- [ ] Configurar URL y clave publicable en `.env`; compilar/iniciar la aplicación.
- [ ] Abrir la aplicación en dos navegadores o dispositivos contra ese proyecto.
- [ ] Cambiar un título en SQL Editor o Table Editor de Supabase y volver a consultar.
- [ ] Confirmar filtros por FK y orden de unidades y lecciones en la API real.
- [ ] Abrir una URL con un identificador inexistente.
- [ ] Desconectar la red después de cargar la aplicación, consultar de nuevo y reintentar al reconectar.
- [ ] Interrumpir la red al comprobar una respuesta; verificar que no se cuenta como incorrecta.
- [ ] Con la clave publicable, intentar escritura desde DevTools y comprobar el rechazo.
- [ ] Consultar `solutions` y el esquema `private` desde el cliente y comprobar el rechazo; no agregar private a esquemas expuestos.
- [ ] Completar una lección, registrar aciertos/total y verificar la próxima lección.

Para comprobar desde DevTools la API real, usar una URL y clave **publicables**
solo en esa sesión. Ejemplo de prueba de modificación sin cambiar un título:

```js
const headers = { apikey: '<CLAVE_PUBLICABLE>', 'Content-Type': 'application/json' }
await fetch('<URL_SUPABASE>/rest/v1/courses?id=eq.javascript', {
  method: 'PATCH', headers,
  body: JSON.stringify({ name: 'JavaScript' })
}) // Debe rechazar la escritura; hacerlo antes de la prueba de cambio de título.
await fetch('<URL_SUPABASE>/rest/v1/solutions?select=*', { headers })
// Debe rechazar/no encontrar la tabla: solutions no está en public.
await fetch('<URL_SUPABASE>/rest/v1/solutions?select=*', {
  headers: { ...headers, 'Accept-Profile': 'private' }
}) // Debe rechazar el esquema no expuesto o denegar el permiso.
```

No marcar estos ítems como realizados basándose solo en las pruebas locales.
El progreso personal sigue siendo local; aquí se verifica compartir **contenidos**,
no sincronizar perfiles ni resultados oficiales.
