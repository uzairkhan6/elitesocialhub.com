// Initialize Intersection Observer for Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    
    // Select all elements that have the 'fade-in' class
    const observerElements = document.querySelectorAll('.fade-in');
    
    // Configuration for the observer
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };
    
    // Create the observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger animation
                entry.target.classList.add('visible');
                // Unobserve after animating once to keep performance optimal
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each element
    observerElements.forEach(element => {
        observer.observe(element);
    });

    // Form submission handling (preventing page bounce for the demo)
    const form = document.getElementById('consultation-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            // Loading state
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
            btn.style.opacity = '0.8';
            btn.disabled = true;
            
            // Simulate API call and success response
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Request Received';
                btn.style.backgroundColor = 'var(--color-gold)';
                btn.style.color = 'var(--color-black)';
                btn.style.opacity = '1';
                
                // Clear form
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = 'transparent';
                    btn.style.color = 'var(--color-gold)';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
