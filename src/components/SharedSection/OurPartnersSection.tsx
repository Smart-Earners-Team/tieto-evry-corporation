import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import Section from "../Layouts/Section";
import Link from "../Link";

export default function OurPartnersSection() {
  return (
    <Section className="flex flex-col items-center font-light space-y-5" noPadding>
      <div>Our Partners</div>
      <div className="flex justify-center items-center">
        <Link
          to="https://harmonicstudioz.com"
          className="max-w-[200px] w-full block"
        >
          <StaticImage
            alt="Harmonics Studio"
            title="Harmonics Studio"
            src="../../images/partners/harmonics-studio.png"
            placeholder="blurred"
            layout="constrained"
          />
        </Link>
        <Link
          to="https://kryptolite.rocks"
          className="max-w-[200px] w-full block"
        >
          <StaticImage
            alt="Harmonics Studio"
            title="Harmonics Studio"
            src="../../images/partners/kryptolite.png"
            placeholder="blurred"
            layout="constrained"
          />
        </Link>
      </div>
    </Section>
  );
}
