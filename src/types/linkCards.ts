export interface LinkCardData {
  id: number;
  icon: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

export const linkcardData: LinkCardData[] = [
  {
    id: 1,
    icon: "/Icons/Sadaqah.png",
    title: "Sadaqah",
    description:
      "Give charity to support urgent needs and long-term projects worldwide.",
    link: "/donate",
    linkText: "Donate",
  },
  {
    id: 2,
    icon: "/Icons/Volunteering.svg",
    title: "Volunteering",
    description:
      "Join our community of volunteers and make a difference on the ground in Switzerland.",
    link: "/volunteer",
    linkText: "GET INVOLVED",
  },
  {
    id: 3,
    icon: "/Icons/Zakaat Calc.svg",
    title: "Zakaat Calculator",
    description:
      "Easily calculate your zakat and fulfill this important obligation with confidence.",
    link: "/zakaat-calculator",
    linkText: "CALCULATE",
  },
  {
    id: 4,
    icon: "/Icons/Sponsor.svg",
    title: "Sponsor an Orphan",
    description:
      "Give a child food, education, and security with your monthly sponsorship.",
    link: "/sponsor-an-orphan",
    linkText: "SPONSOR",
  },
];
