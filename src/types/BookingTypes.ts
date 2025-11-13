export interface FormData {
  fullName: string;
  phoneNumber: string;
  email?: string;
  pickupAddress: string;
  load: number;

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

export interface ApiServiceResponse {
  service_name: string;
  price: string;
  unit_type: 'per_load' | 'per_item' | 'variable_price';
  service_type: 'main_service' | 'add_on_supply' | 'bundle_package';
  description?: string;
}
