import { SustainableProject } from "@/types/sustainableProjects";

// export const sustainableProjectsConfig: SustainableProjectsConfig = {
//   showGridSection: true,
// };

// export const sustainableProjectsData: Record<string, SustainableProject> = {
//   education: {
//     slug: "education",
//     title: "Education",
//     primaryColour: "bg-royal", // Example Blue
//     secondaryColour: "bg-royal-lighter", // Example Light Blue
//     thirdColor: "bg-royal-divider", // Example Dark Blue
//     hero: {
//       heading: "We respond with faith and compassion.",
//       description:
//         "Education is protection, dignity and hope. Islamic Relief Switzerland ensures access to learning for children and adults in crisis.",
//       subheading: "We respond with faith and compassion.",
//       buttonLink: "/donate",
//       buttonText: "Donate for Children's Education",
//       carouselData: {
//         carouselItems: [
//           {
//             id: "1",
//             url: "/Images/Sustain-proj-Hero-Img-1.webp", // Placeholder
//             alt: "Education",
//             title: "",
//             subtitle: "",
//             buttonText: "",
//             buttonLink: "",
//           },
//         ],
//       },
//     },
//     impactGrid: {
//       heading: "Why Education is Essential",
//       subheading: "Situation",
//       description:
//         "Education does more than transmit knowledge — it promotes resilience, strengthens communities, and opens sustainable opportunities for children living in crisis. At Islamic Relief we believe every child deserves a chance to succeed. Our programs combine quality education with psychosocial support for students in high-risk areas.",
//       items: [
//         {
//           theme: "red",
//           value: "11,8 millions",
//           icon: "/Icons/Sadaqah-red.svg",
//           title: "Stability and normalcy for children in crisis",
//           description:
//             "Education restores hope, strengthens communities, and creates lasting",
//         },
//         {
//           theme: "green",
//           value: "1,5 MILLION",
//           icon: "/Icons/Sadaqah-green.svg",
//           title: "Skills for long-term resilience",
//           description:
//             "Education restores hope, strengthens communities, and creates lasting",
//         },
//         {
//           theme: "yellow",
//           value: "70%",
//           icon: "/Icons/Sadaqah-yellow.svg", // Using placeholder, please update if yellow icon exists
//           title: "Psychosocial recovery and hope",
//           description:
//             "Education restores hope, strengthens communities, and creates lasting",
//         },
//       ],
//       images: [
//         "/Images/Situation-images-1.webp",
//         "/Images/Situation-images-4.webp",
//         "/Images/Situation-images-2.webp",
//         "/Images/Situation-images-1.webp",
//         "/Images/Situation-images-3.webp",
//       ],
//     },
//     mission: {
//       sectionHeading: {
//         subHeading: "Des moyens pour faire la différence",
//         heading: "pourquoi Islamic Relief suisse?",
//         description:
//           "Votre contribution est bien plus qu’un simple don — c’est votre compassion mise en action.",
//       },
//       cards: [
//         {
//           id: 1,
//           icon: "/Icons/Shield-primary.svg",
//           title: "Transparence",
//           description: "Une gestion rigoureuse et efficace de vos dons",
//         },
//         {
//           id: 2,
//           icon: "/Icons/Impact-primary.svg",
//           title: "Impact Direct",
//           description:
//             "Chaque Fidya ou Kaffara nourrit directement des familles vulnérables",
//         },
//         {
//           id: 3,
//           icon: "/Icons/Globe-primary.svg",
//           title: "confiance",
//           description: "30 ans d’engagement humanitaire dans plus de 40 pays",
//         },
//       ],
//     },
//     accountabilitySection: {
//       subHeading: "Trust & Integrity",
//       heading: "Accountability & Transparency",
//       description:
//         "Thanks to your support, lives are saved before the world reacted.",
//       buttonText: "Support Education Now",
//       buttonLink: "/donate",
//       items: [
//         {
//           id: 1,
//           icon: "/Icons/Dollar-primary.svg",
//           title: "WHERE IS YOUR MONEY GOING?",
//           description:
//             "Your donation is safe at Islamic Relief Switzerland because we are transparent about how much we collect and how it is spent.",
//         },
//         {
//           id: 2,
//           icon: "/Icons/Star-primary.svg",
//           title: "WHY CAN YOU TRUST US?",
//           description:
//             "In accordance with our Islamic values d'ihsan (excellence) and d'amanah (conservation), we are committed to ensuring that your donations are used as efficiently as possible and that we provide the best possible service to those we aidons.",
//         },
//         {
//           id: 3,
//           icon: "/Icons/Bulb-primary.svg",
//           title: "TRANSPARENCY AND ACCOUNTABILITY",
//           description:
//             "This is why we make no secret that we have administration and fundraising costs and that these are necessary expenses for a global charity that is committed to the highest international humanitarian standards.",
//         },
//       ],
//     },
//     ctaSection: {
//       heading:
//         "accomplissez votre devoir, nourrissez une âme, et restaurez l’équilibre.",
//       description:
//         "Faites de ce Ramadan un moment encore plus porteur de sens ",
//       buttonText: "Support Education Now",
//       buttonLink: "/donate",
//     },
//     urgentAppeals: {
//       heading: "URGENT APPEALS",
//       subheading: "Crisis Spotlight",
//       description:
//         "Crisis situations requiring immediate support from our global community",
//       cards: [
//         {
//           id: "1",
//           variant: "campaign",
//           headerImage: "/Images/Situation-images-1.webp",
//           headerImageAlt: "Gaza Emergency",
//           imageChip: {
//             label: "Emergency",
//             color: "red",
//           },
//           heading: "Gaza Emergency",
//           subHeading: "Help provide urgent aid to families in Gaza.",
//           buttons: [
//             {
//               label: "Learn More",
//               buttonStyle: "link-blue-arrow",
//               color: "primary",
//               variant: "ghost",
//             },
//           ],
//         },
//         {
//           id: "2",
//           variant: "campaign",
//           headerImage: "/Images/Situation-images-2.webp",
//           headerImageAlt: "Sudan Emergency",
//           imageChip: {
//             label: "Urgent",
//             color: "red",
//           },
//           heading: "Sudan Emergency",
//           subHeading: "Support families displaced by conflict in Sudan.",
//           buttons: [
//             {
//               label: "Learn More",
//               buttonStyle: "link-blue-arrow",
//               color: "primary",
//               variant: "ghost",
//             },
//           ],
//         },
//         {
//           id: "3",
//           variant: "campaign",
//           headerImage: "/Images/Situation-images-3.webp",
//           headerImageAlt: "Yemen Crisis",
//           imageChip: {
//             label: "Critical",
//             color: "red",
//           },
//           heading: "Yemen Crisis",
//           subHeading: "Provide food and medical aid to Yemen.",
//           buttons: [
//             {
//               label: "Learn More",
//               buttonStyle: "link-blue-arrow",
//               color: "primary",
//               variant: "ghost",
//             },
//           ],
//         },
//       ],
//     },
//     impactStatsSection: {
//       heading: "Our Global Impact",
//       description:
//         "Through your support, we are making a measurable difference in the lives of children and communities around the world.",
//       buttonText: "Donate Now",
//       buttonLink: "/donate",
//       data: {
//         impactStats: [
//           {
//             id: 1,
//             value: "94%",
//             label: "Directly to programs",
//             type: "percentage",
//           },
//           {
//             id: 2,
//             value: "2.4M+",
//             label: "Lives helped annually",
//             type: "count",
//           },
//           {
//             id: 3,
//             value: "40+",
//             label: "Countries worldwide",
//             type: "count",
//           },
//         ],
//       },
//     },
//   },
//   nutrition: {
//     slug: "nutrition",
//     title: "Nutrition",
//     primaryColour: "bg-royal",
//     secondaryColour: "bg-royal-lighter",
//     thirdColor: "bg-royal-divider",
//     hero: {
//       heading: "lutter contre la faim",
//       description:
//         "Distribution de repas et de colis alimentaires, soutien à l’agriculture locale et solutions durables pour des millions de personnes vulnérables, soutenez les actions d’Islamic Relief Suisse.",
//       subheading: "Un engagement : réactivité et responsabilité",
//       buttonLink: "/donate",
//       buttonText: "Je donne pour la nutrition",
//       carouselData: {
//         carouselItems: [
//           {
//             id: "1",
//             url: "/Images/Sustain-proj-Hero-Img-3.webp", // Placeholder
//             alt: "Nutrition",
//             title: "",
//             subtitle: "",
//             buttonText: "",
//             buttonLink: "",
//           },
//         ],
//       },
//     },
//     impactGrid: {
//       heading: "La réalité de la faim dans le monde",
//       subheading: "Situation",
//       description:
//         "Imaginez vous réveiller chaque matin sans nourriture chez vous, avec l’angoisse de ne pas savoir comment nourrir votre famille au prochain repas. Imaginez aller vous coucher chaque soir en ayant le ventre vide. Pour des millions de personnes à travers le monde, cette situation est leur réalité quotidienne.",
//       items: [
//         {
//           theme: "red",
//           value: "673 millions",
//           icon: "/Icons/Sadaqah-red.svg",
//           title:
//             "de personnes souffrent de la faim chaque jour dans les régions les plus pauvres. ",
//           description: "",
//         },
//         {
//           theme: "green",
//           value: "69 MILLIONs",
//           icon: "/Icons/Sadaqah-green.svg",
//           title: "d’enfants dans le monde sont touchés par la malnutrition",
//           description: "",
//         },
//         {
//           theme: "yellow",
//           value: "53 pays",
//           icon: "/Icons/Sadaqah-yellow.svg", // Using placeholder, please update if yellow icon exists
//           title: "sont touchés par la famine",
//           description: "",
//         },
//       ],
//       images: [
//         "/Images/Situation-images-1.webp",
//         "/Images/Situation-images-4.webp",
//         "/Images/Situation-images-2.webp",
//         "/Images/Situation-images-1.webp",
//         "/Images/Situation-images-3.webp",
//       ],
//     },

