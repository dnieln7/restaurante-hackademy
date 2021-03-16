document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(entries => {
        document.querySelector(".app-bar").classList.toggle("darken-background", entries[0].intersectionRatio < 0.9);
        document.querySelector(".nav-icon").classList.toggle("lighten-foreground", entries[0].intersectionRatio < 0.9);
    }, {threshold: 0.9});
    observer.observe(document.querySelector(".banner-container"));
});
