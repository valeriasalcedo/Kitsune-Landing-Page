// CATÁLOGO PÚBLICO - src/hooks/useProducts.js
import { useState, useEffect } from "react";
import { catalogApi } from "../services/api";

/**
 * ✅ Helper para transformar datos del producto
 */
const transformProduct = (product) => ({
  ...product,
  price: parseFloat(product.price) || 0,
  final_price: product.final_price ? parseFloat(product.final_price) : null,
  discount_percentage: product.discount_percentage
    ? parseInt(product.discount_percentage)
    : null,
  stock: parseInt(product.stock) || 0,
  is_preorder: Boolean(product.is_preorder),  // ✅ Campo de preorder
  image_url:
    product.image_url || "https://via.placeholder.com/300x400?text=Sin+Imagen",
  img:
    product.image_url || "https://via.placeholder.com/300x400?text=Sin+Imagen",
  title: product.name,
  name: product.name,
  href: `/producto/${product.id}`,
});

/**
 * Hook para obtener productos con paginación y filtros
 * @param {Object} options - { page, limit, withOffer, categoryId, animeId, preorderOnly }
 */
export function useProducts({
  page = 1,
  limit = 12,
  withOffer = false,
  categoryId = null,
  animeId = null,
  preorderOnly = false,
} = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
    totalPages: 1,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await catalogApi.getProducts({
        page,
        limit,
        withOffer,
        categoryId,
        animeId,
        preorderOnly,
      });

      let items = Array.isArray(response.data) ? response.data : [];

      // ✅ Transformar datos incluyendo campo de preorder
      items = items.map(transformProduct);

      setProducts(items);

      // ✅ Paginación según tu backend real
      if (response.pagination) {
        setPagination({
          page: response.pagination.page ?? page,
          limit: response.pagination.limit ?? limit,
          total: response.pagination.total ?? items.length,
          totalPages: response.pagination.totalPages ?? 1,
        });
      } else {
        setPagination({
          page,
          limit,
          total: items.length,
          totalPages: 1,
        });
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, withOffer, categoryId, animeId, preorderOnly]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    pagination,
  };
}

/**
 * Hook para obtener un producto por ID
 */
export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await catalogApi.getProductById(id);

      const data = response.data;
      if (data) {
        setProduct(transformProduct(data));
      } else {
        setProduct(null);
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return { product, loading, error, refetch: fetchProduct };
}

/**
 * Hook para obtener solo ofertas
 */
export function useOffers({ page = 1, limit = 12 } = {}) {
  return useProducts({ page, limit, withOffer: true });
}

/**
 * ✅ Hook para obtener solo productos por encargo
 */
export function usePreorderProducts({ page = 1, limit = 12 } = {}) {
  return useProducts({ page, limit, preorderOnly: true });
}

export default useProducts;