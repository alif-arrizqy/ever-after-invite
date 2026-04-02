import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addGuest, deleteGuest, fetchGuestDisplayNameBySlug, fetchGuests, type Guest } from '@/services/guestService';
import { addGuestbookEntry, fetchGuestbookMessages, type GuestbookMessage } from '@/services/guestbookService';

export type { Guest, GuestbookMessage };

const QK = ['belle_wedding'] as const;

export function useGuests() {
  return useQuery({ queryKey: [...QK, 'guests'], queryFn: fetchGuests });
}

export function useGuestbook() {
  return useQuery({ queryKey: [...QK, 'guestbook'], queryFn: fetchGuestbookMessages });
}

export function useGuestDisplayName(slug: string | null | undefined) {
  return useQuery({
    queryKey: [...QK, 'guest-name', slug],
    enabled: Boolean(slug),
    queryFn: () => fetchGuestDisplayNameBySlug(slug as string),
  });
}

export function useGuestMutations() {
  const qc = useQueryClient();
  const addGuestMutation = useMutation({
    mutationFn: (name: string) => addGuest(name),
    onSuccess: () => qc.invalidateQueries({ queryKey: [...QK, 'guests'] }),
  });
  const removeGuestMutation = useMutation({
    mutationFn: (id: string) => deleteGuest(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [...QK, 'guests'] }),
  });
  return { addGuest: addGuestMutation, removeGuest: removeGuestMutation };
}

export function useGuestbookMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { name: string; attending: boolean; message: string }) =>
      addGuestbookEntry({
        name: input.name,
        attending: input.attending,
        message: input.message,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [...QK, 'guestbook'] }),
  });
}
