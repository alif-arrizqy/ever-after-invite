import { memo } from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { scrollRevealTransitionMedium, scrollViewport } from '@/lib/scroll-motion';
import { CoupleSectionData } from '@/constant/WeddingData';
import { socialIconLink } from '@/components/invitation/invite-styles';
import SectionHeader from '@/components/invitation/SectionHeader';

const personVariant = {
  hidden:   { opacity: 0, y: 40 },
  visible:  { opacity: 1, y: 0 },
};

const PersonCard = memo(function PersonCard({
  fullName,
  parentLine,
  imageSrc,
  imageAlt,
  instagramUrl,
  instagramHandle,
  delay,
}: {
  fullName:          string;
  parentLine:        string;
  imageSrc:          string;
  imageAlt:          string;
  instagramUrl:      string;
  instagramHandle:   string;
  delay:             number;
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
      {/* Foto profil */}
      <div className="mb-7 h-52 w-52 overflow-hidden rounded-full border-[3px] border-gold/40 shadow-xl shadow-primary/15 md:h-64 md:w-64">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Nama lengkap */}
      <h3
        className="mb-2 font-heading text-foreground"
        style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}
      >
        {fullName}
      </h3>

      {/* Garis orang tua */}
      <p className="mb-5 max-w-xs font-body text-sm leading-relaxed text-muted-foreground md:text-base">
        {parentLine}
      </p>

      {/* Instagram link */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={socialIconLink}
      >
        <Instagram className="h-4 w-4 text-gold" />
        @{instagramHandle}
      </a>
    </motion.div>
  );
});

export default function CouplesSection() {
  const { groom, bride } = CoupleSectionData;

  return (
    <section className="py-24 px-6 bg-card">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Mempelai"
          heading="Kedua Mempelai"
        />

        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-x-10 lg:gap-x-16">
          <PersonCard
            fullName={groom.fullName}
            parentLine={groom.parentLine}
            imageSrc={groom.image.src}
            imageAlt={groom.image.alt}
            instagramUrl={groom.instagramUrl}
            instagramHandle={groom.instagramHandle}
            delay={0}
          />

          {/* Pemisah & */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={scrollViewport}
            transition={{ ...scrollRevealTransitionMedium, delay: 0.15 }}
            className="flex flex-col items-center justify-center gap-3 py-1 md:self-center md:py-0"
          >
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
            <span className="font-heading text-5xl leading-none text-gold">&</span>
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
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
      </div>
    </section>
  );
}
