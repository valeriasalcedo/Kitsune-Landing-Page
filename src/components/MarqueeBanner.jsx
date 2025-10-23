import React, { useLayoutEffect, useRef, useState } from "react";

export default function MarqueeBanner({
  items = [
    "LA MEJOR TIENDA DE ANIME DE LA CIUDAD",
    "ENCONTRARÁS TODO LO QUE NECESITAS",
    "K-POP, ANIME Y KAWAII",
    "MANGA, PELUCHES, LLAVEROS Y MAS"
  ],
  speed = 80,        // px/seg (más grande = más rápido)
  height = 54,
  bg = "#c26dbc",
  fg = "#fff",
  bullet = "•",
  uppercase = true,
  weight = 800,
  fontSize = 20,
  gap = 24,          // espacio entre frases
  pauseOnHover = true,
}) {
  const wrapRef = useRef(null);
  const groupRef = useRef(null);
  const [w, setW] = useState(0);     // ancho del grupo (A)

  // medir cuando esté la fuente lista y en resizes
  useLayoutEffect(() => {
    const measure = () => {
      if (!groupRef.current) return;
      setW(Math.ceil(groupRef.current.scrollWidth));
    };
    if (document.fonts?.ready) document.fonts.ready.then(measure); else measure();
    const ro = new ResizeObserver(measure);
    groupRef.current && ro.observe(groupRef.current);
    return () => ro.disconnect();
  }, [items, fontSize, weight, uppercase, gap]);

  const [paused, setPaused] = useState(false);

  const st = {
    root: {
      position: "relative",
      width: "100%",
      height,
      background: bg,
      color: fg,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      userSelect: "none",
    },
    rail: {
      position: "absolute",
      left: 0, top: 0, height: "100%",
      display: "flex",
      willChange: "transform",
      transform: "translate3d(0,0,0)",
      animation: w ? `marq ${w / speed}s linear infinite` : "none",
      animationPlayState: paused ? "paused" : "running",
    },
    group: {
      display: "flex",
      alignItems: "center",
      whiteSpace: "nowrap",
      padding: 0,
      margin: 0,
      fontFamily:
        '"DM Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      fontWeight: weight,
      textTransform: uppercase ? "uppercase" : "none",
      fontSize,
      lineHeight: 1.05,
      letterSpacing: ".3px",
    },
    item: { marginRight: gap },
    bullet: { margin: "0 12px", opacity: .55 },
  };

  const keyframes = `
    @keyframes marq {
      from { transform: translate3d(0,0,0); }
      to   { transform: translate3d(-${w}px,0,0); }
    }
  `;

  return (
    <div
      ref={wrapRef}
      style={st.root}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <style>{keyframes}</style>

      {/* Rail con dos grupos: A y su clon B pegado detrás */}
      <div style={st.rail}>
        <div ref={groupRef} style={{ ...st.group, paddingRight: 0 }}>
          {items.map((t, i) => (
            <React.Fragment key={`a-${i}`}>
              <span style={st.item}>{t}</span>
              {i !== items.length - 1 && <span style={st.bullet}>{bullet}</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Clon B (no habrá hueco porque se coloca inmediato) */}
        <div aria-hidden style={{ ...st.group, paddingRight: 0 }}>
          {items.map((t, i) => (
            <React.Fragment key={`b-${i}`}>
              <span style={st.item}>{t}</span>
              {i !== items.length - 1 && <span style={st.bullet}>{bullet}</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
