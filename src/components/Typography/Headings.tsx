import React from "react";

interface HeadingProps extends React.ComponentProps<"h1"> {}
export const Heading = ({ children, className, ...rest }: HeadingProps) => {
  return (
    <h1 className={`font-bold sm:font-black my-6 ${className}`} {...rest}>
      {children}
    </h1>
  );
};

export const Subheading = ({ title }: { title: string }) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};
