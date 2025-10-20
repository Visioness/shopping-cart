import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './routes/HomePage/HomePage';
import ErrorPage from './routes/ErrorPage/ErrorPage';
import ShopPage, { loader as shopLoader } from './routes/ShopPage/ShopPage';
import ProductPage, {
  loader as productLoader,
} from './routes/ProductPage/ProductPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'shop',
            element: <ShopPage />,
            loader: shopLoader,
          },
          {
            path: 'product/:id',
            element: <ProductPage />,
            loader: productLoader,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
