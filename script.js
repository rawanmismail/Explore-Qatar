// ============================================================================
// 1. NAVIGATION / UI
// ============================================================================

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Dropdown Menus - Smooth animations
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('mouseenter', function() {
        const menu = this.querySelector('.dropdown-menu');
        if (menu) {
            menu.style.display = 'block';
            setTimeout(() => {
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            }, 10);
        }
    });
    
    dropdown.addEventListener('mouseleave', function() {
        const menu = this.querySelector('.dropdown-menu');
        if (menu) {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                menu.style.display = 'none';
            }, 300);
        }
    });
});

// Sticky Navbar - Highlight active sections
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    // Highlight active section
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Show/hide back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.style.display = 'flex';
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 500) backToTop.style.display = 'none';
            }, 300);
        }
    }
});

// Smooth Scroll to Section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        }
    });
});

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'backToTop';
backToTopBtn.innerHTML = '↑';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #8C1D40;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    transition: all 0.3s;
`;
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTopBtn.addEventListener('mouseenter', function() {
    this.style.background = '#A12852';
    this.style.transform = 'scale(1.1)';
});

backToTopBtn.addEventListener('mouseleave', function() {
    this.style.background = '#8C1D40';
    this.style.transform = 'scale(1)';
});

// ============================================================================
// 2. HERO SECTION
// ============================================================================

// Animated Typewriter Effect for Hero Subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let index = 0;
    
    function typeWriter() {
        if (index < originalText.length) {
            heroSubtitle.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 500);
}

// Scroll Animations - Fade in elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.item-card, .feature-card, .section-title').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ============================================================================
// 3. BOOKING / FORMS
// ============================================================================

// Flight Booking Widget Variables
let currentItemType = '';
let currentItemName = '';
let currentItemPrice = 0;

// Swap Cities Button
const swapBtn = document.querySelector('.swap-btn');
if (swapBtn) {
    swapBtn.addEventListener('click', () => {
        const fromCity = document.getElementById('fromCity');
        const toCity = document.getElementById('toCity');
        const temp = fromCity.value;
        fromCity.value = toCity.value;
        toCity.value = temp;
    });
}

// Date Validation
const departureDate = document.getElementById('departureDate');
const returnDate = document.getElementById('returnDate');

if (departureDate && returnDate) {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    departureDate.min = today;
    returnDate.min = today;
    
    departureDate.addEventListener('change', () => {
        returnDate.min = departureDate.value;
        if (returnDate.value && returnDate.value < departureDate.value) {
            returnDate.value = departureDate.value;
        }
    });
}

// Stopover Days Counter
const dayCounterBtns = document.querySelectorAll('.btn-count');
const stopoverDaysInput = document.getElementById('stopoverDays');

dayCounterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentValue = parseInt(stopoverDaysInput.value);
        if (btn.textContent === '+') {
            if (currentValue < 30) stopoverDaysInput.value = currentValue + 1;
        } else {
            if (currentValue > 1) stopoverDaysInput.value = currentValue - 1;
        }
    });
});

// Search Flights - Redirect to Qatar Airways
function searchFlights() {
    const fromCity = document.getElementById('fromCity').value;
    const toCity = document.getElementById('toCity').value;
    const departure = document.getElementById('departureDate').value;
    const returnD = document.getElementById('returnDate').value;
    const cabinClass = document.getElementById('cabinClass').value;
    
    if (!fromCity || !departure || !returnD) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Validate dates
    if (new Date(returnD) < new Date(departure)) {
        showNotification('Return date must be after departure date', 'error');
        return;
    }
    
    // Save search to database if user is logged in
    if (document.querySelector('.profile-dropdown')) {
        saveFlightSearch(fromCity, toCity, departure, returnD, cabinClass);
    }
    
    // Redirect to Qatar Airways (in real implementation)
    showNotification('Redirecting to Qatar Airways...', 'success');
    setTimeout(() => {
        // window.location.href = 'https://www.qatarairways.com';
        alert('In production, this would redirect to Qatar Airways booking page');
    }, 1500);
}

function saveFlightSearch(from, to, departure, returnDate, cabin) {
    const searchData = {
        type: 'flight',
        from: from,
        to: to,
        departure: departure,
        return: returnDate,
        cabin: cabin
    };
    
    console.log('Flight search saved:', searchData);
}

// ============================================================================
// 4. MODALS & POPUPS
// ============================================================================

// Open Booking Modal
function openBookingModal(type, name, price) {
    // Check if user is logged in
    const userLoggedIn = document.querySelector('.profile-dropdown') !== null;
    
    if (!userLoggedIn) {
        showNotification('Please login to make a booking', 'error');
        setTimeout(() => {
            window.location.href = '/login';
        }, 1500);
        return;
    }
    
    currentItemType = type;
    currentItemName = name;
    currentItemPrice = price;
    
    document.getElementById('itemName').value = name;
    document.getElementById('numPeople').value = 1;
    updateTotalPrice();
    
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').min = today;
    
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'block';
    setTimeout(() => {
        modal.querySelector('.modal-content').style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10);
}

// Close Booking Modal
function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.querySelector('.modal-content').style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'translateY(-50px)';
    setTimeout(() => {
        modal.style.display = 'none';
        document.getElementById('bookingForm').reset();
    }, 300);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        closeBookingModal();
    }
}

// Update Total Price
const numPeopleInput = document.getElementById('numPeople');
if (numPeopleInput) {
    numPeopleInput.addEventListener('input', updateTotalPrice);
}

function updateTotalPrice() {
    const numPeople = parseInt(document.getElementById('numPeople').value) || 1;
    const total = currentItemPrice * numPeople;
    document.getElementById('totalPrice').value = ' + total.toFixed(2);
}

// Handle Booking Form Submission
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const bookingData = {
            type: currentItemType,
            name: currentItemName,
            date: document.getElementById('bookingDate').value,
            people: parseInt(document.getElementById('numPeople').value),
            price: currentItemPrice * parseInt(document.getElementById('numPeople').value)
        };
        
        try {
            const response = await fetch('/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('Booking confirmed! Check your bookings page.', 'success');
                closeBookingModal();
            } else {
                showNotification(result.message, 'error');
            }
        } catch (error) {
            showNotification('An error occurred. Please try again.', 'error');
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .nav-menu a.active {
        background: rgba(255,255,255,0.2);
        border-radius: 5px;
    }
`;
document.head.appendChild(style);

// ============================================================================
// 5. INTERACTIVE CARDS
// ============================================================================