//     mission: {
//       sectionHeading: {
//         subHeading: "Des moyens pour faire la différence",
//         heading: "pourquoi Islamic Relief suisse?",
//         description:
//           "Votre contribution est bien plus qu’un simple don — c’est votre compassion mise en action.",
//       },
//       cards: [
//         {
//           id: 1,
//           icon: "/Icons/Shield-primary.svg",
//           title: "Transparence",
//           description: "Une gestion rigoureuse et efficace de vos dons",
//         },
//         {
//           id: 2,
//           icon: "/Icons/Impact-primary.svg",
//           title: "Impact Direct",
//           description:
//             "Chaque Fidya ou Kaffara nourrit directement des familles vulnérables",
//         },
//         {
//           id: 3,
//           icon: "/Icons/Globe-primary.svg",
//           title: "confiance",
//           description: "30 ans d’engagement humanitaire dans plus de 40 pays",
//         },
//       ],
//     },
//     accountabilitySection: {
//       subHeading: "Trust & Integrity",
//       heading: "Accountability & Transparency",
//       description:
//         "Thanks to your support, lives are saved before the world reacted.",
//       buttonText: "Support Education Now",
//       buttonLink: "/donate",
//       items: [
//         {
//           id: 1,
//           icon: "/Icons/Dollar-primary.svg",
//           title: "WHERE IS YOUR MONEY GOING?",
//           description:
//             "Your donation is safe at Islamic Relief Switzerland because we are transparent about how much we collect and how it is spent.",
//         },
//         {
//           id: 2,
//           icon: "/Icons/Star-primary.svg",
//           title: "WHY CAN YOU TRUST US?",
//           description:
//             "In accordance with our Islamic values d'ihsan (excellence) and d'amanah (conservation), we are committed to ensuring that your donations are used as efficiently as possible and that we provide the best possible service to those we aidons.",
//         },
//         {
//           id: 3,
//           icon: "/Icons/Bulb-primary.svg",
//           title: "TRANSPARENCY AND ACCOUNTABILITY",
//           description:
//             "This is why we make no secret that we have administration and fundraising costs and that these are necessary expenses for a global charity that is committed to the highest international humanitarian standards.",
//         },
//       ],
//     },
//     ctaSection: {
//       heading:
//         "accomplissez votre devoir, nourrissez une âme, et restaurez l’équilibre.",
//       description:
//         "Faites de ce Ramadan un moment encore plus porteur de sens ",
//       buttonText: "Support Education Now",
//       buttonLink: "/donate",
//     },
//     urgentAppeals: {
//       heading: "URGENT APPEALS",
//       subheading: "Crisis Spotlight",
//       description:
//         "Crisis situations requiring immediate support from our global community",
//       cards: [
//         {
//           id: "1",
//           variant: "campaign",
//           headerImage: "/Images/Situation-images-1.webp",
//           headerImageAlt: "Gaza Emergency",
//           imageChip: {
//             label: "Emergency",
//             color: "red",
//           },
//           heading: "Gaza Emergency",
//           subHeading: "Help provide urgent aid to families in Gaza.",
//           buttons: [
//             {
//               label: "Learn More",
//               buttonStyle: "link-blue-arrow",
//               color: "primary",
//               variant: "ghost",
//             },
//           ],
//         },
//         {
//           id: "2",
//           variant: "campaign",
//           headerImage: "/Images/Situation-images-2.webp",
//           headerImageAlt: "Sudan Emergency",
//           imageChip: {
//             label: "Urgent",
//             color: "red",
//           },
//           heading: "Sudan Emergency",
//           subHeading: "Support families displaced by conflict in Sudan.",
//           buttons: [
//             {
//               label: "Learn More",
//               buttonStyle: "link-blue-arrow",
//               color: "primary",
//               variant: "ghost",
//             },
//           ],
//         },
//         {
//           id: "3",
//           variant: "campaign",
//           headerImage: "/Images/Situation-images-3.webp",
//           headerImageAlt: "Yemen Crisis",
//           imageChip: {
//             label: "Critical",
//             color: "red",
//           },
//           heading: "Yemen Crisis",
//           subHeading: "Provide food and medical aid to Yemen.",
//           buttons: [
//             {
//               label: "Learn More",
//               buttonStyle: "link-blue-arrow",
//               color: "primary",
//               variant: "ghost",
//             },
//           ],
//         },
//       ],
//     },
//     impactStatsSection: {
//       heading: "Our Global Impact",
//       description:
//         "Through your support, we are making a measurable difference in the lives of children and communities around the world.",
//       buttonText: "Donate Now",
//       buttonLink: "/donate",
//       data: {
//         impactStats: [
//           {
//             id: 1,
//             value: "94%",
//             label: "Directly to programs",
//             type: "percentage",
//           },
//           {
//             id: 2,
//             value: "2.4M+",
//             label: "Lives helped annually",
//             type: "count",
//           },
//           {
//             id: 3,
//             value: "40+",
//             label: "Countries worldwide",
//             type: "count",
//           },
//         ],
//       },
//     },
//   },
//   health: {
//     slug: "health",
//     title: "Health",
//     primaryColour: "bg-royal",
//     secondaryColour: "bg-royal-lighter",
//     thirdColor: "bg-royal-divider",
//     hero: {
//       heading: "la santé, un droit fondamental pour tous",
//       description:
//         "Islamic Relief œuvre pour garantir un accès équitable à la santé dans les régions vulnérables. Découvrez nos projets de soins médicaux, de prévention des maladies et de soutien psychosocial qui sauvent des vies en période de crise.",
//       subheading: "Un engagement : réactivité et responsabilité",
//       buttonLink: "/donate",
//       buttonText: "Je donne pour les projets santé",
//       carouselData: {
//         carouselItems: [
//           {
//             id: "1",
//             url: "/Images/Sustain-proj-Hero-Img-2.webp", // Placeholder
//             alt: "Health",
//             title: "",
//             subtitle: "",
//             buttonText: "",
//             buttonLink: "",
//           },
//         ],
//       },
//     },
//     impactGrid: {
//       heading: "Impact Grid",
//       subheading: "Impact",
//       description: "Description",
//       items: [
//         {
//           theme: "red",
//           value: "11,8 millions",
//           icon: "/Icons/Sadaqah-red.svg",
//           title: "Stability and normalcy for children in crisis",
//           description:
//             "Education restores hope, strengthens communities, and creates lasting",
//         },
//         {
//           theme: "green",
//           value: "1,5 MILLION",
//           icon: "/Icons/Sadaqah-green.svg",
//           title: "Skills for long-term resilience",
//           description:
//             "Education restores hope, strengthens communities, and creates lasting",
//         },
//         {
//           theme: "yellow",
//           value: "70%",
//           icon: "/Icons/Sadaqah-yellow.svg", // Using placeholder, please update if yellow icon exists
//           title: "Psychosocial recovery and hope",
//           description:
//             "Education restores hope, strengthens communities, and creates lasting",
//         },
//       ],
//       images: [
//         "/Images/Situation-images-1.webp",
//         "/Images/Situation-images-4.webp",
//         "/Images/Situation-images-2.webp",
//         "/Images/Situation-images-1.webp",
//         "/Images/Situation-images-3.webp",
//       ],
//     },

