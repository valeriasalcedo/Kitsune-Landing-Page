// src/hooks/useNewsEvents.js
import { useState, useEffect } from 'react';
import { catalogApi } from '../services/api';

/**
 * Hook para obtener noticias y eventos
 */
export function useNewsEvents({ limit = 10, page = 1 } = {}) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await catalogApi.getNews({ limit, page });
      setNews(response.data || []);
      setPagination(response.pagination);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [limit, page]);

  return { news, loading, error, pagination, refetch: fetchNews };
}

/**
 * Hook para separar noticias (sin event_date) y eventos (con event_date)
 */
export function useNewsAndEvents({ limit = 20 } = {}) {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await catalogApi.getNews({ limit });
        const items = response.data || [];
        
        setAllItems(items);
      } catch (err) {
        console.error('Error fetching news and events:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [limit]);

  // Separar eventos (con event_date y que no hayan pasado)
  const events = allItems.filter(item => {
    if (!item.event_date) return false;
    const eventDate = new Date(item.event_date);
    const now = new Date();
    return eventDate >= now;
  });

  // Separar noticias (sin event_date)
  const newsItems = allItems.filter(item => !item.event_date);

  return { 
    events, 
    newsItems, 
    loading, 
    error 
  };
}

export default useNewsEvents;