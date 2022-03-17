import React from "react";
import { Router, RouteComponentProps } from "@reach/router";
import { navigate } from "gatsby";
import { gamesIdMap } from "../../config/constants/games";
import { isAddress } from "ethers/lib/utils";

/* This is a client only route.
  It renders the ReferralLinkChecker component when the url matches
  /me/1/0x6604F82696B1523bAACBc62d377a75ac5a5fD516 */

export default function ReferralMapper() {
  return (
    <Router basepath="/me">
      <ReferralLinkChecker path="/:gameId/:account" />
      <Default path="/" />
    </Router>
  );
}

function Default(_props: { path: string }) {
  navigate("/404");
  return null;
}

function ReferralLinkChecker(props: RouteComponentProps) {
  const { gameId, account } = props as typeof props & {
    gameId: keyof typeof gamesIdMap;
    account: string;
  };
  const gamePage = gamesIdMap[gameId];
  if (gamePage !== undefined && isAddress(account)) {
    navigate(`${gamePage.path}?ref=${account}`);
  } else {
    navigate("/404");
  }
  return null;
}
