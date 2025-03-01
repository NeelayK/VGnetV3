// Function to check if an element is in the viewport
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}

// Function to add the 'visible' class to elements when they come into the viewport
function handleScroll() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(el => {
        if (isInViewport(el)) {
            el.classList.add('visible');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', handleScroll);

// Trigger the function on page load in case elements are already in view
document.addEventListener('DOMContentLoaded', handleScroll);
