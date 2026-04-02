import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Copy, Trash2, MessageCircle, Upload, Plus, Users, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useWeddingStore, generateSlug } from '@/store/weddingStore';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : '';

export default function AdminPage() {
  const { guests, addGuest, removeGuest } = useWeddingStore();
  const [newName, setNewName] = useState('');
  const [waDialog, setWaDialog] = useState<{ name: string; slug: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const slug = generateSlug(newName);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addGuest(newName.trim());
    toast.success('Tamu berhasil ditambahkan! ✅');
    setNewName('');
  };

  const copyLink = (guestSlug: string) => {
    navigator.clipboard.writeText(`${BASE_URL}/?guest=${guestSlug}`);
    toast.success('Link berhasil dicopy! 📋');
  };

  const getWaMessage = (name: string, guestSlug: string) => {
    return `Assalamu'alaikum ${name},\n\nKami dengan penuh kebahagiaan mengundang Anda untuk hadir dalam acara pernikahan kami:\n\n💍 Andi Pratama & Putri Ayu Lestari\n📅 Minggu, 15 September 2025\n\nBerikut undangan digital untuk Anda:\n${BASE_URL}/?guest=${guestSlug}\n\nSemoga Anda berkenan hadir. Terima kasih! 🤲`;
  };

  const exportCSV = () => {
    const header = 'No,Name,Slug,Link\n';
    const rows = guests.map((g, i) => `${i + 1},"${g.name}",${g.slug},${BASE_URL}/?guest=${g.slug}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'guest-list.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV berhasil diunduh! 📄');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-primary" />
            <h1 className="font-heading text-xl text-foreground">Admin Dashboard</h1>
          </div>
          <a href="/" className="inline-flex items-center gap-1.5 text-sm font-body text-primary hover:underline">
            <ExternalLink className="w-3.5 h-3.5" />
            Lihat Undangan
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Add Guest */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-heading text-lg text-foreground mb-4">Tambah Tamu</h2>
            <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 space-y-1">
                <Input
                  placeholder="Nama Tamu (cth: Budi Santoso)"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="bg-background font-body"
                />
                {newName.trim() && (
                  <p className="text-xs text-muted-foreground font-body">
                    Slug: <span className="text-primary font-medium">{slug}</span>
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase rounded-lg hover:bg-primary/90 transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                Tambah
              </button>
            </form>
          </div>
        </motion.div>

        {/* Guest Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b border-border">
              <h2 className="font-heading text-lg text-foreground">
                Daftar Tamu ({guests.length})
              </h2>
              <button
                onClick={exportCSV}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-secondary text-secondary-foreground font-body text-xs tracking-wider uppercase rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
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
                            onClick={() => copyLink(g.slug)}
                            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                            title="Copy Link"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setWaDialog({ name: g.name, slug: g.slug })}
                            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                            title="WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              removeGuest(g.id);
                              toast.success('Tamu dihapus.');
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
                        Belum ada tamu. Tambahkan tamu pertama Anda!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>
      </main>

      {/* WhatsApp Dialog */}
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
                  onClick={() => {
                    navigator.clipboard.writeText(getWaMessage(waDialog.name, waDialog.slug));
                    toast.success('Pesan dicopy! 📋');
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-border bg-background font-body text-sm rounded-lg hover:bg-muted transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy Pesan
                </button>
                <button
                  onClick={() => {
                    const text = encodeURIComponent(getWaMessage(waDialog.name, waDialog.slug));
                    window.open(`https://wa.me/?text=${text}`, '_blank');
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground font-body text-sm rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Send via WA
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
