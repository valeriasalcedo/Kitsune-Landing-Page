import React, { useEffect, useRef, useState } from "react";
import "../styles/MenuBar.css";

const DEFAULT_CATEGORIES = [
  "Posters","Figuras","Peluches","Chapas","Billeteras","Ropa","K-Pop",
  "Cosplay","Lamparas","Bisuteria","Ofertas","Llaveros","Papeleria","Otros"
];

export default function MenuBar({ categories = DEFAULT_CATEGORIES }) {
  const [open, setOpen] = useState(false);
  const catsRef = useRef(null);

  // Cerrar al hacer click fuera o con ESC
  useEffect(() => {
    const onDocClick = (e) => {
      if (!catsRef.current) return;
      if (!catsRef.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const goto = (path) => (window.location.href = path);

  const scrollToContact = () => {
    const el = document.querySelector("#contacto");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else goto("/#contacto");
  };

  return (
    <div className="menu">
      <nav className="menu__inner" aria-label="Menú secundario">
        {/* CATEGORÍAS */}
        <div
          ref={catsRef}
          className={`menu__item menu__item--has-children ${open ? "is-open" : ""}`}
        >
          <button
            className="menu__link"
            aria-haspopup="true"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}   // ← click para fijar
          >
            CATEGORÍAS <span className="menu__chev" aria-hidden>▾</span>
          </button>

          <ul className="menu__dropdown" role="menu">
            {categories.map((cat) => (
              <li key={cat} role="none">
                <a
                  role="menuitem"
                  className="menu__dropdown-link"
                  href={`/categoria/${slugify(cat)}`}
                  onClick={(e) => { e.preventDefault(); goto(`/categoria/${slugify(cat)}`); }}
                >
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <a className="menu__item menu__link" href="/nuevos"  onClick={(e)=>{e.preventDefault();goto("/nuevos");}}>NUEVOS</a>
        <a className="menu__item menu__link" href="/ofertas" onClick={(e)=>{e.preventDefault();goto("/ofertas");}}>OFERTAS</a>
        <a className="menu__item menu__link" href="/AboutKitsune" onClick={(e)=>{e.preventDefault();goto("/quienes-somos");}}>QUIÉNES SOMOS</a>
        <button className="menu__item menu__link" href="#Footer" onClick={scrollToContact}>CONTÁCTANOS</button>
      </nav>
    </div>
  );
}

function slugify(str) {
  return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
}
