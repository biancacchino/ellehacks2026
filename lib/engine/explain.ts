import { Encounter, GameState, ChoiceType } from "./types";
import { forecast } from "./forecast";

export function explainImpact(
  state: GameState,
  encounter: Encounter,
  choice: ChoiceType
) {
  const remainingBalance =
    choice === "buy" ? Math.max(0, state.week.balance - encounter.cost) : state.week.balance;
  const { goalETAWeeks, canAffordMovie } = forecast({
    ...state,
    week: {
      ...state.week,
      balance: remainingBalance
    }
  });

  const notes = [
    choice === "buy"
      ? `If you buy this, you’ll have $${remainingBalance} left this week.`
      : `Skipping keeps your balance at $${remainingBalance}.`,
    goalETAWeeks === 0
      ? "You’re already at your goal amount."
      : `This keeps your goal about ${goalETAWeeks} week(s) away.`
  ];

  if (!canAffordMovie) {
    notes.push("You may not have enough for movie night.");
  }

  return notes;
}
