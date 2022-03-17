import { ChainId } from "../config";

export const isMainNet = () => {
  const ActiveChainId = process.env.GATSBY_CHAIN_ID;
  const mainnet = ActiveChainId === ChainId.MAINNET.toString();
  return mainnet;
};
