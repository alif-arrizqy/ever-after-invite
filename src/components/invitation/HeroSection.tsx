import { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { HeroSectionData, WEDDING_COUNTDOWN_TARGET } from '@/constant/WeddingData';
import { scrollEase } from '@/lib/scroll-motion';

interface HeroSectionProps {
  guestName: string | null;
}

const CountdownBlocks = memo(function CountdownBlocks() {
  const [tick, setTick] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const target  = WEDDING_COUNTDOWN_TARGET.getTime();
  const diff    = target - tick;

  if (diff <= 0) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, type: 'tween', duration: 0.65, ease: scrollEase }}
        className="mt-6 font-body text-xs md:text-sm tracking-[0.2em] uppercase"
        style={{ color: 'hsl(39 46% 71%)' }}
      >
        Alhamdulillah — hari yang kami nanti telah tiba
      </motion.p>
    );
  }

  const totalSec = Math.floor(diff / 1000);
  const days     = Math.floor(totalSec / 86400);
  const hours    = Math.floor((totalSec % 86400) / 3600);
  const minutes  = Math.floor((totalSec % 3600) / 60);
  const seconds  = totalSec % 60;

  const cells = [
    { value: days,    label: 'Hari' },
    { value: hours,   label: 'Jam' },
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
      <p className="mb-3 font-body text-xs tracking-[0.25em] uppercase text-white/65">
        Menuju hari bahagia
      </p>
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {cells.map(cell => (
          <div
            key={cell.label}
            className="rounded-xl border border-white/20 bg-white/10 px-1 py-2.5 text-center shadow-inner shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/15 md:py-3"
          >
            <span className="block font-heading text-xl text-white tabular-nums md:text-2xl">
              {String(cell.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-body uppercase tracking-wider text-white/70 md:text-xs">
              {cell.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
});

const HeroSection = memo(function HeroSection({ guestName }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden"
    >
      {/* Foto background dengan parallax subtle */}
      <div className="absolute inset-0">
        <img
          src={HeroSectionData.backgroundImage}
          alt={HeroSectionData.backgroundAlt}
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        {/* Overlay gradient — rose-tinted agar selaras tema */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(30,10,18,0.65) 0%, rgba(50,15,30,0.42) 45%, rgba(30,10,18,0.72) 100%)',
          }}
        />
        {/* Lapisan rose tipis untuk cohesive color */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(220, 128, 155, 0.12)' }}
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-10 sm:pb-16">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, type: 'tween', duration: 0.65, ease: scrollEase }}
            className="mb-4 font-body text-xs uppercase tracking-[0.35em] text-white/70"
          >
            {HeroSectionData.tagline}
          </motion.p>

          {/* Nama pasangan — font-accent (Dancing Script) untuk nuansa romantis */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, type: 'tween', duration: 0.9, ease: scrollEase }}
            className="mb-2 font-accent text-white leading-tight"
            style={{ fontSize: 'clamp(3.2rem, 10vw, 5.5rem)' }}
          >
            {HeroSectionData.groomShortName}{' '}
            <span style={{ color: 'hsl(39 46% 71%)' }}>&</span>{' '}
            {HeroSectionData.brideShortName}
          </motion.h1>

          {/* Divider gold */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.98, type: 'tween', duration: 0.75, ease: scrollEase }}
            className="mx-auto my-6 h-px w-56"
            style={{
              background: 'linear-gradient(to right, transparent, hsl(39 46% 71% / 0.7), transparent)',
            }}
          />

          {/* Tanggal */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.18, type: 'tween', duration: 0.6, ease: scrollEase }}
            className="mb-2 font-body text-sm tracking-[0.12em] text-white/80"
          >
            {HeroSectionData.weddingDateDisplay}
          </motion.p>

          {/* Countdown */}
          <CountdownBlocks />

          {/* Nama tamu */}
          {guestName && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.42, type: 'tween', duration: 0.65, ease: scrollEase }}
              className="mt-10 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-sm"
            >
              <p className="mb-1 font-body text-xs uppercase tracking-[0.25em] text-white/60">
                Kepada Yth.
              </p>
              <p className="font-heading text-2xl italic text-white md:text-3xl">{guestName}</p>
            </motion.div>
          )}

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, type: 'tween', duration: 0.6, ease: scrollEase }}
            className="mt-14 flex flex-col items-center gap-2"
          >
            <p className="font-body text-[10px] uppercase tracking-[0.3em] text-white/40">
              Gulir ke bawah
            </p>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="h-6 w-px bg-gradient-to-b from-white/40 to-transparent"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
