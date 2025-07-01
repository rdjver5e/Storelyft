// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');

    // Check if elements exist before adding event listeners
    if (!mobileMenuToggle || !mobileMenu || !mobileMenuOverlay || !mobileClose) {
        console.error('Mobile menu elements not found');
        return;
    }

    // Open mobile menu
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close mobile menu function
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close menu when clicking the X button
    mobileClose.addEventListener('click', function(e) {
        e.preventDefault();
        closeMobileMenu();
    });

    // Close menu when clicking the overlay
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });

    // Close menu when clicking on navigation links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close menu on escape key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Handle window resize - close mobile menu if window becomes large
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 769 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});





// Stats Counter Animation
document.addEventListener('DOMContentLoaded', function() {
    const statsData = [
        { selector: '.stat:nth-child(1) .value', target: 250, suffix: '%' },
        { selector: '.stat:nth-child(2) .value', target: 2.4, prefix: '$', suffix: 'M+', isDecimal: true },
        { selector: '.stat:nth-child(3) .value', target: 48, suffix: 'hrs' }
    ];
    
    let animated = false;
    
    function animateCounter(element, config, duration = 5000) {
        const { target, prefix = '', suffix = '', isDecimal = false } = config;
        let start = 0;
        const increment = isDecimal ? 0.1 : (target > 100 ? Math.ceil(target / 50) : 1);
        const stepTime = Math.abs(Math.floor(duration / (target / increment)));
        
        const timer = setInterval(() => {
            start += increment;
            
            if (start >= target) {
                element.textContent = prefix + target + suffix;
                clearInterval(timer);
            } else {
                const displayValue = isDecimal ? start.toFixed(1) : Math.floor(start);
                element.textContent = prefix + displayValue + suffix;
            }
        }, stepTime);
    }
    
    function checkAndAnimate() {
        if (animated) return;
        const statsSection = document.querySelector('.stats');
        if (statsSection && isElementInViewport(statsSection)) {
            animated = true;
            
            statsData.forEach(config => {
                const element = document.querySelector(config.selector);
                if (element) {
                    const startValue = config.prefix + '0' + config.suffix;
                    element.textContent = startValue;
                    animateCounter(element, config);
                }
            });
        }
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Start checking
    window.addEventListener('scroll', checkAndAnimate);
    checkAndAnimate(); // Check on load
});
