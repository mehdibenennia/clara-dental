'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError('');
    const data = new FormData(event.currentTarget);
    const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: data.get('password') }) });
    if (!response.ok) { setError('That password is not correct.'); setLoading(false); return; }
    router.replace('/admin'); router.refresh();
  }

  return <main className="admin-login"><section className="login-card"><a className="admin-brand" href="/"><span>✦</span> clara</a><p className="kicker">Staff access</p><h1>Welcome back.</h1><p>Sign in to manage appointments and patient requests.</p><form onSubmit={submit}><label htmlFor="password">Admin password</label><input id="password" name="password" type="password" autoComplete="current-password" required autoFocus />{error && <div className="admin-error">{error}</div>}<button disabled={loading}>{loading ? 'Signing in…' : 'Open dashboard'}</button></form><a className="back-link" href="/">← Back to booking site</a></section></main>;
}
