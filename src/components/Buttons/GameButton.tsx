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
        "p-2 m-1 shadow-lg hover:shadow-xl rounded-lg",
        "bg-amber-600 hover:bg-amber-500 text-white disabled:cursor-not-allowed disabled:opacity-80",
        className
      )}
      {...props}
    >
      {children || label}
    </button>
  );
}