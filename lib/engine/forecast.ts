import { encounters } from "../content";
import { GameState } from "./types";

export function forecast(state: GameState) {
  const remaining = Math.max(0, state.settings.goal.cost - state.week.goalSaved);
  const assumedWeeklySavings = Math.max(0, state.week.balance);
  const roughWeeks = remaining === 0 ? 0 : Math.ceil(remaining / Math.max(1, assumedWeeklySavings || state.settings.weeklyAllowance));

  const movie = encounters.find((encounter) => encounter.id === "movie_night");
  const canAffordMovie = movie ? state.week.balance >= movie.cost : false;

  return {
    goalETAWeeks: roughWeeks,
    canAffordMovie
  };
}
