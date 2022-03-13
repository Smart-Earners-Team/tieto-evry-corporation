import React from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaRegTimesCircle } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import clx from "classnames";
import { alertVariants } from "./";

export interface AlertProps extends React.ComponentPropsWithRef<"div"> {
  title: string;
  type?: typeof alertVariants[keyof typeof alertVariants];
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({type = "info", title, children, onClick, ...props }, ref) => {
    const info = type === "info",
    success = type === "success",
    error = type === "error",
    warn = type === "warning";

  return (
    <div
      className={clx(
        "fixed right-4 transition duration-300 flex max-w-sm mb-4 font-sans rounded-md",
        {
          "bg-teal-200": info,
          "bg-red-300": error,
          "bg-green-300": success,
          "bg-yellow-200": warn,
        }
      )}
      ref={ref}
      {...props}
    >
      <div
        className={clx("w-14 flex-none flex justify-center items-center", {
          "bg-teal-500": info,
          "bg-red-400": error,
          "bg-green-500": success,
          "bg-yellow-500": warn,
        })}
        onClick={onClick}
      >
        <div className="p-2">
          {info && <AiOutlineWarning className="h-8 w-8" />}
          {warn && <RiErrorWarningLine className="h-8 w-8" />}
          {error && <FaRegTimesCircle className="h-8 w-8" />}
          {success && <FiCheckCircle className="h-8 w-8" />}
        </div>
      </div>
      <div className="w-auto text-gray-800 items-center p-2">
        <span className="text-lg font-bold pb-4">{title}</span>
        <p className="leading-tight text-sm">{children}</p>
      </div>
    </div>
  );
});

export default Alert;