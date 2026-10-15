import { test, expect } from '@playwright/test'
import { activitiesForCourse } from '../../src/data/activities.js'

async function solve (page, correctCount = 3) {
  for (const [i, activity] of activitiesForCourse('html').entries()) {
    const option = activity.options.find(o => i < correctCount ? o.id === activity.answerId : o.id !== activity.answerId)
    await page.getByRole('radio', { name: option.label, exact: true }).click()
    await page.getByRole('button', { name: 'Comprobar respuesta' }).click()
    await page.getByRole('button', { name: i === 2 ? 'Ver resultados' : 'Siguiente actividad' }).click()
  }
}

test('modal conserva catálogo, desenfoca el fondo, atrapa el foco y vuelve al disparador', async ({ page }) => {
  await page.goto('/#/cursos')
  const trigger = page.getByRole('button', { name: 'Probar actividades de HTML', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(page.getByRole('button', { name: 'Cerrar actividad' })).toBeFocused()
  await expect(page.locator('#main-content')).toHaveAttribute('inert', '')
  await expect(page.locator('.practice-dialog .q-dialog__backdrop')).toHaveCSS('backdrop-filter', 'blur(8px)')
  await expect(page.locator('#main-content .course-card')).toHaveCount(9)
  await page.screenshot({ path: 'test-results/modal-escritorio.png' })
  for (let i = 0; i < 9; i++) {
    await page.keyboard.press('Tab')
    expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true)
  }
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(page).toHaveURL(/#\/cursos$/)
  await expect(trigger).toBeFocused()
})

test('perfil real: habilidad, racha, niveles, identidad y persistencia', async ({ page }) => {
  test.setTimeout(90000)
  await page.goto('/#/perfil')
  await expect(page.getByTestId('skill')).toHaveText('Sin datos')
  await page.getByLabel('Tu nombre').fill('Joaco')
  await page.getByRole('button', { name: 'Cohete', exact: true }).click()
  await page.getByRole('button', { name: 'Guardar perfil', exact: true }).click()
  await page.goto('/#/cursos/html/actividades')
  await solve(page)
  await expect(page.locator('.practice-live-stats')).toContainText('Habilidad: 100%')
  await expect(page.locator('.practice-live-stats')).toContainText('Racha: 1')
  await page.getByRole('button', { name: 'Volver a practicar' }).click()
  await solve(page, 1)
  await expect(page.locator('.practice-live-stats')).toContainText('Habilidad: 66.7%')
  await expect(page.locator('.practice-live-stats')).toContainText('Racha: 0')
  for (let i = 0; i < 2; i++) {
    await page.getByRole('button', { name: 'Volver a practicar' }).click()
    await solve(page)
  }
  await page.getByRole('link', { name: 'Ver mi perfil', exact: true }).click()
  await expect(page.getByTestId('streak')).toHaveText('2')
  await expect(page.getByTestId('skill')).toHaveText('83.3%')
  await expect(page.locator('.profile-name')).toContainText('Joaco')
  await expect(page.locator('.profile-name')).toContainText('Nivel 2')
  await page.reload()
  await expect(page.getByTestId('streak')).toHaveText('2')
  await expect(page.getByTestId('skill')).toHaveText('83.3%')
  await expect(page.locator('.profile-name')).toContainText('Joaco')
  await page.screenshot({ path: 'test-results/perfil-escritorio.png', fullPage: true })
})

test('móvil: salir pide confirmación y conserva errores sin sumar racha', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#/cursos/html/actividades')
  const a = activitiesForCourse('html')[0]
  await page.getByRole('radio', { name: a.options.find(o => o.id !== a.answerId).label, exact: true }).click()
  await page.getByRole('button', { name: 'Comprobar respuesta' }).click()
  await page.screenshot({ path: 'test-results/modal-movil.png' })
  await page.getByRole('button', { name: 'Cerrar actividad' }).click()
  await expect(page.getByRole('heading', { name: '¿Dejar esta práctica?' })).toBeFocused()
  await page.getByRole('button', { name: 'Seguir practicando', exact: true }).click()
  await expect(page.locator('.answer-feedback')).toContainText('Respuesta incorrecta')
  await page.getByRole('button', { name: 'Cerrar actividad' }).click()
  await page.getByRole('button', { name: 'Salir de la práctica' }).click()
  await page.goto('/#/perfil')
  await expect(page.getByTestId('skill')).toHaveText('0%')
  await expect(page.getByTestId('streak')).toHaveText('0')
  await expect(page.locator('.profile-history')).toContainText('Interrumpida')
  await page.screenshot({ path: 'test-results/perfil-movil.png', fullPage: true })
})

test('almacenamiento corrupto o bloqueado no impide usar el perfil', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('codepath.profile.v1', '{invalid'))
  await page.goto('/#/perfil')
  await expect(page.getByTestId('skill')).toHaveText('Sin datos')
  await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new Error('blocked') } })
  await page.reload()
  await expect(page.getByText('El navegador no permite guardar los datos.', { exact: false })).toBeVisible()
  await page.getByLabel('Tu nombre').fill('Invitado')
  await page.getByRole('button', { name: 'Guardar perfil' }).click()
  await expect(page.locator('.profile-name')).toContainText('Invitado')
})
