// src/pages/CollectionPage.jsx - ✅ RESPONSIVE
import React, { useMemo, useState } from "react";
import { useCollection, useCollectionItems } from "../hooks/useCollections";
import { useAnimes } from "../hooks/useAnimes";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

const K = {
  purple: "#4e2b5b",
  pink: "#ef5aa1",
  red: "#ad2622",
  dark: "#2b1440",
};

function CollectionBanner({ title, bannerImg, subtitle }) {
  const s = {
    hero: {
      borderRadius: 18,
      overflow: "hidden",
      position: "relative",
      minHeight: 260,
      background: `url('${bannerImg}') center/cover no-repeat`,
      boxShadow: "0 16px 40px rgba(0,0,0,.12)",
    },
    overlay: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(90deg, rgba(43,20,64,.85) 0%, rgba(43,20,64,.45) 60%, transparent 90%)",
    },
    band: {
      position: "absolute",
      left: 0,
      top: "50%",
      width: "40%",
      height: 8,
      background: K.pink,
      transform: "translateY(-50%)",
      opacity: 0.7,
    },
    inner: { position: "relative", zIndex: 1, padding: "26px 22px" },
    chip: {
      background: K.red,
      color: "#fff",
      borderRadius: 999,
      padding: "6px 10px",
      fontWeight: 900,
      display: "inline-block",
      fontSize: 12,
    },
    h1: {
      color: "#fff",
      fontWeight: 900,
      fontSize: "clamp(28px,5vw,48px)",
      margin: "8px 0 6px",
      letterSpacing: ".4px",
    },
    sub: {
      color: "rgba(255,255,255,.92)",
      fontSize: 16,
      maxWidth: 500,
    },
  };

  return (
    <div style={s.hero} className="banner-hero">
      <div style={s.overlay} />
      <div style={s.band} />
      <div style={s.inner} className="banner-inner">
        <span style={s.chip}>COLECCIÓN</span>
        <h1 style={s.h1} className="banner-h1">{title}</h1>
        {!!subtitle && <p style={s.sub}>{subtitle}</p>}
      </div>
    </div>
  );
}

