"use client";

import { motion } from "framer-motion";
import { Encounter, Preview } from "../lib/engine/types";

export default function EncounterModal({
  encounter,
  balance,
  preview,
  onTryIt,
  onDecision,
  onClose
}: {
  encounter: Encounter;
  balance: number;
  preview?: Preview | null;
  onTryIt: () => void;
  onDecision: (choice: "buy" | "skip") => void;
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
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">{encounter.title}</h3>
          <p className="text-slate-700">{encounter.context}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-slate-600">
          <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-700">
            Cost: ${encounter.cost}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold">
            Balance: ${balance}
          </span>
        </div>

        {preview ? (
          <div className="grid gap-2 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-slate-700">
            <p className="font-semibold">Try it first preview</p>
            <p>{preview.summary}</p>
            <p>Balance after: ${preview.balanceAfter}</p>
            <p>Goal ETA: {preview.goalETAWeeks} week(s)</p>
            <p>
              Movie night: {preview.movieNightAffordable ? "Affordable" : "May need planning"}
            </p>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            className="rounded-xl bg-indigo-600 px-4 py-2 text-white"
            onClick={() => onDecision("buy")}
          >
            Buy
          </button>
          <button
            className="rounded-xl border border-slate-200 px-4 py-2 text-slate-700"
            onClick={() => onDecision("skip")}
          >
            Skip
          </button>
          <button
            className="rounded-xl border border-indigo-200 px-4 py-2 text-indigo-700"
            onClick={onTryIt}
          >
            Try it first
          </button>
          <button
            className="rounded-xl px-4 py-2 text-slate-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
