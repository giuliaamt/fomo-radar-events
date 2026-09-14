'use client';

import { useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabaseBrowser';
import Link from 'next/link';

type AdminEvent = {
  id: number;
  title: string;
  city: string | null;
  region: string | null;
  start_date: string | null;
  editorial_status: string | null;
  curation_status: string | null;
};

export function AdminEventsTable() {
  const supabase = createSupabaseBrowserClient();
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      const { data, error } = await supabase
        .from('events')
        .select('id, title, city, region, start_date, editorial_status, curation_status')
        .order('start_date', { ascending: true });

      if (error) {
        console.error(error);
        setEvents([]);
      } else {
        setEvents(data ?? []);
      }

      setIsLoading(false);
    }

    loadEvents();
  }, [supabase]);

  if (isLoading) {
    return (
      <p className="fomo-body text-neutral-400">
        Caricamento eventi...
      </p>
    );
  }

  return (
    <div className="mt-10 overflow-hidden border border-white">
      <table className="w-full border-collapse text-left">
        <thead className="bg-white text-black">
        <tr>
          <th className="fomo-body-medium p-4 text-xs uppercase tracking-wide">Evento</th>
          <th className="fomo-body-medium p-4 text-xs uppercase tracking-wide">Città</th>
          <th className="fomo-body-medium p-4 text-xs uppercase tracking-wide">Data</th>
          <th className="fomo-body-medium p-4 text-xs uppercase tracking-wide">Stato</th>
          <th className="fomo-body-medium p-4 text-xs uppercase tracking-wide">Azioni</th>
        </tr>
        </thead>

        <tbody>
        {events.map((event) => (
          <tr key={event.id} className="border-t border-white/20">
            <td className="fomo-body-medium p-4 text-white">
              {event.title}
            </td>

            <td className="fomo-body p-4 text-neutral-300">
              {[event.city, event.region].filter(Boolean).join(' · ')}
            </td>

            <td className="fomo-body p-4 text-neutral-300">
              {event.start_date}
            </td>

            <td className="p-4">
                <span className="fomo-body-medium rounded-full border border-[#00ff19] px-3 py-1 text-xs uppercase tracking-wide text-[#00ff19]">
                  {event.editorial_status ?? 'draft'}
                </span>
            </td>

            <td className="p-4">
              <Link
                href={`/admin/events/${event.id}`}
                className="fomo-body-medium rounded-full border border-[#00ff19] px-4 py-2 text-xs uppercase tracking-wide text-[#00ff19] transition hover:bg-[#00ff19] hover:text-black"
              >
                Modifica
              </Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
