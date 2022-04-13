import React from "react";
import useModal from "../Modal/useModal";
import { Login } from "./types";
import ConnectModal from "./ConnectModal";
import useModalContext from "../../hooks/useModalContext";

interface ReturnType {
  onPresentConnectModal: () => void;
}

const useWalletModal = (login: Login, logout: () => void): ReturnType => {
  const { onDismiss } = useModalContext();

  const [onPresentConnectModal] = useModal(
    <ConnectModal login={login} logout={logout} onDismiss={onDismiss} />
  );
  return { onPresentConnectModal };
};

export default useWalletModal;
