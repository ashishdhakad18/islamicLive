import { CountriesWeOperatePageData } from "@/types/countriesWeOperate.types";
import { SectionHeadingData, mapSectionHeading } from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { ImpactStat } from "@/types/impactStats";

// ==================== Types ====================

export interface CountriesHeroData {
  sectionHeading: SectionHeadingData;
  images: Array<{
    id: number;
    url: string;
    alt: string;
  }>;
  impactStats: ImpactStat[];
}

export interface WhereWeWorkData {
  sectionHeading: SectionHeadingData;
  heading: string;
  description: string | string[];
  image: {
    url: string;
    alt: string;
  };
}

export interface RegionData {
  id: string;
  name: string;
  countries: string[];
}

export interface MapSectionData {
  title: string;
  mapImage: {
    url: string;
    alt: string;
  };
  countryCount: number;
  regionCount: number;
  regions: RegionData[];
}

// ==================== Fallbacks ====================

const fallbackHeroHeading: SectionHeadingData = {
  heading: "ISLAMIC RELIEF DANS LE MONDE",
  subHeading: "Ensemble, pour un avenir meilleur",
  description:
    "Islamic Relief Suisse combat la pauvreté dans les régions les plus vulnérables grâce à un réseau humanitaire actif dans plus de 40 pays.",
};

const fallbackWhereWeWorkHeading: SectionHeadingData = {
  heading: "OÙ INTERVENONS-NOUS ?",
  subHeading: "Ensemble, pour un avenir meilleur",
  description:
    "Une présence mondiale afin de donner une vie meilleure pour des millions de personnes.",
};

const fallbackCallToActionHeading: SectionHeadingData = {
  heading: "L'humanité est notre motivation",
  subHeading: "L'humanité est notre famille.",
  description:
    "Le fonds des urgences est ce qui permet à notre ONG d'intervenir immédiatement lorsqu'une crise frappe.",
};

// ==================== Mapper Functions ====================

/**
 * Map Hero Section (Sec1) data
 */
export const mapCountriesHero = (
  data: CountriesWeOperatePageData
): CountriesHeroData => {
  const heroSection = data?.Sec1;

  return {
    sectionHeading: mapSectionHeading(
      heroSection?.sectionHeading,
      fallbackHeroHeading
    ),
    images:
      heroSection?.images?.map((image, index) => ({
        id: image.id || index + 1,
        url: getMediaUrl(image) || "",
        alt: image.alternativeText || "Countries hero image",
      })) || [],
    impactStats:
      heroSection?.stats?.map((stat, index) => ({
        id: stat.id || index + 1,
        value: stat.value || "",
        label: stat.caption || "",
        type: "count" as const,
      })) || [],
  };
};

/**
 * Map Where We Work Section (Sec2) data
 */
export const mapWhereWeWork = (
  data: CountriesWeOperatePageData
): WhereWeWorkData => {
  const section = data?.Sec2;

  // Parse description - could be string or array from CMS
  let description: string | string[] = "";
  if (section?.description) {
    // Check if it contains paragraph breaks (double newlines)
    if (section.description.includes("\n\n")) {
      description = section.description.split("\n\n").filter(Boolean);
    } else {
      description = section.description;
    }
  }

  return {
    sectionHeading: mapSectionHeading(
      section?.sectionHeading,
      fallbackWhereWeWorkHeading
    ),
    heading: section?.heading || "ISLAMIC RELIEF : UNE PRESENCE MONDIALE",
    description:
      description ||
      "Présente dans les régions les plus reculées du monde, Islamic Relief s'engage chaque jour à combattre la pauvreté.",
    image: {
      url: getMediaUrl(section?.image) || "/Images/mockImages/blackboys.png",
      alt: section?.image?.alternativeText || "Children smiling",
    },
  };
};

/**
 * Map Map Section (Sec3) data
 */
export const mapMapSection = (
  data: CountriesWeOperatePageData
): MapSectionData => {
  const section = data?.Sec3;

  // Map regions from accordion items
  const regions: RegionData[] =
    section?.contAccord?.map((item, index) => ({
      id: String(item.id || index + 1),
      name: item.name || `Region ${index + 1}`,
      countries: item.countries
        ? item.countries.split(",").map((c) => c.trim())
        : [],
    })) || [];

  return {
    title: section?.title || "ISLAMIC RELIEF : SOLIDARITÉ À TRAVERS LE MONDE",
    mapImage: {
      url: getMediaUrl(section?.mapImg) || "/Images/mockImages/worldmap.png",
      alt: section?.mapImg?.alternativeText || "World Map showing regions",
    },
    countryCount: section?.countryCount || 30,
    regionCount: section?.regionCount || 4,
    regions,
  };
};

// ==================== CallToAction Section Data ====================

export interface CallToActionCTA {
  id: number;
  label: string;
  url: string;
}

export interface CallToActionSectionData {
  sectionHeading: SectionHeadingData;
  ctas: CallToActionCTA[];
}

/**
 * Map Call to Action Section
 */
export const mapCountriesCallToAction = (
  data: CountriesWeOperatePageData
): CallToActionSectionData => {
  const section = data?.callToAction;

  return {
    sectionHeading: mapSectionHeading(
      section?.sectionHeading,
      fallbackCallToActionHeading
    ),
    ctas:
      section?.CTA?.map((cta, index) => ({
        id: cta.id || index + 1,
        label: cta.label || "",
        url: cta.url || "",
      })) || [],
  };
};

/**
 * Get all countries page data mapped
 */
export const mapCountriesPageData = (data: CountriesWeOperatePageData) => {
  return {
    hero: mapCountriesHero(data),
    whereWeWork: mapWhereWeWork(data),
    mapSection: mapMapSection(data),
    callToAction: mapCountriesCallToAction(data),
  };
};
