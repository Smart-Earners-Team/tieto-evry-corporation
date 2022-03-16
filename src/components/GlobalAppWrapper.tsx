import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import { IconContext } from "react-icons";
import { ToastsProvider, ToastListener } from "../contexts/ToastContext";
import { getLibrary } from "../utils/web3React";
import Section from "./Layouts/Section";
import ModalProvider from "./Modal/ModalContext";
import PrimaryMenu from "./PrimaryMenu";
import AppWalletProvider from "../contexts/AppContext";

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
      <AppWalletProvider>
        <ToastsProvider>
          <ToastListener />
          <ModalProvider>
            <IconContext.Provider value={{ className: "w-6 h-6" }}>
              {props.path !== "/" && (
                <Section className="!pt-0 pb-0" containerClass="shadow-sm">
                  <PrimaryMenu />
                </Section>
              )}
              {props.children}
            </IconContext.Provider>
          </ModalProvider>
        </ToastsProvider>
      </AppWalletProvider>
    </Web3ReactProvider>
  );
}
