import React from "react";

export interface TokenBalanceCardProps {
  label: string;
  symbol: string;
  tokenBalance: string;
  tokenPrice?: string;
  image: React.ReactNode;
  className?: string;
}

function TokenBalanceCard({
  label,
  symbol,
  tokenBalance,
  tokenPrice,
  image,
  className,
}: TokenBalanceCardProps) {
  return (
    <div
      className={`bg-gray-100 rounded-2xl shadow-md w-full m-2 max-w-[250px] ${className}`}
    >
      <div className="bg-white w-full p-4">{image}</div>
      <div className="block p-4">
        <div className="text-lg font-medium text-gray-600 mb-3">{label}</div>
        <div className="text-base font-medium text-gray-800">
          {tokenBalance} <span className="text-xl">{symbol}</span>
        </div>
        {tokenPrice && (
          <div className="text-primary text-base font-medium">${tokenPrice}</div>
        )}
      </div>
    </div>
  );
}

export default React.memo(TokenBalanceCard);
