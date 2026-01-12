import Image from "next/image";
import Container from "../layout/Container";

type PartnershipCard = {
  id: number;
  title: string;
  description: string;
};

const partnershipCards: PartnershipCard[] = [
  {
    id: 1,
    title: "DON SUR PRODUIT OU SERVICE",
    description:
      "d’un article, d’un menu, d’un service spécifique, d’une collection éphémère, d’un produit solidaire.",
  },
  {
    id: 2,
    title: "BOÎTE DE DONS / TIRELIRE SOLIDAIRE",
    description:
      "Idéale pour cafés, restaurants, commerces physiques. Islamic Relief fournit les supports de communication si nécessaire.",
  },
  {
    id: 3,
    title: "PARRAINAGE CORPORATE",
    description:
      "Votre entreprise peut parrainer un ou plusieurs orphelins via Islamic Relief.",
  },
];

interface PartnershipOptionsSectionProps {
  heading?: string;
  options?: Array<{
    id: number;
    title: string;
    description: string;
    icon?: string;
  }>;
}

export default function PartnershipOptionsSection({
  heading = "Les formes de partenariats possibles",
  options = partnershipCards,
}: PartnershipOptionsSectionProps) {
  return (
    <section className="w-full bg-primary-lighter py-25">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Heading */}
          <div className="w-full lg:w-1/3 shrink-0 ">
            <h2 className="type-h2 uppercase text-grey-black">{heading}</h2>
          </div>

          {/* Cards */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
              {options.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-lg p-6 shadow-sm border border-transparent hover:border-gray-100 transition-colors h-full flex flex-col"
                >
                  {/* Icon */}
                  <div className="mb-8 text-primary">
                    <div className="w-12 h-12 relative">
                      <Image
                        src={card.icon || "/icons/presentation.svg"}
                        alt="icon"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 grow">
                    {/* Title */}
                    <h3 className="type-h6 uppercase font-bold text-grey-black leading-tight">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="type-body-2 text-grey-grey leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
