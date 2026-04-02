import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { scrollRevealTransition, scrollRevealTransitionMedium, scrollViewport } from '@/lib/scroll-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  EventSectionData,
  coupleDisplayTitle,
  coupleFormalNames,
  type EventBlock,
} from '@/constant/WeddingData';
import { inviteBtnPrimary, inviteBtnSecondary } from '@/components/invitation/invite-styles';

function EventCard({ event, delay }: { event: EventBlock; delay: number }) {
  const addToCalendar = () => {
    const title = `Pernikahan ${coupleDisplayTitle} — ${event.title}`;
    const details = `Undangan pernikahan ${coupleFormalNames}`;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${event.calendarStart}/${event.calendarEnd}&location=${encodeURIComponent(event.address)}&details=${encodeURIComponent(details)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={scrollViewport}
      transition={{ ...scrollRevealTransitionMedium, delay }}
    >
      <Card className="overflow-hidden border border-gold/20 bg-background/95 shadow-md shadow-primary/5">
        <div className="h-1.5 bg-gradient-to-r from-primary via-gold to-secondary" />
        <CardContent className="p-6 md:p-8 text-center">
          <h3 className="font-heading text-2xl text-foreground mb-4">{event.title}</h3>

          <div className="space-y-3 text-muted-foreground font-body text-sm mb-6">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="h-4 w-4 shrink-0 text-gold" />
              <span>{event.dateLabel}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-gold" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-gold" />
              <div>
                <p className="font-medium text-foreground">{event.venue}</p>
                <p className="text-xs">{event.address}</p>
              </div>
            </div>
          </div>

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
}

export default function EventSection() {
  return (
    <section className="py-20 px-6 batik-pattern">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={scrollRevealTransition}
          className="font-heading text-3xl md:text-4xl text-center text-foreground mb-12"
        >
          {EventSectionData.sectionTitle}
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2">
          <EventCard event={EventSectionData.akad} delay={0} />
          <EventCard event={EventSectionData.resepsi} delay={0.15} />
        </div>
      </div>
    </section>
  );
}
