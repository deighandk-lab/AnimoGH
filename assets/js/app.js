// ==========================================
// Navbar Scroll Effect
// ==========================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ==========================================
// Mobile Navigation
// ==========================================

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("mobile-open");
        menuToggle.setAttribute("aria-expanded", navMenu.classList.contains("mobile-open"));
    });

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("mobile-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}