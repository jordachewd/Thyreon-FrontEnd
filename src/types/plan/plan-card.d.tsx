import { PlanName } from "./plan-name.d";

interface Features {
  label: string;
  isIncluded: boolean;
}

export interface PlanCardInterface {
  id: number;
  name: PlanName;
  desc: string;
  price: number;
  features: Features[];
}