// Hover Effects on Cards (Enhanced)
document.querySelectorAll('.item-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Filter Cards (if filter exists on page)
function filterCards(category, gridId) {
    const cards = document.querySelectorAll(`#${gridId} .item-card`);
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Sort Cards by Price
function sortCards(order, gridId) {
    const grid = document.getElementById(gridId);
    const cards = Array.from(grid.querySelectorAll('.item-card'));
    
    cards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.item-price').textContent.replace(', ''));
        const priceB = parseFloat(b.querySelector('.item-price').textContent.replace(', ''));
        return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
    
    cards.forEach(card => grid.appendChild(card));
}

// ============================================================================
// 6. USER PROFILE & AUTHENTICATION
// ============================================================================

// Save to Favorites
async function addToFavorites(type, name) {
    try {
        const response = await fetch('/add-favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, name })
        });
        
        const result = await response.json();
        if (result.success) {
            showNotification('Added to favorites!', 'success');
        }
    } catch (error) {
        showNotification('Error adding to favorites', 'error');
    }
}

// Add heart icon to cards for favorites
document.querySelectorAll('.item-card').forEach(card => {
    const heartBtn = document.createElement('button');
    heartBtn.className = 'favorite-btn';
    heartBtn.innerHTML = '♡';
    heartBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        background: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        transition: all 0.3s;
    `;
    
    card.style.position = 'relative';
    card.querySelector('.item-content').insertBefore(heartBtn, card.querySelector('.item-content').firstChild);
    
    heartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        heartBtn.innerHTML = heartBtn.innerHTML === '♡' ? '♥' : '♡';
        heartBtn.style.color = heartBtn.innerHTML === '♥' ? '#8C1D40' : '#333';
        
        if (heartBtn.innerHTML === '♥') {
            const itemName = card.querySelector('h3').textContent;
            const itemType = card.closest('section').id;
            addToFavorites(itemType, itemName);
        }
    });
});

// ============================================================================
// 7. FOOTER & MISC
// ============================================================================

// Dynamic Year in Footer
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2026', year);
}

// Newsletter Subscription (if exists)
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (validateEmail(email)) {
            showNotification('Thank you for subscribing!', 'success');
            newsletterForm.reset();
        } else {
            showNotification('Please enter a valid email', 'error');
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================================================
// 8. ADVANCED FEATURES
// ============================================================================

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Lazy Loading Images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
});

// Price Formatter
function formatPrice(price, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(price);
}

// Initialize all on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Qatar Tourism Website Loaded');
    
    // Add any initialization code here
    
    // Example: Auto-update prices if needed
    document.querySelectorAll('.item-price').forEach(priceEl => {
        const price = parseFloat(priceEl.textContent.replace(', ''));
        if (!isNaN(price)) {
            priceEl.textContent = formatPrice(price);
        }
    });
});

// Accommodation Page JavaScript
// Hotel Database
const hotels = [
    {
        id: 1,
        name: "Four Seasons Hotel Doha",
        location: "West Bay",
        type: "Luxury",
        rating: 5,
        price: 450,
        image: "linear-gradient(135deg, #8C1D40 0%, #0C616F 100%)",
        amenities: ["Pool", "Spa", "Restaurant", "Gym", "Free WiFi", "Beach Access", "Concierge"],
        description: "Luxurious beachfront hotel with world-class amenities and stunning views of the Arabian Gulf"
    },
    {
        id: 2,
        name: "The St. Regis Doha",
        location: "West Bay",
        type: "Luxury",
        rating: 5,
        price: 520,
        image: "linear-gradient(135deg, #A12852 0%, #8C1D40 100%)",
        amenities: ["Pool", "Spa", "Fine Dining", "Butler Service", "Gym", "Beach", "Kids Club"],
        description: "Opulent luxury with personalized butler service and exceptional dining experiences"
    },
    {
        id: 3,
        name: "Souq Waqif Boutique Hotels",
        location: "Souq Waqif",
        type: "Boutique",
        rating: 4,
        price: 280,
        image: "linear-gradient(135deg, #0C616F 0%, #A12852 100%)",
        amenities: ["Restaurant", "Traditional Design", "Rooftop Terrace", "Free WiFi", "Concierge"],
        description: "Authentic Qatari experience in the heart of the historic Souq Waqif marketplace"
    },
    {
        id: 4,
        name: "The Pearl Gates Hotel",
        location: "The Pearl",
        type: "Luxury",
        rating: 5,
        price: 380,
        image: "linear-gradient(135deg, #8C1D40 0%, #0C616F 100%)",
        amenities: ["Pool", "Spa", "Marina View", "Restaurant", "Gym", "Free WiFi"],
        description: "Stunning island location with spectacular marina views and upscale shopping nearby"
    },
    {
        id: 5,
        name: "City Centre Rotana Doha",
        location: "Doha",
        type: "Business",
        rating: 4,
        price: 220,
        image: "linear-gradient(135deg, #A12852 0%, #0C616F 100%)",
        amenities: ["Pool", "Gym", "Business Center", "Restaurant", "Free WiFi"],
        description: "Modern business hotel with excellent facilities for both work and relaxation"
    },
    {
        id: 6,
        name: "Marsa Malaz Kempinski",
        location: "The Pearl",
        type: "Resort",
        rating: 5,
        price: 580,
        image: "linear-gradient(135deg, #0C616F 0%, #8C1D40 100%)",
        amenities: ["Private Beach", "Multiple Pools", "Spa", "Fine Dining", "Water Sports", "Kids Club"],
        description: "Exclusive private island resort with pristine beach and luxury amenities for families"
    },
    {
        id: 7,
        name: "Mondrian Doha",
        location: "West Bay",
        type: "Luxury",
        rating: 5,
        price: 410,
        image: "linear-gradient(135deg, #A12852 0%, #8C1D40 100%)",
        amenities: ["Rooftop Pool", "Spa", "Nightclub", "Restaurant", "Gym", "Art Gallery"],
        description: "Contemporary luxury hotel with stunning design, art installations, and vibrant nightlife"
    },
    {
        id: 8,
        name: "Al Aziziyah Boutique Hotel",
        location: "Souq Waqif",
        type: "Boutique",
        rating: 4,
        price: 195,
        image: "linear-gradient(135deg, #8C1D40 0%, #A12852 100%)",
        amenities: ["Traditional Architecture", "Restaurant", "Rooftop", "Free WiFi"],
        description: "Charming boutique hotel featuring authentic Arabian architecture and cultural ambiance"
    },
    {
        id: 9,
        name: "W Doha Hotel & Residences",
        location: "West Bay",
        type: "Luxury",
        rating: 5,
        price: 460,
        image: "linear-gradient(135deg, #0C616F 0%, #A12852 100%)",
        amenities: ["Pool", "Spa", "Multiple Restaurants", "Beach", "Nightlife", "Gym"],
        description: "Trendy luxury hotel perfect for those seeking vibrant nightlife and modern sophistication"
    },
    {
        id: 10,
        name: "Banana Island Resort",
        location: "Banana Island",
        type: "Resort",
        rating: 5,
        price: 650,
        image: "linear-gradient(135deg, #A12852 0%, #0C616F 100%)",
        amenities: ["Private Island", "Beach", "Water Park", "Spa", "Multiple Pools", "Kids Activities"],
        description: "Exclusive private island resort paradise with water park and family-friendly facilities"
    },
    {
        id: 11,
        name: "Alwadi Hotel Doha MGallery",
        location: "Doha",
        type: "Business",
        rating: 4,
        price: 240,
        image: "linear-gradient(135deg, #8C1D40 0%, #0C616F 100%)",
        amenities: ["Pool", "Restaurant", "Gym", "Business Center", "Free WiFi"],
        description: "Stylish hotel blending traditional Qatari elements with modern business facilities"
    },
    {
        id: 12,
        name: "Ezdan Hotel",
        location: "Al Wakrah",
        type: "Business",
        rating: 4,
        price: 180,
        image: "linear-gradient(135deg, #0C616F 0%, #8C1D40 100%)",
        amenities: ["Pool", "Gym", "Restaurant", "Free Parking", "Free WiFi"],
        description: "Comfortable hotel conveniently located near Al Janoub Stadium and local attractions"
    }
];

let currentHotel = null;
let filteredHotels = [...hotels];

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('Accommodation.js loaded successfully');
    console.log('Hotels database has', hotels.length, 'hotels');
    
    const today = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById('checkInDate');
    const checkOutInput = document.getElementById('checkOutDate');
    
    console.log('Check-in input:', checkInInput);
    console.log('Check-out input:', checkOutInput);
    
    if (checkInInput) {
        checkInInput.min = today;
    }
    if (checkOutInput) {
        checkOutInput.min = today;
    }
    
    // Display all hotels initially
    console.log('Displaying hotels...');
    displayHotels(hotels);
    console.log('Hotels displayed successfully');
    
    // Update check-out min date when check-in changes
    if (checkInInput) {
        checkInInput.addEventListener('change', () => {
            checkOutInput.min = checkInInput.value;
            if (checkOutInput.value && checkOutInput.value < checkInInput.value) {
                checkOutInput.value = checkInInput.value;
            }
        });
    }
    
    // Verify modal exists
    const modal = document.getElementById('bookingModal');
    console.log('Booking modal element:', modal);
    if (!modal) {
        console.error('ERROR: Booking modal not found in HTML!');
    }
});

// Display hotels in grid
function displayHotels(hotelsToDisplay) {
    const grid = document.getElementById('hotelsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (hotelsToDisplay.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; padding: 3rem; grid-column: 1/-1;">No hotels found matching your criteria. Please adjust your filters.</p>';
        return;
    }
    
    hotelsToDisplay.forEach(hotel => {
        const card = document.createElement('div');
        card.className = 'hotel-card';
        card.innerHTML = `
            <div class="hotel-card-image" style="background: ${hotel.image};"></div>
            <div class="hotel-card-content">
                <div class="hotel-card-header">
                    <h3>${hotel.name}</h3>
                    <div class="hotel-rating">
                        ${'⭐'.repeat(hotel.rating)}
                    </div>
                </div>
                <p class="hotel-location">📍 ${hotel.location}</p>
                <p class="hotel-type">${hotel.type}</p>
                <p class="hotel-description">${hotel.description}</p>
                <div class="hotel-amenities-preview">
                    ${hotel.amenities.slice(0, 3).map(a => `<span class="amenity-tag">${a}</span>`).join('')}
                    ${hotel.amenities.length > 3 ? `<span class="amenity-more">+${hotel.amenities.length - 3} more</span>` : ''}
                </div>
                <div class="hotel-card-footer">
                    <div class="hotel-price">
                        <span class="price-label">From</span>
                        <span class="price-amount">$${hotel.price}</span>
                        <span class="price-period">/ night</span>
                    </div>
                    <button class="btn-book-hotel" onclick="openBooking(${hotel.id})">Book Now</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Search hotels based on filters
function searchHotels() {
    const checkIn = document.getElementById('checkInDate').value;
    const checkOut = document.getElementById('checkOutDate').value;
    const location = document.getElementById('locationFilter').value;
    const type = document.getElementById('typeFilter').value;
    const priceRange = document.getElementById('priceFilter').value;
    
    if (!checkIn || !checkOut) {
        alert('Please select check-in and check-out dates');
        return;
    }
    
    // Validate dates
    if (new Date(checkOut) <= new Date(checkIn)) {
        alert('Check-out date must be after check-in date');
        return;
    }
    
    let filtered = [...hotels];
    
    // Filter by location
    if (location !== 'all') {
        filtered = filtered.filter(h => h.location === location);
    }
    
    // Filter by type
    if (type !== 'all') {
        filtered = filtered.filter(h => h.type === type);
    }
    
    // Filter by price range
    if (priceRange !== 'all') {
        if (priceRange === 'budget') {
            filtered = filtered.filter(h => h.price < 200);
        } else if (priceRange === 'mid') {
            filtered = filtered.filter(h => h.price >= 200 && h.price < 400);
        } else if (priceRange === 'luxury') {
            filtered = filtered.filter(h => h.price >= 400);
        }
    }
    
    filteredHotels = filtered;
    displayHotels(filteredHotels);
    
    // Scroll to results
    document.querySelector('.hotels-section').scrollIntoView({ behavior: 'smooth' });
}

// Sort hotels
function sortHotels() {
    const sortBy = document.getElementById('sortBy').value;
    let sorted = [...filteredHotels];
    
    if (sortBy === 'price-low') {
        sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        sorted.sort((a, b) => b.rating - a.rating);
    }
    // 'featured' keeps the original order
    
    displayHotels(sorted);
}

// Open booking modal
function openBooking(hotelId) {
    console.log('openBooking called with hotelId:', hotelId);
    
    const hotel = hotels.find(h => h.id === hotelId);
    console.log('Found hotel:', hotel);
    
    if (!hotel) {
        console.error('Hotel not found!');
        return;
    }
    
    currentHotel = hotel;
    
    // Populate hotel information
    console.log('Populating modal with hotel data...');
    document.getElementById('modalHotelName').textContent = hotel.name;
    document.getElementById('modalHotelImage').style.background = hotel.image;
    document.getElementById('modalLocation').textContent = `📍 ${hotel.location}`;
    document.getElementById('modalRating').textContent = '⭐'.repeat(hotel.rating);
    document.getElementById('modalType').textContent = hotel.type;
    
    // Populate amenities
    const amenitiesList = document.getElementById('modalAmenities');
    amenitiesList.innerHTML = hotel.amenities.map(a => `<span class="modal-amenity">${a}</span>`).join('');
    
    // Get booking details from search form
    const checkIn = document.getElementById('checkInDate').value;
    const checkOut = document.getElementById('checkOutDate').value;
    const guests = document.getElementById('guests').value;
    
    // Update booking summary
    document.getElementById('summaryCheckIn').textContent = checkIn || '-';
    document.getElementById('summaryCheckOut').textContent = checkOut || '-';
    document.getElementById('summaryGuests').textContent = guests || '2';
    
    // Calculate nights and pricing
    if (checkIn && checkOut) {
        const nights = calculateNights(checkIn, checkOut);
        document.getElementById('summaryNights').textContent = nights;
        updatePricing(hotel.price, nights);
    } else {
        document.getElementById('summaryNights').textContent = '0';
        updatePricing(hotel.price, 0);
    }
    
    // Show modal
    const modal = document.getElementById('bookingModal');
    console.log('Modal element:', modal);
    console.log('Setting modal display to block...');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    console.log('Modal should now be visible');
}

// Calculate number of nights
function calculateNights(checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Update pricing breakdown
function updatePricing(pricePerNight, nights) {
    const subtotal = pricePerNight * nights;
    const taxes = subtotal * 0.12; // 12% taxes and fees
    const total = subtotal + taxes;
    
    document.getElementById('priceDetail').textContent = `$${pricePerNight} × ${nights} night${nights !== 1 ? 's' : ''}`;
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('taxes').textContent = `$${taxes.toFixed(2)}`;
    document.getElementById('totalPrice').textContent = `$${total.toFixed(2)}`;
}

// Close booking modal
function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('bookingForm').reset();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        closeBookingModal();
    }
}

// Submit booking
function submitBooking(event) {
    event.preventDefault();
    
    const name = document.getElementById('guestName').value;
    const email = document.getElementById('guestEmail').value;
    const phone = document.getElementById('guestPhone').value;
    const roomType = document.getElementById('roomType').value;
    const specialRequests = document.getElementById('specialRequests').value;
    const checkIn = document.getElementById('summaryCheckIn').textContent;
    const checkOut = document.getElementById('summaryCheckOut').textContent;
    const guests = document.getElementById('summaryGuests').textContent;
    const nights = document.getElementById('summaryNights').textContent;
    const total = document.getElementById('totalPrice').textContent;
    
    const bookingData = {
        hotel: currentHotel.name,
        hotelLocation: currentHotel.location,
        guestName: name,
        email: email,
        phone: phone,
        roomType: roomType,
        specialRequests: specialRequests,
        checkIn: checkIn,
        checkOut: checkOut,
        guests: guests,
        nights: nights,
        total: total,
        bookingDate: new Date().toISOString()
    };
    
    // Log booking data (in real app, this would be sent to server)
    console.log('Booking submitted:', bookingData);
    
    // Show success message
    alert(`✓ Booking Confirmed!\n\nHotel: ${currentHotel.name}\nGuest: ${name}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nNights: ${nights}\nTotal: ${total}\n\nA confirmation email will be sent to ${email}`);
    
    // Close modal and reset
    closeBookingModal();
}

// Flights Page JavaScript

// Popular routes data
const popularRoutes = [
    {
        from: "London",
        fromCode: "LHR",
        to: "Doha",
        toCode: "DOH",
        flag: "🇬🇧",
        duration: "6h 30m",
        frequency: "Daily",
        airline: "Qatar Airways",
        priceFrom: 450
    },
    {
        from: "New York",
        fromCode: "JFK",
        to: "Doha",
        toCode: "DOH",
        flag: "🇺🇸",
        duration: "12h 15m",
        frequency: "Daily",
        airline: "Qatar Airways",
        priceFrom: 850
    },
    {
        from: "Dubai",
        fromCode: "DXB",
        to: "Doha",
        toCode: "DOH",
        flag: "🇦🇪",
        duration: "1h 10m",
        frequency: "Multiple daily",
        airline: "Qatar Airways",
        priceFrom: 180
    },
    {
        from: "Paris",
        fromCode: "CDG",
        to: "Doha",
        toCode: "DOH",
        flag: "🇫🇷",
        duration: "6h 20m",
        frequency: "Daily",
        airline: "Qatar Airways",
        priceFrom: 480
    },
    {
        from: "Singapore",
        fromCode: "SIN",
        to: "Doha",
        toCode: "DOH",
        flag: "🇸🇬",
        duration: "7h 45m",
        frequency: "Daily",
        airline: "Qatar Airways",
        priceFrom: 620
    },
    {
        from: "Mumbai",
        fromCode: "BOM",
        to: "Doha",
        toCode: "DOH",
        flag: "🇮🇳",
        duration: "3h 30m",
        frequency: "Multiple daily",
        airline: "Qatar Airways",
        priceFrom: 320
    },
    {
        from: "Sydney",
        fromCode: "SYD",
        to: "Doha",
        toCode: "DOH",
        flag: "🇦🇺",
        duration: "14h 30m",
        frequency: "Daily",
        airline: "Qatar Airways",
        priceFrom: 950
    },
    {
        from: "Frankfurt",
        fromCode: "FRA",
        to: "Doha",
        toCode: "DOH",
        flag: "🇩🇪",
        duration: "5h 50m",
        frequency: "Daily",
        airline: "Qatar Airways",
        priceFrom: 420
    }
];

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('Flights.js loaded successfully');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const departureInput = document.getElementById('departureDate');
    const returnInput = document.getElementById('returnDate');
    
    if (departureInput) {
        departureInput.min = today;
    }
    if (returnInput) {
        returnInput.min = today;
    }
    
    // Update return date minimum when departure changes
    if (departureInput) {
        departureInput.addEventListener('change', () => {
            if (returnInput) {
                returnInput.min = departureInput.value;
                if (returnInput.value && returnInput.value < departureInput.value) {
                    returnInput.value = departureInput.value;
                }
            }
        });
    }
    
    // Display popular routes
    displayRoutes();
});

