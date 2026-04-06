// src/components/ProductCarousel.jsx - ✅ RESPONSIVE
import React, { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

export default function ProductCarousel({
  title = "Productos",
  viewAllText = "Ver todo",
  viewAllHref = "#",
  type = "new",
  items = [],
}) {
  const railRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const scrollByCards = (dir = 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("[data-card]");
    const step = card ? card.clientWidth + 24 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  let isDown = false, startX = 0, startScroll = 0;
  const onDown = (e) => {
    isDown = true;
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    startScroll = railRef.current.scrollLeft;
    railRef.current.style.cursor = "grabbing";
  };
  const onMove = (e) => {
    if (!isDown) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    const dx = x - startX;
    railRef.current.scrollLeft = startScroll - dx;
  };
  const onUp = () => {
    isDown = false;
    if (railRef.current) railRef.current.style.cursor = "grab";
  };

  const c = {
    page: { padding: "28px 18px" },
    head: {
      maxWidth: 1280, margin: "0 auto 16px",
      display: "flex", alignItems: "baseline", gap: 18,
      justifyContent: "space-between"
    },
    h1: {
      margin: 0,
      fontFamily: "DM Sans, system-ui, sans-serif",
      fontWeight: 900,
      fontSize: "clamp(22px,3.5vw,36px)",
      letterSpacing: ".4px",
      color: "#2b1440"
    },
    link: { 
      color: "#1a56ff", 
      fontWeight: 700, 
      textDecoration: "underline", 
      whiteSpace: "nowrap" 
    },
    wrap: { position: "relative", maxWidth: 1280, margin: "0 auto" },
    rail: {
      display: "grid",
      gridAutoFlow: "column",
      gridAutoColumns: "minmax(220px, 1fr)",
      gap: 24,
      scrollSnapType: "x mandatory",
      overflowX: "auto",
      overscrollBehaviorX: "contain",
      padding: "6px 48px",
      scrollbarWidth: "none",
      cursor: "grab"
    },
    railWebkit: { WebkitOverflowScrolling: "touch" },
    btn: (left) => ({
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      [left ? "left" : "right"]: 4,
      width: 44, height: 44, borderRadius: 999, border: "none",
      background: "#4e2b5b", color: "#fff",
      display: "grid", placeItems: "center",
      boxShadow: "0 6px 18px rgba(0,0,0,.25)", 
      cursor: "pointer", 
      zIndex: 2
    }),
    cardWrapper: {
      scrollSnapAlign: "start",
    },
    media: `
      @media (max-width: 768px) {
        .pcar-page { padding: 24px 12px !important; }
        .pcar-head { marginBottom: 14px !important; gap: 12px !important; }
        .pcar-h1 { fontSize: 24px !important; }
        .pcar-rail { gridAutoColumns: minmax(180px, 1fr) !important; gap: 16px !important; padding: 6px 36px !important; }
        .pcar-btn { width: 36px !important; height: 36px !important; }
      }
      @media (max-width: 520px) {
        .pcar-page { padding: 20px 10px !important; }
        .pcar-rail { gridAutoColumns: minmax(150px, 1fr) !important; gap: 12px !important; padding: 6px 12px !important; }
        .pcar-btn { display: none !important; }
      }
    `,
  };

  return (
    <>
      <style>{c.media}</style>
      <section style={c.page} className="pcar-page">
        <header style={c.head} className="pcar-head">
          <h2 style={c.h1} className="pcar-h1">{title}</h2>
          <a href={viewAllHref} style={c.link}>{viewAllText}</a>
        </header>

        <div style={c.wrap}>
          <button 
            style={c.btn(true)} 
            className="pcar-btn"
            onClick={() => scrollByCards(-1)} 
            aria-label="Anterior"
          >
            ‹
          </button>
          <button 
            style={c.btn(false)} 
            className="pcar-btn"
            onClick={() => scrollByCards(1)} 
            aria-label="Siguiente"
          >
            ›
          </button>

          <div
            ref={railRef}
            style={{ ...c.rail, ...c.railWebkit }}
            className="pcar-rail"
            onMouseDown={onDown} 
            onMouseMove={onMove} 
            onMouseLeave={onUp} 
            onMouseUp={onUp}
            onTouchStart={onDown} 
            onTouchMove={onMove} 
            onTouchEnd={onUp}
          >
            {items.map((p, i) => (
              <div 
                key={p.id || i} 
                data-card 
                style={c.cardWrapper}
              >
                <ProductCard 
                  product={p} 
                  onOpenModal={(prod) => setSelectedProduct(prod)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}