// scripts.js - Secrets of Karakum

document.addEventListener('DOMContentLoaded', function () {
    // Example: Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Carousel functionality for tours section
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    if (carousel && prevBtn && nextBtn) {
        let autoScrollInterval;
        let cardWidth = carousel.querySelector('.tour-card')?.offsetWidth || 350;
        function updateCardWidth() {
            cardWidth = carousel.querySelector('.tour-card')?.offsetWidth || 350;
        }
        updateCardWidth();
        window.addEventListener('resize', updateCardWidth);

        function scrollCarousel(direction = 1) {
            updateCardWidth();
            const maxScroll = carousel.scrollWidth - carousel.offsetWidth;
            let scrollAmount = carousel.scrollLeft + direction * cardWidth;
            if (scrollAmount < 0) scrollAmount = 0;
            if (scrollAmount > maxScroll) scrollAmount = 0; // loop to start
            carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }

        prevBtn.addEventListener('click', function () {
            scrollCarousel(-1);
        });
        nextBtn.addEventListener('click', function () {
            scrollCarousel(1);
        });

        // Auto-scroll every 2 seconds
        autoScrollInterval = setInterval(() => {
            scrollCarousel(1);
        }, 2000);

        // Pause auto-scroll on hover
        carousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
        carousel.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(() => {
                scrollCarousel(1);
            }, 2000);
        });
    }

    // Burger menu functionality
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');

    function openMenu() {
        navLinks.classList.add('open');
        burger.classList.add('open');
        if (navOverlay) navOverlay.classList.add('open');
        burger.setAttribute('aria-label', 'Close navigation menu');
    }

    function closeMenu() {
        navLinks.classList.remove('open');
        burger.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('open');
        burger.setAttribute('aria-label', 'Open navigation menu');
    }

    if (burger && navLinks) {
        burger.addEventListener('click', function () {
            navLinks.classList.contains('open') ? closeMenu() : openMenu();
        });
        if (navOverlay) {
            navOverlay.addEventListener('click', closeMenu);
        }
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
});
