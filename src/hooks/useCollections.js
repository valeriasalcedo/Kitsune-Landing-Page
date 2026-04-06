// CATÁLOGO PÚBLICO - src/hooks/useCollections.js
import { useState, useEffect } from 'react';
import { catalogApi } from '../services/api';

/**
 * Hook para obtener todas las colecciones
 */
export function useCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await catalogApi.getCollections();
      
      // ✅ Transformar datos al formato esperado
      const transformed = (response.data || []).map(col => ({
        id: col.id,
        title: col.name,
        name: col.name,
        img: col.image_url || 'https://via.placeholder.com/300x400?text=Sin+Imagen',
        image_url: col.image_url || 'https://via.placeholder.com/300x400?text=Sin+Imagen',
        href: `/coleccion/${col.id}`,
        description: col.description,
        ...col
      }));
      
      setCollections(transformed);
    } catch (err) {
      console.error('Error fetching collections:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return { collections, loading, error, refetch: fetchCollections };
}

/**
 * Hook para obtener una colección por ID
 */
export function useCollection(id) {
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCollection = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await catalogApi.getCollectionById(id);
      setCollection(response.data);
    } catch (err) {
      console.error('Error fetching collection:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, [id]);

  return { collection, loading, error, refetch: fetchCollection };
}

/**
 * Hook para obtener items de una colección
 */
export function useCollectionItems(id) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await catalogApi.getCollectionItems(id);
      
      // ✅ Transformar datos igual que useProducts
      const transformed = (response.data || []).map(item => ({
        ...item,
        price: parseFloat(item.price) || 0,
        final_price: item.final_price ? parseFloat(item.final_price) : null,
        discount_percentage: item.discount_percentage ? parseInt(item.discount_percentage) : null,
        stock: parseInt(item.stock) || 0,
        is_preorder: Boolean(item.is_preorder),
        image_url: item.image_url || 'https://via.placeholder.com/300x400?text=Sin+Imagen',
        img: item.image_url || 'https://via.placeholder.com/300x400?text=Sin+Imagen',
        title: item.name,
        href: `/producto/${item.id}`
      }));
      
      setItems(transformed);
    } catch (err) {
      console.error('Error fetching collection items:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [id]);

  return { items, loading, error, refetch: fetchItems };
}

export default useCollections;