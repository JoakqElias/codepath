import { defineConfig } from '#q-app/wrappers'

export default defineConfig(() => ({
  boot: [],
  css: ['app.scss'],
  extras: ['material-icons', 'roboto-font'],
  build: { vueRouterMode: 'hash' },
  framework: {
    config: { brand: {
      primary: '#5B4BDB', secondary: '#FFC857', accent: '#5B4BDB',
      dark: '#17243D', positive: '#218739', negative: '#C62828',
      info: '#5B4BDB', warning: '#FFC857'
    } },
    plugins: []
  },
  devServer: { open: false }
}))
