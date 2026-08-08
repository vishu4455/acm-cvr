import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/navigation/Navbar';
import { Footer } from '@/sections/footer/Footer';
import { CustomCursor } from '@/cursor/CustomCursor';
import { useCursorTracking } from '@/cursor/useCursorTracking';
export function Layout() {
    useCursorTracking();
    return (_jsxs(_Fragment, { children: [_jsx(CustomCursor, {}), _jsx(Navbar, {}), _jsx("main", { children: _jsx(Suspense, { fallback: _jsx("div", { className: "min-h-screen" }), children: _jsx(Outlet, {}) }) }), _jsx(Footer, {})] }));
}
