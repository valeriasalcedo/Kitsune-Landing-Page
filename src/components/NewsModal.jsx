// src/components/NewsModal.jsx - ✅ RESPONSIVE
import React from 'react';

const K = {
  purple: '#4e2b5b',
  pink: '#ef5aa1',
  dark: '#2b1440',
};

export default function NewsModal({ news, onClose }) {
  if (!news) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
      background: K.purple,
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
    dateText: {
      fontSize: 13,
      fontWeight: 700,
      color: '#9ca3af',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: 12,
    },
    title: {
      fontSize: 28,
      fontWeight: 900,
      color: K.dark,
      marginBottom: 24,
      lineHeight: 1.2,
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
        .news-modal-overlay { padding: 12px !important; }
        .news-modal { borderRadius: 20px !important; maxHeight: 95vh !important; }
        .news-modal-close-btn { width: 32px !important; height: 32px !important; fontSize: 18px !important; top: 12px !important; right: 12px !important; }
        .news-modal-image-container { height: 200px !important; borderRadius: 20px 20px 0 0 !important; }
        .news-modal-content { padding: 24px !important; }
        .news-modal-title { fontSize: 22px !important; }
        .news-modal-body { fontSize: 15px !important; }
      }
      @media (max-width: 520px) {
        .news-modal-overlay { padding: 8px !important; }
        .news-modal { borderRadius: 16px !important; }
        .news-modal-image-container { height: 160px !important; borderRadius: 16px 16px 0 0 !important; }
        .news-modal-content { padding: 20px !important; }
        .news-modal-title { fontSize: 20px !important; marginBottom: 16px !important; }
        .news-modal-body { fontSize: 14px !important; lineHeight: 1.6 !important; }
      }
    `,
  };

  return (
    <>
      <style>{s.media}</style>
      <div style={s.overlay} className="news-modal-overlay" onClick={handleOverlayClick}>
        <div style={s.modal} className="news-modal">
          <button style={s.closeBtn} className="news-modal-close-btn" onClick={onClose} aria-label="Cerrar">
            ×
          </button>

          {news.image_url && (
            <div style={s.imageContainer} className="news-modal-image-container">
              <div style={s.badge}>NOTICIA</div>
              <img src={news.image_url} alt={news.title} style={s.image} />
            </div>
          )}

          <div style={s.content} className="news-modal-content">
            {news.created_at && (
              <div style={s.dateText}>{formatDate(news.created_at)}</div>
            )}
            
            <h2 style={s.title} className="news-modal-title">{news.title}</h2>
            <div style={s.body} className="news-modal-body">{news.body}</div>
          </div>
        </div>
      </div>
    </>
  );
}