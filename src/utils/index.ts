import { ChainId } from "../config";
import { gamesIdMap } from "../config/constants/games";

export const isMainNet = () => {
  const ActiveChainId = process.env.GATSBY_CHAIN_ID;
  const mainnet = ActiveChainId === ChainId.MAINNET.toString();
  return mainnet;
};

// A utility function to generating the share link of a game from games map.
export const getGameShareLink = (path: string) => {
  const objs = Object.values(gamesIdMap);
  const id = objs.find((obj) => obj.path === path)?.id;
  return id ? `/me/${id}/` : undefined;
};
