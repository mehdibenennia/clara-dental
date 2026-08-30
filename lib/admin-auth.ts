import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'clara_admin_session';
const SESSION_DURATION = 60 * 60 * 12;

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function sign(payload: string) {
  return createHmac('sha256', process.env.ADMIN_SESSION_SECRET || '').update(payload).digest('hex');
}

export function passwordIsValid(password: string) {
  return Boolean(process.env.ADMIN_PASSWORD) && safeEqual(password, process.env.ADMIN_PASSWORD || '');
}

export function createAdminSession() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_DURATION;
  const payload = `admin.${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function sessionIsValid(value?: string) {
  if (!value || !process.env.ADMIN_SESSION_SECRET) return false;
  const [role, expires, signature] = value.split('.');
  if (role !== 'admin' || !expires || !signature || Number(expires) < Date.now() / 1000) return false;
  return safeEqual(signature, sign(`${role}.${expires}`));
}

export async function isAdmin() {
  return sessionIsValid((await cookies()).get(ADMIN_COOKIE)?.value);
}