// Display popular routes
function displayRoutes() {
    const grid = document.getElementById('routesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    popularRoutes.forEach(route => {
        const card = document.createElement('div');
        card.className = 'route-card';
        card.innerHTML = `
            <div class="route-header">
                <div class="route-cities">
                    <span class="route-city">${route.fromCode}</span>
                    <span class="route-arrow">→</span>
                    <span class="route-city">${route.toCode}</span>
                </div>
                <span class="route-flag">${route.flag}</span>
            </div>
            <div class="route-details">
                <div class="route-info">
                    <span>Duration:</span>
                    <strong>${route.duration}</strong>
                </div>
                <div class="route-info">
                    <span>Frequency:</span>
                    <strong>${route.frequency}</strong>
                </div>
                <div class="route-info">
                    <span>Airline:</span>
                    <strong>${route.airline}</strong>
                </div>
            </div>
            <div class="route-price">
                <span class="price-label">From</span>
                <span class="price-amount">$${route.priceFrom}</span>
                <span class="price-note">per person</span>
            </div>
            <button class="btn-select-route" onclick="selectRoute('${route.from}', '${route.fromCode}')">Select This Route</button>
        `;
        grid.appendChild(card);
    });
}

// Select a route and populate the form
function selectRoute(city, code) {
    const fromCity = document.getElementById('fromCity');
    if (fromCity) {
        fromCity.value = `${city} (${code})`;
    }
    
    // Scroll to booking form
    document.querySelector('.flight-booking-widget').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // Highlight the form briefly
    const widget = document.querySelector('.flight-booking-widget');
    widget.style.boxShadow = '0 0 20px rgba(140, 29, 64, 0.3)';
    setTimeout(() => {
        widget.style.boxShadow = '0 5px 30px rgba(0,0,0,0.08)';
    }, 2000);
}

