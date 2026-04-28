import { useRef, useState, useCallback, memo } from 'react';
import gsap from 'gsap';
import { HeroSectionData } from '@/constant/WeddingData';

interface GateCoverProps {
  guestName: string | null;
  onOpen: () => void;
}

/** SVG ornamen dekoratif pada tepi panel */
const PanelOrnament = memo(function PanelOrnament({ side }: { side: 'left' | 'right' }) {
  const points80  = side === 'left' ? '22,74 28,80 22,86 16,80' : '2,74 8,80 2,86 -4,80';
  const points180 = side === 'left' ? '22,174 28,180 22,186 16,180' : '2,174 8,180 2,186 -4,180';
  const points280 = side === 'left' ? '22,274 28,280 22,286 16,280' : '2,274 8,280 2,286 -4,280';
  const lineX     = side === 'left' ? '22' : '2';

  return (
    <svg
      viewBox={`0 0 30 360`}
      className="h-full w-8 max-h-[360px]"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Garis vertikal berliku */}
      <path
        d={`M${lineX} 0 Q${side === 'left' ? '16' : '8'} 30 ${lineX} 60 Q${side === 'left' ? '28' : '-4'} 90 ${lineX} 120 Q${side === 'left' ? '16' : '8'} 150 ${lineX} 180 Q${side === 'left' ? '28' : '-4'} 210 ${lineX} 240 Q${side === 'left' ? '16' : '8'} 270 ${lineX} 300 Q${side === 'left' ? '28' : '-4'} 330 ${lineX} 360`}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1"
        fill="none"
      />
      {/* Diamond ornamen */}
      <polygon points={points80}  fill="rgba(255,255,255,0.35)" />
      <polygon points={points180} fill="rgba(255,255,255,0.45)" />
      <polygon points={points280} fill="rgba(255,255,255,0.35)" />
      {/* Lingkaran kecil di titik tertentu */}
      <circle cx={lineX} cy="30"  r="2.5" fill="rgba(255,255,255,0.25)" />
      <circle cx={lineX} cy="330" r="2.5" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
});

