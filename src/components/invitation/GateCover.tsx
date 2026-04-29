import { useEffect, useState, useCallback, memo, type CSSProperties } from 'react';
import coverImage from '@/assets/cover.jpg';
import { HeroSectionData } from '@/constant/WeddingData';

interface GateCoverProps {
  guestName: string | null;
  onOpen: () => void;
}

const GATE_OPEN_DURATION_MS = 1350;

/** SVG ornamen dekoratif pada tepi panel */
const PanelOrnament = memo(function PanelOrnament({ side }: { side: 'left' | 'right' }) {
  const points80  = side === 'left' ? '22,74 28,80 22,86 16,80' : '2,74 8,80 2,86 -4,80';
  const points180 = side === 'left' ? '22,174 28,180 22,186 16,180' : '2,174 8,180 2,186 -4,180';
  const points280 = side === 'left' ? '22,274 28,280 22,286 16,280' : '2,274 8,280 2,286 -4,280';
  const lineX     = side === 'left' ? '22' : '2';

  return (
    <svg
      viewBox={`0 0 30 360`}
      className="h-full max-h-[460px] w-10 drop-shadow-[0_0_18px_rgba(230,193,132,0.18)]"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Garis vertikal berliku */}
      <path
        d={`M${lineX} 0 Q${side === 'left' ? '16' : '8'} 30 ${lineX} 60 Q${side === 'left' ? '28' : '-4'} 90 ${lineX} 120 Q${side === 'left' ? '16' : '8'} 150 ${lineX} 180 Q${side === 'left' ? '28' : '-4'} 210 ${lineX} 240 Q${side === 'left' ? '16' : '8'} 270 ${lineX} 300 Q${side === 'left' ? '28' : '-4'} 330 ${lineX} 360`}
        stroke="rgba(230,193,132,0.58)"
        strokeWidth="1.25"
        fill="none"
      />
      {/* Diamond ornamen */}
      <polygon points={points80}  fill="rgba(230,193,132,0.62)" />
      <polygon points={points180} fill="rgba(255,244,205,0.78)" />
      <polygon points={points280} fill="rgba(230,193,132,0.62)" />
      {/* Lingkaran kecil di titik tertentu */}
      <circle cx={lineX} cy="30"  r="2.5" fill="rgba(255,244,205,0.55)" />
      <circle cx={lineX} cy="330" r="2.5" fill="rgba(255,244,205,0.55)" />
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
      className="absolute h-20 w-20 text-[#E6C184]/55 opacity-80 drop-shadow-[0_0_16px_rgba(230,193,132,0.16)]"
      style={{
        top:    isTop  ? '20px' : 'auto',
        bottom: !isTop ? '20px' : 'auto',
        left:   isLeft ? '20px' : 'auto',
        right:  !isLeft ? '20px' : 'auto',
        transform: `scale(${scaleX}, ${scaleY})`,
      }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M5 5 L30 5 L5 30 Z" fill="none" stroke="currentColor" strokeWidth="1.15" />
      <path d="M5 5 Q34 5 34 34" fill="none" stroke="currentColor" strokeWidth="1.15" />
      <path d="M11 11 Q28 12 28 28" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.65" />
      <circle cx="5" cy="5" r="3" fill="currentColor" />
      <circle cx="30" cy="5" r="1.6" fill="currentColor" />
      <circle cx="5" cy="30" r="1.6" fill="currentColor" />
    </svg>
  );
});

