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

declare module "*.webm" {
  const value: any;
  export = value;
}

declare module "*.3gp" {
  const value: any;
  export = value;
}

declare module "*.avi" {
  const value: any;
  export = value;
}

declare module "*.flv" {
  const value: any;
  export = value;
}

declare module "*.mov" {
  const value: any;
  export = value;
}

declare module "*.ogg" {
  const value: any;
  export = value;
}
