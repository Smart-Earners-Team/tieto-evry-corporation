import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import { IconContext } from "react-icons";
import { ToastsProvider, ToastListener } from "../contexts/ToastContext";
import { getLibrary } from "../utils/web3React";
import Section from "./Layouts/Section";
import ModalProvider from "./Modal/ModalContext";
import PrimaryMenu from "./PrimaryMenu";
import AppWalletProvider from "../contexts/AppContext";
import TokenPriceContext from "../contexts/TokenPriceContext";
import { RefreshContextProvider } from "../contexts/RefreshContext";

/**
 * This component is used to share state accross all sections of the site without unmounting on page
 * navigation.
 */
export default function GlobalAppWrapper(props: {
  children: React.ReactNode;
  path: string;
}) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <RefreshContextProvider>
        <AppWalletProvider>
          <TokenPriceContext>
            <ToastsProvider>
              <ToastListener />
              <ModalProvider>
                <IconContext.Provider value={{ className: "w-6 h-6" }}>
                  <Section className="!pt-0 pb-0 !max-w-screen-xl" containerClass="shadow-sm">
                    <PrimaryMenu />
                  </Section>
                  {props.children}
                </IconContext.Provider>
              </ModalProvider>
            </ToastsProvider>
          </TokenPriceContext>
        </AppWalletProvider>
      </RefreshContextProvider>
    </Web3ReactProvider>
  );
}
