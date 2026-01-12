"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import SocialMediaCard from "@/components/ui/SocialMediaCard";
import { Tabs, TabItem } from "@/components/ui/Tabs";
import { socialMediaData, SocialMediaPost } from "@/types/socialmedia";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SocialMediaSectionProps {
  cardClassName?: string;
  posts?: SocialMediaPost[];
}

const SocialMediaSection = ({
  cardClassName,
  posts,
}: SocialMediaSectionProps) => {
  // Use provided posts or fall back to static data
  const allPosts = posts && posts.length > 0 ? posts : socialMediaData.posts;

  const [activeFilter, setActiveFilter] = useState("ALL");
  const [mobileIndex, setMobileIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    setMobileIndex(0);
    setVisibleCount(4);
  }, [activeFilter]);

  // Define tabs with icons
  const tabData = [
    { value: "ALL", label: "ALL", icon: "/Icons/Heart.svg" },
    { value: "INSTAGRAM", label: "INSTAGRAM", icon: "/Icons/Instagram-1.svg" },
    { value: "TIKTOK", label: "TIKTOK", icon: "/Icons/Tiktok.svg" },
    { value: "WHATSAPP", label: "WHATSAPP", icon: "/Icons/Whatsapp.svg" },
    { value: "FACEBOOK", label: "FACEBOOK", icon: "/Icons/Facebook-1.svg" },
    { value: "YOUTUBE", label: "YOUTUBE", icon: "/Icons/YouTube-1.svg" },
  ];

  const filterTabs: TabItem[] = tabData.map((tab) => ({
    value: tab.value,
    label: tab.label,
    customContent: (
      <div className="flex items-center gap-2">
        <Image
          src={tab.icon}
          alt={tab.label}
          width={24}
          height={24}
          className={activeFilter === tab.value ? "brightness-0 invert" : ""}
        />
        <span className="hidden md:block">{tab.label}</span>
      </div>
    ),
  }));

  const filteredPosts =
    activeFilter === "ALL"
      ? allPosts
      : allPosts.filter(
          (post) =>
            post.organization.social.platform.toUpperCase() === activeFilter
        );

  const displayPosts = filteredPosts.slice(0, visibleCount);

  return (
    <>
      {/* Filters using Tabs component */}
      <div className="mb-12 pb-4 w-full">
        <Tabs
          tabs={filterTabs}
          value={activeFilter}
          onChange={setActiveFilter}
          variant="filled"
          size="md"
          color="primary"
          centered
          gap={3}
          rounded="sm"
          tabClassName="type-btn-3 h-10 cursor-pointer py-2 px-4 justify-center"
          activeTabClassName="bg-primary text-white shadow-sm"
          inactiveTabClassName="bg-white text-grey-black hover:bg-gray-50"
        />
      </div>

      {/* Grid */}
      {/* Masonry Layout - Manual Column Distribution for LTR Order */}
      {/* Mobile: Slider Content */}
      <div className="md:hidden mb-12 relative w-full">
        {/* Slider Container */}
        <div className="overflow-hidden mb-6">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${mobileIndex * 100}%)`,
              gap: "24px",
            }}
          >
            {displayPosts.map((post) => (
              <div
                key={`mobile-${post.id}`}
                className="w-full shrink-0"
                style={{
                  minWidth: "100%", // Ensure each slide takes full width
                  marginRight: "-24px", // Counteract the gap for the last item or calculation if strictly 100% width
                }}
              >
                {/* Wrapper to handle gap visually if needed, but for single slide w-full is fine.
                      Actually, flex gap handles spacing. But we need to make sure width calculation is correct.
                      If we use gap-24px, translation needs to account for it or we just use 100% width and padding.
                      Simpler approach: standard flex slider without gap in transform logic, just container spacing.
                      But CardSlider uses gap.
                      Let's stick to simple 100% width translation.
                  */}
                <div
                  style={{
                    paddingRight: "0" /* Reset any padding if needed */,
                  }}
                >
                  <div className="flex justify-center">
                    <SocialMediaCard data={post} className={cardClassName} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between gap-8">
          {/* Progress Bar */}
          <div className="flex-1 h-1 bg-[#CDE4F6] rounded-full overflow-hidden relative">
            <div
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out"
              style={{
                width: `${((mobileIndex + 1) / displayPosts.length) * 100}%`,
              }}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setMobileIndex((prev) => Math.max(0, prev - 1))}
              disabled={mobileIndex === 0}
              className="w-8 h-8 flex items-center justify-center bg-grey-white hover:bg-grey-white disabled:opacity-50 disabled:hover:bg-white rounded-full cursor-pointer transition-colors focus:outline-none "
              aria-label="Previous slide"
            >
              <Image
                src="/Icons/Arrow-Left.svg"
                alt="Previous"
                width={20}
                height={20}
                className={mobileIndex === 0 ? "opacity-30" : "text-primary"}
              />
            </button>

            <button
              onClick={() =>
                setMobileIndex((prev) =>
                  Math.min(displayPosts.length - 1, prev + 1)
                )
              }
              disabled={mobileIndex === displayPosts.length - 1}
              className="w-8 h-8 flex items-center justify-center bg-grey-white hover:bg-grey-white disabled:opacity-50 disabled:hover:bg-white rounded-full cursor-pointer transition-colors focus:outline-none border border-gray-100 shadow-sm"
              aria-label="Next slide"
            >
              <Image
                src="/Icons/Arrow-Right.svg"
                alt="Next"
                width={20}
                height={20}
                className={
                  mobileIndex >= displayPosts.length - 1 ? "opacity-30" : ""
                }
              />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop: Grid row with responsive cards - hide overflow */}
      {/* md: 2 cards, lg: 3 cards, xl: 4 cards */}
      <div className="hidden md:flex justify-center gap-6 mb-12 overflow-hidden w-full">
        {displayPosts.slice(0, 4).map((post, index) => {
          // Determine visibility classes based on index
          // index 0, 1: always visible on md+
          // index 2: visible on lg+ (hidden on md only)
          // index 3: visible on xl+ (hidden on md and lg)
          let visibilityClass = "";
          if (index === 2) {
            visibilityClass = "hidden lg:flex";
          } else if (index === 3) {
            visibilityClass = "hidden xl:flex";
          }

          return (
            <div
              key={`desktop-${post.id}`}
              className={`flex justify-center shrink-0 ${visibilityClass}`}
            >
              <SocialMediaCard data={post} className={cardClassName} />
            </div>
          );
        })}
      </div>

      {/* Load More */}
      {filteredPosts.length > visibleCount && (
        <div className="flex justify-center">
          <Button
            size="lg"
            color="yellow"
            rounded
            onClick={() => setVisibleCount((prev) => prev + 4)}
            endIcon={<ArrowRight />}
            className="px-20"
          >
            LOAD MORE
          </Button>
        </div>
      )}
    </>
  );
};

export default SocialMediaSection;
