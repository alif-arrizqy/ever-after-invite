import { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Pause, Play } from 'lucide-react';
import { MusicSectionData } from '@/constant/WeddingData';
import { inviteMusicControl } from '@/components/invitation/invite-styles';

export default function InvitationMusic() {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const tryPlay = useCallback(async () => {
    const a = ref.current;
    if (!a) return;
    try {
      await a.play();
    } catch {
      /* autoplay dengan suara sering diblokir browser hingga ada gestur pengguna */
    }
  }, []);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    a.addEventListener('pause', onPause);
    a.addEventListener('play', onPlay);
    return () => {
      a.removeEventListener('pause', onPause);
      a.removeEventListener('play', onPlay);
    };
  }, []);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;

    const onCanPlay = () => void tryPlay();
    a.addEventListener('canplay', onCanPlay, { once: true });
    void tryPlay();

    const onFirstPointer = () => void tryPlay();
    document.addEventListener('pointerdown', onFirstPointer, { capture: true, once: true });

    return () => {
      a.removeEventListener('canplay', onCanPlay);
      document.removeEventListener('pointerdown', onFirstPointer, { capture: true });
    };
  }, [tryPlay]);

  const toggle = async () => {
    const a = ref.current;
    if (!a) return;
    if (!a.paused) {
      a.pause();
      return;
    }
    try {
      await a.play();
    } catch {
      setPlaying(false);
    }
  };

  /**
   * Portal ke document.body: kontrol musik tidak boleh di dalam .invitation-shell
   * saat masih ada kelas invitation-shell-locked (opacity:0 + blur), karena
   * seluruh subtree ikut tidak terlihat termasuk elemen position:fixed.
   */
  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <>
      <audio ref={ref} src={MusicSectionData.src} preload="auto" loop className="hidden" />
      <button
        type="button"
        onClick={toggle}
        className={inviteMusicControl}
        aria-label={playing ? 'Jeda musik' : 'Putar musik'}
      >
        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 pl-0.5" />}
      </button>
    </>,
    document.body
  );
}
