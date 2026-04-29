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
import InvitationMusic from '@/components/invitation/InvitationMusic';
import { HeroSectionData } from '@/constant/WeddingData';
import { useGuestDisplayName } from '@/hooks/useWeddingSupabase';
import { prettifySlugFromSlug } from '@/lib/wedding-utils';
import { cn } from '@/lib/utils';
import { scrollEase } from '@/lib/scroll-motion';

export default function Index() {
  const [searchParams] = useSearchParams();
  const guestSlug = searchParams.get('guest');
  const { data: resolvedName } = useGuestDisplayName(guestSlug);
  const [invitationUnlocked, setInvitationUnlocked] = useState(false);
  const [heroReveal, setHeroReveal] = useState(false);

  const guestName =
    guestSlug == null || guestSlug === ''
      ? null
      : (resolvedName ?? prettifySlugFromSlug(guestSlug));

  useEffect(() => {
    const title = `Wedding of ${HeroSectionData.groomShortName} & ${HeroSectionData.brideShortName}`;
    const description = `You are cordially invited to the wedding celebration of ${HeroSectionData.groomShortName} & ${HeroSectionData.brideShortName}`;

    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, []);

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
    /* Reveal halus ke hero setelah gate tertutup */
    requestAnimationFrame(() => {
      setHeroReveal(true);
    });

    /* Pastikan selalu mulai dari HeroSection */
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  };

  return (
    <MotionConfig reducedMotion="user" transition={{ type: 'tween', ease: scrollEase, duration: 0.7 }}>
      {/* Gate cover — overlay penuh, tersembunyi setelah animasi selesai */}
      <GateCover guestName={guestName} onOpen={handleGateOpen} />

      {/* Musik: di luar invitation-shell + portal ke body — tidak ikut opacity:0 saat reveal */}
      {invitationUnlocked && <InvitationMusic />}

      {/* Konten undangan — tersembunyi di balik gate sampai dibuka */}
      <div
        className={cn(
          'invitation-shell scroll-smooth motion-reduce:scroll-auto',
          !heroReveal && 'invitation-shell-locked',
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
