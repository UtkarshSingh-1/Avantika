import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

type GlassModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  title?: string;
};

export function GlassModal({
  open,
  onClose,
  children,
  className,
  title,
}: GlassModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={cn("glass glass-hover max-w-lg w-full p-6", className)}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="glass-reflection" />
            <div className="flex items-center justify-between mb-4">
              {title && <h3 className="text-lg font-semibold">{title}</h3>}
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
