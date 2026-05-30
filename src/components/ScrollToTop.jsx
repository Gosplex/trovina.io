import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll on route change. If the location carries a hash (e.g. /#pricing),
 * smooth-scrolls to that section instead — enabling anchor links from the navbar.
 */
export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Wait a tick for the target route/section to mount before scrolling.
            const id = hash.replace('#', '');
            requestAnimationFrame(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return;
                }
                window.scrollTo(0, 0);
            });
            return;
        }
        window.scrollTo(0, 0);
    }, [pathname, hash]);

    return null;
}
