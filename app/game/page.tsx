"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Overworld from "../../components/Overworld";
import DialogueModal from "../../components/DialogueModal";
import EncounterModal from "../../components/EncounterModal";
import WhatChangedCard from "../../components/WhatChangedCard";
import GoalCompanion from "../../components/GoalCompanion";
import { dialogues, encounters, mapDefinition } from "../../lib/content";
import {
  finishWeek,
  simulateDecision,
  tryItFirstPreview
} from "../../lib/engine";
import { GameState, Preview } from "../../lib/engine/types";
import { loadState, saveState } from "../../lib/storage";

export default function GamePage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playerPosition, setPlayerPosition] = useState(mapDefinition.spawn);
  const [activeEncounterId, setActiveEncounterId] = useState<string | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [activeDialogue, setActiveDialogue] = useState<string[] | null>(null);
  const [whatChanged, setWhatChanged] = useState<{
    balance: number;
    goalETAWeeks: number;
    notes: string[];
    eventId: string;
  } | null>(null);

  const blockedKeys = useMemo(
    () => new Set(mapDefinition.blocked.map((tile) => `${tile.x},${tile.y}`)),
    []
  );
  const encounterKeys = useMemo(
    () =>
      new Map(
        mapDefinition.encounterTiles.map((tile) => [`${tile.x},${tile.y}`, tile.id])
      ),
    []
  );
  const npcKeys = useMemo(
    () => new Map(mapDefinition.npcTiles.map((tile) => [`${tile.x},${tile.y}`, tile.id])),
    []
  );

  useEffect(() => {
    const saved = loadState();
    if (!saved) {
      router.push("/onboarding");
      return;
    }
    setGameState(saved);
  }, [router]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") movePlayer("up");
      if (event.key === "ArrowDown") movePlayer("down");
      if (event.key === "ArrowLeft") movePlayer("left");
      if (event.key === "ArrowRight") movePlayer("right");
      if (event.key === "Enter" || event.key === " ") {
        handleInteract();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const movePlayer = (direction: "up" | "down" | "left" | "right") => {
    if (activeEncounterId || activeDialogue || whatChanged) return;
    setPlayerPosition((prev) => {
      const next = { ...prev };
      if (direction === "up") next.y -= 1;
      if (direction === "down") next.y += 1;
      if (direction === "left") next.x -= 1;
      if (direction === "right") next.x += 1;

      if (
        next.x < 0 ||
        next.y < 0 ||
        next.x >= mapDefinition.width ||
        next.y >= mapDefinition.height
      ) {
        return prev;
      }
      if (blockedKeys.has(`${next.x},${next.y}`)) {
        return prev;
      }

      const encounterId = encounterKeys.get(`${next.x},${next.y}`);
      if (encounterId && gameState) {
        const alreadyDone = gameState.week.history.some(
          (event) => event.encounterId === encounterId
        );
        if (!alreadyDone) {
          setActiveEncounterId(encounterId);
        }
      }

      return next;
    });
  };

  const handleInteract = () => {
    if (activeEncounterId || activeDialogue || whatChanged) return;
    const adjacent = [
      { x: playerPosition.x + 1, y: playerPosition.y },
      { x: playerPosition.x - 1, y: playerPosition.y },
      { x: playerPosition.x, y: playerPosition.y + 1 },
      { x: playerPosition.x, y: playerPosition.y - 1 }
    ];
    const npc = adjacent
      .map((pos) => npcKeys.get(`${pos.x},${pos.y}`))
      .find(Boolean);
    if (npc === "mentor") {
      setActiveDialogue(dialogues.mentor);
    }
    if (npc === "parent") {
      setActiveDialogue(dialogues.parent);
    }
  };

  const handleDecision = (choice: "buy" | "skip") => {
    if (!gameState || !activeEncounterId) return;
    const { nextState, event } = simulateDecision(gameState, activeEncounterId, choice);
    setGameState(nextState);
    saveState(nextState);
    setWhatChanged({
      balance: event.balanceAfter,
      goalETAWeeks: event.goalETAWeeks,
      notes: event.notes,
      eventId: event.id
    });
    setActiveEncounterId(null);
    setPreview(null);
  };

  const handleReflection = (value: "yes" | "unsure" | "no") => {
    if (!gameState || !whatChanged) return;
    const updatedHistory = gameState.week.history.map((event) =>
      event.id === whatChanged.eventId ? { ...event, reflection: value } : event
    );
    const nextState: GameState = {
      ...gameState,
      week: {
        ...gameState.week,
        history: updatedHistory
      }
    };
    setGameState(nextState);
    saveState(nextState);
    setWhatChanged(null);
  };

  const handleFinishWeek = () => {
    router.push("/summary");
  };

  if (!gameState) {
    return <p className="text-slate-600">Loading your town...</p>;
  }

  const activeEncounter = encounters.find((encounter) => encounter.id === activeEncounterId) ?? null;
  const summary = finishWeek(gameState);
  const showFinishPrompt = gameState.week.dayIndex >= 6;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-night">Town Square</h1>
          <p className="text-slate-600">
            Day {gameState.week.dayIndex + 1} of 7 · Balance ${gameState.week.balance}
          </p>
        </div>
        <button
          className="rounded-xl border border-slate-200 px-4 py-2 text-slate-700"
          onClick={handleFinishWeek}
        >
          Finish Week
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Overworld map={mapDefinition} playerPosition={playerPosition} onMove={movePlayer} />
        <div className="grid gap-4">
          <GoalCompanion goal={gameState.settings.goal} saved={gameState.week.goalSaved} />
          <div className="rounded-2xl bg-white p-5 shadow">
            <h3 className="text-lg font-semibold">What changed so far</h3>
            <p className="text-sm text-slate-600">
              {summary.purchases} purchase(s), {summary.skips} skip(s). Keep exploring for new
              choices.
            </p>
          </div>
          {showFinishPrompt ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
              You reached Day 7. Head to the summary when you feel ready.
            </div>
          ) : null}
        </div>
      </div>

      {activeDialogue ? (
        <DialogueModal
          title="Town Guide"
          lines={activeDialogue}
          onClose={() => setActiveDialogue(null)}
        />
      ) : null}

      {activeEncounter ? (
        <EncounterModal
          encounter={activeEncounter}
          balance={gameState.week.balance}
          preview={preview}
          onTryIt={() => setPreview(tryItFirstPreview(gameState, activeEncounter.id))}
          onDecision={handleDecision}
          onClose={() => {
            setActiveEncounterId(null);
            setPreview(null);
          }}
        />
      ) : null}

      {whatChanged ? (
        <WhatChangedCard
          balance={whatChanged.balance}
          goalETAWeeks={whatChanged.goalETAWeeks}
          notes={whatChanged.notes}
          onReflect={handleReflection}
        />
      ) : null}
    </section>
  );
}
