import heroBg from '@/assets/hero-bg.jpg';
import groomImg from '@/assets/groom.jpg';
import brideImg from '@/assets/bride.jpg';
import coupleFooter from '@/assets/couple-footer.jpg';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';
import weddingMusicUrl from '@/assets/akad-payung-teduh.mp3';

/** Background hero (foto cover undangan) */
export const HeroSectionData = {
  backgroundImage: heroBg,
  backgroundAlt: 'Latar undangan pernikahan',
  tagline: 'The Wedding of',
  groomShortName: 'Ale',
  brideShortName: 'Bella',
  /** Teks tanggal yang tampil di hero */
  weddingDateDisplay: 'Minggu, 15 Mei 2026',
  /** Untuk countdown (zona WIB) */
  countDownWeddingDate: new Date('2026-09-15T08:00:00+07:00'),
};

/** Alias untuk komponen countdown */
export const WEDDING_COUNTDOWN_TARGET = HeroSectionData.countDownWeddingDate;

export const CoupleSectionData = {
  groom: {
    fullName: 'Priandana',
    parentLine: 'Putra dari Bpk. Susilo Pratama & Ibu Rina Wulandari',
    instagramUrl: 'https://www.instagram.com/priandana23/',
    instagramHandle: 'priandana23',
    image: { src: groomImg, alt: 'Andi Pratama — mempelai pria' },
  },
  bride: {
    fullName: 'Catrine Bella',
    parentLine: 'Putri dari Bpk. Hadi Lestari & Ibu Sari Dewi',
    instagramUrl: 'https://www.instagram.com/catrinebellanz/',
    instagramHandle: 'catrinebellanz',
    image: { src: brideImg, alt: 'Putri Ayu Lestari — mempelai wanita' },
  },
};

/** Nama lengkap berdua (untuk WA admin, kalender, dll.) */
export const coupleFormalNames = `${CoupleSectionData.groom.fullName} & ${CoupleSectionData.bride.fullName}`;

/** Judul singkat footer & alt foto */
export const coupleDisplayTitle = `${HeroSectionData.groomShortName} & ${HeroSectionData.brideShortName}`;

export type EventBlock = {
  title: string;
  dateLabel: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
  /** Format Google Calendar: YYYYMMDDTHHmmss (tanpa timezone, asumsi waktu lokal acara) */
  calendarStart: string;
  calendarEnd: string;
};

export const EventSectionData = {
  sectionTitle: 'Waktu & Tempat',
  akad: {
    title: 'Akad Nikah',
    dateLabel: 'Minggu, 15 Mei 2026',
    time: '08.00 - 10.00 WIB',
    venue: 'Masjid Agung Al-Azhar',
    address: 'Jl. Sisingamangaraja, Jakarta Selatan',
    mapsUrl: 'https://maps.google.com/?q=Masjid+Agung+Al-Azhar+Jakarta',
    calendarStart: '20250915T080000',
    calendarEnd: '20250915T100000',
  } satisfies EventBlock,
  resepsi: {
    title: 'Resepsi',
    dateLabel: 'Minggu, 15 Mei 2026',
    time: '11.00 - 14.00 WIB',
    venue: 'Balai Kartini',
    address: 'Jl. Gatot Subroto Kav. 37, Jakarta Selatan',
    mapsUrl: 'https://maps.google.com/?q=Balai+Kartini+Jakarta',
    calendarStart: '20250915T110000',
    calendarEnd: '20250915T140000',
  } satisfies EventBlock,
};

export const GallerySectionData = {
  sectionTitle: 'Our Gallery',
  images: [
    { src: gallery1, alt: 'Momen pre-wedding 1' },
    { src: gallery2, alt: 'Momen pre-wedding 2' },
    { src: gallery3, alt: 'Momen pre-wedding 3' },
    { src: gallery4, alt: 'Momen pre-wedding 4' },
    { src: gallery5, alt: 'Momen pre-wedding 5' },
    { src: gallery6, alt: 'Momen pre-wedding 6' },
  ],
};

export const LoveStorySectionData = {
  sectionTitle: 'Love Story',
  milestones: [
    {
      year: '2019',
      title: 'Pertama Bertemu',
      desc: 'Kami pertama kali bertemu di acara reuni kampus. Senyumnya yang hangat langsung menarik perhatian.',
    },
    {
      year: '2020',
      title: 'Mulai Dekat',
      desc: 'Pandemi membuat kami semakin sering berbicara lewat video call. Dari teman menjadi sahabat.',
    },
    {
      year: '2021',
      title: 'Resmi Berpacaran',
      desc: 'Di bawah langit senja, Andi memberanikan diri mengungkapkan perasaannya. Putri menjawab "Iya".',
    },
    {
      year: '2023',
      title: 'Lamaran',
      desc: 'Dengan doa dan restu kedua orang tua, Andi melamar Putri di hadapan keluarga besar.',
    },
    {
      year: '2025',
      title: 'Hari Bahagia',
      desc: 'InsyaAllah, kami akan mengikat janji suci di bulan Mei 2025. Bismillah!',
    },
  ],
};

export const GiftSectionData = {
  sectionTitle: 'Wedding Gift',
  intro:
    'Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, kami menyediakannya di bawah ini.',
  banks: [
    { bankName: 'Bank Central Asia (BCA)', accountNumber: '1234567890', accountHolder: 'Andi Pratama' },
    { bankName: 'Bank Mandiri', accountNumber: '0987654321', accountHolder: 'Putri Ayu Lestari' },
  ],
  shipping: {
    label: 'Kirim Kado',
    address: 'Jl. Merdeka No. 17, RT 03/RW 05, Kel. Menteng, Kec. Menteng, Jakarta Pusat 10310',
  },
};

export const FooterSectionData = {
  image: { src: coupleFooter, alt: coupleDisplayTitle },
  coupleTitle: coupleDisplayTitle,
  closingLine:
    'Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.',
  quote:
    'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya.',
  quoteSource: 'QS. Ar-Rum: 21',
  creditLine: 'designed by @alif_arrizqy',
};

export const GuestbookSectionData = {
  title: 'Ucapan & Doa',
  subtitle: 'Kirimkan doa dan ucapan untuk kedua mempelai',
};

export const MusicSectionData = {
  src: weddingMusicUrl,
};

/**
 * Teks undangan untuk WhatsApp / salin — format selaras elegant (tanpa emoji baris acara).
 * Emoji di query `wa.me/?text=` sering tidak tampil benar di beberapa klien; label Tanggal/Waktu/Tempat lebih kompatibel.
 */
export function buildWaInviteBody(guestName: string, guestSlug: string, baseUrl: string): string {
  const invitationUrl = `${baseUrl.replace(/\/$/, '')}/?guest=${encodeURIComponent(guestSlug)}`;
  const { dateLabel, time, venue, address } = EventSectionData.akad;
  const locationLine = address ? `${venue}, ${address}` : venue;

  return `Assalamualaikum Wr. Wb.
Kepada Yth.
Bapak/Ibu/Saudara/i
*${guestName}*
di tempat

Bismillahirrahmanirrahim.
Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.

Tanggal : ${dateLabel}
Waktu   : ${time}
Tempat  : ${locationLine}

Silakan kunjungi link undangan digital kami:
${invitationUrl}

Kehadiran Bapak/Ibu/Saudara/i sangat berarti bagi kami.

Atas perhatiannya kami ucapkan terima kasih.
Wassalamualaikum Wr. Wb.

Kami yang berbahagia,
*${CoupleSectionData.groom.fullName} & ${CoupleSectionData.bride.fullName}*`;
}
