"use client";

import { useState, useMemo } from "react";
import Filter, { FilterGroup } from "@/components/ui/Filter";
import Container from "@/components/layout/Container";
import GlobalNews from "@/components/ui/GlobalNews";
import Pagination from "@/components/ui/Pagination";
import { BlogCardData } from "@/types/blogs.types";


interface BlogsContentProps {
  initialData: BlogCardData[];
}

const BlogsContent = ({ initialData }: BlogsContentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTheme, setSelectedTheme] = useState("all");
  const itemsPerPage = 6;
 console.log(initialData);

  // Extract unique categories for filter
  const categories = useMemo(() => {
    const uniqueRaw = Array.from(new Set(initialData.map((b) => b.category)));
    return [
      { label: "All Topics", value: "all" },
      ...uniqueRaw.map((c) => ({ label: c, value: c })),
    ];
  }, [initialData]);

  const blogFilters: FilterGroup[] = [
    {
      id: "category",
      placeholder: "CATEGORY",
      options: categories,
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

  const filteredBlogs = initialData.filter((blog) => {
    const categoryMatch =
      selectedCategory === "all" || blog.category === selectedCategory;
    const themeMatch =
      selectedTheme === "all" ||
      (blog.theme && blog.theme.toLowerCase() === selectedTheme.toLowerCase());
    return categoryMatch && themeMatch;
  });

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  const currentBlogData = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterApply = (filters: Record<string, string>) => {
    if (filters.category) {
      setSelectedCategory(filters.category);
    }
    if (filters.theme) {
      setSelectedTheme(filters.theme);
    }
    setCurrentPage(1);
  };

  return (
    <div>
      <Filter filters={blogFilters} onApply={handleFilterApply} />
      <Container className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {currentBlogData.map((blog) => (
            <GlobalNews
              key={blog.id}
              image={blog.image}
              category={blog.category}
              date={blog.date}
              title={blog.title}
              description={blog.description}
              link={blog.link}
            />
          ))}
        </div>

        {/* Pagination Control */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </Container>
    </div>
  );
};

export default BlogsContent;
