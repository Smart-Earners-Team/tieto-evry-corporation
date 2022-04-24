import { ethers } from "ethers";
import {
  getTCoinAddress,
  getLamboAddress,
  getLamboDriverAddress,
  getMulticallAddress,
  getTtebAddress,
  getTtebDistributorAddress,
  getLamboV1Address,
  getLamboUpgraderAddress,
} from "./addressHelpers";
// ABI
import tteb from "../config/abi/tteb.json";
import lambo from "../config/abi/lambo.json";
import lamboV1 from "../config/abi/lamboV1.json";
import ttebDistributor from "../config/abi/ttebDistributor.json";
import MultiCallAbi from "../config/abi/multicall.json";
import lamboDriverAbi from "../config/abi/lamborghiniDriver.json";
import lamboUpgraderAbi from "../config/abi/lamboUpgrader.json";
import tCoinAbi from "../config/abi/tCoin.json";

import { simpleRpcProvider } from "./providers";
import { CallSignerType } from "../types";

export const getContract = (
  abi: any,
  address: string,
  signer?: CallSignerType | undefined
) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getTtebContract = (signer?: CallSignerType) => {
  return getContract(tteb, getTtebAddress(), signer);
};

export const getTtebDistributorContract = (signer?: CallSignerType) => {
  return getContract(ttebDistributor, getTtebDistributorAddress(), signer);
};

export const getLamboV1Contract = (signer?: CallSignerType) => {
  return getContract(lamboV1, getLamboV1Address(), signer);
};

export const getLamboContract = (signer?: CallSignerType) => {
  return getContract(lambo, getLamboAddress(), signer);
};

export const getMulticallContract = (signer?: CallSignerType) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer);
};

export const getLamboDriverContract = (signer?: CallSignerType) =>
  getContract(lamboDriverAbi, getLamboDriverAddress(), signer);

export const getLamboUpgraderContract = (signer?: CallSignerType) =>
  getContract(lamboUpgraderAbi, getLamboUpgraderAddress(), signer);

// Only used on testnet
export const getTCoinContract = (signer?: CallSignerType) => {
  return getContract(tCoinAbi, getTCoinAddress(), signer);
};
