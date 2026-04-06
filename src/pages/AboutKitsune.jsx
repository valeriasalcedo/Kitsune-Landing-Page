import React from "react";

export default function AboutKitsune() {
  const color = {
    purple: "#4e2b5b",
    pink:   "#ef5aa1",
    red:    "#ad2622",
    dark:   "#2b1440",
  };

  const s = {
    page: { background: "#fff", color: color.dark },
    hero: {
      position: "relative",
      minHeight: "72vh",
      display: "grid",
      gridTemplateColumns: "1.1fr 0.9fr",
      alignItems: "stretch",
      overflow: "hidden",
    },
    heroBg: {
      position: "absolute", inset: 0,
      background: "url('/imgs/hero-anime.jpg') center/cover no-repeat",
      filter: "brightness(.95) saturate(1.05)",
      transform: "scale(1.02)",
    },
    heroOverlay: {
      position: "absolute", inset: 0,
      background: "linear-gradient(90deg, rgba(255,255,255,.92) 0%, rgba(255,255,255,.6) 45%, rgba(255,255,255,0) 60%)",
    },
    heroShape: {
      position: "absolute", right: "-8%", top: "-10%", bottom: "-10%",
      width: "55%",
      background: `linear-gradient(180deg, ${color.pink}, ${color.purple})`,
      opacity: .85,
      clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%)",
    },
    heroInner: {
      position: "relative", zIndex: 2, display: "grid",
      gridTemplateColumns: "1.1fr 0.9fr", width: "min(1200px,96%)",
      margin: "0 auto", gap: 28, padding: "48px 0",
    },
    heroTitleWrap: { display: "grid", alignContent: "center", gap: 8 },
    chip: {
      display: "inline-block", padding: "6px 10px",
      background: color.red, color: "#fff", borderRadius: 999,
      fontWeight: 900, letterSpacing: ".3px", width: "fit-content",
    },
    h1: {
      fontFamily: "DM Sans, system-ui, sans-serif",
      fontSize: "clamp(36px,7vw,68px)", fontWeight: 900,
      color: color.dark, lineHeight: 1.02, margin: "6px 0 10px",
    },
    h1Accent: { color: color.purple },
    subtitle: {
      fontSize: "clamp(16px,2.2vw,20px)",
      color: "#3e2c52", maxWidth: 680, lineHeight: 1.4,
    },
    ctas: { display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" },
    ctaPrimary: {
      background: color.purple, color: "#fff", border: "none",
      padding: "12px 18px", borderRadius: 14, fontWeight: 800,
      boxShadow: "0 10px 24px rgba(78,43,91,.25)", cursor: "pointer",
    },
    ctaGhost: {
      background: "transparent", color: color.purple, border: `2px solid ${color.purple}`,
      padding: "10px 16px", borderRadius: 14, fontWeight: 800, cursor: "pointer",
    },
    heroFigureWrap: { position: "relative", display: "grid", placeItems: "end center" },
    heroFigure: {
      width: "min(440px, 80%)",
      aspectRatio: "3/4",
      background: `url('/imgs/kitsune-mascot.png') center/contain no-repeat`,
      filter: "drop-shadow(0 18px 40px rgba(0,0,0,.25))",
    },
    section: { width: "min(1200px,96%)", margin: "40px auto" },
    grid2: {
      display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 28,
    },
    lead: {
      fontSize: 18, lineHeight: 1.6, color: "#3e2c52",
    },
    badgeRow: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 },
    badge: (bg) => ({
      background: bg, color: "#fff", borderRadius: 999,
      padding: "6px 12px", fontWeight: 800, letterSpacing: ".3px",
      boxShadow: "0 8px 22px rgba(0,0,0,.15)",
    }),
    cardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 18,
    },
    card: {
      background: "#fff", borderRadius: 16,
      padding: 16, boxShadow: "0 10px 28px rgba(0,0,0,.08)",
      border: "1px solid rgba(78,43,91,.08)",
    },
    cardTitle: { fontWeight: 900, color: color.purple, marginBottom: 6 },
    cardText: { color: "#5b4a6b", fontSize: 15, lineHeight: 1.5 },
    stats: {
      marginTop: 24,
      display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14,
    },
    stat: {
      background: `linear-gradient(180deg, ${color.purple} 0%, ${color.pink} 100%)`,
      color: "#fff", borderRadius: 14, padding: 16,
      boxShadow: "0 10px 30px rgba(239,90,161,.25)",
      textAlign: "center",
    },
    statNum: { fontWeight: 900, fontSize: 28, lineHeight: 1, marginBottom: 6 },
    statLabel: { letterSpacing: ".3px", opacity: .95 },
    strip: {
      margin: "48px auto", width: "min(1200px,96%)",
      background: `linear-gradient(90deg, ${color.red}, ${color.pink})`,
      color: "#fff", borderRadius: 18,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "18px 20px", gap: 12, flexWrap: "wrap",
      boxShadow: "0 14px 40px rgba(173,38,34,.25)",
    },
    stripLeft: { fontWeight: 900, letterSpacing: ".4px" },
    igBtn: {
      display: "inline-flex", alignItems: "center", gap: 10,
      padding: "10px 14px", background: "rgba(255,255,255,.14)",
      borderRadius: 999, color: "#fff", textDecoration: "none",
      fontWeight: 800, border: "1px solid rgba(255,255,255,.35)",
      boxShadow: "0 8px 22px rgba(0,0,0,.25)",
    },
    media: `
      @media (max-width: 980px){
        .hero-grid { grid-template-columns: 1fr !important; min-height: 60vh !important; }
        .hero-inner { grid-template-columns: 1fr !important; padding: 32px 0 !important; }
        .hero-shape { width: 70% !important; right: -20% !important; }
        .grid2 { grid-template-columns: 1fr !important; }
        .stats { grid-template-columns: repeat(2,1fr) !important; }
        .cards { grid-template-columns: 1fr 1fr !important; }
        .hero-figure-wrap { display: none !important; }
      }
      @media (max-width: 640px){
        .cards { grid-template-columns: 1fr !important; }
        .stats { grid-template-columns: 1fr 1fr !important; }
        .hero-grid { min-height: 50vh !important; }
        .hero-inner { padding: 24px 0 !important; }
        .hero-overlay { background: linear-gradient(90deg, rgba(255,255,255,.95) 0%, rgba(255,255,255,.85) 70%, rgba(255,255,255,.7) 100%) !important; }
        .strip { flex-direction: column !important; text-align: center !important; }
        .ctas { justify-content: center !important; }
      }
      @media (max-width: 480px){ .stats { grid-template-columns: 1fr !important; } }
    `,
  };

  return (
    <main style={s.page} id="quienes-somos">
      <style>{s.media}</style>
      <section style={s.hero} className="hero-grid">
        <div style={s.heroBg} />
        <div style={s.heroOverlay} className="hero-overlay" />
        <div style={s.heroShape} className="hero-shape" />
        <div style={s.heroInner} className="hero-inner">
          <div style={s.heroTitleWrap}>
            <span style={s.chip}>Desde 2023</span>
            <h1 style={s.h1}>
              Somos <span style={s.h1Accent}>Kitsune Store</span><br />
              la tienda de anime más grande de la ciudad
            </h1>
            <p style={s.subtitle}>
              Nacimos como un proyecto de fans para fans. Hoy somos la
              <b> tienda online de anime más grande de la ciudad</b>, con envíos
              a todo el país y presencia activa en múltiples bazares y eventos
              locales cada mes.
            </p>
            <div style={s.ctas} className="ctas">
              <a href="/catalogo"><button style={s.ctaPrimary}>Ver Catálogo</button></a>
              <a href="/#contacto"><button style={s.ctaGhost}>Contáctanos</button></a>
            </div>
          </div>
          <div style={s.heroFigureWrap} className="hero-figure-wrap">
            <div style={s.heroFigure} />
          </div>
        </div>
      </section>
      <section style={s.section}>
        <div style={s.grid2} className="grid2">
          <div>
            <h3 style={{ ...s.cardTitle, fontSize: 22 }}>¿Qué es Kitsune Store?</h3>
            <p style={s.lead}>
              Somos una <b>tienda especializada en cultura otaku</b>. Trabajamos con
              proveedores oficiales y talleres locales para ofrecer
              figuras, peluches, K-Pop, ropa, accesorios, papelería, model kits y mucho más.
            </p>
            <div style={s.badgeRow}>
              <span style={s.badge(color.purple)}>Calidad garantizada</span>
              <span style={s.badge(color.pink)}>Atención 1 a 1</span>
              <span style={s.badge(color.red)}>Envíos seguros</span>
            </div>
          </div>
          <div className="cards" style={s.cardGrid}>
            <div style={s.card}>
              <div style={s.cardTitle}>Misión</div>
              <div style={s.cardText}>
                Llevar la magia del anime y el K-Pop a cada fan, con una experiencia
                de compra honesta, rápida y divertida.
              </div>
            </div>
            <div style={s.card}>
              <div style={s.cardTitle}>Visión</div>
              <div style={s.cardText}>
                Ser la comunidad otaku más querida de la ciudad, conectando tiendas,
                artistas y coleccionistas.
              </div>
            </div>
            <div style={s.card}>
              <div style={s.cardTitle}>Valores</div>
              <div style={s.cardText}>
                Pasión, confianza, cercanía y amor por el detalle en cada producto.
              </div>
            </div>
          </div>
        </div>
        <div className="stats" style={s.stats}>
          <div style={s.stat}>
            <div style={s.statNum}>+3,000</div>
            <div style={s.statLabel}>Productos entregados</div>
          </div>
          <div style={s.stat}>
            <div style={s.statNum}>+25</div>
            <div style={s.statLabel}>Bazares al año</div>
          </div>
          <div style={s.stat}>
            <div style={s.statNum}>24/48h</div>
            <div style={s.statLabel}>Despacho rápido local</div>
          </div>
          <div style={s.stat}>
            <div style={s.statNum}>5★</div>
            <div style={s.statLabel}>Clientes felices</div>
          </div>
        </div>
      </section>
      <section style={{ ...s.section, marginTop: 24 }}>
        <h3 style={{ ...s.cardTitle, fontSize: 22, marginBottom: 10 }}>
          Participamos activamente en bazares
        </h3>
        <p style={s.lead}>
          Nos encanta conocerte en persona. Puedes encontrarnos en <b>múltiples bazares de la ciudad</b>:
          Expo Geek, Matsuri Local, Otaku Weekend y eventos universitarios. Publicamos agenda mensual en Instagram.
        </p>
      </section>
      <section style={s.strip} className="strip">
        <div style={s.stripLeft}>¿Quieres saber dónde estaremos este fin de semana?</div>
        <a
          href="https://www.instagram.com/KitsuneStore_Ven"
          target="_blank" rel="noreferrer"
          style={s.igBtn}
        >
          <InstagramIcon /> @KitsuneStore_Ven
        </a>
      </section>
    </main>
  );
}

function InstagramIcon(){
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6-.7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>
  );
}