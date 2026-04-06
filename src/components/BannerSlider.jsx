// BannerSlider.jsx - ✅ RESPONSIVE
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function BannerSlider({
  interval = 3500,
  rounded = 16,
  pauseOnHover = true,
  fit = "cover", 
}) {
  const modules = import.meta.glob("/src/assets/banners/*.{png,jpg,jpeg,webp,gif}", { eager: true });

  const images = useMemo(() => {
    const list = Object.entries(modules).map(([path, mod]) => ({
      path,
      src: mod.default || mod,
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
      aspectRatio: "16 / 9",
      maxHeight: "65vh",
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
      objectFit: fit,
      objectPosition: "center",
      display: "block",
      background: fit === "contain" ? "#0000000d" : "transparent",
    },
    arrow: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 48,
      height: 48,
      borderRadius: 999,
      border: "none",
      background: "rgba(255,255,255,.3)",
      backdropFilter: "blur(8px)",
      color: "#fff",
      fontSize: 24,
      fontWeight: 900,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all .2s ease",
      zIndex: 2,
    },
    left: { left: 10 },
    right: { right: 10 },
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
    },
    media: `
      @media (max-width: 768px) {
        .banner-root { maxHeight: 50vh !important; borderRadius: 12px !important; }
        .banner-arrow { width: 36px !important; height: 36px !important; fontSize: 18px !important; }
        .banner-dots { bottom: 8px !important; gap: 6px !important; }
      }
      @media (max-width: 520px) {
        .banner-root { maxHeight: 40vh !important; borderRadius: 10px !important; }
        .banner-arrow { display: none !important; }
        .banner-dots { bottom: 6px !important; }
      }
    `,
  };

  if (!images.length) {
    return (
      <>
        <style>{st.media}</style>
        <div style={st.root} className="banner-root">
          <div style={st.empty}>Coloca imágenes en <code>src/assets/banners/</code></div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{st.media}</style>
      <div
        style={st.root}
        className="banner-root"
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

        {images.length > 1 && (
          <>
            <button style={{ ...st.arrow, ...st.left }} className="banner-arrow" onClick={() => go(false)} aria-label="Anterior">‹</button>
            <button style={{ ...st.arrow, ...st.right }} className="banner-arrow" onClick={() => go(true)} aria-label="Siguiente">›</button>
          </>
        )}

        {images.length > 1 && (
          <div style={st.dots} className="banner-dots">
            {images.map((_, i) => (
              <div key={i} style={st.dot(i === idx)} onClick={() => setIdx(i)} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}