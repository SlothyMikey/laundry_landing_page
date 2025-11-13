import type { PricingPlanTypes } from '@/types/pricingTypes';

// Promo bundle plans
export const promoPlans: PricingPlanTypes[] = [
  {
    price: 165,
    planName: 'Full Service Plan',
    description: 'Best for regular laundry every week.',
    features: [
      'Pickup & dry cleaning',
      'Ironing and folding',
      'Wash & dry service',
      'Basic stain removal',
    ],
    variant: 'exclusive',
  },
  {
    price: 120,
    planName: 'Self Service Plan',
    description: 'Expert laundry service with delicate garments.',
    features: [
      'Wash & dry cleaning',
      'Expert ironing & pressing',
      'Pickup & delivery service',
      'Priority turnaround time',
      'Eco-friendly detergents',
    ],
    variant: 'standard',
  },
];

// Individual main services (wash, dry, fold, press)
export const services: PricingPlanTypes[] = [
  {
    price: 30,
    planName: 'Wash',
    description: 'Gentle washing for delicate items.',
    features: ['Delicate fabric care', 'Air drying included'],
    variant: 'standard',
    showButton: false,
  },
  {
    price: 25,
    planName: 'Dry',
    description: 'Professional drying service.',
    features: ['Fast drying', 'Fabric-safe temperature'],
    variant: 'standard',
    showButton: false,
  },
  {
    price: 35,
    planName: 'Fold',
    description: 'Professional folding service.',
    features: ['Wrinkle-free finish', 'Crisp and clean'],
    variant: 'standard',
    showButton: false,
  },
];
