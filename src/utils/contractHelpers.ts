import { ethers } from "ethers";
import {
  getAspAddress,
  getLamboAddress,
  getLamboDriverAddress,
  getMulticallAddress,
  getTtebAddress,
  getTtebDistributorAddress,
} from "./addressHelpers";
// ABI
import tteb from "../config/abi/tteb.json";
import lambo from "../config/abi/lambo.json";
import ttebDistributor from "../config/abi/ttebDistributor.json";
import MultiCallAbi from "../config/abi/multicall.json";
import lamboDriverAbi from "../config/abi/lamborghiniDriver.json";
import aspAbi from "../config/abi/asp.json";

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

export const getLamboContract = (signer?: CallSignerType) => {
  return getContract(lambo, getLamboAddress(), signer);
};

export const getMulticallContract = (signer?: CallSignerType) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer);
};

export const getLamboDriverContract = (signer?: CallSignerType) =>
  getContract(lamboDriverAbi, getLamboDriverAddress(), signer);

// Only used on testnet
export const getAspContract = (signer?: CallSignerType) => {
  return getContract(aspAbi, getAspAddress(), signer);
};
