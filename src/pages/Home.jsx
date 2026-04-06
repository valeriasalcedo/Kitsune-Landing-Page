// src/pages/Home.jsx - COMPLETO CON EVENTOS, ANIMES, COLECCIONES Y NOTICIAS
import React from "react";
import BannerSlider from "../components/BannerSlider";
import MarqueeBanner from "../components/MarqueeBanner";
import CategoryCarousel from "../components/CategoryCarousel";
import ProductCarousel from "../components/ProductCarousel";
import AnimeCarousel from "../components/AnimeCarousel";
import CollectionCarousel from "../components/CollectionCarousel";
import EventCarousel from "../components/EventCarousel";
import NewsCarousel from "../components/NewsCarousel";
import { useCategories } from "../hooks/useCategories";
import { useAnimes } from "../hooks/useAnimes";
import { useCollections } from "../hooks/useCollections";
import { useProducts, useOffers } from "../hooks/useProducts";
import { useNewsAndEvents } from "../hooks/useNewsEvents";

export default function Home() {
  // ✅ Fetch de datos del backend
  const { categories, loading: loadingCats } = useCategories();
  const { animes, loading: loadingAnimes } = useAnimes();
  const { collections, loading: loadingCollections } = useCollections();
  
  // Productos nuevos (últimos 8)
  const { products: nuevos, loading: loadingNew } = useProducts({ 
    limit: 8,
    offset: 0
  });
  
  // Productos en oferta
  const { products: ofertas, loading: loadingOffers } = useOffers();

  // Noticias y eventos
  const { events, newsItems, loading: loadingNews } = useNewsAndEvents({ limit: 20 });

  return (
    <>
      {/* Banner principal */}
      <div style={{ padding: 12 }}>
        <BannerSlider />
      </div>

      <MarqueeBanner />
      
      {/* ✅ EVENTOS - Después del banner */}
      {!loadingNews && events.length > 0 && (
        <EventCarousel title="Próximos Eventos" events={events} />
      )}

      {/* Categorías del backend */}
      {!loadingCats && categories.length > 0 && (
        <CategoryCarousel title="Compra por categoría" items={categories} />
      )}

      {/* ✅ ANIMES - Nuevo carrusel */}
      {!loadingAnimes && animes.length > 0 && (
        <AnimeCarousel title="Explora por Anime" items={animes} />
      )}

      {/* ✅ COLECCIONES - Nuevo carrusel */}
      {!loadingCollections && collections.length > 0 && (
        <CollectionCarousel title="Colecciones Especiales" items={collections} />
      )}

      {/* Productos Nuevos del backend */}
      {!loadingNew && nuevos.length > 0 && (
        <ProductCarousel 
          title="Nuevos" 
          viewAllText="Ver todos" 
          viewAllHref="/nuevos" 
          type="new" 
          items={nuevos} 
        />
      )}

      {/* Ofertas del backend */}
      {!loadingOffers && ofertas.length > 0 && (
        <ProductCarousel 
          title="Ofertas" 
          viewAllText="Ver más ofertas" 
          viewAllHref="/ofertas" 
          type="offer" 
          items={ofertas} 
        />
      )}

      {/* ✅ NOTICIAS - Al final */}
      {!loadingNews && newsItems.length > 0 && (
        <NewsCarousel title="Últimas Noticias" newsItems={newsItems} />
      )}
    </>
  );
}