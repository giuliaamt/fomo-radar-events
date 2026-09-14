import { Header } from '@/components/layout/Header';

export default function ContattiPage() {
  return (
    <>
      <Header />

      <main className="bg-black px-5 py-8 text-white md:px-10">
        <section className="flex min-h-[calc(100svh-210px)] max-w-6xl flex-col justify-center">
          <p className="fomo-body-medium mb-4 inline-flex w-fit bg-[#00ff19] px-3 py-1 text-xs uppercase tracking-wide text-black">
            Contatti
          </p>

          <h1 className="fomo-display max-w-5xl text-[4rem] leading-[0.9] md:text-[8rem]">
            Segnala un evento
          </h1>

          <p className="fomo-body mt-6 max-w-2xl text-lg leading-8 text-neutral-300 md:text-xl">
            Hai un festival, una rassegna, un talk, una mostra o una serata da farci scoprire?
            Scrivici cosa succede, dove, quando e perché dovrebbe entrare nel radar.
          </p>

          <div className="mt-10 grid gap-4 md:max-w-3xl md:grid-cols-2">
            <a
              href="mailto:fomoradar@gmail.com"
              className="group border border-[#00ff19] bg-black p-6 transition hover:bg-[#00ff19]"
            >
              <p className="fomo-body-medium text-xs uppercase tracking-[0.2em] text-[#00ff19] transition group-hover:!text-black">
                Email
              </p>

              <p className="fomo-body-medium mt-4 text-xl text-white transition group-hover:!text-black">
                fomoradar@gmail.com
              </p>
            </a>

            <a
              href="https://www.instagram.com/fomoradar"
              target="_blank"
              rel="noreferrer"
              className="group border border-white bg-black p-6 transition hover:bg-white"
            >
              <p className="fomo-body-medium text-xs uppercase tracking-[0.2em] text-neutral-400 transition group-hover:!text-black">
                Instagram
              </p>

              <p className="fomo-body-medium mt-4 text-xl text-white transition group-hover:!text-black">
                @fomoradar
              </p>
            </a>
          </div>

          <a
            href="mailto:fomoradar@gmail.com?subject=Segnalazione evento per FOMO Radar"
            className="fomo-body-medium mt-10 inline-flex w-fit rounded-full border-2 border-[#00ff19] px-8 py-4 text-base uppercase tracking-wide text-[#00ff19] transition hover:bg-[#00ff19] hover:text-black md:text-lg"
          >
            Scrivici →
          </a>
        </section>
      </main>
    </>
  );
}
