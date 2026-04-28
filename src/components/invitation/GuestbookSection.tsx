import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useGuestbook, useGuestbookMutation } from '@/hooks/useWeddingSupabase';
import { scrollEase, scrollRevealTransitionSnappy, scrollViewport } from '@/lib/scroll-motion';
import { GuestbookSectionData } from '@/constant/WeddingData';
import {
  inviteBtnSubmit,
  inviteRsvpActiveNo,
  inviteRsvpActiveYes,
  inviteRsvpIdle,
} from '@/components/invitation/invite-styles';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import SectionHeader from '@/components/invitation/SectionHeader';

/* Framer Motion variants untuk stagger form fields */
const formListVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const formFieldVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'tween' as const, duration: 0.55, ease: scrollEase },
  },
};

interface GuestbookSectionProps {
  /** Nama dari ?guest=… (undangan personal) */
  defaultGuestName?: string | null;
}

export default function GuestbookSection({ defaultGuestName = null }: GuestbookSectionProps) {
  const { data: messages = [] }  = useGuestbook();
  const guestbookMutation        = useGuestbookMutation();
  const [name, setName]          = useState('');
  const [attending, setAttending] = useState<boolean>(true);
  const [message, setMessage]    = useState('');
  const nameTouchedByUser        = useRef(false);

  /* Isi otomatis nama tamu dari URL param */
  useEffect(() => {
    if (nameTouchedByUser.current) return;
    setName(defaultGuestName ?? '');
  }, [defaultGuestName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error('Mohon isi nama dan pesan.');
      return;
    }
    guestbookMutation.mutate(
      { name: name.trim(), attending, message: message.trim() },
      {
        onSuccess: () => {
          toast.success('Terima kasih atas ucapannya.');
          nameTouchedByUser.current = false;
          setName(defaultGuestName ?? '');
          setMessage('');
        },
        onError: () => toast.error('Ucapan tidak terkirim. Silakan coba lagi.'),
      }
    );
  };

  return (
    <section className="py-24 px-6 bg-card">
      <div className="mx-auto max-w-2xl">
        <SectionHeader
          eyebrow="Doa & Ucapan"
          heading={GuestbookSectionData.title}
          description={GuestbookSectionData.subtitle}
        />

        {/* Form ucapan */}
        <motion.form
          variants={formListVariants}
          initial="hidden"
          whileInView="show"
          viewport={scrollViewport}
          onSubmit={handleSubmit}
          className="mb-10 space-y-4"
        >
          {/* Input nama */}
          <motion.div
            variants={formFieldVariants}
            whileHover={{ y: -1 }}
            transition={{ type: 'tween', duration: 0.2, ease: scrollEase }}
          >
            <Input
              placeholder="Nama Anda"
              value={name}
              onChange={e => {
                nameTouchedByUser.current = true;
                setName(e.target.value);
              }}
              autoComplete="name"
              className="h-12 rounded-xl border-gold/20 bg-background font-body text-base transition-shadow focus-visible:border-primary/50 focus-visible:ring-primary/25"
            />
            {defaultGuestName && (
              <p className="mt-1.5 font-body text-sm text-muted-foreground">
                Nama diisi dari undangan Anda; silakan ubah jika diperlukan.
              </p>
            )}
          </motion.div>

          {/* RSVP kehadiran */}
          <motion.div variants={formFieldVariants} className="flex gap-3">
            <motion.button
              type="button"
              onClick={() => setAttending(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn('flex-1', attending ? inviteRsvpActiveYes : inviteRsvpIdle)}
            >
              Hadir
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setAttending(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn('flex-1', !attending ? inviteRsvpActiveNo : inviteRsvpIdle)}
            >
              Tidak hadir
            </motion.button>
          </motion.div>

          {/* Textarea pesan */}
          <motion.div
            variants={formFieldVariants}
            whileHover={{ y: -1 }}
            transition={{ type: 'tween', duration: 0.2, ease: scrollEase }}
          >
            <Textarea
              placeholder="Tulis ucapan & doa untuk kedua mempelai..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={4}
              className="rounded-xl border-gold/20 bg-background font-body text-base transition-shadow focus-visible:border-primary/50 focus-visible:ring-primary/25"
            />
          </motion.div>

          {/* Tombol kirim */}
          <motion.div variants={formFieldVariants}>
            <motion.button
              type="submit"
              disabled={guestbookMutation.isPending}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={inviteBtnSubmit}
            >
              <Send className="h-4 w-4" />
              {guestbookMutation.isPending ? 'Mengirim…' : 'Kirim Ucapan'}
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Daftar pesan */}
        {messages.length > 0 && (
          <div className="max-h-[28rem] space-y-4 overflow-y-auto pr-2">
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={scrollViewport}
                transition={{ ...scrollRevealTransitionSnappy, delay: Math.min(i * 0.03, 0.18) }}
                className="rounded-xl border border-gold/15 bg-background p-5 shadow-sm"
              >
                {/* Header pesan */}
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="font-body text-base font-semibold text-foreground">
                    {msg.name}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 font-body text-sm text-muted-foreground">
                    {msg.attending ? (
                      <>
                        <CheckCircle className="h-3.5 w-3.5 text-secondary-foreground" />
                        Hadir
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3.5 w-3.5 text-primary/70" />
                        Tidak hadir
                      </>
                    )}
                  </span>
                </div>
                {/* Isi pesan */}
                <p className="font-body text-base leading-relaxed text-muted-foreground">
                  {msg.message}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
