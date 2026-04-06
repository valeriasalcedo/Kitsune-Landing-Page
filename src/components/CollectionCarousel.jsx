// src/components/AnimeCarousel.jsx - ✅ RESPONSIVE
import React, { useRef } from 'react';

const K = {
  purple: '#4e2b5b',
  pink: '#ef5aa1',
  dark: '#2b1440',
};

export default function AnimeCarousel({ title = 'Animes', items = [] }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleAnimeClick = (anime) => {
    window.location.href = `/coleccion/${anime.id}`;
  };

  const s = {
    section: {
      padding: '40px 20px',
      background: '#fff',
    },
    container: {
      maxWidth: 1200,
      margin: '0 auto',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    title: {
      fontSize: 'clamp(20px, 4vw, 28px)',
      fontWeight: 900,
      color: K.dark,
      margin: 0,
    },
    navButtons: {
      display: 'flex',
      gap: 8,
    },
    navBtn: {
      width: 40,
      height: 40,
      borderRadius: 999,
      border: `2px solid ${K.purple}`,
      background: '#fff',
      color: K.purple,
      fontSize: 18,
      fontWeight: 900,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
    },
    carouselWrapper: {
      position: 'relative',
    },
    carousel: {
      display: 'flex',
      gap: 20,
      overflowX: 'auto',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      scrollBehavior: 'smooth',
      padding: '4px 0',
    },
    card: {
      minWidth: 200,
      flexShrink: 0,
      borderRadius: 16,
      overflow: 'hidden',
      background: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      height: 260,
      overflow: 'hidden',
      background: '#faf6ff',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
    },
    badge: {
      position: 'absolute',
      top: 12,
      left: 12,
      background: K.purple,
      color: '#fff',
      padding: '6px 12px',
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 900,
      letterSpacing: '0.5px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
    name: {
      padding: 16,
      fontSize: 16,
      fontWeight: 900,
      color: K.dark,
      textAlign: 'center',
      lineHeight: 1.3,
    },
    media: `
      @media (max-width: 768px) {
        .anime-section { padding: 32px 16px !important; }
        .anime-title { font-size: 22px !important; }
        .anime-nav-btn { width: 36px !important; height: 36px !important; font-size: 16px !important; }
        .anime-carousel { gap: 16px !important; }
        .anime-card { minWidth: 160px !important; }
        .anime-image-container { height: 220px !important; }
        .anime-name { padding: 12px !important; font-size: 14px !important; }
      }
      @media (max-width: 520px) {
        .anime-section { padding: 24px 12px !important; }
        .anime-header { margin-bottom: 16px !important; }
        .anime-nav-buttons { gap: 6px !important; }
        .anime-card { minWidth: 140px !important; }
        .anime-image-container { height: 180px !important; }
      }
    `,
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <>
      <style>{s.media}</style>
      <div style={s.section} className="anime-section">
        <div style={s.container}>
          <div style={s.header} className="anime-header">
            <h2 style={s.title} className="anime-title">{title}</h2>
            <div style={s.navButtons} className="anime-nav-buttons">
              <button
                style={s.navBtn}
                className="anime-nav-btn"
                onClick={() => scroll('left')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = K.purple;
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = K.purple;
                }}
              >
                ‹
              </button>
              <button
                style={s.navBtn}
                className="anime-nav-btn"
                onClick={() => scroll('right')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = K.purple;
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = K.purple;
                }}
              >
                ›
              </button>
            </div>
          </div>

          <div style={s.carouselWrapper}>
            <div ref={scrollRef} style={s.carousel} className="anime-carousel">
              {items.map((anime) => (
                <div
                  key={anime.id}
                  style={s.card}
                  className="anime-card"
                  onClick={() => handleAnimeClick(anime)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = '';
                  }}
                >
                  <div style={s.imageContainer} className="anime-image-container">
                    <div style={s.badge}>ANIME</div>
                    <img
                      src={anime.image_url || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="260"%3E%3Crect fill="%23f3f4f6" width="200" height="260"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ESin Imagen%3C/text%3E%3C/svg%3E'}
                      alt={anime.name}
                      style={s.image}
                    />
                  </div>
                  <div style={s.name} className="anime-name">{anime.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}