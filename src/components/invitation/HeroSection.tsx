import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

interface HeroSectionProps {
  guestName: string | null;
}

export default function HeroSection({ guestName }: HeroSectionProps) {
  const scrollToContent = () => {
    document.getElementById('greeting')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Wedding background" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-4"
        >
          The Wedding of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-heading text-5xl md:text-7xl text-primary-foreground mb-2 leading-tight"
        >
          Andi <span className="text-gold">&</span> Putri
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="h-px bg-gold/50 w-48 mx-auto my-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-primary-foreground/80 font-body text-base mb-2"
        >
          Minggu, 15 September 2025
        </motion.p>

        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-8"
          >
            <p className="text-primary-foreground/70 font-body text-sm mb-1">Kepada Yth.</p>
            <p className="text-primary-foreground font-heading text-2xl md:text-3xl italic">
              {guestName}
            </p>
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={scrollToContent}
          className="mt-10 inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase rounded-full animate-pulse-soft hover:bg-primary/90 transition-colors"
        >
          Buka Undangan
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      </div>
    </section>
  );
}
