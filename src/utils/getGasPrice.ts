import { ChainId, GAS_PRICE_GWEI } from "../config";

/**
 * Function to return gasPrice outwith a react component
 */
const getGasPrice = (): string => {
  const chainId = process.env.GATSBY_CHAIN_ID;
  const userGas = GAS_PRICE_GWEI.default;
  return chainId === ChainId.MAINNET.toString()
    ? userGas
    : GAS_PRICE_GWEI.testnet;
};

export default getGasPrice;