//     mission: {
//       sectionHeading: {
//         subHeading: "Des moyens pour faire la différence",
//         heading: "pourquoi Islamic Relief suisse?",
//         description:
//           "Votre contribution est bien plus qu’un simple don — c’est votre compassion mise en action.",
//       },
//       cards: [
//         {
//           id: 1,
//           icon: "/Icons/Shield-primary.svg",
//           title: "Transparence",
//           description: "Une gestion rigoureuse et efficace de vos dons",
//         },
//         {
//           id: 2,
//           icon: "/Icons/Impact-primary.svg",
//           title: "Impact Direct",
//           description:
//             "Chaque Fidya ou Kaffara nourrit directement des familles vulnérables",
//         },
//         {
//           id: 3,
//           icon: "/Icons/Globe-primary.svg",
//           title: "confiance",
//           description: "30 ans d’engagement humanitaire dans plus de 40 pays",
//         },
//       ],
//     },
//     accountabilitySection: {
//       subHeading: "Trust & Integrity",
//       heading: "Accountability & Transparency",
//       description:
//         "Thanks to your support, lives are saved before the world reacted.",
//       buttonText: "Support Education Now",
//       buttonLink: "/donate",
//       items: [
//         {
//           id: 1,
//           icon: "/Icons/Dollar-primary.svg",
//           title: "WHERE IS YOUR MONEY GOING?",
//           description:
//             "Your donation is safe at Islamic Relief Switzerland because we are transparent about how much we collect and how it is spent.",
//         },
//         {
//           id: 2,
//           icon: "/Icons/Star-primary.svg",
//           title: "WHY CAN YOU TRUST US?",
//           description:
//             "In accordance with our Islamic values d'ihsan (excellence) and d'amanah (conservation), we are committed to ensuring that your donations are used as efficiently as possible and that we provide the best possible service to those we aidons.",
//         },
//         {
//           id: 3,
//           icon: "/Icons/Bulb-primary.svg",
//           title: "TRANSPARENCY AND ACCOUNTABILITY",
//           description:
//             "This is why we make no secret that we have administration and fundraising costs and that these are necessary expenses for a global charity that is committed to the highest international humanitarian standards.",
//         },
//       ],
//     },
//     ctaSection: {
//       heading:
//         "accomplissez votre devoir, nourrissez une âme, et restaurez l’équilibre.",
//       description:
//         "Faites de ce Ramadan un moment encore plus porteur de sens ",
//       buttonText: "Support Education Now",
//       buttonLink: "/donate",
//     },
//     urgentAppeals: {
//       heading: "URGENT APPEALS",
//       subheading: "Crisis Spotlight",
//       description:
//         "Crisis situations requiring immediate support from our global community",
//       cards: [
//         {
//           id: "1",
//           variant: "campaign",
//           headerImage: "/Images/Situation-images-1.webp",
//           headerImageAlt: "Gaza Emergency",
//           imageChip: {
//             label: "Emergency",
//             color: "red",
//           },
//           heading: "Gaza Emergency",
//           subHeading: "Help provide urgent aid to families in Gaza.",
//           buttons: [
//             {
//               label: "Learn More",
//               buttonStyle: "link-blue-arrow",
//               color: "primary",
//               variant: "ghost",
//             },
//           ],
//         },
//         {
//           id: "2",
//           variant: "campaign",
//           headerImage: "/Images/Situation-images-2.webp",
//           headerImageAlt: "Sudan Emergency",
//           imageChip: {
//             label: "Urgent",
//             color: "red",
//           },
//           heading: "Sudan Emergency",
//           subHeading: "Support families displaced by conflict in Sudan.",
//           buttons: [
//             {
//               label: "Learn More",
//               buttonStyle: "link-blue-arrow",
//               color: "primary",
//               variant: "ghost",
//             },
//           ],
//         },
//         {
//           id: "3",
//           variant: "campaign",
//           headerImage: "/Images/Situation-images-3.webp",
//           headerImageAlt: "Yemen Crisis",
//           imageChip: {
//             label: "Critical",
//             color: "red",
//           },
//           heading: "Yemen Crisis",
//           subHeading: "Provide food and medical aid to Yemen.",
//           buttons: [
//             {
//               label: "Learn More",
//               buttonStyle: "link-blue-arrow",
//               color: "primary",
//               variant: "ghost",
//             },
//           ],
//         },
//       ],
//     },
//     impactStatsSection: {
//       heading: "Our Global Impact",
//       description:
//         "Through your support, we are making a measurable difference in the lives of children and communities around the world.",
//       buttonText: "Donate Now",
//       buttonLink: "/donate",
//       data: {
//         impactStats: [
//           {
//             id: 1,
//             value: "94%",
//             label: "Directly to programs",
//             type: "percentage",
//           },
//           {
//             id: 2,
//             value: "2.4M+",
//             label: "Lives helped annually",
//             type: "count",
//           },
//           {
//             id: 3,
//             value: "40+",
//             label: "Countries worldwide",
//             type: "count",
//           },
//         ],
//       },
//     },
//   },

