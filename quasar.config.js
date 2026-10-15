import { defineConfig } from '#q-app/wrappers'

export default defineConfig(() => ({
  boot: [],
  css: ['app.scss'],
  extras: ['material-icons', 'roboto-font'],
  build: {
    vueRouterMode: 'hash',
    // Allowlist: no se inyecta accidentalmente el resto de .env en el frontend.
    envFilter: values => {
      const key = process.env.SUPABASE_PUBLISHABLE_KEY || values?.SUPABASE_PUBLISHABLE_KEY || ''
      if (key && !key.startsWith('sb_publishable_')) {
        throw new Error('El frontend solo admite una clave sb_publishable_. No se compilará con una clave secreta o JWT.')
      }
      return {
        SUPABASE_URL: process.env.SUPABASE_URL || values?.SUPABASE_URL || '',
        SUPABASE_PUBLISHABLE_KEY: key
      }
    }
  },
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
