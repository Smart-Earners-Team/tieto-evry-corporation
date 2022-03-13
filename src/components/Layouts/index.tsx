import React from "react";
import AppWalletProvider from "../../contexts/AppContext";
import Footer from "./Footer";
import PrimaryMenu from "../PrimaryMenu";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "../../utils/web3React";
import { ToastListener, ToastsProvider } from "../../contexts/ToastContext";
import ModalProvider from "../Modal/ModalContext";
import Section from "./Section";

interface LayoutProps extends React.ComponentProps<"main"> {}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppWalletProvider>
        <ToastsProvider>
          <ToastListener />
          <ModalProvider>
            <Section className="pt-10 pb-0">
              <PrimaryMenu />
            </Section>
            <main className={`${className}`}>{children}</main>
            <Footer />
          </ModalProvider>
        </ToastsProvider>
      </AppWalletProvider>
    </Web3ReactProvider>
  );
}
