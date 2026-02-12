import { useSyncExternalStore } from "react";

type TicketModalState = {
  isOpen: boolean;
};

const store: TicketModalState = {
  isOpen: false,
};

const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => store.isOpen;

const emit = () => {
  listeners.forEach((listener) => listener());
};

export const useTicketModalStore = () => {
  const isOpen = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return {
    isOpen,
    open: () => {
      store.isOpen = true;
      emit();
    },
    close: () => {
      store.isOpen = false;
      emit();
    },
  };
};
