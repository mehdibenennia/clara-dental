import { neon } from '@neondatabase/serverless';
import { isAdmin } from '../../../../../lib/admin-auth';

const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await context.params;
  const { status, notes } = await request.json();
  if (!statuses.includes(status)) return Response.json({ error: 'Invalid status' }, { status: 400 });
  const sql = neon(process.env.DATABASE_URL!);
  await sql`update appointments set status = ${status}, notes = ${String(notes || '').slice(0, 1000)}, updated_at = now() where id = ${id}`;
  return Response.json({ ok: true });
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await context.params;
  const sql = neon(process.env.DATABASE_URL!);
  await sql`delete from appointments where id = ${id}`;
  return Response.json({ ok: true });
}
