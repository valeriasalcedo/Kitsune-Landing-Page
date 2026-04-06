// Footer.jsx - ✅ RESPONSIVE (ya tenía media queries, las mejoro)
import React from "react";

export default function Footer({
  brand = "Kitsune Store",
  instagram = "@KitsuneStore_Ven",
  instagramUrl = "https://www.instagram.com/KitsuneStore_Ven",
  bgFrom = "#b1322c",
  bgTo = "#8d2420",
}) {
  const s = {
    root: {
      background: `linear-gradient(180deg, ${bgFrom}, ${bgTo})`,
      color: "#fff",
      marginTop: 28,
      position: "relative",
    },
    topLine: {
      position: "absolute",
      left: 0, right: 0, top: 0, height: 1,
      background: "rgba(255,255,255,.18)",
    },
    wrap: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "14px 18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      flexWrap: "wrap",
    },
    igPill: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      color: "#fff",
      textDecoration: "none",
      fontWeight: 800,
      letterSpacing: ".3px",
      padding: "8px 14px",
      borderRadius: 999,
      background: "rgba(255,255,255,.10)",
      border: "1px solid rgba(255,255,255,.25)",
      boxShadow: "0 8px 20px rgba(0,0,0,.20)",
      backdropFilter: "blur(6px)",
      transform: "translateZ(0)",
      transition: "background .2s ease, transform .2s ease",
    },
    igPillHover: {
      background: "rgba(255,255,255,.16)",
      transform: "translateY(-1px)",
    },
    rights: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontWeight: 700,
      letterSpacing: ".25px",
      color: "rgba(255,255,255,.95)",
      textAlign: "right",
    },
    dot: {
      width: 6, height: 6, borderRadius: 999,
      background: "rgba(255,255,255,.7)",
      display: "inline-block",
    },
    media: `
      @media (max-width: 720px){
        .f-row { flex-direction: column !important; gap: 10px !important; }
        .f-rights { text-align: center !important; }
        .f-wrap { padding: 12px 14px !important; }
      }
      @media (max-width: 520px){
        .f-rights { flex-direction: column !important; gap: 4px !important; }
        .f-dot { display: none !important; }
        .f-ig-pill { font-size: 13px !important; padding: 7px 12px !important; }
      }
    `,
  };

  return (
    <>
      <style>{s.media}</style>
      <footer style={s.root}>
        <div style={s.topLine} />

        <div className="f-row f-wrap" style={s.wrap}>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            style={s.igPill}
            className="f-ig-pill"
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, s.igPillHover)}
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, {
                background: s.igPill.background,
                transform: s.igPill.transform,
              })
            }
          >
            <InstagramIcon />
            {instagram}
          </a>

          <div className="f-rights" style={s.rights}>
            <span style={{ opacity: 0.9 }}>© {new Date().getFullYear()}</span>
            <span style={s.dot} className="f-dot" />
            <span style={{ fontWeight: 900 }}>{brand}</span>
            <span style={{ opacity: 0.9 }}>· Todos los derechos reservados.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6-0.7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>
  );
}