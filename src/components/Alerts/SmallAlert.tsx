import React, { useState } from "react";
import classnames from "classnames";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    message: string;
    delay?: number;
    toggle: ((state: boolean) => void | ((prev: boolean) => boolean));
    error?: boolean;
    success?: boolean;
  }
 
const ErrorAlert = ({ text }: {text: string}) => {
  return (
    <div className="alert flex flex-row items-center bg-red-200 p-2 rounded border-b-2 border-red-300">
      <div className="flex items-center bg-red-100 border-2 border-red-500 justify-center h-8 w-8 flex-shrink-0 rounded-full">
        <span className="text-red-500">
          <svg fill="currentColor"
             viewBox="0 0 20 20"
             className="h-6 w-6">
            <path fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
          </svg>
        </span>
      </div>
      <div className="alert-content ml-2">
        <div className="alert-title font-semibold text-base text-red-800">
          Error
        </div>
        <div className="alert-description text-sm text-red-600">
          {text}
        </div>
      </div>
    </div>
  );
}

const SuccessAlert = ({ text }: {text: string}) => {
  return (
    <div className="alert flex flex-row items-center bg-green-200 p-2 rounded border-b-2 border-green-300">
      <div className="alert-icon flex items-center bg-green-100 border-2 border-green-500 justify-center h-8 w-8 flex-shrink-0 rounded-full">
        <span className="text-green-500">
          <svg fill="currentColor"
             viewBox="0 0 20 20"
             className="h-6 w-6">
            <path fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"></path>
          </svg>
        </span>
      </div>
      <div className="alert-content ml-2">
        <div className="alert-title font-semibold text-base text-green-800">
          Success
        </div>
        <div className="alert-description text-sm text-green-600">
          {text}
        </div>
      </div>
    </div>
  );
}

export default  function SmallAlert({toggle, message, className, success, error, ...props}: AlertProps) {  
    const timmerDelay = props.delay || 3000;
  
    setTimeout(() => {
      toggle(false);
    }, timmerDelay);

    if(success) {
      return <SuccessAlert text={message} />
    } else if(error) {
      return <ErrorAlert text={message} />
    } else {return <div />}
  }
