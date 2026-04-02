-- =============================================================================
-- Setup lengkap: schema + tabel + RLS + hak anon (Supabase → SQL Editor).
-- Cocok dengan src/lib/belle-wedding-schema.ts → belle_wedding
--
-- !!! WAJIB (tanpa ini API mengembalikan PGRST106 / 406 "Invalid schema") !!!
-- Supabase HANYA mengekspos schema public + graphql_public secara default.
-- Tambahkan belle_wedding ke Data API:
--
--   1) Buka: https://supabase.com/dashboard/project/<PROJECT_REF>/settings/api
--   2) Scroll ke bagian "Data API" → "Exposed schemas"
--   3) Klik "Add schema" / edit daftar → masukkan: belle_wedding
--   4) Simpan. Tunggu ±1 menit agar gateway memuat ulang.
--
-- Dokumentasi: https://supabase.com/docs/guides/api/using-custom-schemas
--
-- Setelah itu jalankan SELURUH SQL di bawah (urutan: expose dashboard bisa
-- sebelum atau sesudah SQL; keduanya diperlukan).
--
-- Error "relation belle_wedding.guests does not exist" = jalankan CREATE di bawah.
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS belle_wedding;

CREATE TABLE IF NOT EXISTS belle_wedding.guests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT belle_wedding_guests_slug_unique UNIQUE (slug)
);

CREATE INDEX IF NOT EXISTS idx_belle_wedding_guests_slug ON belle_wedding.guests (slug);
CREATE INDEX IF NOT EXISTS idx_belle_wedding_guests_created ON belle_wedding.guests (created_at DESC);

CREATE TABLE IF NOT EXISTS belle_wedding.guestbook_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  rsvp text NOT NULL CHECK (rsvp IN ('attending', 'not_attending')),
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_belle_wedding_guestbook_created ON belle_wedding.guestbook_entries (created_at DESC);

-- Akses schema (wajib untuk PostgREST + anon)
GRANT USAGE ON SCHEMA belle_wedding TO anon, authenticated, service_role;

GRANT ALL ON ALL TABLES IN SCHEMA belle_wedding TO service_role;
GRANT SELECT, INSERT ON belle_wedding.guestbook_entries TO anon;
GRANT SELECT, INSERT, DELETE ON belle_wedding.guests TO anon;

ALTER TABLE belle_wedding.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE belle_wedding.guestbook_entries ENABLE ROW LEVEL SECURITY;

-- Buku tamu (undangan)
DROP POLICY IF EXISTS "guestbook_select_anon" ON belle_wedding.guestbook_entries;
CREATE POLICY "guestbook_select_anon" ON belle_wedding.guestbook_entries
  FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "guestbook_insert_anon" ON belle_wedding.guestbook_entries;
CREATE POLICY "guestbook_insert_anon" ON belle_wedding.guestbook_entries
  FOR INSERT TO anon WITH CHECK (true);

-- Daftar tamu (admin)
DROP POLICY IF EXISTS "guests_select_anon" ON belle_wedding.guests;
CREATE POLICY "guests_select_anon" ON belle_wedding.guests FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "guests_insert_anon" ON belle_wedding.guests;
CREATE POLICY "guests_insert_anon" ON belle_wedding.guests FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "guests_delete_anon" ON belle_wedding.guests;
CREATE POLICY "guests_delete_anon" ON belle_wedding.guests FOR DELETE TO anon USING (true);

ALTER DEFAULT PRIVILEGES IN SCHEMA belle_wedding
  GRANT ALL ON TABLES TO service_role;

-- Disarankan Supabase untuk schema custom + PostgREST (idempotent, aman dengan RLS):
GRANT ALL ON ALL ROUTINES IN SCHEMA belle_wedding TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA belle_wedding TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA belle_wedding
  GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA belle_wedding
  GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA belle_wedding
  GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

-- =============================================================================
-- Jika tabel Anda sudah ada di schema LAIN (mis. "belle-wedding" dengan strip):
-- 1) Cek nama di Table Editor, lalu samakan string di app (belle-wedding-schema.ts)
-- 2) Atau pindahkan: tidak disarankan; lebih mudah pakai schema belle_wedding di atas.
-- =============================================================================
