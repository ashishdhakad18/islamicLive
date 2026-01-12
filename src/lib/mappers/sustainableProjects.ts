import { SustainableProject } from "@/types/sustainableProjects";
import { StrapiSustainableProject } from "@/types/sustainableProjectsStrapi";
import { getMediaUrl } from "@/utils/strapiHelpers";

/**
 * Maps sustainable project data from Strapi to the frontend SustainableProject interface
 */
export const mapSustainableProjectData = (
  data: StrapiSustainableProject
): SustainableProject => {
  const attrs = data;

  return {
    slug: attrs.Config?.slug || attrs.slug,
    primaryColour:
      attrs.Config?.primaryColor || attrs.primaryColor || "bg-primary",
    secondaryColour:
      attrs.Config?.secondaryColor ||
      attrs.secondaryColor ||
      "bg-primary-lighter",
    thirdColor:
      attrs.Config?.thirdColor || attrs.thirdColor || "bg-primary-divider",
    title: attrs.Config?.title || "",
    hero: {
      heading: attrs.heroSection?.sectionHeading?.heading || "",
      subheading: attrs.heroSection?.sectionHeading?.subHeading,
      description: attrs.heroSection?.sectionHeading?.description,
      carouselData: {
        carouselItems:
          attrs.heroSection?.images?.map((image, index) => ({
            id: String(image.id || index + 1),
            url: getMediaUrl(image) || "",
            alt:
              image.alternativeText ||
              attrs.heroSection?.sectionHeading?.heading ||
              "Hero image",
            title: "",
            subtitle: "",
            buttonText: "",
            buttonLink: "",
          })) || [],
      },
      statsData: {
        impactStats:
          attrs.heroSection?.stats?.map((stat, index) => ({
            id: stat.id || index + 1,
            value: stat.value || "",
            label: stat.caption || "",
            type: "count",
          })) || [],
      },
      buttonText: attrs.HeroCTA?.label,
      buttonLink: attrs.HeroCTA?.url,
    },
    impactGrid: {
      heading:
        attrs.educationessentialSection?.educationEssential?.sectionHeading
          ?.heading || "",
      subheading:
        attrs.educationessentialSection?.educationEssential?.sectionHeading
          ?.subHeading || "",
      description:
        attrs.educationessentialSection?.educationEssential?.sectionHeading
          ?.description || "",
      items:
        attrs.educationessentialSection?.educationEssential?.listData?.map(
          (item) => ({
            id: item.id,
            theme: (item.theme as any) || "primary",
            value: item.value,
            icon: getMediaUrl(item.icon) || "",
            title: item.title,
            description: item.description,
          })
        ) || [],
      images:
        attrs.educationessentialSection?.educationEssential?.images
          ?.map((img: any) => getMediaUrl(img) || "")
          .filter(Boolean) || [],
    },
    mission: attrs.missionSection
      ? {
          sectionHeading: {
            heading: attrs.missionSection.sectionHeading?.heading || "",
            subHeading: attrs.missionSection.sectionHeading?.subHeading,
            description: attrs.missionSection.sectionHeading?.description,
          },
          cards:
            attrs.missionSection.cards?.map((card) => ({
              id: card.id,
              icon: getMediaUrl(card.iconImage) || "",
              title: card.heading,
              description: card.description || "",
              number: card.number,
              numberDescription: card.numberDescription,
            })) || [],
        }
      : undefined,
    recentProjectSection: attrs.recentProjectSection
      ? {
          sectionHeading: {
            heading: attrs.recentProjectSection.sectionHeading?.heading || "",
            subHeading: attrs.recentProjectSection.sectionHeading?.subHeading,
            description: attrs.recentProjectSection.sectionHeading?.description,
          },
          cards:
            attrs.recentProjectSection.cards?.map((card) => ({
              id: String(card.id),
              variant: "simple" as const,
              headerImage: getMediaUrl(card.image) || "",
              headerImageAlt: card.heading || "Project image",
              heading: card.heading,
              subHeading: card.description || "",
              imageChip: card.imageChip
                ? {
                    label: card.imageChip,
                    color: card.chipColor as any,
                  }
                : null,
              buttons: card.CTA?.label
                ? [
                    {
                      label: card.CTA.label,
                      buttonStyle: "link-blue-arrow" as const,
                    },
                  ]
                : [],
            })) || [],
        }
      : undefined,
    accountabilitySection: {
      heading: attrs.accountabilitySection?.sectionHeading?.heading || "",
      subHeading: attrs.accountabilitySection?.sectionHeading?.subHeading,
      description:
        attrs.accountabilitySection?.sectionHeading?.description || "",
      items:
        attrs.accountabilitySection?.cards?.map((card) => ({
          id: card.id,
          icon: getMediaUrl(card.iconImage) || "",
          title: card.heading,
          description: card.description,
        })) || [],
      buttonText: attrs.accountabilitySection?.ctaText,
      buttonLink: attrs.accountabilitySection?.ctaLink,
    },
    ctaSection: attrs.callToAction
      ? {
          sectionHeading: attrs.callToAction.sectionHeading
            ? {
                heading: attrs.callToAction.sectionHeading.heading || "",
                subHeading: attrs.callToAction.sectionHeading.subHeading,
                description:
                  attrs.callToAction.sectionHeading.description || "",
              }
            : undefined,
          buttonText: attrs.callToAction.CTA?.[0]?.label || "",
          buttonLink: attrs.callToAction.CTA?.[0]?.url || "",
        }
      : undefined,
    impactStatsSection: attrs.impactStats
      ? {
          data: {
            impactStats:
              attrs.impactStats?.map((stat) => ({
                id: stat.id,
                value: stat.value,
                label: stat.caption || "",
                type: "count",
              })) || [],
          },
        }
      : undefined,
    faqs: attrs.faqs
      ? {
          faqs:
            attrs.faqs.faqs?.map((faq) => ({
              id: faq.id,
              question: faq.question,
              answer: faq.answer,
            })) || [],
          sectionHeading: {
            heading:
              attrs.faqs.sectionHeading?.heading || "YOUR QUESTIONS, ANSWERED",
            subHeading: attrs.faqs.sectionHeading?.subHeading || "Follow Us",
            description:
              attrs.faqs.sectionHeading?.description ||
              "Get quick answers to the most common questions about our platform and services.",
          },
        }
      : undefined,
    urgentAppeals: {
      heading: "URGENT APPEALS",
      subHeading: "Crisis Spotlight",
      description: "Help us support those in need",
      cards: [],
    },
  };
};
