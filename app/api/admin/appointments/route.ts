import { neon } from '@neondatabase/serverless';
import { isAdmin } from '../../../../lib/admin-auth';

export async function GET() {
  if (!(await isAdmin())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  if (!process.env.DATABASE_URL) return Response.json({ error: 'Database is not configured' }, { status: 500 });
  const sql = neon(process.env.DATABASE_URL);
  const appointments = await sql`select id, dentist, appointment_date, appointment_time, patient_name, patient_email, status, notes, created_at, updated_at from appointments order by appointment_date asc, appointment_time asc`;
  return Response.json({ appointments });
}
