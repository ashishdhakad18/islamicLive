// components/ImpactCard.tsx
import { ImpactCardData } from "@/types/responseCard";
import Image from "next/image";

type ImpactCardProps = {
  data: ImpactCardData;
};

const ImpactCard = ({ data }: ImpactCardProps) => {
  return (
    <div className="border border-grey-divider rounded-md p-6 bg-white flex flex-col items-start">
      <Image
        src={data.icon}
        alt={data.title}
        width={64}
        height={64}
        className="w-[64px] h-[64px]"
      />

      <h5 className="type-h5 mt-4 text-grey-black uppercase">
        {data.title}
      </h5>

      <p className="type-body-2 mt-2 text-grey-grey">
        {data.description}
      </p>
    </div>
  );
};

export default ImpactCard;
