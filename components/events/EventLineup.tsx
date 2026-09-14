import { Music } from 'lucide-react';
import type { EventArtist } from '@/types/event';

type EventLineupProps = {
  artists?: EventArtist[];
  fallbackLineup?: string | null;
};

export function EventLineup({ artists = [], fallbackLineup }: EventLineupProps) {
  const sortedArtists = [...artists].sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0)
  );

  if (sortedArtists.length === 0 && !fallbackLineup) {
    return null;
  }

  return (
    <div className="border border-white/10 bg-white/[0.03] p-5">
      <p className="fomo-body-medium mb-4 text-xs uppercase tracking-[0.2em] text-neutral-500">
        Line-up / ospiti
      </p>

      {sortedArtists.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {sortedArtists.map((artist) => (
            <ArtistPill key={artist.id} artist={artist} />
          ))}
        </div>
      ) : (
        <p className="fomo-body text-base leading-7 text-neutral-300">
          {fallbackLineup}
        </p>
      )}
    </div>
  );
}

function ArtistPill({ artist }: { artist: EventArtist }) {
  const content = (
    <>
      <span>{artist.name}</span>

      {artist.spotify_url && (
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1DB954] text-black transition group-hover:bg-white">
          {artist.image_url ? (
            <img
              src={artist.image_url}
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <Music className="h-4 w-4" />
          )}
        </span>
      )}
    </>
  );

  if (artist.spotify_url) {
    return (
      <a
        href={artist.spotify_url}
        target="_blank"
        rel="noreferrer"
        className="group fomo-body-medium inline-flex items-center gap-2 rounded-full border border-[#00ff19] px-3 py-2 text-sm uppercase tracking-wide text-[#00ff19] transition hover:bg-[#00ff19] hover:text-black"
        onClick={(event) => event.stopPropagation()}
      >
        {content}
      </a>
    );
  }

  return (
    <span className="fomo-body-medium inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-sm uppercase tracking-wide text-white">
      {artist.name}
    </span>
  );
}
