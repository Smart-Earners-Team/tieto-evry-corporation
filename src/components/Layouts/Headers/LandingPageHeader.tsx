import React from "react";
import SolidButton from "../../Buttons/SolidButton";
import Link from "../../Link";
import TypistLoop from "../../Tools/TypistLoop";
import Typist from "react-typist";
// import PrimaryNav from "../Navbars/PrimaryNav";
import Section from "../Section";
import type { LandingPageHeaderProps } from "./types";
import { StaticImage } from "gatsby-plugin-image";

export default function LandingPageHeader({
  description,
  header,
}: LandingPageHeaderProps) {
  return (
    <Section containerClass="bg-gray-50" className="!pt-0 pb-0">
      <div
        className="min-h-screen md:min-h-0 md:h-screen md:max-h-[700px] mx-auto pt-16 flex flex-col
          md:flex-row md:justify-between md:item-center gap-3 text-center md:text-left"
      >
        <div className="max-w-4xl w-full">
          <h1 className="">{header}</h1>
          <p className="body-text">{description}</p>
          <div className="text-3xl font-light h-20 mt-5">
            <TypistLoop interval={0}>
              {[
                "Why stop at an inferior audit experience?",
                "Affordable smart contract audit.",
                "Building a safe and secure financial system.",
              ].map((text) => (
                <Typist key={text} startDelay={0}>
                  {text}
                  <Typist.Backspace count={text.length} delay={2000} />
                </Typist>
              ))}
            </TypistLoop>
          </div>
          <div className="my-5">
            <Link to="/contact-us">
              <SolidButton>Book an Audit</SolidButton>
            </Link>
          </div>
        </div>
        <div className="flex-shrink-0 md:max-w-sm w-full pt-8 pb-5 md:pt-20">
          <StaticImage
            src="../../../images/tteb-logo-variant-2.png"
            alt="TTEB Logo"
            layout="fullWidth"
            placeholder="blurred"
          />
        </div>
      </div>
    </Section>
  );
}
