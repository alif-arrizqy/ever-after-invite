import { memo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { scrollRevealTransitionMedium, scrollViewport } from '@/lib/scroll-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  EventSectionData,
  coupleDisplayTitle,
  coupleFormalNames,
  type EventBlock,
} from '@/constant/WeddingData';
import { inviteBtnPrimary, inviteBtnSecondary } from '@/components/invitation/invite-styles';
import SectionHeader from '@/components/invitation/SectionHeader';

/** Baris info (ikon + teks) dalam card acara */
function EventInfoRow({
  icon: Icon,
  children,
  strong,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-center gap-3 text-center">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
      <span className={strong ? 'font-medium text-foreground' : ''}>
        {children}
      </span>
    </div>
  );
}

const EventCard = memo(function EventCard({ event, delay }: { event: EventBlock; delay: number }) {
  const addToCalendar = () => {
    const title   = `Pernikahan ${coupleDisplayTitle} — ${event.title}`;
    const details = `Undangan pernikahan ${coupleFormalNames}`;
    const url     = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${event.calendarStart}/${event.calendarEnd}&location=${encodeURIComponent(event.address)}&details=${encodeURIComponent(details)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={scrollViewport}
      transition={{ ...scrollRevealTransitionMedium, delay }}
    >
      <Card className="overflow-hidden border border-gold/20 bg-background/95 shadow-md shadow-primary/5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl hover:shadow-primary/15">
        {/* Accent bar di atas card */}
        <div className="h-1.5 bg-gradient-to-r from-primary via-gold to-secondary" />

        <CardContent className="px-6 py-8 text-center md:px-10">
          {/* Judul acara */}
          <h3
            className="mb-6 font-heading text-foreground"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}
          >
            {event.title}
          </h3>

          {/* Detail acara */}
          <div className="mb-7 space-y-4 font-body text-base text-muted-foreground">
            <EventInfoRow icon={Calendar}>{event.dateLabel}</EventInfoRow>
            <EventInfoRow icon={Clock}>{event.time}</EventInfoRow>
            <EventInfoRow icon={MapPin}>
              <div>
                <p className="font-medium text-foreground">{event.venue}</p>
                <p className="mt-0.5 text-sm leading-relaxed">{event.address}</p>
              </div>
            </EventInfoRow>
          </div>

          {/* Tombol aksi */}
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={inviteBtnSecondary}
            >
              <MapPin className="h-3.5 w-3.5" />
              Google Maps
            </a>
            <button type="button" onClick={addToCalendar} className={inviteBtnPrimary}>
              <Calendar className="h-3.5 w-3.5" />
              Tambah ke Kalender
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

export default function EventSection() {
  return (
    <section className="py-24 px-6 batik-pattern">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="Waktu & Tempat"
          heading="Detail Acara"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <EventCard event={EventSectionData.akad}    delay={0} />
          <EventCard event={EventSectionData.resepsi} delay={0.15} />
        </div>
      </div>
    </section>
  );
}
