import React from "react";
import { BiCheckDouble } from "react-icons/bi";
import { RiTimerLine } from "react-icons/ri";

type TimelineContent = { text: string; checked?: boolean };
const roadMap = [
  {
    id: 1,
    label: "Q4 - 2021",
    content: [
      { text: "Website launched", checked: true },
      {
        text: "Token launched with 2% tokenomics redistributed to all holders including the burn address.",
        checked: true,
      },
      {
        text: "Smart Contract reviews and risk rating for DeFi tokens.",
        checked: true,
      },
    ],
  },
  {
    id: 2,
    label: "Q1 - 2022",
    content: [
      { text: "Smart Contract Audits", checked: true },
      { text: "Release first GameFi application", checked: true  },
      { text: "Coinmarketcap listing" },
      { text: "CoinGecko listing" },
    ],
  },
  {
    id: 3,
    label: "Q2 - 2022",
    content: [
      { text: "Website scam tracking utility updates" },
      { text: "Development team growth" },
      { text: "Start of NFT creator" },
    ],
  },
  {
    id: 4,
    label: "Q3/Q4 - 2022",
    content: [
      {
        text: "The TietoEVRY Corporation Team will continue to focus on research development in scam tracking utilities.",
      },
      {
        text: "The team is ambitious about expanding its ECOSYSTEM into other areas which includes an NFT platform and TietoEVRY Wallet, listing tokens that have acceptable risk ratings, and also building our own social network.",
      },
    ],
  },
];

type ListsProps = { items: TimelineContent[] };
const Lists = ({ items }: ListsProps) => {
  return (
    <ul className="text-sm text-gray-900 text-opacity-100">
      {items.map((n, i) => {
        const completed = n.checked ? (
          <div className="inline-block bg-green-500/20 rounded-full p-1.5">
            <BiCheckDouble className="text-green-500 h-4 w-4" />
          </div>
        ) : (
          <div className="inline-block bg-gray-500/20 rounded-full p-1.5">
            <RiTimerLine className="text-gray-500 h-4 w-4" />
          </div>
        );
        let cls = "font-light text-base my-2 flex items-center";
        if (n.checked) cls += " text-green-500 font-medium";
        return (
          <li key={i} className={cls}>
            {completed}
            <p className="ml-2">{n.text}</p>
          </li>
        );
      })}
    </ul>
  );
};

interface TimelineLeafProps {
  label: string;
  content: TimelineContent[];
}

const LeftLeaf = ({ label, content }: TimelineLeafProps) => {
  return (
    <div
      className="mb-8 flex flex-col items-center w-full flex-wrap lg:flex-row-reverse
      lg:justify-between"
    >
      {label}
      <div className="w-5/12 bg-gray-300 h-1 mb-2 lg:mb-0"></div>
      <div className="bg-gray-100 rounded-lg shadow-lg w-full max-w-xs p-4">
        <Lists items={content} />
      </div>
    </div>
  );
};

const RightLeaf = ({ label, content }: TimelineLeafProps) => {
  return (
    <div
      className="mb-8 flex flex-col items-center w-full flex-wrap lg:flex-row
      lg:justify-between"
    >
      <div className="order-1 w-5/12 bg-gray-300 h-1 mb-2 lg:mb-0"></div>
      {label}
      <div className="order-1 bg-gray-100 rounded-lg shadow-lg w-full lg:w-5/12 pl-6 py-4">
        <Lists items={content} />
      </div>
    </div>
  );
};

const isOdd = (n: number) => n % 2 !== 0;

export default function SimpleTimeline() {
  return (
    <div className="mx-auto w-full px-2">
      <h2 className="text-3xl lg:text-4xl my-8 font-black">Roadmap</h2>
      <div className="relative wrap overflow-hidden py-10 px-3 h-full">
        {roadMap.map((item) => {
          return isOdd(item.id) ? (
            <RightLeaf
              key={item.id}
              label={item.label}
              content={item.content}
            />
          ) : (
            <LeftLeaf key={item.id} label={item.label} content={item.content} />
          );
        })}
      </div>
    </div>
  );
}
