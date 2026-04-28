import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import GateCover from '@/components/invitation/GateCover';
import HeroSection from '@/components/invitation/HeroSection';
import GreetingSection from '@/components/invitation/GreetingSection';
import CouplesSection from '@/components/invitation/CouplesSection';
import EventSection from '@/components/invitation/EventSection';
import LoveStorySection from '@/components/invitation/LoveStorySection';
import GallerySection from '@/components/invitation/GallerySection';
import GuestbookSection from '@/components/invitation/GuestbookSection';
// GiftSection diimport tapi tidak dirender — file tetap ada sesuai permintaan
// import GiftSection from '@/components/invitation/GiftSection';
import FooterSection from '@/components/invitation/FooterSection';
import { useGuestDisplayName } from '@/hooks/useWeddingSupabase';
import { prettifySlugFromSlug } from '@/lib/wedding-utils';
import { cn } from '@/lib/utils';
import { scrollEase } from '@/lib/scroll-motion';

export default function Index() {
  const [searchParams] = useSearchParams();
  const guestSlug = searchParams.get('guest');
  const { data: resolvedName } = useGuestDisplayName(guestSlug);
  const [invitationUnlocked, setInvitationUnlocked] = useState(false);

  const guestName =
    guestSlug == null || guestSlug === ''
      ? null
      : (resolvedName ?? prettifySlugFromSlug(guestSlug));

  /* Kunci scroll selama gate belum dibuka */
  useEffect(() => {
    const html = document.documentElement;
    if (!invitationUnlocked) {
      html.style.overflow = 'hidden';
      html.style.overscrollBehavior = 'none';
      document.body.style.overflow = 'hidden';
    } else {
      html.style.overflow = '';
      html.style.overscrollBehavior = '';
      document.body.style.overflow = '';
    }
    return () => {
      html.style.overflow = '';
      html.style.overscrollBehavior = '';
      document.body.style.overflow = '';
    };
  }, [invitationUnlocked]);

  const handleGateOpen = () => {
    setInvitationUnlocked(true);
    /* Scroll halus ke HeroSection setelah gate terbuka */
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  };

  return (
    <MotionConfig reducedMotion="user" transition={{ type: 'tween', ease: scrollEase, duration: 0.7 }}>
      {/* Gate cover — overlay penuh, tersembunyi setelah animasi selesai */}
      <GateCover guestName={guestName} onOpen={handleGateOpen} />

      {/* Konten undangan — tersembunyi di balik gate sampai dibuka */}
      <div
        className={cn(
          'scroll-smooth motion-reduce:scroll-auto',
          !invitationUnlocked && 'pointer-events-none select-none'
        )}
      >
        <HeroSection guestName={guestName} />
        <GreetingSection />
        <CouplesSection />
        <EventSection />
        <LoveStorySection />
        <GallerySection />
        <GuestbookSection defaultGuestName={guestName} />
        {/* GiftSection — file tetap ada, section dinonaktifkan sesuai permintaan */}
        {/* <GiftSection /> */}
        <FooterSection />
      </div>
    </MotionConfig>
  );
}
