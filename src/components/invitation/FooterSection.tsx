import { motion } from 'framer-motion';
import { scrollRevealTransition, scrollViewport } from '@/lib/scroll-motion';
import { FooterSectionData } from '@/constant/WeddingData';
import { DiamondDivider } from '@/components/invitation/SectionHeader';

export default function FooterSection() {
  const { image, coupleTitle, closingLine, quote, quoteSource, creditLine } = FooterSectionData;

  return (
    <section
      className="px-6 pb-16 pt-24 text-center"
      style={{
        background: 'linear-gradient(to bottom, hsl(var(--card)) 0%, hsl(var(--background)) 60%, hsl(22 55% 84%) 100%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={scrollViewport}
        transition={scrollRevealTransition}
        className="mx-auto max-w-lg"
      >
        {/* Foto pasangan */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={scrollViewport}
          transition={{ ...scrollRevealTransition, delay: 0.05 }}
          className="mx-auto mb-8 h-44 w-44 overflow-hidden rounded-full border-[3px] border-gold/40 shadow-xl shadow-primary/15 md:h-52 md:w-52"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Nama pasangan */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ ...scrollRevealTransition, delay: 0.1 }}
          className="mb-3 font-accent text-foreground"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}
        >
          {coupleTitle}
        </motion.h2>

        <DiamondDivider />

        {/* Kalimat penutup */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ ...scrollRevealTransition, delay: 0.18 }}
          className="mb-8 font-body text-base leading-loose text-muted-foreground md:text-lg"
        >
          {closingLine}
        </motion.p>

        {/* Ayat Al-Quran */}
        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ ...scrollRevealTransition, delay: 0.26 }}
          className="relative mx-auto mb-10 max-w-sm rounded-2xl border border-gold/20 bg-background/60 px-6 py-6 backdrop-blur-sm"
        >
          {/* Tanda kutip dekoratif */}
          <span
            className="absolute -top-4 left-5 font-heading text-5xl leading-none text-gold/30"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <p className="font-body text-base italic leading-loose text-muted-foreground md:text-lg">
            {quote}
          </p>
          <footer className="mt-3 font-body text-sm not-italic text-gold">
            — {quoteSource}
          </footer>
        </motion.blockquote>

        {/* Divider penutup */}
        <div className="mx-auto mb-6 h-px w-28 bg-gradient-to-r from-transparent via-gold/45 to-transparent" />

        {/* Credit */}
        <p className="font-body text-sm text-muted-foreground/70">
          <a
            href="https://redcode-solutions.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-underline-animate transition-colors duration-200 hover:text-primary"
          >
            {creditLine}
          </a>
        </p>
      </motion.div>
    </section>
  );
}
