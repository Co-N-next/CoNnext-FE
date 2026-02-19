import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptMateRequest } from "../../api/notifications";

export const useAcceptMate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptMateRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", "news"],
      });
    },
  });
};