// Swap cities
function swapCities() {
    const fromCity = document.getElementById('fromCity');
    const toCity = document.getElementById('toCity');
    
    if (fromCity && toCity) {
        const temp = fromCity.value;
        fromCity.value = toCity.value;
        toCity.value = temp;
    }
}

// Toggle return date field
function toggleReturnDate() {
    const tripType = document.querySelector('input[name="tripType"]:checked').value;
    const returnField = document.getElementById('returnDateField');
    const returnInput = document.getElementById('returnDate');
    
    if (tripType === 'oneway') {
        returnField.style.display = 'none';
        returnInput.removeAttribute('required');
    } else {
        returnField.style.display = 'block';
        returnInput.setAttribute('required', 'required');
    }
}

// Change passenger count
function changePassengers(change) {
    const input = document.getElementById('passengers');
    let value = parseInt(input.value);
    value += change;
    
    if (value >= 1 && value <= 9) {
        input.value = value;
    }
}

// Toggle stopover options
function toggleStopover() {
    const checkbox = document.getElementById('addStopover');
    const options = document.getElementById('stopoverOptions');
    
    if (checkbox.checked) {
        options.style.display = 'grid';
    } else {
        options.style.display = 'none';
    }
}

// Change stopover days
function changeStopoverDays(change) {
    const input = document.getElementById('stopoverDays');
    let value = parseInt(input.value);
    value += change;
    
    if (value >= 1 && value <= 14) {
        input.value = value;
    }
}

