import React, { useState } from "react";
import "../styles/Navbar.css"
import logo from "../assets/logo.png";

export default function Navbar() {
  const [q, setQ] = useState("");

  const buscar = (e) => {
    e.preventDefault();
    alert("Buscar: " + q.trim());
  };

  return (
    <header className="nav">
      <div className="nav__topline" />

      <div className="nav__inner">
        {/* Logo */}
        <a className="nav__logo" href="/">
          <img src={logo} alt="Logo" />
        </a>

        {/* Buscador */}
        <form className="nav__search" onSubmit={buscar}>
          <input
            className="nav__search-input"
            type="text"
            placeholder="BUSCAR"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="nav__search-btn" type="submit" aria-label="Buscar">
            {/* Lupa */}
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
  );
}
