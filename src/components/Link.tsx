import React from "react";
import { Link as GatsbyLink } from "gatsby";
import type { LocationState } from "../types";
import cls from "classnames";

export default function Link({
  children,
  to,
  activeClassName,
  partiallyActive,
  state,
  pageState,
  ...other
}: React.ComponentPropsWithoutRef<typeof GatsbyLink> & {
  pageState?: LocationState;
}) {
  const internal = /^\/(?!\/)/.test(to);

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <GatsbyLink
        to={to}
        activeClassName={cls(activeClassName)}
        partiallyActive={partiallyActive}
        state={pageState}
        {...other}
      >
        {children}
      </GatsbyLink>
    );
  }
  return (
    <a href={to} {...other}>
      {children}
    </a>
  );
}
