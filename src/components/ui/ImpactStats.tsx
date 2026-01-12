import React from "react";
import { ImpactStatsData } from "@/types/impactStats";
import Container from "../layout/Container";

export interface ImpactStatsProps {
  data: ImpactStatsData;
  showDivider?: boolean;
}

const ImpactStats: React.FC<ImpactStatsProps> = ({
  data,
  showDivider = true,
}) => {
  return (
    <Container className="px-0!">
      <div className="w-full flex flex-col md:flex-row justify-between items-center py-12 gap-8 md:gap-0">
        {data?.impactStats?.map((stat, index) => (
          <React.Fragment key={stat.id}>
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <h2 className="type-h2 text-grey-black leading-tight mb-2">
                {stat.value}
              </h2>
              <p className="type-body-2 text-grey-grey md:text-grey-black max-w-[260px] mx-auto">
                {stat.label}
              </p>
            </div>
            {index !== data.impactStats.length - 1 && (
              <div className="flex justify-center w-full md:w-auto">
                {/* Mobile Divider: Horizontal */}
                <div className="block md:hidden w-32 h-px bg-grey-inactive my-2 opacity-50"></div>
                {/* Desktop Divider: Vertical */}
                <div className="hidden md:block w-px h-20 bg-grey-inactive mx-4 shrink-0"></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </Container>
  );
};

export default ImpactStats;
