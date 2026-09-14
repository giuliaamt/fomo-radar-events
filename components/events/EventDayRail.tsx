import { MapPin } from 'lucide-react';
import type { FomoEvent } from '@/types/event';

type EventDayRailProps = {
  events: FomoEvent[];
  onEventSelect?: (event: FomoEvent) => void;
};

export function EventDayRail({ events, onEventSelect }: EventDayRailProps) {
  const groupedEvents = groupEventsByDate(events);

  if (groupedEvents.length === 0) {
    return (
      <div className="border border-white bg-black p-6 text-white">
        <p className="fomo-body">Nessun evento trovato.</p>
      </div>
    );
  }

  return (
    <section className="space-y-10">
      {groupedEvents.map(({ date, events }) => (
        <div
          key={date}
          className="grid gap-4 md:grid-cols-[120px_1fr] md:gap-8"
        >
          <DateBadge date={date} />

          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-3">
            {events.map((event) => (
              <CompactEventCard
                key={event.id}
                event={event}
                onSelect={onEventSelect}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function CompactEventCard({
                            event,
                            onSelect,
                          }: {
  event: FomoEvent;
  onSelect?: (event: FomoEvent) => void;
}) {
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
      className="group min-w-[260px] max-w-[260px] cursor-pointer overflow-hidden rounded-[1.5rem] border border-[#00ff19] bg-black p-3 text-white transition hover:bg-[#00ff19] md:min-w-[360px] md:max-w-[360px]"
    >
      <div className="aspect-[16/9] overflow-hidden bg-white/10">
        {event.image_url ? (
          <img
            src={event.image_url}
            alt={event.image_alt ?? event.title}
            className="h-full w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-black">
            <div className="relative h-24 w-24 rounded-full bg-white">
              <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
              <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ff19]" />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
            </div>
          </div>
        )}
      </div>

      <div className="pt-4">
        <p className="fomo-body-medium mb-2 text-xs uppercase tracking-[0.2em] text-[#00ff19] transition group-hover:text-black">
          {event.category}
        </p>

        <h3 className="fomo-display line-clamp-2 text-4xl leading-[0.9] text-white transition group-hover:text-black md:text-5xl">
          {event.title}
        </h3>

        <div className="fomo-body-medium mt-4 flex items-center gap-2 text-sm uppercase tracking-wide text-white/80 transition group-hover:text-black">
          <MapPin className="h-4 w-4 text-[#00ff19] transition group-hover:text-black" />

          <span className="line-clamp-1">
            {[event.venue_name, event.city].filter(Boolean).join(' · ')}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {event.event_moods?.slice(0, 2).map((item) =>
            item.moods ? (
              <span
                key={item.moods.id}
                className="fomo-body-medium rounded-full border border-[#00ff19] px-3 py-1 text-xs uppercase tracking-wide text-[#00ff19] transition group-hover:border-black group-hover:text-black"
              >
                {item.moods.name}
              </span>
            ) : null
          )}
        </div>

        <button
          type="button"
          className="fomo-body-medium mt-5 rounded-full border border-white px-5 py-2 text-sm uppercase tracking-wide text-white transition group-hover:border-black group-hover:text-black"
        >
          Scopri
        </button>
      </div>
    </article>
  );
}

function DateBadge({ date }: { date: string }) {
  const parsedDate = new Date(`${date}T00:00:00`);

  const day = new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
  }).format(parsedDate);

  const month = new Intl.DateTimeFormat('it-IT', {
    month: 'long',
  }).format(parsedDate);

  return (
    <div className="sticky left-0 top-24 z-10 flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-[2rem] bg-[#00ff19] text-black md:h-32 md:w-32">
      <span className="fomo-body-medium text-5xl leading-none md:text-6xl">
        {day}
      </span>

      <span className="fomo-body-medium text-sm uppercase tracking-wide">
        {month}
      </span>
    </div>
  );
}

function groupEventsByDate(events: FomoEvent[]) {
  const groups = new Map<string, FomoEvent[]>();

  events.forEach((event) => {
    if (!event.start_date) {
      return;
    }

    const currentEvents = groups.get(event.start_date) ?? [];
    currentEvents.push(event);
    groups.set(event.start_date, currentEvents);
  });

  return Array.from(groups.entries())
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, events]) => ({
      date,
      events,
    }));
}
