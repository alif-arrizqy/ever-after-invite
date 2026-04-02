import { useSearchParams } from 'react-router-dom';
import HeroSection from '@/components/invitation/HeroSection';
import GreetingSection from '@/components/invitation/GreetingSection';
import CouplesSection from '@/components/invitation/CouplesSection';
import EventSection from '@/components/invitation/EventSection';
import LoveStorySection from '@/components/invitation/LoveStorySection';
import GallerySection from '@/components/invitation/GallerySection';
import GuestbookSection from '@/components/invitation/GuestbookSection';
import GiftSection from '@/components/invitation/GiftSection';
import FooterSection from '@/components/invitation/FooterSection';

export default function Index() {
  const [searchParams] = useSearchParams();
  const guestSlug = searchParams.get('guest');
  const guestName = guestSlug
    ? guestSlug
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : null;

  return (
    <div className="scroll-smooth">
      <HeroSection guestName={guestName} />
      <GreetingSection />
      <CouplesSection />
      <EventSection />
      <LoveStorySection />
      <GallerySection />
      <GuestbookSection />
      <GiftSection />
      <FooterSection />
    </div>
  );
}
