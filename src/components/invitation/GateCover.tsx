import { useEffect, useState, useCallback, memo } from 'react';
import coverImage from '@/assets/cover.jpg';
import { HeroSectionData } from '@/constant/WeddingData';

interface GateCoverProps {
  guestName: string | null;
  onOpen: () => void;
}

const GATE_OPEN_DURATION_MS = 1350;

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
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,8,4,0.48)_0%,rgba(18,8,4,0.12)_30%,rgba(18,8,4,0.08)_50%,rgba(18,8,4,0.16)_70%,rgba(18,8,4,0.50)_100%),linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.06)_42%,rgba(0,0,0,0.58)_100%)]" aria-hidden="true" />

      {/* ===== PANEL KIRI ===== */}
      <div
        className={`gate-panel gate-panel-motion gate-panel-left absolute inset-y-0 left-0 w-1/2 overflow-hidden ${
          isOpening ? '-translate-x-[104%]' : 'translate-x-0'
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(28,13,6,0.48)_0%,rgba(53,27,12,0.56)_45%,rgba(28,13,6,0.64)_100%)]" />
      </div>

      {/* ===== PANEL KANAN ===== */}
      <div
        className={`gate-panel gate-panel-motion gate-panel-right absolute inset-y-0 right-0 w-1/2 overflow-hidden ${
          isOpening ? 'translate-x-[104%]' : 'translate-x-0'
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(200deg,rgba(28,13,6,0.48)_0%,rgba(53,27,12,0.56)_45%,rgba(28,13,6,0.64)_100%)]" />
      </div>

      {/* ===== KONTEN TENGAH — di atas kedua panel ===== */}
      <div
        className={`absolute inset-0 z-10 flex items-center justify-center px-6 transition-all duration-500 ease-out ${
          isOpening ? '-translate-y-8 scale-95 opacity-0 blur-sm' : 'translate-y-0 scale-100 opacity-100 blur-0'
        }`}
      >
        <div className="gate-content-card relative w-full max-w-[390px] rounded-[2rem] border border-[#E6C184]/28 px-7 py-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:px-9 md:py-9">
          {/* Tagline */}
          <p
            className="gate-fade-up mb-5 font-body text-[10px] uppercase tracking-[0.4em] text-[#FFF7E5]"
            style={{ letterSpacing: '0.35em' }}
          >
            {HeroSectionData.tagline}
          </p>

          {/* Nama Pengantin - menggunakan font-accent (Dancing Script) */}
          <h1
            className="gate-shimmer-text gate-fade-up font-accent leading-snug"
            style={{ fontSize: 'clamp(3.05rem, 9vw, 5rem)', animationDelay: '120ms' }}
          >
            {HeroSectionData.groomShortName}
          </h1>

          <div className="my-2 flex items-center justify-center">
            <span
              className="font-heading text-[#F5E3BD]/85"
              style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}
            >
              &
            </span>
          </div>

          <h1
            className="gate-shimmer-text gate-fade-up font-accent leading-snug"
            style={{ fontSize: 'clamp(3.05rem, 9vw, 5rem)', animationDelay: '220ms' }}
          >
            {HeroSectionData.brideShortName}
          </h1>

          {/* Tanggal */}
          <p className="gate-fade-up font-body text-sm tracking-[0.16em] text-[#FFF7E5]" style={{ animationDelay: '320ms' }}>
            {HeroSectionData.weddingDateDisplay}
          </p>

          {/* Nama tamu personal (jika ada) */}
          {guestName && (
            <div className="gate-fade-up mt-6 rounded-2xl border border-[#E6C184]/25 bg-[#2B1409]/45 px-4 py-3 shadow-inner shadow-black/20 backdrop-blur-sm" style={{ animationDelay: '420ms' }}>
              <p className="font-body text-[10px] uppercase tracking-[0.25em] text-[#FFF7E5]">
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
            <p className="gate-fade-up mt-6 font-body text-[10px] uppercase tracking-[0.25em] text-[#FFF7E5]" style={{ animationDelay: '620ms' }}>
              Sentuh untuk membuka
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export default GateCover;
