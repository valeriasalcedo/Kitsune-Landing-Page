import React, { useMemo, useState } from "react";

/* ===== Paleta Kitsune ===== */
const K = {
  purple: "#4e2b5b",
  pink:   "#ef5aa1",
  red:    "#ad2622",
  dark:   "#2b1440",
};

/* ===== Card de producto (misma del Home) ===== */
export function ProductCard({ p }) {
  const hasOffer = typeof p.oldPrice === "number" && p.oldPrice > p.price;

  const s = {
    card: {
      borderRadius: 18,
      background: "#fff",
      boxShadow: "0 10px 26px rgba(0,0,0,.08)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transition: "transform .15s ease, box-shadow .15s ease",
      textDecoration: "none",
      color: K.dark,
    },
    thumb: {
      position: "relative",
      width: "100%",
      height: 240,
      overflow: "hidden",
      background: "#faf6ff",
    },
    img: {
      position: "absolute", inset: 0,
      width: "100%", height: "100%", objectFit: "cover",
      display: "block",
    },
    badge: (kind) => ({
      position: "absolute", top: 10, left: 10,
      background: kind === "offer" ? K.pink : K.purple,
      color: "#fff", padding: "6px 10px",
      borderRadius: 999, fontWeight: 900, letterSpacing: ".3px",
      boxShadow: "0 8px 22px rgba(0,0,0,.18)",
    }),
    body: { padding: 12, background: "#fff" },
    title: { fontWeight: 900, lineHeight: 1.25, minHeight: 44 },
    priceRow: { display: "flex", alignItems: "center", gap: 8, marginTop: 6 },
    price: { color: K.purple, fontWeight: 900, fontSize: 18 },
    old: { textDecoration: "line-through", color: "#8f7f97", fontWeight: 700, fontSize: 14 },
  };

  return (
    <a
      href={p.href || "#"}
      style={s.card}
      onMouseEnter={(e)=>{ e.currentTarget.style.transform="translateY(-3px)"; }}
      onMouseLeave={(e)=>{ e.currentTarget.style.transform=""; }}
    >
      <div style={s.thumb}>
        {(p.badge === "new" || hasOffer) && (
          <div style={s.badge(hasOffer ? "offer" : "new")}>
            {hasOffer ? "OFERTA" : "NUEVO"}
          </div>
        )}
        <img src={p.img} alt={p.title} style={s.img} />
      </div>
      <div style={s.body}>
        <div style={s.title}>{p.title}</div>
        <div style={s.priceRow}>
          <span style={s.price}>${p.price.toFixed(2)}</span>
          {hasOffer && <span style={s.old}>${p.oldPrice.toFixed(2)}</span>}
        </div>
      </div>
    </a>
  );
}

/* ===== Banner estilo Home ===== */
function CategoryBanner({ title, bannerImg, subtitle }) {
  const s = {
    hero: {
      borderRadius: 18,
      overflow: "hidden",
      position: "relative",
      minHeight: 260,
      background: `url('${bannerImg}') center/cover no-repeat`,
      boxShadow: "0 16px 40px rgba(0,0,0,.12)",
    },
   
    
    inner: { position: "relative", zIndex: 1, padding: "26px 22px" },
    chip: { background: K.red, color: "#fff", borderRadius: 999, padding: "6px 10px", fontWeight: 900 },
  };
  return (
    <div style={s.hero}>
      <div style={s.overlay} />
      <div style={s.band} />
      <div style={s.inner}>
        <span style={s.chip}>Categoría</span>
        <h1 style={s.h1}>{title}</h1>
        {!!subtitle && <p style={s.sub}>{subtitle}</p>}
      </div>
    </div>
  );
}

