import { useContext } from "react";
import { TokenPriceContextProvider } from "../contexts/TokenPriceContext";

export const useTokenPrices = () => useContext(TokenPriceContextProvider);
