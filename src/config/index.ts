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
    56: "0xd83a832AD7202612FA53E0317DF685A5Df7cA8b8",
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
    97: "0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576",
  },
  lamboDriverGame: {
    97: "0xB2430dd5deBB2d8B376d2fAcb3e8A686E81aB1E1",
    56: "0x639F645B35D5C2f9B2B354819Be6050707B7Bb94",
  },
  // only for testnet
  tCoin: {
    97: "0x3807C468D722aAf9e9A82d8b4b1674E66a12E607",
    56: "",
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
