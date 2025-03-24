import React, { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import AppRoutes from './config/routes';
import ErrorFallback from './components/common/ErrorFallback';
import LoadingSpinner from './components/common/LoadingSpinner';
import { ThemeProvider } from './context/ThemeContext';
import { useProductStore } from './store/useProductStore';
import './assets/styles/App.css';

const App: React.FC = () => {
  const initializeProducts = useProductStore(state => state.initializeProducts);

  useEffect(() => {
    initializeProducts();
  }, [initializeProducts]);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <ThemeProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <div className="app">
            <AppRoutes />
          </div>
        </Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
