import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import RulesPage from './sections/RulesPage.jsx'; // Existing page Example
import TermsPage from './sections/TermsPage.jsx'; // Existing page Example
import StaffPage from './sections/StaffPage.jsx'; // <-- 1. IMPORT YOUR NEW STAFF PAGE HERE
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

// 2. REGISTER THE ROUTE JALUR PATH DI SINI
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/rules',
    element: <RulesPage />,
  },
  {
    path: '/terms',
    element: <TermsPage />,
  },
  {
    path: '/staff', // <-- This must match the target in your Navbar link exactly
    element: <StaffPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);