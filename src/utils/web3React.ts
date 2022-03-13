import { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { BscConnector } from "@binance-chain/bsc-connector";
import { ethers } from "ethers";
import getNodeUrl from "./getRpcUrl";
import { ConnectorNames } from "../components/WalletModal/types";

const POLLING_INTERVAL = 12000;
const rpcUrl = getNodeUrl();
const chainId = parseInt(process.env.GATSBY_CHAIN_ID!, 10);

export const injected = new InjectedConnector({ supportedChainIds: [chainId] });

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  qrcode: true,
  // @ts-ignore
  pollingInterval: POLLING_INTERVAL,
  chainId: chainId,
});

const bscConnector = new BscConnector({ supportedChainIds: [chainId] });

export const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector,
};

export const getLibrary = (
  provider:
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc
): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};


// reset WalletConnect connector
export const resetWalletConnectConnector = (connector: AbstractConnector) => {
    if (connector && connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined;
    }
  };