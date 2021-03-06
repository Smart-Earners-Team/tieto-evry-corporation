import React, { useCallback, useEffect, useMemo, useState } from "react";
import GamesNav from "../../components/GamesNav";
import Layout from "../../components/Layouts";
import Section from "../../components/Layouts/Section";
import cls from "classnames";
import { IoMdClose } from "react-icons/io";
import FabIcon from "../../components/Icons/FabIcon";
import GameButton from "../../components/Buttons/GameButton";
import { StaticImage } from "gatsby-plugin-image";
import LamboDriverVideo from "../../components/Tools/LamboDriverVideo";
import {
  buyDriver,
  compoundIncome,
  getDriverCounts,
  getIncome,
  sellLamborghini,
} from "../../utils/calls/games";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { RefreshContextProvider } from "../../contexts/RefreshContext";
import useToast from "../../hooks/useToast";
import { useAppContext } from "../../hooks/useAppContext";
import BigNumber from "bignumber.js";
import { PageProps } from "gatsby";
import { checkTokenAllowance } from "../../utils/calls";
import { getGameShareLink, isMainNet } from "../../utils";
import {
  getTCoinAddress,
  getLamboAddress,
  getLamboDriverAddress,
} from "../../utils/addressHelpers";
import {
  getTCoinContract,
  getLamboContract,
} from "../../utils/contractHelpers";
import useApproveToken from "../../hooks/useApproveToken";
import ConnectWalletButton from "../../components/Buttons/connectWalletButton";
import SolidButton from "../../components/Buttons/SolidButton";
import Link from "../../components/Link";
import CopyToClipboard from "../../components/Tools/CopyToClipboard";
import SEO from "../../components/SEO";
import useModal from "../../components/Modal/useModal";
import LamboRewardsCalculator from "../../components/Widgets/LamboRewards/LamboRewardsCalculator";
import useModalContext from "../../hooks/useModalContext";

// tCoin on testnet
const onMainet = isMainNet();
const tokenAddress = onMainet ? getLamboAddress() : getTCoinAddress();
const approveTokenContract = onMainet ? getLamboContract : getTCoinContract;

