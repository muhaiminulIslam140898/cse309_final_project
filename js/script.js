// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Tab functionality for bookings page
const tabBtns = document.querySelectorAll('.tab-btn');
if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Here you would typically load the appropriate content
            // For now, we're just toggling the active class
        });
    });
}

// Form validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });
});

// Price range slider functionality
const priceSlider = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
if (priceSlider && priceValue) {
    priceSlider.addEventListener('input', function() {
        priceValue.textContent = this.value;
    });
}

// Worker filter functionality
const applyFiltersBtn = document.querySelector('.filters .btn-secondary');
if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', function() {
        // In a real app, this would filter the worker list
        alert('Filters applied! (This would filter workers in a real application)');
    });
}

// Login button functionality
const loginBtn = document.querySelector('.btn-login');
if (loginBtn) {
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real app, this would show a login modal or redirect
        alert('Login/Signup form would appear here in a real application');
    });
}

// Initialize date picker if on booking page
if (document.getElementById('booking-date')) {
    // Load Flatpickr from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.6.9/flatpickr.min.js';
    document.head.appendChild(script);
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.6.9/flatpickr.min.css';
    document.head.appendChild(link);
    
    script.onload = function() {
        flatpickr("#booking-date", {
            enableTime: true,
            dateFormat: "Y-m-d h:i K",
            minDate: "today",
            minTime: "09:00",
            maxTime: "20:00"
        });
    };
}

// Worker category display
if (document.getElementById('workers-container')) {
    // Get category from URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    // Update title based on category
    const categoryTitles = {
        'maid': 'Find Maid Services',
        'driver': 'Find Drivers',
        'electrician': 'Find Electricians',
        'plumber': 'Find Plumbers',
        'laborer': 'Find Day Laborers'
    };
    
    if (category && categoryTitles[category]) {
        document.getElementById('category-title').textContent = categoryTitles[category];
    }
    // ... (previous code remains the same until the worker data section)

    // Sample worker data (in a real app, this would come from an API)
    const workers = {
        maid: [
            {
                id: 1,
                name: "Ayesha Begum",
                skills: "Cleaning, Cooking, Laundry",
                location: "Dhaka",
                experience: "5 years",
                rate: 300,
                rating: 4.8,
                image: "images/maid.jpg"
            },
            {
                id: 2,
                name: "Fatema Akter",
                skills: "Cleaning, Childcare",
                location: "Chittagong",
                experience: "3 years",
                rate: 350,
                rating: 4.5,
                image: "images/maid2.jpg"
            }
        ],
        driver: [
            {
                id: 3,
                name: "Rahim Khan",
                skills: "Personal Driver, Route Planning",
                location: "Dhaka",
                experience: "7 years",
                rate: 500,
                rating: 4.7,
                image: "images/driver.jpg"
            },
            {
                id: 4,
                name: "Sakib Ahmed",
                skills: "Ride Sharing, Long Distance",
                location: "Sylhet",
                experience: "4 years",
                rate: 450,
                rating: 4.6,
                image: "images/driver2.jpg"
            }
        ],
        electrician: [
            {
                id: 5,
                name: "Karim Uddin",
                skills: "Wiring, Repairs, Installations",
                location: "Sylhet",
                experience: "8 years",
                rate: 400,
                rating: 4.9,
                image: "images/electrician.jpg"
            }
        ],
        plumber: [
            {
                id: 6,
                name: "Jamal Hossain",
                skills: "Pipe Repairs, Installations",
                location: "Dhaka",
                experience: "6 years",
                rate: 450,
                rating: 4.6,
                image: "images/plumber.jpg"
            }
        ],
        laborer: [
            {
                id: 7,
                name: "Salam Miah",
                skills: "General Help, Moving, Construction",
                location: "Chittagong",
                experience: "4 years",
                rate: 250,
                rating: 4.4,
                image: "images/laborer.jpg"
            },
            {
                id: 8,
                name: "Raju Ahmed",
                skills: "Construction, Loading/Unloading",
                location: "Dhaka",
                experience: "5 years",
                rate: 300,
                rating: 4.3,
                image: "images/laborer2.jpg"
            }
        ]
    };

    // Display workers based on category
    function displayWorkers() {
        const container = document.getElementById('workers-container');
        const workersToShow = category ? workers[category] : 
            [...workers.maid, ...workers.driver, ...workers.electrician, 
             ...workers.plumber, ...workers.laborer];
        
        container.innerHTML = '';
        
        if (workersToShow && workersToShow.length > 0) {
            workersToShow.forEach(worker => {
                container.innerHTML += `
                    <div class="worker-card">
                        <div class="worker-image">
                            <img src="${worker.image}" alt="${worker.name}">
                            <span class="rating">${worker.rating} <i class="fas fa-star"></i></span>
                        </div>
                        <div class="worker-info">
                            <h3>${worker.name}</h3>
                            <p class="skills">${worker.skills}</p>
                            <p class="location"><i class="fas fa-map-marker-alt"></i> ${worker.location}</p>
                            <p class="experience">${worker.experience} experience</p>
                            <p class="rate">৳${worker.rate}/hour</p>
                            <a href="booking.html?workerId=${worker.id}" class="btn-primary">Book Now</a>
                        </div>
                    </div>
                `;
            });
        } else {
            container.innerHTML = '<p class="no-workers">No workers found in this category.</p>';
        }
    }

    // Price range slider
    const priceSlider = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    
    priceSlider.addEventListener('input', function() {
        priceValue.textContent = this.value;
    });

    // Initial display
    displayWorkers();
}

