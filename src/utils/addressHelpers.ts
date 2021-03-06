import { addresses, ChainId, tokens } from "../config";
import { Address } from "../config/types";

export const getAddress = (address: Address): string => {
  const chainId = process.env.GATSBY_CHAIN_ID as unknown as keyof Address;
  return (address[chainId] ? address[chainId] : address[ChainId.MAINNET])!;
};

export const getTtebAddress = () => {
  return getAddress(tokens.tteb);
};

export const getTtebDistributorAddress = () => {
  return getAddress(tokens.ttebDistributor);
};

export const getLamboUpgraderAddress = () => {
  return getAddress(addresses.lamboUpgrader);
};

export const getLamboV1Address = () => {
  return getAddress(tokens.lamboV1);
};

export const getLamboAddress = () => {
  return getAddress(tokens.lambo);
};

export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall);
};

export const getLamboDriverAddress = () =>
  getAddress(addresses.lamboDriverGame);

// Used only on testnet
export const getTCoinAddress = () => getAddress(addresses.tCoin);
