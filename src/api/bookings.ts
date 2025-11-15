import type { FormData } from '@/types/BookingTypes';

export async function createBooking(formData: FormData) {
  const response = await fetch('/api/bookings/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to add new booking');
  }

  const data = await response.json();
  return data;
}
