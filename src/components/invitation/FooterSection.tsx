import { motion } from 'framer-motion';
import { scrollRevealTransition, scrollViewport } from '@/lib/scroll-motion';
import { FooterSectionData } from '@/constant/WeddingData';

export default function FooterSection() {
  const { image, coupleTitle, closingLine, quote, quoteSource, creditLine } = FooterSectionData;
  return (
    <section className="py-16 px-6 bg-card text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={scrollViewport}
        transition={scrollRevealTransition}
        className="mx-auto max-w-md"
      >
        <div className="mx-auto mb-8 h-40 w-40 overflow-hidden rounded-full border-[3px] border-gold/40 shadow-lg shadow-primary/10">
          <img src={image.src} alt={image.alt} className="h-full w-full object-cover" loading="lazy" />
        </div>

        <h2 className="mb-3 font-heading text-2xl text-foreground md:text-3xl">{coupleTitle}</h2>

        <p className="mb-6 font-body text-sm leading-relaxed text-muted-foreground">{closingLine}</p>

        <p className="mb-8 font-body text-sm italic leading-relaxed text-muted-foreground">
          &ldquo;{quote}&rdquo;
          <br />
          <span className="mt-1 inline-block text-xs not-italic text-gold">({quoteSource})</span>
        </p>

        <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <p className="font-body text-xs text-muted-foreground"><a href="https://www.instagram.com/alif_arrizqy/" target="_blank" rel="noopener noreferrer">{creditLine}</a></p>
      </motion.div>
    </section>
  );
}
