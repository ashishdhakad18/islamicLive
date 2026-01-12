"use client";

import React, { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { FaqsData } from "@/types/faqs";
// import { useRouter } from "next/router";

interface FAQProps {
  data: FaqsData;
}

export default function FAQ({ data }: FAQProps) {
  const [openId, setOpenId] = useState<number | null>(null);
  // const router = useRouter();

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-[632px] mx-auto p-4 space-y-4 bg-white rounded-2xl">
      {/* FAQ Items */}
      <div className="space-y-4">
        {data.faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-grey-bg-dark rounded-2xl p-6 transition-all duration-200">
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full cursor-pointer flex items-start justify-between text-left gap-4 group">
              <h6 className="type-btn-1 uppercase text-grey-black type-h6 flex-1 pr-4 !leading-tight">
                {faq.question}
              </h6>
              <span className="text-primary-dark mt-1 transition-transform duration-200 group-hover:text-gray-600">
                {openId === faq.id ? (
                  <Minus className="w-5 h-5" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </span>
              
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                openId === faq.id
                  ? "grid-rows-[1fr] opacity-100 mt-4"
                  : "grid-rows-[0fr] opacity-0 mt-0"
              }`}>
              <div className="overflow-hidden">
                <p className="type-body-2 text-grey-grey">
                  {faq.answer
                    ? faq.answer
                    : "No answer provided for this question yet."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      {data.cta && (
        <div className="mt-4 pt-4">
          <button
            className="w-full h-12 bg-yellow-main  text-grey-black font-black uppercase tracking-wide rounded-sm flex items-center justify-center gap-2 transition-colors type-btn-1 pt-1.5  hover:bg-yellow-surface"
            onClick={() => (window.location.href = String(data.cta.action))}>
            <span className="h-[16px]">{data.cta.label}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