// Booking page functionality
if (document.getElementById('booking-form')) {
    // Get worker ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const workerId = urlParams.get('workerId');

    // Sample worker data (in a real app, this would come from an API)
    const workers = {
        1: {
            name: "Ayesha Begum",
            service: "Maid Service",
            rate: 300,
            rating: 4.8,
            image: "images/maid.jpg"
        },
        2: {
            name: "Fatema Akter",
            service: "Maid Service",
            rate: 350,
            rating: 4.5,
            image: "images/maid2.jpg"
        },
        3: {
            name: "Rahim Khan",
            service: "Driver Service",
            rate: 500,
            rating: 4.7,
            image: "images/driver.jpg"
        },
        4: {
            name: "Sakib Ahmed",
            service: "Driver Service",
            rate: 450,
            rating: 4.6,
            image: "images/driver2.jpg"
        },
        5: {
            name: "Karim Uddin",
            service: "Electrician Service",
            rate: 400,
            rating: 4.9,
            image: "images/electrician.jpg"
        },
        6: {
            name: "Jamal Hossain",
            service: "Plumber Service",
            rate: 450,
            rating: 4.6,
            image: "images/plumber.jpg"
        },
        7: {
            name: "Salam Miah",
            service: "Day Laborer Service",
            rate: 250,
            rating: 4.4,
            image: "images/laborer.jpg"
        },
        8: {
            name: "Raju Ahmed",
            service: "Day Laborer Service",
            rate: 300,
            rating: 4.3,
            image: "images/laborer2.jpg"
        }
    };

    // Display worker info
    if (workerId && workers[workerId]) {
        const worker = workers[workerId];
        document.getElementById('worker-img').src = worker.image;
        document.getElementById('worker-name').textContent = worker.name;
        document.getElementById('worker-service').textContent = worker.service;
        document.getElementById('worker-rate').textContent = `৳${worker.rate}/hour`;
        document.getElementById('worker-rating').innerHTML = `${worker.rating} <i class="fas fa-star"></i>`;
        document.getElementById('summary-rate').textContent = `৳${worker.rate}/hour`;
        updateTotal(worker.rate);
    }

    // Update duration and total
    document.getElementById('duration').addEventListener('input', function() {
        const workerId = urlParams.get('workerId');
        if (workerId && workers[workerId]) {
            updateTotal(workers[workerId].rate);
        }
    });

    function updateTotal(rate) {
        const duration = document.getElementById('duration').value || 2;
        document.getElementById('summary-duration').textContent = `${duration} hours`;
        document.getElementById('summary-total').textContent = `৳${rate * duration}`;
    }

    // Form submission
    document.querySelector('.booking-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Booking confirmed! Redirecting to payments...');
        window.location.href = 'payment.html';
    });
}