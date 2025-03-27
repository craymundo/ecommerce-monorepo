import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';

export function renderWithRouter(ui: ReactNode) {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
} 