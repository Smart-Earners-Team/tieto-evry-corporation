import React from "react";
import Section from "./Layouts/Section";

interface GamesNavProps {
  shortName: string;
  tokenBalance: string;
}
export default function GamesNav({ shortName, tokenBalance }: GamesNavProps) {
  return (
    <Section
      containerClass="bg-white shadow sticky !py-0"
      className="flex justify-between !py-3 items-center my-0"
    >
      <div className="hidden sm:block shrink-0 font-medium text-amber-600">
        {shortName}
      </div>
      <div className="space-x-4 text-base w-full flex justify-between sm:justify-end items-center">
        <div className="inline-block text-primary-500 font-medium text-lg">
          {tokenBalance} <b>LAMBO</b>
        </div>
      </div>
    </Section>
  );
}
