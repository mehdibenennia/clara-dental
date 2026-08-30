import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
  const body = await request.json();
  if (!process.env.DATABASE_URL) return Response.json({ error: 'Database is not configured' }, { status: 500 });
  const sql = neon(process.env.DATABASE_URL);
  await sql`insert into appointments (dentist, appointment_date, appointment_time, patient_name, patient_email) values (${body.dentist}, ${body.appointment_date}, ${body.appointment_time}, ${body.patient_name}, ${body.patient_email})`;
  return Response.json({ ok: true });
}
