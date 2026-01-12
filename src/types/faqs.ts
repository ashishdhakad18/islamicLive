export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

export interface FaqsData {
  faqs: FaqItem[];
  cta: {
    label: string;
    action: string;
  };
}

export const faqsData: FaqsData = {
  faqs: [
    {
      id: 1,
      question: "What types of organizations can I donate to?",
      answer:
        "We partner with startups, small businesses, and growing teams across industries. Whether you're in tech, retail, or services, our solutions adapt to your needs.",
    },
    {
      id: 2,
      question: "Can your donation platform work with your system?",
      answer: "",
    },
    {
      id: 3,
      question:
        "Do you provide one-time donation options or recurring contributions?",
      answer: "",
    },
    {
      id: 4,
      question:
        "Do you provide one-time donation options or recurring contributions?",
      answer: "",
    },
    {
      id: 5,
      question: "What is the process for getting started with donations?",
      answer: "",
    },
  ],
  cta: {
    label: "Load More",
    action: "/faq",
  },
};
