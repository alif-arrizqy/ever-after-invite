import { supabase } from '@/lib/supabase';

export interface GuestbookMessage {
  id: string;
  name: string;
  attending: boolean;
  message: string;
  timestamp: Date;
}

export interface GuestbookInsertInput {
  name: string;
  attending: boolean;
  message: string;
}

/**
 * Ucapan tamu terbaru dulu.
 * Error → [] (tanpa memutus alur undangan).
 */
export async function fetchGuestbookMessages(): Promise<GuestbookMessage[]> {
  const { data, error } = await supabase
    .from('guestbook_entries')
    .select('id,guest_name,rsvp,message,created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('[guestbookService] fetchGuestbookMessages', error.message);
    return [];
  }
  return (data ?? []).map(row => ({
    id: row.id as string,
    name: row.guest_name as string,
    attending: row.rsvp === 'attending',
    message: row.message as string,
    timestamp: new Date(row.created_at as string),
  }));
}

export async function addGuestbookEntry(input: GuestbookInsertInput): Promise<void> {
  const { error } = await supabase.from('guestbook_entries').insert({
    guest_name: input.name.trim(),
    rsvp: input.attending ? 'attending' : 'not_attending',
    message: input.message.trim(),
  });
  if (error) {
    console.error('[guestbookService] addGuestbookEntry', error);
    throw error;
  }
}
