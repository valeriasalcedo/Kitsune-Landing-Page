import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Slider que AUTOCARGA todas las imágenes dentro de src/assets/banners/*
 * Formatos: png, jpg, jpeg, webp, gif
 * Orden: por nombre de archivo (alfabéticamente)
 * Usa autoplay, flechas, dots y pausa al hover. Sin CSS externo (styles inline).
 */
export default function BannerSlider({
  interval = 3500,
  rounded = 16,
  pauseOnHover = true,
  fit = "cover", 
}) {
  // Vite: carga estática de la carpeta (debe ser ruta literal)
  const modules = import.meta.glob("/src/assets/banners/*.{png,jpg,jpeg,webp,gif}", { eager: true });

  // Extrae las URLs y ordénalas por nombre
  const images = useMemo(() => {
    const list = Object.entries(modules).map(([path, mod]) => ({
      path,
      src: mod.default || mod, // vite expone en default
      name: path.split("/").pop()?.toLowerCase() || path,
    }));
    list.sort((a, b) => a.name.localeCompare(b.name));
    return list.map((i) => i.src);
  }, [modules]);

  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);
  const hoveringRef = useRef(false);
  const touchRef = useRef({ x: 0 });

  useEffect(() => {
    if (!images.length) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (pauseOnHover && hoveringRef.current) return;
      setIdx((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [images, interval, pauseOnHover]);

  const go = (next) => {
    if (!images.length) return;
    setIdx((i) => (i + (next ? 1 : -1) + images.length) % images.length);
  };

  // Gestos táctiles
  const onTouchStart = (e) => { const t = e.touches?.[0]; if (t) touchRef.current.x = t.clientX; };
  const onTouchEnd = (e) => {
    const t = e.changedTouches?.[0]; if (!t) return;
    const dx = t.clientX - touchRef.current.x;
    if (Math.abs(dx) > 40) go(dx < 0);
  };

  const st = {
    root: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",   // mantiene 16:9
    maxHeight: "65vh",       // no ocupa más del 60% de la altura de la pantalla
    borderRadius: rounded,
    overflow: "hidden",
    userSelect: "none",
    background: "#1f1030",
  },
    track: {
      height: "100%",
      display: "flex",
      transform: `translateX(-${idx * 100}%)`,
      transition: "transform .5s ease",
    },
    slide: { minWidth: "100%", height: "100%" },
    img: {
      width: "100%",
      height: "100%",
      objectFit: fit,           // "cover" o "contain"
      objectPosition: "center",
      display: "block",
      background: fit === "contain" ? "#0000000d" : "transparent",
    },
    left: { left: 10 }, right: { right: 10 },
    dots: {
      position: "absolute", left: 0, right: 0, bottom: 10,
      display: "flex", gap: 8, justifyContent: "center", alignItems: "center",
    },
    dot: (active) => ({
      width: active ? 22 : 8, height: 8, borderRadius: 999,
      background: active ? "#ef5aa1" : "rgba(255,255,255,.6)",
      border: "1px solid rgba(0,0,0,.2)", cursor: "pointer",
      transition: "all .2s ease",
    }),
    empty: {
      color: "#fff", display: "grid", placeItems: "center", height: "100%",
      background: "linear-gradient(135deg,#5c2a7a,#392046)",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      letterSpacing: .5,
    }
  };

  if (!images.length) {
    return (
      <div style={st.root}>
        <div style={st.empty}>Coloca imágenes en <code>src/assets/banners/</code></div>
      </div>
    );
  }

  return (
    <div
      style={st.root}
      onMouseEnter={() => (hoveringRef.current = true)}
      onMouseLeave={() => (hoveringRef.current = false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div style={st.track}>
        {images.map((src, i) => (
          <div key={i} style={st.slide}>
            <img src={src} alt={`banner-${i}`} style={st.img} />
          </div>
        ))}
      </div>

      {/* Flechas */}
      {images.length > 1 && (
        <>
          <button style={{ ...st.arrow, ...st.left }} onClick={() => go(false)} aria-label="Anterior">‹</button>
          <button style={{ ...st.arrow, ...st.right }} onClick={() => go(true)} aria-label="Siguiente">›</button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div style={st.dots}>
          {images.map((_, i) => (
            <div key={i} style={st.dot(i === idx)} onClick={() => setIdx(i)} />
          ))}
        </div>
      )}
    </div>
  );
}
