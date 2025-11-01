import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPhoneNumberValid(phoneNumber: string): boolean {
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, '');

  if (digits.startsWith('09') && digits.length === 11) {
    return /^09\d{9}$/.test(digits);
  }

  return false;
}
