export interface FormData {
  fullName: string;
  phoneNumber: string;
  email?: string;
  pickupAddress: string;

  service: string;
  additionalServices?: string[];

  pickupDate: string;
  pickupTime: string;

  specialInstructions: string;
}
