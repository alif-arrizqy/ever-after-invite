import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HeroSectionData, WEDDING_COUNTDOWN_TARGET } from '@/constant/WeddingData';
import { inviteBtnHero } from '@/components/invitation/invite-styles';
import { scrollEase } from '@/lib/scroll-motion';
import InvitationMusic from '@/components/invitation/InvitationMusic';

interface HeroSectionProps {
  guestName: string | null;
  /** Dipanggil saat tamu mengetuk "Buka undangan" — untuk membuka scroll halaman */
  onOpenInvitation?: () => void;
}

function CountdownBlocks() {
  const [tick, setTick] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const target = WEDDING_COUNTDOWN_TARGET.getTime();
  const diff = target - tick;

  if (diff <= 0) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, type: 'tween', duration: 0.65, ease: scrollEase }}
        className="mt-6 text-gold font-body text-xs md:text-sm tracking-[0.2em] uppercase"
      >
        Alhamdulillah — hari yang kami nanti telah tiba
      </motion.p>
    );
  }

  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  const cells = [
    { value: days, label: 'Hari' },
    { value: hours, label: 'Jam' },
    { value: minutes, label: 'Menit' },
    { value: seconds, label: 'Detik' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, type: 'tween', duration: 0.72, ease: scrollEase }}
      className="mt-8 w-full max-w-md"
    >
      <p className="mb-3 text-primary-foreground/70 font-body text-xs tracking-[0.25em] uppercase">
        Menuju hari bahagia
      </p>
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {cells.map(cell => (
          <div
            key={cell.label}
            className="rounded-xl border border-gold/30 bg-primary-foreground/10 px-1 py-2 text-center shadow-inner shadow-black/5 backdrop-blur-sm md:py-3"
          >
            <span className="block font-heading text-xl text-primary-foreground tabular-nums md:text-2xl">
              {String(cell.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-body uppercase tracking-wider text-primary-foreground/75 md:text-xs">
              {cell.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function HeroSection({ guestName, onOpenInvitation }: HeroSectionProps) {
  const scrollToContent = () => {
    onOpenInvitation?.();
    requestAnimationFrame(() => {
      document.getElementById('greeting')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return (
    <section className="relative flex min-h-[100dvh] min-h-screen flex-col overflow-hidden">
      <InvitationMusic />

      <div className="absolute inset-0">
        <img
          src={HeroSectionData.backgroundImage}
          alt={HeroSectionData.backgroundAlt}
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Blok konten benar-benar di tengah viewport; ruang bawah untuk tombol musik (fixed) */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-28 pt-10 sm:pb-24">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'tween', duration: 0.65, ease: scrollEase }}
            className="mb-4 font-body text-sm uppercase tracking-[0.3em] text-gold"
          >
            {HeroSectionData.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'tween', duration: 0.88, ease: scrollEase }}
            className="mb-2 font-heading text-5xl leading-tight text-primary-foreground md:text-7xl"
          >
            {HeroSectionData.groomShortName} <span className="text-gold">&</span> {HeroSectionData.brideShortName}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, type: 'tween', duration: 0.72, ease: scrollEase }}
            className="mx-auto my-6 h-px w-56 bg-gradient-to-r from-transparent via-gold/70 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, type: 'tween', duration: 0.6, ease: scrollEase }}
            className="mb-2 font-body text-base text-primary-foreground/80"
          >
            {HeroSectionData.weddingDateDisplay}
          </motion.p>

          <CountdownBlocks />

          {guestName && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.45, type: 'tween', duration: 0.65, ease: scrollEase }}
              className="mt-10"
            >
              <p className="mb-1 font-body text-sm text-primary-foreground/70">Kepada Yth.</p>
              <p className="font-heading text-2xl italic text-primary-foreground md:text-3xl">{guestName}</p>
            </motion.div>
          )}

          {/* Jarak jelas antara countdown (atau nama tamu) dan CTA */}
          <div className="mt-14 w-full md:mt-20">
            <button type="button" onClick={scrollToContent} className={inviteBtnHero}>
              Buka undangan
              <ChevronDown className="h-4 w-4 opacity-90" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
