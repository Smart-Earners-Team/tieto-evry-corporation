import React from "react";

export interface Address {
  97?: string;
  56: string;
}

export interface LpTokenPair {
  id: number;
  lpSymbol: string;
  lpAddresses: Address;
  token: Address;
  quoteToken: Address;
}

export interface QuestionsAndAnswers {
  question: string;
  answer: React.ReactNode;
}
