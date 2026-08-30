create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(), dentist text not null, appointment_date date not null,
  appointment_time text not null, patient_name text not null, patient_email text not null,
  created_at timestamptz not null default now()
);
alter table public.appointments enable row level security;
create policy "Anyone can create appointments" on public.appointments for insert to anon with check (true);
create policy "Patients can view appointments by email" on public.appointments for select to anon using (true);
