import { test, expect } from '@playwright/test'
import { courses } from '../../src/data/courses.js'
import { activitiesForCourse } from '../../src/data/activities.js'

test('inicio, catálogo, paleta real de Quasar y enlaces de escritorio', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Aprendé a programar,paso a paso')
  await expect(page.getByRole('link', { name: 'Explorar cursos y tutoriales' })).toHaveCSS('background-color', 'rgb(91, 75, 219)')
  await page.screenshot({ path: 'test-results/inicio-escritorio.png', fullPage: true })
  await page.getByRole('link', { name: 'Explorar cursos y tutoriales' }).click()
  await expect(page.getByRole('article')).toHaveCount(9)
  await expect(page.getByRole('button', { name: /Curso completo de .*Próximamente/ })).toHaveCount(9)
  for (const course of courses) {
    const card = page.getByRole('article', { name: course.name, exact: true })
    await expect(card.getByRole('button', { name: /Curso completo/ })).toBeDisabled()
    await expect(card.getByRole('link', { name: 'Probar actividades de ' + course.name, exact: true })).toHaveAttribute('href', '#/cursos/' + course.id + '/actividades')
  }
  await page.screenshot({ path: 'test-results/cursos-escritorio.png', fullPage: true })
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Lecciones' }).click()
  await expect(page.getByText('EN DESARROLLO', { exact: true })).toBeVisible()
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Perfil' }).click()
  await expect(page.getByText(/Esta entrega no tiene cuentas ni guarda avances/)).toBeVisible()
  expect(errors).toEqual([])
})

for (const course of courses) {
  test('práctica completa de ' + course.name + ': corrección, resultado y reinicio', async ({ page }) => {
    await page.goto('/#/cursos/' + course.id + '/actividades')
    const activities = activitiesForCourse(course.id)
    await expect(page.getByRole('button', { name: 'Comprobar respuesta' })).toBeDisabled()
    for (const [index, activity] of activities.entries()) {
      await expect(page.getByRole('heading', { level: 2, name: activity.title })).toBeVisible()
      // Primera respuesta incorrecta; las otras dos correctas: resultado esperado 2/3.
      const answer = activity.options.find(option => index === 0 ? option.id !== activity.answerId : option.id === activity.answerId)
      await page.getByRole('radio', { name: answer.label, exact: true }).click()
      await page.getByRole('button', { name: 'Comprobar respuesta' }).click()
      await expect(page.getByText(index === 0 ? 'Respuesta incorrecta. Veamos por qué.' : '¡Respuesta correcta!', { exact: true })).toBeVisible()
      await expect(page.locator('.answer-feedback')).toContainText(activity.explanation)
      await expect(page.getByRole('button', { name: 'Comprobar respuesta' })).toHaveCount(0)
      if (index === 0) await expect(page.locator('.answer-feedback')).toContainText(activity.options.find(option => option.id === activity.answerId).label)
      await page.getByRole('button', { name: index === 2 ? 'Ver resultados' : 'Siguiente actividad' }).click()
    }
    await expect(page.getByRole('heading', { name: 'Resultados de esta práctica' })).toBeFocused()
    await expect(page.locator('.result-score')).toHaveText('2 de 3 respuestas correctas')
    await expect(page.locator('.result-list li')).toHaveCount(3)
    await page.getByRole('button', { name: 'Volver a practicar' }).click()
    await expect(page.getByText('0 respondidas', { exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Comprobar respuesta' })).toBeDisabled()
  })
}

test('navegación móvil accesible, foco y sin progreso persistido', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.screenshot({ path: 'test-results/inicio-movil.png', fullPage: true })
  const menu = page.getByRole('button', { name: 'Menú', exact: true })
  await expect(menu).toBeVisible()
  await menu.click()
  const nav = page.getByRole('navigation', { name: 'Navegación móvil' })
  await expect(nav.getByRole('link')).toHaveCount(4)
  await nav.getByRole('link', { name: 'Cursos y tutoriales' }).focus()
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await menu.click()
  await nav.getByRole('link', { name: 'Cursos y tutoriales' }).click()
  await expect(nav).toBeHidden()
  await expect(page.getByRole('main')).toHaveCount(1)
  await expect(page.getByRole('main')).toBeFocused()
  await page.screenshot({ path: 'test-results/cursos-movil.png', fullPage: true })
  await page.getByRole('link', { name: 'Probar actividades de HTML', exact: true }).click()
  await page.getByRole('radio', { name: '<h1>', exact: true }).click()
  await page.getByRole('button', { name: 'Comprobar respuesta' }).click()
  await expect(page.getByText('¡Respuesta correcta!', { exact: true })).toBeVisible()
  await page.screenshot({ path: 'test-results/practica-movil.png', fullPage: true })
  await page.reload()
  await expect(page.getByText('0 respondidas', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Comprobar respuesta' })).toBeDisabled()
  for (const [name, title] of [['Lecciones', 'Unidades y lecciones'], ['Perfil', 'Tu perfil, próximamente'], ['Inicio', 'Aprendé a programar,paso a paso']]) {
    await page.getByRole('button', { name: 'Menú', exact: true }).click()
    await nav.getByRole('link', { name, exact: true }).click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title)
  }
})

for (const width of [320, 390, 768, 1440]) {
  test('sin desborde horizontal a ' + width + ' px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    for (const route of ['/', '/#/cursos', '/#/cursos/node/actividades', '/#/lecciones', '/#/perfil']) {
      await page.goto(route)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    }
    await page.goto('/#/cursos')
    const columns = await page.locator('.course-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length)
    expect(columns).toBe(width < 600 ? 1 : width < 1024 ? 2 : 3)
  })
}

test('rutas inexistentes y cambio entre tecnologías no conservan respuestas ajenas', async ({ page }) => {
  await page.goto('/#/no-existe')
  await expect(page.getByRole('heading', { name: 'Este camino todavía no existe' })).toBeVisible()
  await page.goto('/#/cursos/desconocido/actividades')
  await expect(page.getByRole('heading', { name: 'Práctica no encontrada' })).toBeVisible()
  await page.goto('/#/cursos/html/actividades')
  await page.getByRole('radio', { name: '<h1>', exact: true }).click()
  await page.getByRole('button', { name: 'Comprobar respuesta' }).click()
  await page.evaluate(() => { window.location.hash = '/cursos/css/actividades' })
  await expect(page.getByRole('heading', { name: 'Un poco de color' })).toBeVisible()
  await expect(page.getByText('0 respondidas', { exact: true })).toBeVisible()
})
