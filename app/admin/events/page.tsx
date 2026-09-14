import { Header } from '@/components/layout/Header';
import { AdminEventsTable } from '@/components/admin/AdminEventsTable';
import Link from 'next/link';

export default function AdminEventsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-black px-5 py-12 text-white md:px-10 md:py-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="fomo-body-medium mb-4 inline-flex bg-[#00ff19] px-3 py-1 text-xs uppercase tracking-wide text-black">
              Admin
            </p>

            <h1 className="fomo-display max-w-5xl text-[4rem] leading-[0.9] md:text-[7rem]">
              Gestione eventi
            </h1>

            <p className="fomo-body mt-4 max-w-2xl text-lg leading-8 text-neutral-300">
              Qui gestiamo bozze, revisioni e pubblicazione degli eventi FOMO Radar.
            </p>
          </div>

          <Link
            href="/admin/events/new"
            className="fomo-body-medium w-fit rounded-full border-2 border-[#00ff19] px-6 py-3 text-sm uppercase tracking-wide text-[#00ff19] transition hover:bg-[#00ff19] hover:text-black"
          >
            Nuovo evento →
          </Link>
        </div>

        <AdminEventsTable />
      </main>
    </>
  );
}
