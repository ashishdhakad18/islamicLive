export interface ImpactGridItem {
  id?: number | string;
  theme: "red" | "green" | "yellow" | "primary";
  icon: string;
  description: string;
  value?: string;
  title?: string;
}

export interface ImpactGridProps {
  heading: string;
  subheading: string;
  description: string;
  items: ImpactGridItem[];
  images: string[]; // Expecting exactly 5 images in order
  className?: string;
}
