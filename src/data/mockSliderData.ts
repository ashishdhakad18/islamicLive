// data/mockSliderData.ts
import { CardData, CardDataSq } from "@/types/slider.types";

export const mockEventCards: CardData[] = [
  {
    id: "1",
    variant: "event",
    headerImage: "/Images/mockImages/Events1.png",
    headerImageAlt: "Sudan Hunger Event",
    heading: "SUDAN HUNGER",
    subHeading:
      "Fighting malnutrition and providing food security for vulnerable children.",
    contentChips: [
      { label: "OCT 11, 2025", color: "grey", variant: "soft" },
      { label: "FUNDRAISER", color: "teal", variant: "soft" },
    ],
    buttons: [],
    metadata: {
      date: "Wednesday, 15th October",
      time: "11:00AM to 3:00PM",
    },
  },
  {
    id: "2",
    variant: "event",
    headerImage: "/Images/mockImages/Events2.png",
    headerImageAlt: "Adelaide Event",
    heading: "ADELAIDE CHARITY DINNER",
    subHeading:
      "Join us for an evening of giving and community support in Adelaide.",
    contentChips: [
      { label: "OCT 17, 2025", color: "grey" },
      { label: "DINNER", color: "teal", variant: "soft" },
    ],
    buttons: [],
    metadata: {
      location: "ADELAIDE | FRIDAY 17TH OCT",
      date: "Friday, 17th October",
      time: "6:00PM to 10:00PM",
    },
  },
  {
    id: "3",
    variant: "event",
    headerImage: "/Images/mockImages/Events3.png",
    headerImageAlt: "Melbourne Walk",
    heading: "MELBOURNE CHARITY WALK",
    subHeading:
      "Walk for a cause! Join thousands of others in our annual charity walk.",
    contentChips: [
      { label: "OCT 24, 2025", color: "grey" },
      { label: "WALK", color: "teal", variant: "soft" },
    ],
    buttons: [],
    metadata: {
      location: "MELBOURNE | FRIDAY 24TH OCT",
      date: "Friday, 24th October",
      time: "8:00AM to 12:00PM",
    },
  },
  {
    id: "4",
    variant: "event",
    headerImage: "/Images/mockImages/Events2.png",
    headerImageAlt: "Sydney Gala",
    heading: "SYDNEY GALA NIGHT",
    subHeading:
      "A night of elegance and generosity to support our global initiatives.",
    contentChips: [
      { label: "NOV 01, 2025", color: "grey" },
      { label: "GALA", color: "teal", variant: "soft" },
    ],
    buttons: [],
    metadata: {
      location: "SYDNEY | SATURDAY 1ST NOV",
      date: "Saturday, 1st November",
      time: "7:00PM to 11:00PM",
    },
  },
  {
    id: "5",
    variant: "event",
    headerImage: "/Images/mockImages/Events3.png",
    headerImageAlt: "Perth Workshop",
    heading: "PERTH COMMUNITY WORKSHOP",
    subHeading: "Learn how you can make a difference in your local community.",
    contentChips: [
      { label: "NOV 10, 2025", color: "grey" },
      { label: "WORKSHOP", color: "teal", variant: "soft" },
    ],
    buttons: [],
    metadata: {
      location: "PERTH | MONDAY 10TH NOV",
      date: "Monday, 10th November",
      time: "9:00AM to 1:00PM",
    },
  },
];

