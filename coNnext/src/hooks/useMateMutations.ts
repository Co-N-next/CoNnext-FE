import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  requestMate,
  acceptMate,
  rejectMate,
  addFavoriteMate,
  removeFavoriteMate,
  deleteMate,
} from "../api/mate";

export function useMateMutations() {
  const queryClient = useQueryClient();

const requestMateMutation = useMutation({
  // string -> number 로 변경
  mutationFn: (addresseeId: number) => requestMate(addresseeId),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["mates"] });
  },
});

  const acceptMateMutation = useMutation({
    mutationFn: (mateId: string) => acceptMate(mateId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mates"] });
      // Invalidate requests list if we have one
    },
  });

  const rejectMateMutation = useMutation({
    mutationFn: (mateId: string) => rejectMate(mateId),
    onSuccess: () => {
      // Invalidate requests list if we have one
    },
  });

  const addFavoriteMutation = useMutation({
    mutationFn: (mateId: string) => addFavoriteMate(mateId),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["favoriteMates"] });
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (mateId: string) => removeFavoriteMate(mateId),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["favoriteMates"] });
    },
  });

  const deleteMateMutation = useMutation({
    mutationFn: (mateId: string) => deleteMate(mateId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mates"] });
      queryClient.invalidateQueries({ queryKey: ["favoriteMates"] });
    },
  });

  return {
    requestMateMutation,
    acceptMateMutation,
    rejectMateMutation,
    addFavoriteMutation,
    removeFavoriteMutation,
    deleteMateMutation,
  };
}
