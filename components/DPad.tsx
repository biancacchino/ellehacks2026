"use client";

export default function DPad({
  onMove
}: {
  onMove: (direction: "up" | "down" | "left" | "right") => void;
}) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-2" aria-label="Movement controls">
      <span />
      <button
        className="h-10 w-10 rounded-xl bg-slate-100 text-lg font-semibold"
        onClick={() => onMove("up")}
      >
        ↑
      </button>
      <span />
      <button
        className="h-10 w-10 rounded-xl bg-slate-100 text-lg font-semibold"
        onClick={() => onMove("left")}
      >
        ←
      </button>
      <span />
      <button
        className="h-10 w-10 rounded-xl bg-slate-100 text-lg font-semibold"
        onClick={() => onMove("right")}
      >
        →
      </button>
      <span />
      <button
        className="h-10 w-10 rounded-xl bg-slate-100 text-lg font-semibold"
        onClick={() => onMove("down")}
      >
        ↓
      </button>
      <span />
    </div>
  );
}
