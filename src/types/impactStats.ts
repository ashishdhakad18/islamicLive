export interface ImpactStat {
  id: number;
  value: string;
  label: string;
  type: string;
}

export interface ImpactStatsData {
  impactStats: ImpactStat[];
}

export const impactStatsData: ImpactStatsData = {
  impactStats: [
    {
      id: 1,
      value: "94%",
      label: "Directly to programs",
      type: "percentage",
    },
    {
      id: 2,
      value: "2.4M+",
      label: "Lives helped annually",
      type: "count",
    },
    {
      id: 3,
      value: "40+",
      label: "Countries worldwide",
      type: "count",
    },
  ],
};
