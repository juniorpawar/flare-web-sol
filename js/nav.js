document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Initially hide the mobile menu
    mobileMenu.style.display = 'none';

    mobileMenuButton.addEventListener('click', () => {
        const isMenuOpen = mobileMenu.style.display === 'block';

        if (isMenuOpen) {
            mobileMenu.style.display = 'none';
        } else {
            mobileMenu.style.display = 'block';
        }
    });

    // Optional: Hide the mobile menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            mobileMenu.style.display = 'none';
        }
    });
});