import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
  delay: number;
}

function EventCard({ title, date, time, venue, address, mapsUrl, delay }: EventCardProps) {
  const addToCalendar = () => {
    const start = title === 'Akad Nikah' ? '20250915T080000' : '20250915T110000';
    const end = title === 'Akad Nikah' ? '20250915T100000' : '20250915T140000';
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Pernikahan Andi & Putri - ' + title)}&dates=${start}/${end}&location=${encodeURIComponent(address)}&details=${encodeURIComponent('Undangan Pernikahan Andi & Putri')}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <Card className="bg-background border-border/50 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-primary via-gold to-secondary" />
        <CardContent className="p-6 md:p-8 text-center">
          <h3 className="font-heading text-2xl text-foreground mb-4">{title}</h3>

          <div className="space-y-3 text-muted-foreground font-body text-sm mb-6">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{date}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>{time}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <div>
                <p className="font-medium text-foreground">{venue}</p>
                <p className="text-xs">{address}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground font-body text-xs tracking-wider uppercase rounded-full hover:bg-secondary/80 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              Google Maps
            </a>
            <button
              onClick={addToCalendar}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-body text-xs tracking-wider uppercase rounded-full hover:bg-primary/90 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              Add to Calendar
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl text-center text-foreground mb-12"
        >
          Waktu & Tempat
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <EventCard
            title="Akad Nikah"
            date="Minggu, 15 September 2025"
            time="08.00 - 10.00 WIB"
            venue="Masjid Agung Al-Azhar"
            address="Jl. Sisingamangaraja, Jakarta Selatan"
            mapsUrl="https://maps.google.com/?q=Masjid+Agung+Al-Azhar+Jakarta"
            delay={0}
          />
          <EventCard
            title="Resepsi"
            date="Minggu, 15 September 2025"
            time="11.00 - 14.00 WIB"
            venue="Balai Kartini"
            address="Jl. Gatot Subroto Kav. 37, Jakarta Selatan"
            mapsUrl="https://maps.google.com/?q=Balai+Kartini+Jakarta"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}
