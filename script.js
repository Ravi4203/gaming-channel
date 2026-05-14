// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themes = ['inferno', 'ocean', 'forest', 'cyber'];
let currentThemeIndex = 0;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('selectedTheme');
if (savedTheme) {
    document.body.className = savedTheme;
    currentThemeIndex = themes.indexOf(savedTheme.replace('theme-', ''));
}

themeToggle.addEventListener('click', () => {
    // Remove current theme
    document.body.classList.remove(`theme-${themes[currentThemeIndex]}`);
    
    // Move to next theme
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    
    // Apply new theme
    const newTheme = themes[currentThemeIndex];
    document.body.classList.add(`theme-${newTheme}`);
    
    // Save to localStorage
    localStorage.setItem('selectedTheme', `theme-${newTheme}`);
    
    // Add animation effect
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
    
    // Update theme toggle icon based on theme
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    const icons = {
        'inferno': 'fas fa-fire',
        'ocean': 'fas fa-water',
        'forest': 'fas fa-leaf',
        'cyber': 'fas fa-microchip'
    };
    
    icon.className = icons[theme] || 'fas fa-palette';
}

// Initialize theme icon
updateThemeIcon(themes[currentThemeIndex]);

// News Modal Functionality
const exploreNewsBtn = document.getElementById('exploreNewsBtn');
const newsModal = document.getElementById('newsModal');
const closeModal = document.getElementById('closeModal');
const categoryTabs = document.querySelectorAll('.category-tab');
const categoryPanels = document.querySelectorAll('.category-panel');

// Open modal when Explore News button is clicked
exploreNewsBtn.addEventListener('click', () => {
    newsModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

// Close modal when close button is clicked
closeModal.addEventListener('click', () => {
    newsModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// Close modal when clicking outside the modal content
newsModal.addEventListener('click', (e) => {
    if (e.target === newsModal) {
        newsModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && newsModal.classList.contains('active')) {
        newsModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Category tab switching
categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetCategory = tab.getAttribute('data-category');
        
        // Remove active class from all tabs and panels
        categoryTabs.forEach(t => t.classList.remove('active'));
        categoryPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding panel
        tab.classList.add('active');
        document.getElementById(targetCategory).classList.add('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Simple validation
        if (email && email.includes('@')) {
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Add loading animation to news cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe news cards for animation
document.querySelectorAll('.news-card, .news-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add hover effect to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mouseenter', () => {
        ctaButton.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    ctaButton.addEventListener('mouseleave', () => {
        ctaButton.style.transform = 'translateY(0) scale(1)';
    });
}

// Add scroll reveal animation for sections
const revealSections = document.querySelectorAll('.featured-news, .latest-news, .newsletter');

const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
});

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// Add current year to footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = `&copy; ${currentYear} Ravi Tech. All rights reserved.`;
}

// Profile Modal Functionality
const profilePicNav = document.getElementById('profilePicNav');
const profileModal = document.getElementById('profileModal');
const closeProfileModal = document.getElementById('closeProfileModal');

if (profilePicNav && profileModal && closeProfileModal) {
    profilePicNav.addEventListener('click', () => {
        profileModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    closeProfileModal.addEventListener('click', () => {
        profileModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    profileModal.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            profileModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && profileModal.classList.contains('active')) {
            profileModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
} 