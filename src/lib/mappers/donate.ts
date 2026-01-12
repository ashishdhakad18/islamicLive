import { getMediaUrl } from "@/utils/strapiHelpers";
import { DonationPageData } from "@/types/donate.types";

export function mapDonationFlowData(strapiData: any): DonationPageData | null {
  if (!strapiData) return null;

  const attrs = strapiData.attributes || strapiData;

  const getUrl = (img: any) => {
    if (!img) return "";
    return getMediaUrl(img) || "";
  };

  return {
    intro: {
      title: attrs.introSection?.sectionHeading?.title || attrs.introSection?.sectionHeading?.heading || "",
      subtitle: attrs.introSection?.sectionHeading?.subtitle || attrs.introSection?.sectionHeading?.description || "",
      steps: (attrs.introSection?.introCard || []).map((card: any) => ({
        title: card.title || "",
        description: card.subTitle || card.subheading || card.description || "",
        icon: getUrl(card.iconImage),
      })),
    },
    frequency: {
      title: attrs.frequencySection?.frequencySectionTitle?.title || attrs.frequencySection?.frequencySectionTitle?.heading || "",
      subtitle: attrs.frequencySection?.frequencySectionTitle?.subtitle || attrs.frequencySection?.frequencySectionTitle?.description || "",
      options: (attrs.frequencySection?.frequencyCard || []).map((card: any) => ({
        label: card.title || card.label || "",
        sub: card.subTitle || card.sublabel || "",
        value: (card.title || card.label || "").toLowerCase().includes("monthly") ? "monthly" : "one-time",
        icon: getUrl(card.iconImage),
      })),
    },
    funds: {
      title: attrs.fundAmountSection?.sectionHeading?.title || attrs.fundAmountSection?.sectionHeading?.heading || "",
      subtitle: attrs.fundAmountSection?.sectionHeading?.subtitle || attrs.fundAmountSection?.sectionHeading?.description || "",
      causes: (attrs.fundAmountSection?.donateFor || []).map((cause: any) => ({
        id: (cause.addAction || cause.label) 
          ? `${(cause.addAction || cause.label).toLowerCase().replace(/\s+/g, "-")}-${cause.id}` 
          : String(cause.id),
        name: cause.addAction || cause.label || cause.name || "",
      })),
      chooseAmountTitle: attrs.fundAmountSection?.chooseAmountHeading?.title || attrs.fundAmountSection?.chooseAmountHeading?.heading || "",
      chooseAmountSubtitle: attrs.fundAmountSection?.chooseAmountHeading?.subtitle || attrs.fundAmountSection?.chooseAmountHeading?.description || "",
      seeAllActionsLabel: "SEE ALL ACTIONS",
      allActions: (attrs.fundAmountSection?.allActionPopUp || []).reduce((acc: any, curr: any) => {
        const category = curr.tab?.toLowerCase() || "emergencies";
        if (!acc[category]) acc[category] = [];
        acc[category].push({
          id: curr.title 
            ? `${curr.title.toLowerCase().replace(/\s+/g, "-")}-${curr.id}` 
            : String(curr.id),
          name: curr.title || "",
        });
        return acc;
      }, {}),
      allActionsCategories: Array.from(new Set((attrs.fundAmountSection?.allActionPopUp || []).map((curr: any) => curr.tab || "Emergencies")))
        .map((tab: any) => ({
          label: tab.toUpperCase(),
          value: tab.toLowerCase(),
        })),
    },
    login: {
      title: attrs.loginDetailSection?.sectionHeading?.title || attrs.loginDetailSection?.sectionHeading?.heading || "",
      subtitle: attrs.loginDetailSection?.sectionHeading?.subtitle || attrs.loginDetailSection?.sectionHeading?.description || "",
      placeholders: (attrs.loginDetailSection?.placeHolderText || []).reduce((acc: any, curr: any) => {
        const key = curr.addAction || curr.label || curr.value;
        if (key) {
          acc[key.toLowerCase().replace(/\s+/g, "")] = key;
        }
        return acc;
      }, {}),
    },
    payment: {
      title: attrs.paymentDetail?.sectionHeading?.title || attrs.paymentDetail?.sectionHeading?.heading || "",
      subtitle: attrs.paymentDetail?.sectionHeading?.subtitle || attrs.paymentDetail?.sectionHeading?.description || "",
    },
    status: {
      title: attrs.donationStatus?.sectionHeading?.title || attrs.donationStatus?.sectionHeading?.heading || "",
      subtitle: attrs.donationStatus?.sectionHeading?.subtitle || attrs.donationStatus?.sectionHeading?.description || "",
      configs: (attrs.donationStatus?.DonationStatus || []).reduce((acc: any, curr: any) => {
        const statusKey = (curr.donationstatus || curr.status)?.toLowerCase();
        if (statusKey) {
          acc[statusKey === "pendding" ? "pending" : statusKey] = {
            title: statusKey.toUpperCase(),
            desc: curr.message || curr.description || "",
            icon: getUrl(curr.icon || curr.iconImage),
          };
        }
        return acc;
      }, {}),
    },
  };
}
