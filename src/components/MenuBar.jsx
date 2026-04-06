// src/components/MenuBar.jsx - ✅ DROPDOWNS FUNCIONAN EN MÓVIL
import React, { useEffect, useRef, useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { useCollections } from "../hooks/useCollections";
import { useAnimes } from "../hooks/useAnimes";
import "../styles/MenuBar.css";

export default function MenuBar() {
  const [openCats, setOpenCats] = useState(false);
  const [openCols, setOpenCols] = useState(false);
  const [openAnimes, setOpenAnimes] = useState(false);
  
  const catsRef = useRef(null);
  const colsRef = useRef(null);
  const animesRef = useRef(null);
  
  const catsDropdownRef = useRef(null);
  const colsDropdownRef = useRef(null);
  const animesDropdownRef = useRef(null);
  
  const { categories, loading: loadingCats } = useCategories();
  const { collections, loading: loadingCols } = useCollections();
  const { animes, loading: loadingAnimes } = useAnimes();

  // ✅ Posicionar dropdowns en móvil
  useEffect(() => {
    const isMobile = window.innerWidth <= 680;
    if (!isMobile) return;

    const positionDropdown = (buttonRef, dropdownRef) => {
      if (!buttonRef.current || !dropdownRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownTop = rect.bottom + 8; // 8px de separación
      
      dropdownRef.current.style.setProperty('--dropdown-top', `${dropdownTop}px`);
      dropdownRef.current.classList.add('menu__dropdown--positioned');
    };

    if (openCats) positionDropdown(catsRef, catsDropdownRef);
    if (openCols) positionDropdown(colsRef, colsDropdownRef);
    if (openAnimes) positionDropdown(animesRef, animesDropdownRef);
  }, [openCats, openCols, openAnimes]);

  // Cerrar al hacer click fuera o con ESC
  useEffect(() => {
    const onDocClick = (e) => {
      if (catsRef.current && !catsRef.current.contains(e.target)) setOpenCats(false);
      if (colsRef.current && !colsRef.current.contains(e.target)) setOpenCols(false);
      if (animesRef.current && !animesRef.current.contains(e.target)) setOpenAnimes(false);
    };
    
    const onEsc = (e) => { 
      if (e.key === "Escape") {
        setOpenCats(false);
        setOpenCols(false);
        setOpenAnimes(false);
      }
    };
    
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick); // ✅ soporte touch
    document.addEventListener("keydown", onEsc);
    
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const goto = (path) => (window.location.href = path);

  const scrollToContact = () => {
    const el = document.querySelector("#contacto");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else goto("/#contacto");
  };

  // ✅ Handler para toggle con preventDefault
  const handleToggle = (setter) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setter(v => !v);
  };

  return (
    <div className="menu">
      <nav className="menu__inner" aria-label="Menú secundario">
        {/* CATEGORÍAS */}
        <div
          ref={catsRef}
          className={`menu__item menu__item--has-children ${openCats ? "is-open" : ""}`}
        >
          <button
            className="menu__link"
            aria-haspopup="true"
            aria-expanded={openCats}
            onClick={handleToggle(setOpenCats)}
            type="button"
          >
            CATEGORÍAS <span className="menu__chev" aria-hidden>▾</span>
          </button>

          <ul ref={catsDropdownRef} className="menu__dropdown" role="menu">
            {loadingCats && (
              <li role="none">
                <span className="menu__dropdown-link" style={{ color: "#999" }}>
                  Cargando...
                </span>
              </li>
            )}
            
            {!loadingCats && categories.map((cat) => (
              <li key={cat.id} role="none">
                <a
                  role="menuitem"
                  className="menu__dropdown-link"
                  href={cat.href}
                  onClick={(e) => { 
                    e.preventDefault(); 
                    setOpenCats(false);
                    goto(cat.href); 
                  }}
                >
                  {cat.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COLECCIONES */}
        <div
          ref={colsRef}
          className={`menu__item menu__item--has-children ${openCols ? "is-open" : ""}`}
        >
          <button
            className="menu__link"
            aria-haspopup="true"
            aria-expanded={openCols}
            onClick={handleToggle(setOpenCols)}
            type="button"
          >
            COLECCIONES <span className="menu__chev" aria-hidden>▾</span>
          </button>

          <ul ref={colsDropdownRef} className="menu__dropdown" role="menu">
            {loadingCols && (
              <li role="none">
                <span className="menu__dropdown-link" style={{ color: "#999" }}>
                  Cargando...
                </span>
              </li>
            )}
            
            {!loadingCols && collections.length === 0 && (
              <li role="none">
                <span className="menu__dropdown-link" style={{ color: "#999" }}>
                  No hay colecciones
                </span>
              </li>
            )}
            
            {!loadingCols && collections.map((col) => (
              <li key={col.id} role="none">
                <a
                  role="menuitem"
                  className="menu__dropdown-link"
                  href={col.href}
                  onClick={(e) => { 
                    e.preventDefault(); 
                    setOpenCols(false);
                    goto(col.href); 
                  }}
                >
                  {col.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ANIMES */}
        <div
          ref={animesRef}
          className={`menu__item menu__item--has-children ${openAnimes ? "is-open" : ""}`}
        >
          <button
            className="menu__link"
            aria-haspopup="true"
            aria-expanded={openAnimes}
            onClick={handleToggle(setOpenAnimes)}
            type="button"
          >
            ANIMES <span className="menu__chev" aria-hidden>▾</span>
          </button>

          <ul ref={animesDropdownRef} className="menu__dropdown" role="menu">
            {loadingAnimes && (
              <li role="none">
                <span className="menu__dropdown-link" style={{ color: "#999" }}>
                  Cargando...
                </span>
              </li>
            )}
            
            {!loadingAnimes && animes.length === 0 && (
              <li role="none">
                <span className="menu__dropdown-link" style={{ color: "#999" }}>
                  No hay animes
                </span>
              </li>
            )}
            
            {!loadingAnimes && animes.map((anime) => (
              <li key={anime.id} role="none">
                <a
                  role="menuitem"
                  className="menu__dropdown-link"
                  href={anime.href}
                  onClick={(e) => { 
                    e.preventDefault(); 
                    setOpenAnimes(false);
                    goto(anime.href); 
                  }}
                >
                  {anime.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* NUEVOS */}
        <a 
          className="menu__item menu__link" 
          href="/nuevos" 
          onClick={(e) => { e.preventDefault(); goto("/nuevos"); }}
        >
          NUEVOS
        </a>

        {/* OFERTAS */}
        <a 
          className="menu__item menu__link" 
          href="/ofertas" 
          onClick={(e) => { e.preventDefault(); goto("/ofertas"); }}
        >
          OFERTAS
        </a>

        {/* QUIÉNES SOMOS */}
        <a 
          className="menu__item menu__link" 
          href="/quienes-somos" 
          onClick={(e) => { e.preventDefault(); goto("/quienes-somos"); }}
        >
          QUIÉNES SOMOS
        </a>
      </nav>
    </div>
  );
}