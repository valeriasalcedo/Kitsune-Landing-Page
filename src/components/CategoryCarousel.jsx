import React, { useRef } from "react";

/**
 * items: [{ id, title, img, href }]
 */
export default function CategoryCarousel({
  title = "CATEGORÍAS",
  viewAllText = "Ver todas",
  viewAllHref = "/categorias",
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

  // === estilos ===
  const c = {
    page: { padding: "32px 18px" },
    head: {
      maxWidth: 1280, margin: "0 auto 18px",
      display: "flex", alignItems: "baseline", gap: 18,
      justifyContent: "space-between"
    },
    h1: {
      margin: 0,
      fontFamily: "DM Sans, system-ui, sans-serif",
      fontWeight: 900,
      fontSize: "clamp(22px,3.5vw,40px)",
      letterSpacing: ".4px",
      color: "#2b1440"
    },
    link: {
      color: "#1a56ff", fontWeight: 700, textDecoration: "underline",
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
      padding: "6px 48px",  // deja espacio para flechas
      scrollbarWidth: "none",
      cursor: "grab"
    },
    railWebkit: { WebkitOverflowScrolling: "touch" },
    btn: (left) => ({
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      [left ? "left" : "right"]: 4,
      width: 44,
      height: 44,
      borderRadius: 999,
      border: "none",
      background: "#4e2b5b",
      color: "#fff",
      display: "grid",
      placeItems: "center",
      boxShadow: "0 6px 18px rgba(0,0,0,.25)",
      cursor: "pointer",
      zIndex: 2
    }),
    card: {
    scrollSnapAlign: "start",
    borderRadius: 22,
    background: "#fff",
    display: "grid",
    gridTemplateRows: "300px auto",   // un poco más alto el área de imagen
    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
    transition: "transform .15s ease, box-shadow .15s ease",
    textDecoration: "none",
    color: "#1a1a1a"
  },
   thumb: (i) => ({
    position: "relative",
    overflow: "hidden",               // recorta la imagen a las esquinas redondeadas
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    background: [
      "linear-gradient(135deg,#ffe5f3,#ffbdda)",
      "linear-gradient(135deg,#d2f1ff,#8edcff)",
      "linear-gradient(135deg,#e6ffdb,#96e99b)",
      "linear-gradient(135deg,#ffe9c7,#ffc38a)",
      "linear-gradient(135deg,#e9e1ff,#c0b2ff)"
    ][i % 5],
    padding: 0,                       // sin padding para que la imagen llene
    aspectRatio: "4 / 5",             // mantiene proporción bonita (ajusta a 1/1 si quieres cuadrado)
  }),
     img: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",               // usa "contain" si prefieres ver la imagen completa sin recortar
    display: "block",
  },
    title: {
      padding: "14px 12px 18px",
      textAlign: "center",
      fontFamily: "DM Sans, system-ui, sans-serif",
      fontWeight: 800,
      fontSize: "18px",
      color: "#2b1440"
    },
    cardHover: { transform: "translateY(-3px)", boxShadow: "0 14px 38px rgba(0,0,0,.12)" },
    // bordes morados/fucsias en los extremos
    edge: {
      position: "absolute",
      top: 0, bottom: 0, width: 36,
      background: "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0) 100%)",
      pointerEvents: "none"
    },
    edgeR: { right: 0, transform: "scaleX(-1)" },
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
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseLeave={onUp}
          onMouseUp={onUp}
          onTouchStart={onDown}
          onTouchMove={onMove}
          onTouchEnd={onUp}
        >
          {items.map((it, i) => (
            <a
              key={it.id || it.title + i}
              data-card
              href={it.href || "#"}
              style={c.card}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, c.cardHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, { transform: "", boxShadow: c.card.boxShadow })}
            >
              <div style={c.thumb(i)}>
                <img src={it.img} alt={it.title} style={c.img} />
              </div>
              <div style={c.title}>{it.title}</div>
            </a>
          ))}
        </div>

        <div style={c.edge} />
        <div style={{ ...c.edge, ...c.edgeR }} />
      </div>
    </section>
  );
}
