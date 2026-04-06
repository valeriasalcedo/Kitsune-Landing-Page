// CATÁLOGO PÚBLICO - src/hooks/useAnimes.js
import { useState, useEffect } from 'react';
import { catalogApi } from '../services/api';

/**
 * Hook para obtener todos los animes
 */
export function useAnimes() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnimes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await catalogApi.getAnimes();
      
      // ✅ Transformar datos al formato esperado
      const transformed = (response.data || []).map(anime => ({
        id: anime.id,
        title: anime.name,
        name: anime.name,
        img: anime.image_url || 'https://via.placeholder.com/300x400?text=Sin+Imagen',
        image_url: anime.image_url || 'https://via.placeholder.com/300x400?text=Sin+Imagen',
        href: `/anime/${anime.id}`,
        description: anime.description,
        ...anime
      }));
      
      setAnimes(transformed);
    } catch (err) {
      console.error('Error fetching animes:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimes();
  }, []);

  return { animes, loading, error, refetch: fetchAnimes };
}

/**
 * Hook para obtener un anime por ID
 */
export function useAnime(id) {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnime = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await catalogApi.getAnimeById(id);
      setAnime(response.data);
    } catch (err) {
      console.error('Error fetching anime:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, [id]);

  return { anime, loading, error, refetch: fetchAnime };
}

export default useAnimes;