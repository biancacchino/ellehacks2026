export type GoalId = "headphones" | "game" | "outfit";

export type ChoiceType = "buy" | "skip";

export interface Goal {
  id: GoalId;
  cost: number;
  label: string;
}

export interface Settings {
  weeklyAllowance: number;
  goal: Goal;
  playStyle: "text" | "icons";
}

export interface ChoiceEvent {
  id: string;
  dayIndex: number;
  encounterId: string;
  choice: ChoiceType;
  cost?: number;
  reflection?: "yes" | "unsure" | "no";
  notes: string[];
  balanceAfter: number;
  goalETAWeeks: number;
}

export interface WeekState {
  dayIndex: number;
  balance: number;
  goalSaved: number;
  history: ChoiceEvent[];
}

export interface GameState {
  version: number;
  createdAt: string;
  settings: Settings;
  week: WeekState;
}

export interface Encounter {
  id: string;
  title: string;
  context: string;
  cost: number;
  dayIndexHint?: number;
}

export interface Preview {
  summary: string;
  balanceAfter: number;
  goalETAWeeks: number;
  movieNightAffordable: boolean;
}

export type TileType = "walkable" | "blocked" | "encounter" | "npc" | "spawn";

export interface Tile {
  x: number;
  y: number;
  type: TileType;
  id?: string;
}

export interface MapDefinition {
  width: number;
  height: number;
  blocked: { x: number; y: number }[];
  encounterTiles: { x: number; y: number; id: string }[];
  npcTiles: { x: number; y: number; id: string }[];
  spawn: { x: number; y: number };
}

export interface WeekSummary {
  purchases: number;
  skips: number;
  finalBalance: number;
  goalRemaining: number;
  goalETAWeeks: number;
  history: ChoiceEvent[];
}
