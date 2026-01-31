"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { finishWeek } from "../../lib/engine";
import { GameState } from "../../lib/engine/types";
import { loadState, saveState } from "../../lib/storage";

export default function SummaryPage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    const saved = loadState();
    if (!saved) {
      router.push("/");
      return;
    }
    setGameState(saved);
  }, [router]);

  const summary = useMemo(() => (gameState ? finishWeek(gameState) : null), [gameState]);

  const handleReplay = () => {
    if (!gameState) return;
    const resetState: GameState = {
      ...gameState,
      week: {
        dayIndex: 0,
        balance: gameState.settings.weeklyAllowance,
        goalSaved: 0,
        history: []
      }
    };
    setGameState(resetState);
    saveState(resetState);
    router.push("/game");
  };

  if (!gameState || !summary) {
    return <p className="text-slate-600">Loading summary...</p>;
  }

  return (
    <section className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold text-night">Week Summary</h1>
        <p className="text-slate-600">A calm recap of your choices.</p>
      </div>

      <div className="grid gap-3 rounded-2xl bg-white p-6 shadow">
        <p className="text-slate-700">
          You chose {summary.purchases} purchase(s) and skipped {summary.skips} time(s).
        </p>
        <p className="text-slate-700">Final balance: ${summary.finalBalance}</p>
        <p className="text-slate-700">
          Goal status: ${summary.goalRemaining} remaining · about {summary.goalETAWeeks} week(s)
          away.
        </p>
      </div>

      <div className="grid gap-3 rounded-2xl bg-white p-6 shadow">
        <h3 className="text-lg font-semibold">Timeline highlights</h3>
        <ul className="space-y-2 text-slate-700">
          {summary.history.slice(-5).map((event) => (
            <li key={event.id}>
              Day {event.dayIndex + 1}: {event.encounterId} — {event.choice}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          className="rounded-xl bg-indigo-600 px-5 py-3 text-white"
          onClick={handleReplay}
        >
          Replay Week
        </button>
        <Link
          className="rounded-xl border border-slate-200 px-5 py-3 text-slate-700"
          href="/"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
