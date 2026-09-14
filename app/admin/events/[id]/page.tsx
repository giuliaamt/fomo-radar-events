import { Header } from '@/components/layout/Header';
import { AdminEventForm } from '@/components/admin/AdminEventForm';

type AdminEventEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: 'preview' }];
}

export default async function AdminEventEditPage({
                                                   params,
                                                 }: AdminEventEditPageProps) {
  const { id } = await params;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black px-5 py-12 text-white md:px-10 md:py-16">
        <p className="fomo-body-medium mb-4 inline-flex bg-[#00ff19] px-3 py-1 text-xs uppercase tracking-wide text-black">
          Admin
        </p>

        <h1 className="fomo-display max-w-5xl text-[4rem] leading-[0.9] md:text-[7rem]">
          Modifica evento
        </h1>

        <AdminEventForm eventId={id} />
      </main>
    </>
  );
}
