import { createClient } from '@supabase/supabase-js'

let client
export function getSupabase () {
  if (client) return client
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_PUBLISHABLE_KEY
  // Solo se acepta la clave publicable; las variables frontend son públicas.
  if (!url || !key || !key.startsWith('sb_publishable_') || key.includes('REEMPLAZAR')) {
    throw new Error('Falta configurar Supabase. Completá SUPABASE_URL y SUPABASE_PUBLISHABLE_KEY en .env.')
  }
  const parsed = new URL(url)
  if (parsed.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(parsed.hostname)) {
    throw new Error('La URL de Supabase debe usar HTTPS.')
  }
  client = createClient(url, key, {
    db: { schema: 'public', retry: false },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(15000) }) }
  })
  return client
}
