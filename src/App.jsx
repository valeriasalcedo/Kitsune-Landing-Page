// src/App.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AboutKitsune from "./pages/AboutKitsune";
import CategoryPage from "./pages/CategoryPage"; // ← el componente de categoría con banner+filtro+grid

// mini router
function usePathname() {
  const [path, setPath] = useState(window.location.pathname + window.location.hash);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname + window.location.hash);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return path;
}
export function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

// demo de data por categoría (pon tu backend/estado real)
const DATA = {
  posters: {
    bannerImg: "../src/assets/kitsuneposters.png",
    products: [
      { title: "Poster Spirited Away", img: "/imgs/poster.jpg",  price: 5, badge: "new" },
      { title: "Poster Demon Slayer",  img: "/imgs/poster2.jpg", price: 4, oldPrice: 7 },
    ],
  },
  figuras: {
    bannerImg: "../src/assets/kisunefigura.png",
    products: [
      { title: "Figura One Piece", img: "/imgs/figura.jpg",  price: 24, badge: "new" },
      { title: "Figura Naruto",    img: "/imgs/figura2.jpg", price: 20, oldPrice: 28 },
    ],
  },
  peluches: {
    title: "Peluches",
    bannerImg: "/imgs/banners/peluches-hero.jpg",
    subtitle: "Suaves, adorables y perfectos para regalar.",
    products: [
      { title: "Peluche Totoro", img: "/imgs/peluche.jpg",  price: 12 },
      { title: "Peluche Kawaii", img: "/imgs/peluche2.jpg", price: 10, oldPrice: 14 },
    ],
  },
  // ...el resto de categorías
};

export default function App() {
  const path = usePathname();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [path]);

  // contenido central según ruta
  let content = <Home />;

  if (path.startsWith("/quienes-somos")) {
    content = <AboutKitsune />;
  } else if (path.startsWith("/categoria/")) {
    const slug = path.replace("/categoria/", "").split(/[?#]/)[0];
    const cfg = DATA[slug] || { title: slug, bannerImg: "/imgs/hero-anime.jpg", products: [] };
    content = (
      <CategoryPage
        title={cfg.title}
        bannerImg={cfg.bannerImg}
        subtitle={cfg.subtitle}
        products={cfg.products}
      />
    );
  }

  return (
    <>
      <Navbar />
      <MenuBar />
      {content}
      <Footer
        brand="Kitsune Store"
        instagram="@KitsuneStore_Ven"
        instagramUrl="https://www.instagram.com/KitsuneStore_Ven"
      />
    </>
  );
}
