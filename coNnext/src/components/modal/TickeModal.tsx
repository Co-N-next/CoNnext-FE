// components/modal/TicketModal.tsx
import { useTicketModalStore } from "../../store/TicketModal";
export default function TicketModal() {
  const { isOpen, close } = useTicketModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={close} />

      {/* modal */}
      <div className="relative w-[90%] max-w-90 rounded-2xl bg-white">
        ...
      </div>
    </div>
  );
}
