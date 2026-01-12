"use client";

import { useState } from "react";
import Filter, { FilterGroup } from "@/components/ui/Filter";
import Container from "@/components/layout/Container";
import GlobalNews from "@/components/ui/GlobalNews";
import Pagination from "@/components/ui/Pagination";
import { JobDetailModal } from "@/components/ui/JobDetailModal";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { JoinUsPageData, JoinUsCard } from "@/types/join-us.types";

interface JoinUsContentProps {
  data: JoinUsPageData;
}

const JoinUsContent = ({ data }: JoinUsContentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JoinUsCard | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = Array.from(
    new Set(data.cards.map((card) => card.category))
  ).filter((c) => c);

  const filteredCards = data.cards.filter((card) => {
    if (selectedCategory === "all") return true;
    return String(card.category).trim() === String(selectedCategory).trim();
  });

  // Debugging logs to verify filtering
  console.log("Selected Category:", selectedCategory);
  console.log("Total Cards:", data.cards.length);
  console.log("Filtered Cards:", filteredCards.length);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

  const currentBlogData = filteredCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleReadMore = (blog: JoinUsCard) => {
    setSelectedJob(blog);
    setIsModalOpen(true);
  };

  const handleFilterApply = (filters: Record<string, string>) => {
    setSelectedCategory(filters.category || "all");
    setCurrentPage(1);
  };

  const blogFilters: FilterGroup[] = [
    {
      id: "category",
      placeholder: "CATEGORY",
      options: [
        { label: "All Topics", value: "all" },
        ...categories.map((cat) => ({ label: cat, value: cat })),
      ],
    },
    {
      id: "theme",
      placeholder: "THEME",
      options: [
        { label: "All", value: "all" },
        { label: "Development", value: "development" },
        { label: "Community", value: "community" },
      ],
    },
  ];

  return (
    <>
      <Filter filters={blogFilters} onApply={handleFilterApply} />
      <Container className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {currentBlogData.map((blog) => (
            <GlobalNews
              key={blog.id}
              category={blog.category}
              date={blog.date}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              link={blog.link}
              onClick={() => handleReadMore(blog)}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </Container>

      <JobDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
      />

      <div className="bg-primary-surface lg:py-25 py-12 flex flex-col gap-12">
        <Container>
          <SectionHeading
            subheading={data.cta.sectionHeading.subHeading}
            heading={data.cta.sectionHeading.heading}
            description={data.cta.sectionHeading.description}
            subheadingClassName="text-[#A91F21] type-caption-1 font-normal mb-2 lg:mb-0 whitespace-normal lg:whitespace-nowrap"
            headingClassName="mb-6 text-3xl lg:text-5xl whitespace-normal lg:whitespace-nowrap"
            descriptionClassName="lg:type-body-1 type-body-2"
          />
          <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-6 items-center w-full">
            <Button
              color="yellow"
              rounded
              className="w-full lg:w-auto justify-center"
              endIcon={
                <Image
                  src="/Icons/Arrow-right-black.svg"
                  alt="Arrow"
                  width={24}
                  height={24}
                />
              }
              href={data.cta.cta.link}
            >
              {data.cta.cta.text}
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default JoinUsContent;
