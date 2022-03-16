import React from "react";
import Footer from "./Footer";

interface LayoutProps extends React.ComponentProps<"main"> {}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <React.Fragment>
      <main className={`${className}`}>{children}</main>
      <Footer />
    </React.Fragment>
  );
}
