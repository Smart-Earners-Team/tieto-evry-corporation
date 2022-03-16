import React from "react";
import { useAppContext } from "../../hooks/useAppContext";
import { RiWallet3Line } from "react-icons/ri";
import useWallet from "../../hooks/useWallet";
import cls from "classnames";
import SolidButton from "./SolidButton";

interface ConnectWalletButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

const ConnectWalletButton = ({
  className,
  ...props
}: ConnectWalletButtonProps) => {
  const {
    ttebWallet: { active, error, retry, isConnecting },
  } = useAppContext();
  const { onPresentConnectModal } = useWallet();

  const openModal = () => {
    onPresentConnectModal();
  };

  return (
    <>
      {!active && !error && (
        <SolidButton
          {...props}
          disabled={isConnecting}
          onClick={openModal}
          className={cls(
            "transition-all duration-300",
            {
              "cursor-not-allowed hover:text-opacity-80": isConnecting,
            },
            className
          )}
        >
          <RiWallet3Line className="inline-block h-8 w-8 m-1" />
          {isConnecting ? "..." : "Connect wallet"}
        </SolidButton>
      )}
      {!active && error && (
        <button
          className="transition-all duration-300 bg-red-600 hover:bg-white ring-red-600 ring-1
            mx-auto text-white hover:text-red-600 font-medium uppercase p-2 flex justify-center
            items-center"
          onClick={retry}
        >
          Retry to Connect
        </button>
      )}
    </>
  );
};

export default ConnectWalletButton;
