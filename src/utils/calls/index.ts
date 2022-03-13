import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import {
  getLamboContract,
  getTtebDistributorContract,
} from "../contractHelpers";
import getGasPrice from "../getGasPrice";
import { getFullDisplayBalance } from "../formatBalance";
import { LpTokenPair } from "../../config/types";
import { getAddress } from "../addressHelpers";
import multicall from "./multicall";
import erc20 from "../../config/abi/erc20.json";
import { BIG_TEN } from "../bigNumber";

export const claimDividend = async (
  signer: ethers.Signer | ethers.providers.Provider
) => {
  const contract = getLamboContract(signer);
  const gasPrice = getGasPrice();
  const tx = await contract.claimDividend({ gasPrice });
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
    const balance = getFullDisplayBalance(new BigNumber(_hex), decimals, 3);
    return balance;
  } catch (e) {
    return "0.000";
  }
};

export const getUnpaidEarnings = async (
  account: string,
  signer: ethers.Signer | ethers.providers.Provider
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