export type EventMood = {
  weight: number;
  moods: {
    id: number;
    name: string;
    slug: string;
  } | null;
};

export type EventTag = {
  tags: {
    id: number;
    name: string;
  } | null;
};

export type EventEditorial = {
  why_go: string | null;
  radar_note: string | null;
  best_for: string | null;
  not_for: string | null;
  hype_score: number | null;
  uniqueness_score: number | null;
  accessibility_score: number | null;
  price_score: number | null;
  radar_score: number | null;
};

export type EventArtist = {
  id: number;
  name: string;
  spotify_url: string | null;
  image_url: string | null;
  instagram_url: string | null;
  position: number | null;
};

export type FomoEvent = {
  id: number;
  title: string;
  description: string | null;
  short_description: string | null;
  category: string;
  format: string | null;
  status: string | null;
  start_date: string | null;
  end_date: string | null;
  start_time: string | null;
  end_time: string | null;
  venue_name: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  price_min: number | null;
  price_max: number | null;
  free: boolean | null;
  official_url: string | null;
  booking_url: string | null;
  image_url: string | null;
  source_url: string | null;
  event_editorial: EventEditorial | null;
  event_moods: EventMood[];
  event_tags: EventTag[];
  duration_days: number | null;
  month_label: string | null;
  curation_status: string | null;
  budget_range: string | null;
  price_label: string | null;
  lineup: string | null;
  instagram_handle: string | null;
  image_alt: string | null;
  image_credit: string | null;
  event_artists: EventArtist[];
};
