import { useState } from 'react';
import { motion } from 'framer-motion';
import { scrollEase, scrollRevealTransition, scrollViewport } from '@/lib/scroll-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { GallerySectionData } from '@/constant/WeddingData';

export default function GallerySection() {
  const [selected, setSelected] = useState<(typeof GallerySectionData.images)[0] | null>(null);

  return (
    <section className="py-20 px-6 batik-pattern">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={scrollRevealTransition}
          className="mb-12 text-center font-heading text-3xl text-foreground md:text-4xl"
        >
          {GallerySectionData.sectionTitle}
        </motion.h2>

        <div className="columns-2 gap-4 space-y-4 md:columns-3">
          {GallerySectionData.images.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={scrollViewport}
              transition={{
                type: 'tween',
                delay: i * 0.055,
                duration: 0.58,
                ease: scrollEase,
              }}
              whileHover={{ y: -4, transition: { type: 'tween', duration: 0.22, ease: scrollEase } }}
              className="group cursor-pointer break-inside-avoid"
              onClick={() => setSelected(item)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full rounded-xl border border-gold/15 shadow-md transition-shadow duration-300 group-hover:border-gold/35 group-hover:shadow-lg"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-3xl border-gold/20 bg-foreground/95 p-2">
          {selected && (
            <img src={selected.src} alt={selected.alt} className="w-full rounded-lg" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
