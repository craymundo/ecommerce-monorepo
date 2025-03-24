import React from 'react';
import './ErrorFallback.css';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-fallback">
      <div className="error-content">
        <h2>¡Ups! Algo salió mal</h2>
        <p className="error-message">{error.message}</p>
        <button onClick={resetErrorBoundary} className="error-button">
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback; 