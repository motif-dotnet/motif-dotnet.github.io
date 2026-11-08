// The theme menu: System, Light or Dark, kept in localStorage under "motif-theme" like every Motif tool,
// with the same icons as the kit's ThemeMenu component.
(() => {
    const icon = paths => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`;
    const icons = {
        system: icon('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'),
        light: icon('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
        dark: icon('<path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"/>'),
    };
    const labels = { system: "System", light: "Light", dark: "Dark" };

    const menu = document.getElementById("theme-menu");
    const button = document.getElementById("theme-button");
    const choices = menu.querySelectorAll("[data-theme-choice]");

    const read = () => {
        try {
            const t = localStorage.getItem("motif-theme");
            return t === "light" || t === "dark" ? t : "system";
        } catch { return "system"; }
    };

    const show = theme => {
        if (theme === "system") document.documentElement.removeAttribute("data-theme");
        else document.documentElement.setAttribute("data-theme", theme);
        button.innerHTML = icons[theme];
        choices.forEach(c => c.setAttribute("aria-checked", c.dataset.themeChoice === theme ? "true" : "false"));
    };

    const setOpen = open => {
        menu.classList.toggle("open", open);
        button.setAttribute("aria-expanded", open ? "true" : "false");
    };

    choices.forEach(c => {
        c.innerHTML = `${icons[c.dataset.themeChoice]} ${labels[c.dataset.themeChoice]}`;
        c.addEventListener("click", () => {
            const theme = c.dataset.themeChoice;
            try {
                if (theme === "system") localStorage.removeItem("motif-theme");
                else localStorage.setItem("motif-theme", theme);
            } catch { }
            show(theme);
            setOpen(false);
        });
    });

    button.addEventListener("click", e => { e.stopPropagation(); setOpen(!menu.classList.contains("open")); });
    document.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });
    // Another tab (this page or a tool) changed the theme
    window.addEventListener("storage", e => { if (e.key === "motif-theme") show(read()); });

    show(read());
})();
