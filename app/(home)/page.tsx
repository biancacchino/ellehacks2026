"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearState, loadState } from "../../lib/storage";

export default function HomePage() {
  const [hasSave, setHasSave] = useState(false);

  useEffect(() => {
    setHasSave(Boolean(loadState()));
  }, []);

  const handleReset = () => {
    clearState();
    setHasSave(false);
  };

  return (
    <section className="flex flex-col gap-6">
      <span className="w-fit rounded-full bg-calm px-4 py-1 text-sm font-semibold text-indigo-700">
        Empowerment Journey
      </span>
      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-night">Pocket Paths</h1>
        <p className="max-w-2xl text-lg text-slate-700">
          A calm, Pokémon-inspired town where choices teach money confidence—no pressure,
          no points, just insight.
        </p>
      </div>
      <div className="grid gap-4 rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold">Start playing</h2>
        <div className="flex flex-wrap gap-3">
          {hasSave ? (
            <Link
              className="rounded-xl bg-indigo-600 px-5 py-3 text-white shadow"
              href="/game"
            >
              Continue
            </Link>
          ) : (
            <Link
              className="rounded-xl bg-indigo-600 px-5 py-3 text-white shadow"
              href="/onboarding"
            >
              Start new game
            </Link>
          )}
          <Link
            className="rounded-xl border border-slate-200 px-5 py-3 text-slate-700"
            href="/onboarding"
            onClick={handleReset}
          >
            New game (reset)
          </Link>
        </div>
      </div>
      <div className="grid gap-3 rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold">How it works</h3>
        <ul className="list-disc space-y-2 pl-6 text-slate-700">
          <li>Move around the town with arrow keys or the on-screen pad.</li>
          <li>Step on encounter tiles to make choices and see calm consequences.</li>
          <li>Talk to mentors for friendly guidance—no judgment, no pressure.</li>
        </ul>
      </div>
    </section>
  );
}
