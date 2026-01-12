interface ImpactStat {
  id: number;
  icon: string;
  value: string | null;
  label: string;
  description: string;
}


export interface ImpactData {
  stats: ImpactStat[];
}
