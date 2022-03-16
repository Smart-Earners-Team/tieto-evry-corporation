import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { ChainId } from "../../../config";
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

export const compoundIncome = async () => {};

export const sellIncome = async (account: string, signer: CallSignerType) => {
  const contract = getLamboDriverContract(signer);
  // next line is wierd tho sellIncomeToLAMBO(address) just why?
  await contract["sellIncomeToLAMBO(address)"](account);
};

export const buyDriver = async (
  amount: string,
  signer: CallSignerType,
  ref?: string
) => {
  // We are using ASP on testnet
  const chainId = process.env.GATSBY_CHAIN_ID;
  const onMainnet = chainId === ChainId.MAINNET.toString();
  const decimals = onMainnet ? 18 : 8;

  const value = new BigNumber(amount)
    .times(BIG_TEN.pow(decimals))
    .toFixed()
    .toString();

  const contract = getLamboDriverContract(signer);
  const tx = await contract.buyDriver(ref, value);
  const receipt = await tx.wait();
  return receipt.status;
};