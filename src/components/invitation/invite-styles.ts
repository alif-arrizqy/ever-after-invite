import { cn } from '@/lib/utils';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/** Tombol utama — terracotta + aksen gold */
export const inviteBtnPrimary = cn(
  'inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-primary px-6 py-2.5 font-body text-xs font-medium uppercase tracking-[0.14em] text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:border-gold/60 hover:shadow-lg hover:shadow-primary/25',
  focusRing,
  'disabled:pointer-events-none disabled:opacity-55'
);

/** Tombol sekunder — sage */
export const inviteBtnSecondary = cn(
  'inline-flex items-center justify-center gap-2 rounded-full border border-gold/30 bg-secondary px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.14em] text-secondary-foreground shadow-sm transition-all duration-300 hover:border-gold/45 hover:bg-secondary/90',
  focusRing,
  'disabled:pointer-events-none disabled:opacity-55'
);

/** Outline cream / gold — cocok di atas pola batik */
export const inviteBtnOutline = cn(
  'inline-flex items-center justify-center gap-2 rounded-full border-2 border-gold/45 bg-background/95 px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.14em] text-foreground shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-cream',
  focusRing,
  'disabled:pointer-events-none disabled:opacity-55'
);

/** CTA di atas foto hero (gelap) — tanpa animasi bergerak */
export const inviteBtnHero = cn(
  'inline-flex items-center justify-center gap-2 rounded-full border-2 border-gold/55 bg-primary-foreground/10 px-8 py-3 font-body text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground shadow-lg shadow-black/20 backdrop-blur-md transition-colors duration-200 hover:border-gold hover:bg-gold/20',
  focusRing
);

/** Tombol musik (fixed) — ikon saja; outline netral agar beda dari CTA terracotta/gold */
export const inviteMusicControl = cn(
  'fixed bottom-6 left-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full border-2 border-foreground/25 bg-background/90 text-primary shadow-md backdrop-blur-md transition-colors duration-200 hover:border-primary/60 hover:bg-card hover:text-primary sm:left-auto sm:right-6 sm:h-14 sm:w-14',
  focusRing
);

/** Tombol kirim ucapan (lebar penuh) */
export const inviteBtnSubmit = cn(inviteBtnPrimary, 'w-full py-3.5');

/** Pill RSVP — Hadir (aktif): sage penuh, teks cream — kontras jelas */
export const inviteRsvpActiveYes = cn(
  'rounded-full border-2 border-secondary bg-secondary px-4 py-2.5 font-body text-sm font-medium text-secondary-foreground shadow-sm'
);

/** Pill RSVP — Tidak hadir (aktif) */
export const inviteRsvpActiveNo = cn(
  'rounded-full border-2 border-primary bg-primary px-4 py-2.5 font-body text-sm font-medium text-primary-foreground shadow-sm'
);

/** Pill RSVP — tidak aktif */
export const inviteRsvpIdle = cn(
  'rounded-full border border-border bg-background/80 px-4 py-2.5 font-body text-sm text-muted-foreground transition-colors hover:border-gold/35 hover:text-foreground'
);
