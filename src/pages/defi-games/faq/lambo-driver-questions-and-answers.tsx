import React from "react";
import Layout from "../../../components/Layouts";
import Section from "../../../components/Layouts/Section";
import SEO from "../../../components/SEO";
import FaqAccordion from "../../../components/Tools/FaqAccordion";
import { Heading } from "../../../components/Typography/Headings";
import type { QuestionsAndAnswers } from "../../../config/types";

const questionsAndAnswers: QuestionsAndAnswers[] = [
  {
    question: "What happens when my purse becomes full?",
    answer: `Your drivers will continue to earn even when your car park is full.
        The yield will still continue and you will get the 3% of your total investment worth for that day.`,
  },
  {
    question: "Can I withdraw my investments back?",
    answer: `Once a driver is hired you cannot fire him. They will continue to earn LAMBO for you
        indefinitely, providing you with an unlimited amount of income per day up to 3%.`,
  },
  {
    question: "Are there any fees?",
    answer: `The only fees that the players will pay are the transaction gas fees, charged by the
        BSC network and not the developers or the project. The developer fee is already included in
        the price of the token and the drivers.`,
  },
  {
    question: "When is the best time to hire a driver?",
    answer: `Anytime! No matter when you hire a driver, you will begin earning a return rate of 3% daily.
      Take note that the cost of hiring a driver will change every day, so you may earn more than 3%.`,
  },
  {
    question: "How often should I reinvest to hire more drivers?",
    answer: `We recommend that you reinvest your income at least once a day but the investor is free to
        do it as often as they wish or to follow any other strategy of their own. You can try reinvesting
        for 2 straight days and withdraw your earnings on the third day, or reinvest for 5 straight days
        and withdraw your yield on the 6th day.`,
  },
  {
    question: "How is the Lamborghini Drivers game sustainable?",
    answer: `Driver Jake is sustained by the continued community support, just as every other crypto coin,
        token or project. The difference is that the Lamborghini Driver game contract contains measures to
        discourage investors dumping their coins on the market and crashing the price.`,
  },
  {
    question: "How to use Driver Jake on my phone?",
    answer: `You can either use an app with a dApp browser and choose the wallet connect option or
        simply use any browser that you want and choose WalletConnect to connect to your wallet's
        app on your phone.`,
  },
  {
    question: "Is it better to reinvest or sell my earnings?",
    answer: `In the long run, reinvesting your earnings will be more profitable than selling your
        earnings since you'll have the chance to multiply the number of your drivers with the use of
        your earnings. By multiplying the number of drivers working for you, you’re multiplying your
        everyday profits.`,
  },
  {
    question: "How do referrals work?",
    answer: `Once your BSC wallet is connected to the Lamborghini Driver dapp, you will notice your
        referral address appear at the bottom of the page. When a new user buys a driver after clicking
        your personal referral link, the contract will send a LAMBO value equal to 10% of his purchase
        instantly to your purse. After that, you’re free to use that earnings to hire more drivers and
        improve your daily income from the dApp or just sell the yield.`,
  },
  {
    question: "How the system works",
    answer: (
      <div className="space-y-6">
        <p>
          Let’s say you hire 6000 drivers at 1000 LAMBO. If the price stays the
          same, you would earn 3% that day.
        </p>
        <p>
          If you hire 6000 drivers at a 1000 LAMBO price, and the next day the
          driver price falls down to 3000 drivers per 1000 LAMBO, that day you
          will earn 9%.
        </p>
        <p>
          If you hire 6000 drivers for 1000 LAMBO and the next day the price of
          9000 drivers becomes 1000 LAMBO, that day you will earn 3%.
        </p>
        <p>
          When you hire a driver (any time is good to enter) and you start
          generating 3% daily at the time of purchase, from there the price of
          drivers will fluctuate depending on the amount of purchases of drivers
          and the amount of withdrawals.
        </p>
        <p>
          If you only dedicate yourself to withdrawing your earnings and never
          reinvesting, in the long run it will hurt your earnings. The value of
          drivers will rise and you will need more of them to keep up with the
          earnings - your hired drivers will be producing less overtime.
        </p>
        <p>
          If you reinvest your earnings instead and keep increasing the number
          of drivers, you will add a percentage to your daily percentage or keep
          it.
        </p>
        <p>
          The secret here is to add the largest number of drivers to withstand
          the drivers inflation over time and continue to revalue your driver
          and from time to time withdraw your earnings.
        </p>
        <p>
          It is advisable to reinvest for 3 days and withdraw 1 day after that,
          or to keep reinvesting for 6 days reinvestment and withdraw your
          earnings the last day of the week.
        </p>
        <p>
          We encourage you to come up with a comfortable strategy to get profit
          or to simply dedicate yourself to reinvesting and increasing the
          quantity of your drivers.
        </p>
        <p>
          Even if your daily earnings are less than 3%, each time you reinvest,
          your new drivers start generating a 3% of yield again, since you
          bought at the current price of the drivers that day.
        </p>
        <p>
          The drivers that you already bought can recover their value if they go
          back up to the price you bought them at, but in general, with
          reinvestments you can guarantee yourself a constant cycle of 3 to 9%
          daily profits (it can be more or less in the worst or best case).
        </p>
        <p>
          Keep in mind that If people start withdrawing and panic selling, the
          contract will protect itself, reducing the price of drivers faster
          which will result in the decrease of the daily earnings to make it
          sustainable over time. Once the price stabilizes again we will start a
          new cycle, with the cheapest driver and with it, the value of the
          driver will rise again and with it, the daily profits.
        </p>
        <p>
          It is an incredibly perfect mathematical algorithm that will be
          sustainable over time despite yielding an incredible 3% of daily
          profits. It's everyone's job to take care of driver Jake - it’s a tool
          that can provide an amazing passive income to everyone for a long
          time.
        </p>
      </div>
    ),
  },
  {
    question: "Sustainability",
    answer: (
      <div className="space-y-6">
        <p>
          The LamborghiniDrivers smart contract is rug free and immutable,
          meaning there are no functions that devs can use to drain or change
          its operations.
        </p>
        <p>
          The probability of the contract balance becoming zero is highly
          unlikely due to our 3% maximum daily return and considering that many
          users are regularly compounding their daily returns for larger future
          profits.
        </p>
      </div>
    ),
  },
];

export default function LamborghiniDriverFaqPage() {
  return (
    <Layout>
      <SEO
        title="Questions and Answers About The Lamborghini Driver"
        description="A list of questions and answers relating to TietoEVRY Corporation,
         the TietoEVRY token, Lamborghini token and smart contract security and audits."
      />
      <Section>
        <header>
          <Heading>Questions and Answers About The Lamborghini Driver</Heading>
        </header>
        <FaqAccordion
          faqs={questionsAndAnswers}
          expandedUuids={["what_happens_when_my_purse_becomes_full"]}
        />
      </Section>
    </Layout>
  );
}
