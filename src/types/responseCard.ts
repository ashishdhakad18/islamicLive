export interface ResponseCardData {
  image: string;
  alt: string;
  title: string;
  description: string;
  buttons: { label: string; link: string; bgColor: string }[];
}

// types/impact.ts
export type ImpactCardData = {
  id: string;
  icon: string;
  title: string;
  description: string;
};
