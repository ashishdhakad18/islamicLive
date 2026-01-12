import Image from "next/image";
import FidyaKaffaraCalculator from "./FidyaKaffaraCalculator";

const CommentGridSection = () => {
  const comments = [
    {
      id: 1,
      title: "CHOISIR & CALCULER",
      description: "Evaluez le montant grâce à notre calculatrice.",
    },
    {
      id: 2,
      title: "FAIRE LE PAIEMENT",
      description: "Effectuez votre paiement en ligne en toute sécurité.",
    },
    {
      id: 3,
      title: "CONFIANCE & TRANSPARENCE",
      description: "Nous assurons une gestion rigoureuse et efficace de vos dons.",
    },
    {
      id: 4,
      title: "IMPACT CRÉÉ",
      description: "Votre contribution nourrit les plus vulnérables et accomplit votre obligation.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {/* All 4 cards first for Mobile/Tablet flow */}
      {comments.map((comment, index) => (
        <div
          key={comment.id}
          className="flex flex-col items-start p-8 gap-6 bg-white rounded-lg shadow-xs"
        >
          <div className="p-3 rounded-full bg-teal-lighter">
            <Image src="/Icons/Dollar-teal.svg" alt="" width={20} height={20} />
          </div>
          <div className="flex flex-col gap-2">
            <h6 className="type-h6 font-bold! uppercase leading-tight">{comment.title}</h6>
            <p className="type-body-2 text-grey-grey leading-relaxed">{comment.description}</p>
          </div>
        </div>
      ))}

      {/* Calculator - Explicitly positioned for Desktop, naturally at end for Mobile/Tablet */}
      <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:col-start-3 lg:row-start-1">
        <FidyaKaffaraCalculator />
      </div>
    </div>
  );
};

export default CommentGridSection;
