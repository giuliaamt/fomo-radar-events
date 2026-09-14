'use client';

import { useEffect, useRef } from 'react';
import maplibregl, { Map, Marker, Popup } from 'maplibre-gl';
import type { FomoEvent } from '@/types/event';

type EventsMapProps = {
  events: FomoEvent[];
  onEventSelect?: (event: FomoEvent) => void;
};

const BOLOGNA_CENTER: [number, number] = [11.3426, 44.4949];

const MAP_STYLE =
  'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

function getMarkerColor(event: FomoEvent) {
  const category = event.category?.toLowerCase();

  if (category?.includes('cinema')) {
    return '#ff4fb8';
  }

  if (category?.includes('arte') || category?.includes('design')) {
    return '#5aa7ff';
  }

  if (event.free) {
    return '#00ff19';
  }

  return '#ff4fb8';
}

function createFomoMarker(event: FomoEvent) {
  const color = getMarkerColor(event);

  const wrapper = document.createElement('button');

  wrapper.type = 'button';
  wrapper.setAttribute('aria-label', event.title);

  wrapper.className = [
    'group',
    'relative',
    'flex',
    'h-10',
    'w-10',
    'items-center',
    'justify-center',
    'rounded-full',
    'outline-none',
  ].join(' ');

  const pulse = document.createElement('span');
  pulse.className = [
    'absolute',
    'h-8',
    'w-8',
    'rounded-full',
    'opacity-0',
    'transition-opacity',
    'duration-200',
    'group-hover:opacity-40',
  ].join(' ');
  pulse.style.backgroundColor = color;

  const dot = document.createElement('span');
  dot.className = [
    'relative',
    'h-5',
    'w-5',
    'rounded-full',
    'border-2',
    'border-black',
    'shadow-[0_0_0_2px_rgba(255,255,255,0.8),0_0_22px_rgba(255,79,184,0.75)]',
    'transition-transform',
    'duration-200',
    'group-hover:scale-110',
  ].join(' ');
  dot.style.backgroundColor = color;

  const inner = document.createElement('span');
  inner.className = [
    'absolute',
    'left-1/2',
    'top-1/2',
    'h-1.5',
    'w-1.5',
    '-translate-x-1/2',
    '-translate-y-1/2',
    'rounded-full',
    'bg-black',
  ].join(' ');

  dot.appendChild(inner);
  wrapper.appendChild(pulse);
  wrapper.appendChild(dot);

  return wrapper;
}

function createPopupContent(event: FomoEvent) {
  const content = document.createElement('div');
  content.className = 'fomo-popup';

  const kicker = document.createElement('div');
  kicker.className = 'fomo-popup-kicker';
  kicker.textContent = '⚡ La scelta FOMO';

  const title = document.createElement('strong');
  title.className = 'fomo-popup-title';
  title.textContent = event.title;

  content.append(kicker, title);

  if (event.short_description) {
    const description = document.createElement('p');
    description.className = 'fomo-popup-description';
    description.textContent = event.short_description;
    content.appendChild(description);
  }

  const meta = document.createElement('div');
  meta.className = 'fomo-popup-meta';

  [event.city, event.start_date].filter(Boolean).forEach((value) => {
    const item = document.createElement('span');
    item.textContent = value;
    meta.appendChild(item);
  });

  const detailButton = document.createElement('button');
  detailButton.type = 'button';
  detailButton.className = 'fomo-popup-detail';
  detailButton.textContent = 'Dettaglio →';
  detailButton.setAttribute('aria-label', `Apri il dettaglio di ${event.title}`);

  content.append(meta, detailButton);

  return { content, detailButton };
}

export function EventsMap({ events, onEventSelect }: EventsMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return;
    }

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      center: BOLOGNA_CENTER,
      zoom: 13.2,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
    });

    mapRef.current.addControl(
      new maplibregl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const eventsWithCoordinates = events.filter(
      (event) => event.latitude && event.longitude
    );

    eventsWithCoordinates.forEach((event) => {
      const { content, detailButton } = createPopupContent(event);
      const popup = new Popup({
        offset: 22,
        closeButton: false,
        closeOnClick: true,
        className: 'fomo-map-popup',
      }).setDOMContent(content);

      const markerElement = createFomoMarker(event);

      detailButton.addEventListener('click', () => {
        popup.remove();
        onEventSelect?.(event);
      });

      const marker = new Marker({
        element: markerElement,
        anchor: 'center',
        offset: [0, 0],
      })
        .setLngLat([event.longitude as number, event.latitude as number])
        .setPopup(popup)
        .addTo(mapRef.current as Map);

      markersRef.current.push(marker);
    });

    if (eventsWithCoordinates.length > 1) {
      const bounds = new maplibregl.LngLatBounds();

      eventsWithCoordinates.forEach((event) => {
        bounds.extend([event.longitude as number, event.latitude as number]);
      });

      mapRef.current.fitBounds(bounds, {
        padding: 96,
        maxZoom: 13.2,
        duration: 900,
      });
    } else if (eventsWithCoordinates.length === 0) {
      mapRef.current.flyTo({
        center: BOLOGNA_CENTER,
        zoom: 13.2,
        duration: 900,
      });
    }
  }, [events, onEventSelect]);

  return (
    <section className="relative overflow-hidden border border-white bg-black">

      <div
        ref={mapContainerRef}
        className="h-[680px] w-full contrast-125 saturate-150"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black via-black/60 to-transparent p-6 pt-24">
        <p className="fomo-body-medium text-sm uppercase tracking-[0.2em] text-neutral-400">
          {events.length} eventi nel radar
        </p>
      </div>
    </section>
  );
}
