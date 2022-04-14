import React from "react";
import cls from "classnames";
import type { ButtonProps } from "../../types";

export default function GameButton({
  className,
  label,
  active,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cls(
        "m-1 shadow-md hover:shadow-lg disabled:shadow-none rounded-full ring-yellow-700",
        "ring-2 px-2 py-1 text-yellow-700 font-bold text-sm",
        "bg-yellow-500 hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
      {...props}
    >
      {children || label}
    </button>
  );
}
