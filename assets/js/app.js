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
    }, { passive: true });
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
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");

        if (isOpen) {
            navMenu.style.display = "flex";
            navMenu.style.position = "absolute";
            navMenu.style.top = "calc(100% + 12px)";
            navMenu.style.left = "0";
            navMenu.style.right = "0";
            navMenu.style.flexDirection = "column";
            navMenu.style.gap = "0";
            navMenu.style.padding = "12px";
            navMenu.style.background = "rgba(17,17,17,.98)";
            navMenu.style.backdropFilter = "blur(20px)";
            navMenu.style.borderRadius = "16px";
            navMenu.style.border = "1px solid rgba(255,255,255,.12)";
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
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        if (window.innerWidth <= 900) {
            navMenu.style.display = "none";
        }
    }
}

/* Service-aware quotation form and privacy-safe interaction events */
const quoteService = document.querySelector('#quote-service');
function trackAnimoEvent(name, details) {
    if (typeof window.gtag === 'function') window.gtag('event', name, details);
}
if (quoteService) {
    const form = quoteService.closest('form');
    const groups = form.querySelectorAll('[data-quote-group]');
    const updateQuote = () => {
        const service = quoteService.value;
        const active = ['Printing','Branding & Apparel','Vehicle Branding'].includes(service) ? 'print' :
            service === 'Web & App Development' ? 'web' :
            service === 'Digital Marketing & Design' ? 'marketing' : '';
        groups.forEach(group => {
            const show = group.dataset.quoteGroup === active;
            group.hidden = !show;
            group.querySelectorAll('input,select,textarea').forEach(field => field.disabled = !show);
        });
    };
    quoteService.addEventListener('change', updateQuote);
    updateQuote();
    form.addEventListener('submit', () => trackAnimoEvent('quote_submit_attempt', {service_category: quoteService.value}));
}
const whatsapp = document.createElement('a');
whatsapp.className = 'floating-whatsapp';
whatsapp.href = 'https://wa.me/27687143564?text=' + encodeURIComponent('Hi Animo! I would like to enquire about your services.');
whatsapp.setAttribute('aria-label','Chat with Animo on WhatsApp');
whatsapp.textContent = 'WhatsApp';
document.body.appendChild(whatsapp);
document.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (link && link.href.startsWith('https://wa.me/')) trackAnimoEvent('whatsapp_click', {placement: link.classList.contains('floating-whatsapp') ? 'floating' : 'page'});
});
