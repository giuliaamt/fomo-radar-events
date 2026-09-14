import type { FomoEvent } from '@/types/event';
import { EventCard } from '@/components/events/EventCard';

type EventListProps = {
  events: FomoEvent[];
  onEventSelect?: (event: FomoEvent) => void;
};

export function EventList({ events, onEventSelect }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="border border-white bg-black p-6 text-white">
        Nessun evento disponibile.
      </div>
    );
  }

  return (
    <section className="grid items-stretch gap-px border border-white bg-white md:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onSelect={onEventSelect}
        />
      ))}
    </section>
  );
}
