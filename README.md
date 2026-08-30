# Clara Dental Reservation MVP

Clara is a patient-facing dental appointment reservation app built with Next.js, Neon PostgreSQL, and Vercel.

Live app: https://clara-dental.vercel.app
GitHub: https://github.com/mehdibenennia/clara-dental

## Current status

The public booking flow is implemented and appointments are persisted in Neon. A back office is **not implemented yet**. There are no admin accounts, protected dashboard, calendar, status management, dentist availability controls, patient search, rescheduling, cancellation, email/SMS notifications, payments, or audit logs.

## Functionality available

- Responsive Clara Dental landing page
- Dentist selection
- Appointment date and time selection
- Patient name and email collection
- Required-field validation
- Server-side booking API
- Appointment confirmation screen
- Responsive mobile layout
- Neon PostgreSQL persistence
- Vercel production deployment

## Architecture

```text
Patient browser
  -> Next.js booking UI (app/page.tsx)
  -> POST /api/appointments (app/api/appointments/route.ts)
  -> Neon PostgreSQL appointments table
```

The database credential is stored server-side as `DATABASE_URL`. It is never sent to the browser.

## Project structure

```text
app/page.tsx                 Patient booking UI
app/globals.css              Responsive styling
app/layout.tsx               Metadata and root layout
app/api/appointments/route.ts Server-side Neon insert endpoint
lib/supabase.ts              Legacy unused Supabase helper
supabase/schema.sql          Original Supabase schema reference
.env.example                 Environment variable template
```

## Database

The live database is hosted in Neon, project `clara-dental`.

```sql
create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  dentist text not null,
  appointment_date date not null,
  appointment_time text not null,
  patient_name text not null,
  patient_email text not null,
  created_at timestamptz not null default now()
);
```

## API

`POST /api/appointments` accepts:

```json
{
  "dentist": "Dr. Sofia Benali",
  "appointment_date": "2025-06-16",
  "appointment_time": "10:30 AM",
  "patient_name": "Amina Example",
  "patient_email": "amina@example.com"
}
```

On success it returns `{ "ok": true }`.

## Local setup

Requirements: Node.js 20+ and a Neon PostgreSQL database.

```bash
npm install
```

Create `.env.local`:

```env
DATABASE_URL=your-neon-connection-string
```

Run locally:

```bash
npm run dev
```

Open http://localhost:3000. Verify production compilation with `npm run build`.

## Deployment

The repository is connected to Vercel. Pushes to `main` trigger deployments. Vercel Production must contain the secret variable:

```text
DATABASE_URL
```

Redeploy after changing environment variables.

## Security and production gaps

- Never commit `.env.local` or expose `DATABASE_URL` with a `NEXT_PUBLIC_` prefix.
- Add rate limiting, spam protection, request size limits, and stronger email validation.
- Add authentication and role-based authorization before exposing appointment data.
- Add database migrations and collision protection for duplicate time slots.

## Recommended back-office milestone

Add a protected `/admin` area with staff authentication, appointment table/calendar, filters, dentist availability, statuses (`pending`, `confirmed`, `completed`, `cancelled`), reschedule/cancel actions, notifications, and audit history.

## Local copy

Desktop copy: `/Users/m4/Desktop/clara-dental`
