"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { startNewGame } from "../../lib/engine";
import { GoalId, Settings } from "../../lib/engine/types";
import { saveState } from "../../lib/storage";

const goals: { id: GoalId; label: string; cost: number }[] = [
  { id: "headphones", label: "Headphones", cost: 60 },
  { id: "game", label: "Game", cost: 30 },
  { id: "outfit", label: "Outfit", cost: 45 }
];

const allowanceOptions = [10, 15, 25];

export default function OnboardingPage() {
  const router = useRouter();
  const [weeklyAllowance, setWeeklyAllowance] = useState<number>(15);
  const [customAllowance, setCustomAllowance] = useState<string>("");
  const [goalId, setGoalId] = useState<GoalId>("headphones");
  const [playStyle, setPlayStyle] = useState<"text" | "icons">("text");

  const handleStart = () => {
    const allowance = customAllowance
      ? Math.max(1, Number(customAllowance))
      : weeklyAllowance;
    const goal = goals.find((goal) => goal.id === goalId) ?? goals[0];

    const settings: Settings = {
      weeklyAllowance: allowance,
      goal: { id: goal.id, cost: goal.cost, label: goal.label },
      playStyle
    };

    const state = startNewGame(settings);
    saveState(state);
    router.push("/game");
  };

  return (
    <section className="flex flex-col gap-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-night">Set up your week</h1>
        <p className="text-slate-700">
          Choose a weekly allowance and a savings goal. You can always replay with new
          choices.
        </p>
      </div>

      <div className="grid gap-4 rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold">Weekly allowance</h2>
        <div className="flex flex-wrap gap-3">
          {allowanceOptions.map((value) => (
            <button
              key={value}
              className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                weeklyAllowance === value && !customAllowance
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-200 text-slate-700"
              }`}
              onClick={() => {
                setWeeklyAllowance(value);
                setCustomAllowance("");
              }}
            >
              ${value}
            </button>
          ))}
        </div>
        <label className="grid gap-2 text-sm text-slate-600">
          Custom amount
          <input
            type="number"
            value={customAllowance}
            onChange={(event) => setCustomAllowance(event.target.value)}
            placeholder="Enter a custom amount"
            className="rounded-xl border border-slate-200 px-3 py-2"
          />
        </label>
      </div>

      <div className="grid gap-4 rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold">Savings goal</h2>
        <div className="flex flex-wrap gap-3">
          {goals.map((goal) => (
            <button
              key={goal.id}
              className={`rounded-xl px-4 py-3 text-left text-sm font-semibold ${
                goalId === goal.id
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-200 text-slate-700"
              }`}
              onClick={() => setGoalId(goal.id)}
            >
              <div>{goal.label}</div>
              <div className="text-xs opacity-80">${goal.cost}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold">Play style</h2>
        <div className="flex flex-wrap gap-3">
          <button
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${
              playStyle === "text"
                ? "bg-indigo-600 text-white"
                : "border border-slate-200 text-slate-700"
            }`}
            onClick={() => setPlayStyle("text")}
          >
            More text
          </button>
          <button
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${
              playStyle === "icons"
                ? "bg-indigo-600 text-white"
                : "border border-slate-200 text-slate-700"
            }`}
            onClick={() => setPlayStyle("icons")}
          >
            More icons
          </button>
        </div>
      </div>

      <button
        className="w-fit rounded-xl bg-indigo-600 px-6 py-3 text-white"
        onClick={handleStart}
      >
        Start Day 1
      </button>
    </section>
  );
}
