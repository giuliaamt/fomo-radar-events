import { Header } from '@/components/layout/Header';

export default function ManifestoPage() {
  return (
    <>
      <Header />

      <main className="bg-black px-5 py-10 text-white md:px-10">
        <section className="mx-auto flex min-h-[calc(100svh-160px)] max-w-6xl flex-col justify-center">
          <div className="mb-10">
            <p className="fomo-body-medium mb-4 inline-flex bg-[#00ff19] px-3 py-1 text-xs uppercase tracking-wide text-black">
              Manifesto
            </p>

            <h1 className="fomo-display max-w-5xl text-[4rem] leading-[0.9] md:text-[7rem]">
              Anti FOMO, ma non anti desiderio.
            </h1>
          </div>

          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <aside className="border-l border-[#00ff19] pl-5">
              <p className="fomo-body text-xl leading-snug text-white/80 md:text-2xl">
                Non vogliamo farti sentire in ritardo.
                <br />
                Vogliamo aiutarti a scegliere meglio dove essere.
              </p>
            </aside>

            <div className="fomo-body space-y-6 text-base leading-8 text-white/75 md:text-lg">
              <p>
                Viviamo in un tempo in cui tutto accade sempre.
              </p>

              <p>
                Ogni settimana ci sono concerti, festival, mostre, proiezioni,
                opening, rassegne, luoghi temporanei. La sensazione è che
                qualcosa stia succedendo continuamente, e quasi sempre da
                qualche altra parte.
              </p>

              <p>
                La FOMO nasce da qui: dall’idea che il mondo corra più veloce di
                noi.
              </p>

              <p>
                Ma non crediamo che la soluzione sia provare a esserci ovunque.
                Al contrario, pensiamo che orientarsi significhi accettare una
                cosa semplice: non tutto deve riguardarci.
              </p>

              <p>
                FOMO Radar nasce per trasformare questa ansia in attenzione.
              </p>

              <p>
                Non vuole aggiungere rumore al rumore, né inseguire l’evento più
                fotografato. Vuole aiutare a leggere ciò che accade, a
                riconoscere le occasioni che hanno un’identità, un’atmosfera,
                una ragione per esistere.
              </p>

              <p>
                Un evento non è solo una data in calendario. È un modo di
                attraversare una città, abitare un momento, incontrare persone,
                suoni, immagini, comunità.
              </p>

              <p>
                Per questo crediamo che scegliere sia già una forma di presenza.
              </p>

              <p>
                Dire “questo sì” significa anche lasciare andare altro. E va
                bene così. Perdersi qualcosa non è un fallimento, è parte
                naturale dell’avere una vita propria.
              </p>

              <p>
                Il nostro radar non serve a controllare tutto. Serve a trovare
                meglio.
              </p>

              <p>
                A capire cosa risuona davvero, cosa merita tempo, cosa può
                diventare esperienza.
              </p>

              <p className="fomo-display pt-4 text-4xl leading-none text-white md:text-6xl">
                Non per esserci sempre.
                <br />
                Ma per esserci meglio.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
