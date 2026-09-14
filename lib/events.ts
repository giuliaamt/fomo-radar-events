import { BOLOGNA_DEMO_EVENTS } from '@/lib/demo-events';
import type { FomoEvent } from '@/types/event';

export async function getEvents(): Promise<FomoEvent[]> {
  return BOLOGNA_DEMO_EVENTS;
}
