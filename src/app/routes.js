import { jsx as _jsx } from "react/jsx-runtime";
import { lazy } from 'react';
// Route-level code-splitting: HomePage pulls in the entire /three + /animation
// bundle; Registrations/Gallery/PastEvents must never share that chunk. See
// project-architecture doc §2 for why this is the single highest-leverage
// performance decision in the app.
const HomePage = lazy(() => import('../pages/HomePage'));
const RegistrationsPage = lazy(() => import('../pages/RegistrationsPage'));
const PastEventsPage = lazy(() => import('../pages/PastEventsPage'));
const GalleryPage = lazy(() => import('../pages/GalleryPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
export const routes = [
    { path: '/', element: _jsx(HomePage, {}) },
    { path: '/events/registrations', element: _jsx(RegistrationsPage, {}) },
    { path: '/events/past-events', element: _jsx(PastEventsPage, {}) },
    { path: '/events/gallery', element: _jsx(GalleryPage, {}) },
    { path: '*', element: _jsx(NotFoundPage, {}) },
];
