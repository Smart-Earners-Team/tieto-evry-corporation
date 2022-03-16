import React from "react";
import { useLocation } from "@reach/router";
import useToast from "./useToast";

// A custom hook that builds on useLocation to parse
// the query string for you.
export default function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const useCopyText = (text: string): (() => Promise<boolean>) => {
  const { toastInfo } = useToast();
  const copyText = async () => {
    if (navigator) {
      return navigator.clipboard
        .writeText(text)
        .then(() => true)
        .catch(() => false);
    } else {
      toastInfo(
        "Copy Text",
        "You can now copy the text to your clipboard: " + text
      );
      return Promise.resolve(true);
    }
  };
  return copyText;
};
