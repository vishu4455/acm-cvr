import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
/**
 * 2D canvas signal-circuit visual — ported directly from the standalone
 * HTML/canvas demo (not the earlier @react-three/fiber CPU scene, which
 * this replaces). Chip with real IC-style pin pads, fanned traces with
 * elbow bends, and traveling pulse dots. Traces stay crisp/dim at rest and
 * bloom into glow only near the cursor, scoped to this panel's own
 * container rather than the viewport.
 *
 * Sizing is driven entirely by the container element (via ResizeObserver),
 * not window size, since this now sits in a fixed box beside the hero
 * heading instead of behind the full page.
 */
export function SignalCircuitPanel({ className = '' }) {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas)
            return;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        let W = 0, H = 0;
        const DPR = Math.min(window.devicePixelRatio || 1, 2);
        let cx = 0, cy = 0;
        const mouse = { x: -9999, y: -9999, active: false };
        const mouseSmoothed = { x: -9999, y: -9999 };
        function seededRandom(seed) {
            let s = seed;
            return function () {
                s = (s * 9301 + 49297) % 233280;
                return s / 233280;
            };
        }
        // ---------- geometry helpers ----------
        function distToSeg(px, py, ax, ay, bx, by) {
            const abx = bx - ax, aby = by - ay, apx = px - ax, apy = py - ay;
            const abLen2 = abx * abx + aby * aby;
            let t = abLen2 > 0 ? (apx * abx + apy * aby) / abLen2 : 0;
            t = Math.max(0, Math.min(1, t));
            const qx = ax + abx * t, qy = ay + aby * t;
            return Math.hypot(px - qx, py - qy);
        }
        function distToPolyline(px, py, points) {
            let m = Infinity;
            for (let i = 0; i < points.length - 1; i++) {
                const d = distToSeg(px, py, points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
                if (d < m)
                    m = d;
            }
            return m;
        }
        function pointAtT(points, t) {
            const lens = [];
            let total = 0;
            for (let i = 0; i < points.length - 1; i++) {
                const l = Math.hypot(points[i + 1].x - points[i].x, points[i + 1].y - points[i].y);
                lens.push(l);
                total += l;
            }
            let target = t * total;
            for (let i = 0; i < lens.length; i++) {
                if (target <= lens[i] || i === lens.length - 1) {
                    const st = lens[i] > 0 ? target / lens[i] : 0;
                    const ct = Math.max(0, Math.min(1, st));
                    return {
                        x: points[i].x + (points[i + 1].x - points[i].x) * ct,
                        y: points[i].y + (points[i + 1].y - points[i].y) * ct,
                    };
                }
                target -= lens[i];
            }
            return points[points.length - 1];
        }
        function roundRect(x, y, w, h, r) {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
        }
        let chipSize = 0, pinStub = 0, pinPad = 0;
        let pins = [];
        let traces = [];
        function buildChip() {
            const minDim = Math.min(W, H);
            chipSize = Math.max(56, Math.min(150, minDim * 0.24));
            pinStub = chipSize * 0.16;
            pinPad = chipSize * 0.045;
            pins = [];
            const sides = [
                { dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
            ];
            const rand = seededRandom(11);
            sides.forEach((side) => {
                const isRight = side.dx === 1;
                const count = (isRight ? 12 : 10) + Math.floor(rand() * 2);
                const inset = chipSize * 0.09;
                const usable = chipSize - inset * 2;
                const spacing = usable / (count - 1);
                for (let i = 0; i < count; i++) {
                    let px, py;
                    if (side.dx === 0) {
                        px = cx - chipSize / 2 + inset + spacing * i;
                        py = cy + side.dy * chipSize / 2;
                    }
                    else {
                        px = cx + side.dx * chipSize / 2;
                        py = cy - chipSize / 2 + inset + spacing * i;
                    }
                    const sx = px + side.dx * pinStub;
                    const sy = py + side.dy * pinStub;
                    pins.push({ px, py, sx, sy, dx: side.dx, dy: side.dy });
                }
            });
        }
        function buildTraces() {
            traces = [];
            const minDim = Math.min(W, H);
            const rand = seededRandom(88);
            const margin = Math.max(14, minDim * 0.04);
            const clampX = (v) => Math.max(margin, Math.min(W - margin, v));
            const clampY = (v) => Math.max(margin, Math.min(H - margin, v));
            pins.forEach((pin) => {
                const isTop = pin.dx === 0 && pin.dy === -1;
                const routeChance = isTop ? 1 : (pin.dx === 1 ? 0.82 : 0.62);
                const routed = rand() < routeChance;
                if (!routed) return;
                const mainDir = pin.dx !== 0 ? 'h' : 'v';
                const points = [{ x: pin.px, y: pin.py }, { x: pin.sx, y: pin.sy }];
                const reach = 40 + rand() * Math.max(60, minDim * 0.22);
                let x = pin.sx, y = pin.sy;
                const leg1 = reach * (0.45 + rand() * 0.35);
                if (mainDir === 'h') {
                    x = pin.sx + pin.dx * leg1;
                }
                else {
                    y = pin.sy + pin.dy * leg1;
                }
                points.push({ x: clampX(x), y: clampY(y) });
                if (rand() < 0.8) {
                    const perp = rand() < 0.5 ? -1 : 1;
                    const turnAmt = (10 + rand() * 40) * perp;
                    if (mainDir === 'h') {
                        y += turnAmt;
                    }
                    else {
                        x += turnAmt;
                    }
                    points.push({ x: clampX(x), y: clampY(y) });
                    const leg2 = reach * 0.5;
                    if (mainDir === 'h') {
                        x += pin.dx * leg2;
                    }
                    else {
                        y += pin.dy * leg2;
                    }
                    points.push({ x: clampX(x), y: clampY(y) });
                }
                if (rand() < 0.3) {
                    if (mainDir === 'h') {
                        y += (rand() < 0.5 ? -1 : 1) * (6 + rand() * 18);
                    }
                    else {
                        x += (rand() < 0.5 ? -1 : 1) * (6 + rand() * 18);
                    }
                    points.push({ x: clampX(x), y: clampY(y) });
                }
                traces.push({
                    points,
                    nodeRadius: 2.4 + rand() * 1.6,
                    hasBullet: rand() < 0.7,
                    speed: 0.18 + rand() * 0.22,
                    phase: rand(),
                    pulseGap: 2.2 + rand() * 2.4,
                    baseWidth: 1 + rand() * 0.3,
                    activation: 0,
                    endOnly: false,
                });
            });
        }
        function buildAll() {
            buildChip();
            buildTraces();
        }
        // ---------- palette ----------
        const CORE = '235,250,255';
        const CYAN = '120,225,255';
        const CYAN_DIM = '90,175,220';
        const BLUE = '70,140,235';
        const MAGENTA = '195,110,255';
        function drawBackground() {
            const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.8);
            g.addColorStop(0, '#060606');
            g.addColorStop(0.45, '#020202');
            g.addColorStop(1, '#000000');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
        }
        function traceActivation(tr) {
            let target = 0;
            if (mouse.active) {
                const d = distToPolyline(mouseSmoothed.x, mouseSmoothed.y, tr.points);
                const radius = Math.max(90, Math.min(W, H) * 0.32);
                target = Math.max(0, 1 - d / radius);
                target = Math.pow(target, 1.5);
            }
            tr.activation += (target - tr.activation) * 0.1;
            return tr.activation;
        }
        function drawTrace(tr, t) {
            const pts = tr.points;
            const act = traceActivation(tr);
            const width = tr.baseWidth + act * 2.2;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            if (act > 0.02) {
                ctx.beginPath();
                ctx.moveTo(pts[0].x, pts[0].y);
                for (let i = 1; i < pts.length; i++)
                    ctx.lineTo(pts[i].x, pts[i].y);
                ctx.strokeStyle = `rgba(${BLUE},${0.12 + act * 0.4})`;
                ctx.lineWidth = width + 6 + act * 8;
                ctx.shadowColor = `rgba(${CYAN},${0.5 + act * 0.5})`;
                ctx.shadowBlur = act * 20;
                ctx.stroke();
                ctx.shadowBlur = 0;
            }
            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            for (let i = 1; i < pts.length; i++)
                ctx.lineTo(pts[i].x, pts[i].y);
            ctx.strokeStyle = `rgba(${CYAN_DIM},${0.55 + act * 0.45})`;
            ctx.lineWidth = width * 0.55;
            ctx.shadowColor = `rgba(${CYAN},0.9)`;
            ctx.shadowBlur = 1.5 + act * 5;
            ctx.stroke();
            ctx.shadowBlur = 0;
            if (tr.endOnly)
                return;
            for (let i = 2; i < pts.length - 1; i++) {
                const p = pts[i];
                ctx.beginPath();
                ctx.fillStyle = `rgba(${CYAN},${0.5 + act * 0.5})`;
                ctx.arc(p.x, p.y, 1.1 + act * 0.7, 0, Math.PI * 2);
                ctx.fill();
            }
            const end = pts[pts.length - 1];
            const r = tr.nodeRadius + act * 2;
            if (act > 0.02) {
                ctx.beginPath();
                const grad = ctx.createRadialGradient(end.x, end.y, 0, end.x, end.y, r * 4);
                grad.addColorStop(0, `rgba(${CORE},${0.35 + act * 0.5})`);
                grad.addColorStop(1, `rgba(${CYAN},0)`);
                ctx.fillStyle = grad;
                ctx.arc(end.x, end.y, r * 4, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${CYAN},${0.6 + act * 0.4})`;
            ctx.lineWidth = 1.1;
            ctx.arc(end.x, end.y, r, 0, Math.PI * 2);
            ctx.stroke();
            if (tr.hasBullet) {
                ctx.beginPath();
                ctx.fillStyle = `rgba(${CORE},${0.7 + act * 0.3})`;
                ctx.arc(end.x, end.y, r * 0.42, 0, Math.PI * 2);
                ctx.fill();
            }
            const speed = tr.speed * (1 + act * 3.2);
            const loopPos = (t * speed + tr.phase) % 1;
            const gap = tr.pulseGap;
            const nPulses = Math.max(1, Math.floor(1 / gap) + (act > 0.12 ? 2 : 0));
            for (let k = 0; k < nPulses; k++) {
                const pos = (loopPos + k * gap) % 1;
                const p = pointAtT(pts, pos);
                const pr = 1.4 + act * 3;
                const fade = 0.4 + act * 0.6;
                ctx.beginPath();
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pr * 4.5);
                grad.addColorStop(0, `rgba(${CORE},${fade})`);
                grad.addColorStop(0.35, `rgba(${CYAN},${fade * 0.6})`);
                grad.addColorStop(1, `rgba(${CYAN},0)`);
                ctx.fillStyle = grad;
                ctx.arc(p.x, p.y, pr * 4.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = `rgba(255,255,255,${Math.min(1, fade + 0.25)})`;
                ctx.arc(p.x, p.y, pr * 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        function chipActivation() {
            if (!mouse.active)
                return 0;
            const d = Math.hypot(mouseSmoothed.x - cx, mouseSmoothed.y - cy);
            return Math.pow(Math.max(0, 1 - d / (chipSize * 1.5)), 1.2);
        }
        function drawPins(act) {
            pins.forEach((pin) => {
                const w = pin.dx !== 0 ? pinStub : pinPad * 1.6;
                const h = pin.dy !== 0 ? pinStub : pinPad * 1.6;
                const midx = (pin.px + pin.sx) / 2, midy = (pin.py + pin.sy) / 2;
                ctx.save();
                ctx.fillStyle = `rgba(${CYAN},${0.75 + act * 0.25})`;
                ctx.shadowColor = `rgba(${CYAN},0.8)`;
                ctx.shadowBlur = 2 + act * 6;
                ctx.fillRect(midx - w / 2, midy - h / 2, w, h);
                ctx.restore();
            });
        }
        function drawChip() {
            const act = chipActivation();
            const half = chipSize / 2;
            const bleed = ctx.createRadialGradient(cx - half * 0.6, cy + half * 0.6, 0, cx - half * 0.6, cy + half * 0.6, chipSize * 1.1);
            bleed.addColorStop(0, `rgba(${MAGENTA},${0.16 + act * 0.22})`);
            bleed.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = bleed;
            ctx.fillRect(cx - chipSize * 1.5, cy - chipSize * 1.5, chipSize * 3, chipSize * 3);
            const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, chipSize * 1.3);
            glow.addColorStop(0, `rgba(${BLUE},${0.06 + act * 0.18})`);
            glow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = glow;
            ctx.fillRect(cx - chipSize * 1.4, cy - chipSize * 1.4, chipSize * 2.8, chipSize * 2.8);
            drawPins(act);
            ctx.save();
            ctx.shadowColor = `rgba(${CYAN},${0.65 + act * 0.35})`;
            ctx.shadowBlur = 8 + act * 22;
            ctx.strokeStyle = `rgba(${CYAN},${0.9 + act * 0.1})`;
            ctx.lineWidth = 1.8;
            roundRect(cx - half, cy - half, chipSize, chipSize, 5);
            ctx.stroke();
            const inset = chipSize * 0.11;
            ctx.strokeStyle = `rgba(${CYAN},${0.65 + act * 0.3})`;
            ctx.lineWidth = 1.1;
            roundRect(cx - half + inset, cy - half + inset, chipSize - inset * 2, chipSize - inset * 2, 3);
            ctx.stroke();
            ctx.restore();
            const gridInset = chipSize * 0.19;
            const gridSize = chipSize - gridInset * 2;
            const cells = 10;
            const cellSize = gridSize / cells;
            ctx.strokeStyle = `rgba(${CYAN},${0.4 + act * 0.4})`;
            ctx.lineWidth = 1;
            for (let i = 0; i <= cells; i++) {
                ctx.beginPath();
                ctx.moveTo(cx - gridSize / 2 + i * cellSize, cy - gridSize / 2);
                ctx.lineTo(cx - gridSize / 2 + i * cellSize, cy + gridSize / 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(cx - gridSize / 2, cy - gridSize / 2 + i * cellSize);
                ctx.lineTo(cx + gridSize / 2, cy - gridSize / 2 + i * cellSize);
                ctx.stroke();
            }
            const hot = ctx.createRadialGradient(cx, cy, 0, cx, cy, gridSize * 0.6);
            hot.addColorStop(0, `rgba(${MAGENTA},${0.1 + act * 0.4})`);
            hot.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = hot;
            ctx.fillRect(cx - gridSize * 0.6, cy - gridSize * 0.6, gridSize * 1.2, gridSize * 1.2);
        }
        function drawCursorAura() {
            if (!mouse.active)
                return;
            const r = Math.max(90, Math.min(W, H) * 0.32);
            const grad = ctx.createRadialGradient(mouseSmoothed.x, mouseSmoothed.y, 0, mouseSmoothed.x, mouseSmoothed.y, r);
            grad.addColorStop(0, 'rgba(150,220,255,0.045)');
            grad.addColorStop(1, 'rgba(150,220,255,0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(mouseSmoothed.x, mouseSmoothed.y, r, 0, Math.PI * 2);
            ctx.fill();
        }
        let rafId = 0;
        function frame(now) {
            const t = now / 1000;
            mouseSmoothed.x += (mouse.x - mouseSmoothed.x) * 0.18;
            mouseSmoothed.y += (mouse.y - mouseSmoothed.y) * 0.18;
            ctx.clearRect(0, 0, W, H);
            drawBackground();
            drawCursorAura();
            traces.forEach((tr) => drawTrace(tr, t));
            drawChip();
            rafId = requestAnimationFrame(frame);
        }
        function resize() {
            const rect = container.getBoundingClientRect();
            W = rect.width;
            H = rect.height;
            canvas.width = W * DPR;
            canvas.height = H * DPR;
            canvas.style.width = `${W}px`;
            canvas.style.height = `${H}px`;
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            cx = W / 2;
            cy = H / 2;
            buildAll();
        }
        function handlePointerMove(e) {
            const r = container.getBoundingClientRect();
            mouse.x = e.clientX - r.left;
            mouse.y = e.clientY - r.top;
            mouse.active = true;
        }
        function handlePointerLeave() {
            mouse.active = false;
        }
        const resizeObserver = new ResizeObserver(() => resize());
        resizeObserver.observe(container);
        resize();
        container.addEventListener('pointermove', handlePointerMove);
        container.addEventListener('pointerleave', handlePointerLeave);
        rafId = requestAnimationFrame(frame);
        return () => {
            cancelAnimationFrame(rafId);
            resizeObserver.disconnect();
            container.removeEventListener('pointermove', handlePointerMove);
            container.removeEventListener('pointerleave', handlePointerLeave);
        };
    }, []);
    return (_jsx("div", { ref: containerRef, className: `relative aspect-square overflow-hidden rounded-md ${className}`, children: _jsx("canvas", { ref: canvasRef, className: "absolute inset-0 block h-full w-full" }) }));
}
