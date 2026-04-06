// src/components/ProductModal.jsx - ✅ RESPONSIVE
import React, { useState } from "react";

const K = {
  purple: "#4e2b5b",
  pink: "#ef5aa1",
  red: "#ad2622",
  dark: "#2b1440",
};

export default function ProductModal({ product, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const title = product.name || product.title || 'Producto';
  const description = product.description || 'Sin descripción disponible';
  const price = product.final_price || product.price || 0;
  const oldPrice = product.price && product.final_price ? product.price : null;
  const discount = product.discount_percentage || 0;
  const hasOffer = discount > 0 || (oldPrice && oldPrice > price);
  const savings = hasOffer && oldPrice ? oldPrice - price : 0;
  const stock = product.stock || 0;

  const images = product.images && product.images.length > 0 
    ? product.images.map(img => img.url || img.image_url || img)
    : [product.image_url || product.img || 'https://via.placeholder.com/600'];

  const nextImage = () => {
    setCurrentImageIndex((i) => (i + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((i) => (i - 1 + images.length) % images.length);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const s = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.75)",
      backdropFilter: "blur(4px)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      animation: "fadeIn 0.2s ease",
    },
    modal: {
      background: "#fff",
      borderRadius: 24,
      maxWidth: 900,
      width: "100%",
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 20px 60px rgba(0,0,0,.3)",
      position: "relative",
      animation: "slideUp 0.3s ease",
    },
    closeBtn: {
      position: "absolute",
      top: 16,
      right: 16,
      background: "#fff",
      border: "none",
      borderRadius: 999,
      width: 36,
      height: 36,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(0,0,0,.15)",
      zIndex: 10,
      fontWeight: 900,
      fontSize: 20,
      color: K.dark,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 0,
    },
    carousel: {
      position: "relative",
      background: "#faf6ff",
      borderTopLeftRadius: 24,
      borderBottomLeftRadius: 24,
      overflow: "hidden",
    },
    mainImage: {
      width: "100%",
      aspectRatio: "1 / 1",
      objectFit: "cover",
      display: "block",
    },
    navBtn: (left) => ({
      position: "absolute",
      top: "50%",
      [left ? "left" : "right"]: 12,
      transform: "translateY(-50%)",
      background: "rgba(255,255,255,.95)",
      border: "none",
      borderRadius: 999,
      width: 40,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontWeight: 900,
      fontSize: 20,
      color: K.purple,
      boxShadow: "0 4px 12px rgba(0,0,0,.2)",
    }),
    thumbnails: {
      display: "flex",
      gap: 8,
      padding: "12px 16px",
      overflowX: "auto",
      scrollbarWidth: "thin",
    },
    thumbnail: (active) => ({
      minWidth: 60,
      height: 60,
      borderRadius: 8,
      overflow: "hidden",
      cursor: "pointer",
      border: active ? `3px solid ${K.purple}` : "3px solid transparent",
      opacity: active ? 1 : 0.6,
      transition: "all 0.2s ease",
    }),
    thumbImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
    content: {
      padding: 32,
      display: "flex",
      flexDirection: "column",
      gap: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 900,
      color: K.dark,
      lineHeight: 1.2,
      margin: 0,
    },
    priceSection: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },
    priceRow: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap",
    },
    price: {
      fontSize: 32,
      fontWeight: 900,
      color: K.purple,
    },
    oldPrice: {
      fontSize: 20,
      color: "#8f7f97",
      textDecoration: "line-through",
      fontWeight: 700,
    },
    discountBadge: {
      background: K.pink,
      color: "#fff",
      padding: "6px 12px",
      borderRadius: 8,
      fontWeight: 900,
      fontSize: 14,
    },
    savings: {
      color: "#059669",
      fontWeight: 700,
      fontSize: 15,
    },
    section: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 900,
      color: "#6b7280",
      textTransform: "uppercase",
      letterSpacing: ".5px",
    },
    description: {
      fontSize: 15,
      lineHeight: 1.6,
      color: "#4b5563",
    },
    tags: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6,
    },
    tag: {
      background: "#f3f4f6",
      color: "#374151",
      padding: "6px 12px",
      borderRadius: 8,
      fontWeight: 700,
      fontSize: 13,
    },
    stockInfo: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "12px 16px",
      borderRadius: 12,
      background: stock > 0 ? "#d1fae5" : "#fee2e2",
      color: stock > 0 ? "#065f46" : "#991b1b",
      fontWeight: 700,
    },
    media: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @media (max-width: 768px) {
        .pm-overlay { padding: 12px !important; }
        .pm-modal { borderRadius: 20px !important; maxHeight: 95vh !important; }
        .pm-close-btn { width: 32px !important; height: 32px !important; fontSize: 18px !important; top: 12px !important; right: 12px !important; }
        .pm-grid { gridTemplateColumns: 1fr !important; }
        .pm-carousel { borderRadius: 20px 20px 0 0 !important; }
        .pm-nav-btn { width: 36px !important; height: 36px !important; fontSize: 18px !important; }
        .pm-thumbnails { padding: 10px 12px !important; gap: 6px !important; }
        .pm-thumbnail { minWidth: 50px !important; height: 50px !important; }
        .pm-content { padding: 24px !important; gap: 16px !important; }
        .pm-title { fontSize: 24px !important; }
        .pm-price { fontSize: 28px !important; }
        .pm-old-price { fontSize: 18px !important; }
        .pm-discount-badge { fontSize: 13px !important; padding: 5px 10px !important; }
        .pm-description { fontSize: 14px !important; }
      }
      @media (max-width: 520px) {
        .pm-overlay { padding: 8px !important; }
        .pm-modal { borderRadius: 16px !important; }
        .pm-carousel { borderRadius: 16px 16px 0 0 !important; }
        .pm-nav-btn { width: 32px !important; height: 32px !important; fontSize: 16px !important; left: 8px !important; }
        .pm-nav-btn-right { right: 8px !important; }
        .pm-thumbnails { padding: 8px 10px !important; }
        .pm-thumbnail { minWidth: 45px !important; height: 45px !important; }
        .pm-content { padding: 20px !important; gap: 14px !important; }
        .pm-title { fontSize: 20px !important; }
        .pm-price { fontSize: 24px !important; }
        .pm-old-price { fontSize: 16px !important; }
        .pm-discount-badge { fontSize: 12px !important; padding: 4px 8px !important; }
        .pm-savings { fontSize: 14px !important; }
        .pm-stock-info { padding: 10px 12px !important; fontSize: 13px !important; }
        .pm-section-title { fontSize: 13px !important; }
        .pm-tag { fontSize: 12px !important; padding: 5px 10px !important; }
        .pm-description { fontSize: 13px !important; }
      }
    `,
  };

  return (
    <>
      <style>{s.media}</style>
      <div style={s.overlay} className="pm-overlay" onClick={handleOverlayClick}>
        <div style={s.modal} className="pm-modal">
          <button style={s.closeBtn} className="pm-close-btn" onClick={onClose} aria-label="Cerrar">
            ×
          </button>

          <div className="pm-grid" style={s.grid}>
            {/* Carrusel de imágenes */}
            <div className="pm-carousel" style={s.carousel}>
              <img
                src={images[currentImageIndex]}
                alt={title}
                style={s.mainImage}
              />

              {images.length > 1 && (
                <>
                  <button 
                    style={s.navBtn(true)} 
                    className="pm-nav-btn" 
                    onClick={prevImage}
                  >
                    ‹
                  </button>
                  <button 
                    style={s.navBtn(false)} 
                    className="pm-nav-btn pm-nav-btn-right" 
                    onClick={nextImage}
                  >
                    ›
                  </button>
                </>
              )}

              {/* Thumbnails */}
              {images.length > 1 && (
                <div style={s.thumbnails} className="pm-thumbnails">
                  {images.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      style={s.thumbnail(idx === currentImageIndex)}
                      className="pm-thumbnail"
                      onClick={() => setCurrentImageIndex(idx)}
                    >
                      <img src={imgSrc} alt="" style={s.thumbImg} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contenido */}
            <div className="pm-content" style={s.content}>
              <h2 style={s.title} className="pm-title">{title}</h2>

              {/* Precio */}
              <div style={s.priceSection}>
                <div style={s.priceRow}>
                  <span style={s.price} className="pm-price">Bs {price.toFixed(2)}</span>
                  {hasOffer && oldPrice && (
                    <>
                      <span style={s.oldPrice} className="pm-old-price">Bs {oldPrice.toFixed(2)}</span>
                      {discount > 0 && (
                        <span style={s.discountBadge} className="pm-discount-badge">-{discount}%</span>
                      )}
                    </>
                  )}
                </div>
                {hasOffer && savings > 0 && (
                  <span style={s.savings} className="pm-savings">
                    ✓ Ahorras Bs {savings.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock */}
              <div style={s.stockInfo} className="pm-stock-info">
                {stock > 0 ? (
                  <>✓ Disponible: {stock} unidades</>
                ) : (
                  <>× Sin stock</>
                )}
              </div>

              {/* Categorías */}
              {product.categories && product.categories.length > 0 && (
                <div style={s.section}>
                  <div style={s.sectionTitle} className="pm-section-title">Categorías</div>
                  <div style={s.tags}>
                    {product.categories.map((cat, i) => (
                      <span key={i} style={s.tag} className="pm-tag">
                        📁 {cat.name || cat.title || cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Animes */}
              {product.animes && product.animes.length > 0 && (
                <div style={s.section}>
                  <div style={s.sectionTitle} className="pm-section-title">Animes</div>
                  <div style={s.tags}>
                    {product.animes.map((anime, i) => (
                      <span key={i} style={s.tag} className="pm-tag">
                        ⭐ {anime.name || anime.title || anime}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Descripción */}
              {description && description !== 'Sin descripción disponible' && (
                <div style={s.section}>
                  <div style={s.sectionTitle} className="pm-section-title">Descripción</div>
                  <p style={s.description} className="pm-description">{description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}