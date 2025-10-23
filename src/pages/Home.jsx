// src/pages/Home.jsx
import React from "react";
import BannerSlider from "../components/BannerSlider";
import MarqueeBanner from "../components/MarqueeBanner";
import CategoryCarousel from "../components/CategoryCarousel";
import ProductCarousel from "../components/ProductCarousel";

export default function Home() {
  // ⚠️ Usa imágenes desde /public/imgs/... (rutas absolutas)
    const cats = [
    { title: "Posters",  img:"../src/assets/poster.jpg",  href: "/categoria/posters" },
    { title: "Figuras",  img: "../src/assets/figura.jpg",  href: "/categoria/figuras" },
    { title: "Peluches", img: "../src/assets/peluche.jpg", href: "/categoria/peluches" },
    { title: "K-Pop",    img: "../src/assets/K-pop.jpg",     href: "/categoria/kpop" },
    { title: "Ropa",     img: "../src/assets/ropa.jpg",     href: "/categoria/ropa" },
    { title: "Cosplay",  img: "../src/assets/cosplay.jpg",  href: "/categoria/cosplay" },
  ];

  const nuevos = [
    { title: "Figura Kimetsu", img: "../src/assets/poster.jpg", price: 5, href: "/p/kimetsu" },
    { title: "Poster Studio Ghibli", img: "../src/assets/figura.jpg", price: 4, href: "/p/ghibli" },
    { title: "Gorra K-Pop", img: "../src/assets/peluche.jpg", price: 10, href: "/p/gorra" },
    { title: "Peluches Kawaii", img: "../src/assets/peluche.jpg", price: 20, href: "/p/peluche" },
  ];

  const ofertas = [
    { title: "Sudadera Anime", img: "../src/assets/peluche.jpg", price: 10, oldPrice: 20, href: "/p/sudadera" },
    { title: "Llavero Chibi", img: "../src/assets/peluche.jpg", price: 15, oldPrice: 40, href: "/p/llavero" },
    { title: "Set Mangas", img: "../src/assets/peluche.jpg", price: 5, oldPrice: 10, href: "/p/mangas" },
    { title: "Figura One Piece", img: "../src/assets/peluche.jpg", price: 3, oldPrice: 8, href: "/p/onepiece" },
  ];

  return (
    <>
      <div style={{ padding: 12 }}><BannerSlider /></div>
      <MarqueeBanner />
      <CategoryCarousel title="Compra por categoría" items={cats} />

      <ProductCarousel title="Nuevos"  viewAllText="Ver todos"       viewAllHref="/nuevos"  type="new"   items={nuevos} />
      <ProductCarousel title="Ofertas" viewAllText="Ver más ofertas" viewAllHref="/ofertas" type="offer" items={ofertas} />
    </>
  );
}
