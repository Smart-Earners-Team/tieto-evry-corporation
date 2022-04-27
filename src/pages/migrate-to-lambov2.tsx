import React, { useCallback, useContext, useEffect, useState } from "react";
import { Heading } from "../components/Typography/Headings";
import Layout from "../components/Layouts";
import SEO from "../components/SEO";
import TokenBalanceCard from "../components/Cards/TokenBalanceCard";
import SolidButton from "../components/Buttons/SolidButton";
import ConnectWalletButton from "../components/Buttons/connectWalletButton";
import { useAppContext } from "../hooks/useAppContext";
import { StaticImage } from "gatsby-plugin-image";
import {
  checkTokenAllowance,
  getTokenBalance,
  upgradeLambo,
} from "../utils/calls";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import useToast from "../hooks/useToast";
import BigNumber from "bignumber.js";
import { RefreshContext } from "../contexts/RefreshContext";
import Section from "../components/Layouts/Section";
import { isMainNet } from "../utils";
import { getLamboV1Contract, getTCoinContract } from "../utils/contractHelpers";
import useApproveToken from "../hooks/useApproveToken";
import {
  getLamboUpgraderAddress,
  getLamboV1Address,
} from "../utils/addressHelpers";

export default function ContactPage() {
  return (
    <Layout>
      <SEO
        title="Migrate To Lamborghini 2.0"
        description="LAMBO, as you may be aware, has recently been upgraded to version
        2.0. Use this page to transfer your funds to the new version and
        reap the rewards of HODLing $LAMBO."
      />
      <Section>
        <header>
          <Heading>Migrate To Lamborghini 2.0</Heading>
          <p className="my-5">
            In order to serve you better, we are revamping the Lamborghini token
            to better suit our games. Use this page to upgrade your previous
            tokens to Lamborghini 2.0
          </p>
        </header>
        <PageContent />
      </Section>
    </Layout>
  );
}

const PageContent = () => {
  const [allowance, setAllowance] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [balLoaded, setBalLoaded] = useState<boolean>(false);
  const [lamboBalance, setLamboBalance] = useState("0");

  const {
    ttebWallet: { active, error },
  } = useAppContext();
  const { library, account } = useActiveWeb3React();
  const { toastError, toastSuccess } = useToast();
  const { fast, slow } = useContext(RefreshContext);
  const { onApprove } = useApproveToken(
    getLamboV1Contract(library?.getSigner()),
    getLamboUpgraderAddress()
  );

  useEffect(() => {
    (async () => {
      if (library && active && account) {
        // On testnet, we are using tCoin
        const onMainnet = isMainNet();
        const contract = onMainnet
          ? getLamboV1Contract(library.getSigner())
          : getTCoinContract(library.getSigner());
        // const decimals = onMainnet ? 18 : 8;
        const decimals = 18;

        const lambo = await getTokenBalance(contract, account, decimals);
        setLamboBalance(lambo);
        setBalLoaded(true);
      }
    })();
    // also add the fast and slow vars from the refresh context
  }, [library, active, account, fast, slow]);

  // Check user allowance
  useEffect(() => {
    (async () => {
      if (account && active && library) {
        const allowance = await checkTokenAllowance(
          getLamboUpgraderAddress(),
          account,
          getLamboV1Address(),
          library.getSigner()
        );
        if (allowance.isGreaterThan(0)) {
          setAllowance(true);
        } else {
          setAllowance(false);
        }
      } else {
        setAllowance(false);
      }
    })();
  }, [account, active, library]);

  const handleApprove = useCallback(async () => {
    if (account && library) {
      try {
        setLoading(true);
        const contract = getLamboV1Contract(library.getSigner());
        await contract.approveMax(getLamboUpgraderAddress());
        setAllowance(true);
      } catch (e) {
        toastError(
          "Error",
          "Please try again. Confirm the transaction and make sure you are paying enough gas!"
        );
      } finally {
        setLoading(false);
      }
    }
  }, [onApprove, account, library, toastError]);

  const moveFundsAround = useCallback(async () => {
    if (library && active && account) {
      setLoading(true);
      try {
        await upgradeLambo(library.getSigner());
        toastSuccess("Success");
      } catch (error: any) {

        toastError(
          "Failed",
          "Please try again. Confirm the transaction and make sure you are paying enough gas!" + error.message
        );
      }
      setLoading(false);
    }
  }, [library, active, account]);

  const noAssets = new BigNumber(lamboBalance).isLessThanOrEqualTo(0);

  const renderApprovalOrGameButtons = () => {
    return allowance ? (
      noAssets ? (
        <div className="text-sm text-center mx-auto">No Tokens to Migrate</div>
      ) : (
        <SolidButton
          disabled={loading}
          onClick={moveFundsAround}
          className="block mx-auto"
        >
          {loading ? "Please wait..." : "Upgrade to 2.0"}
        </SolidButton>
      )
    ) : active ? (
      <SolidButton
        disabled={loading}
        onClick={handleApprove}
        className="block mx-auto"
      >
        {loading ? "Please wait..." : "Enable Contract"}
      </SolidButton>
    ) : (
      <ConnectWalletButton className="mx-auto block border-none !shadow-none" />
    );
  };

  return (
    <div className="w-full mx-auto py-6 rounded-lg mb-10">
      <div
        className="w-full flex flex-col items-center sm:flex-row sm:justify-center flex-wrap
        mb-5 gap-2 bg-gray-50/50 py-5"
      >
        <TokenBalanceCard
          symbol="LAMBO v1"
          tokenBalance={lamboBalance}
          label="Your LAMBO v1 Balance"
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

      {active && !error && !balLoaded && (
        <div className="mx-auto text-center">Loading data...</div>
      )}
      {renderApprovalOrGameButtons()}
    </div>
  );
};
