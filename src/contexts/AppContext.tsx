import { isAddress } from "ethers/lib/utils";
import React, {
  useEffect,
  useState,
  createContext,
  useCallback,
  useContext,
} from "react";
import useQuery from "../hooks";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { useEagerConnect } from "../hooks/useEagerConnect";
import { useInactiveListener } from "../hooks/useInactiveListener";
import { isMainNet } from "../utils";
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
  triggerFetchTokens: () => void;
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
  triggerFetchTokens: () => {},
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

  /* A workaround, I use this state to trigger an update on this context and
  Refetch the tokenBalances when it changes. */
  const [trigger, setTrigger] = useState(false);

  // Referral feature support
  const [ref, setRef] = useState("");
  // Get referral address
  const refAddress = useQuery().get("ref");
  const { fast, slow } = useContext(RefreshContext);

  useEffect(() => {
    if (account) {
      const address =
        refAddress && isAddress(refAddress) ? refAddress : account;
      setRef(address);
    }
  }, [refAddress, account]);

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
    const onMainnet = isMainNet();
    const contract = onMainnet
      ? getLamboContract(library.getSigner())
      : getAspContract(library.getSigner());
    const decimals = onMainnet ? 18 : 8;

    const lambo = await getTokenBalance(contract, account, decimals);
    setBalance(tteb);
    setLamboBalance(lambo);
    // also add the fast and slow vars from the refresh context
  }, [library, active, account, fast, slow, trigger]);
  pullTokensBalanceAsync();

  const triggerFetchTokens = useCallback(() => setTrigger((p) => !p), []);

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
        triggerFetchTokens,
      }}
    >
      {children}
    </GlobalAppContextProvider.Provider>
  );
}
