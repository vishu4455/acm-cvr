import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
/**
 * Nav links always point at "/#section-id" so they work from any route, not
 * just the homepage. React Router's own hash handling only fires on the
 * initial load, and even then the target section may not exist yet because
 * HomePage is lazy-loaded behind a Suspense boundary. This polls briefly
 * (rAF, ~1s ceiling) until the element shows up, then scrolls to it.
 *
 * When there's no hash (e.g. navigating to /events/registrations), React
 * Router doesn't reset scroll position on its own — the new page mounts
 * wherever the previous page happened to be scrolled to. So on a plain
 * pathname change we jump straight to the top instead.
 */
export function useScrollToHash() {
    const location = useLocation();
    useEffect(() => {
        if (!location.hash) {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            return;
        }
        const id = location.hash.slice(1);
        if (!id)
            return;
        let attempts = 0;
        let rafId;
        function tryScroll() {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
            attempts += 1;
            if (attempts < 60) {
                rafId = requestAnimationFrame(tryScroll);
            }
        }
        tryScroll();
        return () => cancelAnimationFrame(rafId);
    }, [location.pathname, location.hash]);
}
