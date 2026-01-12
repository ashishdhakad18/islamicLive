export type SocialLinkItem = {
  type:
    | "facebook"
    | "whatsapp"
    | "tiktok"
    | "instagram"
    | "linkedin"
    | "youtube"
    | "light"
    | "dark"
    | "default";
  href: string;
  label?: string;
};

export interface DropdownItem {
  label: string;
  href?: string;
  items?: DropdownItem[];
  onClick?: () => void;
}
