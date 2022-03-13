import { ethers } from "ethers";
import React, { useEffect, useState, createContext } from "react";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { useEagerConnect } from "../hooks/useEagerConnect";
import { useInactiveListener } from "../hooks/useInactiveListener";
import { formatFixedNumber } from "../utils/formatBalance";
import {
  connectorsByName,
  resetWalletConnectConnector,
} from "../utils/web3React";

export interface GlobalAppContext {
  ttebWallet: {
    active: boolean;
    balance: string;
    isConnecting: boolean;
    error: Error | undefined;
    retry: () => void;
  };
}

const defaultValues: GlobalAppContext = {
  ttebWallet: {
    active: false,
    balance: "0.000",
    isConnecting: true,
    error: undefined,
    retry: () => {},
  },
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

  useEffect(() => {
    if (active) {
      setIsConnecting(true);
    } else {
      setIsConnecting(false);
    }
  }, [active, error]);

  useEffect(() => {
    if (account && library) {
      library.getBalance(account).then((bal) => {
        const accBal = ethers.FixedNumber.from(bal);
        setBalance(formatFixedNumber(accBal, 6));
      });
    } else {
      setBalance("0.000");
    }
  }, [account, library]);

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);

  const handleRetry = () => {
    setIsConnecting(false);
    resetWalletConnectConnector(connectorsByName["walletconnect"]);
    deactivate();
  };

  return (
    <GlobalAppContextProvider.Provider
      value={{
        ttebWallet: {
          active,
          balance,
          isConnecting,
          error,
          retry: handleRetry,
        },
      }}
    >
      {children}
    </GlobalAppContextProvider.Provider>
  );
}
