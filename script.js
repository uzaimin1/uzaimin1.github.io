// ============================================
// FEATHER ICONS INITIALIZATION
// ============================================

feather.replace();

// ============================================
// TYPING ANIMATION
// ============================================

const typingText = document.getElementById('typing-text');
const titles = [
    'IT Systems Engineer',
    'Infrastructure Specialist',
    'Operations Specialist'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;
let deleteSpeed = 50;
let pauseTime = 2000;

function typeAnimation() {
    const currentTitle = titles[titleIndex];

    if (!isDeleting) {
        // Typing
        if (charIndex < currentTitle.length) {
            typingText.textContent += currentTitle[charIndex];
            charIndex++;
            setTimeout(typeAnimation, typeSpeed);
        } else {
            // Pause before deleting
            isDeleting = true;
            setTimeout(typeAnimation, pauseTime);
        }
    } else {
        // Deleting
        if (charIndex > 0) {
            typingText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeAnimation, deleteSpeed);
        } else {
            // Move to next title
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(typeAnimation, 500);
        }
    }
}

// Start typing animation when page loads
if (typingText) {
    setTimeout(typeAnimation, 500);
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Toggle hamburger icon
    const icon = menuToggle.querySelector('svg');
    if (navMenu.classList.contains('active')) {
        menuToggle.innerHTML = '<i data-feather="x"></i>';
    } else {
        menuToggle.innerHTML = '<i data-feather="menu"></i>';
    }
    feather.replace();
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i data-feather="menu"></i>';
        feather.replace();
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i data-feather="menu"></i>';
        feather.replace();
    }
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================

const sections = document.querySelectorAll('section[id]');
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Add shadow to header on scroll
    if (scrollY > 0) {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill items and project cards
document.querySelectorAll('.skill-item, .project-card, .cert-item, .degree-item').forEach(el => {
    observer.observe(el);
});

// ============================================
// SKILL BARS ANIMATION
// ============================================

const skillBars = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ============================================
// CONTACT FORM SUBMISSION
// ============================================

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }

        // Show sending state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Build form data to send to Hostinger PHP
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('subject', subject);
            formData.append('message', message);

            const response = await fetch('https://uzeetechnology.com/send_mail.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                showFormMessage('✓ Message sent! I\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
            } else {
                showFormMessage('✗ ' + result.message, 'error');
            }
        } catch (error) {
            showFormMessage('✗ Something went wrong. Please email me directly at usaimin@uzeetechnology.com', 'error');
        } finally {
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Clear message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// FLOATING CARDS PARALLAX EFFECT
// ============================================

const floatingCards = document.querySelectorAll('.floating-card');

if (floatingCards.length > 0) {
    window.addEventListener('scroll', () => {
        floatingCards.forEach((card, index) => {
            const scrollY = window.scrollY;
            const speed = 0.5 + (index * 0.1);
            card.style.transform = `translateY(calc(-${scrollY * speed}px))`;
        });
    });
}

// ============================================
// LAZY LOAD IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================

document.addEventListener('keydown', (e) => {
    // Press 'S' to scroll to skills section
    if (e.key === 's' || e.key === 'S') {
        if (!document.activeElement.matches('input, textarea')) {
            const skillsSection = document.getElementById('skills');
            skillsSection?.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ============================================
// PERFORMANCE: DEFER NON-CRITICAL RENDERING
// ============================================

window.addEventListener('load', () => {
    // Add animations after page load
    document.body.classList.add('loaded');
});

// ============================================
// CONSOLE GREETING
// ============================================

console.log(
    '%c👋 Welcome to Mohamed Usaimin\'s Portfolio',
    'color: #3b82f6; font-size: 16px; font-weight: bold;'
);
console.log(
    '%cIT Systems Engineer | Infrastructure & Operations',
    'color: #475569; font-size: 12px;'
);
console.log(
    '%cLooking to build scalable, secure infrastructure?',
    'color: #06b6d4; font-size: 11px;'
);
console.log('%cEmail: mohamedusaimin@outlook.com', 'color: #3b82f6; font-size: 11px;');