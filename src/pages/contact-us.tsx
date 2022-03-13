import React from "react";
import ContactForm from "../components/Forms/ContactForm";
import { Heading } from "../components/Typography/Headings";
import Layout from "../components/Layouts";
import SEO from "../components/SEO";
import Section from "../components/Layouts/Section";

export default function ContactPage() {
  return (
    <Layout>
      <SEO
        title="Contact us"
        description="Book an audit YOUR way. We have multiple developers
			on board to offer smart contract audits. Our experts will guide
			you through the entire process."
      />
      <Section>
        <header className="text-center">
          <Heading>Book an audit</Heading>
          <p className="my-5">
            Book an audit YOUR way. We have multiple developers on board to
            offer smart contract audits. Our experts will guide you through the
            entire process.
          </p>
        </header>
        <div className="w-full max-w-lg mx-auto py-6">
          <ContactForm />
        </div>
      </Section>
    </Layout>
  );
}
