import { startTestApi } from './apiServer.js'
const api = await startTestApi(54329)
console.log('API de prueba PostgreSQL lista en ' + api.url)
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, async () => { await api.close(); process.exit(0) })
