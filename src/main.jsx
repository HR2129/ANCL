import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import About from './pages/about.jsx';
import Contact from './pages/contact.jsx';
import Home from './pages/home.jsx';

const router = createBrowserRouter([
 {
    path: "/",
    element: <App />,   
    children: [
      { index: true, element: <Home /> },  
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
