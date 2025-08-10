// Get the button and menu elements
const button = document.getElementById('mobile-menu-button');
const menu = document.getElementById('mobile-menu');
const hamburgerIcon = button.querySelector('svg:first-child');
const closeIcon = button.querySelector('svg:last-child');

// Initially hide the mobile menu
menu.style.display = 'none';
closeIcon.style.display = 'none';

// Add click event listener to the button
button.addEventListener('click', () => {
    const isMenuOpen = menu.style.display === 'block';

    if (isMenuOpen) {
        // Close the menu
        menu.style.display = 'none';
        hamburgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    } else {
        // Open the menu
        menu.style.display = 'block';
        hamburgerIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    }
});

// Optional: Hide the mobile menu if the window is resized to a desktop size
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) { // The 'md' breakpoint in Tailwind is 768px
        hamburgerIcon.style.display = 'block';
        menu.style.display = 'none';
        closeIcon.style.display = 'none';
    }
});