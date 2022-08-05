import React from "react";
import Footer from "../components/Layouts/Footer";
import SolidButton from "../components/Buttons/SolidButton";
import SEO from "../components/SEO";
import Section from "../components/Layouts/Section";
import { IconBaseProps } from "react-icons";
import { GiLockedChest } from "react-icons/gi";
import { GoTools } from "react-icons/go";
import {
  FaDesktop,
  FaPaperPlane,
  FaChartLine,
  FaObjectGroup,
  FaHdd,
  FaComment,
  FaGamepad,
} from "react-icons/fa";
import LandingPageHeader from "../components/Layouts/Headers/LandingPageHeader";
import Link from "../components/Link";
import OurPartnersSection from "../components/SharedSection/OurPartnersSection";

const featureSummary = [
  {
    icon: (props?: IconBaseProps) => <GiLockedChest {...props} />,
    heading: "Claim Rewards",
    summary:
      "Earn TTEB for free by simply buying and HODLing LAMBO. Claim your rewards here anytime!",
    link: "/rewards",
  },
  {
    icon: (props?: IconBaseProps) => <FaGamepad {...props} />,
    heading: "Defi Games",
    summary:
      "Find out how to earn LAMBO by completing quests and farming liquidity pools.",
    link: "/defi-games",
  },
  {
    icon: (props?: IconBaseProps) => <GoTools {...props} />,
    heading: "Defi Tools",
    summary:
      "Discover dApps and other vast income earning opportunities for DeFi traders.",
    link: "defi-tools",
  },
];

const whatWeDo = [
  {
    id: 1,
    icon: <FaDesktop />,
    heading: "Smart Contract Auditing",
    body: "We have multiple developers on board to offer smart contract audits.",
  },
  {
    id: 2,
    icon: <FaPaperPlane />,
    heading: "Multi Chain",
    body: "One size fits all. We can audit any solidity based chain (eth, bsc, ftm, polygon, etc).",
  },
  {
    id: 3,
    icon: <FaChartLine />,
    heading: "Fast Turnaround",
    body: "Get your audit today with our super fast processing time. We have auditors available around the clock.",
  },
  {
    id: 4,
    icon: <FaObjectGroup />,
    heading: "Streamlined Process",
    body: "Book an audit YOUR way. Whether you want to contact us via email or telegram, we're here to help.",
  },
  {
    id: 5,
    icon: <FaHdd />,
    heading: "Technical Background",
    body: "With programmers on board, we are ready to take on any task.",
  },
  {
    id: 6,
    icon: <FaComment />,
    heading: "Marketing",
    body: "Audits provide an exceptional marketing expense that keeps your investors happy.",
  },
];

// markup
const IndexPage = () => {
  return (
    <div className="w-full overflow-auto flex flex-col justify-between">
      <SEO />
      <main>
        <LandingPageHeader
          header="TietoEVRY Corporation"
          description={`Audit any solidity based blockchain (eth, bsc, ftm, polygon, etc) smart contract.
            Get your audit today with our super fast processing time and keep your investors happy.`}
        />
        <Section noPadding={false}>
          <h2 className="md:mr-auto text-center md:text-left">
            We deliver very carefully
          </h2>
          <div className="flex flex-col sm:flex-row sm:flex-wrap w-full">
            {whatWeDo.map((item) => (
              <IconBox
                key={item.id}
                icon={item.icon}
                heading={item.heading}
                body={item.body}
              />
            ))}
          </div>
        </Section>
        <Section noPadding={false} containerClass="bg-gray-50" className="text-center md:text-left">
            <h2 className="max-w-xl mx-auto md:mr-auto md:ml-0">
              Feature an Audit
            </h2>
            <p className="max-w-xl text-gray-500 mb-10 mx-auto md:mr-auto md:ml-0">
              Want to get maximum exposure for your project? Why not feature it
              so it'll be pinned to the top spot, increasing your click-through
              rate and leads.
            </p>
            <Link to="/contact-us">
              <SolidButton className="md:block">
                Contact us today
              </SolidButton>
            </Link>
        </Section>
        <Section noPadding={false}>
          <h2 className="text-center">Also Explore</h2>
          <div
            className="flex flex-col items-center md:flex-row md:justify-between md:gap-6
            md:items-stretch space-y-10 md:space-y-0"
          >
            {featureSummary.map((summary) => (
              <Link key={summary.link} to={summary.link} className="inline-block">
                <FeatureSummaryCard
                  key={summary.heading}
                  icon={summary.icon}
                  heading={summary.heading}
                  text={summary.summary}
                />
              </Link>
            ))}
          </div>
        </Section>
        <OurPartnersSection />
        <Section noPadding={false}>
          <div className="mx-auto rounded-3xl px-4 sm:px-10 py-16 bg-blue-600">
            <p className="text-white text-center md:text-2xl">
              Buy and HOLD Lamborghini (LAMBO) token and earn TietoEVRY
              Corporation (TTEB) token for free. Claim your rewards from this
              Dapp anytime! Buy
            </p>
            <div
              className="mt-10 flex flex-col sm:flex-row sm:justify-center items-center sm:space-x-10
              space-y-5 sm:space-y-0"
            >
              <Link
                to="https://kryptolite.rocks/swap?outputCurrency=0xc776400c2e53ad1731aacaf7c3f76e61236fa0e1"
                rel="nofollow noopener"
                target="_blank"
              >
                <SolidButton>Buy $TTEB</SolidButton>
              </Link>
              <Link
                to="https://kryptolite.rocks/swap?outputCurrency=0xd83a832AD7202612FA53E0317DF685A5Df7cA8b8"
                rel="nofollow noopener"
                target="_blank"
              >
                <SolidButton>Buy $LAMBO</SolidButton>
              </Link>
              <Link to="/rewards">
                <SolidButton>Claim Reward</SolidButton>
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

interface FeatureSummaryProps {
  icon: (props?: IconBaseProps) => JSX.Element;
  heading: string;
  text: string;
}
const FeatureSummaryCard = ({ icon, heading, text }: FeatureSummaryProps) => {
  return (
    <div
      className="mx-auto text-center max-w-xs p-4 shadow-md rounded-3xl inline-block
        bg-white hover:bg-gray-50 transition-colors duration-200 h-full"
    >
      <div className="bg-blue-300/30 h-20 w-20 mx-auto flex justify-center items-center rounded-full">
        {icon({ className: "w-10 h-10 text-blue-500" })}
      </div>
      <div className="my-1 text-2xl !font-medium">{heading}</div>
      <p className="text-gray-500">{text}</p>
    </div>
  );
};

interface IconBoxProps extends React.ComponentProps<"div"> {
  icon?: JSX.Element;
  heading: string;
  body: React.ReactNode;
}

const IconBox = ({ icon, heading, body, className }: IconBoxProps) => {
  let Icon: JSX.Element | undefined;
  if (icon) {
    Icon = React.cloneElement(icon, { className: "w-8 h-8 text-blue-500" });
  }
  return (
    <div className="inline-flex w-full max-w-sm sm:max-w-md md:max-w-xs my-5 mx-auto">
      <div>
        <div className="bg-blue-300/30 h-16 w-16 mx-auto flex justify-center items-center rounded-full">
          {Icon}
        </div>
      </div>
      <div className={`flex-grow text-left px-6 ${className}`}>
        <h3 className="font-medium text-xl mb-2 text-gray-800">{heading}</h3>
        <p className="font-light text-gray-500 text-base">{body}</p>
      </div>
    </div>
  );
};
export default IndexPage;
