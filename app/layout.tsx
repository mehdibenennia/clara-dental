import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Clara — Dental care, made easy', description: 'Book your next dental appointment in minutes.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
