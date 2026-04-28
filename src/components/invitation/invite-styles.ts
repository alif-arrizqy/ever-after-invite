import { cn } from '@/lib/utils';

/** Standard transition sesuai instruksi: cubic-bezier(0.4, 0, 0.2, 1) = ease-in-out Tailwind */
const stdTransition = 'transition-all duration-300 ease-in-out';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/** Tombol utama — rose primary + aksen gold border */
export const inviteBtnPrimary = cn(
  'inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-primary px-6 py-2.5 font-body text-xs font-medium uppercase tracking-[0.14em] text-primary-foreground shadow-md shadow-primary/20',
  stdTransition,
  'hover:border-gold/65 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30',
  focusRing,
  'disabled:pointer-events-none disabled:opacity-55'
);

/** Tombol sekunder — rose muda */
export const inviteBtnSecondary = cn(
  'inline-flex items-center justify-center gap-2 rounded-full border border-gold/30 bg-secondary px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.14em] text-secondary-foreground shadow-sm',
  stdTransition,
  'hover:border-gold/50 hover:bg-secondary/80 hover:-translate-y-0.5',
  focusRing,
  'disabled:pointer-events-none disabled:opacity-55'
);

/** Outline cream / gold — cocok di atas pola batik */
export const inviteBtnOutline = cn(
  'inline-flex items-center justify-center gap-2 rounded-full border-2 border-gold/45 bg-background/95 px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.14em] text-foreground shadow-sm backdrop-blur-sm',
  stdTransition,
  'hover:border-gold hover:bg-cream hover:-translate-y-0.5',
  focusRing,
  'disabled:pointer-events-none disabled:opacity-55'
);

/** Tombol musik (fixed) */
export const inviteMusicControl = cn(
  'fixed bottom-6 left-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30 bg-background/90 text-primary shadow-md backdrop-blur-md',
  stdTransition,
  'hover:border-primary/60 hover:bg-card hover:text-primary hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5',
  'sm:left-auto sm:right-6 sm:h-14 sm:w-14',
  focusRing
);

/** Tombol kirim ucapan (lebar penuh) */
export const inviteBtnSubmit = cn(inviteBtnPrimary, 'w-full py-3.5');

/** Pill RSVP — Hadir (aktif) */
export const inviteRsvpActiveYes = cn(
  'rounded-full border-2 border-secondary bg-secondary px-4 py-2.5 font-body text-sm font-medium text-secondary-foreground shadow-sm',
  stdTransition
);

/** Pill RSVP — Tidak hadir (aktif) */
export const inviteRsvpActiveNo = cn(
  'rounded-full border-2 border-primary bg-primary px-4 py-2.5 font-body text-sm font-medium text-primary-foreground shadow-sm',
  stdTransition
);

/** Pill RSVP — tidak aktif */
export const inviteRsvpIdle = cn(
  'rounded-full border border-border bg-background/80 px-4 py-2.5 font-body text-sm text-muted-foreground',
  stdTransition,
  'hover:border-primary/40 hover:text-foreground'
);

/** Card hover effect — shadow + lift */
export const cardHover = cn(
  stdTransition,
  'hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/15'
);

/** Link dengan underline animasi kiri ke kanan */
export const animatedLink = cn(
  'hover-underline-animate text-foreground/80',
  stdTransition,
  'hover:text-primary'
);

/** Icon sosial media — rotate + color change saat hover */
export const socialIconLink = cn(
  'inline-flex items-center gap-2 rounded-full border border-gold/35 bg-cream/60 px-4 py-2 font-body text-sm text-primary',
  stdTransition,
  'hover:border-gold hover:bg-cream hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/10',
  '[&>svg]:transition-transform [&>svg]:duration-300 hover:[&>svg]:rotate-[10deg] hover:[&>svg]:text-gold'
);
