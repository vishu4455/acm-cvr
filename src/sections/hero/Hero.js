import { jsx as _jsx } from "react/jsx-runtime";
import { HeroContent } from './HeroContent';
export function Hero() {
    return (_jsx("section", { id: "home", className: "relative min-h-screen", children: _jsx(HeroContent, {}) }));
}
