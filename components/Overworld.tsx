"use client";

import MapGrid from "./MapGrid";
import DPad from "./DPad";
import { MapDefinition } from "../lib/engine/types";

interface OverworldProps {
  map: MapDefinition;
  playerPosition: { x: number; y: number };
  onMove: (direction: "up" | "down" | "left" | "right") => void;
}

export default function Overworld({ map, playerPosition, onMove }: OverworldProps) {
  return (
    <div className="flex flex-col gap-4">
      <MapGrid map={map} playerPosition={playerPosition} />
      <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow">
        <div className="text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Controls</p>
          <p>Move with arrow keys or tap the D-pad.</p>
          <p>Press Space/Enter to talk when next to NPCs.</p>
        </div>
        <DPad onMove={onMove} />
      </div>
    </div>
  );
}
