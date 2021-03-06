import React from "react";
import cls from "classnames";

interface FabIconProps extends React.ComponentProps<"div"> {
  disabled?: boolean;
}
export default function FabIcon({
  className,
  children,
  disabled,
  ...props
}: FabIconProps) {
  return (
    <div
      className={cls(
        "rounded-full py-2 m-1 transition-colors duration-150 w-12 h-12 inline-flex ring-1",
        "ring-gray-100 justify-center items-center bg-white shadow-md hover:bg-gray-100 cursor-pointer",
        "text-blue-600",
        className,
        {"cursor-not-allowed opacity-40": disabled}
      )}
      {...props}
    >
      {children}
    </div>
  );
}
