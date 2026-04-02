import { motion } from 'framer-motion';
import { Copy, Gift, MapPin } from 'lucide-react';
import { scrollRevealTransition, scrollViewport } from '@/lib/scroll-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GiftSectionData } from '@/constant/WeddingData';
import { inviteBtnPrimary } from '@/components/invitation/invite-styles';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const copyBtnCompact = cn(
  inviteBtnPrimary,
  'shrink-0 px-3 py-1.5 text-[10px] tracking-[0.1em]'
);

export default function GiftSection() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Disalin ke papan klip.');
  };

  const { sectionTitle, intro, banks, shipping } = GiftSectionData;

  return (
    <section className="batik-pattern px-6 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={scrollRevealTransition}
          className="mb-6 flex flex-col items-center gap-2 text-center md:mb-8 md:flex-row md:justify-center md:gap-4 md:text-left"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-background/80 shadow-sm">
            <Gift className="h-5 w-5 text-gold" />
          </div>
          <div className="min-w-0 md:text-left">
            <h2 className="font-heading text-2xl text-foreground md:text-3xl">{sectionTitle}</h2>
            <p className="mt-1 max-w-xl font-body text-xs leading-relaxed text-muted-foreground md:text-sm">
              {intro}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={scrollRevealTransition}
        >
          <Card className="border border-gold/20 bg-background/95 shadow-sm">
            <CardContent className="space-y-1 p-4 md:p-5">
              <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Transfer bank
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {banks.map(acc => (
                  <div
                    key={acc.accountNumber}
                    className="flex flex-col rounded-xl border border-gold/15 bg-cream/40 px-3 py-3 md:px-3.5"
                  >
                    <p className="font-body text-[10px] uppercase tracking-wider text-muted-foreground line-clamp-2">
                      {acc.bankName}
                    </p>
                    <p className="mt-1 font-heading text-lg tabular-nums text-foreground md:text-xl">{acc.accountNumber}</p>
                    <p className="mt-0.5 font-body text-[11px] text-muted-foreground">a.n. {acc.accountHolder}</p>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(acc.accountNumber)}
                      className={cn(copyBtnCompact, 'mt-3 w-full sm:w-auto sm:self-start')}
                    >
                      <Copy className="h-3 w-3" />
                      Salin
                    </button>
                  </div>
                ))}
              </div>

              {/* Radix Accordion: type="single" + collapsible — alamat tertutup default, hemat scroll */}
              <Accordion type="single" collapsible className="mt-4 w-full border-t border-gold/15 pt-1">
                <AccordionItem value="shipping" className="border-b-0">
                  <AccordionTrigger className="py-3 font-body text-sm font-medium text-foreground hover:no-underline [&[data-state=open]]:text-primary">
                    <span className="flex items-center gap-2 text-left">
                      <MapPin className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                      {shipping.label}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="font-body text-xs leading-relaxed text-muted-foreground md:text-sm">{shipping.address}</p>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(shipping.address)}
                      className={cn(copyBtnCompact, 'mt-3')}
                    >
                      <Copy className="h-3 w-3" />
                      Salin alamat
                    </button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
