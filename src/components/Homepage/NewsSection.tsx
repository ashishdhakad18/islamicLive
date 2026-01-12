import { latestNewsCardData, LatestNewsCardData } from "@/types/latestNewsCard";
import LatestNewsCard from "../ui/LatestNewsCard";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Locale } from "@/config/i18n.config";

interface NewsSectionProps {
  hideFirstRow?: boolean;
  newsCards?: LatestNewsCardData[];
  locale?: Locale;
}

const NewsSection = ({
  hideFirstRow = false,
  newsCards,
  locale = "en",
}: NewsSectionProps) => {
  // Use provided newsCards or fall back to static data
  const cards =
    newsCards && newsCards.length > 0 ? newsCards : latestNewsCardData;

  const viewAllStories = {
    en: "View All Stories",
    fr: "Voir toutes les histoires",
    de: "Alle Geschichten anzeigen",
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {!hideFirstRow &&
            cards
              .slice(0, 2)
              .map((card) => (
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.slice(2, 5).map((card, index) => (
            <LatestNewsCard
              key={card.id}
              image={card.image}
              title={card.title}
              read={card.read}
              date={card.date}
              categories={card.categories}
              link={card.link}
              className={index >= 1 ? "hidden lg:flex" : ""}
            />
          ))}
        </div>
        <Button
          color="yellow"
          className="px-12 lg:hidden md:flex"
          size="lg"
          rounded
          endIcon={
            <Image
              src="/Icons/Arrow-right-black.svg"
              alt="arrow-right"
              width={24}
              height={24}
            />
          }
        >
          {viewAllStories[locale as Locale] || viewAllStories.en}
        </Button>
      </div>
    </>
  );
};

export default NewsSection;