//   economy: {
//     slug: "economy",
//     title: "Economy",
//     primaryColour: "bg-purple-dark",
//     secondaryColour: "bg-purple-lighter",
//     thirdColor: "bg-purple-divider",
//     hero: {
//       heading: "Build Stronger Economies",
//       description:
//         "Islamic Relief Switzerland supports families and local communities by helping them start meaningful professional projects, access interest-free loans, and build sustainable livelihoods across Africa, the Balkans, and many regions around the world.",
//       subheading: "We respond with faith and compassion.",
//       buttonText: "Donate for Health",
//       buttonLink: "/donate",
//       carouselData: {
//         carouselItems: [
//           {
//             id: "1",
//             url: "/Images/Sustain-proj-Hero-Img-1.webp", // Placeholder
//             alt: "Economy",
//             title: "",
//             subtitle: "",
//             buttonText: "",
//             buttonLink: "",
//           },
//         ],
//       },
//     },
//     impactGrid: {
//       heading: "Impact Grid",
//       subheading: "Impact",
//       description: "Description",
//       items: [
//         {
//           theme: "red",
//           value: "11,8 millions",
//           icon: "/Icons/Sadaqah-red.svg",
//           title: "Stability and normalcy for children in crisis",
//           description:
//             "Education restores hope, strengthens communities, and creates lasting",
//         },
//         {
//           theme: "green",
//           value: "1,5 MILLION",
//           icon: "/Icons/Sadaqah-green.svg",
//           title: "Skills for long-term resilience",
//           description:
//             "Education restores hope, strengthens communities, and creates lasting",
//         },
//         {
//           theme: "yellow",
//           value: "70%",
//           icon: "/Icons/Sadaqah-yellow.svg", // Using placeholder, please update if yellow icon exists
//           title: "Psychosocial recovery and hope",
//           description:
//             "Education restores hope, strengthens communities, and creates lasting",
//         },
//       ],
//       images: [
//         "/Images/Situation-images-1.webp",
//         "/Images/Situation-images-4.webp",
//         "/Images/Situation-images-2.webp",
//         "/Images/Situation-images-1.webp",
//         "/Images/Situation-images-3.webp",
//       ],
//     },
//     mission: {
//       sectionHeading: {
//         subHeading: "Des moyens pour faire la différence",
//         heading: "pourquoi Islamic Relief suisse?",
//         description:
//           "Votre contribution est bien plus qu’un simple don — c’est votre compassion mise en action.",
//       },
//       cards: [
//         {
//           id: 1,
//           icon: "/Icons/Shield-primary.svg",
//           title: "Transparence",
//           description: "Une gestion rigoureuse et efficace de vos dons",
//         },
//         {
//           id: 2,
//           icon: "/Icons/Impact-primary.svg",
//           title: "Impact Direct",
//           description:
//             "Chaque Fidya ou Kaffara nourrit directement des familles vulnérables",
//         },
//         {
//           id: 3,
//           icon: "/Icons/Globe-primary.svg",
//           title: "confiance",
//           description: "30 ans d’engagement humanitaire dans plus de 40 pays",
//         },
//       ],
//     },
//     accountabilitySection: {
//       subHeading: "Trust & Integrity",
//       heading: "Accountability & Transparency",
//       description:
//         "Thanks to your support, lives are saved before the world reacted.",
//       buttonText: "Support Education Now",
//       buttonLink: "/donate",
//       items: [
//         {
//           id: 1,
//           icon: "/Icons/Dollar-primary.svg",
//           title: "WHERE IS YOUR MONEY GOING?",
//           description:
//             "Your donation is safe at Islamic Relief Switzerland because we are transparent about how much we collect and how it is spent.",
//         },
//         {
//           id: 2,
//           icon: "/Icons/Star-primary.svg",
//           title: "WHY CAN YOU TRUST US?",
//           description:
//             "In accordance with our Islamic values d'ihsan (excellence) and d'amanah (conservation), we are committed to ensuring that your donations are used as efficiently as possible and that we provide the best possible service to those we aidons.",
//         },
//         {
//           id: 3,
//           icon: "/Icons/Bulb-primary.svg",
//           title: "TRANSPARENCY AND ACCOUNTABILITY",
//           description:
//             "This is why we make no secret that we have administration and fundraising costs and that these are necessary expenses for a global charity that is committed to the highest international humanitarian standards.",
//         },
//       ],
//     },
//     ctaSection: {
//       heading:
//         "accomplissez votre devoir, nourrissez une âme, et restaurez l’équilibre.",
//       description:
//         "Faites de ce Ramadan un moment encore plus porteur de sens ",
//       buttonText: "Support Education Now",
//       buttonLink: "/donate",
//     },
//     urgentAppeals: {
//       heading: "URGENT APPEALS",
//       subheading: "Crisis Spotlight",
//       description:
//         "Crisis situations requiring immediate support from our global community",
//       cards: [
//         {
//           id: "1",
//           variant: "campaign",
//           headerImage: "/Images/Situation-images-1.webp",
//           headerImageAlt: "Gaza Emergency",
//           imageChip: {
//             label: "Emergency",
//             color: "red",
//           },
//           heading: "Gaza Emergency",
//           subHeading: "Help provide urgent aid to families in Gaza.",
//           buttons: [
//             {
//               label: "Learn More",
//               buttonStyle: "link-blue-arrow",
//               color: "primary",
//               variant: "ghost",
//             },
//           ],
//         },
//         {
//           id: "2",
//           variant: "campaign",
//           headerImage: "/Images/Situation-images-2.webp",
//           headerImageAlt: "Sudan Emergency",
//           imageChip: {
//             label: "Urgent",
//             color: "red",
//           },
//           heading: "Sudan Emergency",
//           subHeading: "Support families displaced by conflict in Sudan.",
//           buttons: [
//             {
//               label: "Learn More",
//               buttonStyle: "link-blue-arrow",
//               color: "primary",
//               variant: "ghost",
//             },
//           ],
//         },
//         {
//           id: "3",
//           variant: "campaign",
//           headerImage: "/Images/Situation-images-3.webp",
//           headerImageAlt: "Yemen Crisis",
//           imageChip: {
//             label: "Critical",
//             color: "red",
//           },
//           heading: "Yemen Crisis",
//           subHeading: "Provide food and medical aid to Yemen.",
//           buttons: [
//             {
//               label: "Learn More",
//               buttonStyle: "link-blue-arrow",
//               color: "primary",
//               variant: "ghost",
//             },
//           ],
//         },
//       ],
//     },
//     impactStatsSection: {
//       heading: "Our Global Impact",
//       description:
//         "Through your support, we are making a measurable difference in the lives of children and communities around the world.",
//       buttonText: "Donate Now",
//       buttonLink: "/donate",
//       data: {
//         impactStats: [
//           {
//             id: 1,
//             value: "94%",
//             label: "Directly to programs",
//             type: "percentage",
//           },
//           {
//             id: 2,
//             value: "2.4M+",
//             label: "Lives helped annually",
//             type: "count",
//           },
//           {
//             id: 3,
//             value: "40+",
//             label: "Countries worldwide",
//             type: "count",
//           },
//         ],
//       },
//     },
//   },
//   water: {
//     slug: "water",
//     title: "Water",
//     primaryColour: "bg-primary",
//     secondaryColour: "bg-primary-lighter",
//     thirdColor: "bg-primary-surface",
//     hero: {
//       heading: "Bringing Water to Communities",
//       description:
//         "Water is life. Islamic Relief Switzerland works to ensure vulnerable families gain sustainable access to clean and safe water through wells, solar systems, water tanks, and emergency supply solutions.",
//       subheading: "We respond with faith and compassion.",
//       buttonText: "I Give",
//       buttonLink: "/donate",
//       carouselData: {
//         carouselItems: [
//           {
//             id: "1",
//             url: "/Images/Sustain-proj-Hero-Img-1.webp", // Placeholder
//             alt: "Water",
//             title: "",
//             subtitle: "",
//             buttonText: "",
//             buttonLink: "",
//           },
//         ],
//       },
//     },
//     impactGrid: {
//       heading: "Impact Grid",
//       subheading: "Impact",
//       description: "Description",
//       items: [
//         {
//           theme: "red",
//           value: "11,8 millions",
//           icon: "/Icons/Sadaqah-red.svg",
//           title: "Stability and normalcy for children in crisis",
//           description:
//             "Education restores hope, strengthens communities, and creates lasting",
//         },
//         {
//           theme: "green",
//           value: "1,5 MILLION",
//           icon: "/Icons/Sadaqah-green.svg",
//           title: "Skills for long-term resilience",
//           description:
//             "Education restores hope, strengthens communities, and creates lasting",
//         },
//         {
//           theme: "yellow",
//           value: "70%",
//           icon: "/Icons/Sadaqah-yellow.svg", // Using placeholder, please update if yellow icon exists
//           title: "Psychosocial recovery and hope",
//           description:
//             "Education restores hope, strengthens communities, and creates lasting",
//         },
//       ],
//       images: [
//         "/Images/Situation-images-1.webp",
//         "/Images/Situation-images-4.webp",
//         "/Images/Situation-images-2.webp",
//         "/Images/Situation-images-1.webp",
//         "/Images/Situation-images-3.webp",
//       ],
//     },
//     mission: {
//       sectionHeading: {
//         subHeading: "Des moyens pour faire la différence",
//         heading: "pourquoi Islamic Relief suisse?",
//         description:
//           "Votre contribution est bien plus qu’un simple don — c’est votre compassion mise en action.",
//       },
//       cards: [
//         {
//           id: 1,
//           icon: "/Icons/Shield-primary.svg",
//           title: "Transparence",
//           description: "Une gestion rigoureuse et efficace de vos dons",
//         },
//         {
//           id: 2,
//           icon: "/Icons/Impact-primary.svg",
//           title: "Impact Direct",
//           description:
//             "Chaque Fidya ou Kaffara nourrit directement des familles vulnérables",
//         },
//         {
//           id: 3,
//           icon: "/Icons/Globe-primary.svg",
//           title: "confiance",
//           description: "30 ans d’engagement humanitaire dans plus de 40 pays",
//         },
//       ],
//     },
//     accountabilitySection: {
//       subHeading: "Trust & Integrity",
//       heading: "Accountability & Transparency",
//       description:
//         "Thanks to your support, lives are saved before the world reacted.",
//       buttonText: "Support Education Now",
//       buttonLink: "/donate",
//       items: [
//         {
//           id: 1,
//           icon: "/Icons/Dollar-primary.svg",
//           title: "WHERE IS YOUR MONEY GOING?",
//           description:
//             "Your donation is safe at Islamic Relief Switzerland because we are transparent about how much we collect and how it is spent.",
//         },
//         {
//           id: 2,
//           icon: "/Icons/Star-primary.svg",
//           title: "WHY CAN YOU TRUST US?",
//           description:
//             "In accordance with our Islamic values d'ihsan (excellence) and d'amanah (conservation), we are committed to ensuring that your donations are used as efficiently as possible and that we provide the best possible service to those we aidons.",
//         },
//         {
//           id: 3,
//           icon: "/Icons/Bulb-primary.svg",
//           title: "TRANSPARENCY AND ACCOUNTABILITY",
//           description:
//             "This is why we make no secret that we have administration and fundraising costs and that these are necessary expenses for a global charity that is committed to the highest international humanitarian standards.",
//         },
//       ],
//     },
//     ctaSection: {
//       heading:
//         "accomplissez votre devoir, nourrissez une âme, et restaurez l’équilibre.",
//       description:
//         "Faites de ce Ramadan un moment encore plus porteur de sens ",
//       buttonText: "Support Education Now",
//       buttonLink: "/donate",
//     },
//     urgentAppeals: {
//       heading: "URGENT APPEALS",
//       subheading: "Crisis Spotlight",
//       description:
//         "Crisis situations requiring immediate support from our global community",
//       cards: [
//         {
//           id: "1",
//           variant: "campaign",
//           headerImage: "/Images/Situation-images-1.webp",
//           headerImageAlt: "Gaza Emergency",
//           imageChip: {
//             label: "Emergency",
//             color: "red",
//           },
//           heading: "Gaza Emergency",
//           subHeading: "Help provide urgent aid to families in Gaza.",
//           buttons: [
//             {
//               label: "Learn More",
//               buttonStyle: "link-blue-arrow",
//               color: "primary",
//               variant: "ghost",
//             },
//           ],
//         },
//         {
//           id: "2",
//           variant: "campaign",
//           headerImage: "/Images/Situation-images-2.webp",
//           headerImageAlt: "Sudan Emergency",
//           imageChip: {
//             label: "Urgent",
//             color: "red",
//           },
//           heading: "Sudan Emergency",
//           subHeading: "Support families displaced by conflict in Sudan.",
//           buttons: [
//             {
//               label: "Learn More",
//               buttonStyle: "link-blue-arrow",
//               color: "primary",
//               variant: "ghost",
//             },
//           ],
//         },
//         {
//           id: "3",
//           variant: "campaign",
//           headerImage: "/Images/Situation-images-3.webp",
//           headerImageAlt: "Yemen Crisis",
//           imageChip: {
//             label: "Critical",
//             color: "red",
//           },
//           heading: "Yemen Crisis",
//           subHeading: "Provide food and medical aid to Yemen.",
//           buttons: [
//             {
//               label: "Learn More",
//               buttonStyle: "link-blue-arrow",
//               color: "primary",
//               variant: "ghost",
//             },
//           ],
//         },
//       ],
//     },
//     impactStatsSection: {
//       heading: "Our Global Impact",
//       description:
//         "Through your support, we are making a measurable difference in the lives of children and communities around the world.",
//       buttonText: "Donate Now",
//       buttonLink: "/donate",
//       data: {
//         impactStats: [
//           {
//             id: 1,
//             value: "94%",
//             label: "Directly to programs",
//             type: "percentage",
//           },
//           {
//             id: 2,
//             value: "2.4M+",
//             label: "Lives helped annually",
//             type: "count",
//           },
//           {
//             id: 3,
//             value: "40+",
//             label: "Countries worldwide",
//             type: "count",
//           },
//         ],
//       },
//     },
//   },
// };
