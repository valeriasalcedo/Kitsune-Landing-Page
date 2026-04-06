// MarqueeBanner.jsx - ✅ RESPONSIVE + FIX WARNING
import React, { useLayoutEffect, useRef, useState } from "react";

export default function MarqueeBanner({
  items = [
    "LA MEJOR TIENDA DE ANIME DE LA CIUDAD",
    "ENCONTRARÁS TODO LO QUE NECESITAS",
    "K-POP, ANIME Y KAWAII",
    "MANGA, PELUCHES, LLAVEROS Y MAS"
  ],
  speed = 80,
  height = 54,
  bg = "#c26dbc",
  fg = "#fff",
  bullet = "•",
  uppercase = true,
  weight = 800,
  fontSize = 20,
  gap = 24,
  pauseOnHover = true,
}) {
  const wrapRef = useRef(null);
  const groupRef = useRef(null);
  const [w, setW] = useState(0);

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
      // ✅ FIX: Usar propiedades separadas en vez de shorthand
      animationName: w ? "marq" : "none",
      animationDuration: w ? `${w / speed}s` : "0s",
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
      animationPlayState: paused ? "paused" : "running",
    },
    group: {
      display: "flex",
      alignItems: "center",
      whiteSpace: "nowrap",
      padding: 0,
      margin: 0,
      fontFamily: '"DM Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      fontWeight: weight,
      textTransform: uppercase ? "uppercase" : "none",
      fontSize,
      lineHeight: 1.05,
      letterSpacing: ".3px",
    },
    item: { marginRight: gap },
    bullet: { margin: "0 12px", opacity: .55 },
    media: `
      @keyframes marq {
        from { transform: translate3d(0,0,0); }
        to   { transform: translate3d(-${w}px,0,0); }
      }
      @media (max-width: 768px) {
        .marquee-root { height: 44px !important; }
        .marquee-group { fontSize: 16px !important; }
        .marquee-item { marginRight: 20px !important; }
        .marquee-bullet { margin: 0 10px !important; }
      }
      @media (max-width: 520px) {
        .marquee-root { height: 38px !important; }
        .marquee-group { fontSize: 14px !important; }
        .marquee-item { marginRight: 16px !important; }
      }
    `,
  };

  return (
    <>
      <style>{st.media}</style>
      <div
        ref={wrapRef}
        style={st.root}
        className="marquee-root"
        onMouseEnter={() => pauseOnHover && setPaused(true)}
        onMouseLeave={() => pauseOnHover && setPaused(false)}
      >
        <div style={st.rail}>
          <div ref={groupRef} style={{ ...st.group, paddingRight: 0 }} className="marquee-group">
            {items.map((t, i) => (
              <React.Fragment key={`a-${i}`}>
                <span style={st.item} className="marquee-item">{t}</span>
                {i !== items.length - 1 && <span style={st.bullet} className="marquee-bullet">{bullet}</span>}
              </React.Fragment>
            ))}
          </div>

          <div aria-hidden style={{ ...st.group, paddingRight: 0 }} className="marquee-group">
            {items.map((t, i) => (
              <React.Fragment key={`b-${i}`}>
                <span style={st.item} className="marquee-item">{t}</span>
                {i !== items.length - 1 && <span style={st.bullet} className="marquee-bullet">{bullet}</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}