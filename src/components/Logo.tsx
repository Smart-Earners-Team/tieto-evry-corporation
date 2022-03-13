import React from "react";
import { StaticImage } from "gatsby-plugin-image";

export default function Logo() {
  return (
    <StaticImage
      src="../images/tteb-logo-variant-2.png"
      alt="Tteb Logo"
      width={100}
      placeholder="blurred"
    />
  );
}
