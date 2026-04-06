// src/components/EventCarousel.jsx - ✅ RESPONSIVE
import React, { useRef, useState } from 'react';
import EventModal from './EventModal';

const K = {
  purple: '#4e2b5b',
  pink: '#ef5aa1',
  dark: '#2b1440',
};

export default function EventCarousel({ title = 'Próximos Eventos', events = [] }) {
  const scrollRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
      background: 'linear-gradient(to right, #f093fb 0%, #f5576c 100%)',
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
      color: '#fff',
      margin: 0,
      textShadow: '0 2px 8px rgba(0,0,0,0.2)',
    },
    navButtons: {
      display: 'flex',
      gap: 8,
    },
    navBtn: {
      width: 40,
      height: 40,
      borderRadius: 999,
      border: '2px solid #fff',
      background: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(10px)',
      color: '#fff',
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
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
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
      background: K.pink,
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
      color: K.pink,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: 8,
    },
    eventTitle: {
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
    location: {
      fontSize: 13,
      color: '#6b7280',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
    },
    media: `
      @media (max-width: 768px) {
        .event-section { padding: 32px 16px !important; }
        .event-nav-btn { width: 36px !important; height: 36px !important; font-size: 16px !important; }
        .event-carousel { gap: 16px !important; }
        .event-card { minWidth: 280px !important; }
        .event-image-container { height: 150px !important; }
        .event-content { padding: 16px !important; }
        .event-title { fontSize: 16px !important; minHeight: 40px !important; }
      }
      @media (max-width: 520px) {
        .event-section { padding: 24px 12px !important; }
        .event-header { marginBottom: 16px !important; }
        .event-nav-buttons { gap: 6px !important; }
        .event-card { minWidth: 240px !important; }
        .event-content { padding: 14px !important; }
      }
    `,
  };

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <>
      <style>{s.media}</style>
      <div style={s.section} className="event-section">
        <div style={s.container}>
          <div style={s.header} className="event-header">
            <h2 style={s.title}>{title}</h2>
            <div style={s.navButtons} className="event-nav-buttons">
              <button
                style={s.navBtn}
                className="event-nav-btn"
                onClick={() => scroll('left')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = '';
                }}
              >
                ‹
              </button>
              <button
                style={s.navBtn}
                className="event-nav-btn"
                onClick={() => scroll('right')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = '';
                }}
              >
                ›
              </button>
            </div>
          </div>

          <div style={s.carouselWrapper}>
            <div ref={scrollRef} style={s.carousel} className="event-carousel">
              {events.map((event) => (
                <div
                  key={event.id}
                  style={s.card}
                  className="event-card"
                  onClick={() => setSelectedEvent(event)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = '';
                  }}
                >
                  <div style={s.imageContainer} className="event-image-container">
                    <div style={s.badge}>EVENTO</div>
                    <img
                      src={event.image_url || 'https://via.placeholder.com/340x180?text=Sin+Imagen'}
                      alt={event.title}
                      style={s.image}
                    />
                  </div>
                  <div style={s.content} className="event-content">
                    <div style={s.date}>{formatDate(event.event_date)}</div>
                    <div style={s.eventTitle} className="event-title">{event.title}</div>
                    {event.location && (
                      <div style={s.location}>
                        <span>📍</span>
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}