import React from "react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQ from "@/components/ui/FAQ";
import { faqsData, FaqsData } from "@/types/faqs";

interface FaqSectionProps {
  faqs?: FaqsData;
  sectionHeading?: {
    heading: string;
    subHeading: string;
    description: string;
  };
}

const FaqSection = ({ faqs, sectionHeading }: FaqSectionProps) => {
  // Use provided data or fall back to static data
  const faqData = faqs && faqs.faqs.length > 0 ? faqs : faqsData;
  const heading = sectionHeading?.heading || "YOUR QUESTIONS, ANSWERED";
  const subHeading = sectionHeading?.subHeading || "Follow Us";
  const description = sectionHeading?.description || "Get quick answers to the most common questions about our platform and services.";

  return (
    <div className="w-full relative overflow-hidden">
      {/* Background Image Overlay */}

      <Container className="relative z-10">
        <div className="flex flex-col gap-5 lg:flex-row  lg:gap-20 lg:py-25 py-12">
          {/* Left Side: Heading */}
          <div className="flex-1 lg:max-w-[40%] ">
            <SectionHeading
              heading={heading}
              subheading={subHeading}
              description={description}
              theme="dark"
              subheadingClassName="text-red type-caption-1 normal-case mt-4 " // Attempting to match the cursive/handwritten style if possible, falling back to italic
              headingClassName="type-h2 text-grey-black mb-2  h-auto leading-tight"
              descriptionClassName="text-grey-grey type-body-2 max-w-sm  mx-auto md:mx-0  "
              className="mx-auto md:mx-0 mb-0 md:text-left md:items-start"
            />
          </div>

          {/* Right Side: FAQ Accordion */}
          <div className="flex-1 ">
            <FAQ data={faqData} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FaqSection;