export const mockCampaignCards: CardData[] = [
  {
    id: "1",
    variant: "campaign",
    headerImage: "/Images/Urg-Appl-Home-1.webp",
    headerImageAlt: "Sudan Hunger Campaign",
    imageChip: { label: "URGENT", customColor: "var(--color-blood-red-dark)" },
    heading: "SUDAN HUNGER",
    subHeading:
      "Millions are facing starvation. Your donation can save lives today.",
    buttons: [
      {
        label: "DONATE NOW",

        variant: "solid",
        color: "yellow",
      },
    ],
    // metadata: {
    //   raised: "$1.8M RAISED",
    //   goal: "GOAL $3M",
    // },
  },
  {
    id: "2",
    variant: "campaign",
    headerImage: "/Images/Urg-Appl-Home-2.webp",
    headerImageAlt: "Gaza Crisis",
    imageChip: { label: "URGENT", customColor: "var(--color-blood-red-dark)" },
    heading: "GAZA EMERGENCY",
    subHeading:
      "Providing critical medical aid and food supplies to families in Gaza.",
    buttons: [
      {
        label: "DONATE NOW",

        variant: "solid",
        color: "yellow",
      },
    ],
    // metadata: {
    //   raised: "$5.2M RAISED",
    //   goal: "GOAL $10M",
    // },
  },
  {
    id: "3",
    variant: "campaign",
    headerImage: "/Images/Urg-Appl-Home-3.webp",
    headerImageAlt: "Orphan Sponsorship",
    // imageChip: { label: "ONGOING", color: "teal" },
    heading: "ORPHAN SPONSORSHIP",
    subHeading:
      "Give a vulnerable child hope for a brighter future through sponsorship.",
    buttons: [
      {
        label: "SPONSOR NOW",

        variant: "solid",
        color: "yellow",
      },
    ],
    // metadata: {
    //   raised: "12,000 SPONSORED",
    //   goal: "GOAL 15,000",
    // },
  },
  {
    id: "4",
    variant: "campaign",
    headerImage: "/Images/Urg-Appl-Home-1.webp",
    headerImageAlt: "Water for Life",
    heading: "WATER FOR LIFE",
    subHeading:
      "Building wells and providing clean water to communities in need.",
    buttons: [
      {
        label: "GIVE WATER",

        variant: "solid",
        color: "yellow",
      },
    ],
    // metadata: {
    //   raised: "$850K RAISED",
    //   goal: "GOAL $1.2M",
    // },
  },
  {
    id: "5",
    variant: "campaign",
    headerImage: "/Images/Urg-Appl-Home-2.webp",
    headerImageAlt: "Winter Appeal",
    heading: "WINTER APPEAL",
    subHeading:
      "Keep families warm this winter with blankets, heaters, and warm clothes.",
    imageChip: { label: "SEASONAL", color: "primary" },
    buttons: [
      {
        label: "DONATE WARMTH",

        variant: "solid",
        color: "yellow",
      },
    ],
    // metadata: {
    //   raised: "$200K RAISED",
    //   goal: "GOAL $500K",
    // },
  },
  {
    id: "6",
    variant: "campaign",
    headerImage: "/Images/Urg-Appl-Home-1.webp",
    headerImageAlt: "Education Fund",
    heading: "EDUCATION EMERGENCY",
    subHeading:
      "Help rebuild schools and provide educational materials to children.",
    // contentChips: [{ label: "EDUCATION", color: "purple" }],
    buttons: [
      {
        label: "SUPPORT EDUCATION",

        variant: "solid",
        color: "yellow",
      },
    ],
    // metadata: {
    //   raised: "$300K RAISED",
    //   goal: "GOAL $1M",
    // },
  },
];

export const mockEventCards2: CardDataSq[] = [
  {
    id: "1",
    variant: "event",
    headerImage: "/Images/mockImages/Events1.png",
    headerImageAlt: "Sudan Hunger Event",
    heading: "SUDAN HUNGER",
    subHeading:
      "Fighting malnutrition and providing food security for vulnerable children.",
    contentChips: [
      { label: "OCT 11, 2025", color: "grey", variant: "soft" },
      { label: "FUNDRAISER", color: "teal", variant: "soft" },
    ],
    link: {
      href: "/events/sudan-hunger",
      label: "EN SAVOIR PLUS",
      icon: "/icons/arrow-right.svg",
    },
  },
  {
    id: "2",
    variant: "event",
    headerImage: "/Images/mockImages/Events2.png",
    headerImageAlt: "Adelaide Event",
    heading: "ADELAIDE CHARITY DINNER",
    subHeading:
      "Join us for an evening of giving and community support in Adelaide.",
    contentChips: [
      { label: "OCT 17, 2025", color: "grey", variant: "soft" },
      { label: "DINNER", color: "teal", variant: "soft" },
    ],
    link: {
      href: "/events/adelaide-charity-dinner",
      label: "EN SAVOIR PLUS",
      icon: "/icons/arrow-right.svg",
    },
  },
  {
    id: "3",
    variant: "event",
    headerImage: "/Images/mockImages/Events3.png",
    headerImageAlt: "Melbourne Walk",
    heading: "MELBOURNE CHARITY WALK",
    subHeading:
      "Walk for a cause! Join thousands of others in our annual charity walk.",
    contentChips: [
      { label: "OCT 24, 2025", color: "grey", variant: "soft" },
      { label: "WALK", color: "teal", variant: "soft" },
    ],
    link: {
      href: "/events/melbourne-charity-walk",
      label: "EN SAVOIR PLUS",
      icon: "/icons/arrow-right.svg",
    },
  },
  {
    id: "4",
    variant: "event",
    headerImage: "/Images/mockImages/Events2.png",
    headerImageAlt: "Sydney Gala",
    heading: "SYDNEY GALA NIGHT",
    subHeading:
      "A night of elegance and generosity to support our global initiatives.",
    contentChips: [
      { label: "NOV 01, 2025", color: "grey", variant: "soft" },
      { label: "GALA", color: "teal", variant: "soft" },
    ],
    link: {
      href: "/events/sydney-gala-night",
      label: "EN SAVOIR PLUS",
      icon: "/icons/arrow-right.svg",
    },
  },
];
