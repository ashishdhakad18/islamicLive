import React from "react";
import Container from "../layout/Container";
import SectionHeading from "./SectionHeading";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface KurbanGroup {
  name: string;
  price: string;
  countries: string;
  link: string;
}

const KurbanDestinationCard: React.FC<{ group: KurbanGroup }> = ({ group }) => {
  return (
    <div className="bg-[#E6F4FE] border border-[#B2DFFC] rounded-[12px] p-6 flex flex-col justify-between h-full min-h-[200px] transition-all hover:shadow-md">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center w-full">
          <h3 className="type-h6 font-bold! text-grey-black uppercase">
            {group.name}
          </h3>
          <span className="type-h6 font-bold! text-grey-black">
            {group.price}
          </span>
        </div>
        <p className="type-body-2 text-grey-black leading-snug">
          {group.countries}
        </p>
      </div>

      <div className="mt-8">
        <Link
          href={group.link}
          className="text-[#0071BC] type-btn-3 font-bold! uppercase flex items-center gap-1 hover:underline tracking-tight"
        >
          CLIQUEZ ICI <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

interface KurbanDestinationSectionProps {
  heading?: string;
  destinations?: Array<{
    id: number;
    group: string;
    chfNumber: string;
    address: string;
    ctaText: string;
    ctaLink: string;
  }>;
}

const KurbanDestinationSection: React.FC<KurbanDestinationSectionProps> = ({
  heading,
  destinations,
}) => {
  const groupsToRender = destinations?.map((d) => ({
    name: d.group,
    price: d.chfNumber,
    countries: d.address,
    link: d.ctaLink,
  })) || [
    {
      name: "Groupe A",
      price: "90 CHF",
      countries: "Kenya, Malawi, Mali, Niger, Somalie",
      link: "#",
    },
    {
      name: "Groupe B",
      price: "120 CHF",
      countries: "Bangladesh, Cox Bazaar, Ethiopie, Philippines",
      link: "#",
    },
    {
      name: "Groupe C",
      price: "150 CHF",
      countries: "Pakistan, Népal, Sri Lanka, Soudan du Sud, Afghanistan",
      link: "#",
    },
    {
      name: "Groupe D",
      price: "210 CHF",
      countries: "Indonésie, Soudan, Yémen, Afrique du Sud",
      link: "#",
    },
    {
      name: "Groupe E",
      price: "290 CHF",
      countries: "Bosnie, Tchétchénie, Kosovo, Albanie",
      link: "#",
    },
    {
      name: "Groupe F",
      price: "370 CHF",
      countries: "Jordanie, Macédoine, Syrie, Irak, Turquie",
      link: "#",
    },
  ];

  return (
    <section className="py-20 w-full">
      <Container>
        <SectionHeading
          heading={
            heading || `OÙ ENVOYER VOTRE KURBAN CHOISISSEZ PARMI 6 GROUPES DE `
          }
          headingClassName=" type-h2 leading-tight text-grey-black whitespace-pre-line"
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupsToRender.map((group, index) => (
            <KurbanDestinationCard key={index} group={group} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default KurbanDestinationSection;
