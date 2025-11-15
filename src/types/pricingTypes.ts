export type PricingVariant = 'standard' | 'exclusive';

export interface PricingPlanTypes {
  price: number;
  planName: string;
  description: string;
  features: string[];
  variant: PricingVariant;
  showButton?: boolean;
}
