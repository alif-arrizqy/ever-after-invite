import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useGuestbook, useGuestbookMutation } from '@/hooks/useWeddingSupabase';
import { scrollEase, scrollRevealTransition, scrollRevealTransitionSnappy, scrollViewport } from '@/lib/scroll-motion';
import { GuestbookSectionData } from '@/constant/WeddingData';
import {
  inviteBtnSubmit,
  inviteRsvpActiveNo,
  inviteRsvpActiveYes,
  inviteRsvpIdle,
} from '@/components/invitation/invite-styles';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const formList = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.095, delayChildren: 0.04 },
  },
};

const formField = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'tween' as const, duration: 0.58, ease: scrollEase },
  },
};

interface GuestbookSectionProps {
  /** Nama dari ?guest=… (undangan personal); otomatis di field, boleh dihapus/diubah tamu. */
  defaultGuestName?: string | null;
}

export default function GuestbookSection({ defaultGuestName = null }: GuestbookSectionProps) {
  const { data: messages = [] } = useGuestbook();
  const guestbookMutation = useGuestbookMutation();
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<boolean>(true);
  const [message, setMessage] = useState('');
  const nameTouchedByUser = useRef(false);

  useEffect(() => {
    if (nameTouchedByUser.current) return;
    if (defaultGuestName) setName(defaultGuestName);
    else setName('');
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
    <section className="py-20 px-6 bg-card">
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={scrollRevealTransition}
          className="mb-4 text-center font-heading text-3xl text-foreground md:text-4xl"
        >
          {GuestbookSectionData.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ ...scrollRevealTransition, delay: 0.06 }}
          className="mb-10 text-center font-body text-sm text-muted-foreground"
        >
          {GuestbookSectionData.subtitle}
        </motion.p>

        <motion.form
          variants={formList}
          initial="hidden"
          whileInView="show"
          viewport={scrollViewport}
          onSubmit={handleSubmit}
          className="mb-10 space-y-4"
        >
          <motion.div variants={formField} whileHover={{ y: -1 }} transition={{ type: 'tween', duration: 0.2, ease: scrollEase }}>
            <Input
              placeholder="Nama Anda"
              value={name}
              onChange={e => {
                nameTouchedByUser.current = true;
                setName(e.target.value);
              }}
              autoComplete="name"
              className="rounded-xl border-gold/20 bg-background font-body transition-shadow focus-visible:border-gold/40 focus-visible:ring-gold/30"
            />
            {defaultGuestName ? (
              <p className="mt-1.5 font-body text-xs text-muted-foreground">
                Nama diisi dari undangan Anda; silakan ubah jika ingin menampilkan nama lain.
              </p>
            ) : null}
          </motion.div>

          <motion.div variants={formField} className="flex gap-3">
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

          <motion.div variants={formField} whileHover={{ y: -1 }} transition={{ type: 'tween', duration: 0.2, ease: scrollEase }}>
            <Textarea
              placeholder="Tulis ucapan & doa..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={3}
              className="rounded-xl border-gold/20 bg-background font-body transition-shadow focus-visible:border-gold/40 focus-visible:ring-gold/30"
            />
          </motion.div>

          <motion.div variants={formField}>
            <motion.button
              type="submit"
              disabled={guestbookMutation.isPending}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={inviteBtnSubmit}
            >
              <Send className="h-4 w-4" />
              {guestbookMutation.isPending ? 'Mengirim…' : 'Kirim ucapan'}
            </motion.button>
          </motion.div>
        </motion.form>

        <div className="max-h-96 space-y-4 overflow-y-auto pr-2">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewport}
              transition={{ ...scrollRevealTransitionSnappy, delay: Math.min(i * 0.035, 0.2) }}
              className="rounded-xl border border-gold/15 bg-background p-4 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-body text-sm font-semibold text-foreground">{msg.name}</span>
                <span className="inline-flex items-center gap-1 font-body text-xs">
                  {msg.attending ? (
                    <>
                      <CheckCircle className="h-3 w-3 text-secondary" /> Hadir
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 text-primary" /> Tidak hadir
                    </>
                  )}
                </span>
              </div>
              <p className="font-body text-sm text-muted-foreground">{msg.message}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
