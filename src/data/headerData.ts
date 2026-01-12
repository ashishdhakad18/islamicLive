import { SocialLinkItem, DropdownItem } from "@/types/header.types";

export const headerSocialLinks: SocialLinkItem[] = [
  { type: "facebook", href: "https://facebook.com/islamicrelief" },
  { type: "whatsapp", href: "https://wa.me/123456789" },
  { type: "tiktok", href: "https://www.tiktok.com/@islamicrelief" },
  { type: "instagram", href: "https://www.instagram.com/islamicrelief" },
  { type: "linkedin", href: "https://www.linkedin.com/company/islamic-relief" },
  { type: "youtube", href: "https://www.youtube.com/islamicrelief" },
];

export const headerDropdownData: DropdownItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Careers", href: "/careers" },
  { label: "Our History", href: "/history" },
  { label: "Financials", href: "/financials" },
];

export const headerNavigationData: DropdownItem[] = [
  {
    label: "About",
    items: [
      { label: "About Us", href: "/about-us" },
      { label: "Our History", href: "/our-history" },
      { label: "Our Work", href: "/our-work" },
      { label: "Financial Transparancy", href: "/financial-transparancy" },
      { label: "Presentation", href: "/presentation" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    label: "Our Impact",
    items: [
      {
        label: "Emergencies",
        href: "/emergencies",
        items: [
          { label: "Palestine", href: "/emergencies/palestine" },
          { label: "Sudan", href: "/emergencies/sudan" },
        ],
      },
      {
        label: "Sustainable Projects",
        // href: "/sustainable-projects",
        items: [
          { label: "Education", href: "/sustainable-projects/education" },
          { label: "Nutrition", href: "/sustainable-projects/nutrition" },
          { label: "Health", href: "/sustainable-projects/health" },
          { label: "Water", href: "/sustainable-projects/water" },
          { label: "Economy", href: "/sustainable-projects/economy" },
        ],
      },
      { label: "Campaigns", href: "/campaigns" },
      { label: "Countries We Operate", href: "/countries-we-operate" },
    ],
  },
  {
    label: "Islamic Giving",
    items: [
      { label: "Zakat al Maal", href: "/zakat-al-maal" },
      { label: "Sadaqah", href: "/sadaqah" },
      { label: "Aqiqah", href: "/aqiqah" },
      { label: "Fidya & Kaffara", href: "/fidya-kaffara" },
      { label: "Bank Interest", href: "/bank-interest" },
    ],
  },
  {
    label: "Get Involved",
    items: [
      { label: "Get Involved", href: "/get-involved" },
      { label: "Donate", href: "/donate" },
    ],
  },
  {
    label: "Media",
    items: [
      { label: "News", href: "/news" },
      { label: "FAQ", href: "/faq" },
      // { label: "Components Test", href: "/components-test" }, // Hidden for production-feel, but in codebase
    ],
  },
];
