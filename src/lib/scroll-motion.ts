import type { Transition } from 'framer-motion';

/**
 * Easing halus (ease-out panjang) — konsisten untuk reveal saat scroll.
 */
export const scrollEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Durasi sedikit lebih panjang agar gerakan terasa lembut, bukan tergesa. */
export const scrollRevealTransition: Transition = {
  type: 'tween',
  duration: 0.78,
  ease: scrollEase,
};

export const scrollRevealTransitionMedium: Transition = {
  type: 'tween',
  duration: 0.65,
  ease: scrollEase,
};

export const scrollRevealTransitionSnappy: Transition = {
  type: 'tween',
  duration: 0.52,
  ease: scrollEase,
};

/**
 * Viewport framer-motion: once + ambang sedikit lebih besar + margin lebih lembut
 * daripada amount kecil + margin -72px (sering terasa “patah” saat scroll cepat).
 */
export const scrollViewport = {
  once: true,
  amount: 0.32,
  margin: '0px 0px -6% 0px',
} as const;
