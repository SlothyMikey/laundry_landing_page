import { useState } from 'react';
import type { FormData } from '@/types/BookingTypes';
import { createBooking } from '@/api/bookings';

export function useBooking() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const submitBooking = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Map (with backward compatibility) to backend API payload keys
      const payload = {
        name: (formData as any).name || (formData as any).fullName,
        phone_number:
          (formData as any).phone_number || (formData as any).phoneNumber,
        email: (formData as any).email || undefined,
        address: (formData as any).address || (formData as any).pickupAddress,
        load: (formData as any).load,
        promo: (formData as any).promo || undefined,
        main_services: (formData as any).main_services?.length
          ? (formData as any).main_services
          : (formData as any).services || [],
        supplies: ((formData as any).supplies ?? []).map((s: any) => ({
          name: s.name,
          quantity: s.quantity,
        })),
        pickup_date:
          (formData as any).pickup_date || (formData as any).pickupDate,
        special_instruction:
          (formData as any).special_instruction ||
          (formData as any).specialInstructions ||
          '',
      };

      await createBooking(payload as any);
      setSuccess(true);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, submitBooking };
}
