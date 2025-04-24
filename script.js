// Sample worker data
const workers = [
    {
        id: 1,
        name: "Ayesha Begum",
        role: "Maid",
        experience: "5 years",
        skills: ["Cleaning", "Laundry", "Cooking"],
        rating: 4.8,
        reviews: 42,
        price: "৳500/day",
        image: "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3",
        available: true
    },
    {
        id: 2,
        name: "Rahim Miah",
        role: "Driver",
        experience: "8 years",
        skills: ["Car Driving", "Route Knowledge"],
        rating: 4.5,
        reviews: 35,
        price: "৳800/day",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3",
        available: true
    },
    {
        id: 3,
        name: "Fatema Akter",
        role: "Cook",
        experience: "6 years",
        skills: ["Bangali Cuisine", "Meal Prep"],
        rating: 4.9,
        reviews: 58,
        price: "৳600/day",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3",
        available: true
    },
    {
        id: 4,
        name: "Karim Uddin",
        role: "Gardener",
        experience: "4 years",
        skills: ["Lawn Care", "Planting"],
        rating: 4.7,
        reviews: 27,
        price: "৳400/day",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3",
        available: false
    }
];

// DOM Elements
const workerGrid = document.getElementById('workerGrid');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.querySelector('.register-btn');
const showRegister = document.getElementById('showRegister');
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
const bookingTitle = document.getElementById('bookingTitle');
const bookingBody = document.getElementById('bookingBody');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load workers
    renderWorkers();
    
    // Testimonial slider
    setInterval(rotateTestimonials, 5000);
    
    // Modal event listeners
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.show();
    });
    
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.show();
    });
    
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.hide();
        registerModal.show();
    });
});

// Render workers to the page
function renderWorkers() {
    workerGrid.innerHTML = '';
    
    workers.forEach(worker => {
        const workerCard = document.createElement('div');
        workerCard.className = 'col-md-6 col-lg-3 mb-4';
        workerCard.innerHTML = `
            <div class="card worker-card h-100">
                <img src="${worker.image}" class="card-img-top" alt="${worker.name}">
                <div class="card-body">
                    <h5 class="card-title">${worker.name}</h5>
                    <p class="text-muted">
                        <i class="fas fa-broom"></i> ${worker.role} | ${worker.experience}
                    </p>
                    <p class="card-text">
                        <strong>Skills:</strong> ${worker.skills.join(', ')}
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="badge bg-success">${worker.rating} ★</span>
                            <small class="text-muted">(${worker.reviews} reviews)</small>
                        </div>
                        <span class="text-primary fw-bold">${worker.price}</span>
                    </div>
                </div>
                <div class="card-footer bg-transparent">
                    <button class="btn btn-primary w-100 book-btn" data-id="${worker.id}" ${worker.available ? '' : 'disabled'}>
                        ${worker.available ? 'Book Now' : 'Not Available'}
                    </button>
                </div>
            </div>
        `;
        
        workerGrid.appendChild(workerCard);
    });
    
    // Add event listeners to book buttons
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const workerId = parseInt(this.getAttribute('data-id'));
            const worker = workers.find(w => w.id === workerId);
            showBookingForm(worker);
        });
    });
}

// Show booking form
function showBookingForm(worker) {
    bookingTitle.textContent = `Book ${worker.name}`;
    bookingBody.innerHTML = `
        <form id="bookingForm">
            <div class="mb-3">
                <label class="form-label">Service Date</label>
                <input type="date" class="form-control" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Service Time</label>
                <select class="form-select" required>
                    <option value="">Select Time</option>
                    <option>Morning (8AM-12PM)</option>
                    <option>Afternoon (1PM-5PM)</option>
                    <option>Evening (6PM-9PM)</option>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label">Address</label>
                <textarea class="form-control" rows="2" required></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Payment Method</label>
                <select class="form-select" required>
                    <option value="">Select Method</option>
                    <option>bKash</option>
                    <option>Nagad</option>
                    <option>Cash</option>
                </select>
            </div>
            <div class="d-grid">
                <button type="submit" class="btn btn-primary">Confirm Booking for ${worker.price}</button>
            </div>
        </form>
    `;
    
    bookingModal.show();
    
    // Handle form submission
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Booking request sent successfully!');
        bookingModal.hide();
    });
}

// Testimonial slider
function rotateTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    let current = document.querySelector('.testimonial.active');
    let next = current.nextElementSibling || testimonials[0];
    
    current.classList.remove('active');
    next.classList.add('active');
}

// Form validations
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your login logic here
    alert('Login functionality will be implemented later');
    loginModal.hide();
});

document.getElementById('householdForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Household registration will be implemented later');
    registerModal.hide();
});

document.getElementById('workerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Worker registration will be implemented later');
    registerModal.hide();
});