# Clara Dental Reservation

Clara is a complete dental reservation MVP with a patient booking website and a protected staff back office. It is built with Next.js, Neon PostgreSQL, and Vercel.

- Live website: https://clara-dental.vercel.app
- Back office: https://clara-dental.vercel.app/admin
- GitHub: https://github.com/mehdibenennia/clara-dental

## Available functionality

### Patient experience

- Responsive dental clinic landing page
- Dentist selection
- Real appointment date selection
- Appointment time selection
- Patient name and email collection
- Required-field validation
- Database-backed reservation creation
- Confirmation summary
- Staff sign-in link

### Staff back office

- Password-protected `/admin` area
- Secure 12-hour HTTP-only session cookie
- Reservation list ordered by appointment date and time
- Summary counts for all, pending, confirmed, and completed reservations
- Search by patient name, email, or dentist
- Filter by reservation status
- Reservation detail drawer
- Status management: `pending`, `confirmed`, `completed`, `cancelled`
- Internal clinic notes
- Permanent reservation deletion with confirmation
- Staff sign-out
- Responsive desktop and mobile layouts

## Architecture

```text
Patient booking UI
  -> POST /api/appointments
  -> Neon appointments table

Staff login
  -> POST /api/admin/login
  -> Signed HTTP-only admin cookie
  -> Protected /admin and /api/admin/* routes
  -> Neon appointment read/update/delete operations
```

Database and admin secrets are server-only Vercel environment variables. They are never exposed to browser JavaScript.

## Project structure

```text
app/
  page.tsx                         Patient booking UI
  globals.css                     Public website styling
  booking-extra.css               Booking form additions
  api/appointments/route.ts       Public reservation creation API
  admin/
    page.tsx                      Protected dashboard entry
    login/page.tsx                Staff login
    AdminDashboard.tsx            Reservation management UI
    admin.css                     Back-office styling
  api/admin/
    login/route.ts                Login and session creation
    logout/route.ts               Session removal
    appointments/route.ts         Protected reservation listing
    appointments/[id]/route.ts    Protected update and delete actions
lib/admin-auth.ts                 Password and signed-session helpers
```

## Database

The production PostgreSQL database is hosted in the Neon project `clara-dental`.

```sql
create table appointments (
  id uuid primary key default gen_random_uuid(),
  dentist text not null,
  appointment_date date not null,
  appointment_time text not null,
  patient_name text not null,
  patient_email text not null,
  status text not null default 'pending',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## Environment variables

Create `.env.local` for local development and configure the same secrets in Vercel Production:

```env
DATABASE_URL=your-neon-connection-string
ADMIN_PASSWORD=your-admin-password
ADMIN_SESSION_SECRET=a-long-random-secret
```

Never commit `.env.local`. `ADMIN_SESSION_SECRET` should be a random value of at least 32 bytes.

## Local development

```bash
npm install
npm run dev
```

Open:

- Booking website: http://localhost:3000
- Back office: http://localhost:3000/admin

Production verification:

```bash
npm run build
```

## APIs

- `POST /api/appointments` — create a patient reservation
- `POST /api/admin/login` — authenticate staff
- `POST /api/admin/logout` — end the staff session
- `GET /api/admin/appointments` — list reservations; admin only
- `PATCH /api/admin/appointments/:id` — update status and notes; admin only
- `DELETE /api/admin/appointments/:id` — permanently delete; admin only

## Deployment

The GitHub `main` branch deploys automatically to Vercel. Environment variable changes require a fresh deployment.

## Security and next production improvements

- Add rate limiting and bot protection to public booking and login endpoints.
- Add schema validation and stricter email validation.
- Replace the shared admin password with individual staff accounts and role-based access.
- Add duplicate-slot protection at the database level.
- Add audit history for reservation changes.
- Add confirmation and cancellation emails or SMS.
- Add dentist availability, rescheduling, and a calendar view.

## Local copy

`/Users/m4/Desktop/clara-dental`
