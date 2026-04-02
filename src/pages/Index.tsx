import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import HeroSection from '@/components/invitation/HeroSection';
import GreetingSection from '@/components/invitation/GreetingSection';
import CouplesSection from '@/components/invitation/CouplesSection';
import EventSection from '@/components/invitation/EventSection';
import LoveStorySection from '@/components/invitation/LoveStorySection';
import GallerySection from '@/components/invitation/GallerySection';
import GuestbookSection from '@/components/invitation/GuestbookSection';
import GiftSection from '@/components/invitation/GiftSection';
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

  return (
    <MotionConfig reducedMotion="user" transition={{ type: 'tween', ease: scrollEase, duration: 0.7 }}>
      <div
        className={cn(
          'scroll-smooth motion-reduce:scroll-auto',
          !invitationUnlocked && 'h-[100dvh] max-h-[100dvh] overflow-hidden'
        )}
      >
        <HeroSection guestName={guestName} onOpenInvitation={() => setInvitationUnlocked(true)} />
        <GreetingSection />
        <CouplesSection />
        <EventSection />
        <LoveStorySection />
        <GallerySection />
        <GuestbookSection defaultGuestName={guestName} />
        <GiftSection />
        <FooterSection />
      </div>
    </MotionConfig>
  );
}
