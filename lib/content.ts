import { Encounter, MapDefinition } from "./engine/types";

export const encounters: Encounter[] = [
  {
    id: "corner_store_snack",
    title: "Corner Store",
    context: "A cozy shop offers your favorite snack.",
    cost: 6,
    dayIndexHint: 1
  },
  {
    id: "arcade_game",
    title: "Arcade",
    context: "A new arcade game just dropped.",
    cost: 12,
    dayIndexHint: 3
  },
  {
    id: "movie_night",
    title: "Friend Invite",
    context: "Movie night on Friday. Plan ahead!",
    cost: 10,
    dayIndexHint: 4
  }
];

export const dialogues = {
  mentor: [
    "Tradeoffs are just choices. You get to decide what matters today.",
    "Saving for a goal can mean waiting longer, but it also keeps your options open.",
    "Try the preview button if you want a calm peek ahead."
  ],
  parent: [
    "Parents and guardians can help you think through big choices.",
    "In this game, you stay in charge of every decision."
  ]
};

export const mapDefinition: MapDefinition = {
  width: 12,
  height: 8,
  blocked: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 10, y: 0 },
    { x: 11, y: 0 },
    { x: 0, y: 7 },
    { x: 11, y: 7 },
    { x: 6, y: 2 },
    { x: 6, y: 3 }
  ],
  encounterTiles: [
    { x: 3, y: 2, id: "corner_store_snack" },
    { x: 8, y: 3, id: "arcade_game" },
    { x: 5, y: 6, id: "movie_night" }
  ],
  npcTiles: [
    { x: 2, y: 5, id: "mentor" },
    { x: 9, y: 5, id: "parent" }
  ],
  spawn: { x: 1, y: 1 }
};
