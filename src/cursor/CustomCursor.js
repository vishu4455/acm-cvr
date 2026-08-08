import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCursorStore } from '@/store/cursorStore';
import { usePerformanceStore } from '@/store/performanceStore';
import { EASE, } from '@/animation/config/easings';
/**
 * Two-tier follow: dot tracks fast (0.15s), ring trails behind (0.45s).
 * That speed gap is the entire visual signature — see cursor-system doc §4.
 *
 * A lightweight canvas layer rides underneath the dot/ring and emits small
 * glowing "signal" sparks as the cursor moves — same particle language as
 * the traveling pulses on the hero chip traces. Hovering an interactive
 * element (button / canvas-hotspot) fires an expanding ring "ping", like a
 * signal hitting a node.
 */
const TRACE = '95,168,184'; // circuit-trace-active
const PULSE = '143,196,207'; // circuit-trace-pulse
const NODE = '201,222,226'; // circuit-node-active
const IDLE = '122,140,148'; // dim cyan-grey for default/idle sparks
export function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const canvasRef = useRef(null);
    const isTouch = usePerformanceStore((s) => s.isTouch);
    const mode = useCursorStore((s) => s.mode);
    const modeRef = useRef(mode);
    modeRef.current = mode;
    useEffect(() => {
        if (isTouch)
            return;
        document.body.classList.add('cursor-ready');
        const dot = dotRef.current;
        const ring = ringRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const dotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: EASE.standard });
        const dotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: EASE.standard });
        const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: EASE.entrance });
        const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: EASE.entrance });
        const DPR = Math.min(window.devicePixelRatio || 1, 2);
        let W = 0, H = 0;
        function resize() {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W * DPR;
            canvas.height = H * DPR;
            canvas.style.width = `${W}px`;
            canvas.style.height = `${H}px`;
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        }
        resize();
        window.addEventListener('resize', resize);
        let sparks = [];
        let pings = [];
        let px = -9999, py = -9999;
        let lastSpawnX = -9999, lastSpawnY = -9999;
        const rand = () => Math.random();
        function sparkColor() {
            const m = modeRef.current;
            if (m === 'button' || m === 'canvas-hotspot')
                return NODE;
            if (m === 'text')
                return TRACE;
            if (m === 'disabled')
                return IDLE;
            return PULSE;
        }
        function spawnSparks(x, y, intensity) {
            const count = 1 + Math.floor(rand() * intensity);
            for (let i = 0; i < count; i++) {
                const angle = rand() * Math.PI * 2;
                const speed = 0.4 + rand() * 1.6;
                sparks.push({
                    x, y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 0.3,
                    life: 0,
                    maxLife: 360 + rand() * 320,
                    size: 0.8 + rand() * 1.4,
                    color: sparkColor(),
                });
            }
            if (sparks.length > 140)
                sparks = sparks.slice(sparks.length - 140);
        }
        function onMove(e) {
            dotX(e.clientX);
            dotY(e.clientY);
            ringX(e.clientX);
            ringY(e.clientY);
            const dx = e.clientX - lastSpawnX, dy = e.clientY - lastSpawnY;
            const moved = Math.hypot(dx, dy);
            if (moved > 4) {
                const intensity = modeRef.current === 'button' || modeRef.current === 'canvas-hotspot' ? 3 : 2;
                spawnSparks(e.clientX, e.clientY, intensity);
                lastSpawnX = e.clientX;
                lastSpawnY = e.clientY;
            }
            px = e.clientX;
            py = e.clientY;
        }
        window.addEventListener('pointermove', onMove);
        let prevMode = modeRef.current;
        function checkModePing() {
            const m = modeRef.current;
            if (m !== prevMode && (m === 'button' || m === 'canvas-hotspot') && px > -9999) {
                pings.push({ x: px, y: py, r: 5, maxR: 34, alpha: 0.55 });
            }
            prevMode = m;
        }
        let rafId = 0;
        let lastT = performance.now();
        function frame(now) {
            const dt = Math.min(40, now - lastT);
            lastT = now;
            checkModePing();
            ctx.clearRect(0, 0, W, H);
            sparks = sparks.filter((s) => s.life < s.maxLife);
            sparks.forEach((s) => {
                s.life += dt;
                s.x += s.vx * (dt / 16);
                s.y += s.vy * (dt / 16);
                s.vx *= 0.96;
                s.vy *= 0.96;
                const t = s.life / s.maxLife;
                const alpha = Math.max(0, 1 - t) * 0.85;
                const r = s.size * (1 - t * 0.4);
                ctx.beginPath();
                const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 4);
                grad.addColorStop(0, `rgba(${s.color},${alpha})`);
                grad.addColorStop(1, `rgba(${s.color},0)`);
                ctx.fillStyle = grad;
                ctx.arc(s.x, s.y, r * 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = `rgba(255,255,255,${Math.min(1, alpha + 0.15)})`;
                ctx.arc(s.x, s.y, r * 0.55, 0, Math.PI * 2);
                ctx.fill();
            });
            pings = pings.filter((p) => p.alpha > 0.01);
            pings.forEach((p) => {
                p.r += dt * 0.09;
                p.alpha *= 0.92;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${NODE},${p.alpha})`;
                ctx.lineWidth = 1.4;
                ctx.shadowColor = `rgba(${NODE},0.8)`;
                ctx.shadowBlur = 8;
                ctx.arc(p.x, p.y, Math.min(p.r, p.maxR), 0, Math.PI * 2);
                ctx.stroke();
                ctx.shadowBlur = 0;
            });
            rafId = requestAnimationFrame(frame);
        }
        rafId = requestAnimationFrame(frame);
        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(rafId);
            document.body.classList.remove('cursor-ready');
        };
    }, [isTouch]);
    if (isTouch)
        return null;
    const modeStyles = {
        default: { dot: 'bg-circuit-node-idle', ring: 'border-border-strong' },
        text: { dot: 'bg-circuit-trace-active', ring: 'border-circuit-trace-active scale-75' },
        button: { dot: 'bg-circuit-node-active', ring: 'border-circuit-trace-active' },
        'canvas-hotspot': { dot: 'bg-circuit-node-active', ring: 'border-circuit-trace-active' },
        disabled: { dot: 'bg-text-disabled', ring: 'border-text-disabled opacity-30' },
    };
    const style = modeStyles[mode] ?? modeStyles.default;
    return (_jsxs(_Fragment, { children: [_jsx("canvas", { ref: canvasRef, className: "fixed inset-0 pointer-events-none z-[9998]" }), _jsx("div", { ref: dotRef, className: `fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2
          rounded-full pointer-events-none z-[9999] transition-colors duration-150 ${style.dot}` }), _jsx("div", { ref: ringRef, className: `fixed left-0 top-0 h-7 w-7 -translate-x-1/2 -translate-y-1/2
          rounded-full border pointer-events-none z-[9999] opacity-60
          transition-[colors,transform] duration-200 ${style.ring}` })] }));
}
