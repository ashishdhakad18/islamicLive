// types/carousel.types.ts
export interface CarouselItem {
  id: string;
  url: string | null;
  alt: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export interface CarouselData {
  carouselItems: CarouselItem[];
}
