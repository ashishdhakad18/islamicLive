import HeroSection from "@/components/ui/HeroSection";
import { getBlogsData } from "@/lib/pages/blogs/getBlogsData";
import { Locale } from "@/config/i18n.config";
import BlogsContent from "./BlogsContent";

interface BlogsProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function Blogs({ params }: BlogsProps) {
  const { locale } = await params;
  const blogData = await getBlogsData(locale);

  if (!blogData) {
    return <div>Failed to load blogs.</div>;
  }

  return (
    <div>
      <HeroSection
        backgroundColor="bg-royal"
        heading={blogData.hero.heading}
        subheading={blogData.hero.subHeading}
        description={blogData.hero.description}
        carouselData={{
          carouselItems: [
            {
              id: "1",
              url: blogData.hero.image.url,
              alt: blogData.hero.image.alt,
              title: blogData.hero.heading,
              subtitle: blogData.hero.subHeading,
              buttonText: "",
              buttonLink: "",
            },
          ],
        }}
        autoPlay
      />

      <BlogsContent initialData={blogData.cards} />
    </div>
  );
}
