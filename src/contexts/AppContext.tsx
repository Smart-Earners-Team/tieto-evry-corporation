import React, {
  useEffect,
  useState,
  createContext,
  useCallback,
  useContext,
} from "react";
import { ChainId } from "../config";
import useQuery from "../hooks";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { useEagerConnect } from "../hooks/useEagerConnect";
import { useInactiveListener } from "../hooks/useInactiveListener";
import { getTokenBalance } from "../utils/calls";
import {
  getAspContract,
  getLamboContract,
  getTtebContract,
} from "../utils/contractHelpers";
import {
  connectorsByName,
  resetWalletConnectConnector,
} from "../utils/web3React";
import { RefreshContext } from "./RefreshContext";

export interface GlobalAppContext {
  ttebWallet: {
    active: boolean;
    balance: string;
    lamboBalance: string;
    isConnecting: boolean;
    error: Error | undefined;
    retry: () => void;
  };
  refAddress: string;
}

const defaultValues: GlobalAppContext = {
  ttebWallet: {
    active: false,
    balance: "0.000",
    lamboBalance: "0.000",
    isConnecting: true,
    error: undefined,
    retry: () => {},
  },
  refAddress: "",
};

export const GlobalAppContextProvider =
  createContext<GlobalAppContext>(defaultValues);

export default function AppContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isConnecting, setIsConnecting] = useState(false);
  const { deactivate, active, error, account, library } = useActiveWeb3React();
  // get wallet balance in bnb
  const [balance, setBalance] = useState("0.000");
  const [lamboBalance, setLamboBalance] = useState("0.000");
  // Referral feature support
  const [ref, setRef] = useState("");
  // Get referral address
  const address = useQuery().get("ref");
  const { fast, slow } = useContext(RefreshContext);

  useEffect(() => {
    if (address) {
      setRef(address);
    }
  }, [address]);

  useEffect(() => {
    if (active) {
      setIsConnecting(true);
    } else {
      setIsConnecting(false);
    }
  }, [active, error]);

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);

  const handleRetry = () => {
    setIsConnecting(false);
    resetWalletConnectConnector(connectorsByName["walletconnect"]);
    deactivate();
  };

  const pullTokensBalanceAsync = useCallback(async () => {
    if (!library || !active || !account) return;

    const tteb = await getTokenBalance(
      getTtebContract(library.getSigner()),
      account,
      9
    );
    // On testnet, we are using ASP
    const chainId = process.env.GATSBY_CHAIN_ID;
    const onMainnet = chainId === ChainId.MAINNET.toString();
    const contract = onMainnet
      ? getLamboContract(library.getSigner())
      : getAspContract(library.getSigner());
    const decimals = onMainnet ? 18 : 8;

    const lambo = await getTokenBalance(contract, account, decimals);
    setBalance(tteb);
    setLamboBalance(lambo);
    // also add the fast and slow vars from the refresh context
  }, [library, active, account, fast, slow]);
  pullTokensBalanceAsync();

  return (
    <GlobalAppContextProvider.Provider
      value={{
        ttebWallet: {
          active,
          balance,
          lamboBalance,
          isConnecting,
          error,
          retry: handleRetry,
        },
        refAddress: ref,
      }}
    >
      {children}
    </GlobalAppContextProvider.Provider>
  );
}
