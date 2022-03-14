/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    isMetaMask?: true;
    request?: (...args: any[]) => Promise<void>;
    send: unknown;
    enable: () => Promise<string[]>;
    on?: (method: string, listener: (...args: any[]) => void) => void;
    removeListener?: (
      method: string,
      listener: (...args: any[]) => void
    ) => void;
  };
  BinanceChain?: {
    bnbSign?: (
      address: string,
      message: string
    ) => Promise<{ publicKey: string; signature: string }>;
  };
}

declare module '*.webm' {
  const value: any;
  export = value;
}