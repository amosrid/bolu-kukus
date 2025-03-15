// Initialize AOS (Animation On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: window.innerWidth < 768 // Disable animations on mobile for better performance
    });

    // Add scroll event to change navbar background
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.97)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== '') {
                e.preventDefault();

                const hash = this.hash;
                const targetElement = document.querySelector(hash);
                
                if (targetElement) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Set minimum date for orders (tomorrow)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];

    // Handle WhatsApp messaging
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (button.getAttribute('href') && button.getAttribute('href').includes('wa.me')) {
            button.addEventListener('click', function(e) {
                // You can add analytics tracking here if needed
                // For example: trackEvent('WhatsApp', 'Click', 'Order Button');
            });
        }
    });

    // Mobile navigation menu close on click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }

    // Show "back to top" button when scrolling down
    const scrollThreshold = 300;
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.display = 'none';
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > scrollThreshold) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Add this to your CSS
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 100px;
            right: 25px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 99;
            opacity: 0.8;
            transition: opacity 0.3s, transform 0.3s;
        }
        .back-to-top:hover {
            opacity: 1;
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(style);
});

// Image placeholder function (creates a placeholder image with specified text)
function createImagePlaceholder(element, text) {
    if (!element) return;
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = element.offsetWidth || 300;
    canvas.height = element.offsetHeight || 200;
    
    // Draw background
    context.fillStyle = '#FFF3E0';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw text
    context.font = 'bold 14px Poppins, sans-serif';
    context.fillStyle = '#D35400';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text || 'Bolu Bu Mei Image', canvas.width / 2, canvas.height / 2);
    
    // Set as background
    element.src = canvas.toDataURL();
}

// Handle missing images
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            const alt = this.getAttribute('alt') || 'Image';
            createImagePlaceholder(this, `${alt} (Placeholder)`);
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Detect mobile devices
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile) {
        // Replace AOS with simpler mobile animations
        const fadeElements = document.querySelectorAll('[data-aos]');
        fadeElements.forEach(el => {
            el.classList.add('fade-up-mobile');
            el.removeAttribute('data-aos');
        });
        
        // Simple scroll-based animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {threshold: 0.1});
        
        document.querySelectorAll('.fade-up-mobile').forEach(el => {
            observer.observe(el);
        });
        
        // Add padding for sticky CTA if present
        if (document.querySelector('.mobile-sticky-cta')) {
            document.body.classList.add('has-sticky-cta');
        }
    } else {
        // Initialize AOS for desktop
        AOS.init({
            duration: 800,
            offset: 100,
            once: true
        });
    }
});