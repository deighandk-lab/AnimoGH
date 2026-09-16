// ==========================================
// Navbar Scroll Effect
// ==========================================

const navbar = document.querySelector(".navbar");

if (navbar) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

// ==========================================
// Mobile Navigation
// ==========================================

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
    const navId = "primary-navigation";
    navMenu.id = navId;
    menuToggle.setAttribute("aria-controls", navId);
    menuToggle.setAttribute("aria-expanded", "false");

    const syncMenuForViewport = () => {
        if (window.innerWidth > 900) {
            closeMobileMenu();
            navMenu.style.display = "flex";
            navMenu.style.position = "static";
            navMenu.style.flexDirection = "row";
            navMenu.style.gap = "34px";
            navMenu.style.padding = "0";
            navMenu.style.background = "transparent";
            navMenu.style.backdropFilter = "none";
            navMenu.style.border = "0";
            navMenu.style.boxShadow = "none";
        } else if (!navMenu.classList.contains("mobile-open")) {
            navMenu.style.display = "none";
        }
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("mobile-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));

        if (isOpen) {
            navMenu.style.display = "flex";
            navMenu.style.position = "absolute";
            navMenu.style.top = "calc(100% + 12px)";
            navMenu.style.left = "0";
            navMenu.style.right = "0";
            navMenu.style.flexDirection = "column";
            navMenu.style.gap = "0";
            navMenu.style.padding = "12px";
            navMenu.style.background = "rgba(11,31,58,.97)";
            navMenu.style.backdropFilter = "blur(20px)";
            navMenu.style.borderRadius = "16px";
            navMenu.style.border = "1px solid rgba(255,255,255,.1)";
            navMenu.style.boxShadow = "0 20px 45px rgba(0,0,0,.2)";
        } else {
            closeMobileMenu();
        }
    });

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && navMenu.classList.contains("mobile-open")) {
            closeMobileMenu();
            menuToggle.focus();
        }
    });

    window.addEventListener("resize", syncMenuForViewport);
    syncMenuForViewport();

    function closeMobileMenu() {
        navMenu.classList.remove("mobile-open");
        menuToggle.setAttribute("aria-expanded", "false");
        if (window.innerWidth <= 900) {
            navMenu.style.display = "none";
        }
    }
}
