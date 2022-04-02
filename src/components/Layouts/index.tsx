import React from "react";
import Footer from "./Footer";
import Helment from "react-helmet";

interface LayoutProps extends React.ComponentProps<"main"> {}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <React.Fragment>
      <Helment>
        <script src="https://sendfox.com/js/form.js" defer async />
      </Helment>
      <main className={`${className}`}>{children}</main>
      <Footer />
    </React.Fragment>
  );
}
