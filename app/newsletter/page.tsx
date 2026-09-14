import { Header } from '@/components/layout/Header';

export default function NewsletterPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-black px-5 py-12 text-white md:px-10 md:py-16">
        <section className="max-w-7xl">
          <p className="fomo-body-medium mb-4 inline-flex bg-[#00ff19] px-3 py-1 text-xs uppercase tracking-wide text-black">
            Newsletter
          </p>

          <h1 className="fomo-display max-w-6xl text-[4rem] leading-[0.9] md:text-[7rem] lg:text-[8rem]">
            Cultura scelta con cura,
            <br />
            la newsletter definitiva
          </h1>

          <p className="fomo-body mt-2 max-w-5xl text-base leading-7 text-neutral-300 md:text-xl">
            Stiamo cercando di creare una newsletter mensile che possa raccontarti
            il mese milanese e darti accesso a sconti personalizzati.
          </p>

          <form className="mt-14 max-w-7xl">
            <div className="space-y-12">
              <label className="block">
                <span className="fomo-display block text-4xl leading-none text-[#00ff19] md:text-3xl">
                  Nome *
                </span>

                <input
                  type="text"
                  name="name"
                  required
                  className="fomo-body mt-2 w-full border-0 border-b-2 border-[#00ff19] bg-transparent px-0 py-3 text-lg text-white outline-none placeholder:text-neutral-600 focus:border-white"
                />
              </label>

              <label className="block">
                <span className="fomo-display block text-4xl leading-none text-[#00ff19] md:text-3xl">
                  Mail *
                </span>

                <input
                  type="email"
                  name="email"
                  required
                  className="fomo-body mt-2 w-full border-0 border-b-2 border-[#00ff19] bg-transparent px-0 py-3 text-lg text-white outline-none placeholder:text-neutral-600 focus:border-white"
                />
              </label>
            </div>

            <label className="fomo-body mt-10 flex cursor-pointer items-start gap-3 text-base leading-7 text-white md:text-lg">
              <input
                type="checkbox"
                required
                className="mt-1 h-5 w-5 appearance-none rounded-full border-2 border-[#00ff19] bg-transparent checked:bg-[#00ff19] focus:outline-none focus:ring-2 focus:ring-[#00ff19]/40"
              />

              <span>
                Acconsento al trattamento dei miei dati personali
              </span>
            </label>

            <button
              type="submit"
              className="fomo-body-medium mt-10 inline-flex rounded-full border-2 border-[#00ff19] px-8 py-4 text-base uppercase tracking-wide text-white transition hover:bg-[#00ff19] hover:text-black md:text-lg"
            >
              Iscriviti
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
