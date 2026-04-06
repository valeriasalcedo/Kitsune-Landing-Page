// src/pages/Nuevos.jsx - ✅ CON MODAL FUNCIONANDO
import React, { useState } from "react";
import BannerSlider from "../components/BannerSlider";
import MarqueeBanner from "../components/MarqueeBanner";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal"; // ✅ AÑADIDO
import { useProducts } from "../hooks/useProducts";

export default function Nuevos() {
  const { products, loading } = useProducts({ limit: 10, page: 1 });
  
  // ✅ ESTADO PARA EL MODAL
  const [selectedProduct, setSelectedProduct] = useState(null);

  const s = {
    page: { padding: "20px" },
    title: { 
      fontSize: "clamp(24px, 5vw, 28px)", 
      fontWeight: "bold", 
      marginBottom: "20px",
      color: "#333",
      padding: "0 10px",
    },
    loading: { 
      textAlign: "center", 
      padding: "40px",
      fontSize: "18px",
      color: "#666"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "20px",
      marginTop: "20px",
      padding: "0 10px",
    },
    empty: { 
      textAlign: "center", 
      padding: "40px",
      fontSize: "18px",
      color: "#999"
    },
    media: `
      @media (max-width: 768px){
        .nuevos-grid { 
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)) !important; 
          gap: 16px !important;
        }
      }
      @media (max-width: 520px){
        .nuevos-grid { 
          grid-template-columns: 1fr !important; 
          gap: 16px !important;
          padding: 0 !important;
        }
        .nuevos-page { padding: 16px !important; }
      }
    `,
  };

  return (
    <>
      <style>{s.media}</style>
      <div style={{ padding: 12 }}>
        <BannerSlider />
      </div>
      <MarqueeBanner />
      <div style={s.page} className="nuevos-page">
        <h1 style={s.title}>Productos Nuevos</h1>
        {loading ? (
          <div style={s.loading}>Cargando productos...</div>
        ) : products.length > 0 ? (
          <div style={s.grid} className="nuevos-grid">
            {products.map((producto) => (
              <ProductCard 
                key={producto.id} 
                product={producto} 
                type="new"
                onClick={() => setSelectedProduct(producto)} // ✅ HANDLER
              />
            ))}
          </div>
        ) : (
          <div style={s.empty}>No hay productos nuevos disponibles</div>
        )}
      </div>

      {/* ✅ MODAL DE PRODUCTO */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </>
  );
}