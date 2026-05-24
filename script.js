document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.custom-cursor-follower');
    
    // Only run cursor logic if the elements exist (desktop)
    if (cursor && cursorFollower && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            
            // Add a slight delay for the follower for smooth effect
            setTimeout(() => {
                cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }, 200);
        });

        // Add hover effect to clickable elements
        const clickables = document.querySelectorAll('a, button, input, textarea');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    // 2. Scroll Animations (Intersection Observer)
    const fadeUpElements = document.querySelectorAll('.fade-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    fadeUpElements.forEach(el => {
        observer.observe(el);
    });

    // 3. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 5. REAL Form Submission with EmailJS

emailjs.init("hRphWb767WfJW3q_Z"); // Initialize EmailJS with your public key

const form = document.getElementById('inquiryForm');

if (form) {

    form.addEventListener('submit', (e) => {

        e.preventDefault();

        const btn = form.querySelector('button');

        const originalText = btn.innerText;

        btn.innerText = 'Sending...';

        btn.style.background = 'transparent';
        btn.style.border = '1px solid var(--neon-lime)';
        btn.style.color = 'var(--neon-lime)';

        emailjs.sendForm(
            'service_86g4psf',
            'template_ibbftqf',
            form
        )

        .then(() => {

            btn.innerText = 'Message Sent ✓';

            form.reset();

            setTimeout(() => {

                btn.innerText = originalText;

                btn.style = '';

            }, 3000);

        })

        .catch((error) => {

            console.log(error);

            btn.innerText = 'Failed ❌';

            setTimeout(() => {

                btn.innerText = originalText;

                btn.style = '';

            }, 3000);

        });

    });

}
});