/* ========================================
   JJ's BAKESHOP - MAIN JAVASCRIPT
   Features: Mobile Menu, Menu Filtering,
   Open Status, Animations, Form Handling
   ======================================== */

// ========================================
// 1. WAIT FOR DOM TO LOAD
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 2. MOBILE MENU TOGGLE
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            
            // Change hamburger icon to X when open
            if (navLinks.classList.contains('open')) {
                menuToggle.textContent = '✕';
                menuToggle.setAttribute('aria-label', 'Close navigation menu');
            } else {
                menuToggle.textContent = '☰';
                menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            }
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                if (menuToggle) {
                    menuToggle.textContent = '☰';
                    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
                }
            }
        });
    });
    
    // ========================================
    // 3. HEADER SCROLL EFFECT
    // ========================================
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ========================================
    // 4. SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========================================
    // 5. MENU CATEGORY FILTERING (TABS)
    // ========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (tabButtons.length > 0 && menuItems.length > 0) {
        
        // Set initial state - show all items with animation
        menuItems.forEach(item => {
            item.style.display = 'block';
        });
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Filter menu items
                menuItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (category === 'all' || itemCategory === category) {
                        // Show item with animation
                        item.style.display = 'block';
                        item.style.animation = 'none';
                        // Trigger reflow for animation restart
                        item.offsetHeight;
                        item.style.animation = 'fadeInUp 0.5s ease both';
                    } else {
                        // Hide item
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // ========================================
    // 6. OPEN / CLOSED STATUS BADGE
    // ========================================
    const openStatus = document.getElementById('openStatus');
    
    if (openStatus) {
        function updateOpenStatus() {
            const now = new Date();
            const day = now.getDay(); // 0 = Sunday, 1 = Monday, ...
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const time = hours + minutes / 60;
            
            // Business hours
            // Monday - Friday: 6:00 AM - 6:00 PM
            // Saturday: 7:00 AM - 5:00 PM
            // Sunday: 8:00 AM - 2:00 PM
            let isOpen = false;
            
            if (day >= 1 && day <= 5) { // Monday - Friday
                if (time >= 6 && time < 18) isOpen = true;
            } else if (day === 6) { // Saturday
                if (time >= 7 && time < 17) isOpen = true;
            } else if (day === 0) { // Sunday
                if (time >= 8 && time < 14) isOpen = true;
            }
            
            const dot = openStatus.querySelector('.status-dot');
            const text = openStatus.querySelector('.status-text');
            
            if (isOpen) {
                dot.className = 'status-dot open';
                text.textContent = "We're Open! 🎉";
            } else {
                dot.className = 'status-dot closed';
                text.textContent = "Sorry, We're Closed 😴";
            }
        }
        
        // Update immediately and then every minute
        updateOpenStatus();
        setInterval(updateOpenStatus, 60000);
    }
    
    // ========================================
    // 7. CONTACT FORM HANDLING
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const subject = document.getElementById('subject')?.value || '';
            const message = document.getElementById('message')?.value || '';
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields (Name, Email, and Message).');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message with engaging animation
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending... ✉️';
            
            // Simulate sending (in real project, you'd send to a server)
            setTimeout(() => {
                // Success message
                submitBtn.textContent = '✅ Message Sent!';
                submitBtn.style.background = '#4CAF50';
                submitBtn.style.borderColor = '#4CAF50';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.disabled = false;
                }, 3000);
                
                // Show celebration animation
                showCelebration();
                
            }, 1500);
        });
    }
    
    // ========================================
    // 8. CELEBRATION ANIMATION (Confetti Effect)
    // ========================================
    function showCelebration() {
        const colors = ['#D4A76A', '#8B6B4A', '#FFF8F0', '#5C3D2E', '#E8C99B'];
        const container = document.body;
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                pointer-events: none;
                z-index: 9999;
                animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
                animation-delay: ${Math.random() * 0.5}s;
                transform: rotate(${Math.random() * 360}deg);
            `;
            container.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }
    }
    
    // Add confetti keyframes if not already present
    if (!document.getElementById('confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(0) rotate(0deg) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ========================================
    // 9. STAT COUNTER ANIMATION (Fun Facts)
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        // Use Intersection Observer to trigger animation when visible
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const text = statNumber.textContent;
                    
                    // Only animate if it contains a number
                    if (/\d/.test(text)) {
                        const targetNumber = parseInt(text.replace(/\D/g, ''));
                        const suffix = text.replace(/[0-9]/g, '');
                        
                        // Skip if already animated
                        if (statNumber.dataset.animated) return;
                        statNumber.dataset.animated = true;
                        
                        animateCounter(statNumber, targetNumber, suffix);
                    }
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    function animateCounter(element, target, suffix) {
        let current = 0;
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = target / steps;
        let step = 0;
        
        const timer = setInterval(() => {
            step++;
            current += increment;
            
            if (step >= steps) {
                current = target;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(current) + suffix;
        }, duration / steps);
    }
    
    // ========================================
    // 10. IMAGE LIGHTBOX (Click to enlarge)
    // ========================================
    const productImages = document.querySelectorAll('.product-card img, .menu-item img, .team-member img');
    
    if (productImages.length > 0) {
        productImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                createLightbox(this.src);
            });
        });
    }
    
    function createLightbox(imageSrc) {
        // Check if lightbox already exists
        if (document.querySelector('.lightbox-overlay')) return;
        
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(44, 24, 16, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            animation: zoomIn 0.4s ease;
        `;
        
        overlay.appendChild(img);
        document.body.appendChild(overlay);
        
        // Close on click
        overlay.addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                if (document.querySelector('.lightbox-overlay')) {
                    document.body.removeChild(overlay);
                }
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }
    
    // Add lightbox animation keyframes
    if (!document.getElementById('lightbox-styles')) {
        const style = document.createElement('style');
        style.id = 'lightbox-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes zoomIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ========================================
    // 11. BACK TO TOP BUTTON
    // ========================================
    // Create back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gold, #D4A76A);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(212, 167, 106, 0.4);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        z-index: 1000;
    `;
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
        this.style.boxShadow = '0 8px 30px rgba(212, 167, 106, 0.6)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 20px rgba(212, 167, 106, 0.4)';
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
            backToTop.style.transform = 'translateY(20px)';
        }
    });
    
    // ========================================
    // 12. TYPEWRITER EFFECT FOR HERO TAGLINE
    // ========================================
    const tagline = document.querySelector('.hero-content .tagline');
    
    if (tagline) {
        const originalText = tagline.textContent;
        tagline.textContent = '';
        
        let charIndex = 0;
        const typingSpeed = 80;
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                tagline.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        // Start typing when hero is visible
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.disconnect();
                }
            });
        });
        
        observer.observe(tagline);
    }
    
    // ========================================
    // 13. SCROLL REVEAL ANIMATIONS
    // ========================================
    const revealElements = document.querySelectorAll('.product-card, .value-card, .team-member, .menu-item, .timeline-item');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    // Add delay based on index for staggered effect
                    const delay = index * 0.1;
                    element.style.animationDelay = delay + 's';
                    element.style.animation = 'fadeInUp 0.6s ease both';
                    revealObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            element.style.opacity = '0';
            revealObserver.observe(element);
        });
    }
    
    // ========================================
    // 14. ACTIVE NAV LINK HIGHLIGHTING
    // ========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ========================================
    // 15. CONSOLE WELCOME MESSAGE
    // ========================================
    console.log('%c 🍞 JJ\'s Bakeshop 🥖 ', 'font-size: 24px; font-weight: bold; color: #D4A76A;');
    console.log('%c Freshly baked with love since 2009 ❤️', 'font-size: 14px; color: #8B6B4A;');
    console.log('%c Thanks for visiting our website!', 'font-size: 12px; color: #5C3D2E;');
    
    console.log('📋 Quick Tips:');
    console.log('  📱 Toggle mobile menu with the ☰ button');
    console.log('  🔍 Filter menu items with the category tabs');
    console.log('  🖱️ Click any image to enlarge it');
    console.log('  ⬆️ Use the back-to-top button when scrolling');
    
}); // End of DOMContentLoaded