import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Route-level code-splitting: HomePage pulls in the entire /three + /animation
// bundle; Registrations/Gallery must never share that chunk. See
// project-architecture doc §2 for why this is the single highest-leverage
// performance decision in the app.
const HomePage = lazy(() => import('../pages/HomePage'));
const RegistrationsPage = lazy(() => import('../pages/RegistrationsPage'));
const GalleryPage = lazy(() => import('../pages/GalleryPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/events/registrations', element: <RegistrationsPage /> },
  { path: '/events/gallery', element: <GalleryPage /> },
  { path: '*', element: <NotFoundPage /> },
];
