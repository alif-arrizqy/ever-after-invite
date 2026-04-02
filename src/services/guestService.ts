import { supabase } from '@/lib/supabase';
import { ensureUniqueSlug, prettifySlugFromSlug } from '@/lib/wedding-utils';

export interface Guest {
  id: string;
  name: string;
  slug: string;
}

/**
 * Daftar tamu (urut created_at naik).
 * Jika error DB, mengembalikan [] dan log ke console (halaman undangan tetap tenang).
 */
export async function fetchGuests(): Promise<Guest[]> {
  const { data, error } = await supabase
    .from('guests')
    .select('id,name,slug')
    .order('created_at', { ascending: true });

  if (error) {
    console.warn('[guestService] fetchGuests', error.message);
    return [];
  }
  return (data ?? []) as Guest[];
}

export async function fetchGuestDisplayNameBySlug(slug: string): Promise<string> {
  const { data, error } = await supabase.from('guests').select('name').eq('slug', slug).maybeSingle();
  if (error || !data?.name) return prettifySlugFromSlug(slug);
  return data.name as string;
}

export async function addGuest(name: string): Promise<Guest> {
  const trimmed = name.trim();
  const { data: rows } = await supabase.from('guests').select('slug');
  const existing = (rows ?? []).map((r: { slug: string }) => r.slug);
  const slug = ensureUniqueSlug(trimmed, existing);
  const { data, error } = await supabase.from('guests').insert({ name: trimmed, slug }).select('id,name,slug').single();
  if (error) {
    console.error('[guestService] addGuest', error);
    throw error;
  }
  return data as Guest;
}

export async function deleteGuest(id: string): Promise<void> {
  const { error } = await supabase.from('guests').delete().eq('id', id);
  if (error) {
    console.error('[guestService] deleteGuest', error);
    throw error;
  }
}

/** Impor banyak nama sekaligus; mengembalikan jumlah baris yang di-insert. */
export async function importGuestNames(names: string[]): Promise<number> {
  const { data: rows } = await supabase.from('guests').select('slug');
  let slugs = (rows ?? []).map((r: { slug: string }) => r.slug);
  const toInsert: { name: string; slug: string }[] = [];
  for (const raw of names) {
    const n = String(raw).trim();
    if (!n) continue;
    const slug = ensureUniqueSlug(n, slugs);
    slugs = [...slugs, slug];
    toInsert.push({ name: n, slug });
  }
  if (!toInsert.length) return 0;
  const { error } = await supabase.from('guests').insert(toInsert);
  if (error) {
    console.error('[guestService] importGuestNames', error);
    throw error;
  }
  return toInsert.length;
}

export function generateInvitationUrl(slug: string): string {
  return `${typeof window !== 'undefined' ? window.location.origin : ''}/?guest=${slug}`;
}
