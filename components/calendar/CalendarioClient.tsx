'use client';

import { useMemo, useState } from 'react';

import { CalendarFilters } from '@/components/calendar/CalendarFilters';
import { EventDayRail } from '@/components/events/EventDayRail';
import { EventDetailModal } from '@/components/events/EventDetailModal';
import { MapSection } from '@/components/map/MapSection';
import type { FomoEvent } from '@/types/event';

type CalendarioClientProps = {
  events: FomoEvent[];
};

type DatePreset = 'all' | 'tonight' | 'tomorrow' | 'weekend' | 'week' | 'custom';
type TimePreset = 'all' | 'morning' | 'afternoon' | 'evening';

const ALL = 'all';

export function CalendarioClient({ events }: CalendarioClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [selectedCity, setSelectedCity] = useState(ALL);
  const [selectedMood, setSelectedMood] = useState(ALL);
  const [selectedDatePreset, setSelectedDatePreset] = useState<DatePreset>(ALL);
  const [selectedTimePreset, setSelectedTimePreset] = useState<TimePreset>(ALL);
  const [onlyFree, setOnlyFree] = useState(false);
  const [customDateFrom, setCustomDateFrom] = useState('');
  const [customDateTo, setCustomDateTo] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<FomoEvent | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');

  const categories = useMemo(() => {
    return getUniqueValues(events.map((event) => event.category));
  }, [events]);

  const cities = useMemo(() => {
    return getUniqueValues(events.map((event) => event.city));
  }, [events]);

  const moods = useMemo(() => {
    const moodNames = events.flatMap((event) => {
      return (
        event.event_moods
          ?.map((item) => item.moods?.name)
          .filter(Boolean) ?? []
      );
    });

    return getUniqueValues(moodNames);
  }, [events]);

  const filteredEvents = useMemo(() => {
    const dateRange = getDateRange(
      selectedDatePreset,
      customDateFrom,
      customDateTo
    );

    return events.filter((event) => {
      const matchesSearch = matchesSearchQuery(event, searchQuery);

      const matchesCategory =
        selectedCategory === ALL || event.category === selectedCategory;

      const matchesCity =
        selectedCity === ALL ||
        normalizeText(event.city) === normalizeText(selectedCity);

      const matchesFree = !onlyFree || event.free === true;

      const matchesDate =
        !dateRange || eventOverlapsRange(event, dateRange.from, dateRange.to);

      const matchesTime =
        selectedTimePreset === ALL ||
        eventMatchesTimePreset(event, selectedTimePreset);

      const eventMoodNames =
        event.event_moods
          ?.map((item) => item.moods?.name)
          .filter(Boolean) ?? [];

      const matchesMood =
        selectedMood === ALL || eventMoodNames.includes(selectedMood);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCity &&
        matchesMood &&
        matchesFree &&
        matchesDate &&
        matchesTime
      );
    });
  }, [
    events,
    searchQuery,
    selectedCategory,
    selectedCity,
    selectedMood,
    selectedDatePreset,
    selectedTimePreset,
    onlyFree,
    customDateFrom,
    customDateTo,
  ]);

  const listEvents = useMemo(() => {
    return filteredEvents.filter((event) => {
      return normalizeText(event.city) === 'milano';
    });
  }, [filteredEvents]);

  const mapEvents = useMemo(() => {
    return filteredEvents;
  }, [filteredEvents]);

  function resetFilters() {
    setSearchQuery('');
    setSelectedCategory(ALL);
    setSelectedCity(ALL);
    setSelectedMood(ALL);
    setSelectedDatePreset(ALL);
    setSelectedTimePreset(ALL);
    setOnlyFree(false);
    setCustomDateFrom('');
    setCustomDateTo('');
  }

  return (
    <>
      <CalendarFilters
        categories={categories}
        cities={cities}
        moods={moods}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedCity={selectedCity}
        selectedMood={selectedMood}
        selectedDatePreset={selectedDatePreset}
        selectedTimePreset={selectedTimePreset}
        onlyFree={onlyFree}
        customDateFrom={customDateFrom}
        customDateTo={customDateTo}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onCityChange={setSelectedCity}
        onMoodChange={setSelectedMood}
        onDatePresetChange={setSelectedDatePreset}
        onTimePresetChange={setSelectedTimePreset}
        onOnlyFreeChange={setOnlyFree}
        onCustomDateFromChange={setCustomDateFrom}
        onCustomDateToChange={setCustomDateTo}
        onReset={resetFilters}
      />

      <div className="mb-8 flex flex-col justify-between gap-4 border-y border-white py-4 md:flex-row md:items-center">
        <div>
          <p className="fomo-body-medium text-sm uppercase tracking-[0.2em] text-white md:text-base">
            {viewMode === 'list'
              ? `${listEvents.length} eventi a Milano`
              : `${mapEvents.length} eventi a Bologna`}
          </p>

          <p className="fomo-body mt-1 text-sm uppercase tracking-[0.2em] text-neutral-400">
            {viewMode === 'list'
              ? 'Lista mobile-first per giorno'
              : 'La selezione FOMO in città'}
          </p>
        </div>

        <div className="fomo-body-medium inline-flex w-fit overflow-hidden rounded-full border border-white/30 bg-white/10 p-1 text-sm uppercase tracking-wide">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={[
              'rounded-full px-5 py-2 transition',
              viewMode === 'list'
                ? 'bg-[#00ff19] text-black'
                : 'text-white hover:text-[#00ff19]',
            ].join(' ')}
          >
            Lista
          </button>

          <button
            type="button"
            onClick={() => setViewMode('map')}
            className={[
              'rounded-full px-5 py-2 transition',
              viewMode === 'map'
                ? 'bg-[#00ff19] text-black'
                : 'text-white hover:text-[#00ff19]',
            ].join(' ')}
          >
            Mappa
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <MapSection
          events={mapEvents}
          onEventSelect={setSelectedEvent}
        />
      ) : (
        <section>
          <div className="mb-5 border-t border-white pt-8">
            <p className="fomo-body-medium mb-3 inline-flex bg-[#00ff19] px-3 py-1 text-xs uppercase tracking-wide text-black">
              Milano Radar
            </p>

            <h2 className="fomo-display text-6xl leading-none md:text-8xl">
              In lista
            </h2>
          </div>

          <EventDayRail
            events={listEvents}
            onEventSelect={setSelectedEvent}
          />
        </section>
      )}

      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}

