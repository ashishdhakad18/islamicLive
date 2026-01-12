import React from "react";
import { cn } from "@/lib/utils";

interface KurbanDataProps {
  currentValue: string;
  totalValue: string;
  label: string;
  className?: string;
}

const KurbanData: React.FC<KurbanDataProps> = ({
  currentValue,
  totalValue,
  label,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full bg-primary-main flex flex-col justify-center items-center py-12 gap-2",
        className
      )}
    >
      <h2 className="type-h2 text-grey-white ">
        {currentValue}/{totalValue}
      </h2>
      <p className="type-body-2 text-grey-white uppercase tracking-wider">{label}</p>
    </div>
  );
};

export default KurbanData;
