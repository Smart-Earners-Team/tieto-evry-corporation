import { graphql, StaticQuery } from "gatsby";
import React from "react";
import {
  FaFacebookF,
  FaRedditAlien,
  FaTelegram,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { BsMedium } from "react-icons/bs";
import { navigationItems } from "../../globals/navigation";
import Link from "../Link";
import Logo from "../Logo";
import SolidButton from "../Buttons/SolidButton";

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
  | "redit"
  | "medium";

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
export default function Footer(_props: FooterProps) {
  return (
    <footer>
      <StaticQuery
        query={footerQuery}
        render={(data: FooterQueryReturnType) => {
          const { description, name, socials } = data.site.siteMetadata;
          return (
            <div className="lg:text-left px-4 pt-10 pb-7 bg-gray-50">
              <div
                className="flex flex-col lg:flex-row lg:justify-center lg:space-x-8
                lg:items-start text-black"
              >
                <div className="flex lg:inline-flex flex-col items-center lg:items-start mb-6 lg:mb-0">
                  <Link to="/" className="inline-block">
                    <Logo />
                  </Link>
                  <p className="mt-2 text-center lg:text-left text-base max-w-sm">
                    {description}
                  </p>
                  <div className="mt-3 flex items-start justify-center lg:justify-start space-x-4">
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
                <div className="flex lg:inline-flex flex-col items-center lg:items-start mb-6 lg:mb-0 text-base">
                  <ul className="space-y-2">
                    {navigationItems.map((nav) => (
                      <li key={nav.id} className="text-center lg:text-left">
                        <Link to={nav.href} className="hover:underline">
                          {nav.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex lg:inline-flex flex-col items-center lg:items-start mb-6 lg:mb-0
                  text-base">
                  <form
                    method="post"
                    action="https://sendfox.com/form/m8709v/1kx29j"
                    className="sendfox-form space-y-2"
                    id="1kx29j"
                    data-async="true"
                    data-recaptcha="true"
                  >
                    <p>
                      <input
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        required
                        className="border p-2 w-full rounded-lg"
                      />
                    </p>
                    <p>
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                        className="border p-2 w-full rounded-lg"
                      />
                    </p>
                    <p>
                      <label>
                        <input type="checkbox" name="gdpr" defaultValue="1" required />{" "}
                        I agree to receive email updates and promotions.
                      </label>
                    </p>
                    {/* <!-- no botz please --> */}
                    <div
                      style={{ position: "absolute", left: "-5000px" }}
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="a_password"
                        tabIndex={-1}
                        defaultValue=""
                        autoComplete="off"
                      />
                    </div>
                    <p className="flex justify-center lg:justify-start">
                      <SolidButton type="submit">Join Waitlist</SolidButton>
                    </p>
                  </form>
                </div>
              </div>
              <div className="text-gray-500 text-sm mt-6 text-center">
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
    "w-6 h-6 text-black hover:text-blue-500 inline-block";
  switch (name) {
    case "twitter":
      svgIcon = <FaTwitter className={iconClass} title={name} />;
      break;
    case "telegramGroup":
      svgIcon = <FaTelegram className={iconClass} title={name} />;
      break;
    case "telegramNews":
      svgIcon = <FaTelegramPlane className={iconClass} title={name} />;
      break;
    case "facebook":
      svgIcon = <FaFacebookF className={iconClass} title={name} />;
      break;
    case "redit":
      svgIcon = <FaRedditAlien className={iconClass} title={name} />;
      break;
    case "medium":
      svgIcon = <BsMedium className={iconClass} title={name} />;
      break;
    default:
      break;
  }
  return svgIcon;
};
