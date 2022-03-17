import { GAS_PRICE_GWEI } from "../config";
import { isMainNet } from "../utils";

export function useGasPrice(): string {
  const defaultGasPrice = GAS_PRICE_GWEI.default;
  return isMainNet() ? defaultGasPrice : GAS_PRICE_GWEI.testnet;
}
