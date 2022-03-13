import { tokens } from ".";

export interface Address {
  97?: string;
  56: string;
}

type Token = {[P in keyof typeof tokens]: Address;}

export interface LpTokenPair {
  id: number;
  lpSymbol: string;
  lpAddresses: Address;
  token: Address;
  quoteToken: Address;
}
