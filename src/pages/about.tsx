import React from "react";
import { Heading, Subheading } from "../components/Typography/Headings";
import Layout from "../components/Layouts";
import {
  FaChartLine,
  FaComment,
  FaDesktop,
  FaHdd,
  FaObjectGroup,
  FaPaperPlane,
} from "react-icons/fa";
import SEO from "../components/SEO";

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

const ourTeam = [
  {
    id: 1,
    heading: "Mark P. Williams",
    body: (
      <span>
        VP, Auditor <br /> Cyber Security Consultant
      </span>
    ),
  },
  {
    id: 2,
    heading: "Ikem Hood",
    body: <span>VP, Business Development</span>,
  },
  {
    id: 3,
    heading: "Emperor Isaac",
    body: (
      <span>
        VP, Auditor <br /> Blockchain Developer
      </span>
    ),
  },
  {
    id: 4,
    heading: "King Asillion",
    body: <span>Special Adviser</span>,
  },
];

interface IconBoxProps extends React.ComponentProps<"div"> {
  icon?: JSX.Element;
  heading: string;
  body: React.ReactNode;
}

const IconBox = ({ icon, heading, body, className }: IconBoxProps) => {
  let Icon: JSX.Element | undefined;
  if (icon) {
    Icon = React.cloneElement(icon, {
      className: "w-10 h-10 flex-shrink-0 text-white",
    });
  }
  return (
    <div className="flex w-full max-w-sm sm:max-w-md md:max-w-xs my-5">
      {Icon}
      <div className={`flex-grow text-left px-6 text-white ${className}`}>
        <h3 className="font-medium text-xl mb-2">{heading}</h3>
        <p className="font-light">{body}</p>
      </div>
    </div>
  );
};

export default function AboutPage() {
  return (
    <Layout>
      <SEO
        title="About Us"
        description="Audit any solidity based blockchain (eth, bsc, ftm, polygon, etc). Get your audit
			today with our super fast processing time and keep your investors happy."
      />
      <header className="text-center">
        <Heading>About Us</Heading>
      </header>
      <div className="w-full my-10">
        <Subheading title="What we do" />
        <div className="flex flex-wrap justify-center sm:px-20 md:p-0">
          {whatWeDo.map((item) => (
            <IconBox
              key={item.id}
              icon={item.icon}
              heading={item.heading}
              body={item.body}
            />
          ))}
        </div>
      </div>
      <div className="w-full my-10">
        <Subheading title="Our team" />
        <div className="flex flex-wrap justify-center sm:px-20 md:p-0">
          {ourTeam.map((member) => (
            <IconBox
              key={member.id}
              heading={member.heading}
              body={member.body}
              className="text-center md:text-left"
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
