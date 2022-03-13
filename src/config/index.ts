import { parseUnits } from "ethers/lib/utils";
import { LpTokenPair } from "./types";

export enum ChainId {
  MAINNET = 56,
  TESTNET = 97,
}

export const BASE_BSC_SCAN_URLS = {
  [ChainId.MAINNET]: "https://bscscan.com",
  [ChainId.TESTNET]: "https://testnet.bscscan.com",
};

export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[ChainId.MAINNET];

export const tokens = {
  lambo: {
    97: "",
    56: "0x1A82C2A3fD8BE1793ed8648F2df6B2B415EA81f8",
  },
  tteb: {
    97: "",
    56: "0xc776400c2e53ad1731aacaf7c3f76e61236fa0e1",
  },
  ttebDistributor: {
    97: "",
    56: "0x8e4e4be6331F92Cf7b92E869b8b24F756A956582",
  },
  busd: {
    97: "",
    56: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  },
  bnb: {
    97: "",
    56: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
};

export const addresses = {
  multiCall: {
    56: "0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B",
    97: "",
  },
};

export const lpTokenPairs: LpTokenPair[] = [
  {
    id: 1,
    lpSymbol: "BNB-BUSD LP",
    lpAddresses: {
      97: "",
      56: "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16",
    },
    token: tokens.bnb,
    quoteToken: tokens.busd,
  },
  {
    id: 2,
    lpSymbol: "TTEB-BNB LP",
    lpAddresses: {
      97: "",
      56: "0x1D67e8031AF0D59Bcc2F3a79B95347dA0EEEF613",
    },
    token: tokens.tteb,
    quoteToken: tokens.bnb,
  },
  {
    id: 2,
    lpSymbol: "LAMBO-BNB LP",
    lpAddresses: {
      97: "",
      56: "0xed06A99F57e86c200f496923db2ceABa5761F88C",
    },
    token: tokens.lambo,
    quoteToken: tokens.bnb,
  },
];

export enum GAS_PRICE {
  default = "5",
  fast = "6",
  instant = "7",
  testnet = "10",
}

export const GAS_PRICE_GWEI = {
  default: parseUnits(GAS_PRICE.default, "gwei").toString(),
  fast: parseUnits(GAS_PRICE.fast, "gwei").toString(),
  instant: parseUnits(GAS_PRICE.instant, "gwei").toString(),
  testnet: parseUnits(GAS_PRICE.testnet, "gwei").toString(),
};