// Toggle promo code field
function togglePromoCode() {
    const field = document.getElementById('promoCodeField');
    if (field.style.display === 'none') {
        field.style.display = 'flex';
        document.getElementById('promoCode').focus();
    } else {
        field.style.display = 'none';
    }
}

// Apply promo code
function applyPromoCode() {
    const promoInput = document.getElementById('promoCode');
    const code = promoInput.value.trim().toUpperCase();
    
    if (!code) {
        alert('Please enter a promo code');
        return;
    }
    
    // Simulate promo code validation
    const validCodes = ['QATAR2026', 'WELCOME10', 'SUMMER25'];
    
    if (validCodes.includes(code)) {
        alert(`✓ Promo code "${code}" applied successfully!\n\nYou'll see the discount at checkout.`);
        promoInput.value = code;
        promoInput.style.borderColor = '#4CAF50';
    } else {
        alert('❌ Invalid promo code. Please try again.');
        promoInput.style.borderColor = '#f44336';
    }
}

// Search flights
function searchFlights() {
    console.log('Search flights clicked');
    
    const fromCity = document.getElementById('fromCity').value;
    const toCity = document.getElementById('toCity').value;
    const departureDate = document.getElementById('departureDate').value;
    const returnDate = document.getElementById('returnDate').value;
    const passengers = document.getElementById('passengers').value;
    const cabinClass = document.getElementById('cabinClass').value;
    const tripType = document.querySelector('input[name="tripType"]:checked').value;
    
    // Validation
    if (!fromCity) {
        alert('Please enter departure city');
        document.getElementById('fromCity').focus();
        return;
    }
    
    if (!toCity) {
        alert('Please enter destination city');
        document.getElementById('toCity').focus();
        return;
    }
    
    if (!departureDate) {
        alert('Please select departure date');
        document.getElementById('departureDate').focus();
        return;
    }
    
    if (tripType === 'return' && !returnDate) {
        alert('Please select return date');
        document.getElementById('returnDate').focus();
        return;
    }
    
    // Validate return date is after departure
    if (tripType === 'return' && new Date(returnDate) <= new Date(departureDate)) {
        alert('Return date must be after departure date');
        document.getElementById('returnDate').focus();
        return;
    }
    
    // Collect stopover info
    const addStopover = document.getElementById('addStopover').checked;
    let stopoverInfo = null;
    
    if (addStopover) {
        const stopTime = document.querySelector('input[name="stopTime"]:checked').value;
        const stopoverDays = document.getElementById('stopoverDays').value;
        stopoverInfo = {
            when: stopTime,
            days: stopoverDays
        };
    }
    
    // Collect promo code
    const promoCode = document.getElementById('promoCode').value;
    
    // Create booking data
    const bookingData = {
        from: fromCity,
        to: toCity,
        departure: departureDate,
        return: returnDate,
        passengers: passengers,
        class: cabinClass,
        tripType: tripType,
        stopover: stopoverInfo,
        promoCode: promoCode || null,
        timestamp: new Date().toISOString()
    };
    
    console.log('Flight search data:', bookingData);
    
    // In a real application, this would redirect to Qatar Airways booking page
    // or open a booking modal. For now, show confirmation
    
    let message = `✈️ Flight Search Summary\n\n`;
    message += `From: ${fromCity}\n`;
    message += `To: ${toCity}\n`;
    message += `Departure: ${departureDate}\n`;
    if (tripType === 'return') {
        message += `Return: ${returnDate}\n`;
    }
    message += `Passengers: ${passengers}\n`;
    message += `Class: ${cabinClass}\n`;
    
    if (addStopover) {
        message += `\n🏨 Stopover in Doha:\n`;
        message += `  - ${stopoverInfo.days} day(s)\n`;
        message += `  - ${stopoverInfo.when === 'departure' ? 'On the way there' : 'On the way back'}\n`;
    }
    
    if (promoCode) {
        message += `\n🎟️ Promo code: ${promoCode}\n`;
    }
    
    message += `\n✓ Searching for available flights...\n`;
    message += `You will be redirected to Qatar Airways booking system.`;
    
    alert(message);
    
    // In production, redirect to Qatar Airways with these parameters
    // window.location.href = `https://www.qatarairways.com/booking?from=${fromCity}&to=${toCity}...`;
}

// Transportation Page JavaScript

// Transportation options data
const transportOptions = [
    {
        icon: "🚇",
        name: "Doha Metro",
        description: "State-of-the-art metro system with 3 lines connecting major areas",
        details: {
            "Fare": "QR 2 - 6",
            "Operating Hours": "6:00 AM - 11:00 PM",
            "Frequency": "Every 3-5 minutes"
        }
    },
    {
        icon: "🚕",
        name: "Taxi Services",
        description: "Reliable taxi services including Karwa, Uber, and Careem",
        details: {
            "Starting Fare": "QR 4 - 10",
            "Availability": "24/7",
            "Booking": "App or street hail"
        }
    },
    {
        icon: "🚌",
        name: "Public Buses",
        description: "Extensive bus network covering all areas of Doha",
        details: {
            "Fare": "QR 2 - 4",
            "Routes": "100+ routes",
            "Payment": "Karwa Smartcard or cash"
        }
    },
    {
        icon: "🚊",
        name: "Lusail Tram",
        description: "Modern tram system in Lusail City with 4 lines",
        details: {
            "Fare": "QR 2",
            "Lines": "4 lines, 25 stations",
            "Coverage": "19 km network"
        }
    },
    {
        icon: "🚴",
        name: "Bike Sharing",
        description: "NextBike stations across Doha for eco-friendly travel",
        details: {
            "Cost": "QR 10/hour",
            "Stations": "100+ locations",
            "Availability": "24/7"
        }
    },
    {
        icon: "🚗",
        name: "Car Rental",
        description: "Major car rental companies at competitive prices",
        details: {
            "Price": "From QR 80/day",
            "Companies": "10+ providers",
            "Requirements": "Valid license + ID"
        }
    }
];

