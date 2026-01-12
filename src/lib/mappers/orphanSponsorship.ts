import {
  OrphanSponsorshipPageData,
  StrapiOrphanSponsorshipAttributes,
} from "@/types/orphanSponsorship.types";
import { StrapiData } from "@/types/strapi";
import { getMediaUrl } from "@/utils/strapiHelpers";

export function mapOrphanSponsorshipPageData(
  strapiData: any
): OrphanSponsorshipPageData | null {
  if (!strapiData) return null;
  
  // Support both Strapi v4 (attributes) and v5 (flat) formats
  const attrs = strapiData.attributes || strapiData;

  // Robust media URL extraction
  const getUrl = (img: any) => {
    if (!img) return null;
    // If it's v4 structure { data: { attributes: { url } } }
    if (img.data) return getMediaUrl(img);
    // If it's v5 structure { url: ... }
    return getMediaUrl(img);
  };

  return {
    hero: {
      heading: attrs.heroSection?.[0]?.sectionHeading?.heading || attrs.heroSection?.sectionHeading?.heading || "",
      subheading: attrs.heroSection?.[0]?.sectionHeading?.subHeading || attrs.heroSection?.sectionHeading?.subHeading || "",
      description: attrs.heroSection?.[0]?.sectionHeading?.description || attrs.heroSection?.sectionHeading?.description || "",
      heroMsg: (attrs.heroSection?.[0]?.heroMSG || attrs.heroSection?.heroMSG) ? {
        message: attrs.heroSection?.[0]?.heroMSG?.message || attrs.heroSection?.heroMSG?.message || "",
        author: attrs.heroSection?.[0]?.heroMSG?.author || attrs.heroSection?.heroMSG?.author || "",
      } : undefined,
      carouselData: {
        carouselItems: (Array.isArray(attrs.heroSection) ? attrs.heroSection : [attrs.heroSection]).map((item: any, index: number) => ({
          id: String(index + 1),
          url: getUrl(item?.image),
          alt: item?.image?.data?.attributes?.alternativeText || item?.image?.alternativeText || "Hero Image",
          title: item?.heroMSG?.message || "",
          subtitle: item?.heroMSG?.author || "",
          buttonText: "JE PARRAINE UN ORPHELIN",
          buttonLink: "#",
        })),
      },
      autoPlay: true,
      buttonText: "PARRAINER UN ORPHELIN",
      buttonLink: "#",
    },
    impactStats: {
      data: {
        impactStats:
          (Array.isArray(attrs.impactStats) ? attrs.impactStats : attrs.impactStats?.impactStats)?.map((s: any) => ({
            id: s.id,
            value: s.value || s.number || "",
            label: s.label || s.caption || s.title || s.text || "",
            type: s.type || "count",
          })) || [],
      },
    },
    sponsorshipDetails: {
      topHeading: attrs.Sec3?.sectionHeading?.heading || "",
      mainHeading: attrs.Sec3?.sectionHeading?.subHeading || "",
      introText: attrs.Sec3?.sectionHeading?.description || "",
      detailsHeading: attrs.Sec3?.heading || "",
      detailsText: attrs.Sec3?.description ? [attrs.Sec3.description] : [],
      imageSrc: getUrl(attrs.Sec3?.image),
      imageAlt: attrs.Sec3?.image?.data?.attributes?.alternativeText || attrs.Sec3?.image?.alternativeText || "",
    },
    whySponsor: {
      heading: attrs.Sec4?.heading || (attrs.Sec4 as any)?.heading || "",
      introText: attrs.Sec4?.description || (attrs.Sec4 as any)?.introText || "",
      benefits: attrs.Sec4?.list?.map((i: any) => i.text || i).filter(Boolean) || [],
      footerText: attrs.Sec4?.bottomText || (attrs.Sec4 as any)?.footerText || "",
      imageSrc: getUrl(attrs.Sec4?.image),
      imageAlt: attrs.Sec4?.image?.data?.attributes?.alternativeText || attrs.Sec4?.image?.alternativeText || "",
    },
    ethicalProgram: {
      heading: attrs.Sec5?.heading || (attrs.Sec5 as any)?.heading || "",
      introText: attrs.Sec5?.description || (attrs.Sec5 as any)?.introText || "",
      guarantees: attrs.Sec5?.list?.map((i: any) => i.text || i).filter(Boolean) || [],
      buttonText: attrs.Sec5?.ctaText || (attrs.Sec5 as any)?.buttonText || "JE PARRAINE",
      buttonLink: attrs.Sec5?.ctaLink || (attrs.Sec5 as any)?.buttonLink || "#",
      closingText: (attrs.Sec5 as any)?.closingText || "",
      imageSrc: getUrl(attrs.Sec5?.image),
      imageAlt: attrs.Sec5?.image?.data?.attributes?.alternativeText || attrs.Sec5?.image?.alternativeText || "",
    },
    orphanFund: {
      heading: attrs.Sec6?.heading || (attrs.Sec6 as any)?.heading || "",
      introText: attrs.Sec6?.description || (attrs.Sec6 as any)?.introText || "",
      points: attrs.Sec6?.list?.map((i: any) => i.text || i).filter(Boolean) || [],
      closingText: (attrs.Sec6 as any)?.closingText || "",
      imageSrc: getUrl(attrs.Sec6?.image),
      imageAlt: attrs.Sec6?.image?.data?.attributes?.alternativeText || attrs.Sec6?.image?.alternativeText || "",
    },
    news: attrs.newSection
      ? {
          heading: attrs.newSection.sectionHeading?.heading || "Actualités",
          subheading: attrs.newSection.sectionHeading?.subHeading || "Nos actions sur le terrain",
          description: attrs.newSection.sectionHeading?.description || "Forte de son expertise...",
          cards:
            attrs.newSection.newsCard?.map((card: any) => ({
              id: String(card.id),
              image: getUrl(card.image),
              title: card.title || "",
              read: card.read || "Read More",
              date: card.date || "",
              categories: card.categories ? [card.categories] : [],
              link: card.link || "#",
            })) || [],
        }
      : undefined,
    faq: attrs.faqSection
      ? {
          sectionHeading: {
            heading: attrs.faqSection.sectionHeading?.heading || "FAQ",
            subHeading: attrs.faqSection.sectionHeading?.subHeading || "Questions Fréquentes",
            description: attrs.faqSection.sectionHeading?.description || "",
          },
          faqs:
            attrs.faqSection.faqs?.map((f: any) => ({
              id: Number(f.id),
              question: f.question,
              answer: f.answer,
            })) || [],
          cta: {
            label: "Load More",
            action: "/faq",
          },
        }
      : undefined,
    cta: attrs.callToAction
      ? {
          heading: attrs.callToAction.sectionHeading?.heading || "",
          subheading: attrs.callToAction.sectionHeading?.subHeading || "",
          description: attrs.callToAction.sectionHeading?.description || "",
          buttonText: attrs.callToAction.CTA?.text || "En savoir plus",
          buttonLink: attrs.callToAction.CTA?.link || "#",
        }
      : undefined,
    socialMedia: attrs.socialMediaSection
      ? {
          heading: (Array.isArray(attrs.socialMediaSection) ? attrs.socialMediaSection[0] : attrs.socialMediaSection).sectionHeading?.heading || "",
          subheading: (Array.isArray(attrs.socialMediaSection) ? attrs.socialMediaSection[0] : attrs.socialMediaSection).sectionHeading?.subHeading || "",
          description: (Array.isArray(attrs.socialMediaSection) ? attrs.socialMediaSection[0] : attrs.socialMediaSection).sectionHeading?.description || "",
          posts:
            ((Array.isArray(attrs.socialMediaSection) ? attrs.socialMediaSection[0] : attrs.socialMediaSection).socialMediaCards || [])?.map((card: any) => ({
              id: String(card.id),
              organization: {
                name: "Islamic Relief",
                logo: "/Images/Logo/logo2.png",
                social: {
                  platform: card.socialMedia || "Instagram",
                  url: card.link || "#",
                },
              },
              media: {
                type: "image",
                src: getUrl(card.image),
                alt: card.image?.data?.attributes?.alternativeText || "Social Media Post",
              },
              headline: "",
              content: card.description || "",
              engagement: {
                likes: card.likes || 0,
                comments: card.replies || 0,
              },
            })) || [],
        }
      : undefined,
    impactData: {
      stats:
        attrs.impactData?.map((item: any) => ({
          id: String(item.id),
          icon: getUrl(item.icon),
          value: item.heading || "",
          label: item.subHeading || "",
          description: item.description || "",
        })) || [],
    },
  };
}
