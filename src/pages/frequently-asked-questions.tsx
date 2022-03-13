import React from "react";
import { Heading } from "../components/Typography/Headings";
import Layout from "../components/Layouts";
import SEO from "../components/SEO";
import CopyToClipboard from "../components/Tools/CopyToClipboard";
import Link from "../components/Link";
import FaqAccordion from "../components/Tools/FaqAccordion";
import Section from "../components/Layouts/Section";

const questionsAndAnswers = [
  {
    question: "Why is an audit important in crypto?",
    answer: `Anyone with some coding skills can create a project and a digital token to raise
        millions of dollars within minutes and instantly disappear with everybody's fund.
        There are very few regulations in the crypto space. This is why it is important for investors to
        see that a project has been properly reviewed in every aspect by a security company in order to
        ensure that they won't lose their hard-earned money.`,
  },
  {
    question: "What aspects of a project do you review?",
    answer: (
      <>
        <p>
          Our audit report covers every aspect of a project that will allow an
          investor to make an informed decision before investing.
        </p>
        <br />
        <p>Here is what we evaluate:</p>
        <ol className="list-decimal list-inside space-y-3 lg:space-y-6 mt-3">
          <li>
            <b>Team:</b> The first thing we do is ask the team important
            questions like overall plans, location, experience, etc. If they are
            doxxed, we review their social media presence. If not, they can opt
            for our private doxxing services (KYC) that will allow them to
            remain anonymous.
          </li>
          <li>
            <b>Website and social media:</b> We look at the project's website
            and look for key things that would raise concerns, like age of
            domain registration, grammatical errors, lack of important content,
            mobile-friendliness etc. We also evaluate all social media accounts
            and look for fake followers/comments and overall activity. This is
            usually a good indicator of a malicious project.
          </li>
          <li>
            <b>Technical audit:</b> We do a straight-forward technical audit to
            look for common vulnerabilities in the smart contract. We also
            analyze top wallets as well as the team wallets to raise any flags
            of possible dumping.
          </li>
        </ol>
      </>
    ),
  },
  {
    question: "Can you help me launch my token?",
    answer: `Yes, we offer launching and strategic services as well in exchange for
      either a set fee or a percentage of the team's wallet. This includes strategy,
      marketing, Telegram admin services during launch, promotional assets and token
      launch.`,
  },
  {
    question: "How long does it take for an audit to get done?",
    answer: `Depending on the level of workload we are experiencing at the time,
      it usually gets done within 48 hours. There are precipitate options if you wold
      like to get it sooner than that.`,
  },
  {
    question: `Does every project get the "TietoEVRY Certificate of Trust" NFT?`,
    answer: `No, we only award the NFT to projects that score over 90/100 in our score system.
      Even then, there is a slight chance of a project to do something malicious to hurt their
      investors.`,
  },
  {
    question: "What about KYCs?",
    answer: (
      <>
        <p>
          A lot of the times, investors may lack trust in a project when they
          are not seeing a face behind it. This is where KYCs (Know Your
          Customer) come into place. It is a way of privately identifying
          (Doxxing) team members and ensuring that the developers are legit and
          have good intentions. Our KYC services allow you to still remain
          anonymous while you prove to your community that there is a real team
          behind the project.
        </p>
        <p className="mt-3 text-lg">
          <b>Note:</b> we would never reveal your identities unless required by
          authorities in the case of a crime commited by the team. We understand
          the security risks of being fully public at the beginning of a crypto
          project in a decentralized environment.
        </p>
      </>
    ),
  },
  {
    question:
      "Will you be launching your own token? If so, what utility will it have?",
    answer: (
      <>
        <p>
          Yes, we already have two(2) tokens that are part of a network of
          trusted projects with the following utilities:
        </p>
        <p>
          <b>For Investors:</b> TTEB holders get access to a network of current
          SAFU projects as well as upcoming projects that are heavily audited to
          ensure that they will be 99% safe to invest in. There will also be
          tools that will help you check if a token that was not certified by us
          is safe.
        </p>
        <CopyToClipboard
          title="Contract address"
          content="0xc776400c2e53ad1731aacaf7c3f76e61236fa0e1"
        />
        <p>
          We would be building a plethora of DeFi games around the $LAMBO token.
          Only LAMBO holders can access the games and more.
        </p>
        <CopyToClipboard
          title="Contract address"
          content="0x1A82C2A3fD8BE1793ed8648F2df6B2B415EA81f8"
        />
        <p>
          <b>For Project Owners:</b> If you are certified by us, your project
          will be added to our network of safe projects that will be seen by
          thousands of potential investors. Other tools that can be used by
          project owners are: an easy-to-use liquidity locker as well as
          advertising opportunities to reach a bigger audience. More information
          on the{" "}
          <Link to="/ecosystem" className="underline text-xl text-blue-400">
            ecosystem
          </Link>{" "}
          page.
        </p>
      </>
    ),
  },
  {
    question: "What are your rates?",
    answer: (
      <>
        <p>
          We only charge in cryptocurrency. (Pay with our platform token TTEB and
          get a discount).
        </p>
        <ul className="space-y-3 lg:space-y-6 list-disc list-inside my-3">
          <li>
            Full Audit Report: 2BNB (4-day delivery), 3BNB (3-day delivery) and
            4BNB (2-day delivery).
          </li>
          <li>
            "Certificate of Trust" NFT + Promotion: For those projects that pass
            our audit, we offer a unique certificate NFT and promotion on our
            social pages for an additional 1BNB.
          </li>
          <li>KYC's cost 3 BNB (Approx. $1200)</li>
          <li>
            Launching: it varies depending on the stage of the project. For more
            info,{" "}
            <Link to="/contact-us" className="underline text-xl text-blue-400">
              contact us
            </Link>{" "}
          </li>
        </ul>
        <p className="text-lg">
          <b>NOTE:</b> All our services include promotional posts in all our
          social media platforms.
        </p>
      </>
    ),
  },
  {
    question: "I'm ready to work with you. How do I contact you?",
    answer: (
      <>
        You can contact our team at hello@tteb.finance or by joining our
        official Telegram group{" "}
        <a
          href="https://t.me/TTEBfinance"
          rel="no-referrer no-follow"
          className="underline text-xl text-blue-400"
        >
          https://t.me/TTEBfinance
        </a>
      </>
    ),
  },
  {
    question: "Ready to certify your project?",
    answer: "Our 24/7 team is always available!",
  },
];

export default function FaqPage() {
  return (
    <Layout>
      <SEO
        title="Frequently Asked Questions"
        description="A list of questions and answers relating to TietoEVRY Corporation,
         the TietoEVRY token, Lamborghini token and smart contract security and audits."
      />
      <Section>
        <header>
          <Heading>Frequently Asked Questions</Heading>
        </header>
        <FaqAccordion
          faqs={questionsAndAnswers}
          expandedUuids={["why_is_an_audit_important_in_crypto"]}
        />
      </Section>
    </Layout>
  );
}
