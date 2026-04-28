import { useState, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Copy, Trash2, MessageCircle, Upload, Plus, Users, ExternalLink, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useGuests, useGuestMutations } from '@/hooks/useWeddingSupabase';
import { importGuestNames } from '@/services/guestService';
import { buildWaInviteBody } from '@/constant/WeddingData';
import { generateSlug } from '@/lib/wedding-utils';
import { scrollViewport } from '@/lib/scroll-motion';
import { inviteBtnPrimary, inviteBtnSecondary, inviteBtnOutline } from '@/components/invitation/invite-styles';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : '';

const adminFormList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const adminFormField = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function AdminPage() {
  const { data: guests = [] } = useGuests();
  const { addGuest, removeGuest } = useGuestMutations();
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState('');
  const [waDialog, setWaDialog] = useState<{ name: string; slug: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const slug = generateSlug(newName);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addGuest.mutate(newName.trim(), {
      onSuccess: () => {
        toast.success('Tamu berhasil ditambahkan.');
        setNewName('');
      },
      onError: () =>
        toast.error(
          'Tidak dapat menambah tamu. Di Supabase SQL Editor, jalankan seluruh isi file supabase/guests-anon-rls.sql (pastikan ada GRANT USAGE ON SCHEMA untuk anon).'
        ),
    });
  };

  const copyLink = (guestSlug: string) => {
    navigator.clipboard.writeText(`${BASE_URL}/?guest=${guestSlug}`);
    toast.success('Link berhasil disalin.');
  };

  const getWaMessage = (name: string, guestSlug: string) =>
    buildWaInviteBody(name, guestSlug, BASE_URL);

  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async evt => {
      const data = evt.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: unknown[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const names: string[] = [];
      rows.forEach(row => {
        const r = row as unknown[];
        const name = String(r[0] || '').trim();
        if (!name || name.toLowerCase() === 'nama' || name.toLowerCase() === 'name') return;
        names.push(name);
      });
      try {
        const count = await importGuestNames(names);
        await queryClient.invalidateQueries({ queryKey: ['belle_wedding', 'guests'] });
        toast.success(`${count} tamu berhasil diimpor.`);
      } catch {
        toast.error('Impor gagal. Periksa koneksi dan policy Supabase.');
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-primary" />
            <h1 className="font-heading text-xl text-foreground">Admin Dashboard</h1>
          </div>
          <a href="/" className={cn(inviteBtnOutline, 'py-2 text-[11px]')}>
            <ExternalLink className="h-3.5 w-3.5" />
            Lihat undangan
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-heading text-lg text-foreground mb-4">Tambah Tamu</h2>
            <motion.form
              variants={adminFormList}
              initial="hidden"
              whileInView="show"
              viewport={scrollViewport}
              onSubmit={handleAdd}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.div variants={adminFormField} className="flex-1 space-y-1 w-full">
                <motion.div whileHover={{ y: -1 }} transition={{ type: 'spring', stiffness: 420, damping: 30 }}>
                  <Input
                    placeholder="Nama Tamu (cth: Budi Santoso)"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="bg-background font-body focus-visible:ring-primary/35"
                  />
                </motion.div>
                {newName.trim() && (
                  <p className="text-xs text-muted-foreground font-body">
                    Slug: <span className="text-primary font-medium">{slug}</span>
                  </p>
                )}
              </motion.div>
              <motion.div variants={adminFormField} className="shrink-0">
                <motion.button
                  type="submit"
                  disabled={addGuest.isPending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(inviteBtnPrimary, 'w-full sm:w-auto disabled:opacity-60')}
                >
                  <Plus className="h-4 w-4" />
                  Tambah
                </motion.button>
              </motion.div>
            </motion.form>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b border-border">
              <h2 className="font-heading text-lg text-foreground">Daftar Tamu ({guests.length})</h2>
              <div className="flex items-center gap-2">
                <a
                  href="/template-import-tamu.xlsx"
                  download="template-import-tamu.xlsx"
                  className={inviteBtnOutline}
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Template
                </a>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleImportExcel}
                  className="hidden"
                />
                <button type="button" onClick={() => fileInputRef.current?.click()} className={inviteBtnSecondary}>
                  <Upload className="h-3.5 w-3.5" />
                  Import Excel
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-body text-xs w-12">No</TableHead>
                    <TableHead className="font-body text-xs">Nama</TableHead>
                    <TableHead className="font-body text-xs">Slug</TableHead>
                    <TableHead className="font-body text-xs hidden md:table-cell">Link</TableHead>
                    <TableHead className="font-body text-xs text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guests.map((g, i) => (
                    <TableRow key={g.id}>
                      <TableCell className="font-body text-sm">{i + 1}</TableCell>
                      <TableCell className="font-body text-sm font-medium">{g.name}</TableCell>
                      <TableCell className="font-body text-xs text-muted-foreground">{g.slug}</TableCell>
                      <TableCell className="font-body text-xs text-muted-foreground hidden md:table-cell max-w-[200px] truncate">
                        {BASE_URL}/?guest={g.slug}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => copyLink(g.slug)}
                            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                            title="Copy Link"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setWaDialog({ name: g.name, slug: g.slug })}
                            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                            title="WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              removeGuest.mutate(g.id, {
                                onSuccess: () => toast.success('Tamu dihapus.'),
                                onError: () => toast.error('Tidak dapat menghapus tamu.'),
                              });
                            }}
                            className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {guests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10 text-muted-foreground font-body text-sm">
                        Belum ada tamu. Tambahkan tamu pertama Anda.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>
      </main>

      <Dialog open={!!waDialog} onOpenChange={() => setWaDialog(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">Kirim via WhatsApp</DialogTitle>
          </DialogHeader>
          {waDialog && (
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <pre className="whitespace-pre-wrap font-body text-sm text-foreground">
                  {getWaMessage(waDialog.name, waDialog.slug)}
                </pre>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(getWaMessage(waDialog.name, waDialog.slug));
                    toast.success('Pesan disalin.');
                  }}
                  className={cn(inviteBtnOutline, 'flex-1 py-3 text-xs')}
                >
                  <Copy className="h-4 w-4" />
                  Salin pesan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const text = encodeURIComponent(getWaMessage(waDialog.name, waDialog.slug));
                    window.open(`https://wa.me/?text=${text}`, '_blank');
                  }}
                  className={cn(inviteBtnSecondary, 'flex-1 py-3 text-xs')}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
