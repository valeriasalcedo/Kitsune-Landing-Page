// CATÁLOGO PÚBLICO - src/services/api.js
// Cliente API para catalogo.com (SIN autenticación)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper para manejar respuestas
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Error en la petición');
  }
  
  return data;
};

// ========================================
// PRODUCTOS
// ========================================

export const catalogApi = {
  /**
   * Obtener productos con paginación
   * @param {Object} filters - { page, limit, withOffer, categoryId, animeId, preorderOnly }
   */
  getProducts: async ({
    page = 1,
    limit = 12,
    withOffer = false,
    categoryId = null,
    animeId = null,
    preorderOnly = false,
  } = {}) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (withOffer) params.append("withOffer", "1");
    if (preorderOnly) params.append("preorderOnly", "1");
    if (categoryId != null && categoryId !== "") params.append("categoryId", String(categoryId));
    if (animeId != null && animeId !== "") params.append("animeId", String(animeId));

    const response = await fetch(`${API_URL}/catalog/products?${params.toString()}`);
    return handleResponse(response);
  },

  /**
   * Obtener producto por ID
   */
  getProductById: async (id) => {
    const response = await fetch(`${API_URL}/catalog/products/${id}`);
    return handleResponse(response);
  },

  /**
   * ✅ NUEVO: Obtener solo productos por encargo
   * @param {Object} options - { page, limit }
   */
  getPreorderProducts: async ({ page = 1, limit = 12 } = {}) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      preorderOnly: "1",
    });

    const response = await fetch(`${API_URL}/catalog/products?${params.toString()}`);
    return handleResponse(response);
  },

  // ========================================
  // CATEGORÍAS
  // ========================================

  /**
   * Obtener todas las categorías activas
   */
  getCategories: async () => {
    const response = await fetch(`${API_URL}/catalog/categories`);
    return handleResponse(response);
  },

  /**
   * Obtener categoría por ID
   */
  getCategoryById: async (id) => {
    const response = await fetch(`${API_URL}/catalog/categories/${id}`);
    return handleResponse(response);
  },

  // ========================================
  // ANIMES
  // ========================================

  /**
   * Obtener todos los animes
   */
  getAnimes: async () => {
    const response = await fetch(`${API_URL}/catalog/animes`);
    return handleResponse(response);
  },

  /**
   * Obtener anime por ID
   */
  getAnimeById: async (id) => {
    const response = await fetch(`${API_URL}/catalog/animes/${id}`);
    return handleResponse(response);
  },

  // ========================================
  // COLECCIONES
  // ========================================

  /**
   * Obtener todas las colecciones activas
   */
  getCollections: async () => {
    const response = await fetch(`${API_URL}/catalog/collections`);
    return handleResponse(response);
  },

  /**
   * Obtener colección por ID
   */
  getCollectionById: async (id) => {
    const response = await fetch(`${API_URL}/catalog/collections/${id}`);
    return handleResponse(response);
  },

  /**
   * Obtener items de una colección
   */
  getCollectionItems: async (id) => {
    const response = await fetch(`${API_URL}/catalog/collections/${id}/items`);
    return handleResponse(response);
  },

  // ========================================
  // NOTICIAS/EVENTOS
  // ========================================

  /**
   * Obtener noticias con paginación
   */
  getNews: async ({ page = 1, limit = 10 } = {}) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    
    const response = await fetch(`${API_URL}/catalog/news?${params}`);
    return handleResponse(response);
  },

  /**
   * Obtener noticia/evento por ID
   */
  getNewsById: async (id) => {
    const response = await fetch(`${API_URL}/catalog/news/${id}`);
    return handleResponse(response);
  },

  // ========================================
  // AVISOS/BANNERS
  // ========================================

  /**
   * Obtener avisos activos
   */
  getNotices: async () => {
    const response = await fetch(`${API_URL}/catalog/notices`);
    return handleResponse(response);
  }
};

export default catalogApi;