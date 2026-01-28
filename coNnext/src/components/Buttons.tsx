import { Plus } from "lucide-react";

interface ButtonsProps {
  onClick: () => void;
}

const Buttons = ({ onClick }: ButtonsProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-lg flex items-center justify-center transition transform hover:scale-110"
    >
      <Plus className="w-8 h-8 text-white" />
    </button>
  );
};

export default Buttons;
