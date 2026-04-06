// Navbar.jsx - ✅ RESPONSIVE
import React, { useState } from "react";
import "../styles/Navbar.css"
import logo from "../assets/logo.png";

export default function Navbar() {
  const [q, setQ] = useState("");

  const buscar = (e) => {
    e.preventDefault();
    alert("Buscar: " + q.trim());
  };

  const s = {
    media: `
      @media (max-width: 768px) {
        .nav__inner {
          padding: 10px 14px !important;
          gap: 12px !important;
        }
        .nav__logo img {
          height: 50px !important;
        }
        .nav__search {
          flex: 1 !important;
          min-width: 0 !important;
        }
        .nav__search-input {
          fontSize: 13px !important;
          padding: 10px 14px !important;
        }
        .nav__search-btn {
          width: 38px !important;
          height: 38px !important;
        }
        .nav__search-btn svg {
          width: 16px !important;
          height: 16px !important;
        }
      }
      @media (max-width: 520px) {
        .nav__inner {
          padding: 8px 10px !important;
        }
        .nav__logo img {
          height: 42px !important;
        }
        .nav__search-input {
          fontSize: 12px !important;
          padding: 9px 12px !important;
        }
        .nav__search-btn {
          width: 36px !important;
          height: 36px !important;
        }
      }
    `,
  };

  return (
    <>
      <style>{s.media}</style>
      <header className="nav">
        <div className="nav__topline" />

        <div className="nav__inner">
          <a className="nav__logo" href="/">
            <img src={logo} alt="Logo" />
          </a>

          <form className="nav__search" onSubmit={buscar}>
            <input
              className="nav__search-input"
              type="text"
              placeholder="BUSCAR"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button className="nav__search-btn" type="submit" aria-label="Buscar">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  d="M21 21l-4.3-4.3m2.1-5.3a7.4 7.4 0 11-14.8 0 7.4 7.4 0 0114.8 0z"
                  fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </header>
    </>
  );
}