import BigNumber from "bignumber.js";
import { ethers } from "ethers";
// import { isMainNet } from "../..";
import type { CallSignerType } from "../../../types";
import { BIG_TEN } from "../../bigNumber";
import { getLamboDriverContract } from "../../contractHelpers";

/* Calls for Lambo driver game */
export const getDriverCounts = async (signer: CallSignerType) => {
  const contract = getLamboDriverContract(signer);
  const { _hex } = (await contract.getMyDrivers()) as ethers.BigNumber;
  const count = new BigNumber(_hex).toNumber();
  return count;
};

export const getIncome = async (signer: CallSignerType) => {
  const contract = getLamboDriverContract(signer);
  const { _hex } = (await contract.getMyIncome()) as ethers.BigNumber;
  const count = new BigNumber(_hex).toNumber();
  return count;
};

export const compoundIncome = async (ref: string, signer: CallSignerType) => {
  const contract = getLamboDriverContract(signer);
  await contract.reInvestIncome(ref);
};

export const sellIncome = async (signer: CallSignerType) => {
  const contract = getLamboDriverContract(signer);
  console.log(contract);
  const tx = await contract["sellLamborghini()"]();
  const receipt = await tx.wait();
  return receipt.status;
};

export const buyDriver = async (
  amount: string,
  signer: CallSignerType,
  ref?: string
) => {
  // We are using tCoin on testnet
  // const onMainnet = isMainNet();
  // const decimals = onMainnet ? 18 : 8;
  const decimals = 18;

  const value = new BigNumber(amount)
    .times(BIG_TEN.pow(decimals))
    .toFixed()
    .toString();

  const contract = getLamboDriverContract(signer);
  const tx = await contract.buyDriver(ref, value);
  const receipt = await tx.wait();
  return receipt.status;
};
