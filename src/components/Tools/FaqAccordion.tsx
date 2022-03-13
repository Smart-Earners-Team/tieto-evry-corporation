import React from "react";
import { snakeCase } from "lodash";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { UUID } from "react-accessible-accordion/dist/types/components/ItemContext";

interface FaqAccordionProps {
  faqs: {
    question: string;
    answer: React.ReactNode;
  }[];
  expandedUuids: string[];
}

export default function FaqAccordion({
  faqs,
  expandedUuids,
}: FaqAccordionProps) {

  const handleScrollToExpanded = (uuids: UUID[]) => {
    const idPrefix = "accordion__heading-";
    const firstHeading = uuids[0];
    const id = idPrefix + firstHeading;
    const ele = document.getElementById(id);
    ele?.scrollIntoView({behavior: "smooth"});
  };

  return (
    <div className="w-full my-10">
      <Accordion
        allowZeroExpanded={false}
        preExpanded={expandedUuids}
        className="text-left"
        onChange={handleScrollToExpanded}
      >
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.question}
            uuid={snakeCase(faq.question)}
            className="mb-5"
          >
            <AccordionItemState>
              {({ expanded }) => (
                <AccordionItemHeading
                  className={`font-normal text-xl md:text-2xl bg-gray-100 hover:bg-gray-200 transition-colors
                    duration-100 text-gray-600 shadow
                    ${expanded ? "!bg-gray-200" : ""}`}
                >
                  <AccordionItemButton className="p-4 flex justify-between items-center">
                    {faq.question}
                    {!expanded ? (
                      <RiAddLine className="h-6 w-6 inline float-right" />
                    ) : (
                      <RiSubtractLine className="h-6 w-6 inline float-right" />
                    )}
                  </AccordionItemButton>
                </AccordionItemHeading>
              )}
            </AccordionItemState>
            <AccordionItemPanel className="text-lg md:text-xl text-gray-600 p-4">
              {faq.answer}
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
