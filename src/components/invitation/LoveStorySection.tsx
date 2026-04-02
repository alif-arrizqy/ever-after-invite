import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const milestones = [
  { year: '2019', title: 'Pertama Bertemu', desc: 'Kami pertama kali bertemu di acara reuni kampus. Senyumnya yang hangat langsung menarik perhatian.' },
  { year: '2020', title: 'Mulai Dekat', desc: 'Pandemi membuat kami semakin sering berbicara lewat video call. Dari teman menjadi sahabat.' },
  { year: '2021', title: 'Resmi Berpacaran', desc: 'Di bawah langit senja, Andi memberanikan diri mengungkapkan perasaannya. Putri menjawab "Iya". ❤️' },
  { year: '2023', title: 'Lamaran', desc: 'Dengan doa dan restu kedua orang tua, Andi melamar Putri di hadapan keluarga besar.' },
  { year: '2025', title: 'Hari Bahagia', desc: 'InsyaAllah, kami akan mengikat janji suci di bulan September 2025. Bismillah!' },
];

export default function LoveStorySection() {
  return (
    <section className="py-20 px-6 bg-card">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl text-center text-foreground mb-14"
        >
          Love Story
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex items-start gap-4 mb-12 pl-14 md:pl-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-1 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-md z-10 flex items-center justify-center">
                <Heart className="w-2.5 h-2.5 text-primary-foreground" />
              </div>

              <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <span className="font-body text-xs tracking-widest uppercase text-gold font-semibold">{m.year}</span>
                <h3 className="font-heading text-xl text-foreground mt-1 mb-2">{m.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
