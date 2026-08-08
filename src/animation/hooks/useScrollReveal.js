import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE } from '../config/easings';
import { DURATION } from '../config/durations';
import { usePerformanceStore } from '@/store/performanceStore';
gsap.registerPlugin(ScrollTrigger);
/**
 * The standard "Pattern A" reveal from the motion system doc — used by every
 * section heading/paragraph/card. Respects reduced-motion by skipping the
 * animation and just setting the end state immediately.
 */
export function useScrollReveal(options) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el)
            return;
        const reducedMotion = usePerformanceStore.getState().reducedMotion;
        const targets = el.children.length ? Array.from(el.children) : [el];
        if (reducedMotion) {
            gsap.set(targets, { opacity: 1, y: 0 });
            return;
        }
        const ctx = gsap.context(() => {
            gsap.from(targets, {
                opacity: 0,
                y: 16,
                duration: DURATION.medium,
                ease: EASE.entrance,
                stagger: options?.stagger ?? 0.07,
                scrollTrigger: { trigger: el, start: 'top 80%' },
            });
        });
        return () => ctx.revert();
    }, [options?.stagger]);
    return ref;
}
