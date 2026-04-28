Kamu adalah developer frontend ahli yang spesialis dalam animasi web dan desain undangan digital pernikahan yang elegan. Bantu saya membangun ulang / mempercantik kode undangan pernikahan saya menggunakan React dengan fokus pada performa tinggi dan animasi yang mewah.

---

## IDENTITAS UNDANGAN

Ini adalah undangan pernikahan digital dengan tema romantis. Gunakan tone yang anggun, hangat, dan personal.

---

## PALET WARNA & TEMA

- Warna utama (primary): `#DC809B` (pink mawar)
- Warna latar belakang: `#f8d5c1` (peach lembut)
- Turunkan warna dari dua warna ini untuk membuat palet lengkap:
  - Gunakan tint (lebih terang) dan shade (lebih gelap) secara konsisten
  - Warna teks utama: pilih kontras yang cukup terhadap background
  - Aksen dekoratif: gunakan gold/champagne (`#c9a96e`) atau cream (`#fef9f4`) untuk detail mewah

---

## TIPOGRAFI

Gunakan Google Fonts kombinasi yang romantis dan elegan, contoh yang disarankan:
- Display / Heading: `Cormorant Garamond` atau `Playfair Display` (serif mewah)
- Body / Sub-heading: `Lato` atau `Josefin Sans` (sans-serif bersih)
- Aksen dekoratif / Quote: `Great Vibes` atau `Dancing Script` (script/kursif)

Import dari: `https://fonts.googleapis.com`

---

## ANIMASI UTAMA: "OPEN GATE" (WAJIB)

Ini adalah animasi pembuka yang dipicu ketika user mengklik tombol "Buka Undangan".

### Teknis Implementasi:
- Gunakan **GSAP** (GreenSock Animation Platform) via CDN atau npm
- Jika perlu, tambahkan `@gsap/react` untuk integrasi React

### Deskripsi Animasi Gate:
```
[SEBELUM KLIK]
Layar awal menampilkan cover undangan dengan nama pasangan dan tombol "Buka Undangan"

[SAAT KLIK "Buka Undangan"]
1. Dua panel (kiri dan kanan) muncul dari tengah layar, menutupi seluruh layar
   - Panel kiri: bergerak ke kiri (translateX: 0 → -100%)
   - Panel kanan: bergerak ke kanan (translateX: 0 → +100%)
   - Durasi: 1.2s dengan ease "power2.inOut"
   - Efek: ada ornamen/border dekoratif di tepi panel

2. Saat panel terbuka, konten undangan muncul dari bawah dengan fade-in
   - opacity: 0 → 1
   - translateY: 30px → 0
   - Staggered untuk setiap section

3. Setelah gate terbuka penuh, animasi selesai dan user bisa scroll
```

### Contoh kode GSAP untuk gate:
```javascript
// Referensi saja, implementasi sesuaikan
gsap.to([leftPanel, rightPanel], {
  xPercent: (i) => i === 0 ? -100 : 100,
  duration: 1.2,
  ease: "power2.inOut",
  onComplete: revealContent
});
```

---

## LARANGAN ANIMASI

- TIDAK BOLEH ada animasi daun jatuh (falling leaves)
- TIDAK BOLEH ada animasi bunga jatuh (falling petals/flowers)
- TIDAK BOLEH ada partikel bertebaran yang mengganggu
- Semua animasi harus subtle, elegan, dan tidak mengganggu keterbacaan konten

---

## ANIMASI & EFEK PER SECTION

Gunakan GSAP ScrollTrigger untuk memicu animasi saat user scroll:

### Umum (berlaku di semua section):
- Setiap section: fade-in dari bawah saat masuk viewport (`from: { opacity:0, y:40 }`)
- Heading: slide dari kiri atau muncul dengan scale kecil ke normal
- Ornamen/divider dekoratif: draw-on animation (stroke animation SVG)

