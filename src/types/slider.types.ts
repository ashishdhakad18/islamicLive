import { ChipColor, ChipVariant } from "@/components/ui/Chip";
import { ButtonColor, ButtonVariant } from "@/components/ui/Button";

export type CardVariant = "event" | "campaign" | "simple";

export interface CardChip {
  label: string;
  color?: ChipColor;
  customColor?: string;
  variant?: ChipVariant;
}

export interface CardButton {
  label: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  color?: ButtonColor;
  className?: string;
  buttonStyle?: "default" | "link-blue-arrow";
  href?: string;
}

export interface CardData {
  id?: string;
  variant: CardVariant;
  headerImage: string;
  headerImageAlt: string;
  imageChip?: CardChip | null; // Chip on the image (like "URGENT")
  heading: string;
  subHeading: string;
  contentChips?: CardChip[]; // Chips in the content area
  buttons: CardButton[];
  metadata?: {
    date?: string;
    time?: string;
    location?: string;
    raised?: string;
    goal?: string;
  };
}

// types/slider.types.ts
export interface CardDataSq {
  id?: string;
  variant: CardVariant;
  headerImage: string;
  headerImageAlt: string;
  imageChip?: CardChip | null;
  heading: string;
  subHeading: string;
  contentChips?: CardChip[];
  link?: {
    href: string;
    label: string;
    icon?: string;
  };
}

export interface SliderProps {
  cards: CardData[];
  slidesToShow?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  autoPlay?: boolean;
  autoPlayInterval?: number;
  gap?: number;
  className?: string;
}