/** Ornamen corner dekoratif */
const CornerOrnament = memo(function CornerOrnament({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const isTop    = position === 'tl' || position === 'tr';
  const isLeft   = position === 'tl' || position === 'bl';
  const scaleX   = isLeft ? 1 : -1;
  const scaleY   = isTop  ? 1 : -1;

  return (
    <svg
      viewBox="0 0 60 60"
      className="absolute h-16 w-16 opacity-30"
      style={{
        top:    isTop  ? '16px' : 'auto',
        bottom: !isTop ? '16px' : 'auto',
        left:   isLeft ? '16px' : 'auto',
        right:  !isLeft ? '16px' : 'auto',
        transform: `scale(${scaleX}, ${scaleY})`,
      }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M4 4 L24 4 L4 24 Z" fill="none" stroke="white" strokeWidth="1" />
      <path d="M4 4 Q28 4 28 28" fill="none" stroke="white" strokeWidth="1" />
      <circle cx="4" cy="4" r="3" fill="white" />
      <circle cx="24" cy="4" r="1.5" fill="white" />
      <circle cx="4" cy="24" r="1.5" fill="white" />
    </svg>
  );
});

const GateCover = memo(function GateCover({ guestName, onOpen }: GateCoverProps) {
  const coverRef        = useRef<HTMLDivElement>(null);
  const leftPanelRef    = useRef<HTMLDivElement>(null);
  const rightPanelRef   = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating]   = useState(false);

  const handleOpen = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        const cover = coverRef.current;
        if (cover) {
          cover.style.visibility = 'hidden';
          cover.style.pointerEvents = 'none';
          /* Lepas will-change setelah animasi selesai */
          if (leftPanelRef.current)  leftPanelRef.current.style.willChange  = 'auto';
          if (rightPanelRef.current) rightPanelRef.current.style.willChange = 'auto';
        }
        onOpen();
      },
    });

    /* Fade + angkat konten tengah */
    tl.to(centerContentRef.current, {
      opacity: 0,
      y: -24,
      duration: 0.38,
      ease: 'power1.out',
    });

    /* Panel kiri ke kiri, panel kanan ke kanan */
    tl.to(
      [leftPanelRef.current, rightPanelRef.current],
      {
        xPercent: (i: number) => (i === 0 ? -100 : 100),
        duration: 1.2,
        ease: 'power2.inOut',
      },
      0.18
    );
  }, [isAnimating, onOpen]);

  return (
    <div
      ref={coverRef}
      className="fixed inset-0 z-[100] overflow-hidden"
      role="dialog"
      aria-label="Cover undangan pernikahan"
      aria-modal="true"
    >
      {/* ===== PANEL KIRI ===== */}
      <div
        ref={leftPanelRef}
        className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #c9587a 0%, #DC809B 35%, #e89faf 65%, #f0bcc7 100%)',
          willChange: 'transform',
        }}
      >
        {/* Batik pattern subtle */}
        <div className="batik-pattern absolute inset-0" style={{ opacity: 0.12 }} />

        {/* Corner ornaments */}
        <CornerOrnament position="tl" />
        <CornerOrnament position="bl" />

        {/* Ornamen tepi kanan panel kiri */}
        <div className="absolute inset-y-0 right-0 flex items-center justify-center">
          <PanelOrnament side="left" />
        </div>
      </div>

      {/* ===== PANEL KANAN ===== */}
      <div
        ref={rightPanelRef}
        className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
        style={{
          background: 'linear-gradient(200deg, #c9587a 0%, #DC809B 35%, #e89faf 65%, #f0bcc7 100%)',
          willChange: 'transform',
        }}
      >
        {/* Batik pattern subtle */}
        <div className="batik-pattern absolute inset-0" style={{ opacity: 0.12 }} />

        {/* Corner ornaments */}
        <CornerOrnament position="tr" />
        <CornerOrnament position="br" />

        {/* Ornamen tepi kiri panel kanan */}
        <div className="absolute inset-y-0 left-0 flex items-center justify-center">
          <PanelOrnament side="right" />
        </div>
      </div>

      {/* ===== KONTEN TENGAH — di atas kedua panel ===== */}
      <div
        ref={centerContentRef}
        className="absolute inset-0 z-10 flex items-center justify-center px-6"
      >
        <div className="relative text-center" style={{ maxWidth: '360px' }}>
          {/* Tagline */}
          <p
            className="mb-5 font-body text-[10px] uppercase tracking-[0.4em] text-white/70"
            style={{ letterSpacing: '0.35em' }}
          >
            {HeroSectionData.tagline}
          </p>

          {/* Divider atas */}
          <div className="mx-auto mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/30" />
            <svg viewBox="0 0 16 16" className="h-4 w-4 text-white/50" fill="currentColor" aria-hidden="true">
              <polygon points="8,1 15,8 8,15 1,8" />
            </svg>
            <div className="h-px flex-1 bg-white/30" />
          </div>

          {/* Nama Pengantin - menggunakan font-accent (Dancing Script) */}
          <h1
            className="font-accent text-white leading-snug"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 4.5rem)' }}
          >
            {HeroSectionData.groomShortName}
          </h1>

          <div className="my-2 flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-white/40" />
            <span
              className="font-heading text-white/80"
              style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}
            >
              &
            </span>
            <div className="h-px w-10 bg-white/40" />
          </div>

          <h1
            className="font-accent text-white leading-snug"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 4.5rem)' }}
          >
            {HeroSectionData.brideShortName}
          </h1>

          {/* Divider bawah */}
          <div className="mx-auto mt-5 mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/30" />
            <svg viewBox="0 0 16 16" className="h-3 w-3 text-white/50" fill="currentColor" aria-hidden="true">
              <circle cx="8" cy="8" r="5" />
            </svg>
            <div className="h-px flex-1 bg-white/30" />
          </div>

          {/* Tanggal */}
          <p className="font-body text-sm text-white/75 tracking-[0.12em]">
            {HeroSectionData.weddingDateDisplay}
          </p>

          {/* Nama tamu personal (jika ada) */}
          {guestName && (
            <div className="mt-5 rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-white/60">
                Kepada Yth.
              </p>
              <p className="mt-1 font-heading text-lg italic text-white">{guestName}</p>
            </div>
          )}

          {/* Tombol Buka Undangan */}
          <div className="mt-8">
            <button
              type="button"
              onClick={handleOpen}
              disabled={isAnimating}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 bg-white/10 px-10 py-3.5 font-body text-xs font-medium uppercase tracking-[0.22em] text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/20 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:pointer-events-none disabled:opacity-60"
            >
              {isAnimating ? (
                /* Spinner kecil saat animating */
                <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : null}
              Buka Undangan
            </button>
          </div>

          {/* Hint scroll kecil */}
          {!isAnimating && (
            <p className="mt-6 font-body text-[10px] uppercase tracking-[0.25em] text-white/40">
              Sentuh untuk membuka
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export default GateCover;
