import React, { useEffect, useState, createContext, useContext } from "react";
import { lpTokenPairs, tokens } from "../config";
import { BIG_ZERO, BIG_ONE } from "../utils/bigNumber";
import { fetchTokenPrices } from "../utils/calls";
import { RefreshContext } from "./RefreshContext";

type TokenPriceContext = Pick<
  { [P in keyof typeof tokens]: string },
  "bnb" | "lambo" | "tteb"
>;

const defaultValues: TokenPriceContext = {
  bnb: "0",
  tteb: "0",
  lambo: "0",
};

export const TokenPriceContextProvider =
  createContext<TokenPriceContext>(defaultValues);

export default function TokenPriceContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tokenPrices, setTokenPrices] = useState(defaultValues);
  const { fast, slow } = useContext(RefreshContext);

  const fetchPrices = async () => {
    let bnbPriceBusd = BIG_ZERO,
      ttebPriceBusd = BIG_ZERO,
      lamboPriceBusd = BIG_ZERO;

    const bnbBusd = lpTokenPairs.find(
      (pair) => pair.lpSymbol === "BNB-BUSD LP"
    );
    const ttebBnb = lpTokenPairs.find(
      (pair) => pair.lpSymbol === "TTEB-BNB LP"
    );
    const lamboBnb = lpTokenPairs.find(
      (pair) => pair.lpSymbol === "LAMBO-BNB LP"
    );

    // BNB/BUSD pool
    if (bnbBusd) {
      const { tokenPriceVsQuote } = await fetchTokenPrices(bnbBusd);
      if (tokenPriceVsQuote === "NaN") {
        bnbPriceBusd = BIG_ONE.times(0);
      } else {
        bnbPriceBusd = BIG_ONE.times(tokenPriceVsQuote);
      }
    }
    // TTEB/BNB pool
    if (ttebBnb) {
      const { tokenPriceVsQuote } = await fetchTokenPrices(ttebBnb);
      if (tokenPriceVsQuote === "NaN") {
        ttebPriceBusd = bnbPriceBusd.times(0);
      } else {
        ttebPriceBusd = bnbPriceBusd.times(tokenPriceVsQuote);
      }
    }
    // LAMBO/BNB
    if (lamboBnb) {
      const { tokenPriceVsQuote } = await fetchTokenPrices(lamboBnb);
      if (tokenPriceVsQuote === "NaN") {
        lamboPriceBusd = bnbPriceBusd.times(0);
      } else {
        lamboPriceBusd = bnbPriceBusd.times(tokenPriceVsQuote);
      }
    }
    
    setTokenPrices({
      bnb: bnbPriceBusd.toJSON(),
      tteb: ttebPriceBusd.toJSON(),
      lambo: lamboPriceBusd.toJSON(),
    });
  };

  useEffect(() => {
    fetchPrices();
  }, [fast, slow]);

  return (
    <TokenPriceContextProvider.Provider
      value={{
        ...tokenPrices,
      }}
    >
      {children}
    </TokenPriceContextProvider.Provider>
  );
}
