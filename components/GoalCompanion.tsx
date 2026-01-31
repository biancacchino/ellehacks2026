import { Goal } from "../lib/engine/types";

export default function GoalCompanion({
  goal,
  saved
}: {
  goal: Goal;
  saved: number;
}) {
  const progress = Math.min(100, Math.round((saved / goal.cost) * 100));
  return (
    <div className="grid gap-3 rounded-2xl bg-white p-5 shadow">
      <h3 className="text-lg font-semibold">Your goal</h3>
      <p className="text-slate-700">{goal.label}</p>
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <span className="block h-full bg-emerald-400" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-sm text-slate-600">
        ${saved} of ${goal.cost} saved
      </p>
    </div>
  );
}
