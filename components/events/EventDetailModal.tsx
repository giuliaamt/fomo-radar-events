'use client';

import {
  CalendarDays,
  ExternalLink,
  MapPin,
  Sparkles,
  Ticket,
  X,
  Share2
} from 'lucide-react';
import type { FomoEvent } from '@/types/event';
import { EventLineup } from '@/components/events/EventLineup';

type EventDetailModalProps = {
  event: FomoEvent | null;
  onClose: () => void;
};

export function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  if (!event) {
    return null;
  }

  const dateLabel = formatDateRange(event.start_date, event.end_date);
  const priceLabel = getPriceLabel(event);
  const shareEvent = event;

  async function handleShare() {
    const shareUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/calendario/`
        : 'https://fomoradar.it/calendario';


    const shareText = [
      `Ho trovato questo evento su FOMO Radar: ${shareEvent.title}`,
      dateLabel ? `Quando: ${dateLabel}` : null,
      shareEvent.city ? `Dove: ${shareEvent.city}` : null,
      `Visto su FOMO Radar`,
      shareUrl,
      ]
      .filter(Boolean)
      .join('\n');

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareEvent.title,
          text: shareText,
          url: shareUrl,
        });

        return;
      } catch {
        return;
      }
    }

    await navigator.clipboard.writeText(shareText);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Chiudi dettaglio evento"
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      <article className="relative z-10 max-h-[90svh] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/20 bg-black text-white shadow-[0_0_80px_rgba(0,255,25,0.18)] animate-in fade-in zoom-in-95 duration-300">
        <button
          type="button"
          onClick={onClose}
          aria-label="Chiudi"
          className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition hover:border-[#00ff19] hover:text-[#00ff19]"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="max-h-[90svh] overflow-y-auto">
          <EventDetailHero event={event} />

          <div className="p-6 md:p-8">
            <div className="mb-6">
              <p className="fomo-body-medium mb-3 inline-flex bg-[#00ff19] px-3 py-1 text-xs uppercase tracking-wide text-black">
                Dettaglio evento
              </p>

              <h2 className="fomo-display max-w-3xl text-[3.8rem] leading-[0.9] md:text-[5.5rem]">
                {event.title}
              </h2>

              {event.short_description && (
                <p className="fomo-body mt-4 max-w-3xl text-base leading-7 text-neutral-300 md:text-lg">
                  {event.short_description}
                </p>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-[1fr_0.85fr]">
              <section className="space-y-5">
                {event.event_editorial?.why_go && (
                  <div className="border-l-4 border-[#00ff19] bg-[#00ff19]/10 p-5">
                    <p className="fomo-body-medium mb-2 text-xs uppercase tracking-[0.2em] text-[#00ff19]">
                      Perché andarci
                    </p>

                    <p className="fomo-body text-base leading-7 text-white">
                      {event.event_editorial.why_go}
                    </p>
                  </div>
                )}

                <EventLineup
                  artists={event.event_artists ?? []}
                  fallbackLineup={event.lineup}
                />

                <InfoTextBlock
                  label="Descrizione"
                  value={event.description}
                />

                <FutureBlocksPlaceholder />
              </section>

              <aside className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <CompactInfoCard
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="Quando"
                    value={dateLabel}
                  />

                  <CompactLocationCard event={event} />
                </div>

                <InfoCard
                  icon={<Ticket className="h-5 w-5" />}
                  label="Prezzo"
                  value={priceLabel}
                />

                <MoodList event={event} />

                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="fomo-body-medium flex w-full items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-4 text-sm uppercase tracking-wide text-white transition hover:border-[#00ff19] hover:bg-[#00ff19] hover:text-black"
                  >
                    Dillo ad un amico
                    <Share2 className="h-4 w-4" />
                  </button>

                  {event.official_url && (
                    <a
                      href={event.official_url}
                      target="_blank"
                      rel="noreferrer"
                      className="fomo-body-medium flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#00ff19] px-6 py-4 text-sm uppercase tracking-wide text-[#00ff19] transition hover:bg-[#00ff19] hover:text-black"
                    >
                      Vai al sito
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}

                  {event.booking_url && (
                    <a
                      href={event.booking_url}
                      target="_blank"
                      rel="noreferrer"
                      className="fomo-body-medium flex w-full items-center justify-center gap-2 rounded-full bg-[#00ff19] px-6 py-4 text-sm uppercase tracking-wide text-black transition hover:bg-white"
                    >
                      Prenota / Biglietti
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function EventDetailHero({ event }: { event: FomoEvent }) {
  if (event.image_url) {
    return (
      <div className="relative h-44 overflow-hidden border-b border-white/10 md:h-56">
        <img
          src={event.image_url}
          alt={event.image_alt ?? event.title}
          className="h-full w-full object-cover opacity-70 grayscale"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

        <div className="absolute bottom-4 left-6 right-16">
          <p className="fomo-body-medium text-xs uppercase tracking-[0.3em] text-[#00ff19]">
            {event.format ?? event.category}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-white/10 bg-black md:h-48">
      <div className="absolute h-28 w-28 rounded-full bg-white md:h-36 md:w-36" />
      <div className="absolute h-[4.5rem] w-[4.5rem] rounded-full bg-black md:h-24 md:w-24" />
      <div className="absolute h-12 w-12 rounded-full bg-[#00ff19] md:h-16 md:w-16" />
      <div className="absolute h-6 w-6 rounded-full bg-white md:h-8 md:w-8" />
      <div className="absolute h-3 w-3 rounded-full bg-black" />
    </div>
  );
}

type InfoCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | null;
};

function InfoCard({ icon, label, value }: InfoCardProps) {
  if (!value) {
    return null;
  }

  return (
    <div className="border border-white/20 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center gap-2 text-[#00ff19]">
        {icon}

        <p className="fomo-body-medium text-xs uppercase tracking-[0.2em]">
          {label}
        </p>
      </div>

      <p className="fomo-body text-base leading-7 text-white">
        {value}
      </p>
    </div>
  );
}

type CompactInfoCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | null;
};

function CompactInfoCard({ icon, label, value }: CompactInfoCardProps) {
  if (!value) {
    return null;
  }

  return (
    <div className="min-h-32 border border-white/20 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center gap-2 text-[#00ff19]">
        {icon}

        <p className="fomo-body-medium text-[10px] uppercase tracking-[0.18em]">
          {label}
        </p>
      </div>

      <p className="fomo-body text-sm leading-6 text-white">
        {value}
      </p>
    </div>
  );
}

function CompactLocationCard({ event }: { event: FomoEvent }) {
  const locationLabel = [event.venue_name, event.city]
    .filter(Boolean)
    .join(' · ');

  if (!locationLabel) {
    return null;
  }

  const mapsUrl = getGoogleMapsUrl(event);

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noreferrer"
      className="group min-h-32 border border-white/20 bg-white/[0.03] p-4 transition hover:border-[#00ff19]"
      aria-label={`Apri ${event.title} su Google Maps`}
    >
      <div className="mb-3 flex items-center gap-2 text-[#00ff19]">
        <MapPin className="h-4 w-4" />

        <p className="fomo-body-medium text-[10px] uppercase tracking-[0.18em]">
          Dove
        </p>
      </div>

      <p className="fomo-body line-clamp-2 text-sm leading-6 text-white">
        {locationLabel}
      </p>

      <p className="fomo-body-medium mt-3 text-[10px] uppercase tracking-[0.18em] text-[#00ff19] opacity-80 transition group-hover:opacity-100">
        Apri mappa →
      </p>
    </a>
  );
}

function LocationCard({ event }: { event: FomoEvent }) {
  const locationLabel = [event.venue_name, event.city, event.region]
    .filter(Boolean)
    .join(' · ');

  if (!locationLabel) {
    return null;
  }

  const mapsUrl = getGoogleMapsUrl(event);

  return (
    <div className="overflow-hidden border border-white/20 bg-white/[0.03]">
      <div className="p-4">
        <div className="mb-3 flex items-center gap-2 text-[#00ff19]">
          <MapPin className="h-5 w-5" />

          <p className="fomo-body-medium text-xs uppercase tracking-[0.2em]">
            Dove
          </p>
        </div>

        <p className="fomo-body text-base leading-7 text-white">
          {locationLabel}
        </p>
      </div>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="group block border-t border-white/10"
        aria-label={`Apri ${event.title} su Google Maps`}
      >
        <div className="relative h-40 overflow-hidden bg-[#101010]">
          <div className="absolute inset-0 opacity-70">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:38px_38px]" />
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/20" />
            <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-white/20" />
            <div className="absolute left-[18%] top-0 h-full w-[2px] rotate-12 bg-white/10" />
            <div className="absolute right-[22%] top-0 h-full w-[2px] -rotate-12 bg-white/10" />
            <div className="absolute bottom-[28%] left-0 h-[2px] w-full rotate-[-6deg] bg-white/10" />
          </div>

          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#00ff19] shadow-[0_0_0_6px_rgba(0,255,25,0.18),0_0_40px_rgba(0,255,25,0.6)] transition group-hover:scale-110">
            <MapPin className="h-6 w-6 fill-black text-black" />
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4">
            <p className="fomo-body-medium text-xs uppercase tracking-[0.2em] text-[#00ff19]">
              Apri su Google Maps →
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}

function InfoTextBlock({
                         label,
                         value,
                       }: {
  label: string;
  value: string | null;
}) {
  if (!value) {
    return null;
  }

  return (
    <div className="border border-white/10 bg-white/[0.03] p-5">
      <p className="fomo-body-medium mb-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
        {label}
      </p>

      <p className="fomo-body text-base leading-7 text-neutral-300">
        {value}
      </p>
    </div>
  );
}

function MoodList({ event }: { event: FomoEvent }) {
  const moods = (event.event_moods ?? []).flatMap((item) =>
    item.moods ? [item.moods] : []
  );

  if (moods.length === 0) {
    return null;
  }

  return (
    <div className="border border-white/20 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center gap-2 text-[#00ff19]">
        <Sparkles className="h-5 w-5" />

        <p className="fomo-body-medium text-xs uppercase tracking-[0.2em]">
          Mood
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <span
            key={mood.id}
            className="fomo-body-medium rounded-full border border-[#00ff19] px-3 py-1 text-xs uppercase tracking-wide text-[#00ff19]"
          >
            {mood.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function FutureBlocksPlaceholder() {
  return (
    <div className="hidden">
      {/*
        Futuri blocchi riutilizzabili:
        - Ristoranti consigliati
        - Bar prima/dopo evento
        - Come arrivare
        - Eventi simili
        - Sconti / promo
      */}
    </div>
  );
}

function formatDateRange(startDate: string | null, endDate: string | null) {
  if (!startDate) {
    return null;
  }

  const start = formatDate(startDate);

  if (!endDate || endDate === startDate) {
    return start;
  }

  return `${start} — ${formatDate(endDate)}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`));
}

function getGoogleMapsUrl(event: FomoEvent) {
  if (event.latitude && event.longitude) {
    return `https://www.google.com/maps/search/?api=1&query=${event.latitude},${event.longitude}`;
  }

  const query = [
    event.venue_name,
    event.address,
    event.city,
    event.region,
  ]
    .filter(Boolean)
    .join(', ');

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function getPriceLabel(event: FomoEvent) {
  if (event.free) {
    return 'Gratis';
  }

  if (event.price_label) {
    return event.price_label;
  }

  if (event.price_min && event.price_max) {
    return `Da ${event.price_min}€ a ${event.price_max}€`;
  }

  if (event.price_min) {
    return `Da ${event.price_min}€`;
  }

  return 'Da verificare';


}
