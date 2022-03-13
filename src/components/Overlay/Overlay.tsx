import React, { useEffect } from "react";

interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const BodyLock = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return null;
};

export const Overlay = ({ className, ...props }: OverlayProps) => {
  return (
    <>
      <BodyLock />
      <div
        className={`fixed inset-0 w-full h-full bg-black/40 backdrop-blur-sm -z-10 ${className}`}
        role="presentation"
        {...props}
      />
    </>
  );
};

export default Overlay;
