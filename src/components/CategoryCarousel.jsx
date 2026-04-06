// src/components/CategoryCarousel.jsx - ✅ RESPONSIVE
import React, { useRef } from "react";
import { navigate } from "../App";

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

  let isDown = false, startX = 0, startScroll = 0;

  const onDown = (e) => {
    isDown = true;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    startScroll = railRef.current.scrollLeft;
    railRef.current.style.cursor = "grabbing";
  };

  const onMove = (e) => {
    if (!isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const dx = x - startX;
    railRef.current.scrollLeft = startScroll - dx;
  };

  const onUp = () => {
    isDown = false;
    if (railRef.current) railRef.current.style.cursor = "grab";
  };

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    navigate(`/categoria/${category.id}`);
  };

  const c = {
    page: { padding: "32px 18px" },
    head: {
      maxWidth: 1280,
      margin: "0 auto 18px",
      display: "flex",
      alignItems: "baseline",
      gap: 18,
      justifyContent: "space-between",
    },
    h1: {
      margin: 0,
      fontFamily: "DM Sans, system-ui, sans-serif",
      fontWeight: 900,
      fontSize: "clamp(22px,3.5vw,40px)",
      letterSpacing: ".4px",
      color: "#2b1440",
    },
    link: {
      color: "#1a56ff",
      fontWeight: 700,
      textDecoration: "underline",
      whiteSpace: "nowrap",
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
      cursor: "grab",
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
      zIndex: 2,
    }),
    card: {
      scrollSnapAlign: "start",
      borderRadius: 22,
      background: "#fff",
      display: "grid",
      gridTemplateRows: "300px auto",
      boxShadow: "0 10px 30px rgba(0,0,0,.08)",
      transition: "transform .15s ease, box-shadow .15s ease",
      textDecoration: "none",
      color: "#1a1a1a",
      cursor: "pointer",
    },
    thumb: (i) => ({
      position: "relative",
      overflow: "hidden",
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      background: [
        "linear-gradient(135deg,#ffe5f3,#ffbdda)",
        "linear-gradient(135deg,#d2f1ff,#8edcff)",
        "linear-gradient(135deg,#e6ffdb,#96e99b)",
        "linear-gradient(135deg,#ffe9c7,#ffc38a)",
        "linear-gradient(135deg,#e9e1ff,#c0b2ff)",
      ][i % 5],
      padding: 0,
      aspectRatio: "4 / 5",
    }),
    img: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
    title: {
      padding: "14px 12px 18px",
      textAlign: "center",
      fontFamily: "DM Sans, system-ui, sans-serif",
      fontWeight: 800,
      fontSize: "18px",
      color: "#2b1440",
    },
    cardHover: {
      transform: "translateY(-3px)",
      boxShadow: "0 14px 38px rgba(0,0,0,.12)",
    },
    edge: {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: 36,
      background: "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0) 100%)",
      pointerEvents: "none",
    },
    edgeR: { right: 0, transform: "scaleX(-1)" },
    media: `
      @media (max-width: 768px) {
        .cat-page { padding: 24px 12px !important; }
        .cat-head { margin-bottom: 14px !important; gap: 12px !important; }
        .cat-h1 { fontSize: 24px !important; }
        .cat-rail { gridAutoColumns: minmax(180px, 1fr) !important; gap: 16px !important; padding: 6px 36px !important; }
        .cat-btn { width: 36px !important; height: 36px !important; }
        .cat-card { gridTemplateRows: 240px auto !important; borderRadius: 16px !important; }
        .cat-thumb { borderTopLeftRadius: 16px !important; borderTopRightRadius: 16px !important; }
        .cat-title { padding: 12px 10px 14px !important; fontSize: 16px !important; }
      }
      @media (max-width: 520px) {
        .cat-page { padding: 20px 10px !important; }
        .cat-rail { gridAutoColumns: minmax(150px, 1fr) !important; gap: 12px !important; padding: 6px 12px !important; }
        .cat-btn { display: none !important; }
        .cat-card { gridTemplateRows: 200px auto !important; }
        .cat-title { fontSize: 15px !important; }
      }
    `,
  };

  return (
    <>
      <style>{c.media}</style>
      <section style={c.page} className="cat-page">
        <header style={c.head} className="cat-head">
          <h2 style={c.h1} className="cat-h1">{title}</h2>
          <a href={viewAllHref} style={c.link}>{viewAllText}</a>
        </header>

        <div style={c.wrap}>
          <button
            style={c.btn(true)}
            className="cat-btn"
            onClick={() => scrollByCards(-1)}
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            style={c.btn(false)}
            className="cat-btn"
            onClick={() => scrollByCards(1)}
            aria-label="Siguiente"
          >
            ›
          </button>

          <div
            ref={railRef}
            style={{ ...c.rail, ...c.railWebkit }}
            className="cat-rail"
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseLeave={onUp}
            onMouseUp={onUp}
            onTouchStart={onDown}
            onTouchMove={onMove}
            onTouchEnd={onUp}
          >
            {items.map((it, i) => (
              <div
                key={it.id || i}
                data-card
                style={c.card}
                className="cat-card"
                onClick={(e) => handleCategoryClick(e, it)}
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, c.cardHover)
                }
                onMouseLeave={(e) =>
                  Object.assign(e.currentTarget.style, {
                    transform: "",
                    boxShadow: c.card.boxShadow,
                  })
                }
              >
                <div style={c.thumb(i)} className="cat-thumb">
                  <img
                    src={it.image_url || it.img}
                    alt={it.name || it.title}
                    style={c.img}
                  />
                </div>
                <div style={c.title} className="cat-title">{it.name || it.title}</div>
              </div>
            ))}
          </div>

          <div style={c.edge} />
          <div style={{ ...c.edge, ...c.edgeR }} />
        </div>
      </section>
    </>
  );
}