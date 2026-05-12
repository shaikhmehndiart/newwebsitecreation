// ========================================
// TEHSIM SHAIKH - PORTFOLIO WEBSITE SCRIPTS
// ========================================

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Typing Effect
const words = ['Digital Dreams', 'Amazing Websites', 'Online Stores', 'Business Portals', 'Your Vision'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + (target === 100 ? '%' : '+');
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        });

        observer.observe(counter);
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg', 'shadow-black/10');
    } else {
        navbar.classList.remove('shadow-lg', 'shadow-black/10');
    }

    if (window.scrollY > 500) {
        backToTop.classList.remove('translate-y-20', 'opacity-0');
    } else {
        backToTop.classList.add('translate-y-20', 'opacity-0');
    }

    reveal();
});

// Form Handling
function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const success = document.getElementById('formSuccess');

    btn.innerHTML = '<i class="fas fa-spinner fa-spin text-xl"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
        btn.classList.remove('from-indigo-500', 'via-purple-500', 'to-pink-500');
        btn.classList.add('bg-green-500');
        success.classList.remove('hidden');
        success.classList.add('animate-bounce-slow');

        setTimeout(() => {
            document.getElementById('contactForm').reset();
            btn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
            btn.disabled = false;
            btn.classList.add('from-indigo-500', 'via-purple-500', 'to-pink-500');
            btn.classList.remove('bg-green-500');
            success.classList.add('hidden');
            success.classList.remove('animate-bounce-slow');
        }, 4000);
    }, 2000);
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.getElementById('mobile-menu').classList.add('hidden');
        }
    });
});

// 3D Tilt Effect for Cards
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Initialize all functions when page loads
window.addEventListener('load', () => {
    typeEffect();
    reveal();
    animateCounters();
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('text-indigo-600', 'bg-indigo-50');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('text-indigo-600', 'bg-indigo-50');
        }
    });
});