// Taxi services data
const taxiServices = [
    {
        logo: "🚖",
        name: "Karwa Taxi",
        type: "Official Taxi Service",
        features: [
            "Metered fares (starting QR 4)",
            "Available 24/7 across Qatar",
            "Booking via Karwa app",
            "Airport pickup service",
            "Wheelchair accessible vehicles"
        ],
        pricing: "Starting at QR 4 + QR 1.2 per km"
    },
    {
        logo: "📱",
        name: "Uber",
        type: "Ride-Hailing App",
        features: [
            "Cashless payment via app",
            "Real-time tracking",
            "Multiple vehicle options (UberX, Comfort, XL)",
            "Fare estimates before booking",
            "24/7 availability"
        ],
        pricing: "Dynamic pricing (typically QR 10-15 start)"
    },
    {
        logo: "🚗",
        name: "Careem",
        type: "Ride-Hailing App",
        features: [
            "Popular Middle East app",
            "Multiple payment options",
            "Economy to Business class",
            "Schedule rides in advance",
            "Ladies-only option (Careem Kids)"
        ],
        pricing: "From QR 8 + per km charges"
    },
    {
        logo: "🏨",
        name: "Hotel Transfers",
        type: "Private Transfer Service",
        features: [
            "Pre-booked hotel pickups",
            "Luxury vehicles available",
            "Airport meet & greet",
            "Fixed pricing (no surprises)",
            "Professional chauffeurs"
        ],
        pricing: "From QR 150 (airport transfer)"
    }
];

// Car rental companies data
const carRentals = [
    {
        logo: "🚙",
        name: "Budget",
        priceFrom: 80,
        features: {
            "Car Types": "Economy to SUV",
            "Locations": "Airport & city",
            "Insurance": "Full coverage available"
        }
    },
    {
        logo: "🚗",
        name: "Avis",
        priceFrom: 90,
        features: {
            "Car Types": "Wide selection",
            "Locations": "Multiple locations",
            "Insurance": "CDW included"
        }
    },
    {
        logo: "🚕",
        name: "Hertz",
        priceFrom: 95,
        features: {
            "Car Types": "Economy to luxury",
            "Locations": "Airport & hotels",
            "Insurance": "Optional packages"
        }
    },
    {
        logo: "🏎️",
        name: "Sixt",
        priceFrom: 100,
        features: {
            "Car Types": "Premium fleet",
            "Locations": "Airport & premium",
            "Insurance": "Premium coverage"
        }
    },
    {
        logo: "🚐",
        name: "Europcar",
        priceFrom: 85,
        features: {
            "Car Types": "All categories",
            "Locations": "Nationwide",
            "Insurance": "Flexible options"
        }
    },
    {
        logo: "🔑",
        name: "Thrifty",
        priceFrom: 75,
        features: {
            "Car Types": "Budget-friendly",
            "Locations": "Airport & city",
            "Insurance": "Basic included"
        }
    }
];

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('Transportation.js loaded successfully');
    
    displayTransportOptions();
    displayTaxiServices();
    displayCarRentals();
});

