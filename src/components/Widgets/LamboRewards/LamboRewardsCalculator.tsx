import React, { useCallback, useMemo, useState } from "react";
import cls from "classnames";
import SolidButton from "../../Buttons/SolidButton";
import useModal from "../../Modal/useModal";
import RewardsTableModal from "./RewardsTableModal";
import GameButton from "../../Buttons/GameButton";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { BigNumber } from "bignumber.js";

export default function LamboRewardsCalculator({
  closeHandler,
}: {
  closeHandler: () => void;
}) {
  const [deposit, setDeposit] = useState("");
  const [onPresentTableModal] = useModal(
    <RewardsTableModal
      closeHandler={closeHandler}
      initialDeposit={new BigNumber(deposit)}
    />,
    false,
    false
  );

  const handleDepositChange: React.FormEventHandler<HTMLInputElement> =
    useCallback(async (e) => {
      const val = e.currentTarget.value.replace(/,/g, ".");
      const pattern = /^[0-9]*[.,]?[0-9]*$/g;
      if (!pattern.test(val)) return;
      setDeposit(val);
    }, []);

  const handleCalculate = useMemo(() => {
    const dep = new BigNumber(deposit);
    if (!dep.isNaN() && dep.isFinite()) {
      return onPresentTableModal;
    } else {
      return () => {};
    }
  }, [deposit]);

  return (
    <div className="bg-white w-11/12 max-w-sm rounded-xl">
      <ModalHeader closeHandler={closeHandler} />
      <div className="px-4">
        <div className="mb-5">
          <div className="font-medium">How to Use The Calculator</div>
          <ol className="block list-decimal list-inside text-sm text-gray-600">
            <li>Enter your initial deposit</li>
            <li>Click on Calculate</li>
          </ol>
        </div>
        <TextInput
          error={false}
          onSelectMax={() => {}}
          onChangeHandler={handleDepositChange}
          value={deposit}
          name="0.00"
          label="Initial Deposit to Invest"
          symbol="$"
          isDisabled={false}
        />
        <p className="my-3 text-sm">You get 3% Daily ROI</p>
        <div>
          <GameButton onClick={handleCalculate} className="m-0 w-full block">
            Calculate
          </GameButton>
        </div>
      </div>
      <ModalFooter />
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
      <label htmlFor={name} className="block text-sm mb-1 text-gray-600">
        {label}
      </label>
      <div className="relative w-full">
        <input
          type="number"
          className={cls(
            "placeholder-gray-500 outline-none border-none ring-1 ring-transparent text-sm",
            "focus:ring-yellow-500 focus-within:ring-yellow-500 transition-all duration-200",
            "text-gray-600 pl-4 pr-3 py-2 bg-gray-100 disabled:opacity-70 disabled:cursor-not-allowed",
            "block w-full border",
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
          <span className="absolute left-1 top-1/2 -translate-y-1/2 text-base text-gray-500 font-bold">
            {symbol}
          </span>
        )}
      </div>
    </div>
  );
};
