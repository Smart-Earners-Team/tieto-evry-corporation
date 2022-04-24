import BigNumber from "bignumber.js";
import { ethers } from "ethers";
// import { isMainNet } from "../..";
import type { CallSignerType } from "../../../types";
import { BIG_TEN } from "../../bigNumber";
import { getLamboDriverContract } from "../../contractHelpers";
import { getFullDisplayBalance } from "../../../utils/formatBalance";

/* Calls for Lambo driver game */
export const getDriverCounts = async (signer: CallSignerType) => {
  const contract = getLamboDriverContract(signer);
  const { _hex } = (await contract.getMyDrivers()) as ethers.BigNumber;
  const count = new BigNumber(_hex).toNumber();
  return count;
};

export const getIncome = async (address: string, signer: CallSignerType) => {
  const contract = getLamboDriverContract(signer);
  const { _hex: income } = (await contract.getMyIncome(
    address
  )) as ethers.BigNumber;
  const { _hex: moneyClaim } = await contract.calculateMoneyClaim(income);
  const result = getFullDisplayBalance(new BigNumber(moneyClaim).times(0.97), 18, 4);
  return result;
};

export const compoundIncome = async (ref: string, signer: CallSignerType) => {
  const contract = getLamboDriverContract(signer);
  const tx = await contract.reInvestIncome(ref);
  const receipt = await tx.wait();
  return receipt.status;
};

export const sellLamborghini = async (signer: CallSignerType) => {
  const contract = getLamboDriverContract(signer);
  const tx = await contract.sellLamborghini();
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
