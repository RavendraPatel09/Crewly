import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './AppUnified.jsx';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('CollabHub Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#05050f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          padding: '24px',
        }}>
          <div style={{
            maxWidth: 480,
            width: '100%',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(244,63,94,0.2)',
            borderRadius: 24,
            padding: 32,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
            <h2 style={{ color: '#f1f5f9', fontWeight: 800, marginBottom: 8, fontSize: 20 }}>
              Something went wrong
            </h2>
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
              CollabHub encountered an unexpected error. Please refresh the page.
            </p>
            <pre style={{
              color: '#f87171',
              fontFamily: 'monospace',
              fontSize: 12,
              background: 'rgba(244,63,94,0.07)',
              border: '1px solid rgba(244,63,94,0.15)',
              borderRadius: 12,
              padding: 12,
              textAlign: 'left',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              marginBottom: 24,
            }}>
              {this.state.error?.toString()}
            </pre>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                padding: '12px 28px',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 0 24px rgba(124,58,237,0.35)',
              }}>
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
