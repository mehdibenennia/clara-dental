'use client';
import { useState } from 'react';

const dentists = ['Dr. Sofia Benali', 'Dr. Adam Naciri', 'Dr. Maya El Idrissi'];
const times = ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM'];
const tomorrow = () => { const value = new Date(); value.setDate(value.getDate() + 1); return value.toISOString().slice(0, 10); };

export default function Home() {
  const [dentist, setDentist] = useState(dentists[0]);
  const [date, setDate] = useState(tomorrow);
  const [time, setTime] = useState(times[1]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function book() {
    if (!name.trim() || !email.trim()) return setError('Please add your name and email.');
    setSaving(true); setError('');
    const result = await fetch('/api/appointments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ dentist, appointment_date: date, appointment_time: time, patient_name: name.trim(), patient_email: email.trim() }) });
    if (!result.ok) { setError('Could not save your appointment. Please try again.'); setSaving(false); return; }
    setSaving(false); setDone(true);
  }

  if (done) return <main className="shell"><nav><div className="brand"><span className="brandmark">✦</span> clara</div></nav><section className="success"><div className="check">✓</div><p className="eyebrow">Appointment confirmed</p><h1>You’re all set.</h1><p className="muted">We’ve saved your appointment with {dentist}.</p><div className="receipt"><div><span>DATE</span><strong>{new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(date))}</strong></div><div><span>TIME</span><strong>{time}</strong></div><div><span>LOCATION</span><strong>Clara Dental · Casablanca</strong></div></div><button className="secondary" onClick={() => setDone(false)}>Book another appointment</button></section></main>;

  return <main className="shell"><nav><div className="brand"><span className="brandmark">✦</span> clara</div><div className="navlinks"><span>How it works</span><span>For patients</span><a className="login" href="/admin">Staff sign in</a></div></nav><section className="hero"><div><p className="eyebrow">Your smile, on your schedule</p><h1>Dental care<br /><em>made easy.</em></h1><p className="intro">Find a trusted dentist and book an appointment in a few simple steps.</p></div><div className="hero-art"><div className="sun" /><div className="tooth">✦</div><div className="art-note">Good care starts<br /><b>with a little time.</b></div></div></section><section className="booking"><div className="section-head"><div><p className="eyebrow">01 — Choose your care</p><h2>Who would you like to see?</h2></div><span className="step">Step 1 of 3</span></div><div className="doctor-grid">{dentists.map(d => <button key={d} className={`doctor ${dentist === d ? 'selected' : ''}`} onClick={() => setDentist(d)}><div className="avatar">{d.split(' ').slice(1).map(x => x[0]).join('')}</div><div className="doctor-copy"><strong>{d}</strong><span>General dentistry · Trusted care</span></div><div className="radio">{dentist === d ? '✓' : ''}</div></button>)}</div><div className="section-head date-head"><div><p className="eyebrow">02 — Pick a time</p><h2>When works for you?</h2></div></div><label className="date-picker">Appointment date<input type="date" min={tomorrow()} value={date} onChange={e => setDate(e.target.value)} /></label><div className="times">{times.map(t => <button key={t} className={time === t ? 'time active' : 'time'} onClick={() => setTime(t)}>{t}</button>)}</div><div className="details"><div><p className="eyebrow">03 — Your details</p><h2>Almost there.</h2></div><div className="form"><input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} /><input placeholder="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} /><button className="primary" disabled={saving} onClick={book}>{saving ? 'Saving…' : 'Confirm appointment'} <span>→</span></button>{error && <small>{error}</small>}</div></div></section><footer><span>© 2026 Clara Dental</span><span>Care that fits your life.</span></footer></main>;
}
