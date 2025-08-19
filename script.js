// Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[n].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Show first slide immediately
    showSlide(currentSlide);
    
    // Change slide every 2 seconds
    setInterval(nextSlide, 2000);
    
    // Registration form submission
    if (document.getElementById('registrationForm')) {
        document.getElementById('registrationForm').addEventListener('submit', submitForm);
    }
});

// Form Submission Function
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const formObject = {};
    
    // Convert FormData to object
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Format the email content
    const emailSubject = `New Patient Registration: ${formObject.fullName}`;
    let emailBody = `New Patient Registration Details:\n\n`;
    
    for (const [key, value] of Object.entries(formObject)) {
        if (value) {
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            emailBody += `${label}: ${value}\n`;
        }
    }
    
    // Create mailto link
    const mailtoLink = `mailto:primexhospital2000@yahoo.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Optional: Show confirmation message
    alert('Thank you for your registration. Your information is being sent to our team. Please complete the process by sending the email that will open.');
    
    // Optional: Reset form
    form.reset();
}

// Add this to your existing script.js file
function initGallery() {
    // Lightbox functionality can be added here if desired
    console.log("Gallery initialized");
}

// Call this in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Your existing code
    
    // Initialize gallery if on gallery page
    if (document.querySelector('.gallery-section')) {
        initGallery();
    }
});

// Load Google Maps iframe only when needed
document.addEventListener('DOMContentLoaded', function() {
    const maps = document.querySelectorAll('.google-map');
    
    // Only for browsers that support IntersectionObserver
    if ('IntersectionObserver' in window) {
        const lazyMapObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    iframe.src = iframe.dataset.src;
                    lazyMapObserver.unobserve(iframe);
                }
            });
        });

        maps.forEach(function(map) {
            map.dataset.src = map.src;
            map.removeAttribute('src');
            lazyMapObserver.observe(map);
        });
    }
});