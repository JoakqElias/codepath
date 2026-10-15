// Adaptador HTTP de pruebas: ejecuta SQL real bajo RLS en PGlite.
// NO es un servidor de producción ni reemplaza la API de Supabase.
import { createServer } from 'node:http'
import { createDatabase, asVisitor } from './database.js'

export async function startTestApi (port = 0) {
  const db = await createDatabase()
  let failNextRpc = false
  let emptyCourses = false
  const server = createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'apikey, authorization, content-type, x-client-info, accept, prefer, accept-profile, content-profile')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
    res.setHeader('Content-Type', 'application/json')
    const send = (status, body) => { res.writeHead(status); res.end(JSON.stringify(body)) }
    if (req.method === 'OPTIONS') return send(200, null)
    const url = new URL(req.url, 'http://localhost')
    try {
      if (url.pathname === '/health') return send(200, { ready: true })
      // Controles exclusivos del harness, escuchando solo en loopback.
      if (url.pathname === '/__test/reset' && req.method === 'POST') {
        failNextRpc = false; emptyCourses = false
        await db.query("update public.courses set name = 'JavaScript' where id = 'javascript'")
        return send(200, {})
      }
      if (url.pathname === '/__test/title' && req.method === 'POST') {
        await db.query("update public.courses set name = 'JavaScript actualizado' where id = 'javascript'")
        return send(200, {})
      }
      if (url.pathname === '/__test/fail-rpc' && req.method === 'POST') { failNextRpc = true; return send(200, {}) }
      if (url.pathname === '/__test/empty' && req.method === 'POST') { emptyCourses = true; return send(200, {}) }
      if (url.pathname === '/rest/v1/rpc/check_practice_answer' && req.method === 'POST') {
        if (failNextRpc) { failNextRpc = false; return send(503, { message: 'Conexión interrumpida para prueba' }) }
        let body = ''
        for await (const chunk of req) body += chunk
        const args = JSON.parse(body)
        return send(200, (await asVisitor(db, 'select * from public.check_practice_answer($1, $2)', [args.p_question_id, args.p_option_id])).rows)
      }
      const table = url.pathname.split('/').at(-1)
      const allowed = ['courses', 'units', 'lessons', 'questions', 'answer_options', 'solutions']
      if (!allowed.includes(table)) return send(404, { message: 'No encontrado' })
      if (table === 'solutions') return send(403, { message: 'Esquema privado' })
      const schemaTable = 'public.' + table
      if (req.method === 'PATCH') return send(200, (await asVisitor(db, `update ${schemaTable} set position = 99 returning *`)).rows)
      if (req.method === 'DELETE') return send(200, (await asVisitor(db, `delete from ${schemaTable} returning *`)).rows)
      if (req.method !== 'GET') return send(405, { message: 'Solo lectura' })
      const params = []
      const clauses = []
      for (const [key, value] of url.searchParams) {
        if (['select', 'order'].includes(key)) continue
        if (!/^[a-z_]+$/.test(key) || !value.startsWith('eq.')) throw new Error('Filtro inválido')
        params.push(value.slice(3))
        clauses.push(`${key} = $${params.length}`)
      }
      const order = url.searchParams.get('order')
      if (order && !/^position\.(asc|desc)$/.test(order)) throw new Error('Orden inválido')
      const selection = url.searchParams.get('select') || '*'
      const counts = selection.includes('questions(count)')
      const projection = counts ? '*' : selection
      if (projection !== '*' && !/^[a-z_, ]+$/.test(projection)) throw new Error('Selección inválida')
      let { rows } = await asVisitor(db, `select ${projection} from ${schemaTable}` +
        (clauses.length ? ' where ' + clauses.join(' and ') : '') +
        (order ? ' order by ' + order.replace('.', ' ') : ''), params)
      if (table === 'courses' && emptyCourses) rows = []
      if (counts) for (const row of rows) {
        const result = await asVisitor(db, 'select count(*)::int as count from public.questions where lesson_id = $1', [row.id])
        row.questions = result.rows
      }
      if (req.headers.accept?.includes('application/vnd.pgrst.object+json')) {
        if (rows.length !== 1) return send(406, { code: 'PGRST116', message: 'No rows', details: '0 rows' })
        return send(200, rows[0])
      }
      return send(200, rows)
    } catch (error) {
      return send(error.message.includes('permission denied') ? 403 : 400, { code: error.code, message: error.message })
    }
  })
  await new Promise(resolve => server.listen(port, '127.0.0.1', resolve))
  return { db, url: `http://127.0.0.1:${server.address().port}`,
    close: async () => { await new Promise(resolve => server.close(resolve)); await db.close() } }
}
