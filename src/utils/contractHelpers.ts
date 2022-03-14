import { ethers } from "ethers";
import { getLamboAddress, getMulticallAddress, getTtebAddress, getTtebDistributorAddress } from "./addressHelpers";
// ABI
import tteb from "../config/abi/tteb.json";
import lambo from "../config/abi/lambo.json";
import ttebDistributor from "../config/abi/ttebDistributor.json";
import MultiCallAbi from "../config/abi/multicall.json";
import { simpleRpcProvider } from "./providers";

export const getContract = (
  abi: any,
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider | undefined
) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getTtebContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(tteb, getTtebAddress(), signer);
};

export const getTtebDistributorContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(ttebDistributor, getTtebDistributorAddress(), signer);
};

export const getLamboContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(lambo, getLamboAddress(), signer);
};

export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer)
}