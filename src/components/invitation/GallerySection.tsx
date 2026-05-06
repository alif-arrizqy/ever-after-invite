import { useState, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { scrollEase, scrollRevealTransition, scrollViewport } from '@/lib/scroll-motion';
import { GallerySectionData } from '@/constant/WeddingData';
import SectionHeader from '@/components/invitation/SectionHeader';

type GalleryImage = (typeof GallerySectionData.images)[0];

/** Lightbox sederhana tanpa Dialog radix — lebih ringan untuk galeri */
const Lightbox = memo(function Lightbox({
  image,
  onClose,
}: {
  image: GalleryImage;
  onClose: () => void;
}) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Foto diperbesar"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Tutup"
      >
        <X className="h-5 w-5" />
      </button>

      <motion.img
        src={image.src}
        alt={image.alt}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="max-h-[88vh] max-w-[90vw] rounded-xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      />
    </motion.div>,
    document.body
  );
});

export default function GallerySection() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Galeri"
          heading={GallerySectionData.sectionTitle}
          description="Setiap momen adalah kenangan berharga yang akan selalu kami ingat."
        />

        {/* Grid rapi untuk desktop + tetap nyaman di mobile */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          {GallerySectionData.images.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={scrollViewport}
              transition={{
                type:     'tween',
                delay:    i * 0.06,
                duration: 0.58,
                ease:     scrollEase,
              }}
              className="group relative overflow-hidden rounded-xl"
            >
              <button
                type="button"
                className="relative block w-full overflow-hidden rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                onClick={() => setSelected(item)}
                aria-label={`Lihat foto ${i + 1} lebih besar`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full aspect-[4/5] rounded-xl border border-gold/15 object-cover shadow-md transition-all duration-500 ease-in-out group-hover:scale-[1.03] group-hover:border-gold/35 group-hover:shadow-lg"
                  loading="lazy"
                />
                {/* Overlay saat hover */}
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-primary/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {/* Label klik */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-white/20 px-3 py-1 font-body text-xs uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                    Lihat
                  </span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <Lightbox image={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
