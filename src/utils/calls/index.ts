import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import {
  getLamboContract,
  getLamboUpgraderContract,
  getTtebDistributorContract,
} from "../contractHelpers";
import getGasPrice from "../getGasPrice";
import { getFullDisplayBalance } from "../formatBalance";
import { LpTokenPair } from "../../config/types";
import { getAddress } from "../addressHelpers";
import multicall from "./multicall";
import erc20 from "../../config/abi/erc20.json";
import { BIG_TEN } from "../bigNumber";
import type { CallSignerType } from "../../types";

export const claimDividend = async (signer: CallSignerType) => {
  const contract = getLamboContract(signer);
  const gasPrice = getGasPrice();
  const tx = await contract.claimDividend({ gasPrice });
  const receipt = await tx.wait();
  return receipt.status;
};

export const upgradeLambo = async (signer: CallSignerType) => {
  const contract = getLamboUpgraderContract(signer);
  const gasPrice = getGasPrice();
  const tx = await contract.upgrade({ gasPrice, gasLimit: "250000" });
  const receipt = await tx.wait();
  return receipt.status;
};

export const getTokenBalance = async (
  contract: Contract,
  account: string,
  decimals: number
) => {
  try {
    const { _hex } = (await contract.balanceOf(account)) as ethers.BigNumber;
    const balance = getFullDisplayBalance(
      new BigNumber(_hex),
      decimals,
      decimals
    );
    return balance;
  } catch (e) {
    return "0.000";
  }
};

export const getUnpaidEarnings = async (
  account: string,
  signer: CallSignerType
) => {
  const contract = getTtebDistributorContract(signer);

  try {
    const { _hex } = (await contract.getUnpaidEarnings(
      account
    )) as ethers.BigNumber;
    const balance = getFullDisplayBalance(new BigNumber(_hex), 9, 3);
    return balance;
  } catch (e) {
    return "0.000";
  }
};

export const fetchTokenPrices = async (pairs: LpTokenPair) => {
  const { lpAddresses, token, quoteToken } = pairs;

  // bnb-busd e.g
  const lpAddress = getAddress(lpAddresses);
  const tokenAddress = getAddress(token);
  const quoteTokenAddress = getAddress(quoteToken);

  const Erc20calls = [
    // Balance of token in the LP contract
    {
      address: tokenAddress,
      name: "balanceOf",
      params: [lpAddress],
    },
    // Balance of quote token on LP contract
    {
      address: quoteTokenAddress,
      name: "balanceOf",
      params: [lpAddress],
    },
    // Token decimals
    {
      address: tokenAddress,
      name: "decimals",
    },
    // Quote token decimals
    {
      address: quoteTokenAddress,
      name: "decimals",
    },
  ];

  const [
    tokenBalanceLP,
    quoteTokenBalanceLP,
    tokenDecimals,
    quoteTokenDecimals,
  ] = await multicall(erc20, Erc20calls);

  // Raw amount of token in the LP, including those not staked
  const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(
    BIG_TEN.pow(tokenDecimals)
  );
  const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(
    BIG_TEN.pow(quoteTokenDecimals)
  );

  return {
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
  };
};

// check if a user has allowed spending a token in a specified smart contract
export const checkTokenAllowance = async (
  contractAddress: string,
  account: string,
  tokenAddress: string,
  signer: CallSignerType
) => {
  const calls = [
    {
      address: tokenAddress,
      name: "allowance",
      params: [account, contractAddress],
    },
  ];

  const [rawTokenAllowance] = (await multicall(
    erc20,
    calls,
    signer
  )) as BigNumber.Value[];
  return new BigNumber(rawTokenAllowance);
};
