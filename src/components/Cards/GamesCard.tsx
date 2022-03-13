import React from "react";
import { BsQuestion } from "react-icons/bs";
import Link from "../Link";

interface GameCardProps {
  name: string;
  slug: string;
  description: string;
  image: React.ReactNode;
  className?: string;
  avaliable?: boolean;
}

export default function GameCard({
  name,
  slug,
  image,
  description,
  avaliable,
  className,
}: GameCardProps) {
  const url = "/games/" + slug + "/";
  return (
    <div
      className={`shadow-md w-full bg-yellow-50/40 m-2 max-w-xs sm:max-w-sm pb-3 hover:bg-yellow-50/10
        cursor-pointer transition-opacity duration-200 group ${className}`}
    >
      <div className="w-full p-4">{avaliable ? image : <UnknownImage />}</div>
      <GameLink available url={url}>
        <div
          className="bg-white bg-gradient-to-b from-white to-transparent rounded-t-3xl my-2 relative
        group-hover:-top-4 transition-all duration-300"
        >
          <div
            className="block p-4 mx-2 rounded-3xl bg-yellow-200 text-yellow-700
          group-hover:bg-yellow-300 group-hover:text-yellow-800"
          >
            <div className="text-lg font-bold mb-3 text-yellow-900">{name}</div>
            <div className="text-sm">{description}</div>
            {avaliable && (
              <div className="text-xs text-gray-200 mt-3">Play now</div>
            )}
          </div>
        </div>
      </GameLink>
    </div>
  );
}

const UnknownImage = () => (
  <BsQuestion className="w-52 h-52 bg-yellow-200 mx-auto" />
);

interface GameLinkProps {
  available: boolean;
  url: string;
  children: React.ReactNode;
}
const GameLink = (props: GameLinkProps) =>
  props.available ? (
    <Link to={props.url}>{props.children}</Link>
  ) : (
    <div>{props.children}</div>
  );
