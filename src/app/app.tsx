import './styles/index.css';
import { StrictMode } from 'react';
import { AppRouter } from './router';

export const App = () => (
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
