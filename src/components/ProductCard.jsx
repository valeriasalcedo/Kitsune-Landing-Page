// src/components/ProductCard.jsx - ✅ RESPONSIVE
import React from "react";

const K = {
  purple: "#4e2b5b",
  pink: "#ef5aa1",
  red: "#ad2622",
  dark: "#2b1440",
  blue: "#3b82f6",
};

export default function ProductCard({ product, onOpenModal }) {
  const price = product.final_price || product.price || 0;
  const oldPrice = product.price && product.final_price ? product.price : null;
  const discount = product.discount_percentage || 0;
  const hasOffer = discount > 0 || (oldPrice && oldPrice > price);
  const isPreorder = Boolean(product.is_preorder);
  const img = product.image_url || product.img || 'https://via.placeholder.com/300x400?text=Sin+Imagen';
  const title = product.name || product.title || 'Producto';

  const s = {
    card: {
      borderRadius: 18,
      background: "#fff",
      boxShadow: "0 10px 26px rgba(0,0,0,.08)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transition: "transform .15s ease, box-shadow .15s ease",
      cursor: "pointer",
      color: K.dark,
      position: "relative",
    },
    thumb: {
      position: "relative",
      width: "100%",
      height: 240,
      overflow: "hidden",
      background: "#faf6ff",
    },
    img: {
      position: "absolute", 
      inset: 0,
      width: "100%", 
      height: "100%", 
      objectFit: "cover",
      display: "block",
    },
    badge: (kind) => ({
      position: "absolute", 
      top: 10, 
      left: 10,
      background: 
        kind === "offer" ? K.pink : 
        kind === "preorder" ? K.blue :
        K.purple,
      color: "#fff", 
      padding: "6px 10px",
      borderRadius: 999, 
      fontWeight: 900, 
      fontSize: 12,
      letterSpacing: ".3px",
      boxShadow: "0 8px 22px rgba(0,0,0,.18)",
      zIndex: 2,
    }),
    badgeRight: {
      position: "absolute",
      top: 10,
      right: 10,
      background: K.pink,
      color: "#fff",
      padding: "6px 10px",
      borderRadius: 999,
      fontWeight: 900,
      fontSize: 11,
      boxShadow: "0 8px 22px rgba(0,0,0,.18)",
      zIndex: 2,
    },
    body: { 
      padding: 12, 
      background: "#fff" 
    },
    title: { 
      fontWeight: 900, 
      lineHeight: 1.25, 
      minHeight: 44,
      fontSize: 16,
    },
    priceRow: { 
      display: "flex", 
      alignItems: "center", 
      gap: 8, 
      marginTop: 6,
      flexWrap: "wrap",
    },
    price: { 
      color: K.purple, 
      fontWeight: 900, 
      fontSize: 18 
    },
    old: { 
      textDecoration: "line-through", 
      color: "#8f7f97", 
      fontWeight: 700, 
      fontSize: 14 
    },
    media: `
      @media (max-width: 768px) {
        .pc-thumb { height: 200px !important; }
        .pc-title { fontSize: 15px !important; minHeight: 38px !important; }
        .pc-price { fontSize: 17px !important; }
        .pc-old { fontSize: 13px !important; }
        .pc-badge { fontSize: 11px !important; padding: 5px 9px !important; }
      }
      @media (max-width: 520px) {
        .pc-card { borderRadius: 14px !important; }
        .pc-thumb { height: 180px !important; }
        .pc-body { padding: 10px !important; }
        .pc-title { fontSize: 14px !important; minHeight: 36px !important; }
        .pc-price { fontSize: 16px !important; }
        .pc-badge { fontSize: 10px !important; padding: 4px 8px !important; }
      }
    `,
  };

  const handleClick = () => {
    if (onOpenModal) {
      onOpenModal(product);
    }
  };

  const getBadgeContent = () => {
    if (isPreorder) {
      return { kind: "preorder", text: "POR ENCARGO" };
    }
    if (hasOffer) {
      return { kind: "offer", text: discount ? `OFERTA -${discount}%` : "OFERTA" };
    }
    if (product.badge === "new") {
      return { kind: "new", text: "NUEVO" };
    }
    return null;
  };

  const badgeContent = getBadgeContent();

  return (
    <>
      <style>{s.media}</style>
      <div
        style={s.card}
        className="pc-card"
        onClick={handleClick}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
      >
        <div style={s.thumb} className="pc-thumb">
          {badgeContent && (
            <div style={s.badge(badgeContent.kind)} className="pc-badge">
              {badgeContent.text}
            </div>
          )}
          
          {isPreorder && hasOffer && (
            <div style={s.badgeRight} className="pc-badge">
              {discount ? `-${discount}%` : "OFERTA"}
            </div>
          )}
          
          <img src={img} alt={title} style={s.img} />
        </div>
        
        <div style={s.body} className="pc-body">
          <div style={s.title} className="pc-title">{title}</div>
          
          <div style={s.priceRow}>
            <span style={s.price} className="pc-price">Bs {price.toFixed(2)}</span>
            {hasOffer && oldPrice && <span style={s.old} className="pc-old">Bs {oldPrice.toFixed(2)}</span>}
          </div>
        </div>
      </div>
    </>
  );
}