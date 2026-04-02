import { motion } from 'framer-motion';

export default function GreetingSection() {
  return (
    <section id="greeting" className="py-20 px-6 batik-pattern gunungan-bg">
      <div className="max-w-2xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-gold font-body text-sm tracking-[0.25em] uppercase mb-6"
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading text-3xl md:text-4xl text-foreground mb-8"
        >
          Assalamu'alaikum Wr. Wb.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground font-body leading-relaxed text-base"
        >
          Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i
          untuk menghadiri acara pernikahan kami. Merupakan suatu kehormatan
          dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan
          hadir dan memberikan doa restu.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="h-px bg-border w-32 mx-auto mt-10"
        />
      </div>
    </section>
  );
}