function Filters({
  selectedAnimes,
  setSelectedAnimes,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
  animes,
  counts,
}) {
  const [showAnimes, setShowAnimes] = useState(false);

  const s = {
    wrap: {
      marginTop: 14,
      padding: "18px 22px",
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 4px 12px rgba(0,0,0,.06)",
      display: "flex",
      flexDirection: "column",
      gap: 16,
    },
    row: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      flexWrap: "wrap",
    },
    section: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap",
    },
    label: {
      fontSize: 13,
      fontWeight: 900,
      color: "#6b7280",
      textTransform: "uppercase",
      letterSpacing: ".4px",
    },
    select: {
      borderRadius: 12,
      border: `2px solid ${K.purple}`,
      color: K.purple,
      padding: "8px 12px",
      fontWeight: 800,
      background: "#fff",
      fontSize: 13,
      cursor: "pointer",
    },
    priceInputs: {
      display: "flex",
      alignItems: "center",
      gap: 8,
    },
    priceInput: {
      width: 100,
      padding: "8px 12px",
      borderRadius: 8,
      border: "2px solid #e5e7eb",
      fontWeight: 700,
      fontSize: 14,
    },
    animeDropdown: { position: "relative" },
    animeBtn: {
      padding: "8px 16px",
      borderRadius: 12,
      border: `2px solid ${K.purple}`,
      background: selectedAnimes.length > 0 ? K.purple : "#fff",
      color: selectedAnimes.length > 0 ? "#fff" : K.purple,
      fontWeight: 800,
      cursor: "pointer",
      fontSize: 13,
      display: "flex",
      alignItems: "center",
      gap: 6,
    },
    animeMenu: {
      position: "absolute",
      top: "calc(100% + 6px)",
      left: 0,
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 8px 24px rgba(0,0,0,.15)",
      padding: 12,
      zIndex: 100,
      minWidth: 220,
      maxHeight: 280,
      overflowY: "auto",
    },
    animeItem: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 10px",
      borderRadius: 8,
      cursor: "pointer",
      transition: "background 0.2s ease",
    },
    checkbox: {
      width: 18,
      height: 18,
      borderRadius: 4,
      border: "2px solid #d1d5db",
      cursor: "pointer",
    },
    chip: (active) => ({
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "8px 12px",
      borderRadius: 999,
      border: "none",
      background: active ? K.purple : "rgba(78,43,91,.1)",
      color: active ? "#fff" : K.dark,
      fontWeight: 800,
      cursor: "pointer",
      fontSize: 13,
    }),
  };

  const toggleAnime = (animeId) => {
    setSelectedAnimes((prev) =>
      prev.includes(animeId) ? prev.filter((id) => id !== animeId) : [...prev, animeId]
    );
  };

  return (
    <div style={s.wrap} className="filters-wrap">
      <div style={s.row} className="filters-row">
        <div style={s.section} className="filters-section">
          <span style={s.label} className="filters-label">Animes:</span>

          <div style={s.animeDropdown} className="filters-dropdown">
            <button style={s.animeBtn} onClick={() => setShowAnimes(!showAnimes)}>
              {selectedAnimes.length > 0
                ? `${selectedAnimes.length} seleccionado(s)`
                : "Todos"}
              <span>▾</span>
            </button>

            {showAnimes && (
              <div style={s.animeMenu} className="filters-menu">
                <div
                  style={s.animeItem}
                  onClick={() => setSelectedAnimes([])}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                >
                  <input
                    type="checkbox"
                    checked={selectedAnimes.length === 0}
                    readOnly
                    style={s.checkbox}
                  />
                  <span style={{ fontWeight: 700 }}>Todos</span>
                </div>

                {animes.map((anime) => (
                  <div
                    key={anime.id}
                    style={s.animeItem}
                    onClick={() => toggleAnime(anime.id)}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAnimes.includes(anime.id)}
                      readOnly
                      style={s.checkbox}
                    />
                    <span>{anime.title || anime.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={s.section} className="filters-section">
          <span style={s.label} className="filters-label">Ordenar:</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={s.select}>
            <option value="relevance">Relevancia</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name-asc">Nombre: A → Z</option>
            <option value="name-desc">Nombre: Z → A</option>
          </select>
        </div>
      </div>

      <div style={s.row} className="filters-row">
        <div style={s.section} className="filters-section">
          <span style={s.label} className="filters-label">Precio:</span>
          <div style={s.priceInputs} className="price-inputs">
            <input
              type="number"
              placeholder="Mín"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              style={s.priceInput}
              className="price-input"
            />
            <span style={{ color: "#9ca3af", fontWeight: 700 }}>—</span>
            <input
              type="number"
              placeholder="Máx"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              style={s.priceInput}
              className="price-input"
            />
          </div>
        </div>

        <div style={s.section} className="filters-section">
          <button
            onClick={() => {
              setMinPrice("");
              setMaxPrice("");
              setSelectedAnimes([]);
              setSort("relevance");
            }}
            style={s.chip(false)}
          >
            🔄 Limpiar filtros
          </button>
        </div>
      </div>

      <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 600 }}>
        {counts.filtered} producto(s) encontrado(s)
      </div>
    </div>
  );
}

export default function CollectionPage({ collectionId: collectionIdProp }) {
  const collectionId =
    collectionIdProp ??
    window.location.pathname.replace("/coleccion/", "").split(/[/?#]/)[0];

  const { collection, loading: loadingCollection } = useCollection(collectionId);
  const { items: products, loading: loadingProducts } = useCollectionItems(collectionId);
  const { animes, loading: loadingAnimes } = useAnimes();

  const [selectedAnimes, setSelectedAnimes] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("relevance");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = useMemo(() => {
    let arr = products;

    if (selectedAnimes.length > 0) {
      arr = arr.filter((p) => p.animes?.some((a) => selectedAnimes.includes(a.id)));
    }

    const finalPrice = (p) => Number(p.final_price ?? p.price ?? 0);

    if (minPrice !== "") arr = arr.filter((p) => finalPrice(p) >= parseFloat(minPrice));
    if (maxPrice !== "") arr = arr.filter((p) => finalPrice(p) <= parseFloat(maxPrice));

    if (sort === "price-asc") arr = [...arr].sort((a, b) => finalPrice(a) - finalPrice(b));
    if (sort === "price-desc") arr = [...arr].sort((a, b) => finalPrice(b) - finalPrice(a));
    if (sort === "name-asc")
      arr = [...arr].sort((a, b) => (a.name || a.title).localeCompare(b.name || b.title));
    if (sort === "name-desc")
      arr = [...arr].sort((a, b) => (b.name || b.title).localeCompare(a.name || a.title));

    return arr;
  }, [products, selectedAnimes, minPrice, maxPrice, sort]);

  const counts = { total: products.length, filtered: filtered.length };

  const s = {
    page: { padding: "22px 18px", minHeight: "70vh" },
    wrap: { width: "min(1200px,96%)", margin: "0 auto" },
    grid: {
      marginTop: 14,
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 18,
    },
    loading: {
      padding: "48px 18px",
      textAlign: "center",
      color: "#999",
      fontSize: 18,
      fontWeight: 600,
    },
    media: `
      @media (max-width: 1100px){ 
        .cg { grid-template-columns: repeat(3,1fr) !important; } 
      }
      @media (max-width: 770px){  
        .cg { grid-template-columns: repeat(2,1fr) !important; }
        .filters-wrap { padding: 14px 16px !important; }
        .filters-row { 
          flex-direction: column !important; 
          align-items: stretch !important; 
          gap: 16px !important;
        }
        .filters-section { 
          width: 100% !important; 
          justify-content: flex-start !important;
        }
        .filters-label { width: 100% !important; }
        .filters-dropdown { position: static !important; width: 100% !important; }
        .filters-menu { 
          position: fixed !important; 
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: calc(100% - 40px) !important;
          max-width: 400px !important;
        }
      }
      @media (max-width: 520px){  
        .cg { grid-template-columns: 1fr !important; }
        .page-wrap { padding: 16px 12px !important; }
        .banner-hero { min-height: 200px !important; }
        .banner-inner { padding: 20px 18px !important; }
        .banner-h1 { font-size: 28px !important; }
        .filters-wrap { padding: 12px 14px !important; gap: 12px !important; }
        .price-inputs { 
          flex-direction: column !important; 
          width: 100% !important;
        }
        .price-input { width: 100% !important; }
      }
    `,
  };

  if (!collectionId) {
    return (
      <main style={s.page} className="page-wrap">
        <style>{s.media}</style>
        <div style={s.wrap}>
          <div style={s.loading}>ID de colección inválido</div>
        </div>
      </main>
    );
  }

  if (loadingCollection || loadingProducts) {
    return (
      <main style={s.page} className="page-wrap">
        <style>{s.media}</style>
        <div style={s.wrap}>
          <div style={s.loading}>Cargando colección...</div>
        </div>
      </main>
    );
  }

  if (!collection) {
    return (
      <main style={s.page} className="page-wrap">
        <style>{s.media}</style>
        <div style={s.wrap}>
          <div style={s.loading}>Colección no encontrada</div>
        </div>
      </main>
    );
  }

  return (
    <main style={s.page} className="page-wrap">
      <style>{s.media}</style>
      <div style={s.wrap}>
        <CollectionBanner
          title={collection.name || collection.title}
          bannerImg={collection.image_url || collection.img || "/imgs/hero-anime.jpg"}
          subtitle={collection.description}
        />

        {!loadingAnimes && (
          <Filters
            selectedAnimes={selectedAnimes}
            setSelectedAnimes={setSelectedAnimes}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sort={sort}
            setSort={setSort}
            animes={animes}
            counts={counts}
          />
        )}

        <section className="cg" style={s.grid}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onOpenModal={(prod) => setSelectedProduct(prod)} />
          ))}
        </section>

        {filtered.length === 0 && (
          <div style={s.loading}>😕 No se encontraron productos con estos filtros</div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </main>
  );
}