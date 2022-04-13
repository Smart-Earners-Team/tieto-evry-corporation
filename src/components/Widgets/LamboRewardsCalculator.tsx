import React, { useCallback, useEffect, useMemo, useState } from "react";
import cls from "classnames";
import SolidButton from "../Buttons/SolidButton";
import { RiCloseLine } from "react-icons/ri";
import BigNumber from "bignumber.js";

type FrequencySet = "d" | "m" | "y";
const multiplyingFactor = 24; // Recompound period (in hours)
export default function LamboRewardsCalculator({
  closeHandler,
}: {
  closeHandler: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("");
  const [activeFrequency, setActiveFrequency] = useState<FrequencySet>("d");
  const [rewards, setRewards] = useState("0");

  const handleAmountChange: React.FormEventHandler<HTMLInputElement> =
    useCallback(async (e) => {
      const val = e.currentTarget.value.replace(/,/g, ".");
      const pattern = /^[0-9]*[.,]?[0-9]*$/g;
      if (!pattern.test(val)) return;
      setAmount(val);
    }, []);

  const handleFrequencyChange: React.FormEventHandler<HTMLInputElement> =
    useCallback(async (e) => {
      const val = e.currentTarget.value;
      const pattern = /^[0-9]*$/g;
      if (!pattern.test(val)) return;
      setFrequency(val);
    }, []);

  const getMultiplyingFactor = useMemo(() => {
    switch (activeFrequency) {
      case "m":
        return 1 * 30; // Months
        break;
      case "y":
        return 1 * 365;
      default:
        return 1;
    }
  }, [activeFrequency]);

  useEffect(() => {
    // days are in multiples of 24 hrs.
    const amt = new BigNumber(amount);
    const freq = new BigNumber(frequency);

    if (!amt.isNaN() && !freq.isNaN()) {
      const factor = getMultiplyingFactor;
      const res = amt.times(freq).times(factor).times(0.03);
      setRewards(res.toJSON());
    } else {
      setRewards("0");
    }
  }, [amount, frequency, activeFrequency]);

  return (
    <div className="bg-white w-11/12 max-w-xs rounded-xl">
      <div className="relative text-xl font-medium text-center p-4">
        <button
          onClick={closeHandler}
          className="absolute top-4 right-4 p-1 bg-gray-50/40 inline-block rounded-full
            hover:bg-gray-100/90 cursor-pointer border"
        >
          <RiCloseLine className="h-8 w-8" />
        </button>
      </div>
      <div className="p-4">
        <div
          className="min-h-[50px] ring-2 ring-gray-300 flex justify-end items-end text-right
            p-1 mb-4 mt-5 text-xs text-gray-400"
        >
          <span>
            daily ROI:{" "}
            <b className="text-3xl font-mono text-gray-700">{rewards}</b>
          </span>
        </div>
        <TextInput
          error={false}
          onSelectMax={() => {}}
          onChangeHandler={handleAmountChange}
          value={amount}
          name="Amount"
          label="Amount to Invest in $LAMBO"
          symbol="$"
          isDisabled={false}
        />
        <TextInput
          error={false}
          onSelectMax={() => {}}
          onChangeHandler={handleFrequencyChange}
          value={frequency}
          name="Frequency"
          label="Compounding Frequency"
          isDisabled={false}
        />
        <div className="flex justify-center items-center my-4 w-full">
          <TimeFrameButton
            active={activeFrequency === "d"}
            time="Days"
            clickHandler={() => {
              setActiveFrequency("d");
            }}
          />
          <TimeFrameButton
            active={activeFrequency === "m"}
            time="Months"
            clickHandler={() => {
              setActiveFrequency("m");
            }}
          />
          <TimeFrameButton
            active={activeFrequency === "y"}
            time="Years"
            clickHandler={() => {
              setActiveFrequency("y");
            }}
          />
        </div>
      </div>
      <div className="text-xs bg-gray-100 p-1 text-center border-t">
        The LAMBO Rewards Calculator.
      </div>
    </div>
  );
}

interface TextInputProps {
  error: boolean;
  onSelectMax?: () => void;
  onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
  isDisabled: boolean;
  name: string;
  label: string;
  symbol?: string;
}

const TextInput = ({
  onChangeHandler,
  error,
  value,
  isDisabled,
  name,
  label,
  symbol,
}: TextInputProps) => {
  return (
    <div className="w-full my-3">
      <label htmlFor={name} className="block text-sm mb-1">
        {label}
      </label>
      <div className="relative w-full">
        <input
          type="number"
          className={cls(
            "placeholder-gray-500 outline-none border-none ring-1 ring-transparent text-base",
            "focus:ring-yellow-500 focus-within:ring-yellow-500 transition-all duration-200",
            "text-yellow-500 pl-4 pr-3 py-2 bg-gray-100 disabled:opacity-70 disabled:cursor-not-allowed",
            "block w-full",
            {
              ["focus:ring-red-500 focus-within:ring-red-500 text-red-400 bg-red-50"]:
                error,
            }
          )}
          placeholder={name}
          value={value}
          onChange={onChangeHandler}
          disabled={isDisabled}
          id={name}
        />
        {symbol !== undefined && (
          <span
            className="absolute left-1 top-1/2 -translate-y-1/2 text-base font-light
            text-gray-500"
          >
            {symbol}
          </span>
        )}
      </div>
    </div>
  );
};

interface TimeFrameButtonProps {
  time: string;
  clickHandler: () => void;
  active: boolean;
}
const TimeFrameButton = ({
  time,
  clickHandler,
  active: selected,
}: TimeFrameButtonProps) => (
  <SolidButton
    active={selected}
    title={time}
    onClick={clickHandler}
    className={cls("text-sm !p-1", {
      "!bg-yellow-600 !border-yellow-800": selected,
    })}
  >
    {time}
  </SolidButton>
);
