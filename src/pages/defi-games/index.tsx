import React from "react";
import { Heading } from "../../components/Typography/Headings";
import Layout from "../../components/Layouts";
import SEO from "../../components/SEO";
import Section from "../../components/Layouts/Section";
import GameCard from "../../components/Cards/GamesCard";
import { StaticImage } from "gatsby-plugin-image";

export default function DefiGamesPage() {
  return (
    <Layout>
      <SEO
        title="Defi Games"
        description="Lamborghini games is BSC's number one play-to-earn (P2E) DeFi game.
         Find out how to earn LAMBO token by completing quests and farming liquidity pools."
      />
      <Section>
        <header>
          <Heading>Defi Games</Heading>
          <p className="my-5">
            Lamborghini games is BSC's number one play-to-earn (P2E) DeFi game.
            Find out how to earn LAMBO token by completing quests and farming
            liquidity pools.
          </p>
        </header>
      </Section>
      <Section className="mb-10 flex flex-col md:flex-row items-center md:items-start md:justify-between
        md:space-x-2">
        <GameCard
          avaliable
          name="Lamborghini Driver"
          slug="lamborghini-driver"
          image={
            <StaticImage
              src="../../images/games/lamborghini-driver.png"
              alt="TTEB"
              layout="fullWidth"
              placeholder="blurred"
            />
          }
          description={`Jake is a skilled Lamborghini Driver who transports Royals and Celebrities.
            Now he's looking to grow his business by hiring more of his fellow lamborghini drivers!

            Each driver Jake hires brings fresh clients and income to the table which can be sold for
            $LAMBO. Once you hire a driver, he will be working for you and bring you daily passive income. The yield can be reinvested to hire more drivers and compound your earnings or sold.
          `}
        />
        <GameCard
          avaliable={false}
          name="TTEB Bandits"
          slug="#"
          image={
            <StaticImage
              src="../../images/games/tteb-bandits-cover.png"
              alt="TTEB Bandit"
              layout="fullWidth"
              placeholder="blurred"
            />
          }
          description="Is the next cool game. Keep in expectation of it!"
        />
      </Section>
    </Layout>
  );
}