export default function LamboGamePage({ path }: PageProps) {
  const [drivers, setDrivers] = useState(0);
  const [income, setIncome] = useState("0.00");
  // Sell income to LAMBO call
  const [selling, setSelling] = useState(false);
  // Buy driver input
  const [buying, setBuying] = useState(false);
  // CompoundIncome
  const [compounding, setCompounding] = useState(false);
  const [amountToPay, setAmountToPay] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [requestedApproval, setRequestedApproval] = useState(false);

  const [wave, setWave] = useState(true);
  const letChiefWave = useCallback(() => setWave(true), []);
  const thanksChief = useCallback(() => setWave(false), []);

  const {
    ttebWallet: { lamboBalance },
    refAddress,
    triggerFetchTokens,
  } = useAppContext();
  const { library, active, account } = useActiveWeb3React();
  const { toastError, toastSuccess } = useToast();
  const { onApprove } = useApproveToken(
    approveTokenContract(library?.getSigner()),
    getLamboDriverAddress()
  );

  // Calculator Modal
  const { onDismiss } = useModalContext();
  const [onPresentCalculator] = useModal(
    <LamboRewardsCalculator closeHandler={onDismiss} />
  );

  // Read users functions here
  useEffect(() => {
    (async () => {
      if (library != null && active && account != null) {
        // get drivers count
        const driverCount = await getDriverCounts(library.getSigner());
        // get Income
        const income = await getIncome(account, library.getSigner());
        setDrivers(driverCount);
        setIncome(income);
      } else {
        setDrivers(0);
        setIncome("0.00");
      }
    })();
  }, [library, active, account, buying, compounding, selling]);

  // Check user allowance
  useEffect(() => {
    (async () => {
      if (account != null && active && library != null) {
        const allowance = await checkTokenAllowance(
          getLamboDriverAddress(),
          account,
          tokenAddress,
          library.getSigner()
        );
        if (allowance.isGreaterThan(0)) {
          setIsApproved(true);
        } else {
          setIsApproved(false);
        }
      } else {
        setIsApproved(false);
      }
    })();
  }, [account, active, library, isApproved]);

  const handleSellIncome = useCallback(async () => {
    if (library) {
      setSelling(true);
      try {
        await sellLamborghini(library.getSigner());
        toastSuccess("Success", "Lambo has purchased your earnings.");
        triggerFetchTokens();
      } catch (err) {
        // console.error(err);
        toastError(
          "Error",
          "Something went wrong while trying to sell your income"
        );
      } finally {
        setSelling(false);
      }
    }
  }, [library]);

  const handleCompoundIncome = useCallback(async () => {
    if (account && library) {
      setCompounding(true);
      try {
        await compoundIncome(refAddress, library.getSigner());
        toastSuccess("Success", "Your earnings have been compounded");
      } catch (err) {
        // console.error(err);
        toastError(
          "Error",
          "Something went wrong while trying to compound your income"
        );
      } finally {
        setCompounding(false);
      }
    }
  }, [account, library, refAddress]);

  const handleInputChange: React.FormEventHandler<HTMLInputElement> =
    useCallback(
      async (e) => {
        const val = e.currentTarget.value.replace(/,/g, ".");
        const pattern = /^[0-9]*[.,]?[0-9]{0,18}$/g;
        if (!pattern.test(val)) return;
        setAmountToPay(val);
      },
      [setAmountToPay]
    );

  const handleSelectMax = useCallback(() => {
    const bal = new BigNumber(lamboBalance);
    const frac = bal.times("0.999").toFixed(18);
    setAmountToPay(frac);
  }, [lamboBalance]);

  const inputHasError = new BigNumber(amountToPay).isGreaterThan(lamboBalance);

  const handleBuyDriver = useCallback(async () => {
    if (
      new BigNumber(amountToPay).isNaN() ||
      new BigNumber(amountToPay).isLessThanOrEqualTo(0) ||
      inputHasError
    )
      return;

    if (library) {
      setBuying(true);
      try {
        await buyDriver(amountToPay, library.getSigner(), refAddress);
        toastSuccess(
          "Congratulations!",
          `You've successfully purchased some drivers, 
          and we're confident that your customers will enjoy the ride as you earn money.`
        );
        setAmountToPay("");
        triggerFetchTokens();
      } catch (err) {
        // console.error(err);
        toastError(
          "Error",
          "Something went wrong while trying to process your request."
        );
      } finally {
        setBuying(false);
      }
    }
  }, [library, amountToPay, refAddress, inputHasError]);

  const handleApprove = useCallback(async () => {
    if (account && library) {
      try {
        setRequestedApproval(true);
        await onApprove();
        setIsApproved(true);
      } catch (e) {
        toastError(
          "Error",
          "Please try again. Confirm the transaction and make sure you are paying enough gas!"
        );
        setIsApproved(false);
      } finally {
        setRequestedApproval(false);
      }
    }
  }, [onApprove, account, library, toastError]);

  const canStart = useCallback(
    () => isApproved && drivers > 0,
    [drivers, isApproved, account, active, library]
  );

  const shareUrl = useMemo(() => {
    const prefix = "https://tteb.finance";
    // Return normal long link if the user is not connected to the wallet
    if (account) {
      return `${prefix + getGameShareLink(path) + account}`;
    } else {
      return prefix + path;
    }
  }, [account, path]);

  const renderApprovalOrGameButtons = () => {
    return isApproved ? (
      <React.Fragment>
        <GameButton
          onClick={handleCompoundIncome}
          disabled={compounding}
          className="block sm:inline-block mx-auto sm:mx-0"
        >
          Compound Income
        </GameButton>
        <GameButton
          onClick={handleSellIncome}
          disabled={selling}
          className="block sm:inline-block mx-auto sm:mx-0"
        >
          Sell income to LAMBO
        </GameButton>
      </React.Fragment>
    ) : active ? (
      <React.Fragment>
        <div className="text-xs mb-2 font-bold text-gray-400 text-center">
          Enable Lamborghini to Begin Playing
        </div>
        <GameButton
          disabled={requestedApproval}
          onClick={handleApprove}
          className="mt-2 mx-auto block"
        >
          {requestedApproval ? "Enabling..." : "Click to Enable"}
        </GameButton>
      </React.Fragment>
    ) : (
      <ConnectWalletButton className="mx-auto block border-none !shadow-none" />
    );
  };

  return (
    <Layout>
      <SEO
        title="Lamborghini Driver Game"
        description={`Jake is a skilled Lamborghini Driver who transports Royals and Celebrities.
            Now he's looking to grow his business by hiring more of his fellow lamborghini drivers!
            Each driver Jake hires brings fresh clients and income to the table which can be sold for
            $LAMBO. Once you hire a driver, he will be working for you and bring you daily passive income.
            The yield can be reinvested to hire more drivers and compound your earnings or sold.
          `}
      />
      <RefreshContextProvider>
        <GamesNav
          shortName="The Lamborghini Driver"
          tokenBalance={lamboBalance}
        />
        <Section className="!pt-0 !px-0 lg:!px-16 m-0 max-w-screen-xl flex justify-center">
          <ChiefDriverWave visible={wave} closeHandler={thanksChief} />
          <div className="w-full lg:w-2/3 lg:inline-block lg:float-right lg:max-w-2xl">
            <LamboDriverVideo
              letChiefWave={letChiefWave}
              shareLink={shareUrl}
              canStartEngine={canStart}
              openCalculator={onPresentCalculator}
            />
            <div className="flex flex-col relative w-full">
              <div className="flex justify-between items-center px-5 space-x-3">
                <MetricChip
                  text="Number of Drivers"
                  value={drivers.toFixed()}
                  unit=""
                  className="text-gray-600"
                />
                <MetricChip
                  text="Income"
                  unit="LAMBO"
                  value={income}
                  className="text-amber-500"
                />
              </div>
              <div className="m-2 p-5 shadow-md mt-5 mb-8 space-y-4 rounded-3xl">
                <TextInput
                  value={amountToPay}
                  onChangeHandler={handleInputChange}
                  onSelectMax={handleSelectMax}
                  error={inputHasError}
                  isDisabled={!isApproved}
                />
                <div className="flex justify-between items-start">
                  <GameButton
                    onClick={handleBuyDriver}
                    disabled={
                      inputHasError ||
                      buying ||
                      !isApproved ||
                      amountToPay.length === 0
                    }
                  >
                    {buying ? "processing..." : "Hire Driver"}
                  </GameButton>
                  <div className="w-2/3 inline-block float-right max-w-xs">
                    <StaticImage
                      src="../../images/games/black-stationary-lambo.png"
                      alt=""
                      layout="fullWidth"
                      placeholder="blurred"
                    />
                  </div>
                </div>
              </div>
              <div
                className="space-y-5 sm:space-y-0 sm:space-x-3 sm:flex sm:justify-center
                sm:items-center"
              >
                {renderApprovalOrGameButtons()}
              </div>
            </div>
          </div>
        </Section>
      </RefreshContextProvider>
      <div className="clear-both mb-8" />
      <Section className="mb-10">
        <p>
          Earn 10% of the $LAMBO used to buy drivers from anyone who uses your
          referral link.
        </p>
        <CopyToClipboard
          title="Share Your Referral Link"
          content={
            account == null
              ? "Connect your wallet to see your referral address"
              : shareUrl
          }
          canCopy={account != null}
        />
        <Link
          to="/defi-games/faq/lambo-driver-questions-and-answers"
          className="text-sky-600 underline font-medium hover:text-sky-500 transition-colors
            duration-200"
        >
          Read the answers to some of the most frequently asked questions
          regarding The Lamborghini Driver
        </Link>
        .
      </Section>
    </Layout>
  );
}