// Display transportation options
function displayTransportOptions() {
    const grid = document.getElementById('transportGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    transportOptions.forEach(option => {
        const card = document.createElement('div');
        card.className = 'transport-card';
        
        let detailsHTML = '';
        for (const [key, value] of Object.entries(option.details)) {
            detailsHTML += `
                <div class="detail-row">
                    <span>${key}:</span>
                    <strong>${value}</strong>
                </div>
            `;
        }
        
        card.innerHTML = `
            <div class="transport-icon">${option.icon}</div>
            <h3>${option.name}</h3>
            <p>${option.description}</p>
            <div class="transport-details">
                ${detailsHTML}
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Display taxi services
function displayTaxiServices() {
    const grid = document.getElementById('taxiGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    taxiServices.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="service-header">
                <div class="service-logo">${service.logo}</div>
                <div>
                    <h3>${service.name}</h3>
                    <div class="service-type">${service.type}</div>
                </div>
            </div>
            <ul class="service-features">
                ${service.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <div class="service-pricing">
                <strong>Typical Pricing:</strong>
                <span>${service.pricing}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Display car rental options
function displayCarRentals() {
    const grid = document.getElementById('carRentalGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    carRentals.forEach(rental => {
        const card = document.createElement('div');
        card.className = 'rental-card';
        
        let featuresHTML = '';
        for (const [key, value] of Object.entries(rental.features)) {
            featuresHTML += `
                <div>
                    <span>${key}:</span>
                    <strong>${value}</strong>
                </div>
            `;
        }
        
        card.innerHTML = `
            <div class="rental-header">
                <div class="rental-logo">${rental.logo}</div>
                <h3>${rental.name}</h3>
            </div>
            <div class="rental-info">
                ${featuresHTML}
            </div>
            <div class="rental-price">
                <div class="price">QR ${rental.priceFrom}</div>
                <small>per day (starting price)</small>
            </div>
            <button class="btn-primary" onclick="bookRental('${rental.name}', ${rental.priceFrom})">Book Now</button>
        `;
        grid.appendChild(card);
    });
}

// Open cycling info (placeholder)
function openCyclingInfo(type) {
    let message = '';
    
    if (type === 'bike') {
        message = `🚴 NextBike Qatar

Download the NextBike app to:
• Find nearest bike station
• Unlock bikes with QR code
• Pay via app (QR 10/hour or QR 50/month)
• Return to any station

Over 100 stations across:
✓ Doha Corniche
✓ The Pearl
✓ Education City
✓ Katara Cultural Village
✓ MIA Park

Download: Search "NextBike" in App Store or Google Play`;
    } else if (type === 'scooter') {
        message = `🛴 E-Scooter Services

Available apps:
• Lime - Green scooters
• Tier - Orange scooters  
• Careem - Integrated with ride app

How to use:
1. Download app
2. Find nearby scooter on map
3. Scan QR code to unlock
4. Ride (max 20 km/h)
5. Park responsibly & lock

Cost: ~QR 2 unlock + QR 1/minute

Areas: The Pearl, West Bay, Msheireb, Katara`;
    } else if (type === 'walk') {
        message = `🚶 Best Walking Routes in Qatar

Popular pedestrian areas:
• Doha Corniche (7 km waterfront)
• MIA Park & surrounding area
• The Pearl Marina walkways
• Katara Cultural Village
• Souq Waqif historic district
• Education City campus paths
• Aspire Park jogging trails

Tips:
✓ Walk early morning or evening (cooler)
✓ Stay hydrated
✓ Use covered walkways where available
✓ Most areas have drinking fountains`;
    }
    
    alert(message);
}

// Book rental (placeholder)
function bookRental(company, price) {
    const message = `🚗 Car Rental Booking

Company: ${company}
Starting Price: QR ${price} per day

To book:
1. Visit ${company}'s website or app
2. Select dates and vehicle type
3. Provide license and ID
4. Choose insurance options
5. Pick up at airport or city location

Requirements:
✓ Valid driving license (International or home country)
✓ Passport or Qatar ID
✓ Credit card for deposit
✓ Minimum age: 21 years (varies by company)

Would you like to proceed to ${company}'s booking page?`;
    
    const proceed = confirm(message);
    if (proceed) {
        // In production, this would redirect to the actual booking page
        alert(`Redirecting to ${company} booking system...`);
    }
}



// Hamad International Airport JavaScript

// Terminal Map Data
const terminalData = {
    'concourse-a': [
        { name: 'Gates A1-A10', type: 'gates', color: '#9C27B0', description: 'International departures to Europe & Americas' },
        { name: 'Duty Free Luxury', type: 'shopping', color: '#8C1D40', description: 'Hermès, Gucci, Cartier, Dior' },
        { name: 'Al Maha Lounge', type: 'lounge', color: '#FFB81C', description: 'Premium lounge with dining & showers' },
        { name: 'Food Court', type: 'dining', color: '#0C616F', description: 'International cuisine & quick bites' },
        { name: 'Prayer Room', type: 'services', color: '#4CAF50', description: 'Washing facilities available' },
        { name: 'Pharmacy', type: 'services', color: '#4CAF50', description: '24/7 medical supplies' }
    ],
    'concourse-b': [
        { name: 'Gates B1-B15', type: 'gates', color: '#9C27B0', description: 'Asia & Middle East flights' },
        { name: 'Qatar Duty Free', type: 'shopping', color: '#8C1D40', description: 'Cosmetics, perfumes, chocolates' },
        { name: 'Oryx Lounge', type: 'lounge', color: '#FFB81C', description: 'Business class lounge' },
        { name: 'Nobu', type: 'dining', color: '#0C616F', description: 'Japanese fine dining' },
        { name: 'Harrods Tea Room', type: 'dining', color: '#0C616F', description: 'British afternoon tea experience' },
        { name: 'Kids Play Area', type: 'services', color: '#4CAF50', description: 'Supervised play zone' }
    ],
    'concourse-c': [
        { name: 'Gates C1-C12', type: 'gates', color: '#9C27B0', description: 'Regional & domestic flights' },
        { name: 'Fashion Avenue', type: 'shopping', color: '#8C1D40', description: 'Burberry, Prada, Coach' },
        { name: 'Premium Lounge', type: 'lounge', color: '#FFB81C', description: 'First class amenities' },
        { name: 'Bistro', type: 'dining', color: '#0C616F', description: 'French café & bakery' },
        { name: 'Massage Center', type: 'services', color: '#4CAF50', description: 'Relaxation services' },
        { name: 'Currency Exchange', type: 'services', color: '#4CAF50', description: 'Multiple currencies' }
    ],
    'concourse-d': [
        { name: 'Gates D1-D20', type: 'gates', color: '#9C27B0', description: 'Major international carriers' },
        { name: 'Watch Gallery', type: 'shopping', color: '#8C1D40', description: 'Rolex, Omega, Patek Philippe' },
        { name: 'Al Mourjan Lounge', type: 'lounge', color: '#FFB81C', description: 'Qatar Airways flagship lounge' },
        { name: 'Gordon Ramsay Plane Food', type: 'dining', color: '#0C616F', description: 'Celebrity chef cuisine' },
        { name: 'Starbucks', type: 'dining', color: '#0C616F', description: 'Coffee & light refreshments' },
        { name: 'Sleeping Pods', type: 'services', color: '#4CAF50', description: 'Hourly rental available' }
    ],
    'concourse-e': [
        { name: 'Gates E1-E15', type: 'gates', color: '#9C27B0', description: 'African & South Asian routes' },
        { name: 'Tech & Electronics', type: 'shopping', color: '#8C1D40', description: 'Latest gadgets & accessories' },
        { name: 'Garden Lounge', type: 'lounge', color: '#FFB81C', description: 'Zen garden atmosphere' },
        { name: 'Sushi Bar', type: 'dining', color: '#0C616F', description: 'Fresh Japanese cuisine' },
        { name: 'Business Center', type: 'services', color: '#4CAF50', description: 'Printing, meeting rooms' },
        { name: 'Wellness Center', type: 'services', color: '#4CAF50', description: 'Gym & spa facilities' }
    ]
};

// Duty Free Categories
const dutyFreeCategories = [
    { icon: '💎', name: 'Luxury Fashion', description: 'Chanel, Hermès, Gucci, Dior, Louis Vuitton, Prada, Burberry' },
    { icon: '⌚', name: 'Watches & Jewelry', description: 'Rolex, Cartier, Omega, Tiffany & Co., Bvlgari, Patek Philippe' },
    { icon: '💄', name: 'Beauty & Cosmetics', description: 'La Mer, Dior, Chanel, MAC, Estée Lauder, SK-II' },
    { icon: '🍫', name: 'Gourmet & Sweets', description: 'Premium chocolates, Qatari dates, honey, specialty teas' },
    { icon: '🍾', name: 'Wines & Spirits', description: 'Fine wines, champagnes, rare whiskies, premium liquors' },
    { icon: '🧳', name: 'Travel Essentials', description: 'Luggage, travel accessories, electronics, gadgets' },
    { icon: '🎨', name: 'Art & Souvenirs', description: 'Local crafts, Arabic perfumes, traditional gifts' },
    { icon: '👶', name: 'Kids & Toys', description: 'Educational toys, books, games, children\'s fashion' }
];

// Dining Options
const diningOptions = [
    { icon: '🍱', name: 'Nobu', cuisine: 'Japanese', description: 'World-renowned Japanese cuisine with Qatar flair', location: 'Concourse B', price: '$$$$' },
    { icon: '🍔', name: 'Gordon Ramsay Plane Food', cuisine: 'British', description: 'Celebrity chef Gordon Ramsay\'s airport restaurant', location: 'Concourse D', price: '$$$' },
    { icon: '☕', name: 'Harrods Tea Room', cuisine: 'British', description: 'Quintessential British afternoon tea experience', location: 'Concourse B', price: '$$$' },
    { icon: '🍕', name: 'Jamie\'s Italian', cuisine: 'Italian', description: 'Jamie Oliver\'s famous Italian dishes', location: 'Concourse C', price: '$$' },
    { icon: '☕', name: 'Starbucks', cuisine: 'Café', description: 'Your favorite coffee and pastries', location: 'Multiple', price: '$' },
    { icon: '🥗', name: 'Evergreen Organics', cuisine: 'Healthy', description: 'Fresh organic salads and juices', location: 'Concourse A', price: '$$' },
    { icon: '🍜', name: 'Wagamama', cuisine: 'Asian', description: 'Pan-Asian noodles and fresh dishes', location: 'Concourse E', price: '$$' },
    { icon: '🥙', name: 'Arabian Delights', cuisine: 'Middle Eastern', description: 'Authentic Qatari and Lebanese cuisine', location: 'Concourse C', price: '$$' }
];

// Lounges
const lounges = [
    {
        name: 'Al Mourjan Business Lounge',
        class: 'Business & First Class',
        features: ['Gourmet dining', 'Premium bar', 'Shower facilities', 'Quiet zones', 'Business center', 'Prayer rooms', 'Family area', 'Personal concierge'],
        access: 'Qatar Airways Business/First, Oneworld Emerald/Sapphire'
    },
    {
        name: 'Al Maha Lounge',
        class: 'Premium',
        features: ['Hot & cold buffet', 'Comfortable seating', 'Showers', 'WiFi', 'Newspapers & magazines', 'TV lounge', 'Children\'s area'],
        access: 'Premium cabin passengers, Priority Pass members'
    },
    {
        name: 'Oryx Lounge',
        class: 'Business Class',
        features: ['À la carte dining', 'Private sleeping rooms', 'Spa services', 'Meeting rooms', 'Entertainment area', 'Duty-free shopping'],
        access: 'Business class, Gold frequent flyers'
    },
    {
        name: 'Plaza Premium Lounge',
        class: 'Pay-Per-Use',
        features: ['Buffet service', 'Comfortable seating', 'WiFi', 'Showers', 'Business facilities', 'TV & entertainment'],
        access: 'All passengers (QR 275 for 3 hours)'
    }
];

// Services
const services = [
    { icon: '💱', name: 'Currency Exchange', description: 'Multiple exchange bureaus with competitive rates' },
    { icon: '🏧', name: 'ATMs', description: 'Cash withdrawal machines throughout the airport' },
    { icon: '🙏', name: 'Prayer Rooms', description: 'Multi-faith prayer rooms on every level' },
    { icon: '🛏️', name: 'Sleep Pods', description: 'Private pods for rest (QR 55/hour)' },
    { icon: '💆', name: 'Spa & Wellness', description: 'Massage, facials, and relaxation treatments' },
    { icon: '🏊', name: 'Swimming Pool', description: 'Full-size pool with lounge area' },
    { icon: '💼', name: 'Business Center', description: 'Meeting rooms, printing, secretarial services' },
    { icon: '👨‍⚕️', name: 'Medical Center', description: '24/7 medical care and pharmacy' },
    { icon: '🎮', name: 'Gaming Lounges', description: 'Free PlayStation and entertainment zones' },
    { icon: '👶', name: 'Baby Care Rooms', description: 'Private nursing and changing facilities' },
    { icon: '♿', name: 'Special Assistance', description: 'Wheelchair service and accessibility support' },
    { icon: '📶', name: 'Free WiFi', description: 'High-speed internet throughout the airport' }
];

// Initialize page
window.addEventListener('DOMContentLoaded', () => {
    console.log('Hamad Airport page loaded');
    showTerminal('concourse-a');
    loadDutyFreeCategories();
    loadDiningOptions();
    loadLounges();
    loadServices();
    setupTerminalTabs();
});

// Setup terminal tabs
function setupTerminalTabs() {
    const tabs = document.querySelectorAll('.terminal-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const terminal = this.getAttribute('data-terminal');
            showTerminal(terminal);
        });
    });
}

