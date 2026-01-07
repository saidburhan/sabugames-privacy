// Sabu Games Portfolio Scripts

document.addEventListener('DOMContentLoaded', () => {

    // Header Scroll Effect
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        if (scrolled < 300) {
            header.style.opacity = 1 - (scrolled / 300);
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the item is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before the bottom
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Remove the transition delay after the entrance animation completes
                // so it doesn't affect hover interactions later.
                const delay = parseFloat(entry.target.style.transitionDelay) || 0;
                setTimeout(() => {
                    entry.target.style.transitionDelay = '0s';
                }, delay + 1000); // Wait for delay + approx animation time

                // Optional: Stop observing once revealed to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        // Optional: Add a slight delay for staggered effect on initial load
        item.style.transitionDelay = `${index * 100}ms`;
        observer.observe(item);
    });

    console.log("Portfolio & Animations loaded successfully!");
});
