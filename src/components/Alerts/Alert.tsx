import React from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import { FiCheckCircle } from "react-icons/fi";
import clx from "classnames";
import { alertVariants } from "./";
import { FaTimes } from "react-icons/fa";

export interface AlertProps extends React.ComponentPropsWithRef<"div"> {
  title: string;
  type?: typeof alertVariants[keyof typeof alertVariants];
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ type = "info", title, children, onClick, ...props }, ref) => {
    const info = type === "info",
      success = type === "success",
      error = type === "error",
      warn = type === "warning";

    return (
      <div
        className={clx(
          "fixed right-4 transition-all duration-300 flex items-center max-w-sm mb-4 font-sans px-2 shadow",
          "rounded",
          {
            "bg-teal-50": info,
            "bg-red-50": error,
            "bg-green-50": success,
            "bg-yellow-50": warn,
          }
        )}
        ref={ref}
        {...props}
      >
        <div
          className={clx("w-12 h-12 flex-none flex justify-center items-center rounded-full", {
            "text-teal-500 bg-teal-100": info,
            "text-red-400 bg-red-100": error,
            "text-green-500 bg-green-100": success,
            "text-yellow-500 bg-yellow-100": warn,
          })}
          onClick={onClick}
        >
          {info && <AiOutlineWarning />}
          {warn && <RiErrorWarningLine />}
          {error && <FaTimes />}
          {success && <FiCheckCircle />}
        </div>
        <div className="w-auto text-gray-800 items-center p-2">
          <div className="text-lg font-medium">{title}</div>
          <p className="leading-tight text-sm font-light">{children}</p>
        </div>
      </div>
    );
  }
);

export default Alert;
