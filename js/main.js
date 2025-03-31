document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Typing animation
    if(document.querySelector('.typing-text')) {
        new Typed('.typing-text', {
            strings: ["Shiva", "Sharan", "Shrestha"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if(window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if(window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Initialize particles.js
    if(document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Animate skill circles
    const circles = document.querySelectorAll('.circle-progress');
    circles.forEach(circle => {
        const value = circle.getAttribute('data-value');
        const fill = circle.querySelector('.circle-fill');
        fill.style.strokeDasharray = `${value}, 100`;
    });
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Overlay menu toggle functionality
    const menuToggle = document.getElementById('menuToggle');
    const overlayMenu = document.getElementById('overlayMenu');

    menuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        overlayMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.overlay-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            overlayMenu.classList.remove('active');
        });
    });
});

// Intersection Observer for lazy loading
const lazyLoad = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '200px',
        threshold: 0.1
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        observer.observe(img);
    });
};

// Load non-critical resources after page load
window.addEventListener('load', () => {
    // Lazy load images
    lazyLoad();
    
    // Load non-critical CSS
    const nonCriticalCSS = document.createElement('link');
    nonCriticalCSS.rel = 'stylesheet';
    nonCriticalCSS.href = 'css/non-critical.css';
    document.head.appendChild(nonCriticalCSS);
    
    // Load non-critical JS
    const nonCriticalJS = document.createElement('script');
    nonCriticalJS.src = 'js/non-critical.js';
    document.body.appendChild(nonCriticalJS);
});

// Service Worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Advanced form handling
const advancedForm = document.getElementById('advancedForm');
if (advancedForm) {
    advancedForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Add submitting state
        advancedForm.classList.add('form-submitting');
        
        try {
            const formData = new FormData(advancedForm);
            const response = await fetch('https://api.example.com/contact', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                showFormFeedback('Message sent successfully!', 'success');
                advancedForm.reset();
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            showFormFeedback('Error sending message. Please try again.', 'error');
            console.error('Form submission error:', error);
        } finally {
            advancedForm.classList.remove('form-submitting');
        }
    });
}

function showFormFeedback(message, type) {
    const feedbackEl = document.querySelector('.form-feedback');
    if (!feedbackEl) return;
    
    feedbackEl.textContent = message;
    feedbackEl.className = `form-feedback feedback-${type}`;
    
    setTimeout(() => {
        feedbackEl.textContent = '';
        feedbackEl.className = 'form-feedback';
    }, 5000);
}