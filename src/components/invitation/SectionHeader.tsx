import { memo } from 'react';
import { motion } from 'framer-motion';
import { scrollRevealTransition, scrollViewport } from '@/lib/scroll-motion';

interface SectionHeaderProps {
  /** Label kecil di atas heading — uppercase tracking lebar, warna gold */
  eyebrow?: string;
  /** Heading utama section */
  heading: string;
  /** Teks deskripsi opsional di bawah heading */
  description?: string;
  /** Align konten: center (default) atau left */
  align?: 'center' | 'left';
  /** Warna heading: foreground (default) atau white */
  headingColor?: 'foreground' | 'white';
}

/** Ornamen diamond SVG kecil untuk divider */
const DiamondDivider = memo(function DiamondDivider({ center = true }: { center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 my-5 ${center ? 'justify-center' : ''}`}>
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
      <svg
        viewBox="0 0 12 12"
        className="h-2.5 w-2.5 shrink-0 text-gold/70"
        fill="currentColor"
        aria-hidden="true"
      >
        <polygon points="6,0 12,6 6,12 0,6" />
      </svg>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
    </div>
  );
});

/**
 * Header section yang konsisten: eyebrow → ornamen diamond → heading → deskripsi.
 * Digunakan di semua section undangan untuk menjaga visual hierarchy yang seragam.
 */
const SectionHeader = memo(function SectionHeader({
  eyebrow,
  heading,
  description,
  align = 'center',
  headingColor = 'foreground',
}: SectionHeaderProps) {
  const textAlign = align === 'center' ? 'text-center' : 'text-left';
  const headingClass =
    headingColor === 'white' ? 'text-white' : 'text-foreground';

  return (
    <div className={`mb-12 ${textAlign}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={scrollRevealTransition}
          className="font-body text-xs uppercase tracking-[0.35em] text-gold/90"
        >
          {eyebrow}
        </motion.p>
      )}

      <DiamondDivider center={align === 'center'} />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={scrollViewport}
        transition={{ ...scrollRevealTransition, delay: 0.1 }}
        className={`font-heading ${headingClass} leading-tight`}
        style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
      >
        {heading}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ ...scrollRevealTransition, delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
});

export { DiamondDivider };
export default SectionHeader;
