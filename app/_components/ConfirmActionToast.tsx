"use client";
import { motion } from "framer-motion";

export default function ConfirmActionToast({
  message,
  onConfirm,
  onCancel,
  confirmLabel,
  cancelLabel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel: string;
  cancelLabel: string;
}) {
  return (
    <motion.div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col p-4 border border-red-100">
      <div className="text-sm font-medium text-gray-900 mb-2">{message}</div>
      <div className="flex gap-2 justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCancel}
          className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
        >
          {cancelLabel}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onConfirm}
          className="px-3 py-1.5 text-sm bg-red-500 text-white hover:bg-red-600 rounded-lg transition"
        >
          {confirmLabel}
        </motion.button>
      </div>
    </motion.div>
  );
}
