import { useState, useCallback } from 'react';

export interface Guest {
  id: string;
  name: string;
  slug: string;
}

export interface GuestMessage {
  id: string;
  name: string;
  attending: boolean;
  message: string;
  timestamp: Date;
}

const initialGuests: Guest[] = [
  { id: '1', name: 'Budi Santoso', slug: 'budi-santoso' },
  { id: '2', name: 'Siti Nurhaliza', slug: 'siti-nurhaliza' },
  { id: '3', name: 'Ahmad Fauzi', slug: 'ahmad-fauzi' },
  { id: '4', name: 'Dewi Kartika', slug: 'dewi-kartika' },
];

const initialMessages: GuestMessage[] = [
  { id: '1', name: 'Budi Santoso', attending: true, message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. 🤲', timestamp: new Date('2025-06-01') },
  { id: '2', name: 'Siti Nurhaliza', attending: true, message: 'MasyaAllah, barakallah! Semoga langgeng hingga Jannah. ❤️', timestamp: new Date('2025-06-02') },
  { id: '3', name: 'Ahmad Fauzi', attending: false, message: 'Mohon maaf tidak bisa hadir, tapi doa terbaik selalu menyertai kalian berdua! 🤲', timestamp: new Date('2025-06-03') },
];

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function generateUniqueSlug(name: string, existingGuests: Guest[]): string {
  const base = generateSlug(name);
  const existingSlugs = new Set(existingGuests.map(g => g.slug));
  if (!existingSlugs.has(base)) return base;
  let counter = 2;
  while (existingSlugs.has(`${base}-${counter}`)) counter++;
  return `${base}-${counter}`;
}

let guestIdCounter = 5;
let messageIdCounter = 4;

// Simple global state
let guests = [...initialGuests];
let messages = [...initialMessages];
let listeners: (() => void)[] = [];

function notify() {
  listeners.forEach(l => l());
}

export function useWeddingStore() {
  const [, setTick] = useState(0);

  const subscribe = useCallback(() => {
    const rerender = () => setTick(t => t + 1);
    listeners.push(rerender);
    return () => {
      listeners = listeners.filter(l => l !== rerender);
    };
  }, []);

  // Subscribe on first render
  useState(() => {
    const unsub = subscribe();
    return unsub;
  });

  const addGuest = useCallback((name: string) => {
    const slug = generateUniqueSlug(name, guests);
    guests = [...guests, { id: String(guestIdCounter++), name, slug }];
    notify();
  }, []);

  const removeGuest = useCallback((id: string) => {
    guests = guests.filter(g => g.id !== id);
    notify();
  }, []);

  const addMessage = useCallback((name: string, attending: boolean, message: string) => {
    messages = [
      { id: String(messageIdCounter++), name, attending, message, timestamp: new Date() },
      ...messages,
    ];
    notify();
  }, []);

  return {
    guests,
    messages,
    addGuest,
    removeGuest,
    addMessage,
  };
}
