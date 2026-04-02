import { motion } from 'framer-motion';
import { Copy, Gift, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const bankAccounts = [
  { bank: 'Bank Central Asia (BCA)', number: '1234567890', name: 'Andi Pratama' },
  { bank: 'Bank Mandiri', number: '0987654321', name: 'Putri Ayu Lestari' },
];

export default function GiftSection() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied! 📋');
  };

  return (
    <section className="py-20 px-6 batik-pattern">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Gift className="w-10 h-10 text-gold mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-3">Wedding Gift</h2>
          <p className="text-muted-foreground font-body text-sm">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, kami menyediakannya di bawah ini.
          </p>
        </motion.div>

        <div className="space-y-4 mb-8">
          {bankAccounts.map((acc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="bg-background border-border/50">
                <CardContent className="p-5">
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">{acc.bank}</p>
                  <p className="font-heading text-xl text-foreground mb-1">{acc.number}</p>
                  <p className="font-body text-sm text-muted-foreground mb-3">a.n. {acc.name}</p>
                  <button
                    onClick={() => copyToClipboard(acc.number)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground font-body text-xs tracking-wider uppercase rounded-full hover:bg-primary/90 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    Copy No. Rekening
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-background border-border/50">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">Kirim Kado</p>
                  <p className="font-body text-sm text-foreground">
                    Jl. Merdeka No. 17, RT 03/RW 05, Kel. Menteng, Kec. Menteng, Jakarta Pusat 10310
                  </p>
                  <button
                    onClick={() => copyToClipboard('Jl. Merdeka No. 17, RT 03/RW 05, Kel. Menteng, Kec. Menteng, Jakarta Pusat 10310')}
                    className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground font-body text-xs tracking-wider uppercase rounded-full hover:bg-primary/90 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    Copy Alamat
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
