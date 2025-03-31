

document.addEventListener('DOMContentLoaded', () => {
    // Update cart functionality
let cartItems = JSON.parse(localStorage.getItem('cart')) || 0;

function addToCart() {
    cartItems++;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
    showAddedAnimation();
}

function updateCartCount() {
    const cartCounts = document.querySelectorAll('.cart-count');
    cartCounts.forEach(count => {
        count.textContent = cartItems;
    });
}

function showAddedAnimation() {
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.classList.add('pulse');
    setTimeout(() => cartIcon.classList.remove('pulse'), 300);
}
    updateCartCount();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .delivery-card').forEach(element => {
        observer.observe(element);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Auto Slideshow
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
    // Hide all slides
    slides.forEach(slide => slide.style.opacity = 0);
    
    // Show current slide
    slides[slideIndex].style.opacity = 1;
    
    // Move to next slide
    slideIndex = (slideIndex + 1) % slides.length;
    
    // Change image every 5 seconds
    setTimeout(showSlides, 5000);
}

// Initialize slideshow
showSlides();



let currentIndex = 1; // Start with middle item
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function updateCarousel() {
    items.forEach((item, index) => {
        item.classList.remove('active', 'previous', 'next');
        
        if(index === currentIndex) {
            item.classList.add('active');
        } else if(index === (currentIndex - 1 + totalItems) % totalItems) {
            item.classList.add('previous');
        } else if(index === (currentIndex + 1) % totalItems) {
            item.classList.add('next');
        }
    });
}

function rotateCarousel() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
}

// Auto-rotate every 4 seconds
let carouselInterval = setInterval(rotateCarousel, 4000);

// Pause on hover
document.querySelector('.carousel-wrapper').addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

document.querySelector('.carousel-wrapper').addEventListener('mouseleave', () => {
    carouselInterval = setInterval(rotateCarousel, 4000);
});

// Initialize
updateCarousel();

});