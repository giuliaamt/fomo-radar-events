import type { FomoEvent } from '@/types/event';
import { EventsMap } from '@/components/map/EventsMap';

type MapSectionProps = {
  events: FomoEvent[];
  onEventSelect?: (event: FomoEvent) => void;
};

export function MapSection({ events, onEventSelect }: MapSectionProps) {
  const geolocatedEvents = events.filter(
    (event) => event.latitude && event.longitude
  );

  return (
    <section className="mt-16">
      <div className="mb-5 flex flex-col justify-between gap-4 border-t border-white pt-8 md:flex-row md:items-end">
        <div>
          <p className="fomo-body-medium mb-4 inline-flex bg-[#00ff19] px-3 py-1 text-xs uppercase tracking-wide text-black">
            Radar Map
          </p>

          <h2 className="fomo-display text-6xl leading-none md:text-8xl">
            Dove succede
          </h2>
        </div>

        <p className="fomo-body-medium uppercase tracking-wide text-neutral-400">
          {geolocatedEvents.length} eventi geolocalizzati
        </p>
      </div>

      <EventsMap events={geolocatedEvents} onEventSelect={onEventSelect} />
    </section>
  );
}
