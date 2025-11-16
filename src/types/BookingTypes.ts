export interface FormData {
  name: string;
  phone_number: string;
  email?: string;
  address: string;
  load: number;

  promo?: string;
  main_services?: string[];
  supplies?: SupplyItem[];

  pickup_date: string;

  special_instruction: string;
  payment_type?: string;
}

export interface SupplyItem {
  key: string; // unique key for logic
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