// Show terminal map
function showTerminal(terminal) {
    const container = document.getElementById('terminalMapDisplay');
    if (!container) return;
    
    const data = terminalData[terminal] || terminalData['concourse-a'];
    
    container.innerHTML = `
        <div class="map-area-grid">
            ${data.map(facility => `
                <div class="map-facility" style="border-left-color: ${facility.color};">
                    <h4>${facility.name}</h4>
                    <p>${facility.description}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// Load duty free categories
function loadDutyFreeCategories() {
    const container = document.getElementById('dutyFreeCategories');
    if (!container) return;
    
    container.innerHTML = dutyFreeCategories.map(category => `
        <div class="duty-category">
            <div class="category-icon">${category.icon}</div>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
        </div>
    `).join('');
}

// Load dining options
function loadDiningOptions() {
    const container = document.getElementById('diningOptions');
    if (!container) return;
    
    container.innerHTML = diningOptions.map(dining => `
        <div class="dining-card">
            <div class="dining-visual">
                <span style="font-size: 5rem; position: relative; z-index: 3;">${dining.icon}</span>
            </div>
            <div class="dining-info">
                <h3>${dining.name}</h3>
                <div class="cuisine-tag">${dining.cuisine}</div>
                <p>${dining.description}</p>
                <div class="dining-meta">
                    <span>📍 ${dining.location}</span>
                    <span>💰 ${dining.price}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Load lounges
function loadLounges() {
    const container = document.getElementById('loungesList');
    if (!container) return;
    
    container.innerHTML = lounges.map(lounge => `
        <div class="lounge-card">
            <div class="lounge-banner">
                <h3>${lounge.name}</h3>
                <div class="lounge-type">${lounge.class}</div>
            </div>
            <div class="lounge-details">
                <ul>
                    ${lounge.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <p style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 2px solid #f0f0f0; color: #666;">
                    <strong>Access:</strong> ${lounge.access}
                </p>
            </div>
        </div>
    `).join('');
}

// Load services
function loadServices() {
    const container = document.getElementById('servicesFacilities');
    if (!container) return;
    
    container.innerHTML = services.map(service => `
        <div class="service-box">
            <div class="service-emoji">${service.icon}</div>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
        </div>
    `).join('');
}

// Helper functions for interactive features
function showMetroInfo() {
    alert(`🚇 Doha Metro to Airport

Red Line - Airport Station

Operating Hours:
• Saturday - Thursday: 6:00 AM - 11:00 PM
• Friday: 9:00 AM - 11:00 PM

Fares:
• Standard Class: QR 2
• Gold Class: QR 6
• Day Pass: QR 6 (unlimited)

Journey Time to City Center: ~20 minutes

Download the Doha Metro app for real-time updates!`);
}

function bookTaxi() {
    const message = `🚕 Book Your Airport Taxi

Available Services:
1. Karwa Taxi (Official)
   - Metered fares
   - Airport pickup: Ground Level

2. Uber
   - Download app
   - Track your driver

3. Careem  
   - Local favorite
   - Multiple payment options

Estimated Fare to City Center:
QR 35-50 (~20 minutes)

Pickup Location:
Ground Level - Arrivals Hall

Would you like to proceed with booking?`;
    
    if (confirm(message)) {
        alert('Opening taxi booking options...');
    }
}

function showBusRoutes() {
    alert(`🚌 Mowasalat Airport Buses

Routes Available:
• Route 747: Airport → City Center → The Pearl
• Route 777: Airport → West Bay → Doha Festival City
• Route 757: Airport → Souq Waqif → Msheireb

Operating Hours: 5:00 AM - 12:00 AM

Fare: QR 4 (exact change or Karwa Smartcard)

Frequency: Every 20-30 minutes

Bus Stop Location:
Ground Level - Outside Arrivals Hall

Download Mowasalat app for live tracking!`);
}