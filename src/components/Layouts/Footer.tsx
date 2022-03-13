import { graphql, StaticQuery } from "gatsby";
import React from "react";
import {
  FaFacebookF,
  FaRedditAlien,
  FaTelegram,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { navigationItems } from "../../globals/navigation";
import FabIcon from "../Icons/FabIcon";
import Link from "../Link";
import Logo from "../Logo";

const footerQuery = graphql`
  query FooterComponentQuery {
    site {
      siteMetadata {
        name
        siteUrl
        description
        socials {
          name
          url
        }
      }
    }
  }
`;

type SocialIconTypes =
  | "twitter"
  | "telegramGroup"
  | "telegramNews"
  | "facebook"
  | "redit";

interface FooterQueryReturnType {
  site: {
    siteMetadata: {
      name: string;
      description: string;
      siteUrl: string;
      socials: {
        name: SocialIconTypes;
        url: string;
      }[];
    };
  };
}
interface FooterProps extends React.ComponentProps<"footer"> {}
export default function Footer(props: FooterProps) {
  return (
    <footer>
      <StaticQuery
        query={footerQuery}
        render={(data: FooterQueryReturnType) => {
          const { description, name, socials } = data.site.siteMetadata;
          return (
            <div className="md:text-left px-4 pt-10 pb-7 bg-gray-50">
              <div className="flex flex-col md:flex-row md:justify-center md:space-x-6
                md:items-start text-black">
                <div className="flex md:inline-flex flex-col items-center md:items-end md:w-1/2 mb-6 md:mb-0">
                  <Link to="/" className="inline-block">
                    <Logo />
                  </Link>
                  <p className="mt-2 text-center md:text-right text-base max-w-sm">
                    {description}
                  </p>
                  <div className="mt-3 flex items-start justify-center md:justify-end">
                    {socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getSocialIcon(social.name)}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="text mt-3 md:inline-block md:float-right md:w-1/2 text-base">
                  <ul className="space-y-2">
                    {navigationItems.map((nav) => (
                      <li key={nav.id} className="text-center md:text-left">
                        <Link to={nav.href} className="hover:underline">
                          {nav.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-gray-500 text-base mt-6 text-center">
                {new Date().getFullYear()} {name}. All right reserved.
              </div>
            </div>
          );
        }}
      />
    </footer>
  );
}

const getSocialIcon = (name: SocialIconTypes) => {
  let svgIcon = <></>;
  const iconClass =
    "w-6 h-6 text-black hover:text-blue-500 inline-block mr-5 md:mr-0 md:ml-5";
  switch (name) {
    case "twitter":
      svgIcon = <FaTwitter className={iconClass} />;
      break;
    case "telegramGroup":
      svgIcon = <FaTelegram className={iconClass} />;
      break;
    case "telegramNews":
      svgIcon = <FaTelegramPlane className={iconClass} />;
      break;
    case "facebook":
      svgIcon = <FaFacebookF className={iconClass} />;
      break;
    case "redit":
      svgIcon = <FaRedditAlien className={iconClass} />;
      break;
    default:
      break;
  }
  return svgIcon;
};
