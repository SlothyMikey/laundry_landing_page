export interface FormData {
  fullName: string;
  phoneNumber: string;
  email?: string;
  pickupAddress: string;

  // Selected promo bundle (mutually exclusive with services array)
  promo: string;
  // Selected individual main services (wash, dry, fold, press)
  services?: string[];

  // Supplies quantities requested (0 means not needed / customer has own)
  supplies?: SupplyItem[];

  pickupDate: string;

  specialInstructions: string;
}

export type SupplyKey =
  | 'detergent'
  | 'softener'
  | 'bleach'
  | 'plasticBag'
  | string;

export interface SupplyItem {
  key: SupplyKey; // unique key for logic
  name: string; // label to display
  quantity: number; // integer >= 0
}
