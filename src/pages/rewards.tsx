import React, { useCallback, useContext, useEffect, useState } from "react";
import { Heading } from "../components/Typography/Headings";
import Layout from "../components/Layouts";
import SEO from "../components/SEO";
import TokenBalanceCard from "../components/Cards/TokenBalanceCard";
import SolidButton from "../components/Buttons/SolidButton";
import ConnectWalletButton from "../components/Buttons/connectWalletButton";
import { RefreshContextProvider } from "../contexts/RefreshContext";
import { useAppContext } from "../hooks/useAppContext";
import { StaticImage } from "gatsby-plugin-image";
import {
  claimDividend,
  fetchTokenPrices,
  getUnpaidEarnings,
} from "../utils/calls";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import useToast from "../hooks/useToast";
import { lpTokenPairs, tokens } from "../config";
import { BIG_ONE, BIG_ZERO } from "../utils/bigNumber";
import BigNumber from "bignumber.js";
import { RefreshContext } from "../contexts/RefreshContext";
import Section from "../components/Layouts/Section";

export default function ContactPage() {
  return (
    <Layout>
      <SEO
        title="Claim rewards"
        description="Earn TietoEVRY Corporation (TTEB) token for free buy
        simply buying and HODLing Lamborghini (LAMBO) token. Claim your rewards from this Dapp anytime!"
      />
      <Section>
        <header>
          <Heading>Claim Rewards</Heading>
          <p className="my-5">
            Earn TietoEVRY Corporation (TTEB) token for free by simply buying
            and HODLing Lamborghini (LAMBO) token. Claim your rewards from this
            Dapp anytime!
          </p>
        </header>
        <RefreshContextProvider>
          <PageContent />
        </RefreshContextProvider>
      </Section>
    </Layout>
  );
}

const PageContent = () => {
  const [ttebRewards, setTTebRewards] = useState<string>("0.000");
  const [rewardsLoaded, setRewardsLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenPrices, setTokenPrices] = useState<
    Pick<{ [P in keyof typeof tokens]: string }, "bnb" | "lambo" | "tteb">
  >({
    bnb: "0.000",
    tteb: "0.000",
    lambo: "0.000",
  });

  const {
    ttebWallet: { active, error, balance: ttebBalance, lamboBalance },
  } = useAppContext();
  const { library, account } = useActiveWeb3React();
  const { toastError, toastSuccess } = useToast();
  const { fast, slow } = useContext(RefreshContext);
  // pull uer data async

  const pullUnpaidEarningsAsync = useCallback(async () => {
    if (library && active && account) {
      const earnings = await getUnpaidEarnings(account, library.getSigner());
      setTTebRewards(earnings);
      setRewardsLoaded(true);
    }
  }, [library, active, account]);

  const claimReward = useCallback(async () => {
    if (library && active && account) {
      setLoading(true);
      try {
        await claimDividend(library.getSigner());
        toastSuccess("Success", "Your rewards has been added to your account");
      } catch (error) {
        toastError(
          "Failed",
          "Please try again. Confirm the transaction and make sure you are paying enough gas!"
        );
      }
      setLoading(false);
    }
  }, [library, active, account]);

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
      bnbPriceBusd = BIG_ONE.times(tokenPriceVsQuote);
    }
    // TTEB/BNB pool
    if (ttebBnb) {
      const { tokenPriceVsQuote } = await fetchTokenPrices(ttebBnb);
      ttebPriceBusd = bnbPriceBusd.times(tokenPriceVsQuote);
    }
    // LAMBO/BNB
    if (lamboBnb) {
      const { tokenPriceVsQuote } = await fetchTokenPrices(lamboBnb);
      lamboPriceBusd = bnbPriceBusd.times(tokenPriceVsQuote);
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

  pullUnpaidEarningsAsync();

  const bnbValue = new BigNumber(tokenPrices.bnb).toFixed(3);
  const ttebvalue = new BigNumber(tokenPrices.tteb)
    .times(ttebBalance)
    .toFixed(3);

  const ttebRewardsvalue = new BigNumber(tokenPrices.tteb)
    .times(ttebRewards)
    .toFixed(3);

  const lamboValue = new BigNumber(tokenPrices.lambo)
    .times(lamboBalance)
    .toFixed(3);

  const noRewards = new BigNumber(ttebRewards).isLessThanOrEqualTo(0);

  return (
    <div className="w-full mx-auto py-6 rounded-lg mb-10">
      <div className="my-2 flex items-center">
        <div className="inline-block mx-2">
          <span className="text-sm text-gray-400">Current BNB price</span>
          <div className="text-2xl font-medium">
            <span className="text-xl">${bnbValue}</span> BNB
          </div>
        </div>
        <div className="inline-block ml-2">
          <div className="w-10 h-10">
            <StaticImage src="../images/bnb-logo.svg" alt="BNB" />
          </div>
        </div>
      </div>
      <div
        className="w-full flex flex-col items-center sm:flex-row sm:justify-center flex-wrap
        mb-5 gap-2 bg-gray-50/50 py-5"
      >
        <TokenBalanceCard
          symbol="TTEB"
          tokenBalance={ttebBalance}
          tokenPrice={ttebvalue}
          label="Your Balance"
          image={
            <StaticImage
              src="../images/tteb-logo-variant-2.png"
              alt="TTEB"
              layout="fullWidth"
              placeholder="blurred"
            />
          }
        />
        <TokenBalanceCard
          symbol="TTEB"
          tokenBalance={ttebRewards}
          tokenPrice={ttebRewardsvalue}
          label="Pending TTEB rewards"
          image={
            <StaticImage
              src="../images/tteb-logo-variant-1.png"
              alt="TTEB"
              layout="fullWidth"
              placeholder="blurred"
            />
          }
          className="!bg-primary-200/10"
        />
        <TokenBalanceCard
          symbol="LAMBO"
          tokenBalance={lamboBalance}
          tokenPrice={lamboValue}
          label="Your LAMBO balance"
          image={
            <StaticImage
              src="../images/lambo-logo.png"
              alt="LAMBO"
              layout="fullWidth"
              placeholder="blurred"
            />
          }
        />
      </div>
      {!active && (
        <div>
          <ConnectWalletButton className="block mx-auto" />
        </div>
      )}
      {active && !rewardsLoaded && (
        <div className="mx-auto text-center">Loading data...</div>
      )}
      {active && !error && rewardsLoaded && (
        <div className="mt-4 text-center">
          {noRewards ? (
            <div className="text-sm">No rewards to claim</div>
          ) : (
            <SolidButton
              disabled={loading}
              onClick={claimReward}
              className="block mx-auto"
            >
              {loading ? "Please wait..." : "Claim reward"}
            </SolidButton>
          )}
        </div>
      )}
    </div>
  );
};
