import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import groomImg from '@/assets/groom.jpg';
import brideImg from '@/assets/bride.jpg';

const personVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function PersonCard({ name, parentInfo, image, instagram, delay }: {
  name: string; parentInfo: string; image: string; instagram: string; delay: number;
}) {
  return (
    <motion.div
      variants={personVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-gold/30 shadow-lg mb-6">
        <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-2">{name}</h3>
      <p className="text-muted-foreground font-body text-sm mb-3">{parentInfo}</p>
      <a
        href={`https://instagram.com/${instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-body text-sm transition-colors"
      >
        <Instagram className="w-4 h-4" />
        @{instagram}
      </a>
    </motion.div>
  );
}

export default function CouplesSection() {
  return (
    <section className="py-20 px-6 bg-card">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <PersonCard
            name="Andi Pratama"
            parentInfo="Putra dari Bpk. Susilo Pratama & Ibu Rina Wulandari"
            image={groomImg}
            instagram="andipratama"
            delay={0}
          />

          <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          </div>

          <PersonCard
            name="Putri Ayu Lestari"
            parentInfo="Putri dari Bpk. Hadi Lestari & Ibu Sari Dewi"
            image={brideImg}
            instagram="putriayu"
            delay={0.2}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <span className="font-heading text-5xl text-gold">&</span>
        </motion.div>
      </div>
    </section>
  );
}
