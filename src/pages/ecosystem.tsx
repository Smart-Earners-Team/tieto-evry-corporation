import React from "react";
import CopyToClipboard from "../components/Tools/CopyToClipboard";
import Layout from "../components/Layouts";
import { Heading } from "../components/Typography/Headings";
import SimpleTimeline from "../components/Tools/SimpleTimeline";
import SolidButton from "../components/Buttons/SolidButton";
import { StaticImage } from "gatsby-plugin-image";
import SEO from "../components/SEO";
import Section from "../components/Layouts/Section";
import Link from "../components/Link";

export default function EcosystemPage() {
  return (
    <Layout>
      <SEO
        title="Our Ecosystem"
        description="TietoEVRY was created to help people make informed decisions
        about crypto investing, preventing monetary loss to new and inexperienced crypto investors."
      />
      <Section>
        <header>
          <Heading>Our Ecosystem</Heading>
          <p className="my-5">
            TietoEVRY was created to help people make informed decisions about
            crypto investing. TietoEVRY primarily will focus on identifying scam
            and high-risk tokens to prevent monetary loss to new and
            inexperienced crypto investors.
          </p>
          <p>
            Utilising our Smart Contract audits and platform, TietoEVRY seeks to
            provide early detection of scams and share this knowledge freely and
            openly to the cryptocurrency community.
          </p>
        </header>
      </Section>
      <Section className="py-0">
        <h2 className="text-3xl lg:text-4xl font-black">
          TietoEVRY Corporation($TTEB) Token
        </h2>
        <div>
          <p className="mb-5">
            Anti-Scam utility, providing information and reviews to prevent rug
            pulls and scams. Fair launched on the Binance Smart Chain (Bep20)
            network on the 15th of November, 2021. It is a medium for
            transactions with smart coding that benefits holders with RFI static
            rewards. 2% of each transaction is deducted and redistributed to all
            $TTEB holders.
          </p>
          <div className="w-full mx-auto bg-gray-200 mb-5 flex justify-center items-center p-4">
            <StaticImage
              src="../images/dont-fall-for-scammers.png"
              alt="Danger zone"
              className="max-w-xs mx-auto"
              placeholder="blurred"
            />
          </div>
        </div>
        <p className="mb-5">
          Holders get passive income from reflections for live with our 2% tax
          redistributed to all holders. HOLD $TTEB and get more on each
          transaction even as the market value increases while the circulationg
          supply keeps decreasing with the burns.
        </p>
        <p className="mb-5">
          <b>Max. Total Supply - 100,000 TTEB</b>
        </p>
      </Section>

      <Section>
        <h2 className="text-3xl lg:text-4xl font-black">Burn</h2>
        <p className="mb-5">
          A portion of reflections on each transaction is sent to the burn
          wallet, never to be seen again. Join us as we build a safe and secure
          financial system.
        </p>
        <div className="w-full mb-5">
          <StaticImage
            src="../images/flaming-lamborghini.jpg"
            alt="A flaming lamborghini"
            placeholder="blurred"
          />
        </div>
        <div className="w-full">
          <a
            href="https://krytolite.rocks/swap?outputCurrency=0xc776400c2e53ad1731aacaf7c3f76e61236fa0e1"
            className="inline-block my-3 md:my-6"
            rel="noopener noreferrer"
          >
            <SolidButton label="Buy on Kryptolite Swap" />
          </a>
          <CopyToClipboard
            title="Contract Address"
            content="0xc776400c2e53ad1731aacaf7c3f76e61236fa0e1"
          />
        </div>
        <p>
          Please allow for 3% Slippage to cover the Tokenomics of 2% tax
          (Reflection to all holders)
        </p>
      </Section>
      <Section>
        <h2 className="text-3xl lg:text-4xl font-black">
          Lamborghini ($LAMBO) Token
        </h2>
        <p className="mb-5">
          One of the hottest things in the cryptocurrency world right now is
          GameFi, the combination of games and finance. The TietoEVRY team built
          the Lamborghini token to support blockchain games with
          economic incentives.
        </p>
        <div className="w-full mx-auto bg-gray-200 mb-5 flex justify-center items-center p-4">
          <StaticImage
            src="../images/lamborghini-gamepad.png"
            alt="Lamborghini Gamepad"
            className="max-w-xs mx-auto"
            placeholder="blurred"
          />
        </div>
        <p className="mb-5">
          LAMBO token holders can access unique "play-to-earn" games with
          unlimited earning potential.
        </p>
        <p>
          LAMBO has a 10% buy tax and an extra 15% sell tax split as follows:
          <br />
        </p>
        <ul className="list-inside list-disc">
          <li>
            <b>5% Liquidity</b>
          </li>
          <li>
            <b>3% Marketing</b>
          </li>
          <li>
            <b>
              2% TTEB buybacks which are automatically distributed to all LAMBO
              token holders
            </b>
          </li>
        </ul>
        <div className="w-full">
          <Link
            to="https://kryptolite.rocks/swap?outputCurrency=0xd83a832AD7202612FA53E0317DF685A5Df7cA8b8"
            className="inline-block my-3 md:my-6"
            rel="noopener noreferrer"
          >
            <SolidButton label="Buy on Kryptolite Swap" />
          </Link>
          <Link to="/defi-games" className="inline-block my-3 md:my-6">
            <SolidButton label="PLAY NOW" />
          </Link>
          <CopyToClipboard
            title="Contract Address"
            content="0xd83a832AD7202612FA53E0317DF685A5Df7cA8b8"
          />
        </div>
      </Section>
      <Section className="py-0">
        <SimpleTimeline />
      </Section>
    </Layout>
  );
}
