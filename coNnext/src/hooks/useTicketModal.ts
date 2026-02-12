// hooks/useTicketModal.ts
import { useState } from "react";

export function useTicketModal() {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
}
