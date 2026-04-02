import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { scrollRevealTransitionMedium, scrollViewport } from '@/lib/scroll-motion';
import { CoupleSectionData } from '@/constant/WeddingData';

const personVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function PersonCard({
  fullName,
  parentLine,
  imageSrc,
  imageAlt,
  instagramUrl,
  instagramHandle,
  delay,
}: {
  fullName: string;
  parentLine: string;
  imageSrc: string;
  imageAlt: string;
  instagramUrl: string;
  instagramHandle: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={personVariant}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      transition={{ ...scrollRevealTransitionMedium, delay }}
      className="flex flex-col items-center text-center"
    >
      <div className="mb-6 h-48 w-48 overflow-hidden rounded-full border-[3px] border-gold/40 shadow-lg shadow-primary/10 md:h-56 md:w-56">
        <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <h3 className="font-heading text-2xl text-foreground md:text-3xl mb-2">{fullName}</h3>
      <p className="text-muted-foreground font-body text-sm mb-4 max-w-xs">{parentLine}</p>
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-cream/60 px-4 py-2 font-body text-sm text-primary transition-colors hover:border-gold hover:bg-cream"
      >
        <Instagram className="h-4 w-4 text-gold" />@{instagramHandle}
      </a>
    </motion.div>
  );
}

export default function CouplesSection() {
  const { groom, bride } = CoupleSectionData;
  return (
    <section className="py-20 px-6 bg-card">
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-x-8 md:gap-y-0 lg:gap-x-12">
        <PersonCard
          fullName={groom.fullName}
          parentLine={groom.parentLine}
          imageSrc={groom.image.src}
          imageAlt={groom.image.alt}
          instagramUrl={groom.instagramUrl}
          instagramHandle={groom.instagramHandle}
          delay={0}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={scrollViewport}
          transition={{ ...scrollRevealTransitionMedium, delay: 0.14 }}
          className="flex justify-center py-1 md:self-center md:py-0"
        >
          <span className="font-heading text-5xl leading-none text-gold">&</span>
        </motion.div>

        <PersonCard
          fullName={bride.fullName}
          parentLine={bride.parentLine}
          imageSrc={bride.image.src}
          imageAlt={bride.image.alt}
          instagramUrl={bride.instagramUrl}
          instagramHandle={bride.instagramHandle}
          delay={0.28}
        />
      </div>
    </section>
  );
}
