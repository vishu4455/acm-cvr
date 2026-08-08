import { useEffect } from 'react';
import { useCursorStore } from '@/store/cursorStore';
import { usePerformanceStore } from '@/store/performanceStore';
/**
 * Single global pointermove listener. Both CustomCursor (DOM) and the R3F
 * scene's raycasting logic read screenX/screenY (and worldX/worldY, set
 * separately by CursorPlane once the pointer is over the canvas) from the
 * same store — there is exactly one position source for the whole app.
 */
export function useCursorTracking() {
    useEffect(() => {
        const { isTouch } = usePerformanceStore.getState();
        if (isTouch)
            return; // no custom cursor / tracking on touch devices at all
        const { setScreenPosition, setActive } = useCursorStore.getState();
        function onMove(e) {
            setScreenPosition(e.clientX, e.clientY);
        }
        function onLeave() {
            setActive(false);
        }
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerleave', onLeave);
        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerleave', onLeave);
        };
    }, []);
}
