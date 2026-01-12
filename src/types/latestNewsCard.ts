export interface LatestNewsCardData {
  id: number;
  image: string;
  title: string;
  read: string;
  date: string;
  categories: string[];
  link: string;
}

export const latestNewsCardData: LatestNewsCardData[] = [
  {
    id: 1,
    image: "/Images/mockImages/LatestNews1.png",
    title: "Islamic Relief provides ongoing medical support",
    read: "3 MIN READ",
    date: "DECEMBER 13, 2023",
    categories: ["Article", "Fundraiser"],
    link: "/news/islamic-relief-medical-support",
  },
  {
    id: 2,
    image: "/Images/mockImages/LatestNews2.png",
    title: "Clean and safe water is the key to life.",
    read: "3 MIN READ",
    date: "DECEMBER 13, 2023",
    categories: ["Article", "Fundraiser"],
    link: "/news/islamic-relief-medical-support",
  },
  {
    id: 3,
    image: "/Images/mockImages/LatestNews3.png",
    title: "Vanuatu’s rugged geography poses challenges for infrastructure",
    read: "3 MIN READ",
    date: "DECEMBER 13, 2023",
    categories: ["Article", "Fundraiser"],
    link: "/news/islamic-relief-medical-support",
  },
  {
    id: 4,
    image: "/Images/mockImages/Latest-News-4.png",
    title: "Supporting rightsholders across Cambodia, Vanuatu, Solomon Islands and Papua",
    read: "3 MIN READ",
    date: "DECEMBER 13, 2023",
    categories: ["Article", "Fundraiser"],
    link: "/news/islamic-relief-medical-support",
  },
  {
    id: 5,
    image: "/Images/mockImages/Latest-News-5.png",
    title: "ECD interventions are vital in Solomon Islands’ rural areas",
    read: "3 MIN READ",
    date: "DECEMBER 13, 2023",
    categories: ["Article", "Fundraiser"],
    link: "/news/islamic-relief-medical-support",
  },
];
