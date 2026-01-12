export interface FundamentalsCardProps {
  id: number;
  title: string;
  description: string;
  items?: string[];
  itemsLabel?: string;
  buttonText?: string;
  buttonLink?: string;
  caption?: {
    captionHeading?: string;
    captionDescription?: string;
  };
}

export const fundamentalsCards: FundamentalsCardProps[] = [
  {
    id: 1,
    title: "Qu’est-ce que la Aqiqa ?",
    description: "La Aqiqa est une belle Sunna du Prophète Muhammad ﷺ qui consiste à sacrifier un animal en signe de gratitude envers Allah pour la naissance d’un enfant.",
    itemsLabel: "Répartition recommandée",
    items: [
      "Le sacrifice est idéalement effectué le 7ème jour après la naissance.",
      "Pour un garçon : le sacrifice de deux moutons est recommandé.",
      "Pour une fille : le sacrifice d'un mouton est recommandé.",
    ],

    buttonText: "Offrez votre Aqiqa",
    buttonLink: "/donate",
  },
  {
    id: 2,
    title: "un geste de solidarité envers les plus démunis",
    description: "Chez Islamic Relief Suisse, nous transformons cette tradition spirituelle en un acte concret de partage. Des millions de personnes à travers le monde vivent dans la pauvreté, parfois sans repas complet pendant plusieurs jours. Votre don pourrait offrir un repas à une famille et lui apporter les nutriments essentiels dont elle a besoin. Il lui permettrait également de participer à la célébration d’une nouvelle vie.La récompense liée à cette Sunna bien-aimée profite ainsi à chacun d’entre nous.",
  },
];
