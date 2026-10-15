import { test, expect } from '@playwright/test'
import { javascriptUnits } from '../fixtures/legacy/javascriptCourse.js'
const api = 'http://127.0.0.1:54329'
const lesson = javascriptUnits[0].lessons[0]
const lessonPath = '/#/cursos/javascript/unidades/variables/lecciones/guardar-valores'

test.beforeEach(async ({ request }) => { await request.post(api + '/__test/reset') })

test('catálogo remoto y título administrativo actualizado al volver a consultar', async ({ page, request }) => {
  await page.goto('/#/cursos')
  await expect(page.locator('.course-card')).toHaveCount(9)
  await request.post(api + '/__test/title')
  await page.getByRole('button', { name: 'Volver a consultar' }).click()
  await expect(page.getByRole('heading', { name: 'JavaScript actualizado', exact: true })).toBeVisible()
})

test('curso, unidad, lección y preguntas filtran por sus relaciones y respetan el orden', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/#/cursos')
  await page.getByRole('button', { name: 'Ver unidades de JavaScript', exact: true }).click()
  await expect(page.locator('.unit-card')).toHaveCount(5)
  await expect(page.locator('.unit-card h2')).toHaveText(javascriptUnits.map(u => u.title))
  await expect(page.getByRole('button', { name: /^No disponible: / })).toHaveCount(4)
  await page.getByRole('button', { name: 'Abrir unidad: ' + javascriptUnits[0].title }).click()
  await expect(page.locator('.lesson-card h2')).toHaveText(javascriptUnits[0].lessons.map(l => l.title))
  await page.getByRole('link', { name: 'Abrir lección: ' + lesson.title }).click()
  await expect(page.getByRole('heading', { name: lesson.title, exact: true })).toBeVisible()
  await page.getByRole('link', { name: 'Resolver actividades' }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByRole('heading', { name: lesson.activities[0].question, exact: true })).toBeVisible()
  await expect(dialog.getByRole('radio')).toHaveCount(3)
  expect(errors).toEqual([])
})

test('identificadores inexistentes y relaciones ajenas muestran contenido no encontrado', async ({ page }) => {
  for (const [path, title] of [
    ['/#/cursos/no-existe', 'Curso no encontrado'],
    ['/#/cursos/css/unidades/variables', 'Unidad no encontrada'],
    ['/#/cursos/javascript/unidades/variables/lecciones/no-existe', 'Lección no encontrada'],
    ['/#/cursos/css/unidades/variables/lecciones/guardar-valores', 'Lección no encontrada']
  ]) {
    await page.goto(path)
    await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible()
  }
})

test('unidad en preparación y acceso directo a lección bloqueada', async ({ page }) => {
  await page.goto('/#/cursos/javascript/unidades/operadores')
  await expect(page.getByText('Esta unidad todavía no tiene lecciones publicadas. No disponible.', { exact: true })).toBeVisible()
  await expect(page.locator('.lesson-card')).toHaveCount(0)
  await page.goto('/#/cursos/javascript/unidades/variables/lecciones/tipos-datos')
  await expect(page.getByText('Ese contenido está bloqueado.', { exact: false })).toBeVisible()
})

test('consulta sin conexión informa error, conserva la ruta y permite reintentar', async ({ page }) => {
  await page.route('**/rest/v1/**', route => route.abort('internetdisconnected'))
  await page.goto('/#/cursos')
  await expect(page.getByRole('heading', { name: 'No pudimos cargar los contenidos' })).toBeVisible()
  await expect(page.locator('.course-card')).toHaveCount(0)
  await page.unroute('**/rest/v1/**')
  await page.getByRole('button', { name: 'Reintentar consulta' }).click()
  await expect(page.locator('.course-card')).toHaveCount(9)
})

test('catálogo vacío se distingue de una consulta fallida', async ({ page, request }) => {
  await request.post(api + '/__test/empty')
  await page.goto('/#/cursos')
  await expect(page.getByText('No hay cursos disponibles en este momento.', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Reintentar consulta' })).toHaveCount(0)
})

test('carga visible y consulta lenta al cambiar de curso no muestra datos anteriores', async ({ page }) => {
  await page.route('**/rest/v1/courses?**', async route => {
    await new Promise(resolve => setTimeout(resolve, 500))
    await route.continue()
  })
  await page.goto('/#/cursos/javascript')
  await expect(page.getByText('Cargando contenidos…', { exact: true })).toBeVisible()
  await expect(page.locator('.unit-card')).toHaveCount(5)
  await page.goto('/#/cursos/css')
  await expect(page.locator('.unit-card')).toHaveCount(1)
  await expect(page.locator('.unit-card h2')).not.toContainText(javascriptUnits[0].title)
})

test('completa una lección por RPC; un fallo no registra errores y se puede reintentar', async ({ page, request }) => {
  await page.goto(lessonPath + '/actividades')
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByRole('button', { name: 'Comprobar respuesta', exact: true })).toBeDisabled()
  for (const [index, activity] of lesson.activities.entries()) {
    const option = activity.options.find(o => o.id === activity.answerId)
    await dialog.getByRole('radio', { name: option.label, exact: true }).click()
    if (index === 0) {
      await request.post(api + '/__test/fail-rpc')
      await dialog.getByRole('button', { name: 'Comprobar respuesta', exact: true }).click()
      await expect(dialog.getByRole('alert')).toContainText('No se contabilizó como incorrecta')
      await expect(dialog.locator('.practice-counter')).toContainText('0 respondidas')
      await expect(dialog.locator('.answer-feedback')).toHaveCount(0)
      await dialog.getByRole('button', { name: 'Reintentar comprobación' }).click()
    } else await dialog.getByRole('button', { name: 'Comprobar respuesta', exact: true }).click()
    await expect(dialog.locator('.answer-feedback')).toContainText(activity.explanation)
    await dialog.getByRole('button', { name: index === lesson.activities.length - 1 ? 'Ver resultados' : 'Siguiente actividad', exact: true }).click()
  }
  await expect(dialog.locator('.result-score')).toHaveText('4 de 4 respuestas correctas')
  await expect(dialog.locator('.lesson-best-score')).toHaveText('100 % completo · Tu mejor resultado')
  await page.screenshot({ path: `test-results/${test.info().project.name}-resultado-supabase.png`, fullPage: true })
  await dialog.getByRole('link', { name: 'Siguiente lección', exact: true }).click()
  await expect(page.getByRole('heading', { name: javascriptUnits[0].lessons[1].title, exact: true })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('heading', { name: javascriptUnits[0].lessons[1].title, exact: true })).toBeVisible()
})
