import type { FomoEvent } from '@/types/event';
import { EventMoodList } from '@/components/events/EventMoodList';
import { Badge } from '@/components/ui/badge';

type EventCardProps = {
  event: FomoEvent;
  onSelect?: (event: FomoEvent) => void;
};

export function EventCard({ event, onSelect }: EventCardProps) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(event)}
      onKeyDown={(keyboardEvent) => {
        if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
          keyboardEvent.preventDefault();
          onSelect?.(event);
        }
      }}
      className="group relative flex h-full min-h-[720px] cursor-pointer flex-col overflow-hidden border border-white bg-black text-white transition-colors duration-300"
    >
      <div className="pointer-events-none absolute inset-0 z-10 opacity-0 ring-2 ring-inset ring-[#00ff19] transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-64 shrink-0 items-center justify-center overflow-hidden bg-black">
        {event.image_url ? (
          <img
            src={event.image_url}
            alt={event.image_alt ?? event.title}
            className="h-full w-full object-cover opacity-90 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
          />
        ) : (
          <>
            <div className="absolute h-40 w-40 rounded-full bg-white" />
            <div className="absolute h-24 w-24 rounded-full bg-black" />
            <div className="absolute h-14 w-14 rounded-full bg-[#00ff19]" />
            <div className="absolute h-7 w-7 rounded-full bg-white" />
            <div className="absolute h-3 w-3 rounded-full bg-black" />
          </>
        )}
      </div>

      <div className="relative z-20 flex flex-1 flex-col p-5">
        <div className="mb-4 flex min-h-7 flex-wrap gap-2">
          <Badge className="fomo-body-medium rounded-none bg-[#00ff19] px-2 py-1 text-xs uppercase tracking-wide text-black hover:bg-[#00ff19]">
            {event.category}
          </Badge>

          {event.format && (
            <Badge className="fomo-body-medium rounded-none bg-white px-2 py-1 text-xs uppercase tracking-wide text-black hover:bg-white">
              {event.format}
            </Badge>
          )}

          {event.free && (
            <Badge className="fomo-body-medium rounded-none bg-[#00ff19] px-2 py-1 text-xs uppercase tracking-wide text-black hover:bg-[#00ff19]">
              Gratis
            </Badge>
          )}
        </div>

        <h2 className="fomo-display min-h-[112px] text-5xl leading-none md:text-6xl">
          {event.title}
        </h2>

        {event.short_description && (
          <p className="fomo-body mt-4 line-clamp-3 min-h-[84px] text-base leading-7 text-neutral-300">
            {event.short_description}
          </p>
        )}

        {event.event_editorial?.why_go && (
          <p className="fomo-body mt-5 line-clamp-3 min-h-[96px] border-l-4 border-[#00ff19] bg-[#00ff19]/10 p-4 text-sm leading-6 text-white">
            {event.event_editorial.why_go}
          </p>
        )}

        <div className="min-h-[88px]">
          <EventMoodList moods={event.event_moods ?? []} />
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/20 pt-4">
          <div className="fomo-body-medium text-sm uppercase tracking-wide text-neutral-400">
            {event.city && <span>{event.city}</span>}
            {event.region && <span> · {event.region}</span>}
            {event.start_date && <span> · {event.start_date}</span>}
          </div>

          <span className="relative z-20 flex h-10 w-14 shrink-0 items-center justify-center rounded-full bg-[#00ff19] text-2xl text-black transition-transform duration-300 group-hover:scale-105">
            →
          </span>
        </div>
      </div>
    </article>
  );
}