interface MetricChipProps {
  text: string;
  value: string;
  unit: string;
  className?: string;
}
const MetricChip = ({ text, value, unit, className }: MetricChipProps) => {
  return (
    <div className={cls("font-medium py-2 text-base", className)}>
      {text}
      <div className="font-bold mt-0">
        {value}
        <b className="ml-2">{unit}</b>
      </div>
    </div>
  );
};

interface TextInputProps {
  error: boolean;
  onSelectMax?: () => void;
  onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
  isDisabled: boolean;
}

const TextInput = ({
  onChangeHandler,
  onSelectMax,
  error,
  value,
  isDisabled,
}: TextInputProps) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        className={cls(
          "placeholder-gray-300 outline-none border-none ring ring-transparent font-bold",
          "focus:ring-yellow-500 focus-within:ring-yellow-500 transition-all duration-200",
          "text-yellow-500 px-3 py-2 bg-gray-100 disabled:opacity-70 disabled:cursor-not-allowed",
          {
            ["focus:ring-red-500 focus-within:ring-red-500 text-red-400 bg-red-50"]:
              error,
          }
        )}
        placeholder="value"
        value={value}
        onChange={onChangeHandler}
        disabled={isDisabled}
      />
      <SolidButton
        onClick={onSelectMax}
        className="ml-2 disabled:!opacity-40 disabled:cursor-not-allowed border-none !shadow-none
          text-sm !p-1"
        disabled={isDisabled}
      >
        Max
      </SolidButton>
    </div>
  );
};

