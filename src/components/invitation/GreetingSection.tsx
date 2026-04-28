import { motion } from 'framer-motion';
import { scrollRevealTransition, scrollViewport } from '@/lib/scroll-motion';
import { DiamondDivider } from '@/components/invitation/SectionHeader';

export default function GreetingSection() {
  return (
    <section id="greeting" className="py-24 px-6 batik-pattern gunungan-bg">
      <div className="mx-auto max-w-2xl text-center">

        {/* Kaligrafi pembuka — font arab, ukuran lebih besar agar terbaca */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={scrollRevealTransition}
          className="font-heading text-3xl text-gold md:text-4xl"
          style={{ fontFamily: 'serif', lineHeight: 1.8 }}
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </motion.p>

        <DiamondDivider />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ ...scrollRevealTransition, delay: 0.12 }}
          className="mb-8 font-heading text-foreground"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
        >
          Assalamu&apos;alaikum Wr. Wb.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ ...scrollRevealTransition, delay: 0.22 }}
          className="font-body text-base leading-loose text-muted-foreground md:text-lg"
        >
          Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i
          untuk menghadiri acara pernikahan kami. Merupakan suatu kehormatan
          dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan
          hadir dan memberikan doa restu.
        </motion.p>

        {/* Divider penutup */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={scrollViewport}
          transition={{ ...scrollRevealTransition, delay: 0.35 }}
          className="mx-auto mt-12 h-px w-40 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
      </div>
    </section>
  );
}
