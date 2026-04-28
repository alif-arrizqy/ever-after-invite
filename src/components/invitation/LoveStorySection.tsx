import { memo } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { scrollEase, scrollViewport } from '@/lib/scroll-motion';
import { LoveStorySectionData } from '@/constant/WeddingData';
import SectionHeader from '@/components/invitation/SectionHeader';

/** Item tunggal milestone love story */
const MilestoneItem = memo(function MilestoneItem({
  year,
  title,
  desc,
  index,
}: {
  year:   string;
  title:  string;
  desc:   string;
  index:  number;
}) {
  const isEven   = index % 2 === 0;
  const xOffset  = isEven ? -32 : 32;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={scrollViewport}
      transition={{ type: 'tween', duration: 0.65, delay: index * 0.07, ease: scrollEase }}
      className={`relative mb-14 flex items-start gap-4 pl-16 md:pl-0 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Dot / heart pada garis timeline */}
      <div className="absolute left-5 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gold/50 bg-primary shadow-md shadow-primary/30 md:left-1/2 md:-translate-x-1/2">
        <Heart className="h-3 w-3 text-primary-foreground" />
      </div>

      {/* Konten milestone */}
      <div
        className={`md:w-1/2 ${isEven ? 'md:pr-14 md:text-right' : 'md:pl-14'}`}
      >
        {/* Tahun */}
        <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          {year}
        </span>

        {/* Judul milestone */}
        <h3
          className="mb-2 mt-1 font-heading text-foreground"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}
        >
          {title}
        </h3>

        {/* Deskripsi — dari text-sm ke text-base */}
        <p className="font-body text-base leading-relaxed text-muted-foreground">
          {desc}
        </p>
      </div>
    </motion.div>
  );
});

export default function LoveStorySection() {
  const { sectionTitle, milestones } = LoveStorySectionData;

  return (
    <section className="py-24 px-6 bg-card">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          eyebrow="Perjalanan Cinta"
          heading={sectionTitle}
        />

        {/* Timeline */}
        <div className="relative">
          {/* Garis vertikal */}
          <div className="absolute bottom-0 left-8 top-0 w-px bg-gradient-to-b from-gold/20 via-gold/40 to-gold/20 md:left-1/2 md:-translate-x-px" />

          {milestones.map((m, i) => (
            <MilestoneItem
              key={i}
              index={i}
              year={m.year}
              title={m.title}
              desc={m.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
