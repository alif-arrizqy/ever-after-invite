import { createClient } from '@supabase/supabase-js';
import { BELLE_WEDDING_SCHEMA } from '@/lib/belle-wedding-schema';

/**
 * Sama pola dengan elegant-wedding-invite: satu client untuk browser.
 * Env: VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
 * (vite.config memetakan SUPABASE_PROJECT_URL / SUPABASE_ANON_KEY dari .env jika perlu.)
 *
 * Schema belle_wedding: jika PGRST106 "Invalid schema", di Dashboard → Settings → API
 * → Data API → Exposed schemas, tambahkan `belle_wedding` lalu simpan.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase: set VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di .env (atau SUPABASE_PROJECT_URL + SUPABASE_ANON_KEY agar dipetakan oleh Vite).'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: BELLE_WEDDING_SCHEMA },
  auth: { persistSession: false, autoRefreshToken: false },
});
