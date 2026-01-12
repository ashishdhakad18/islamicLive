import DonationForm from "@/components/ui/DonationForm";
import { donationFormData } from "@/types/donationForm";
import FAQ from "@/components/ui/FAQ";
import { faqsData } from "@/types/faqs";
import ImpactData from "@/components/ui/ImpactData";
import { impactData } from "@/data/impactData";
import ImpactStats from "@/components/ui/ImpactStats";
import { impactStatsData } from "@/types/impactStats";
import Linkcard from "@/components/ui/Linkcard";
import { linkcardData } from "@/types/linkCards";
import LatestNewsCard from "@/components/ui/LatestNewsCard";
import { latestNewsCardData } from "@/types/latestNewsCard";
import DonationFormPage from "@/components/ui/DonationFormPage";
import SocialMediaSection from "@/components/ui/SocialMediaSection";

export default function Home() {
  return (
    <main className="flex flex-wrap items-center justify-center  p-8 bg-gray-100 min-h-screen max-w-[1440px]">
      {linkcardData.map(card => (
        <Linkcard
          key={card.id}
          icon={card.icon}
          title={card.title}
          description={card.description}
          link={card.link}
          linkText={card.linkText}
        />
      ))}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  max-w-[1440px] ">
        {latestNewsCardData.map(card => (
          <LatestNewsCard
            key={card.id}
            image={card.image}
            title={card.title}
            read={card.read}
            date={card.date}
            categories={card.categories}
            link={card.link}
          />
        ))}
      </div>

      <div className="w-full flex justify-center mb-10">
        <DonationForm data={donationFormData} />
      </div>

      <div className="w-full flex justify-center mb-10 px-4">
        <FAQ data={faqsData} />
      </div>

      <div className="w-full flex justify-center mb-10 px-4">
        <ImpactData data={impactData} />
      </div>

      <div className="w-full flex justify-center mb-10 px-4">
        <ImpactStats data={impactStatsData} />
      </div>

      <div className="w-full mb-10 overflow-hidden">
        <DonationFormPage />
      </div>

      <div className="w-full">
        <SocialMediaSection />
      </div>
    </main>
  );
}
