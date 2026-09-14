import { CalendarioClient } from '@/components/calendar/CalendarioClient';
import { Header } from '@/components/layout/Header';
import { getEvents } from '@/lib/events';

export default async function CalendarioPage() {
  const events = await getEvents();

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black px-5 py-10 text-white md:px-10">
        <header className="mb-10">
          <p className="fomo-body-medium mb-4 inline-flex bg-[#00ff19] px-3 py-1 text-xs uppercase tracking-wide text-black">
            ⚡ Calendario FOMO
          </p>

          <h1 className="fomo-display max-w-6xl text-[4rem] leading-[0.9] md:text-[8rem]">
            Eventi culturali da non perdere
          </h1>

          <p className="fomo-body mt-6 max-w-2xl text-lg leading-8 text-neutral-300 md:text-xl">
            Una selezione editoriale di concerti, festival, cinema, talk e cose da fare.
            Scelte per mood, non solo per categoria.
          </p>
        </header>

        <CalendarioClient events={events} />
      </main>
    </>
  );
}
