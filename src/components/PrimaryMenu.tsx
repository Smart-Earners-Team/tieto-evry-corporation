import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  disableBodyScroll,
  clearAllBodyScrollLocks,
  enableBodyScroll,
} from "body-scroll-lock";
import FabIcon from "./Icons/FabIcon";
import { FaTimes } from "react-icons/fa";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { navigationItems } from "../globals/navigation";
import Link from "./Link";
import Logo from "./Logo";

export default function PrimaryMenu() {
  const [open, setOpen] = useState(false);
  const mobileNavELement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileNavELement.current) return;
    if (open) {
      disableBodyScroll(mobileNavELement.current);
    } else {
      enableBodyScroll(mobileNavELement.current);
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [open]);

  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <div className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-between py-5">
      <div className="flex flex-row items-center justify-between">
        <Link
          to="/"
          className="text-lg font-semibold tracking-widest uppercase
                rounded-lg focus:outline-none focus:shadow-outline"
        >
          <Logo />
        </Link>
        <FabIcon
          label="Menu"
          onClick={openMenu}
          arial-label="Menu"
          className="lg:hidden cursor-pointer"
        >
          <RiBarChartHorizontalLine className="h-6 w-6" />
        </FabIcon>
      </div>
      <nav
        ref={mobileNavELement}
        className={`fixed lg:relative w-full h-full inset-0 bg-gray-50 lg:bg-transparent overflow-hidden
          text-gray-800 capitalize z-50 lg:z-auto flex justify-center flex-col items-center ${
            open ? "flex ite" : "hidden lg:flex"
          }`}
      >
        <FabIcon
          onClick={closeMenu}
          label="close"
          className="block mx-auto mb-10 lg:hidden cursor-pointer"
        >
          <FaTimes className="h-5 w-5 text-red-600" />
        </FabIcon>
        <ul className="flex flex-col lg:flex-row lg:justify-end lg:items-center">
          {navigationItems.map((nav) => (
            <li key={nav.id}>
              <Link
                to={nav.href}
                className="block text-center p-1 mb-8 lg:mb-0 hover:underline transition-colors ease-linear text-2xl
                  lg:text-lg font-semibold lg:ml-3"
                onClick={closeMenu}
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
