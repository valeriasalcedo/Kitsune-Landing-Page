// src/components/NewsCarousel.jsx - ✅ RESPONSIVE
import React, { useRef, useState } from 'react';
import NewsModal from './NewsModal';

const K = {
  purple: '#4e2b5b',
  pink: '#ef5aa1',
  dark: '#2b1440',
};

export default function NewsCarousel({ title = 'Últimas Noticias', newsItems = [] }) {
  const scrollRef = useRef(null);
  const [selectedNews, setSelectedNews] = useState(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const s = {
    section: {
      padding: '40px 20px',
      background: '#f9fafb',
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
      minWidth: 340,
      flexShrink: 0,
      borderRadius: 18,
      overflow: 'hidden',
      background: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      height: 180,
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
      right: 12,
      background: K.purple,
      color: '#fff',
      padding: '6px 12px',
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 900,
      letterSpacing: '0.5px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
    content: {
      padding: 20,
    },
    date: {
      fontSize: 12,
      fontWeight: 700,
      color: '#9ca3af',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: 8,
    },
    newsTitle: {
      fontSize: 18,
      fontWeight: 900,
      color: K.dark,
      marginBottom: 8,
      lineHeight: 1.3,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      minHeight: 46,
    },
    body: {
      fontSize: 13,
      color: '#6b7280',
      lineHeight: 1.5,
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    media: `
      .carousel::-webkit-scrollbar {
        display: none;
      }
      @media (max-width: 768px) {
        .news-section { padding: 32px 16px !important; }
        .news-nav-btn { width: 36px !important; height: 36px !important; font-size: 16px !important; }
        .news-carousel { gap: 16px !important; }
        .news-card { minWidth: 280px !important; }
        .news-image-container { height: 150px !important; }
        .news-content { padding: 16px !important; }
        .news-title-text { fontSize: 16px !important; minHeight: 40px !important; }
      }
      @media (max-width: 520px) {
        .news-section { padding: 24px 12px !important; }
        .news-header { marginBottom: 16px !important; }
        .news-nav-buttons { gap: 6px !important; }
        .news-card { minWidth: 240px !important; }
        .news-content { padding: 14px !important; }
      }
    `,
  };

  if (!newsItems || newsItems.length === 0) {
    return null;
  }

  return (
    <>
      <style>{s.media}</style>
      <div style={s.section} className="news-section">
        <div style={s.container}>
          <div style={s.header} className="news-header">
            <h2 style={s.title}>{title}</h2>
            <div style={s.navButtons} className="news-nav-buttons">
              <button
                style={s.navBtn}
                className="news-nav-btn"
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
                className="news-nav-btn"
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
            <div ref={scrollRef} style={s.carousel} className="news-carousel carousel">
              {newsItems.map((news) => (
                <div
                  key={news.id}
                  style={s.card}
                  className="news-card"
                  onClick={() => setSelectedNews(news)}
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
                  <div style={s.imageContainer} className="news-image-container">
                    <div style={s.badge}>NOTICIA</div>
                    <img
                      src={news.image_url || 'https://via.placeholder.com/340x180?text=Sin+Imagen'}
                      alt={news.title}
                      style={s.image}
                    />
                  </div>
                  <div style={s.content} className="news-content">
                    <div style={s.date}>{formatDate(news.created_at)}</div>
                    <div style={s.newsTitle} className="news-title-text">{news.title}</div>
                    <div style={s.body}>{news.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedNews && (
        <NewsModal
          news={selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      )}
    </>
  );
}