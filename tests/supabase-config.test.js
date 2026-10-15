import test from 'node:test'
import assert from 'node:assert/strict'

test('configuración exige URL y clave publicable; rechaza claves secretas o JWT', async () => {
  const previousUrl = process.env.SUPABASE_URL
  const previousKey = process.env.SUPABASE_PUBLISHABLE_KEY
  try {
    for (const [i, key] of ['', 'sb_secret_NO_REAL_CREDENTIAL', 'eyJ_NO_REAL_CREDENTIAL', 'sb_publishable_REEMPLAZAR'].entries()) {
      process.env.SUPABASE_URL = 'https://test.supabase.co'
      process.env.SUPABASE_PUBLISHABLE_KEY = key
      const { getSupabase } = await import(`../src/services/supabase.js?invalid=${i}`)
      assert.throws(getSupabase, /Falta configurar Supabase/)
    }
    process.env.SUPABASE_URL = ''
    process.env.SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_LOCAL_TEST'
    const { getSupabase } = await import('../src/services/supabase.js?missing-url')
    assert.throws(getSupabase, /Falta configurar/)
  } finally {
    if (previousUrl === undefined) delete process.env.SUPABASE_URL
    else process.env.SUPABASE_URL = previousUrl
    if (previousKey === undefined) delete process.env.SUPABASE_PUBLISHABLE_KEY
    else process.env.SUPABASE_PUBLISHABLE_KEY = previousKey
  }
})
