import { test, expect } from '@playwright/test'
import { getCourses, getUnits } from '../../src/services/contentRepository.js'

async function finish (page, lesson, correctCount) {
  await expect(page.getByRole('button', { name: 'Comprobar respuesta' })).toBeDisabled()
  for (const [i, activity] of lesson.activities.entries()) {
    const answer = activity.options.find(option => i < correctCount ? option.id === activity.answerId : option.id !== activity.answerId)
    await page.getByRole('radio', { name: answer.label, exact: true }).click()
    await page.getByRole('button', { name: 'Comprobar respuesta' }).click()
    await expect(page.locator('.answer-feedback')).toContainText(activity.explanation)
    await page.getByRole('button', { name: i === 3 ? 'Ver resultados' : 'Siguiente actividad' }).click()
  }
  await expect(page.locator('.result-metrics dd')).toHaveText(['4', String(correctCount), String(4 - correctCount), `${correctCount * 25} %`])
}

for (const course of getCourses()) {
  test(`${course.name}: dos lecciones reales, 75 % permite seguir y el 0 % también finaliza`, async ({ page }) => {
    test.setTimeout(90000)
    await page.setViewportSize({ width: 390, height: 844 })
    const unit = getUnits(course.id)[0]
    const [first, second] = unit.lessons
    const errors = []; page.on('pageerror', error => errors.push(error.message))
    await page.goto('/#/cursos')
    await page.getByRole('button', { name: 'Ver unidades de ' + course.name, exact: true }).click()
    await page.getByRole('button', { name: 'Abrir unidad: ' + unit.title }).click()
    await expect(page.getByRole('button', { name: 'Abrir lección: ' + second.title })).toBeDisabled()
    await page.getByRole('link', { name: 'Abrir lección: ' + first.title }).click()
    await expect(page.locator('.lesson-reading code')).toHaveText(first.code)
    await page.getByRole('link', { name: 'Resolver actividades' }).click()
    await finish(page, first, 3)
    await expect(page.locator('.lesson-best-score')).toHaveText('75 % completo · Tu mejor resultado')
    await expect(page.getByRole('link', { name: 'Siguiente lección' })).toBeVisible()
    await page.getByRole('link', { name: 'Volver a la unidad', exact: true }).click()
    await expect(page.locator('.lesson-state').first()).toContainText('75 % completo')
    await page.reload()
    await expect(page.locator('.lesson-state').first()).toContainText('75 % completo')
    await expect(page.getByRole('link', { name: 'Abrir lección: ' + second.title })).toBeEnabled()
    if (course.id === 'html') await page.screenshot({ path: 'test-results/html-progreso-75.png', fullPage: true })
    await page.getByRole('link', { name: 'Abrir lección: ' + first.title }).click()
    await page.getByRole('link', { name: 'Resolver actividades' }).click()
    await finish(page, first, 2)
    await expect(page.locator('.lesson-best-score')).toContainText('75 % completo')
    await page.getByRole('link', { name: 'Siguiente lección' }).click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(second.title)
    await page.getByRole('link', { name: 'Resolver actividades' }).click()
    await finish(page, second, 0)
    await expect(page.locator('.lesson-best-score')).toContainText('0 % completo')
    await page.getByRole('link', { name: 'Volver a la unidad', exact: true }).click()
    await expect(page.getByRole('link', { name: 'Abrir lección: ' + second.title })).toBeEnabled()
    await page.getByRole('link', { name: 'Volver a las unidades' }).click()
    await expect(page.locator('.unit-card--completed')).toHaveCount(1)
    await expect(page.locator('.unit-card').first()).toContainText('37.5 % de aciertos')
    expect(errors).toEqual([])
  })
}

test('índice de lecciones y rutas cruzadas no mezclan contenido entre tecnologías', async ({ page }) => {
  await page.goto('/#/lecciones')
  await page.getByRole('button', { name: 'Lecciones de HTML', exact: true }).click()
  await page.getByRole('link', { name: 'Organizá una página con HTML' }).click()
  await expect(page).toHaveURL(/cursos\/html\/unidades\/html-fundamentos\/lecciones\/html-estructura$/)
  await page.goto('/#/cursos/css/unidades/html-fundamentos/lecciones/html-estructura/actividades')
  await expect(page.getByRole('heading', { name: 'Práctica no encontrada' })).toBeVisible()
  await page.goto('/#/cursos/no-existe')
  await expect(page.getByRole('heading', { name: 'Curso no encontrado' })).toBeVisible()
})
