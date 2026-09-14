import { Header } from '@/components/layout/Header';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';

export default function AdminLoginPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-black px-5 py-12 text-white md:px-10 md:py-16">
        <p className="fomo-body-medium mb-4 inline-flex bg-[#00ff19] px-3 py-1 text-xs uppercase tracking-wide text-black">
          Admin
        </p>

        <h1 className="fomo-display max-w-5xl text-[4rem] leading-[0.9] md:text-[8rem]">
          Accesso editoriale
        </h1>

        <p className="fomo-body mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
          Area riservata per inserire, verificare e pubblicare eventi su FOMO Radar.
        </p>

        <AdminLoginForm />
      </main>
    </>
  );
}
