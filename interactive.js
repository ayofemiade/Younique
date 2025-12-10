document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animated counter for statistics
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        let count = 0;
        const increment = target / 200;
        
        function updateCount() {
            if(count < target) {
                count += increment;
                el.innerText = Math.ceil(count);
                setTimeout(updateCount, 10);
            } else {
                el.innerText = target;
            }
        }
        
        updateCount();
    }

    // Intersection Observer for animated counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(counter => {
        observer.observe(counter);
    });

    // Property image zoom effect
    const propertyImages = document.querySelectorAll('.property img');
    propertyImages.forEach(img => {
        img.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        img.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Animated testimonial slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const totalTestimonials = testimonials.length;

    function showTestimonial(index) {
        testimonials.forEach(t => t.style.display = 'none');
        testimonials[index].style.display = 'block';
        testimonials[index].style.opacity = 0;
        setTimeout(() => {
            testimonials[index].style.transition = 'opacity 0.5s ease';
            testimonials[index].style.opacity = 1;
        }, 50);
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }

    if (testimonials.length > 0) {
        showTestimonial(0);
        setInterval(nextTestimonial, 5000);
    }
});

