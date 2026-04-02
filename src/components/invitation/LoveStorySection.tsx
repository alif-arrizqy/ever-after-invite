import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { scrollEase, scrollRevealTransition, scrollViewport } from '@/lib/scroll-motion';
import { LoveStorySectionData } from '@/constant/WeddingData';

export default function LoveStorySection() {
  const { sectionTitle, milestones } = LoveStorySectionData;
  return (
    <section className="py-20 px-6 bg-card">
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={scrollRevealTransition}
          className="mb-14 text-center font-heading text-3xl text-foreground md:text-4xl"
        >
          {sectionTitle}
        </motion.h2>

        <div className="relative">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-gold/40 via-border to-gold/40 md:left-1/2 md:-translate-x-px" />

          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={scrollViewport}
              transition={{ type: 'tween', duration: 0.62, delay: i * 0.06, ease: scrollEase }}
              className={`relative mb-12 flex items-start gap-4 pl-14 md:pl-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="absolute left-4 top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gold/50 bg-primary shadow-md md:left-1/2 md:-translate-x-1/2">
                <Heart className="h-2.5 w-2.5 text-primary-foreground" />
              </div>

              <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <span className="font-body text-xs font-semibold uppercase tracking-widest text-gold">{m.year}</span>
                <h3 className="mt-1 mb-2 font-heading text-xl text-foreground">{m.title}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
