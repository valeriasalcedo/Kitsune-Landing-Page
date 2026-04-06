// src/pages/Ofertas.jsx - RESPONSIVE
import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useAnimes } from '../hooks/useAnimes';

export default function Ofertas() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    categoryId: null,
    animeId: null,
    minDiscount: null,
  });

  const { products, loading, error, pagination } = useProducts({
    withOffer: true,
    categoryId: filters.categoryId,
    animeId: filters.animeId,
    limit: 12,
  });

  const { categories } = useCategories();
  const { animes } = useAnimes();

  const filteredProducts = filters.minDiscount
    ? products.filter(p => (p.discount_percentage || 0) >= filters.minDiscount)
    : products;

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ categoryId: null, animeId: null, minDiscount: null });
  };

  const hasActiveFilters = filters.categoryId || filters.animeId || filters.minDiscount;

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: 'clamp(20px, 4vw, 40px) clamp(12px, 3vw, 20px)',
    },
    container: {
      maxWidth: 1200,
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: 40,
      color: '#fff',
    },
    title: {
      fontSize: 'clamp(32px, 6vw, 48px)',
      fontWeight: 900,
      marginBottom: 12,
      textShadow: '0 4px 12px rgba(0,0,0,0.2)',
    },
    subtitle: {
      fontSize: 'clamp(14px, 2.5vw, 18px)',
      opacity: 0.9,
    },
    filtersCard: {
      background: '#fff',
      borderRadius: 16,
      padding: 'clamp(16px, 3vw, 24px)',
      marginBottom: 32,
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
    filtersTitle: {
      fontSize: 16,
      fontWeight: 900,
      color: '#4e2b5b',
      marginBottom: 16,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    filtersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 16,
      marginBottom: 16,
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    },
    label: {
      fontSize: 13,
      fontWeight: 700,
      color: '#6b7280',
      textTransform: 'uppercase',
    },
    select: {
      padding: '10px 12px',
      border: '2px solid #e5e7eb',
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 600,
      color: '#374151',
      background: '#fff',
      cursor: 'pointer',
      transition: 'border-color 0.2s',
    },
    clearBtn: {
      padding: '10px 20px',
      background: '#ef4444',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      fontWeight: 700,
      cursor: 'pointer',
      fontSize: 14,
      transition: 'background 0.2s',
      width: '100%',
      maxWidth: 200,
    },
    statsBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#fff',
      borderRadius: 12,
      padding: '16px 24px',
      marginBottom: 24,
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      flexWrap: 'wrap',
      gap: 12,
    },
    statsText: {
      fontSize: 14,
      fontWeight: 700,
      color: '#6b7280',
    },
    statsNumber: {
      color: '#ef5aa1',
      fontWeight: 900,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 24,
    },
    emptyState: {
      textAlign: 'center',
      padding: '80px 20px',
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
    emptyIcon: {
      fontSize: 64,
      marginBottom: 16,
    },
    emptyTitle: {
      fontSize: 24,
      fontWeight: 900,
      color: '#374151',
      marginBottom: 8,
    },
    emptyText: {
      fontSize: 16,
      color: '#6b7280',
      marginBottom: 24,
    },
    media: `
      @media (max-width: 768px){
        .ofertas-filters-grid { grid-template-columns: 1fr !important; }
        .ofertas-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)) !important; gap: 16px !important; }
        .ofertas-stats { flex-direction: column !important; align-items: flex-start !important; }
        .ofertas-clear-btn { max-width: 100% !important; }
      }
      @media (max-width: 520px){
        .ofertas-grid { grid-template-columns: 1fr !important; }
        .ofertas-empty { padding: 40px 20px !important; }
        .ofertas-header { margin-bottom: 24px !important; }
      }
    `,
  };

  if (error) {
    return (
      <>
        <style>{styles.media}</style>
        <div style={styles.page}>
          <div style={styles.container}>
            <div style={styles.emptyState} className="ofertas-empty">
              <div style={styles.emptyIcon}>⚠️</div>
              <div style={styles.emptyTitle}>Error al cargar ofertas</div>
              <div style={styles.emptyText}>{error}</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles.media}</style>
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.header} className="ofertas-header">
            <h1 style={styles.title}>🔥 OFERTAS ESPECIALES</h1>
            <p style={styles.subtitle}>
              Los mejores descuentos en productos seleccionados
            </p>
          </div>

          <div style={styles.filtersCard}>
            <div style={styles.filtersTitle}>Filtrar Ofertas</div>
            
            <div style={styles.filtersGrid} className="ofertas-filters-grid">
              <div style={styles.filterGroup}>
                <label style={styles.label}>Categoría</label>
                <select
                  style={styles.select}
                  value={filters.categoryId || ''}
                  onChange={(e) => handleFilterChange('categoryId', e.target.value || null)}
                >
                  <option value="">Todas las categorías</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.label}>Anime</label>
                <select
                  style={styles.select}
                  value={filters.animeId || ''}
                  onChange={(e) => handleFilterChange('animeId', e.target.value || null)}
                >
                  <option value="">Todos los animes</option>
                  {animes.map(anime => (
                    <option key={anime.id} value={anime.id}>
                      {anime.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.label}>Descuento mínimo</label>
                <select
                  style={styles.select}
                  value={filters.minDiscount || ''}
                  onChange={(e) => handleFilterChange('minDiscount', e.target.value ? parseInt(e.target.value) : null)}
                >
                  <option value="">Todos los descuentos</option>
                  <option value="10">10% o más</option>
                  <option value="20">20% o más</option>
                  <option value="30">30% o más</option>
                  <option value="50">50% o más</option>
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <button
                style={styles.clearBtn}
                className="ofertas-clear-btn"
                onClick={clearFilters}
                onMouseEnter={(e) => e.target.style.background = '#dc2626'}
                onMouseLeave={(e) => e.target.style.background = '#ef4444'}
              >
                Limpiar filtros
              </button>
            )}
          </div>

          <div style={styles.statsBar} className="ofertas-stats">
            <div style={styles.statsText}>
              {loading ? 'Cargando...' : (
                <>
                  Mostrando <span style={styles.statsNumber}>{filteredProducts.length}</span> productos en oferta
                </>
              )}
            </div>
            {pagination && (
              <div style={styles.statsText}>
                Página {pagination.page} de {pagination.totalPages}
              </div>
            )}
          </div>

          {loading ? (
            <div style={styles.emptyState} className="ofertas-empty">
              <div style={styles.emptyIcon}>⏳</div>
              <div style={styles.emptyTitle}>Cargando ofertas...</div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={styles.emptyState} className="ofertas-empty">
              <div style={styles.emptyIcon}>🔍</div>
              <div style={styles.emptyTitle}>No hay ofertas disponibles</div>
              <div style={styles.emptyText}>
                {hasActiveFilters
                  ? 'Intenta cambiar los filtros para ver más productos'
                  : 'No hay productos en oferta en este momento'}
              </div>
            </div>
          ) : (
            <div style={styles.grid} className="ofertas-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenModal={setSelectedProduct}
                />
              ))}
            </div>
          )}

          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </div>
      </div>
    </>
  );
}