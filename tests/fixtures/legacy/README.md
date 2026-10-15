# Datos archivados de la etapa anterior

Estos archivos son la entrada de `scripts/generate-seed.mjs`. La aplicación no
los importa y no están incluidos en el build. La fuente de contenido en ejecución
es Supabase. Las soluciones solo se cargan en `private.solutions` mediante SQL.

Las pruebas anteriores se conservan en `tests/legacy-unit` y `tests/legacy-e2e`
como referencia histórica. Sus supuestos (repositorio síncrono y soluciones
locales) fueron reemplazados por las pruebas de PostgreSQL, repositorio y navegador
de esta etapa; no forman parte de la suite vigente.
