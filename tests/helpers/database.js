import { readFile } from 'node:fs/promises'
import { PGlite } from '@electric-sql/pglite'

export async function createDatabase () {
  const db = new PGlite()
  await db.exec('create role anon; create role authenticated;')
  await db.exec(await readFile(new URL('../../supabase/migrations/202610150001_content.sql', import.meta.url), 'utf8'))
  await db.exec(await readFile(new URL('../../supabase/seed.sql', import.meta.url), 'utf8'))
  return db
}
export const asVisitor = (db, sql, params = [], role = 'anon') => db.transaction(async tx => {
  if (!['anon', 'authenticated'].includes(role)) throw new Error('Rol inválido')
  await tx.exec(`set local role ${role}`)
  return tx.query(sql, params)
})
