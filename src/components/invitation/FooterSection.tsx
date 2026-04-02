import { motion } from 'framer-motion';
import coupleFooter from '@/assets/couple-footer.jpg';

export default function FooterSection() {
  return (
    <section className="py-16 px-6 bg-card text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto"
      >
        <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-8 border-4 border-gold/30 shadow-lg">
          <img src={coupleFooter} alt="Andi & Putri" className="w-full h-full object-cover" loading="lazy" />
        </div>

        <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
          Andi & Putri
        </h2>

        <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
          Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
        </p>

        <p className="text-muted-foreground font-body text-sm italic mb-8">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
          <br />
          <span className="text-xs not-italic text-gold">(QS. Ar-Rum: 21)</span>
        </p>

        <div className="h-px bg-border w-24 mx-auto mb-6" />

        <p className="font-body text-xs text-muted-foreground">
          Made with ❤️ by <span className="text-primary font-medium">Lovable</span>
        </p>
      </motion.div>
    </section>
  );
}
