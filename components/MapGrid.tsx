import Player from "./Player";
import { MapDefinition } from "../lib/engine/types";

interface MapGridProps {
  map: MapDefinition;
  playerPosition: { x: number; y: number };
}

export default function MapGrid({ map, playerPosition }: MapGridProps) {
  const isBlocked = (x: number, y: number) =>
    map.blocked.some((tile) => tile.x === x && tile.y === y);
  const encounter = (x: number, y: number) =>
    map.encounterTiles.find((tile) => tile.x === x && tile.y === y);
  const npc = (x: number, y: number) => map.npcTiles.find((tile) => tile.x === x && tile.y === y);

  return (
    <div
      className="grid gap-1 rounded-2xl bg-slate-200 p-3"
      style={{
        gridTemplateColumns: `repeat(${map.width}, minmax(0, 2.5rem))`,
        gridTemplateRows: `repeat(${map.height}, minmax(0, 2.5rem))`
      }}
    >
      {Array.from({ length: map.height }).map((_, y) =>
        Array.from({ length: map.width }).map((__, x) => {
          const key = `${x}-${y}`;
          const isPlayer = playerPosition.x === x && playerPosition.y === y;
          const encounterTile = encounter(x, y);
          const npcTile = npc(x, y);
          const blocked = isBlocked(x, y);

          let tileStyle = "bg-sky-100";
          let label = "";
          if (blocked) {
            tileStyle = "bg-slate-400";
          } else if (encounterTile) {
            tileStyle = "bg-amber-200";
            label = "★";
          } else if (npcTile) {
            tileStyle = "bg-emerald-200";
            label = "☺";
          }

          return (
            <div
              key={key}
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs font-semibold text-slate-700 ${tileStyle}`}
            >
              {isPlayer ? <Player /> : label}
            </div>
          );
        })
      )}
    </div>
  );
}
