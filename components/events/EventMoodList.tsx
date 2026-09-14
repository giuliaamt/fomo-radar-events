import type { EventMood } from '@/types/event';

type EventMoodListProps = {
  moods?: EventMood[];
};

export function EventMoodList({ moods = [] }: EventMoodListProps) {
  const visibleMoods = moods.flatMap((item) =>
    item.moods ? [item.moods] : []
  );

  if (visibleMoods.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {visibleMoods.map((mood) => (
        <span
          key={mood.id}
          className="fomo-body-medium rounded-full border border-[#00ff19] px-3 py-1 text-xs uppercase tracking-wide text-[#00ff19]"        >
          {mood.name}
        </span>
      ))}
    </div>
  );
}
