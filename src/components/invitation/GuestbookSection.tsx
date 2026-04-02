import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useWeddingStore } from '@/store/weddingStore';
import { toast } from 'sonner';

export default function GuestbookSection() {
  const { messages, addMessage } = useWeddingStore();
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<boolean>(true);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error('Mohon isi nama dan pesan.');
      return;
    }
    addMessage(name.trim(), attending, message.trim());
    toast.success('Terima kasih atas ucapannya! 🤲');
    setName('');
    setMessage('');
  };

  return (
    <section className="py-20 px-6 bg-card">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl text-center text-foreground mb-4"
        >
          Ucapan & Doa
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground font-body text-sm mb-10"
        >
          Kirimkan doa dan ucapan untuk kedua mempelai
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-4 mb-10"
        >
          <Input
            placeholder="Nama Anda"
            value={name}
            onChange={e => setName(e.target.value)}
            className="bg-background border-border font-body"
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setAttending(true)}
              className={`flex-1 py-2.5 rounded-lg font-body text-sm transition-colors border ${
                attending
                  ? 'bg-secondary text-secondary-foreground border-secondary'
                  : 'bg-transparent text-muted-foreground border-border hover:border-secondary'
              }`}
            >
              ✅ Hadir
            </button>
            <button
              type="button"
              onClick={() => setAttending(false)}
              className={`flex-1 py-2.5 rounded-lg font-body text-sm transition-colors border ${
                !attending
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-muted-foreground border-border hover:border-primary'
              }`}
            >
              ❌ Tidak Hadir
            </button>
          </div>

          <Textarea
            placeholder="Tulis ucapan & doa..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={3}
            className="bg-background border-border font-body"
          />

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase rounded-full hover:bg-primary/90 transition-colors"
          >
            <Send className="w-4 h-4" />
            Kirim Ucapan
          </button>
        </motion.form>

        {/* Messages */}
        <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-background rounded-xl p-4 shadow-sm border border-border/50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-body text-sm font-semibold text-foreground">{msg.name}</span>
                <span className="inline-flex items-center gap-1 text-xs font-body">
                  {msg.attending ? (
                    <><CheckCircle className="w-3 h-3 text-secondary" /> Hadir</>
                  ) : (
                    <><XCircle className="w-3 h-3 text-primary" /> Tidak Hadir</>
                  )}
                </span>
              </div>
              <p className="text-muted-foreground font-body text-sm">{msg.message}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
