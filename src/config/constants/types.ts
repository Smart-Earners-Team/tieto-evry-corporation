export type GameIds = 1;

export type GamesIdMap = {
  [P in GameIds]: { id: number; path: string };
};
