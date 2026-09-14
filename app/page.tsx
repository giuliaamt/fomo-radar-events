import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import Image from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="fomo-noise overflow-hidden bg-black text-white">
        <section className="relative grid min-h-[calc(100svh-210px)] items-center gap-10 px-5 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-10">
          <div className="relative z-10">
            <p className="fomo-body-medium mb-6 inline-flex bg-[#00ff19] px-3 py-1 text-xs uppercase tracking-wide text-black">
              ⚡ La scelta FOMO
            </p>

            <h1 className="fomo-display max-w-5xl text-[4.5rem] leading-[0.9] md:text-[4rem] lg:text-[7rem]">
              L’agenda degli eventi da non perdere
            </h1>

            <p className="fomo-body mt-8 max-w-2xl text-lg leading-8 text-neutral-300 md:text-xl">
              FOMO Radar seleziona eventi culturali per mood, vibe, città e tipo di serata.
              Non solo cosa fare, ma dove vale davvero la pena esserci.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/calendario"
                className="fomo-body-medium inline-flex justify-center rounded-full border-2 border-[#00ff19] px-8 py-4 text-base uppercase tracking-wide text-[#00ff19] transition hover:bg-[#00ff19] hover:text-black md:text-lg"              >
                Esplora il radar →
              </Link>

              <a
                href="https://www.instagram.com/fomoradar"
                target="_blank"
                rel="noreferrer"
                className="fomo-body-medium inline-flex justify-center rounded-full border-2 border-[#00ff19] px-8 py-4 text-base uppercase tracking-wide text-[#00ff19] transition hover:bg-[#00ff19] hover:text-black md:text-lg"              >
                Follow us on IG
              </a>
            </div>

            <p className="fomo-body mt-12 max-w-xl text-base leading-7 text-white md:text-lg">
              Vuoi segnalare il tuo evento o organizzare una collaborazione?
              <br />
              <span className="fomo-body-medium text-[#00ff19]">
                Scrivi a fomoradar@gmail.com
              </span>
            </p>
          </div>

          <div className="relative z-10 flex justify-center md:justify-end">
            <div className="relative aspect-square w-72 md:w-[420px] lg:w-[520px]">
              <Image
                src={`${basePath}/images/fomo-hero.gif`}
                alt="FOMO Radar visual"
                fill
                priority
                unoptimized
                className="object-contain"
              />
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-y border-white bg-white py-5 text-black">
          <div className="fomo-display flex w-max animate-[marquee_15s_linear_infinite] text-5xl">
            <div className="flex shrink-0 gap-24 pr-10">
              <span>Concerti</span>
              <span>DJ set</span>
              <span>Festival</span>
              <span>Cinema</span>
              <span>Teatro</span>
              <span>Talk</span>
              <span>Mostre</span>
              <span>Libri</span>
              <span>Design</span>
              <span>Open air</span>
            </div>

            <div className="flex shrink-0 gap-24 pr-10" aria-hidden="true">
              <span>Concerti</span>
              <span>DJ set</span>
              <span>Festival</span>
              <span>Cinema</span>
              <span>Teatro</span>
              <span>Talk</span>
              <span>Mostre</span>
              <span>Libri</span>
              <span>Design</span>
              <span>Open air</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
