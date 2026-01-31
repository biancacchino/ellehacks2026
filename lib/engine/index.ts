import { nanoid } from "nanoid";
import { encounters } from "../content";
import {
  ChoiceEvent,
  ChoiceType,
  GameState,
  Preview,
  Settings,
  WeekSummary
} from "./types";
import { explainImpact } from "./explain";
import { forecast } from "./forecast";

export function startNewGame(settings: Settings): GameState {
  return {
    version: 1,
    createdAt: new Date().toISOString(),
    settings,
    week: {
      dayIndex: 0,
      balance: settings.weeklyAllowance,
      goalSaved: 0,
      history: []
    }
  };
}

export function simulateDecision(
  state: GameState,
  encounterId: string,
  choice: ChoiceType
) {
  const encounter = encounters.find((item) => item.id === encounterId);
  if (!encounter) {
    throw new Error("Encounter not found");
  }

  const cost = choice === "buy" ? encounter.cost : 0;
  const nextBalance = Math.max(0, state.week.balance - cost);
  const goalSaved = Math.max(0, state.settings.weeklyAllowance - nextBalance);
  const { goalETAWeeks } = forecast({
    ...state,
    week: { ...state.week, balance: nextBalance, goalSaved }
  });

  const notes = explainImpact(state, encounter, choice);

  const event: ChoiceEvent = {
    id: nanoid(),
    dayIndex: state.week.dayIndex,
    encounterId: encounter.id,
    choice,
    cost: cost || undefined,
    notes,
    balanceAfter: nextBalance,
    goalETAWeeks
  };

  const nextState: GameState = {
    ...state,
    week: {
      ...state.week,
      dayIndex: Math.min(6, state.week.dayIndex + 1),
      balance: nextBalance,
      goalSaved,
      history: [...state.week.history, event]
    }
  };

  return { nextState, event };
}

export function tryItFirstPreview(state: GameState, encounterId: string): Preview {
  const encounter = encounters.find((item) => item.id === encounterId);
  if (!encounter) {
    throw new Error("Encounter not found");
  }
  const balanceAfter = Math.max(0, state.week.balance - encounter.cost);
  const { goalETAWeeks, canAffordMovie } = forecast({
    ...state,
    week: { ...state.week, balance: balanceAfter }
  });
  return {
    summary: "After this choice, here’s what the rest of the week could look like.",
    balanceAfter,
    goalETAWeeks,
    movieNightAffordable: canAffordMovie
  };
}

export function finishWeek(state: GameState): WeekSummary {
  const purchases = state.week.history.filter((event) => event.choice === "buy").length;
  const skips = state.week.history.filter((event) => event.choice === "skip").length;
  const { goalETAWeeks } = forecast(state);

  return {
    purchases,
    skips,
    finalBalance: state.week.balance,
    goalRemaining: Math.max(0, state.settings.goal.cost - state.week.goalSaved),
    goalETAWeeks,
    history: state.week.history
  };
}

export { forecast } from "./forecast";
