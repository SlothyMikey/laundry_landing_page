import { useState } from 'react';
import type { ApiServiceResponse } from '@/types/BookingTypes';
import { fetchAllActiveServices } from '@/services/api';

export function useServices() {
  const [services, setServices] = useState<ApiServiceResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadServices = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 Fetching services...');
      const data = await fetchAllActiveServices();
      console.log('📦 Raw API response:', data);
      console.log('📊 Type of response:', typeof data);
      console.log('📊 Is array?:', Array.isArray(data));

      if (!data) {
        console.error('❌ No data returned from API');
        setServices([]);
        setError('No services available');
        return;
      }

      if (!Array.isArray(data)) {
        console.error('❌ API did not return an array:', data);
        setServices([]);
        setError('Invalid data format');
        return;
      }

      console.log('✅ Services received:', data);
      console.log('✅ Number of services:', data.length);
      setServices(data);
    } catch (err) {
      console.error('❌ Error fetching services:', err);
      setError((err as Error).message);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  return { services, loading, error, loadServices };
}
