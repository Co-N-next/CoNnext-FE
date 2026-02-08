import { motion } from "framer-motion";


export default function ModalBackdrop({ onClose }: { onClose: () => void }) {
return (
<motion.div
onClick={onClose}
className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
/>
);
}