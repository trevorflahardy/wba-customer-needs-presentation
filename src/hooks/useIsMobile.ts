import { useState, useEffect } from "react";

/**
 * Reactive hook that returns `true` when the viewport width is at or
 * below the given `breakpoint` (default 640 px).
 *
 * Internally uses `window.matchMedia` so the value updates in real-time
 * as the user resizes their browser or rotates their device.
 *
 * @param breakpoint - Max-width pixel value that qualifies as "mobile".
 * @returns Whether the current viewport is narrower than `breakpoint`.
 */
export function useIsMobile(breakpoint = 640) {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);
    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
        const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
        handler(mql);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, [breakpoint]);
    return isMobile;
}
