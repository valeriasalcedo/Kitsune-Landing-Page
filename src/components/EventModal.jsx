// src/components/EventModal.jsx - ✅ RESPONSIVE
import React from 'react';

const K = {
  purple: '#4e2b5b',
  pink: '#ef5aa1',
  dark: '#2b1440',
};

export default function EventModal({ event, onClose }) {
  if (!event) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const s = {
    overlay: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(4px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      animation: 'fadeIn 0.2s ease',
    },
    modal: {
      background: '#fff',
      borderRadius: 24,
      maxWidth: 700,
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 20px 60px rgba(0,0,0,.3)',
      position: 'relative',
      animation: 'slideUp 0.3s ease',
    },
    closeBtn: {
      position: 'absolute',
      top: 16,
      right: 16,
      background: '#fff',
      border: 'none',
      borderRadius: 999,
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0,0,0,.15)',
      zIndex: 10,
      fontWeight: 900,
      fontSize: 20,
      color: K.dark,
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      height: 300,
      background: '#faf6ff',
      borderRadius: '24px 24px 0 0',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    badge: {
      position: 'absolute',
      top: 16,
      left: 16,
      background: K.pink,
      color: '#fff',
      padding: '8px 16px',
      borderRadius: 999,
      fontWeight: 900,
      fontSize: 12,
      letterSpacing: '0.5px',
      boxShadow: '0 4px 12px rgba(0,0,0,.2)',
    },
    content: {
      padding: 32,
    },
    title: {
      fontSize: 28,
      fontWeight: 900,
      color: K.dark,
      marginBottom: 16,
      lineHeight: 1.2,
    },
    dateLocation: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginBottom: 24,
      padding: 16,
      background: '#f9fafb',
      borderRadius: 12,
    },
    dateRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 14,
      fontWeight: 700,
      color: '#374151',
    },
    icon: {
      fontSize: 18,
    },
    body: {
      fontSize: 16,
      lineHeight: 1.7,
      color: '#4b5563',
      whiteSpace: 'pre-wrap',
    },
    media: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @media (max-width: 768px) {
        .event-modal-overlay { padding: 12px !important; }
        .event-modal { borderRadius: 20px !important; maxHeight: 95vh !important; }
        .event-modal-close-btn { width: 32px !important; height: 32px !important; fontSize: 18px !important; top: 12px !important; right: 12px !important; }
        .event-modal-image-container { height: 200px !important; borderRadius: 20px 20px 0 0 !important; }
        .event-modal-content { padding: 24px !important; }
        .event-modal-title { fontSize: 22px !important; }
        .event-modal-body { fontSize: 15px !important; }
      }
      @media (max-width: 520px) {
        .event-modal-overlay { padding: 8px !important; }
        .event-modal { borderRadius: 16px !important; }
        .event-modal-image-container { height: 160px !important; borderRadius: 16px 16px 0 0 !important; }
        .event-modal-content { padding: 20px !important; }
        .event-modal-title { fontSize: 20px !important; marginBottom: 12px !important; }
        .event-modal-date-location { padding: 12px !important; }
        .event-modal-date-row { fontSize: 13px !important; }
        .event-modal-body { fontSize: 14px !important; lineHeight: 1.6 !important; }
      }
    `,
  };

  return (
    <>
      <style>{s.media}</style>
      <div style={s.overlay} className="event-modal-overlay" onClick={handleOverlayClick}>
        <div style={s.modal} className="event-modal">
          <button style={s.closeBtn} className="event-modal-close-btn" onClick={onClose} aria-label="Cerrar">
            ×
          </button>

          {event.image_url && (
            <div style={s.imageContainer} className="event-modal-image-container">
              <div style={s.badge}>EVENTO</div>
              <img src={event.image_url} alt={event.title} style={s.image} />
            </div>
          )}

          <div style={s.content} className="event-modal-content">
            <h2 style={s.title} className="event-modal-title">{event.title}</h2>

            <div style={s.dateLocation} className="event-modal-date-location">
              {event.event_date && (
                <div style={s.dateRow} className="event-modal-date-row">
                  <span style={s.icon}>📅</span>
                  <span>{formatDate(event.event_date)}</span>
                </div>
              )}
              {event.location && (
                <div style={s.dateRow} className="event-modal-date-row">
                  <span style={s.icon}>📍</span>
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            <div style={s.body} className="event-modal-body">{event.body}</div>
          </div>
        </div>
      </div>
    </>
  );
}