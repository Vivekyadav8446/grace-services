// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const inner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        
        let currentIndex = 0;
        const itemWidth = items[0].clientWidth;
        const totalItems = items.length;
        
        function updateCarousel() {
            inner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            
            // Update active class
            items.forEach((item, index) => {
                item.classList.toggle('active', index === currentIndex);
            });
        }
        
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        });
        
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        });
        
        // Auto-rotate carousel
        let carouselInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 5000);
        
        // Pause on hover
        carousel.addEventListener('mouseenter', function() {
            clearInterval(carouselInterval);
        });
        
        carousel.addEventListener('mouseleave', function() {
            carouselInterval = setInterval(function() {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel();
            }, 5000);
        });
        
        // Initialize
        updateCarousel();
    }
});