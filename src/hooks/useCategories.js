// CATÁLOGO PÚBLICO - src/hooks/useCategories.js
import { useState, useEffect } from 'react';
import { catalogApi } from '../services/api';

/**
 * Hook para obtener todas las categorías
 */
export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await catalogApi.getCategories();
      
      // ✅ Transformar datos al formato esperado por los componentes
      const transformed = (response.data || []).map(cat => ({
        id: cat.id,
        title: cat.name,
        name: cat.name, // mantener ambos
        img: cat.image_url || 'https://via.placeholder.com/300x400?text=Sin+Imagen',
        image_url: cat.image_url || 'https://via.placeholder.com/300x400?text=Sin+Imagen',
        href: `/categoria/${cat.id}`,
        description: cat.description,
        ...cat // mantener todos los demás campos
      }));
      
      setCategories(transformed);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, refetch: fetchCategories };
}

/**
 * Hook para obtener una categoría por ID
 */
export function useCategory(id) {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategory = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await catalogApi.getCategoryById(id);
      setCategory(response.data);
    } catch (err) {
      console.error('Error fetching category:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  return { category, loading, error, refetch: fetchCategory };
}

export default useCategories;