import { test, expect } from '@playwright/test'
import { javascriptUnits as units } from '../../src/data/javascriptCourse.js'

async function solve (page, lesson, wrongFirst = false) {
  await expect(page.getByRole('button', { name: 'Comprobar respuesta' })).toBeDisabled()
  for (const [index, activity] of lesson.activities.entries()) {
    const answer = activity.options.find(option => wrongFirst && index === 0 ? option.id !== activity.answerId : option.id === activity.answerId)
    await page.getByRole('radio', { name: answer.label, exact: true }).click()
    await page.getByRole('button', { name: 'Comprobar respuesta' }).click()
    await expect(page.locator('.answer-feedback')).toContainText(activity.explanation)
    await page.getByRole('button', { name: index === 1 ? 'Ver resultados' : 'Siguiente actividad' }).click()
  }
  await expect(page.locator('.result-score')).toHaveText((wrongFirst ? '1' : '2') + ' de 2 respuestas correctas')
}

test('las cinco unidades se completan con diez lecciones y veinte respuestas reales', async ({ page }) => {
  test.setTimeout(180000)
  await page.setViewportSize({ width: 1440, height: 1000 })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/#/cursos')
  // La navegación depende del evento emitido por CourseCard y atendido por su padre.
  await page.getByRole('button', { name: 'Ver unidades de JavaScript' }).click()
  await expect(page.getByRole('heading', { name: 'JavaScript desde cero' })).toBeVisible()
  await expect(page.locator('.unit-card')).toHaveCount(5)
  await expect(page.locator('.unit-card--locked')).toHaveCount(4)
  await page.screenshot({ path: 'test-results/javascript-unidades-escritorio.png', fullPage: true, animations: 'disabled' })
  for (const [unitIndex, unit] of units.entries()) {
    const card = page.getByRole('article', { name: unit.title, exact: true })
    await expect(card.locator('.unit-state')).toHaveText('play_circle_outline Disponible')
    await card.getByRole('button', { name: 'Abrir unidad: ' + unit.title }).click()
    for (const [lessonIndex, lesson] of unit.lessons.entries()) {
      if (lessonIndex === 0) await page.getByRole('link', { name: 'Abrir lección: ' + lesson.title }).click()
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(lesson.title)
      await page.getByRole('link', { name: 'Resolver actividades' }).click()
      await solve(page, lesson)
      await expect(page.getByText('¡Lección aprobada! Tu avance se actualizó en este recorrido.')).toBeVisible()
      if (lessonIndex === 0) await page.getByRole('link', { name: 'Siguiente lección' }).click()
    }
    await page.getByRole('link', { name: unitIndex === 4 ? 'Ver recorrido completado' : 'Ver mis unidades' }).click()
    await expect(page.locator('.unit-card--completed')).toHaveCount(unitIndex + 1)
    await expect(page.locator('.course-summary')).toContainText(((unitIndex + 1) * 2) + ' de 10 lecciones completadas')
  }
  await expect(page.getByRole('heading', { name: '¡Completaste el recorrido inicial!' })).toBeVisible()
  await page.screenshot({ path: 'test-results/javascript-completado.png', fullPage: true, animations: 'disabled' })
  expect(errors).toEqual([])
  await page.reload()
  await expect(page.locator('.unit-card--completed')).toHaveCount(0)
  await expect(page.locator('.unit-card--locked')).toHaveCount(4)
  await expect(page.locator('.course-summary')).toContainText('0 de 10 lecciones completadas')
})

test('móvil: equivocarse no aprueba; reintentar habilita la siguiente lección sin inventar avances', async ({ page }) => {
  test.setTimeout(90000)
  await page.setViewportSize({ width: 390, height: 844 })
  const lesson = units[0].lessons[0]
  await page.goto('/#/cursos/javascript')
  await page.screenshot({ path: 'test-results/javascript-unidades-movil.png', fullPage: true, animations: 'disabled' })
  await page.getByRole('button', { name: 'Abrir unidad: ' + units[0].title }).click()
  await expect(page.getByRole('button', { name: 'Abrir lección: ' + units[0].lessons[1].title })).toBeDisabled()
  await page.getByRole('link', { name: 'Abrir lección: ' + lesson.title }).click()
  await page.screenshot({ path: 'test-results/javascript-leccion-movil.png', fullPage: true, animations: 'disabled' })
  await page.getByRole('link', { name: 'Resolver actividades' }).click()
  await solve(page, lesson, true)
  await expect(page.getByRole('link', { name: 'Siguiente lección' })).toHaveCount(0)
  await page.getByRole('button', { name: 'Volver a practicar' }).click()
  await solve(page, lesson)
  await page.getByRole('link', { name: 'Ver mis unidades' }).click()
  await expect(page.locator('.course-summary')).toContainText('1 de 10 lecciones completadas')
  await expect(page.locator('.unit-card--locked')).toHaveCount(4)
  await page.getByRole('button', { name: 'Abrir unidad: ' + units[0].title }).click()
  await expect(page.getByRole('link', { name: 'Abrir lección: ' + units[0].lessons[1].title })).toBeEnabled()
  await page.getByRole('link', { name: 'Abrir lección: ' + lesson.title }).click()
  await page.getByRole('link', { name: 'Resolver actividades' }).click()
  await solve(page, lesson, true)
  await page.getByRole('link', { name: 'Ver mis unidades' }).click()
  await expect(page.locator('.course-summary')).toContainText('1 de 10 lecciones completadas')
})

test('no se puede saltar bloqueos mediante URL; parámetros desconocidos muestran una salida clara', async ({ page }) => {
  for (const route of [
    '/#/cursos/javascript/unidades/operadores',
    '/#/cursos/javascript/unidades/operadores/lecciones/calculos',
    '/#/cursos/javascript/unidades/operadores/lecciones/calculos/actividades',
    '/#/cursos/javascript/unidades/variables/lecciones/tipos-datos',
    '/#/cursos/javascript/unidades/variables/lecciones/tipos-datos/actividades'
  ]) {
    await page.goto(route)
    await expect(page.getByRole('heading', { name: 'JavaScript desde cero' })).toBeVisible()
    await expect(page.locator('.locked-notice')).toBeVisible()
  }
  await page.goto('/#/cursos/javascript/unidades/inexistente')
  await expect(page.getByRole('heading', { name: 'Unidad no encontrada' })).toBeVisible()
  await page.goto('/#/cursos/javascript/unidades/variables/lecciones/inexistente')
  await expect(page.getByRole('heading', { name: 'Lección no encontrada' })).toBeVisible()
  await page.goto('/#/cursos/javascript/unidades/variables/lecciones/inexistente/actividades')
  await expect(page.getByRole('heading', { name: 'Práctica no encontrada' })).toBeVisible()
  await page.goto('/#/cursos/javascript/unidades/variables/lecciones/guardar-valores')
  await page.evaluate(() => { window.location.hash = '/cursos/javascript/unidades/variables/lecciones/tipos-datos' })
  await expect(page.locator('.locked-notice')).toBeVisible()
})
