import { useCallback } from "react";
import { ethers, Contract } from "ethers";
import { useCallWithGasPrice } from "./useCallWithGasPrice";

const useApproveToken = (spenderContract: Contract, tokenAddress: string) => {
  const { callWithGasPrice } = useCallWithGasPrice();
  const handleApprove = useCallback(async () => {
    try {
      const tx = await callWithGasPrice(spenderContract, "approve", [
        tokenAddress,
        ethers.constants.MaxUint256,
      ]);
      const receipt = await tx.wait();
      return receipt.status;
    } catch (error) {
      // console.error(error);
      return;
    }
  }, [tokenAddress, spenderContract, callWithGasPrice]);

  return { onApprove: handleApprove };
};

export default useApproveToken;
