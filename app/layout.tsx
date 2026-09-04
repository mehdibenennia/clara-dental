import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import './booking-extra.css';
export const metadata: Metadata = { title: 'Clara — Dental care, made easy', description: 'Book your next dental appointment in minutes.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}<Script defer src="https://analytics.lkhibra.ma/script.js" data-website-id="ef5745ef-c738-4932-a171-e3369c2a3641" /></body></html>; }
  
