import { getSingleBlogData } from "@/lib/pages/blogs/getSingleBlogData";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { Locale } from "@/config/i18n.config";
import HeroSection from "@/components/ui/HeroSection";
import Container from "@/components/layout/Container";

interface BlogDetailProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export default async function BlogDetail({ params }: BlogDetailProps) {
  const { slug, locale } = await params;
  const blogData = await getSingleBlogData(slug, locale);

  if (!blogData) {
    return <div>Blog not found</div>;
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
              url: blogData.hero.image,
              alt: blogData.hero.heading,
              title: blogData.hero.heading,
              subtitle: blogData.hero.subHeading,
              buttonText: "",
              buttonLink: "",
            },
          ],
        }}
        autoPlay
      />

      <Container className="py-10 md:py-24 max-w-4xl">
        <div className="text-grey-black">
          <RichTextRenderer content={blogData.content} />
        </div>
      </Container>

      {/* Hero Message Section - if exists */}
      {blogData.hero.message && (
        <div className="bg-primary-main w-full flex items-center py-15 px-24">
          <Container>
            <h1 className="text-grey-white type-h4 uppercase">
              {blogData.hero.message}
            </h1>
            {blogData.hero.author && (
              <p className="text-grey-white type-body-2 mt-5">
                {blogData.hero.author}
              </p>
            )}
          </Container>
        </div>
      )}
    </div>
  );
}