/* ===== Filtros + Orden ===== */
function Controls({ filter, setFilter, sort, setSort, counts }) {
  const s = {
    wrap: {
      marginTop: 14,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 10, flexWrap: "wrap",
    },
    chips: { display: "flex", gap: 8, flexWrap: "wrap" },
    chip: (active, color) => ({
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "8px 12px", borderRadius: 999, border: "none",
      background: active ? color : "rgba(78,43,91,.1)",
      color: active ? "#fff" : K.dark,
      fontWeight: 800, cursor: "pointer",
    }),
    select: {
      borderRadius: 12, border: `2px solid ${K.purple}`, color: K.purple,
      padding: "8px 12px", fontWeight: 800, background: "#fff",
    }
  };

  return (
    <div style={s.wrap}>
      <div style={s.chips}>
        <button style={s.chip(filter==="all", K.purple)} onClick={()=>setFilter("all")}>Todo ({counts.all})</button>
        <button style={s.chip(filter==="new", K.purple)} onClick={()=>setFilter("new")}>Nuevos ({counts.new})</button>
        <button style={s.chip(filter==="offer", K.pink)} onClick={()=>setFilter("offer")}>Ofertas ({counts.offer})</button>
        <button style={s.chip(filter==="instock", K.red)} onClick={()=>setFilter("instock")}>En stock</button>
      </div>

      <select value={sort} onChange={(e)=>setSort(e.target.value)} style={s.select}>
        <option value="relevance">Ordenar: Relevancia</option>
        <option value="price-asc">Precio: menor a mayor</option>
        <option value="price-desc">Precio: mayor a menor</option>
        <option value="name-asc">Nombre: A → Z</option>
        <option value="name-desc">Nombre: Z → A</option>
      </select>
    </div>
  );
}

/* ===== Página de Categoría (REUTILIZABLE) =====
   Props:
   - title: string (nombre de la categoría)
   - bannerImg: string (imagen del banner)
   - subtitle: string (texto bajo el título)
   - products: array de productos (mismo formato del Home)
================================================ */
export default function CategoryPage({ title, bannerImg, subtitle, products = [] }) {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("relevance");

  const counts = useMemo(() => ({
    all: products.length,
    new: products.filter(p => p.badge === "new").length,
    offer: products.filter(p => p.oldPrice && p.oldPrice > p.price).length,
  }), [products]);

  const filtered = useMemo(() => {
    let arr = products;
    if (filter === "new")   arr = arr.filter(p => p.badge === "new");
    if (filter === "offer") arr = arr.filter(p => p.oldPrice && p.oldPrice > p.price);
    if (filter === "instock") arr = arr.filter(p => p.inStock !== false);
    // ordenar
    if (sort === "price-asc")  arr = [...arr].sort((a,b)=>a.price-b.price);
    if (sort === "price-desc") arr = [...arr].sort((a,b)=>b.price-a.price);
    if (sort === "name-asc")   arr = [...arr].sort((a,b)=>String(a.title).localeCompare(String(b.title)));
    if (sort === "name-desc")  arr = [...arr].sort((a,b)=>String(b.title).localeCompare(String(a.title)));
    return arr;
  }, [products, filter, sort]);

  const s = {
    page: { padding: "22px 18px" },
    wrap: { width: "min(1200px,96%)", margin: "0 auto" },
    grid: {
      marginTop: 14,
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 18,
    },
    media: `
      @media (max-width: 1100px){ .cg { grid-template-columns: repeat(3,1fr); } }
      @media (max-width: 770px){  .cg { grid-template-columns: repeat(2,1fr); } }
      @media (max-width: 520px){  .cg { grid-template-columns: 1fr; } }
    `,
  };

  return (
    <main style={s.page}>
      <style>{s.media}</style>
      <div style={s.wrap}>
        <CategoryBanner title={title} bannerImg={bannerImg} subtitle={subtitle} />

        <Controls
          filter={filter} setFilter={setFilter}
          sort={sort} setSort={setSort}
          counts={counts}
        />

        <section className="cg" style={s.grid}>
          {filtered.map((p, i) => (
            <ProductCard key={p.id || p.title + i} p={p} />
          ))}
        </section>
      </div>
    </main>
  );
}
