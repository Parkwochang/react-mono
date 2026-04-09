// src/main.tsx
import './styles.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';

import { getRouter } from './router';

ReactDOM.createRoot(document.getElementById('app')!).render(<RouterProvider router={getRouter()} />);