### Cover / Hero Section:
- Nama pasangan: animasi huruf per huruf (stagger) atau typewriter effect
- Tanggal: fade-in dengan delay setelah nama
- Latar belakang: subtle parallax saat scroll

### Countdown Timer:
- Angka: flip animation atau number roll saat pertama kali muncul
- Hover pada kotak: lift effect (translateY -4px + shadow)

### Galeri Foto:
- Grid foto: staggered zoom-in saat masuk viewport
- Hover foto: scale(1.05) dengan overlay gradient halus
- Lightbox: smooth fade saat dibuka/tutup

### Rute / Maps Section:
- Card lokasi: slide dari kiri dan kanan secara bergantian
- Ikon lokasi: bounce atau pulse animation

### RSVP Section:
- Form fields: focus state yang smooth (border glow menggunakan warna primary)
- Submit button: hover dengan ripple effect
- Setelah submit: success animation (checkmark dengan scale pop)

### Music Player (jika ada):
- Vinyl / disc rotation animation saat musik play
- Waveform animation

---

## SECTION YANG DINONAKTIFKAN

- Section **Wedding Gift** telah dinonaktifkan sesuai permintaan, tapi jangan di hapus File nya
- Pastikan transisi visual antara section sebelum (RSVP) dan section sesudahnya (penutup/footer) tetap mulus:
  - Sesuaikan background gradient agar tidak ada gap atau perubahan warna yang tiba-tiba
  - Section penutup harus memiliki padding atas yang cukup

---

## HOVER EFFECTS (Global)

Semua elemen interaktif harus memiliki hover yang responsif:

| Elemen | Hover Effect |
|--------|-------------|
| Tombol CTA | Background berubah ke shade lebih gelap, translateY(-2px) |
| Link / anchor | Underline animasi dari kiri ke kanan |
| Kartu / card | Shadow muncul + translateY(-4px) |
| Foto | Scale 1.05 + overlay tipis |
| Icon sosial media | Rotate 10deg + color change |

Gunakan `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` sebagai standar.

---

## PERFORMA & KUALITAS KODE

- Gunakan `React.memo` dan `useMemo` / `useCallback` untuk komponen berat
- Lazy load gambar dengan `loading="lazy"` atau Intersection Observer
- GSAP animations: gunakan `will-change: transform` hanya pada elemen yang sedang dianimasi, hapus setelah animasi selesai
- ScrollTrigger: cleanup di `useEffect` return function
- Pastikan semua animasi menggunakan `transform` dan `opacity` saja (GPU-accelerated), hindari animasi `width`, `height`, `top`, `left`
- Gunakan `prefers-reduced-motion` media query untuk aksesibilitas

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## STRUKTUR KOMPONEN REACT

```
App
├── GateCover (animasi pembuka)
├── sections/
│   ├── HeroSection
│   ├── CoupleSection
│   ├── EventSection
│   ├── CountdownSection
│   ├── GallerySection
│   ├── LocationSection
│   ├── RSVPSection
│   └── FooterSection
├── components/
│   ├── MusicPlayer
│   ├── FloatingNav
│   └── ScrollToTop
└── hooks/
    ├── useGSAP
    └── useScrollTrigger
```

---

## LIBRARY YANG DIGUNAKAN

```json
{
  "gsap": "^3.12.x",
  "@gsap/react": "^2.x",
  "react": "^18.x",
  "react-dom": "^18.x"
}
```

ScrollTrigger plugin: `gsap.registerPlugin(ScrollTrigger)`

---

## OUTPUT YANG DIINGINKAN

Berikan kode lengkap dengan:
1. Semua komponen React yang diperlukan
2. CSS/Tailwind styling yang sesuai tema warna
3. Implementasi GSAP yang bersih dan ter-cleanup dengan baik
4. Komentar kode yang jelas di bagian animasi
5. Instruksi singkat cara menjalankan proyek

Pastikan kode bisa langsung dijalankan dengan `npm install && npm run dev`.