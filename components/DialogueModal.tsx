"use client";

import { motion } from "framer-motion";

export default function DialogueModal({
  title,
  lines,
  onClose
}: {
  title: string;
  lines: string[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/40 px-6">
      <motion.div
        className="grid w-full max-w-xl gap-4 rounded-2xl bg-white p-6 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <h3 className="text-xl font-semibold">{title}</h3>
        {lines.map((line, index) => (
          <p key={index} className="text-slate-700">
            {line}
          </p>
        ))}
        <button
          className="w-fit rounded-xl bg-indigo-600 px-4 py-2 text-white"
          onClick={onClose}
        >
          Got it
        </button>
      </motion.div>
    </div>
  );
}