function getUniqueValues(values: Array<string | null | undefined>) {
  return Array.from(
    new Set(
      values
        .filter(Boolean)
        .map((value) => String(value))
    )
  ).sort((a, b) => a.localeCompare(b));
}

function matchesSearchQuery(event: FomoEvent, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  const searchableText = [
    event.title,
    event.description,
    event.short_description,
    event.city,
    event.region,
    event.venue_name,
    event.lineup,
    event.category,
    event.format,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
}

function getDateRange(
  preset: DatePreset,
  customDateFrom: string,
  customDateTo: string
) {
  const today = startOfDay(new Date());

  if (preset === 'all') {
    return null;
  }

  if (preset === 'tonight') {
    return {
      from: today,
      to: today,
    };
  }

  if (preset === 'tomorrow') {
    const tomorrow = addDays(today, 1);

    return {
      from: tomorrow,
      to: tomorrow,
    };
  }

  if (preset === 'weekend') {
    const saturday = getNextSaturday(today);
    const sunday = addDays(saturday, 1);

    return {
      from: saturday,
      to: sunday,
    };
  }

  if (preset === 'week') {
    return {
      from: today,
      to: addDays(today, 6),
    };
  }

  if (preset === 'custom') {
    if (!customDateFrom && !customDateTo) {
      return null;
    }

    const from = customDateFrom
      ? parseDate(customDateFrom)
      : parseDate(customDateTo);

    const to = customDateTo
      ? parseDate(customDateTo)
      : parseDate(customDateFrom);

    return {
      from,
      to,
    };
  }

  return null;
}

function eventOverlapsRange(event: FomoEvent, from: Date, to: Date) {
  if (!event.start_date) {
    return false;
  }

  const eventStart = parseDate(event.start_date);
  const eventEnd = event.end_date ? parseDate(event.end_date) : eventStart;

  return eventStart <= to && eventEnd >= from;
}

function eventMatchesTimePreset(event: FomoEvent, preset: TimePreset) {
  if (!event.start_time) {
    return true;
  }

  const hour = Number(event.start_time.slice(0, 2));

  if (Number.isNaN(hour)) {
    return true;
  }

  if (preset === 'morning') {
    return hour >= 6 && hour < 12;
  }

  if (preset === 'afternoon') {
    return hour >= 12 && hour < 18;
  }

  if (preset === 'evening') {
    return hour >= 18 || hour < 6;
  }

  return true;
}

function parseDate(value: string) {
  return startOfDay(new Date(`${value}T00:00:00`));
}

function startOfDay(date: Date) {
  const nextDate = new Date(date);

  nextDate.setHours(0, 0, 0, 0);

  return nextDate;
}

function addDays(date: Date, amount: number) {
  const nextDate = new Date(date);

  nextDate.setDate(nextDate.getDate() + amount);

  return nextDate;
}

function getNextSaturday(date: Date) {
  const day = date.getDay();
  const distanceToSaturday = (6 - day + 7) % 7;

  return addDays(date, distanceToSaturday);
}

function normalizeText(value: string | null | undefined) {
  return String(value ?? '')
    .trim()
    .toLowerCase();
}