/** Siluet wayang sederhana sebagai ornamen Jawa */
const WayangOrnament = memo(function WayangOrnament({
  side,
  delay,
}: {
  side: 'left' | 'right';
  delay?: string;
}) {
  const isLeft = side === 'left';
  const style = {
    left: isLeft ? '6%' : 'auto',
    right: !isLeft ? '6%' : 'auto',
    animationDelay: delay ?? '0s',
    '--wayang-mirror': isLeft ? '1' : '-1',
  } as CSSProperties;

  return (
    <div
      className="gate-wayang-float pointer-events-none absolute top-1/2 hidden opacity-55 md:block"
      style={style}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 240" className="h-52 w-24 text-[#E6C184]/75 drop-shadow-[0_8px_22px_rgba(20,10,4,0.52)]" fill="none">
        <path d="M50 16 C62 20 68 34 64 48 C60 64 70 84 58 98 C52 106 52 118 58 130 C68 152 62 176 50 186 C38 176 32 152 42 130 C48 118 48 106 42 98 C30 84 40 64 36 48 C32 34 38 20 50 16 Z" fill="currentColor" />
        <path d="M50 12 L54 20 L50 28 L46 20 Z" fill="currentColor" />
        <circle cx="50" cy="50" r="4.5" fill="#4F2F1B" />
        <path d="M50 186 L50 230" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M38 112 C26 124 22 142 26 164" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M62 112 C74 124 78 142 74 164" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
});

const GateCover = memo(function GateCover({ guestName, onOpen }: GateCoverProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (!isOpening) return undefined;

    const timeoutId = window.setTimeout(() => {
      setIsClosed(true);
      onOpen();
    }, GATE_OPEN_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isOpening, onOpen]);

  const handleOpen = useCallback(() => {
    if (isOpening) return;
    setIsOpening(true);
  }, [isOpening]);

  if (isClosed) return null;

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden bg-[#150B06]"
      role="dialog"
      aria-label="Cover undangan pernikahan"
      aria-modal="true"
    >
      <div className="absolute inset-0">
        <img
          src={coverImage}
          alt="Foto pre-wedding mempelai dengan busana adat Jawa"
          className="h-full w-full object-cover object-[center_35%]"
          width={1024}
          height={1536}
          fetchPriority="high"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,8,4,0.48)_0%,rgba(18,8,4,0.12)_30%,rgba(18,8,4,0.08)_50%,rgba(18,8,4,0.16)_70%,rgba(18,8,4,0.50)_100%),linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.06)_42%,rgba(0,0,0,0.58)_100%)]" aria-hidden="true" />
      <div className="batik-pattern gate-batik-drift absolute inset-0 opacity-[0.05] mix-blend-screen" aria-hidden="true" />
      <div className="gate-ambient-glow absolute inset-0" aria-hidden="true" />

      {/* ===== PANEL KIRI ===== */}
      <div
        className={`gate-panel gate-panel-motion gate-panel-left absolute inset-y-0 left-0 w-1/2 overflow-hidden ${
          isOpening ? '-translate-x-[104%]' : 'translate-x-0'
        }`}
      >
        {/* Batik pattern subtle */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,232,171,0.12),transparent_26%),linear-gradient(160deg,rgba(41,20,8,0.42)_0%,rgba(92,47,18,0.26)_42%,rgba(146,88,42,0.12)_100%)]" />
        <div className="batik-pattern gate-batik-drift absolute inset-0 opacity-[0.12] mix-blend-screen" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#F3D99A]/70 to-transparent shadow-[0_0_26px_rgba(230,193,132,0.45)]" />

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
        className={`gate-panel gate-panel-motion gate-panel-right absolute inset-y-0 right-0 w-1/2 overflow-hidden ${
          isOpening ? 'translate-x-[104%]' : 'translate-x-0'
        }`}
      >
        {/* Batik pattern subtle */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(255,232,171,0.10),transparent_26%),linear-gradient(200deg,rgba(41,20,8,0.42)_0%,rgba(92,47,18,0.26)_42%,rgba(146,88,42,0.12)_100%)]" />
        <div className="batik-pattern gate-batik-drift absolute inset-0 opacity-[0.12] mix-blend-screen" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#F3D99A]/70 to-transparent shadow-[0_0_26px_rgba(230,193,132,0.45)]" />

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
        className={`absolute inset-0 z-10 flex items-center justify-center px-6 transition-all duration-500 ease-out ${
          isOpening ? '-translate-y-8 scale-95 opacity-0 blur-sm' : 'translate-y-0 scale-100 opacity-100 blur-0'
        }`}
      >
        <WayangOrnament side="left" delay="0.3s" />
        <WayangOrnament side="right" delay="1.1s" />
        <div className="gate-content-card relative w-full max-w-[390px] rounded-[2rem] border border-[#E6C184]/28 px-7 py-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:px-9 md:py-9">
          {/* Tagline */}
          <p
            className="gate-fade-up mb-5 font-body text-[10px] uppercase tracking-[0.4em] text-[#F5E3BD]/72"
            style={{ letterSpacing: '0.35em' }}
          >
            {HeroSectionData.tagline}
          </p>

          {/* Divider atas */}
          <div className="mx-auto mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#E6C184]/55" />
            <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#F5E3BD]/60" fill="currentColor" aria-hidden="true">
              <polygon points="8,1 15,8 8,15 1,8" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#E6C184]/55" />
          </div>

          {/* Nama Pengantin - menggunakan font-accent (Dancing Script) */}
          <h1
            className="gate-shimmer-text gate-fade-up font-accent leading-snug"
            style={{ fontSize: 'clamp(3.05rem, 9vw, 5rem)', animationDelay: '120ms' }}
          >
            {HeroSectionData.groomShortName}
          </h1>

          <div className="my-2 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#E6C184]/60" />
            <span
              className="font-heading text-[#F5E3BD]/85"
              style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}
            >
              &
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#E6C184]/60" />
          </div>

          <h1
            className="gate-shimmer-text gate-fade-up font-accent leading-snug"
            style={{ fontSize: 'clamp(3.05rem, 9vw, 5rem)', animationDelay: '220ms' }}
          >
            {HeroSectionData.brideShortName}
          </h1>

          {/* Divider bawah */}
          <div className="mx-auto mt-5 mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#E6C184]/45" />
            <svg viewBox="0 0 16 16" className="h-3 w-3 text-[#F5E3BD]/55" fill="currentColor" aria-hidden="true">
              <circle cx="8" cy="8" r="5" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#E6C184]/45" />
          </div>

          {/* Tanggal */}
          <p className="gate-fade-up font-body text-sm tracking-[0.16em] text-[#F5E3BD]/80" style={{ animationDelay: '320ms' }}>
            {HeroSectionData.weddingDateDisplay}
          </p>

          {/* Nama tamu personal (jika ada) */}
          {guestName && (
            <div className="gate-fade-up mt-6 rounded-2xl border border-[#E6C184]/25 bg-[#2B1409]/45 px-4 py-3 shadow-inner shadow-black/20 backdrop-blur-sm" style={{ animationDelay: '420ms' }}>
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-[#F5E3BD]/58">
                Kepada Yth.
              </p>
              <p className="mt-1 font-heading text-lg italic text-[#FFF2D2]">{guestName}</p>
            </div>
          )}

          {/* Tombol Buka Undangan */}
          <div className="gate-fade-up mt-8" style={{ animationDelay: '520ms' }}>
            <button
              type="button"
              onClick={handleOpen}
              disabled={isOpening}
              className="gate-gold-button inline-flex items-center justify-center gap-2 rounded-full border border-[#F3D99A]/55 bg-[#F3D99A]/12 px-10 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.22em] text-[#FFF2D2] shadow-[0_14px_36px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFF2D2]/80 hover:bg-[#F3D99A]/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3D99A]/50 disabled:pointer-events-none disabled:opacity-60"
            >
              {isOpening ? (
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
          {!isOpening && (
            <p className="gate-fade-up mt-6 font-body text-[10px] uppercase tracking-[0.25em] text-[#F5E3BD]/38" style={{ animationDelay: '620ms' }}>
              Sentuh untuk membuka
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export default GateCover;
