export const transparencyCardData = {
  cards: [
    {
      id: 1,
      title: "ZAKAT OU SADAQAH",
      description:
        "Vos Zakat et vos Sadaqah permettent de sauver des vies et de bâtir un avenir plus juste.",
      icon: "charity",
    },
    {
      id: 2,
      title: "CONFIANCE",
      description:
        "Depuis 1994, vous nous confiez plus que des dons : vous nous faites confiance. Pour nous, c’est un dépôt sacré.",
      icon: "trust",
    },
    {
      id: 3,
      title: "AUDIT",
      description:
        "Chaque franc est utilisé avec soin, audité et transformé en actions concrètes qui changent des vies.",
      icon: "audit",
    },
    {
      id: 4,
      title: "TRANSPARENCE",
      description:
        "Et parce que la transparence passe aussi par le dialogue, nos portes vous sont toujours ouvertes.",
      icon: "transparency",
    },
  ],
  visitUs: {
    title: "RENDEZ NOUS VISITE",
    organization: "ISLAMIC RELIEF SUISSE",
    address: {
      street: "Avenue du Bouchet 18",
      postalCode: "1209",
      city: "Geneva",
      country: "Suisse",
    },
    phone: "+41 22 73 202 73",
    email: "contact@islamic-relief.ch",
    actions: [
      {
        label: "JE FAIS UNE SADAQAH",
        type: "sadaqah",
        icon: "arrow",
        onClick: () => {
          window.location.href = "/donate";
        },
      },
      {
        label: "JE DONNE MA ZAKAT AL MAAL",
        type: "zakat",
        icon: "arrow",
        onClick: () => {
          window.location.href = "/donate";
        },
      },
    ],
  },
};
