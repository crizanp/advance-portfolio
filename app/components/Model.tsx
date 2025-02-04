import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ show, onClose, children }: ModalProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device based on window width
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!show) return null;

  if (isMobile) {
    return (
      <div
        className="fixed inset-0 z-54 flex items-center justify-center bg-black bg-opacity-50"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-white w-full max-w-sm rounded-lg shadow-lg relative p-6 text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
          >
            ✕
          </button>
          <p className="text-gray-800 font-semibold">
            Can't show the CV on mobile. Please open this page on a desktop or enable the desktop site option.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white w-full max-w-3xl rounded-lg shadow-lg relative"
      >
        {/* Modal Content with Scrollable Area */}
        <div className="relative p-6 max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 z-[1100]"
          >
            ✕
          </button>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
