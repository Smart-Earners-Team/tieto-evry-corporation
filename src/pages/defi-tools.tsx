import React from "react";
import { Heading } from "../components/Typography/Headings";
import Layout from "../components/Layouts";
import SEO from "../components/SEO";
import Section from "../components/Layouts/Section";
import { StaticImage } from "gatsby-plugin-image";

export default function DefiToolsPage() {
  return (
    <Layout>
      <SEO
        title="Defi Tools"
        description='A collection of "The Best DeFi Resources" to jumpstart your crypto journey.
            Discover dApps and other vast income-earning opportunities for DeFi traders.'
      />
      <Section>
        <header>
          <Heading>Defi Tools</Heading>
          <p className="mb-5">
            A collection of "The Best DeFi Resources" to jumpstart your crypto
            journey. Discover dApps and other vast income-earning opportunities
            for DeFi traders.
          </p>
        </header>
      </Section>
      <Section>
        <div className="w-full mx-auto bg-gray-100 mb-5 flex justify-center items-center p-4">
          {/* <StaticImage
            src="https://alternative.me/crypto/fear-and-greed-index.png"
            alt="Latest Crypto Fear & Greed Index"
            className="max-w-xs mx-auto"
            placeholder="blurred"
          /> */}
          image
        </div>
      </Section>
    </Layout>
  );
}
