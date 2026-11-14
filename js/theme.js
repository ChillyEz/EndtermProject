// Apply the saved palette before CSS paints, so navigation never flashes the other faction.
(() => {
    const root = document.documentElement;
    const storageKey = "dota-wiki-theme";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let currentTheme = "dire";
    let changing = false;

    function readTheme(value) {
        return value === "light" || value === "radiant" ? "radiant" : "dire";
    }

    try { currentTheme = readTheme(localStorage.getItem(storageKey)); }
    catch { /* The switch still works when storage is unavailable. */ }
    root.dataset.theme = currentTheme;

    document.addEventListener("DOMContentLoaded", () => {
        const buttons = document.querySelectorAll(".theme-toggle");

        function applyTheme(theme, save = false) {
            currentTheme = theme;
            root.dataset.theme = theme;
            const isRadiant = theme === "radiant";
            // Keep the existing light-theme hook for other page features.
            document.body.classList.toggle("light-theme", isRadiant);
            buttons.forEach((button) => {
                button.setAttribute("aria-pressed", String(isRadiant));
                button.title = isRadiant ? "Switch to Dire (dark theme)" : "Switch to Radiant (light theme)";
            });
            if (save) {
                try { localStorage.setItem(storageKey, isRadiant ? "light" : "dark"); }
                catch { /* The new palette still applies to this page. */ }
            }
        }

        async function switchTheme(button) {
            if (changing) return;
            const nextTheme = currentTheme === "dire" ? "radiant" : "dire";
            if (reducedMotion.matches) {
                applyTheme(nextTheme, true);
                return;
            }

            changing = true;
            root.dataset.themeChanging = "true";
            let transition;
            try {
                if (typeof document.startViewTransition !== "function") {
                    // Older browsers smoothly change surface colors without a page snapshot.
                    root.classList.add("theme-color-fade");
                    applyTheme(nextTheme, true);
                    await new Promise((resolve) => setTimeout(resolve, 400));
                    return;
                }

                const bounds = button.getBoundingClientRect();
                const x = bounds.left + bounds.width / 2;
                const y = bounds.top + bounds.height / 2;
                const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
                transition = document.startViewTransition(() => applyTheme(nextTheme, true));
                await transition.ready;
                // Reveal the new faction from the switch to the farthest viewport corner.
                await root.animate({
                    clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]
                }, {
                    duration: 650,
                    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                    pseudoElement: "::view-transition-new(root)"
                }).finished;
                await transition.finished;
            } catch {
                transition?.skipTransition();
                applyTheme(nextTheme, true);
            } finally {
                root.classList.remove("theme-color-fade");
                delete root.dataset.themeChanging;
                changing = false;
            }
        }

        applyTheme(currentTheme);
        buttons.forEach((button) => button.addEventListener("click", () => switchTheme(button)));
        window.addEventListener("storage", (event) => {
            if (event.key === storageKey || event.key === null) applyTheme(readTheme(event.newValue));
        });
    });
})();
