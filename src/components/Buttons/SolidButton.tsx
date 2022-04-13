import React from "react";
import type { ButtonProps } from "../../types";
import cls from "classnames";

export default function SolidButton({
  className,
  label,
  active,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cls(
        `rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg hover:shadow-xl
       bg-blue-700 hover:bg-blue-600 border-blue-800 hover:border-blue-700 
       text-white disabled:cursor-not-allowed disabled:opacity-80 transition-all duration-300`,
        className
      )}
      {...props}
      title={label}
    >
      {children || label}
    </button>
  );
}
