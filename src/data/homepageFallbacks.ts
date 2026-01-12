import { CarouselData } from "@/types/carousel.types";
import { ImpactData } from "@/types/impactData";
import { ImpactStatsData } from "@/types/impactStats";

export const fallbackCarouselData: CarouselData = {
  carouselItems: [
    {
      id: "1",
      url: "/Images/Homepage-Hero-1.png",
      alt: "Hero image",
      title: "Sponsor An Orphan In Gaza.",
      subtitle: "For Only 70 CHF Per Month, You Can Change An Orphan's Life.",
      buttonText: "Learn More",
      buttonLink: "/donate",
    },
    {
      id: "2",
      url: "/Images/History-Hero-Img.png",
      alt: "Hero image",
      title: "Provide Water",
      subtitle: "Help us build homes for the displaced.",
      buttonText: "Learn More",
      buttonLink: "/donate",
    },
    {
      id: "3",
      url: "/Images/History-Situation-Img.png",
      alt: "Hero image",
      title: "Islamic Relief in Action",
      subtitle: "See the impact of Islamic Relief.",
      buttonText: "Learn More",
      buttonLink: "/donate",
    },
  ],
};

export const fallbackImpactData: ImpactData = {
  stats: [
    {
      id: 1,
      icon: "/Icons/Sadaqah.png",
      value: "125,000",
      label: "Lives Impacted",
      description: "People reached with life-saving aid",
    },
    {
      id: 2,
      icon: "/Icons/Sadaqah.png",
      value: "125,000",
      label: "FAMILIES HELPED",
      description: "Families provided with emergency support",
    },
    {
      id: 3,
      icon: "/Icons/Sadaqah.png",
      value: "850,000",
      label: "CLEAN WATER ACCESS",
      description: "People with access to clean water",
    },
    {
      id: 4,
      icon: "/Icons/Sadaqah.png",
      value: "125,000",
      label: "CHILDREN EDUCATED",
      description: "Children receiving quality education",
    },
  ],
};

export const fallbackImpactStats: ImpactStatsData = {
  impactStats: [
    {
      id: 1,
      value: "94%",
      label: "Directly to programs",
      type: "percentage",
    },
    {
      id: 2,
      value: "2.4M+",
      label: "Lives helped annually",
      type: "count",
    },
    {
      id: 3,
      value: "40+",
      label: "Countries worldwide",
      type: "count",
    },
  ],
};

export const fallbackHeroHeading = {
  subHeading: "Since 1993",
  heading: "Together, we save lives",
  description: "Your donation brings urgent relief and lasting change for families worldwide.",
};

export const fallbackCampaignHeading = {
  subHeading: "URGENT APPEALS",
  heading: "Crisis Spotlight",
  description: "Crisis situations requiring immediate support from our global community",
};

export const fallbackImpactHeading = {
  subHeading: "Why Islamic Relief",
  heading: "Impact",
  description: "Built on faith, powered by experience, trusted by millions worldwide",
};

export const fallbackTestimonialsHeading = {
  subHeading: "ISLAMIC RELIEF ON THE GROUND",
  heading: "Impact",
  description: "2024 Restera Gravée Dans L'histoire D'Islamic Relief Suisse Comme Une Année À La Fois Mémorable Et Poignante. Nous Avons Célébré Notre 30° Anniversaire, Mais Dans Un Contexte Global Marqué Par Des Souffrances Immenses.",
};

export const fallbackNewsHeading = {
  heading: "Latest News",
  subHeading: "Stories",
  description: "Built on faith, powered by experience, trusted by millions worldwide",
};

export const fallbackSocialHeading = {
  subHeading: "FOLLOW US FOR THE LATEST NEWS",
  heading: "Follow Us",
  description: "On our social media, we make our activities visible on a daily basis. Here you can take part of updates from our field offices and share content with your friends and followers!",
};

export const fallbackImpactImage = "/Images/mockImages/ImpactSection.png";

export const fallbackFaqHeading = {
  subHeading: "Follow Us",
  heading: "YOUR QUESTIONS, ANSWERED",
  description: "Get quick answers to the most common questions about our platform and services.",
};

export const fallbackEventHeading = {
  subHeading: "Fundraiser",
  heading: "Upcoming Events",
  description: "Built on faith, powered by experience, trusted by millions worldwide",
};

