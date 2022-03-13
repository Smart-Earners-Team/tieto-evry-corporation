import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";

/**
 * Method to format the display of wei given an ethers.BigNumber object
 * Note: does NOT round
 */
export const formatBigNumber = (
  number: ethers.BigNumber,
  displayDecimals = 18,
  decimals = 18
) => {
  const remainder = number.mod(
    ethers.BigNumber.from(10).pow(decimals - displayDecimals)
  );
  return formatUnits(number.sub(remainder), decimals);
};

/**
 * Formats a FixedNumber like BigNumber
 * i.e. Formats 9763410526137450427.1196 into 9.763 (3 display decimals)
 */
export const formatFixedNumber = (
  number: ethers.FixedNumber,
  displayDecimals = 18,
  decimals = 18
) => {
  // Remove decimal
  const [leftSide] = number.toString().split(".");
  return formatBigNumber(
    ethers.BigNumber.from(leftSide),
    displayDecimals,
    decimals
  );
};

export const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).dividedBy(new BigNumber(10).pow(decimals));
};

export const getFullDisplayBalance = (
  balance: BigNumber,
  decimals = 18,
  displayDecimals?: number
) => {
  return getBalanceAmount(balance, decimals).toFixed(displayDecimals || 0);
};