import { StrapiMedia } from "./strapi";
import { Cause, ActionCategory } from "@/data/donationTranslations";

export interface StrapiSectionHeading {
  title: string;
  subtitle: string;
}

export interface StrapiIntroCard {
  id: number;
  title: string;
  subTitle: string;
  iconImage: { data: StrapiMedia };
}

export interface StrapiIntroSection {
  sectionHeading: StrapiSectionHeading;
  introCard: StrapiIntroCard[];
}

export interface StrapiFrequencySection {
  frequencySectionTitle: StrapiSectionHeading;
  frequencyCard: StrapiIntroCard[];
}

export interface StrapiFundAmountSection {
  sectionHeading: StrapiSectionHeading;
  donateFor: { id: number; addAction: string }[];
  chooseAmountHeading: StrapiSectionHeading;
  allActionPopUp: { id: number; title: string; tab: string }[];
}

export interface StrapiLoginDetailSection {
  sectionHeading: StrapiSectionHeading;
  civilty: string;
  placeHolderText: { id: number; addAction: string }[];
}

export interface StrapiPaymentDetail {
  sectionHeading: StrapiSectionHeading;
}

export interface StrapiDonationStatus {
  sectionHeading: StrapiSectionHeading;
  DonationStatus: {
    id: number;
    donationstatus: string;
    message: string;
  }[];
}

export interface StrapiDonationFlowAttributes {
  introSection: StrapiIntroSection;
  frequencySection: StrapiFrequencySection;
  fundAmountSection: StrapiFundAmountSection;
  loginDetailSection: StrapiLoginDetailSection;
  paymentDetail: StrapiPaymentDetail;
  donationStatus: StrapiDonationStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface DonationPageData {
  intro: {
    title: string;
    subtitle: string;
    steps: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  frequency: {
    title: string;
    subtitle: string;
    options: {
      label: string;
      sub: string;
      value: string;
      icon: string;
    }[];
  };
  funds: {
    title: string;
    subtitle: string;
    causes: Cause[];
    chooseAmountTitle: string;
    chooseAmountSubtitle: string;
    seeAllActionsLabel: string;
    allActions: Record<string, Cause[]>;
    allActionsCategories: ActionCategory[];
  };
  login: {
    title: string;
    subtitle: string;
    placeholders: Record<string, string>;
  };
  payment: {
    title: string;
    subtitle: string;
  };
  status: {
    title: string;
    subtitle: string;
    configs: Record<string, {
      title: string;
      desc: string;
      icon: string;
    }>;
  };
}
