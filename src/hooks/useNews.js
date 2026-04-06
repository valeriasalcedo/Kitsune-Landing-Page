// CATÁLOGO PÚBLICO - src/hooks/useNews.js
import { useState, useEffect } from 'react';
import { catalogApi } from '../services/api';

/**
 * Hook para obtener noticias con paginación
 */
export function useNews({ page = 1, limit = 10 } = {}) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: limit
  });

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await catalogApi.getNews({ page, limit });
      setNews(response.data || []);
      
      // Actualizar paginación
      if (response.pagination) {
        setPagination({
          currentPage: response.pagination.currentPage,
          totalPages: response.pagination.totalPages,
          totalItems: response.pagination.totalItems,
          itemsPerPage: response.pagination.itemsPerPage
        });
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page, limit]);

  return { news, loading, error, refetch: fetchNews, pagination };
}

/**
 * Hook para obtener una noticia por ID
 */
export function useNewsItem(id) {
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewsItem = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await catalogApi.getNewsById(id);
      setNewsItem(response.data);
    } catch (err) {
      console.error('Error fetching news item:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsItem();
  }, [id]);

  return { newsItem, loading, error, refetch: fetchNewsItem };
}

export default useNews;