"use client";

import { motion } from "framer-motion";

export default function WhatChangedCard({
  balance,
  goalETAWeeks,
  notes,
  onReflect
}: {
  balance: number;
  goalETAWeeks: number;
  notes: string[];
  onReflect: (value: "yes" | "unsure" | "no") => void;
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
          <h3 className="text-2xl font-semibold">What changed?</h3>
          <p className="text-slate-700">
            Remaining balance: <span className="font-semibold">${balance}</span>
          </p>
          <p className="text-slate-700">
            Goal timeline: <span className="font-semibold">{goalETAWeeks}</span> week(s)
          </p>
        </div>
        <ul className="list-disc space-y-2 pl-6 text-slate-700">
          {notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
        <div className="space-y-2">
          <p className="font-semibold text-slate-800">Was this worth it?</p>
          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-xl bg-indigo-600 px-4 py-2 text-white"
              onClick={() => onReflect("yes")}
            >
              Yes
            </button>
            <button
              className="rounded-xl border border-slate-200 px-4 py-2 text-slate-700"
              onClick={() => onReflect("unsure")}
            >
              Not sure
            </button>
            <button
              className="rounded-xl border border-slate-200 px-4 py-2 text-slate-700"
              onClick={() => onReflect("no")}
            >
              No
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
