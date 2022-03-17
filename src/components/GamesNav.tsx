import React from "react";
import { useAppContext } from "../hooks/useAppContext";
import useWallet from "../hooks/useWallet";
import Section from "./Layouts/Section";
import cls from "classnames";

interface GamesNavProps {
  shortName: string;
  tokenBalance: string;
}
export default function GamesNav({ shortName, tokenBalance }: GamesNavProps) {
  const {
    ttebWallet: { active, error, retry, isConnecting },
  } = useAppContext();
  const { onPresentConnectModal } = useWallet();

  const openModal = () => {
    onPresentConnectModal();
  };

  return (
    <Section
      containerClass="bg-white shadow sticky !py-0"
      className="flex justify-between !py-3 items-center my-0"
    >
      <div className="hidden sm:block font-medium text-amber-600">{shortName}</div>
      <div className="space-x-4 text-base">
        <div className="inline-block text-primary-500 font-medium text-lg">
          {tokenBalance} <b>LAMBO</b>
        </div>
        <div className="inline-block">
          {!active && !error && (
            <button
              disabled={isConnecting}
              onClick={openModal}
              className={cls(
                `transition-all duration-300 bg-yellow-500 rounded-full ring-yellow-700 ring-2 px-2 py-1
                 text-yellow-700 font-bold text-sm`,
                {
                  "cursor-not-allowed hover:text-opacity-80": isConnecting,
                }
              )}
            >
              {isConnecting ? "..." : "Connect wallet"}
            </button>
          )}
          {!active && error && (
            <button
              className="transition-all duration-300 bg-red-600 hover:bg-white ring-red-600 ring-1 mx-auto
                text-white hover:text-red-600 font-medium text-2xl uppercase p-3 flex justify-center items-center"
              onClick={retry}
            >
              Error, Please Retry
            </button>
          )}
        </div>
      </div>
    </Section>
  );
}
