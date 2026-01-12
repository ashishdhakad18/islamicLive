import { ResponseCardData } from "@/components/ui/ResponseTimelineCard";

export const reliefPhasesData: ResponseCardData[] = [
  {
    id: "1",
    theme: "red",
    icon: "/Icons/Sadaqah-red.svg", // Placeholder, ideally use specific icon
    label: "First 72 hours",
    title: "EMERGENCY RESPONSE",
    description: "Immediate life-saving aid deployed to crisis zones",
    items: [
      "Food & clean water distribution",
      "Emergency medical care",
      "Temporary shelter & blankets",
      "Hygiene kits & sanitation",
    ],
  },
  {
    id: "2",
    theme: "blue",
    icon: "/Icons/Sadaqah-royal.svg", // Need to find a better one or use generic
    label: "Weeks to months",
    title: "RECOVERY",
    description: "Helping communities stabilize and regain independence",
    items: [
      "Clean water infrastructure",
      "Sanitation facilities",
      "Livelihood support programs",
      "Psychosocial support",
    ],
  },
  {
    id: "3",
    theme: "green",
    icon: "/Icons/Sadaqah-green.svg", // Need to find a better one
    label: "Long-term impact",
    title: "REBUILDING",
    description: "Creating sustainable futures for affected communities",
    items: [
      "Schools & education programs",
      "Healthcare facilities",
      "Skills training & jobs",
      "Community resilience",
    ],
  },
];
