// CATÁLOGO PÚBLICO - src/hooks/useNotices.js
import { useState, useEffect } from 'react';
import { catalogApi } from '../services/api';

/**
 * Hook para obtener avisos/banners activos
 */
export function useNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await catalogApi.getNotices();
      setNotices(response.data || []);
    } catch (err) {
      console.error('Error fetching notices:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return { notices, loading, error, refetch: fetchNotices };
}

export default useNotices;