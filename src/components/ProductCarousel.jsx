import React, { useRef } from "react";

/**
 * items: [
 *  { id, title, img, href, price, oldPrice } // oldPrice opcional
 * ]
 * type: "new" | "offer"  -> cambia el badge/color
 */
export default function ProductCarousel({
  title = "Productos",
  viewAllText = "Ver todo",
  viewAllHref = "#",
  type = "new",
  items = [],
}) {
  const railRef = useRef(null);

  const scrollByCards = (dir = 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("[data-card]");
    const step = card ? card.clientWidth + 24 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  // drag con mouse/touch
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

  // estilos (misma línea visual que CategoryCarousel)
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
    link: { color: "#1a56ff", fontWeight: 700, textDecoration: "underline", whiteSpace: "nowrap" },
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
      boxShadow: "0 6px 18px rgba(0,0,0,.25)", cursor: "pointer", zIndex: 2
    }),
    card: {
    scrollSnapAlign: "start",
    borderRadius: 18,
    background: "#fff",
    display: "flex",                 // antes: grid
    flexDirection: "column",         // imagen arriba, texto abajo
    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
    transition: "transform .15s ease, box-shadow .15s ease",
    textDecoration: "none",
    color: "#1a1a1a",
    overflow: "hidden",              // por si acaso
    position: "relative",
  },

  // área de imagen
  thumb: {
    position: "relative",
    width: "100%",
    height: 260,                     // ajusta alto del área de imagen
    overflow: "hidden",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    background: "#f7f2fa",
    padding: 0,                      // ← sin padding
  },

  // la imagen llena todo el thumb
  img: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",              // usa "contain" si no quieres recorte
    display: "block",
  },

  // contenido de abajo
  body: {
    padding: "12px 12px 14px",
    background: "#fff",              // asegura contraste y que no flote sobre la foto
  },

  // badge sigue funcionando porque el thumb es 'relative'
  badge: (kind, discount) => ({
    position: "absolute", top: 10, left: 10,
    background: kind === "offer" ? "#ef5aa1" : "#4e2b5b",
    color: "#fff", fontWeight: 900, fontSize: 12,
    padding: "6px 10px", borderRadius: 999, letterSpacing: .4,
    boxShadow: "0 6px 18px rgba(0,0,0,.18)",
    zIndex: 1,
  }),
    title: {
      fontFamily: "DM Sans, system-ui, sans-serif",
      fontWeight: 800, fontSize: 16, color: "#2b1440", lineHeight: 1.2, minHeight: 40
    },
    priceRow: { display: "flex", alignItems: "center", gap: 8, marginTop: 6 },
    price: { fontWeight: 900, color: "#4e2b5b", fontSize: 18 },
    old: { color: "#8c7a97", textDecoration: "line-through", fontWeight: 700, fontSize: 14 },
    
    cardHover: { transform: "translateY(-3px)", boxShadow: "0 14px 38px rgba(0,0,0,.12)" },
  };

  return (
    <section style={c.page}>
      <header style={c.head}>
        <h2 style={c.h1}>{title}</h2>
        <a href={viewAllHref} style={c.link}>{viewAllText}</a>
      </header>

      <div style={c.wrap}>
        <button style={c.btn(true)} onClick={() => scrollByCards(-1)} aria-label="Anterior">‹</button>
        <button style={c.btn(false)} onClick={() => scrollByCards(1)} aria-label="Siguiente">›</button>

        <div
          ref={railRef}
          style={{ ...c.rail, ...c.railWebkit }}
          onMouseDown={onDown} onMouseMove={onMove} onMouseLeave={onUp} onMouseUp={onUp}
          onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
        >
          {items.map((p, i) => {
            const hasOffer = typeof p.oldPrice === "number" && p.oldPrice > p.price;
            const discount = hasOffer ? Math.round(100 - (p.price / p.oldPrice) * 100) : 0;

            return (
              <a
                key={p.id || p.title + i}
                data-card
                href={p.href || "#"}
                style={c.card}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, c.cardHover)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, { transform: "", boxShadow: c.card.boxShadow })}
              >
                <div style={c.thumb}>
                  {/* badge */}
                  <div style={c.badge(hasOffer || type === "offer" ? "offer" : "new", discount)}>
                    {hasOffer || type === "offer" ? (discount ? `OFERTA -${discount}%` : "OFERTA") : "NUEVO"}
                  </div>

                  <img src={p.img} alt={p.title} style={c.img} />
                </div>

                <div style={c.body}>
                  <div style={c.title}>{p.title}</div>
                  <div style={c.priceRow}>
                    <span style={c.price}>${p.price.toFixed(2)}</span>
                    {hasOffer && <span style={c.old}>${p.oldPrice.toFixed(2)}</span>}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
