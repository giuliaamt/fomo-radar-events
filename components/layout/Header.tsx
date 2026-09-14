import Link from 'next/link';
import Image from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white bg-white text-black">
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <Link
          href="/"
          className="group relative block h-20 w-20 shrink-0 md:h-24 md:w-24"
          aria-label="FOMO Radar homepage"
        >
          <Image
            src={`${basePath}/images/logo_fomo-dark.png`}
            alt="FOMO Radar"
            fill
            priority
            className="object-contain opacity-100 transition-opacity duration-300 group-hover:opacity-0"
          />

          <Image
            src={`${basePath}/images/logo_fomo.png`}
            alt="FOMO Radar"
            fill
            priority
            className="object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </Link>

        <nav className="fomo-display hidden items-center gap-8 text-4xl md:flex">
          <Link href="/calendario" className="hover:text-[#00ff19]">
            Calendario
          </Link>
          <Link href="/manifesto" className="hover:text-[#00ff19]">
            Manifesto
          </Link>
          <Link href="/newsletter" className="hover:text-[#00ff19]">
            Newsletter
          </Link>
          <Link href="/contatti" className="hover:text-[#00ff19]">
            Contatti
          </Link>

        </nav>

        <Link
          href="/calendario"
          className="fomo-display rounded-full border-2 border-black px-4 py-2 text-sm md:hidden"
        >
          Vai
        </Link>
      </div>
    </header>
  );
}
