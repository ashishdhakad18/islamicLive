"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { cn } from "@/lib/utils";
import { FaqsData } from "@/types/faqs";

interface FaqPageSectionProps {
  data: FaqsData;
  title?: string;
}

const FaqPageSection: React.FC<FaqPageSectionProps> = ({ data, title }) => {
  const categories = React.useMemo(() => {
    const cats = new Set<string>();
    data.faqs.forEach((faq) => {
      if (faq.category) cats.add(faq.category);
    });
    // If no categories found, add a default one or handle gracefully
    if (cats.size === 0 && data.faqs.length > 0) {
      cats.add("General");
    }
    return Array.from(cats).map((cat) => ({
      id: cat,
      label: cat.toUpperCase(),
    }));
  }, [data.faqs]);

  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    categories[0]?.id || ""
  );

  // Update active category if categories change and current one is invalid
  React.useEffect(() => {
    if (
      categories.length > 0 &&
      !categories.find((c) => c.id === activeCategoryId)
    ) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories, activeCategoryId]);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const currentFaqs = React.useMemo(() => {
    const filtered = data.faqs.filter((faq) => {
      const cat = faq.category || "General";
      return cat === activeCategoryId;
    });
    return filtered;
  }, [data.faqs, activeCategoryId]);

  return (
    <section className="py-12 lg:py-25 ">
      {/* Header and Filters */}
      <div className="flex flex-col gap-8 mb-8">
        <h2 className="type-h5 text-grey-black uppercase">
          {title || "QUESTIONS FRÉQUENTES"}
        </h2>

        {categories.length > 0 && (
          <Tabs
            tabs={categories.map((cat) => ({
              value: cat.id,
              label: cat.label,
            }))}
            value={activeCategoryId}
            onChange={(val) => {
              setActiveCategoryId(val);
              setOpenIndex(null);
            }}
            activeTabClassName="bg-primary-main text-white font-bold"
            variant="outlined"
            color="primary"
            className="flex-wrap gap-2 type-btn-2"
            inactiveTabClassName="text-grey-grey font-bold"
          />
        )}
      </div>

      {/* FAQ Grid - Masonry Layout */}
      <div className="columns-1 lg:columns-2 gap-4 space-y-4 p-4 bg-grey-white">
        {currentFaqs.map((faq, index) => (
          <div
            key={faq.id}
            className="break-inside-avoid-column bg-grey-bg-dark rounded-sm p-6 group transition-all duration-200 mb-4"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full cursor-pointer flex items-start justify-between text-left gap-4"
            >
              <h6 className="type-btn-1 uppercase text-grey-black leading-tight! flex-1 pr-4">
                {faq.question}
              </h6>
              <span className="text-primary-dark mt-0.5 shrink-0">
                {openIndex === index ? (
                  <Minus className="w-5 h-5 " />
                ) : (
                  <Plus className="w-5 h-5 " />
                )}
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-500 ease-in-out",
                openIndex === index
                  ? "grid-rows-[1fr] opacity-100 mt-4"
                  : "grid-rows-[0fr] opacity-0 mt-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="type-body-2 text-grey-grey">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqPageSection;
