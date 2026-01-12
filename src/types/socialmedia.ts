export interface SocialMediaOrganization {
  name: string;
  logo: string;
  social: {
    platform: string;
    url: string;
  };
}

export interface SocialMediaMedia {
  type: string;
  src: string;
  alt: string;
}

export interface SocialMediaBadge {
  label: string;
  icon: string;
}

export interface SocialMediaEngagement {
  likes: number;
  comments: number;
}

export interface SocialMediaPost {
  id: string;
  organization: SocialMediaOrganization;
  media: SocialMediaMedia;

  headline: string;
  content: string;
  engagement: SocialMediaEngagement;
}

export interface SocialMediaData {
  posts: SocialMediaPost[];
}

export const socialMediaData: SocialMediaData = {
  posts: [
    {
      id: "irw-001",
      organization: {
        name: "IRWorldwide",
        logo: "/Images/Logo/logo2.png",

        social: {
          platform: "instagram",
          url: "https://instagram.com",
        },
      },
      media: {
        type: "image",
        src: "/Images/mockImages/cardimage.png",
        alt: "Man waving outside a shelter in the Philippines",
      },

      headline: "Providing shelter, health, and hope to vulnerable families",
      content:
        "Want to learn about Islamic Relief? Their culture is a blend of history and tradition. Join us in our efforts to celebrate and support this vibrant community!",
      engagement: {
        likes: 53,
        comments: 0,
      },
    },
    {
      id: "irw-002",
      organization: {
        name: "IRWorldwide",
        logo: "/Images/Logo/logo2.png",

        social: {
          platform: "tiktok",
          url: "https://tiktok.com",
        },
      },
      media: {
        type: "image",
        src: "/Images/mockImages/cardimage2.png",
        alt: "Man waving outside a shelter in the Philippines",
      },

      headline: "Empowering communities worldwide",
      content:
        "Together we can make a difference. Join our global community in supporting sustainable development and emergency relief efforts.",
      engagement: {
        likes: 124,
        comments: 12,
      },
    },
    {
      id: "irw-003",
      organization: {
        name: "IRWorldwide",
        logo: "/Images/Logo/logo2.png",

        social: {
          platform: "whatsapp",
          url: "https://whatsapp.com",
        },
      },
      media: {
        type: "image",
        src: "/Images/mockImages/cardimage3.png",
        alt: "Man waving outside a shelter in the Philippines",
      },

      headline: "Empowering communities worldwide",
      content:
        "Learn about Islamic Relief and their incredible heritage! We're dedicated to promoting their culture and supporting their community. Get involved!",
      engagement: {
        likes: 12,
        comments: 0,
      },
    },
    {
      id: "irw-004",
      organization: {
        name: "IRWorldwide",
        logo: "/Images/Logo/logo2.png",

        social: {
          platform: "facebook",
          url: "https://facebook.com",
        },
      },
      media: {
        type: "image",
        src: "/Images/mockImages/cardimage4.png",
        alt: "Man waving outside a shelter in the Philippines",
      },

      headline: "Empowering communities worldwide",
      content:
        "Learn about Islamic Relief and their incredible heritage! We're dedicated to promoting their culture and supporting their community. Get involved!",
      engagement: {
        likes: 12,
        comments: 0,
      },
    },
    {
      id: "irw-005",
      organization: {
        name: "IRWorldwide",
        logo: "/Images/Logo/logo2.png",

        social: {
          platform: "youtube",
          url: "https://youtube.com",
        },
      },
      media: {
        type: "image",
        src: "/Images/mockImages/cardimage5.png",
        alt: "Man waving outside a shelter in the Philippines",
      },

      headline: "Empowering communities worldwide",
      content:
        "Learn about Islamic Relief and their incredible heritage! We're dedicated to promoting their culture and supporting their community. Get involved!",
      engagement: {
        likes: 12,
        comments: 0,
      },
    },
    {
      id: "irw-006",
      organization: {
        name: "IRWorldwide",
        logo: "/Images/Logo/logo2.png",

        social: {
          platform: "tiktok",
          url: "https://tiktok.com",
        },
      },
      media: {
        type: "image",
        src: "/Images/mockImages/cardimage6.png",
        alt: "Man waving outside a shelter in the Philippines",
      },

      headline: "Empowering communities worldwide",
      content:
        "Learn about Islamic Relief and their incredible heritage! We're dedicated to promoting their culture and supporting their community. Get involved!",
      engagement: {
        likes: 12,
        comments: 0,
      },
    },
    {
      id: "irw-007",
      organization: {
        name: "IRWorldwide",
        logo: "/Images/Logo/logo2.png",

        social: {
          platform: "facebook",
          url: "https://facebook.com",
        },
      },
      media: {
        type: "image",
        src: "/Images/mockImages/cardimage7.png",
        alt: "Man waving outside a shelter in the Philippines",
      },

      headline: "Empowering communities worldwide",
      content:
        "Learn about Islamic Relief and their incredible heritage! We're dedicated to promoting their culture and supporting their community. Get involved!",
      engagement: {
        likes: 12,
        comments: 0,
      },
    },
    {
      id: "irw-008",
      organization: {
        name: "IRWorldwide",
        logo: "/Images/Logo/logo2.png",

        social: {
          platform: "instagram",
          url: "https://instagram.com",
        },
      },
      media: {
        type: "image",
        src: "/Images/mockImages/cardimage8.png",
        alt: "Man waving outside a shelter in the Philippines",
      },

      headline: "Empowering communities worldwide",
      content:
        "Learn about Islamic Relief and their incredible heritage! We're dedicated to promoting their culture and supporting their community. Get involved!",
      engagement: {
        likes: 12,
        comments: 0,
      },
    },
  ],
};
