import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/navigation/Navbar';
import { Footer } from '@/sections/footer/Footer';
import { CustomCursor } from '@/cursor/CustomCursor';
import { useCursorTracking } from '@/cursor/useCursorTracking';
import { useScrollToHash } from '@/navigation/useScrollToHash';

export function Layout() {
  useCursorTracking();
  useScrollToHash();

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
