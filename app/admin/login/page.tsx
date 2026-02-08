import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function login(formData: FormData) {
  'use server';

  const token = formData.get('token');
  if (token === process.env.ADMIN_DASHBOARD_TOKEN) {
    cookies().set('tpn_admin', 'authorized', { httpOnly: true, sameSite: 'lax', secure: true, path: '/' });
    redirect('/admin');
  }

  redirect('/admin/login?error=invalid');
}

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <form action={login} className="w-full space-y-4 rounded-2xl border border-[#C5A059]/30 bg-[#121212] p-6">
        <h1 className="font-serif text-3xl">Admin Access</h1>
        <input
          name="token"
          type="password"
          className="w-full rounded-lg border border-[#C5A059]/40 bg-black/40 p-3"
          placeholder="Enter dashboard token"
          required
        />
        <button className="w-full rounded-lg bg-[#C5A059] py-2 font-semibold text-[#1A1A1A]">Sign in</button>
      </form>
    </main>
  );
}
