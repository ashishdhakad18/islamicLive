// data/mockCarouselData.ts

import { CarouselData } from "@/types/carousel.types";

export const mockCarouselData: CarouselData = {
  carouselItems: [
    {
      id: "1",
      url: "/Images/Homepage-Hero-1.png",
      alt: "Orphan child 1",
      title: "SPONSOR AN ORPHAN IN GAZA.",
      subtitle: "For Only 70 CHF Per Month, You Can Change An Orphan's Life.",
      buttonText: "BUTTON",
      buttonLink: "/sponsor",
    },
    {
      id: "2",
      url: "/Images/Homepage-Hero-1.png",
      alt: "Orphan child 2",
      title: "Provide Shelter",
      subtitle: "Help us build homes for the displaced.",
      buttonText: "DONATE",
      buttonLink: "/donate",
    },
    {
      id: "3",
      url: "/Images/Homepage-Hero-1.png",
      alt: "Orphan child 3",
      title: "Medical Aid",
      subtitle: "Your support brings healing to those in need.",
      buttonText: "SUPPORT",
      buttonLink: "/medical",
    },
  ],
};