interface ChiefDriverProps {
  visible: boolean;
  closeHandler: () => void;
}
const ChiefDriverWave = ({ visible, closeHandler }: ChiefDriverProps) => {
  const waveClass = "visible";
  const byeClass = "invisible w-0 h-0";
  useEffect(() => {
    if (visible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [visible]);

  return (
    <React.Fragment>
      <div
        className={cls(
          "fixed max-w-2xl mx-auto inset-3 bg-white z-50 transition-all duration-75 shadow-lg",
          "border overflow-y-auto",
          {
            [waveClass]: visible,
            [byeClass]: !visible,
          }
        )}
      >
        <div className={cls("p-6", { ["hidden"]: !visible })}>
          <div className="flex justify-between items-center">
            <h1 className="text-slate-800 lg:text-3xl">How to get started?</h1>
            <FabIcon
              onClick={closeHandler}
              className="!text-yellow-700 cursor-pointer shrink-0"
            >
              <IoMdClose className="w-8 h-8" />
            </FabIcon>
          </div>
          <div className="space-y-3 text-sm">
            <p>
              Jake is a skilled Lamborghini Driver who transports Royals and
              Celebrities. Now he's looking to grow his business by hiring more
              of his fellow lamborghini drivers!
            </p>
            <p>
              Each driver Jake hires brings fresh clients and income to the
              table which can be sold for $LAMBO. Once you hire a driver, he
              will be working for you and bring you daily passive income.
            </p>
            <p>
              The yield can be reinvested to hire more drivers and compound your
              earnings or sold.
            </p>
            <p>
              To get started with the game, fill in how many LAMBO worth of
              drivers you want to hire and click '
              <strong className="text-yellow-400">hire driver</strong>'.
            </p>
            <p>
              The yield earning has been started and your driver will start
              earning income for you right away.
            </p>
          </div>
          <StaticImage
            src="../../images/games/lamborghini-driver.png"
            alt="Lamborghini chief driver"
            layout="fullWidth"
            placeholder="blurred"
          />
        </div>
      </div>
      <div
        className={cls(
          "fixed inset-0 bg-black bg-opacity-20 cursor-pointer z-40",
          {
            hidden: !visible,
            block: visible,
          }
        )}
        onClick={closeHandler}
      />
    </React.Fragment>
  );
};
