'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabaseBrowser';

export function AdminLoginForm() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage('Credenziali non valide o utente non autorizzato.');
      return;
    }

    router.push('/admin/events');
    router.refresh();
  }

  return (
    <form onSubmit={handleLogin} className="mt-10 max-w-md space-y-8">
      <label className="block">
        <span className="fomo-body-medium text-xs uppercase tracking-[0.2em] text-[#00ff19]">
          Email
        </span>

        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="fomo-body mt-2 w-full border-0 border-b-2 border-[#00ff19] bg-transparent px-0 py-3 text-lg text-white outline-none focus:border-white"
        />
      </label>

      <label className="block">
        <span className="fomo-body-medium text-xs uppercase tracking-[0.2em] text-[#00ff19]">
          Password
        </span>

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="fomo-body mt-2 w-full border-0 border-b-2 border-[#00ff19] bg-transparent px-0 py-3 text-lg text-white outline-none focus:border-white"
        />
      </label>

      {errorMessage && (
        <p className="fomo-body text-sm text-red-400">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="fomo-body-medium rounded-full border-2 border-[#00ff19] px-8 py-4 text-base uppercase tracking-wide text-[#00ff19] transition hover:bg-[#00ff19] hover:text-black disabled:opacity-50"
      >
        {isLoading ? 'Accesso...' : 'Entra'}
      </button>
    </form>
  );
}
