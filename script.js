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

// Smooth Scroll to Section (only for same-page anchors)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only handle if it's a valid anchor (not just # and target exists on this page)
        if (href !== '#' && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('active');
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

// Tour Operators Database

const tours = [
    {
        id: 1,
        name: "Desert Safari with Dune Bashing",
        operator: "Qatar Desert Adventures",
        type: "Desert Safari",
        duration: "half-day",
        groupSize: "Small group (up to 6)",
        rating: 5,
        price: 350,
        icon: "🏜️",
        image: "linear-gradient(135deg, #8C1D40 0%, #D4A574 100%)",
        description: "Experience the thrill of dune bashing in the Qatari desert, followed by camel riding and traditional Arabic entertainment",
        highlights: ["4x4 dune bashing", "Camel riding", "Sandboarding", "Desert sunset", "Traditional BBQ dinner"],
        includes: ["Hotel pickup & drop-off", "Professional 4x4 driver", "All activities", "Refreshments & dinner", "Insurance"],
        language: "English, Arabic",
        bestFor: "Adventure seekers"
    },
    {
        id: 2,
        name: "Doha City Tour - Full Day",
        operator: "Discover Qatar Tours",
        type: "City Tour",
        duration: "full-day",
        groupSize: "Medium group (up to 15)",
        rating: 5,
        price: 280,
        icon: "🏛️",
        image: "linear-gradient(135deg, #0C616F 0%, #8C1D40 100%)",
        description: "Comprehensive tour of Doha's iconic landmarks including Museum of Islamic Art, Souq Waqif, The Pearl, and Katara",
        highlights: ["Museum of Islamic Art", "Souq Waqif", "The Pearl Qatar", "Katara Cultural Village", "West Bay skyline"],
        includes: ["Air-conditioned bus", "Professional guide", "Museum entry fees", "Lunch at local restaurant", "Bottled water"],
        language: "English, French, Spanish",
        bestFor: "First-time visitors"
    },
    {
        id: 3,
        name: "Inland Sea (Khor Al Adaid) Adventure",
        operator: "Qatar Expedition",
        type: "Adventure",
        duration: "full-day",
        groupSize: "Private or small group",
        rating: 5,
        price: 550,
        icon: "🌊",
        image: "linear-gradient(135deg, #A12852 0%, #0C616F 100%)",
        description: "Journey to the UNESCO-recognized Inland Sea, where the desert meets the sea in spectacular fashion",
        highlights: ["Inland Sea visit", "Extreme dune bashing", "Swimming opportunity", "Desert wildlife spotting", "Scenic photography"],
        includes: ["Private 4x4 vehicle", "Expert driver-guide", "Picnic lunch", "Swimming gear", "Fuel & permits"],
        language: "English, Arabic",
        bestFor: "Nature lovers"
    },
    {
        id: 4,
        name: "Dhow Cruise with Dinner",
        operator: "Arabian Dhow Cruises",
        type: "Cultural",
        duration: "half-day",
        groupSize: "Large group (up to 50)",
        rating: 4,
        price: 220,
        icon: "⛵",
        image: "linear-gradient(135deg, #8C1D40 0%, #0C616F 100%)",
        description: "Sail along Doha's stunning coastline aboard a traditional wooden dhow while enjoying a delicious buffet dinner",
        highlights: ["Traditional dhow boat", "Doha skyline views", "International buffet", "Live entertainment", "Sunset cruise"],
        includes: ["Dhow cruise", "Buffet dinner", "Soft drinks", "Hotel pickup", "Traditional music"],
        language: "English, Arabic, Hindi",
        bestFor: "Families & couples"
    },
    {
        id: 5,
        name: "Kayaking at Al Thakira Mangroves",
        operator: "Qatar Eco Adventures",
        type: "Water Sports",
        duration: "half-day",
        groupSize: "Small group (up to 8)",
        rating: 5,
        price: 180,
        icon: "🛶",
        image: "linear-gradient(135deg, #4CAF50 0%, #0C616F 100%)",
        description: "Paddle through the serene mangrove forests of Al Thakira, spotting herons, crabs, and unique coastal wildlife",
        highlights: ["Mangrove exploration", "Wildlife spotting", "Professional kayak guide", "Eco-friendly tour", "Photography spots"],
        includes: ["Kayak & equipment", "Safety gear & briefing", "Expert guide", "Snacks & water", "Transportation"],
        language: "English",
        bestFor: "Nature & eco tourists"
    },
    {
        id: 6,
        name: "Private Cultural Heritage Tour",
        operator: "Heritage Qatar",
        type: "Private Tour",
        duration: "full-day",
        groupSize: "Private (1-7 people)",
        rating: 5,
        price: 800,
        icon: "🕌",
        image: "linear-gradient(135deg, #8C1D40 0%, #A12852 100%)",
        description: "Exclusive private tour exploring Qatar's rich heritage including Al Zubarah Fort, Sheikh Faisal Museum, and traditional villages",
        highlights: ["Al Zubarah Fort (UNESCO)", "Sheikh Faisal Museum", "Traditional villages", "Film City", "Flexible itinerary"],
        includes: ["Private luxury vehicle", "Personal guide", "All entrance fees", "Gourmet lunch", "Customizable stops"],
        language: "English, Arabic, German",
        bestFor: "History enthusiasts"
    },
    {
        id: 7,
        name: "Jet Ski Adventure",
        operator: "Qatar Water Sports",
        type: "Water Sports",
        duration: "half-day",
        groupSize: "Small group (up to 6)",
        rating: 4,
        price: 320,
        icon: "🏍️",
        image: "linear-gradient(135deg, #0C616F 0%, #FFB81C 100%)",
        description: "High-speed jet skiing along Qatar's pristine coastline with professional instructors and equipment",
        highlights: ["Jet ski rental", "Coastal tour", "Safety briefing", "Professional guides", "Stunning views"],
        includes: ["Jet ski & fuel", "Safety equipment", "Professional instructor", "Locker facilities", "Insurance"],
        language: "English, Arabic",
        bestFor: "Thrill seekers"
    },
    {
        id: 8,
        name: "Falcon Training Experience",
        operator: "Souq Waqif Falcon Hospital",
        type: "Cultural",
        duration: "half-day",
        groupSize: "Small group (up to 10)",
        rating: 5,
        price: 250,
        icon: "🦅",
        image: "linear-gradient(135deg, #A12852 0%, #8C1D40 100%)",
        description: "Learn about Qatar's ancient falconry traditions with hands-on experience and visit to the famous Falcon Hospital",
        highlights: ["Falcon Hospital tour", "Handle a falcon", "Learn falconry history", "Traditional dress photo", "Educational talk"],
        includes: ["Hospital entry", "Expert falconer guide", "Falcon handling session", "Refreshments", "Certificate"],
        language: "English, Arabic",
        bestFor: "Culture & wildlife lovers"
    },
    {
        id: 9,
        name: "Al Wakrah Coastal Tour",
        operator: "Coastal Qatar Tours",
        type: "City Tour",
        duration: "half-day",
        groupSize: "Medium group (up to 12)",
        rating: 4,
        price: 150,
        icon: "🏖️",
        image: "linear-gradient(135deg, #0C616F 0%, #8C1D40 100%)",
        description: "Explore the charming coastal town of Al Wakrah with its traditional souq, beach, and restored heritage buildings",
        highlights: ["Al Wakrah Souq", "Coastal walk", "Traditional architecture", "Heritage museum", "Local cafés"],
        includes: ["Transportation", "Professional guide", "Museum entry", "Light refreshments", "Photo stops"],
        language: "English, Arabic",
        bestFor: "Photography & culture"
    },
    {
        id: 10,
        name: "Overnight Desert Camping",
        operator: "Qatar Desert Adventures",
        type: "Desert Safari",
        duration: "multi-day",
        groupSize: "Small group (up to 8)",
        rating: 5,
        price: 650,
        icon: "⛺",
        image: "linear-gradient(135deg, #8C1D40 0%, #D4A574 100%)",
        description: "Spend a night under the stars in traditional Bedouin-style camps with BBQ dinner, campfire, and sunrise dune bashing",
        highlights: ["Overnight camping", "Bedouin tent stay", "BBQ dinner & breakfast", "Stargazing", "Sunrise dune bashing"],
        includes: ["All meals", "Camping equipment", "Entertainment", "4x4 transport", "Professional guides"],
        language: "English, Arabic",
        bestFor: "Adventure & romance"
    },
    {
        id: 11,
        name: "Food & Culture Walking Tour",
        operator: "Taste of Qatar",
        type: "Cultural",
        duration: "half-day",
        groupSize: "Small group (up to 10)",
        rating: 5,
        price: 280,
        icon: "🍽️",
        image: "linear-gradient(135deg, #A12852 0%, #8C1D40 100%)",
        description: "Guided walking tour through Souq Waqif sampling traditional Qatari cuisine and learning about local food culture",
        highlights: ["Souq Waqif exploration", "10+ food tastings", "Spice market visit", "Traditional cooking demo", "Tea ceremony"],
        includes: ["Expert food guide", "All food samples", "Market tour", "Recipe cards", "Drinks"],
        language: "English",
        bestFor: "Food lovers"
    },
    {
        id: 12,
        name: "Banana Island Resort Day Pass",
        operator: "Banana Island by Anantara",
        type: "Private Tour",
        duration: "full-day",
        groupSize: "Individual or family",
        rating: 5,
        price: 450,
        icon: "🏝️",
        image: "linear-gradient(135deg, #4CAF50 0%, #0C616F 100%)",
        description: "Luxury day trip to exclusive Banana Island Resort with beach access, water sports, and gourmet dining",
        highlights: ["Ferry transfer", "Private beach", "Pool access", "Water sports", "Resort facilities", "Lunch buffet"],
        includes: ["Round-trip ferry", "Beach & pool access", "Buffet lunch", "Towels & lockers", "Water sports equipment"],
        language: "English, Arabic, Multiple",
        bestFor: "Luxury seekers"
    }
];

let filteredTours = [...tours];
let currentTour = null;

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('Tours.js loaded successfully');
    console.log('Tours database has', tours.length, 'tours');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const tourDateInput = document.getElementById('tourDate');
    const bookingDateInput = document.getElementById('bookingDate');
    
    if (tourDateInput) tourDateInput.min = today;
    if (bookingDateInput) bookingDateInput.min = today;
    
    // Display all tours initially
    displayTours(tours);
    
    // Update pricing when participants change
    const numParticipantsInput = document.getElementById('numParticipants');
    if (numParticipantsInput) {
        numParticipantsInput.addEventListener('change', updatePricing);
    }
});

// Display tours in grid
function displayTours(toursToDisplay) {
    const grid = document.getElementById('toursGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (toursToDisplay.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; padding: 3rem; grid-column: 1/-1;">No tours found matching your criteria. Please adjust your filters.</p>';
        return;
    }
    
    toursToDisplay.forEach(tour => {
        const card = document.createElement('div');
        card.className = 'tour-card';
        card.onclick = () => openBookingModal(tour.id);
        
        card.innerHTML = `
            <div class="tour-card-image" style="background: ${tour.image};">
                <span style="font-size: 6rem;">${tour.icon}</span>
                <div class="tour-badge">${tour.type}</div>
            </div>
            <div class="tour-card-content">
                <div class="tour-card-header">
                    <h3>${tour.name}</h3>
                    <p class="tour-operator">by ${tour.operator}</p>
                </div>
                <div class="tour-meta">
                    <span class="tour-rating">${'⭐'.repeat(tour.rating)}</span>
                    <span class="tour-type">${tour.duration.replace('-', ' ')}</span>
                </div>
                <p class="tour-description">${tour.description}</p>
                <div class="tour-highlights">
                    ${tour.highlights.slice(0, 3).map(h => `<span class="highlight-item">${h}</span>`).join('')}
                </div>
                <div class="tour-card-footer">
                    <div class="tour-price">
                        <span class="price-label">From</span>
                        <span class="price-amount">QR ${tour.price}</span>
                        <span class="price-period">per person</span>
                    </div>
                    <button class="btn-book-tour" onclick="event.stopPropagation(); openBookingModal(${tour.id})">Book Now</button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Search tours
function searchTours() {
    console.log('Search tours clicked');
    
    const typeFilter = document.getElementById('typeFilter').value;
    const durationFilter = document.getElementById('durationFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    
    let filtered = [...tours];
    
    // Filter by type
    if (typeFilter !== 'all') {
        filtered = filtered.filter(t => t.type === typeFilter);
    }
    
    // Filter by duration
    if (durationFilter !== 'all') {
        filtered = filtered.filter(t => t.duration === durationFilter);
    }
    
    // Filter by price range
    if (priceFilter !== 'all') {
        if (priceFilter === 'budget') {
            filtered = filtered.filter(t => t.price < 200);
        } else if (priceFilter === 'mid') {
            filtered = filtered.filter(t => t.price >= 200 && t.price <= 500);
        } else if (priceFilter === 'premium') {
            filtered = filtered.filter(t => t.price > 500);
        }
    }
    
    filteredTours = filtered;
    displayTours(filteredTours);
    
    // Scroll to results
    document.querySelector('.tours-section').scrollIntoView({ behavior: 'smooth' });
}

// Sort tours
function sortTours() {
    const sortBy = document.getElementById('sortBy').value;
    let sorted = [...filteredTours];
    
    if (sortBy === 'price-low') {
        sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        sorted.sort((a, b) => b.rating - a.rating);
    }
    // 'featured' keeps the original order
    
    displayTours(sorted);
}

// Open booking modal
function openBookingModal(tourId) {
    const tour = tours.find(t => t.id === tourId);
    if (!tour) return;
    
    currentTour = tour;
    
    // Populate tour information
    document.getElementById('modalTourImage').innerHTML = `<span style="font-size: 6rem;">${tour.icon}</span>`;
    document.getElementById('modalTourImage').style.background = tour.image;
    document.getElementById('modalTourName').textContent = tour.name;
    document.getElementById('modalOperator').textContent = `by ${tour.operator}`;
    document.getElementById('modalRating').textContent = '⭐'.repeat(tour.rating);
    document.getElementById('modalType').textContent = tour.type;
    document.getElementById('modalDescription').textContent = tour.description;
    
    // Populate includes
    const includesList = document.getElementById('modalIncludes');
    includesList.innerHTML = `
        <h4>Tour Includes</h4>
        <ul>
            ${tour.includes.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    
    // Update booking summary
    document.getElementById('summaryDuration').textContent = tour.duration.replace('-', ' ');
    document.getElementById('summaryGroupSize').textContent = tour.groupSize;
    document.getElementById('summaryLanguage').textContent = tour.language;
    
    // Set initial pricing
    updatePricing();
    
    // Show modal
    document.getElementById('bookingModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close booking modal
function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('bookingForm').reset();
}

// Update pricing
function updatePricing() {
    if (!currentTour) return;
    
    const numParticipants = parseInt(document.getElementById('numParticipants').value) || 2;
    const pricePerPerson = currentTour.price;
    const subtotal = pricePerPerson * numParticipants;
    const total = subtotal;
    
    document.getElementById('pricePerPerson').textContent = `QR ${pricePerPerson}`;
    document.getElementById('numPax').textContent = numParticipants;
    document.getElementById('subtotal').textContent = `QR ${subtotal}`;
    document.getElementById('total').textContent = `QR ${total}`;
}

// Submit booking
function submitBooking(event) {
    event.preventDefault();
    
    if (!currentTour) return;
    
    const name = document.getElementById('guestName').value;
    const email = document.getElementById('guestEmail').value;
    const phone = document.getElementById('guestPhone').value;
    const date = document.getElementById('bookingDate').value;
    const participants = document.getElementById('numParticipants').value;
    const pickup = document.getElementById('pickupLocation').value;
    const requests = document.getElementById('specialRequests').value;
    const total = document.getElementById('total').textContent;
    
    // Validate
    if (!name || !email || !date || !participants) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Create booking data
    const bookingData = {
        tour: currentTour.name,
        operator: currentTour.operator,
        guestName: name,
        email: email,
        phone: phone,
        date: date,
        participants: participants,
        pickupLocation: pickup,
        specialRequests: requests,
        total: total,
        bookingDate: new Date().toISOString()
    };
    
    // Log booking data (in real app, this would be sent to server)
    console.log('Booking submitted:', bookingData);
    
    // Show success message
    alert(`✓ Booking Request Submitted!

Tour: ${currentTour.name}
Operator: ${currentTour.operator}
Guest: ${name}
Date: ${date}
Participants: ${participants}
Total: ${total}

A confirmation email will be sent to ${email}

The tour operator will contact you within 24 hours to confirm your booking and arrange pickup details.`);
    
    // Close modal and reset
    closeBookingModal();
}


// Safety Information Database

const safetyInfo = [
    // EMERGENCY SERVICES
    {
        id: 1,
        title: "Emergency Numbers - Police, Fire, Ambulance",
        category: "emergency",
        priority: "critical",
        icon: "🚨",
        description: "Qatar has a unified emergency number 999 for police, fire, and ambulance services. English-speaking operators available 24/7.",
        tips: [
            "Dial 999 for all emergencies",
            "English operators available",
            "Stay calm and provide clear location",
            "Keep your phone charged",
            "Save your hotel address in Arabic"
        ],
        contact: {
            primary: "999 - All Emergencies",
            secondary: "+974 4439 2222 - Hamad Hospital"
        },
        procedure: "When calling 999: State your emergency clearly, provide your exact location, follow operator instructions, stay on the line until help arrives.",
        resources: "Emergency services in Qatar are highly efficient with average response times of 10-15 minutes in urban areas."
    },
    {
        id: 2,
        title: "Medical Services & Hospitals",
        category: "health",
        priority: "critical",
        icon: "🏥",
        description: "Qatar has world-class medical facilities. Hamad Medical Corporation operates main hospitals with 24/7 emergency services.",
        tips: [
            "Hamad Hospital - Main emergency center",
            "Sidra Medicine - Women & children",
            "Multiple private hospitals available",
            "Pharmacies widely available",
            "Medical insurance recommended"
        ],
        contact: {
            primary: "4439 2222 - Hamad Hospital ER",
            secondary: "16000 - Medical Hotline (non-emergency)"
        },
        procedure: "For medical emergencies: Call 999 for ambulance. For non-emergencies: Visit hospital ER or call 16000 for advice. Most hospitals accept international insurance.",
        resources: "English-speaking doctors available at all major hospitals. Many doctors trained in UK, US, and Canada."
    },
    {
        id: 3,
        title: "Tourist Police & Assistance",
        category: "security",
        priority: "important",
        icon: "👮",
        description: "Qatar has dedicated tourist police trained to assist visitors in multiple languages throughout major tourist areas.",
        tips: [
            "Tourist police wear distinctive uniforms",
            "Available at major tourist sites",
            "Multilingual assistance",
            "Can help with directions & info",
            "Report crimes or lost items"
        ],
        contact: {
            primary: "999 - Emergency",
            secondary: "4439 2222 - Non-emergency police line"
        },
        procedure: "Tourist police patrol Souq Waqif, Corniche, The Pearl, museums, and shopping malls. They can assist with language barriers and provide directions.",
        resources: "Tourist police speak English, Arabic, Hindi, Urdu, and other languages. They're approachable and helpful."
    },
    
    // HEALTH & MEDICAL
    {
        id: 4,
        title: "Travel Insurance & Healthcare Costs",
        category: "health",
        priority: "important",
        icon: "💊",
        description: "While Qatar has excellent healthcare, costs can be high for visitors. Travel insurance strongly recommended.",
        tips: [
            "Get comprehensive travel insurance",
            "Emergency care available to all",
            "Private hospitals are expensive",
            "Keep insurance documents handy",
            "Many hotels have medical services"
        ],
        contact: {
            primary: "Check with your insurance provider",
            secondary: "Your embassy can assist"
        },
        procedure: "Emergency treatment is provided regardless of ability to pay. However, you'll be billed later. Insurance covers most costs.",
        resources: "Average ER visit: QR 500-1000. Specialist consultation: QR 300-600. Private room: QR 1000+/night."
    },
    {
        id: 5,
        title: "Heat Safety & Hydration",
        category: "environment",
        priority: "critical",
        icon: "☀️",
        description: "Qatar's summer temperatures can exceed 45°C (113°F). Heat exhaustion and dehydration are serious risks for unprepared visitors.",
        tips: [
            "Drink 3-4 liters of water daily",
            "Avoid midday sun (11 AM - 3 PM)",
            "Wear lightweight, light-colored clothes",
            "Use high SPF sunscreen",
            "Stay in air-conditioned areas"
        ],
        contact: {
            primary: "999 if experiencing heat stroke symptoms",
            secondary: "16000 for heat-related health advice"
        },
        procedure: "Signs of heat stroke: confusion, rapid heartbeat, hot dry skin, headache. Move to shade/AC immediately, drink water, call 999 if severe.",
        resources: "Peak summer (June-August) can be dangerous. Most activities move indoors. Drink water even if not thirsty."
    },
    {
        id: 6,
        title: "COVID-19 & Health Regulations",
        category: "health",
        priority: "important",
        icon: "😷",
        description: "Qatar maintains health protocols. Check current requirements before travel as regulations may change.",
        tips: [
            "Check latest entry requirements",
            "Health declaration may be required",
            "PCR tests available at airports",
            "Follow local health guidelines",
            "Pharmacies stock medical supplies"
        ],
        contact: {
            primary: "16000 - COVID Hotline",
            secondary: "Ministry of Public Health website"
        },
        procedure: "Download Ehteraz app if required. Carry hand sanitizer. Follow posted guidelines in public spaces.",
        resources: "Qatar has excellent testing facilities. Results usually within 24 hours. Many testing centers across Doha."
    },
    
    // SECURITY & CRIME
    {
        id: 7,
        title: "Crime Rate & Personal Safety",
        category: "security",
        priority: "general",
        icon: "🔒",
        description: "Qatar has one of the world's lowest crime rates. Violent crime is extremely rare. Petty theft is uncommon but be vigilant.",
        tips: [
            "Qatar is very safe day and night",
            "Violent crime extremely rare",
            "Petty theft uncommon",
            "Use hotel safes for valuables",
            "Be aware in crowded areas"
        ],
        contact: {
            primary: "999 - To report crime",
            secondary: "Your embassy for assistance"
        },
        procedure: "If victim of crime: Call 999, get police report (required for insurance), contact your embassy if passport stolen.",
        resources: "Qatar consistently ranks as one of the safest countries globally. Women can travel alone safely. Streets well-lit and monitored."
    },
    {
        id: 8,
        title: "Scams & Tourist Traps",
        category: "security",
        priority: "general",
        icon: "⚠️",
        description: "Tourist scams are rare in Qatar. However, be aware of inflated taxi fares and unauthorized tour guides.",
        tips: [
            "Use official Karwa taxis or apps",
            "Agree on prices before services",
            "Licensed tour guides only",
            "Souq bargaining is normal",
            "Credit card fraud is rare"
        ],
        contact: {
            primary: "Consumer Protection: 8008080",
            secondary: "Tourist Police: 999"
        },
        procedure: "If overcharged: Get receipt, note taxi number/business name, report to Consumer Protection. Keep credit card in sight during transactions.",
        resources: "Qatar's economy is strong - aggressive scamming rare. Most businesses are honest. Tourist areas generally safe."
    },
    {
        id: 9,
        title: "Lost or Stolen Items",
        category: "security",
        priority: "important",
        icon: "📱",
        description: "Report lost/stolen items immediately. Qatar has excellent recovery rates for lost property.",
        tips: [
            "Report to police immediately",
            "Get police report for insurance",
            "Contact your embassy if passport lost",
            "Cancel cards immediately",
            "Check lost & found offices"
        ],
        contact: {
            primary: "999 - Police",
            secondary: "4010 6109 - Airport Lost & Found"
        },
        procedure: "Lost passport: Police report → Embassy → Temporary travel document. Lost cards: Call bank immediately. Keep copies of documents separately.",
        resources: "Hotels, malls, and airports have lost & found. Many items returned within days. Qataris are generally honest and helpful."
    },
    
    // TRAVEL SAFETY
    {
        id: 10,
        title: "Road Safety & Driving",
        category: "travel",
        priority: "important",
        icon: "🚗",
        description: "Qatar has modern roads but aggressive driving is common. Traffic accidents are a leading safety concern.",
        tips: [
            "Seatbelts mandatory for all",
            "Zero tolerance for drunk driving",
            "Speed cameras everywhere",
            "Drive defensively",
            "Parking strictly enforced"
        ],
        contact: {
            primary: "999 - Traffic accidents",
            secondary: "4488 8888 - Traffic violations"
        },
        procedure: "In accident: Don't move vehicles, call 999, exchange info, get police report. Never admit fault. Wait for police.",
        resources: "International licenses accepted. Driving on the right. Penalties are steep. Always have insurance and registration."
    },
    {
        id: 11,
        title: "Desert Safety",
        category: "travel",
        priority: "critical",
        icon: "🏜️",
        description: "Desert can be dangerous. Never venture out alone. Use reputable tour operators for desert activities.",
        tips: [
            "Never go alone into desert",
            "Use professional tour operators",
            "Carry extra water (5L per person)",
            "Fully charged phone + power bank",
            "Tell someone your plans"
        ],
        contact: {
            primary: "999 - Desert rescue",
            secondary: "Tour operator emergency line"
        },
        procedure: "If lost: Stay with vehicle, don't wander. Use phone GPS. Call 999. Stay in shade. Conserve water. Wait for rescue.",
        resources: "Desert temperatures extreme. No cellular coverage in remote areas. GPS essential. Professional guides know safe routes."
    },
    {
        id: 12,
        title: "Water Safety & Swimming",
        category: "travel",
        priority: "important",
        icon: "🏊",
        description: "Beaches and pools are safe but follow guidelines. Strong currents possible at some beaches.",
        tips: [
            "Swim at designated beaches only",
            "Follow lifeguard instructions",
            "No swimming during red flag",
            "Beware of jellyfish (seasonal)",
            "Children must be supervised"
        ],
        contact: {
            primary: "999 - Water emergency",
            secondary: "Beach lifeguards on duty"
        },
        procedure: "Drowning emergency: Call 999 immediately. Most beaches have lifeguards. Hotels have pool safety staff.",
        resources: "Public beaches: Katara Beach, The Pearl. Private beaches at resorts. Water sports require safety gear."
    },
    
    // LAWS & REGULATIONS
    {
        id: 13,
        title: "Alcohol Laws & Restrictions",
        category: "laws",
        priority: "important",
        icon: "🍷",
        description: "Alcohol only available in licensed hotels and restaurants. Public intoxication illegal. Strict penalties apply.",
        tips: [
            "Only drink in licensed venues",
            "No alcohol in public spaces",
            "Zero tolerance for drink-driving",
            "Don't drink during Ramadan (daytime)",
            "Keep receipts if transporting"
        ],
        contact: {
            primary: "999 - If arrested",
            secondary: "Your embassy immediately"
        },
        procedure: "Penalties severe: Prison time possible. Don't argue with police. Request embassy contact. Never drink and drive.",
        resources: "Licensed venues: Hotel bars, restaurants in hotels. QDC stores for residents only (permit needed). Visitors use hotel services."
    },
    {
        id: 14,
        title: "Dress Code & Public Behavior",
        category: "laws",
        priority: "important",
        icon: "👔",
        description: "Modest dress required in public. Shoulders and knees covered. Swimwear only at beaches/pools.",
        tips: [
            "Cover shoulders and knees",
            "No shorts in malls/government buildings",
            "Beachwear only at beach/pool",
            "Remove shoes at mosques",
            "No public displays of affection"
        ],
        contact: {
            primary: "Mall security will advise on dress",
            secondary: "Tourist police can explain"
        },
        procedure: "If dress inappropriate: You may be asked to leave or cover up. Carry a light shawl/cardigan. Respect local customs.",
        resources: "Malls display dress code signs. Hotels more relaxed. Government buildings strict. No one expects full traditional dress."
    },
    {
        id: 15,
        title: "Photography Restrictions",
        category: "laws",
        priority: "general",
        icon: "📷",
        description: "Don't photograph people without permission. Military and government buildings prohibited.",
        tips: [
            "Ask before photographing people",
            "No photos of military/government",
            "Museums may prohibit flash",
            "Respect prayer times at mosques",
            "Drones require permit"
        ],
        contact: {
            primary: "Security will stop unauthorized photos",
            secondary: "Tourist police can advise"
        },
        procedure: "If confronted about photos: Apologize, delete if requested, cooperate with security. Don't argue.",
        resources: "Tourist sites welcome photos. Skyline photos OK. Markets - ask vendors. Most people happy to pose if asked politely."
    },

    // ENVIRONMENT & WEATHER
    {
        id: 16,
        title: "Sandstorms & Dust",
        category: "environment",
        priority: "general",
        icon: "🌪️",
        description: "Occasional sandstorms occur, especially in spring. Visibility can drop to zero. Stay indoors during storms.",
        tips: [
            "Monitor weather forecasts",
            "Stay indoors during storms",
            "Close windows and doors",
            "Use air purifiers if available",
            "Carry face mask"
        ],
        contact: {
            primary: "Weather service: meteorology.gov.qa",
            secondary: "Hotel staff for local advice"
        },
        procedure: "During sandstorm: Stay inside, seal windows/doors, use AC filters. Don't drive if visibility poor. Wait it out.",
        resources: "Storms usually pass in hours. Not dangerous if inside. May disrupt flights. Check flight status during dust events."
    },
    {
        id: 17,
        title: "Marine Life & Beach Hazards",
        category: "environment",
        priority: "general",
        icon: "🐙",
        description: "Jellyfish seasonally present. Generally harmless but stings painful. Sea urchins on rocky areas.",
        tips: [
            "Wear water shoes on rocky beaches",
            "Shuffle feet when entering water",
            "Jellyfish more common in summer",
            "Vinegar for jellyfish stings",
            "Seek medical help if severe"
        ],
        contact: {
            primary: "Beach lifeguards",
            secondary: "999 for severe reactions"
        },
        procedure: "Jellyfish sting: Rinse with seawater (not fresh), apply vinegar, remove tentacles with tweezers. Seek medical help if breathing difficulties.",
        resources: "Most stings are minor. Beaches monitored. Lifeguards trained in first aid. Hotels have medical kits."
    },
    {
        id: 18,
        title: "Air Quality & Pollution",
        category: "environment",
        priority: "general",
        icon: "💨",
        description: "Generally good air quality. Dust increases during sandstorms. Some pollution from traffic and construction.",
        tips: [
            "Check air quality apps",
            "Limit outdoor exercise during high pollution",
            "Keep windows closed during dust",
            "Stay hydrated",
            "Asthmatics carry inhaler"
        ],
        contact: {
            primary: "Air quality: aqicn.org/city/qatar",
            secondary: "16000 for health concerns"
        },
        procedure: "Poor air quality days: Reduce outdoor activities, use AC with filters, stay hydrated, seek medical help if breathing difficulties.",
        resources: "Air quality usually excellent. Winter best. Summer dust more common. Indoor air filtered and clean."
    }
];

let filteredSafety = [...safetyInfo];
let currentSafety = null;

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('Safety.js loaded successfully');
    console.log('Safety database has', safetyInfo.length, 'topics');
    
    // Display all safety info initially
    displaySafety(safetyInfo);
});

// Display safety information in grid
function displaySafety(safetyToDisplay) {
    const grid = document.getElementById('safetyGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (safetyToDisplay.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; padding: 3rem; grid-column: 1/-1;">No safety information found. Please adjust your filters.</p>';
        return;
    }
    
    safetyToDisplay.forEach(safety => {
        const card = document.createElement('div');
        card.className = `safety-card ${safety.priority}`;
        card.onclick = () => openSafetyModal(safety.id);
        
        const priorityBadge = safety.priority === 'critical' ? 'CRITICAL' : 
                             safety.priority === 'important' ? 'IMPORTANT' : 'GENERAL';
        
        card.innerHTML = `
            <div class="safety-card-image">
                <span style="font-size: 5rem;">${safety.icon}</span>
                <div class="priority-badge ${safety.priority}">${priorityBadge}</div>
            </div>
            <div class="safety-card-content">
                <h3>${safety.title}</h3>
                <div class="safety-category">${safety.category}</div>
                <p class="safety-description">${safety.description}</p>
                <div class="safety-key-points">
                    ${safety.tips.slice(0, 3).map(tip => `
                        <div class="key-point">
                            <span class="key-point-icon">✓</span>
                            <span>${tip}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="safety-card-footer">
                    <button class="btn-view-safety" onclick="event.stopPropagation(); openSafetyModal(${safety.id})">View Details</button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Search safety information
function searchSafety() {
    console.log('Search safety clicked');
    
    const category = document.getElementById('categoryFilter').value;
    const priority = document.getElementById('priorityFilter').value;
    
    let filtered = [...safetyInfo];
    
    // Filter by category
    if (category !== 'all') {
        filtered = filtered.filter(s => s.category === category);
    }
    
    // Filter by priority
    if (priority !== 'all') {
        filtered = filtered.filter(s => s.priority === priority);
    }
    
    filteredSafety = filtered;
    displaySafety(filteredSafety);
}

// Sort safety information
function sortSafety() {
    const sortBy = document.getElementById('sortBy').value;
    let sorted = [...filteredSafety];
    
    if (sortBy === 'priority') {
        const priorityOrder = { critical: 1, important: 2, general: 3 };
        sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === 'category') {
        sorted.sort((a, b) => a.category.localeCompare(b.category));
    }
    // 'featured' keeps the original order
    
    displaySafety(sorted);
}

// Open safety modal
function openSafetyModal(safetyId) {
    const safety = safetyInfo.find(s => s.id === safetyId);
    if (!safety) return;
    
    currentSafety = safety;
    
    // Populate safety information
    document.getElementById('modalSafetyIcon').textContent = safety.icon;
    document.getElementById('modalSafetyTitle').textContent = safety.title;
    document.getElementById('modalCategory').textContent = safety.category.toUpperCase();
    
    const priorityBadge = safety.priority === 'critical' ? 'CRITICAL' : 
                         safety.priority === 'important' ? 'IMPORTANT' : 'GENERAL INFO';
    document.getElementById('modalPriority').innerHTML = `<span class="${safety.priority}">${priorityBadge}</span>`;
    
    document.getElementById('modalDescription').textContent = safety.description;
    
    // Populate tips
    const tipsList = document.getElementById('modalTips');
    tipsList.innerHTML = `
        <h4>Key Safety Tips</h4>
        <ul>
            ${safety.tips.map(tip => `<li>${tip}</li>`).join('')}
        </ul>
    `;
    
    // Populate contact
    document.getElementById('modalContact').innerHTML = `
        <h4>Emergency Contacts</h4>
        <div class="contact-info">
            <p><strong>Primary:</strong> ${safety.contact.primary}</p>
            <p><strong>Secondary:</strong> ${safety.contact.secondary}</p>
        </div>
    `;
    
    // Populate procedure
    document.getElementById('modalProcedure').innerHTML = `
        <h4>What To Do</h4>
        <p>${safety.procedure}</p>
    `;
    
    // Populate resources
    document.getElementById('modalResources').innerHTML = `
        <h4>Additional Information</h4>
        <p>${safety.resources}</p>
    `;
    
    // Show modal
    document.getElementById('safetyModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close safety modal
function closeSafetyModal() {
    document.getElementById('safetyModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Call emergency (placeholder)
function callEmergency() {
    const emergencyInfo = `🚨 QATAR EMERGENCY NUMBERS

CRITICAL - SAVE THESE:
☎️ 999 - All Emergencies (Police, Fire, Ambulance)
☎️ +974 4439 2222 - Hamad Hospital Emergency
☎️ 16000 - Medical Hotline (non-emergency)

OTHER IMPORTANT NUMBERS:
☎️ +974 4428 8888 - Coast Guard
☎️ 8008080 - Consumer Protection
☎️ +974 4010 6109 - Airport Lost & Found

EMBASSY CONTACTS:
Contact your embassy for assistance with:
- Lost/stolen passports
- Legal issues
- Emergency repatriation

TOURIST POLICE:
Available at major tourist sites
Multilingual assistance
Can call 999 to summon them

Stay safe in Qatar! 🇶🇦`;

    alert(emergencyInfo);
}

// Save for reference (placeholder)
function saveForReference() {
    if (!currentSafety) return;
    
    const info = `SAFETY INFO: ${currentSafety.title}

${currentSafety.description}

KEY TIPS:
${currentSafety.tips.map((tip, i) => `${i + 1}. ${tip}`).join('\n')}

CONTACTS:
Primary: ${currentSafety.contact.primary}
Secondary: ${currentSafety.contact.secondary}

WHAT TO DO:
${currentSafety.procedure}

Saved from Qatar Tourism Safety Guide`;

    // Create downloadable text file
    const blob = new Blob([info], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qatar-safety-${currentSafety.id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    alert('✓ Safety information saved!\n\nCheck your downloads folder for the text file.');
}

// Concierge Services Database

const conciergeServices = [
    // TRAVEL & TRANSPORTATION
    {
        id: 1,
        name: "VIP Airport Meet & Greet",
        type: "travel",
        availability: "24/7",
        icon: "✈️",
        description: "Luxury airport assistance with fast-track immigration, luggage handling, and private lounge access",
        features: [
            "Personal greeter at aircraft door",
            "Fast-track immigration & customs",
            "VIP lounge access",
            "Luggage porter service",
            "Private transfer to hotel"
        ],
        pricing: "From QR 500",
        includes: ["Meet & greet service", "Fast-track processing", "Lounge access", "Porter service", "Transfer coordination"]
    },
    {
        id: 2,
        name: "Luxury Chauffeur Service",
        type: "travel",
        availability: "24/7",
        icon: "🚗",
        description: "Professional chauffeur-driven luxury vehicles for all your transportation needs in Qatar",
        features: [
            "Mercedes S-Class, BMW 7 Series, or similar",
            "Professional multilingual drivers",
            "Complimentary WiFi & refreshments",
            "Child seats available",
            "Airport transfers & hourly bookings"
        ],
        pricing: "From QR 300/hour",
        includes: ["Luxury vehicle", "Professional chauffeur", "Fuel & tolls", "Bottled water", "Phone charger"]
    },
    {
        id: 3,
        name: "Yacht & Boat Charter",
        type: "luxury",
        availability: "Advance Booking",
        icon: "🛥️",
        description: "Private yacht charters for cruising the Arabian Gulf with crew and catering options",
        features: [
            "Luxury yachts 40ft to 100ft+",
            "Experienced captain & crew",
            "Fishing equipment available",
            "Catering packages",
            "Water sports equipment"
        ],
        pricing: "From QR 2,500/4 hours",
        includes: ["Yacht rental", "Captain & crew", "Fuel", "Safety equipment", "Basic refreshments"]
    },
    {
        id: 4,
        name: "Private Jet Charter",
        type: "luxury",
        availability: "Advance Booking",
        icon: "🛩️",
        description: "Executive private jet charters for regional and international travel",
        features: [
            "Light jets to heavy jets",
            "Flexible scheduling",
            "Catering on board",
            "Ground transportation included",
            "Pet-friendly options"
        ],
        pricing: "Contact for quote",
        includes: ["Aircraft charter", "Crew", "Fuel & fees", "Ground handling", "Flight planning"]
    },

    // LIFESTYLE & PERSONAL
    {
        id: 5,
        name: "Personal Shopping Assistant",
        type: "lifestyle",
        availability: "Business Hours",
        icon: "🛍️",
        description: "Expert personal shopper to guide you through Qatar's luxury malls and souqs",
        features: [
            "Fashion stylist consultation",
            "Access to exclusive boutiques",
            "VIP shopping experience",
            "Tax-free shopping assistance",
            "Gift selection & wrapping"
        ],
        pricing: "QR 400 for 3 hours",
        includes: ["Personal shopper", "Transportation", "Mall VIP services", "Refreshments", "Delivery to hotel"]
    },
    {
        id: 6,
        name: "Private Chef & Dining",
        type: "lifestyle",
        availability: "Advance Booking",
        icon: "👨‍🍳",
        description: "In-villa or yacht private chef service for intimate dining experiences",
        features: [
            "Michelin-trained chefs",
            "Customized menus",
            "International cuisines",
            "Dietary accommodations",
            "Full service setup & cleanup"
        ],
        pricing: "From QR 1,500 per experience",
        includes: ["Private chef", "Premium ingredients", "Service staff", "Table setup", "Cleanup service"]
    },
    {
        id: 7,
        name: "Spa & Wellness Concierge",
        type: "lifestyle",
        availability: "Business Hours",
        icon: "💆",
        description: "Curated spa and wellness experiences at Qatar's finest facilities",
        features: [
            "Spa reservations at top hotels",
            "In-room massage services",
            "Yoga & fitness instructors",
            "Wellness retreat planning",
            "Beauty treatments & salons"
        ],
        pricing: "From QR 300 booking fee",
        includes: ["Spa booking service", "Treatment recommendations", "Transportation", "Special requests coordination"]
    },
    {
        id: 8,
        name: "Personal Styling & Grooming",
        type: "lifestyle",
        availability: "Advance Booking",
        icon: "✂️",
        description: "Professional styling, hair, and grooming services delivered to your location",
        features: [
            "Hair stylist & makeup artist",
            "Wardrobe consultation",
            "Formal event preparation",
            "Photo shoot styling",
            "Barber & spa services"
        ],
        pricing: "From QR 500",
        includes: ["Professional stylist", "Equipment & products", "Consultation", "Travel to location"]
    },

    // BUSINESS SERVICES
    {
        id: 9,
        name: "Business Center & Secretarial",
        type: "business",
        availability: "Business Hours",
        icon: "💼",
        description: "Professional business support services including meeting rooms and secretarial assistance",
        features: [
            "Private meeting rooms",
            "Translation services",
            "Document preparation",
            "Video conferencing",
            "Administrative support"
        ],
        pricing: "From QR 200/hour",
        includes: ["Meeting space", "Equipment", "WiFi", "Refreshments", "Technical support"]
    },
    {
        id: 10,
        name: "Legal & Documentation Services",
        type: "business",
        availability: "Business Hours",
        icon: "📋",
        description: "Document attestation, legal assistance, and business setup support",
        features: [
            "Document attestation",
            "Contract review",
            "Business setup guidance",
            "Notary services",
            "Legal consultation"
        ],
        pricing: "Contact for quote",
        includes: ["Consultation", "Document processing", "Government liaison", "Follow-up services"]
    },
    {
        id: 11,
        name: "Interpreter & Translation",
        type: "business",
        availability: "24/7",
        icon: "🗣️",
        description: "Professional interpretation and translation services in 30+ languages",
        features: [
            "Simultaneous interpretation",
            "Document translation",
            "Business meeting support",
            "Conference interpretation",
            "Certified translations"
        ],
        pricing: "From QR 300/hour",
        includes: ["Professional interpreter", "Equipment if needed", "Travel to location", "Preparation time"]
    },

    // EVENTS & ENTERTAINMENT
    {
        id: 12,
        name: "Event Planning & Coordination",
        type: "events",
        availability: "Advance Booking",
        icon: "🎉",
        description: "Full-service event planning for weddings, corporate events, and celebrations",
        features: [
            "Venue selection & booking",
            "Catering coordination",
            "Entertainment booking",
            "Decor & styling",
            "Guest management"
        ],
        pricing: "From QR 5,000",
        includes: ["Event planner", "Vendor coordination", "Timeline management", "Day-of coordination"]
    },
    {
        id: 13,
        name: "VIP Event Tickets & Access",
        type: "events",
        availability: "Advance Booking",
        icon: "🎫",
        description: "Exclusive access to sold-out events, concerts, and sporting events",
        features: [
            "Premium seating",
            "Meet & greet packages",
            "Hospitality suites",
            "Transportation included",
            "Backstage access (when available)"
        ],
        pricing: "Varies by event",
        includes: ["Ticket procurement", "VIP packages", "Transportation", "Concierge escort if requested"]
    },
    {
        id: 14,
        name: "Restaurant Reservations",
        type: "events",
        availability: "24/7",
        icon: "🍽️",
        description: "Priority reservations at Qatar's most exclusive restaurants",
        features: [
            "Hard-to-get reservations",
            "Private dining rooms",
            "Chef's table experiences",
            "Special occasion setups",
            "Dietary accommodations"
        ],
        pricing: "Complimentary service",
        includes: ["Reservation booking", "Special requests", "Anniversary setups", "Pre-ordering assistance"]
    },

    // LUXURY EXPERIENCES
    {
        id: 15,
        name: "Helicopter Tours",
        type: "luxury",
        availability: "Advance Booking",
        icon: "🚁",
        description: "Aerial tours of Doha and Qatar's stunning landscapes",
        features: [
            "City skyline tour",
            "Desert & inland sea flights",
            "Customizable routes",
            "Professional pilot",
            "Photography allowed"
        ],
        pricing: "From QR 3,000 for 30 minutes",
        includes: ["Helicopter charter", "Pilot", "Fuel", "Safety briefing", "Airport transfers"]
    },
    {
        id: 16,
        name: "Luxury Desert Experience",
        type: "luxury",
        availability: "Advance Booking",
        icon: "🏜️",
        description: "Exclusive desert camps with gourmet dining and premium amenities",
        features: [
            "Private desert camp setup",
            "Gourmet BBQ dinner",
            "Traditional entertainment",
            "Stargazing with telescope",
            "Luxury bathroom facilities"
        ],
        pricing: "From QR 2,000 per person",
        includes: ["Private camp", "Gourmet meal", "Entertainment", "Equipment", "4x4 transfer"]
    },
    {
        id: 17,
        name: "Superyacht Experience",
        type: "luxury",
        availability: "Advance Booking",
        icon: "⛵",
        description: "Ultra-luxury superyacht charter with full crew and five-star service",
        features: [
            "100ft+ superyachts",
            "Full crew including chef",
            "Water toys & equipment",
            "Overnight options",
            "Customized itineraries"
        ],
        pricing: "From QR 15,000/day",
        includes: ["Superyacht", "Crew & captain", "Chef & catering", "Water sports", "Fuel & permits"]
    },
    {
        id: 18,
        name: "Exclusive Access Experiences",
        type: "luxury",
        availability: "Advance Booking",
        icon: "🔑",
        description: "VIP access to normally closed venues and exclusive experiences",
        features: [
            "Private museum tours",
            "After-hours shopping",
            "Meet local dignitaries",
            "Cultural immersion",
            "Unique photo opportunities"
        ],
        pricing: "Contact for quote",
        includes: ["Access arrangement", "Private guide", "Transportation", "Permissions & permits"]
    },

    // FAMILY SERVICES
    {
        id: 19,
        name: "Babysitting & Childcare",
        type: "family",
        availability: "24/7",
        icon: "👶",
        description: "Professional, vetted nannies and babysitters for your children",
        features: [
            "Experienced caregivers",
            "Background checked",
            "Multilingual options",
            "Activity planning",
            "Emergency trained"
        ],
        pricing: "From QR 80/hour",
        includes: ["Professional caregiver", "Activities & supplies", "Emergency contact system"]
    },
    {
        id: 20,
        name: "Kids Activities & Entertainment",
        type: "family",
        availability: "Advance Booking",
        icon: "🎨",
        description: "Customized children's activities and entertainment programs",
        features: [
            "Theme park VIP access",
            "Birthday party planning",
            "Educational tours",
            "Arts & crafts sessions",
            "Sports activities"
        ],
        pricing: "From QR 500",
        includes: ["Activity coordinator", "Materials & equipment", "Transportation", "Supervision"]
    },
    {
        id: 21,
        name: "Medical & Healthcare Assistance",
        type: "family",
        availability: "24/7",
        icon: "⚕️",
        description: "Healthcare coordination including doctor visits and pharmacy needs",
        features: [
            "Doctor house calls",
            "Hospital appointment booking",
            "Pharmacy delivery",
            "Medical translation",
            "Insurance coordination"
        ],
        pricing: "Service fee + medical costs",
        includes: ["Coordination service", "Translation if needed", "Emergency assistance", "Follow-up support"]
    }
];

let filteredServices = [...conciergeServices];
let currentService = null;

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('Concierge.js loaded successfully');
    console.log('Services database has', conciergeServices.length, 'services');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const serviceDateInput = document.getElementById('serviceDate');
    if (serviceDateInput) serviceDateInput.min = today;
    
    // Display all services initially
    displayServices(conciergeServices);
});

// Display services in grid
function displayServices(servicesToDisplay) {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (servicesToDisplay.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; padding: 3rem; grid-column: 1/-1;">No services found. Please adjust your filters.</p>';
        return;
    }
    
    servicesToDisplay.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.onclick = () => openRequestModal(service.id);
        
        card.innerHTML = `
            <div class="service-card-image">
                <span style="font-size: 5.5rem;">${service.icon}</span>
                <div class="availability-badge">${service.availability}</div>
            </div>
            <div class="service-card-content">
                <h3>${service.name}</h3>
                <div class="service-type">${service.type}</div>
                <p class="service-description">${service.description}</p>
                <div class="service-features">
                    ${service.features.slice(0, 3).map(f => `<div class="feature-item">${f}</div>`).join('')}
                </div>
                <div class="service-card-footer">
                    <span class="service-price">${service.pricing}</span>
                    <button class="btn-request-service" onclick="event.stopPropagation(); openRequestModal(${service.id})">Request Service</button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Search services
function searchServices() {
    console.log('Search services clicked');
    
    const type = document.getElementById('typeFilter').value;
    const availability = document.getElementById('availabilityFilter').value;
    
    let filtered = [...conciergeServices];
    
    // Filter by type
    if (type !== 'all') {
        filtered = filtered.filter(s => s.type === type);
    }
    
    // Filter by availability
    if (availability !== 'all') {
        if (availability === '24/7') {
            filtered = filtered.filter(s => s.availability === '24/7');
        } else if (availability === 'business') {
            filtered = filtered.filter(s => s.availability === 'Business Hours');
        } else if (availability === 'advance') {
            filtered = filtered.filter(s => s.availability === 'Advance Booking');
        }
    }
    
    filteredServices = filtered;
    displayServices(filteredServices);
}

// Sort services
function sortServices() {
    const sortBy = document.getElementById('sortBy').value;
    let sorted = [...filteredServices];
    
    if (sortBy === 'name') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'type') {
        sorted.sort((a, b) => a.type.localeCompare(b.type));
    }
    // 'featured' keeps the original order
    
    displayServices(sorted);
}

// Open request modal
function openRequestModal(serviceId) {
    const service = conciergeServices.find(s => s.id === serviceId);
    if (!service) return;
    
    currentService = service;
    
    // Populate service information
    document.getElementById('modalServiceIcon').textContent = service.icon;
    document.getElementById('modalServiceName').textContent = service.name;
    document.getElementById('modalServiceType').textContent = service.type.toUpperCase();
    document.getElementById('modalAvailability').textContent = `⏰ ${service.availability}`;
    document.getElementById('modalDescription').textContent = service.description;
    
    // Populate includes
    const includesList = document.getElementById('modalIncludes');
    includesList.innerHTML = `
        <h4>Service Includes</h4>
        <ul>
            ${service.includes.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    
    // Update pricing info
    document.getElementById('pricingInfo').textContent = service.pricing;
    
    // Show modal
    document.getElementById('requestModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close request modal
function closeRequestModal() {
    document.getElementById('requestModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('requestForm').reset();
}

// Submit request
function submitRequest(event) {
    event.preventDefault();
    
    if (!currentService) return;
    
    const name = document.getElementById('clientName').value;
    const email = document.getElementById('clientEmail').value;
    const phone = document.getElementById('clientPhone').value;
    const location = document.getElementById('clientLocation').value;
    const date = document.getElementById('serviceDate').value;
    const time = document.getElementById('serviceTime').value;
    const people = document.getElementById('numPeople').value;
    const requirements = document.getElementById('requirements').value;
    
    // Validate
    if (!name || !email || !phone || !date) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Create request data
    const requestData = {
        service: currentService.name,
        serviceType: currentService.type,
        clientName: name,
        email: email,
        phone: phone,
        location: location,
        serviceDate: date,
        serviceTime: time,
        numberOfPeople: people,
        requirements: requirements,
        pricing: currentService.pricing,
        requestDate: new Date().toISOString()
    };
    
    // Log request data (in real app, this would be sent to server)
    console.log('Service request submitted:', requestData);
    
    // Show success message
    alert(`✓ Service Request Submitted!

Service: ${currentService.name}
Client: ${name}
Date: ${date}${time ? ' at ' + time : ''}
People: ${people}

Our concierge team will contact you at:
Email: ${email}
Phone: ${phone}

You will receive confirmation within 2 hours with pricing details and availability.

Thank you for choosing Qatar Concierge Services!`);
    
    // Close modal and reset
    closeRequestModal();
}




// Adventure Activities Database

const adventures = [
    // DESERT ADVENTURES
    {
        id: 1,
        name: "Desert Safari with Dune Bashing",
        type: "desert",
        difficulty: "moderate",
        duration: "half",
        durationText: "4-5 hours",
        minAge: "12 years",
        price: 350,
        icon: "🏜️",
        image: "linear-gradient(135deg, #A12852 0%, #D4A574 100%)",
        description: "Experience the thrill of dune bashing in powerful 4x4 vehicles across Qatar's stunning sand dunes",
        highlights: [
            "Professional 4x4 driver",
            "High-speed dune bashing",
            "Sunset photography stops",
            "Traditional Arabic refreshments"
        ],
        includes: ["Hotel pickup & drop-off", "4x4 transport", "Experienced driver", "Refreshments", "Safety equipment", "Insurance"],
        requirements: "Good physical health, not suitable for pregnant women or back problems"
    },
    {
        id: 2,
        name: "Overnight Desert Camping",
        type: "desert",
        difficulty: "easy",
        duration: "full",
        durationText: "18 hours (overnight)",
        minAge: "8 years",
        price: 650,
        icon: "⛺",
        image: "linear-gradient(135deg, #A12852 0%, #8C1D40 100%)",
        description: "Sleep under the stars in a traditional Bedouin-style camp with BBQ dinner and sunrise experience",
        highlights: [
            "Bedouin-style camping",
            "BBQ dinner & breakfast",
            "Campfire & stargazing",
            "Sunrise dune bashing"
        ],
        includes: ["All meals", "Camping equipment", "Sleeping bags & mattresses", "Entertainment", "4x4 transport", "Guide"],
        requirements: "Comfortable with basic camping facilities"
    },
    {
        id: 3,
        name: "Sandboarding Adventure",
        type: "desert",
        difficulty: "easy",
        duration: "short",
        durationText: "2-3 hours",
        minAge: "10 years",
        price: 180,
        icon: "🏂",
        image: "linear-gradient(135deg, #FFB81C 0%, #D4A574 100%)",
        description: "Slide down massive sand dunes on a sandboard - perfect for adventure seekers of all skill levels",
        highlights: [
            "Professional instruction",
            "All equipment provided",
            "Multiple dune runs",
            "Photo opportunities"
        ],
        includes: ["Sandboard rental", "Safety gear", "Instructor", "Transportation to dunes", "Bottled water"],
        requirements: "Basic balance and coordination"
    },
    {
        id: 4,
        name: "Quad Biking in the Desert",
        type: "desert",
        difficulty: "moderate",
        duration: "half",
        durationText: "3-4 hours",
        minAge: "16 years",
        price: 420,
        icon: "🏍️",
        image: "linear-gradient(135deg, #E53935 0%, #D4A574 100%)",
        description: "Ride powerful quad bikes through desert terrain with experienced guides",
        highlights: [
            "1-2 hour riding time",
            "Professional safety briefing",
            "All skill levels welcome",
            "Desert exploration"
        ],
        includes: ["Quad bike rental", "Helmet & gear", "Guide", "Training session", "Fuel", "Insurance"],
        requirements: "Valid driver's license, good physical condition"
    },

    // WATER SPORTS
    {
        id: 5,
        name: "Kayaking at Al Thakira Mangroves",
        type: "water",
        difficulty: "easy",
        duration: "half",
        durationText: "3-4 hours",
        minAge: "8 years",
        price: 180,
        icon: "🛶",
        image: "linear-gradient(135deg, #4CAF50 0%, #0C616F 100%)",
        description: "Paddle through serene mangrove forests spotting herons, crabs, and marine life",
        highlights: [
            "Eco-friendly tour",
            "Wildlife spotting",
            "Professional guide",
            "Photography stops"
        ],
        includes: ["Kayak & paddle", "Life jacket", "Expert guide", "Snacks & water", "Transportation"],
        requirements: "Basic swimming ability recommended"
    },
    {
        id: 6,
        name: "Jet Ski Adventure",
        type: "water",
        difficulty: "moderate",
        duration: "short",
        durationText: "1-2 hours",
        minAge: "16 years",
        price: 320,
        icon: "🏍️",
        image: "linear-gradient(135deg, #0C616F 0%, #FFB81C 100%)",
        description: "High-speed jet skiing along Qatar's pristine coastline",
        highlights: [
            "Latest jet ski models",
            "Coastal tour route",
            "Safety briefing included",
            "Stunning sea views"
        ],
        includes: ["Jet ski rental", "Life jacket", "Instructor", "Fuel", "Locker facilities"],
        requirements: "Confident swimmer, valid ID"
    },
    {
        id: 7,
        name: "Stand-Up Paddleboarding",
        type: "water",
        difficulty: "easy",
        duration: "short",
        durationText: "2 hours",
        minAge: "12 years",
        price: 150,
        icon: "🏄",
        image: "linear-gradient(135deg, #0C616F 0%, #4CAF50 100%)",
        description: "Glide across calm waters while enjoying beautiful coastal views",
        highlights: [
            "Beginner-friendly",
            "Calm water locations",
            "Full instruction",
            "Great workout"
        ],
        includes: ["SUP board", "Paddle", "Life jacket", "Instructor", "Equipment transport"],
        requirements: "Basic swimming skills"
    },
    {
        id: 8,
        name: "Scuba Diving Experience",
        type: "water",
        difficulty: "challenging",
        duration: "half",
        durationText: "4-5 hours",
        minAge: "12 years",
        price: 550,
        icon: "🤿",
        image: "linear-gradient(135deg, #0C616F 0%, #1976D2 100%)",
        description: "Discover Qatar's underwater world with experienced PADI instructors",
        highlights: [
            "PADI certified instructors",
            "All equipment included",
            "Beginner & certified divers",
            "Marine life encounters"
        ],
        includes: ["Full scuba gear", "Boat trip", "2 dives", "Instructor", "Refreshments", "Insurance"],
        requirements: "Medical clearance, swimming ability"
    },

    // AERIAL ACTIVITIES
    {
        id: 9,
        name: "Helicopter Tour - Doha Skyline",
        type: "air",
        difficulty: "easy",
        duration: "short",
        durationText: "30 minutes",
        minAge: "5 years",
        price: 1200,
        icon: "🚁",
        image: "linear-gradient(135deg, #8C1D40 0%, #0C616F 100%)",
        description: "Soar above Doha's iconic skyline and see Qatar from a bird's eye view",
        highlights: [
            "West Bay skyscrapers",
            "The Pearl Qatar",
            "Museum of Islamic Art",
            "Photography allowed"
        ],
        includes: ["Helicopter charter", "Pilot", "Fuel", "Safety briefing", "Airport transfers"],
        requirements: "Weight limit 120kg per person"
    },
    {
        id: 10,
        name: "Parasailing Adventure",
        type: "air",
        difficulty: "easy",
        duration: "short",
        durationText: "1.5 hours",
        minAge: "10 years",
        price: 350,
        icon: "🪂",
        image: "linear-gradient(135deg, #FFB81C 0%, #0C616F 100%)",
        description: "Float high above the Arabian Gulf for breathtaking aerial views",
        highlights: [
            "Soar up to 200 feet",
            "Panoramic views",
            "Safe & thrilling",
            "Tandem available"
        ],
        includes: ["Parasail equipment", "Life jacket", "Boat ride", "Certified crew", "Photos available"],
        requirements: "Combined weight limit for tandem: 200kg"
    },
    {
        id: 11,
        name: "Skydiving Experience",
        type: "air",
        difficulty: "challenging",
        duration: "half",
        durationText: "4-5 hours",
        minAge: "18 years",
        price: 1800,
        icon: "🪂",
        image: "linear-gradient(135deg, #E53935 0%, #0C616F 100%)",
        description: "Tandem skydive from 13,000 feet with certified instructors",
        highlights: [
            "13,000 feet freefall",
            "60 seconds freefall",
            "Experienced instructor",
            "Video package available"
        ],
        includes: ["Tandem jump", "All equipment", "Training", "Certificate", "Transport to drop zone"],
        requirements: "Weight 90-100kg max, medical fitness, signed waiver"
    },

    // EXTREME SPORTS
    {
        id: 12,
        name: "Rock Climbing - Indoor Wall",
        type: "extreme",
        difficulty: "moderate",
        duration: "short",
        durationText: "2-3 hours",
        minAge: "8 years",
        price: 200,
        icon: "🧗",
        image: "linear-gradient(135deg, #8C1D40 0%, #E53935 100%)",
        description: "Challenge yourself on Qatar's tallest indoor climbing walls",
        highlights: [
            "Various difficulty routes",
            "Professional instructors",
            "Safety equipment",
            "Suitable for beginners"
        ],
        includes: ["Climbing equipment", "Harness & shoes", "Instructor", "Safety briefing", "Multiple climbs"],
        requirements: "Good physical health"
    },
    {
        id: 13,
        name: "Wakeboarding",
        type: "extreme",
        difficulty: "challenging",
        duration: "short",
        durationText: "2 hours",
        minAge: "14 years",
        price: 380,
        icon: "🏄",
        image: "linear-gradient(135deg, #0C616F 0%, #E53935 100%)",
        description: "Ride the wake behind a speedboat for an adrenaline-pumping experience",
        highlights: [
            "Professional instruction",
            "Latest equipment",
            "Multiple runs",
            "Video your session"
        ],
        includes: ["Wakeboard & bindings", "Life jacket", "Boat & driver", "Instructor", "Fuel"],
        requirements: "Strong swimmer, good fitness level"
    },
    {
        id: 14,
        name: "Kite Surfing Lessons",
        type: "extreme",
        difficulty: "challenging",
        duration: "half",
        durationText: "4 hours",
        minAge: "14 years",
        price: 480,
        icon: "🪁",
        image: "linear-gradient(135deg, #FFB81C 0%, #0C616F 100%)",
        description: "Learn to harness the wind and ride the waves with expert instructors",
        highlights: [
            "IKO certified instructors",
            "All equipment included",
            "Beach & water training",
            "Small group sessions"
        ],
        includes: ["Kite equipment", "Harness", "Board", "Wetsuit", "Instructor", "Insurance"],
        requirements: "Good swimming skills, reasonable fitness"
    },

    // WILDLIFE SAFARI
    {
        id: 15,
        name: "Inland Sea Adventure",
        type: "safari",
        difficulty: "easy",
        duration: "full",
        durationText: "8 hours",
        minAge: "6 years",
        price: 550,
        icon: "🌊",
        image: "linear-gradient(135deg, #0C616F 0%, #D4A574 100%)",
        description: "Visit the spectacular Khor Al Adaid where the desert meets the sea",
        highlights: [
            "UNESCO natural reserve",
            "Swimming in the inland sea",
            "Dune bashing en route",
            "Picnic lunch included"
        ],
        includes: ["4x4 transport", "Expert driver", "Picnic lunch", "Swimming time", "Photography stops", "All permits"],
        requirements: "Long journey - comfortable with off-road driving"
    },
    {
        id: 16,
        name: "Falcon Experience",
        type: "safari",
        difficulty: "easy",
        duration: "short",
        durationText: "2 hours",
        minAge: "8 years",
        price: 250,
        icon: "🦅",
        image: "linear-gradient(135deg, #8C1D40 0%, #D4A574 100%)",
        description: "Learn about falconry traditions and handle these magnificent birds",
        highlights: [
            "Handle a falcon",
            "Learn falconry history",
            "Traditional dress photos",
            "Educational talk"
        ],
        includes: ["Falcon handling session", "Expert falconer", "Photography", "Refreshments", "Certificate"],
        requirements: "Follow handler instructions carefully"
    },
    {
        id: 17,
        name: "Camel Riding Experience",
        type: "safari",
        difficulty: "easy",
        duration: "short",
        durationText: "1.5 hours",
        minAge: "6 years",
        price: 120,
        icon: "🐪",
        image: "linear-gradient(135deg, #D4A574 0%, #8C1D40 100%)",
        description: "Traditional camel ride through the desert landscape",
        highlights: [
            "Gentle camels",
            "Desert scenery",
            "Cultural experience",
            "Photo opportunities"
        ],
        includes: ["Camel ride", "Handler", "Traditional dress rental", "Refreshments", "Photos"],
        requirements: "Weight limit 100kg"
    },
    {
        id: 18,
        name: "Wildlife Photography Safari",
        type: "safari",
        difficulty: "easy",
        duration: "full",
        durationText: "6-7 hours",
        minAge: "12 years",
        price: 480,
        icon: "📷",
        image: "linear-gradient(135deg, #4CAF50 0%, #D4A574 100%)",
        description: "Capture Qatar's wildlife including oryx, gazelles, and desert birds",
        highlights: [
            "Professional photography guide",
            "Visit wildlife reserves",
            "Arabian oryx spotting",
            "Bird watching"
        ],
        includes: ["4x4 transport", "Photography guide", "Park fees", "Lunch", "Water", "Binoculars"],
        requirements: "Bring your own camera, patience for wildlife"
    }
];

let filteredActivities = [...adventures];
let currentActivity = null;

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('Adventure.js loaded successfully');
    console.log('Activities database has', adventures.length, 'adventures');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const activityDateInput = document.getElementById('activityDate');
    const bookingDateInput = document.getElementById('bookingDate');
    
    if (activityDateInput) activityDateInput.min = today;
    if (bookingDateInput) bookingDateInput.min = today;
    
    // Display all activities initially
    displayActivities(adventures);
    
    // Update pricing when participants change
    const numParticipantsInput = document.getElementById('numParticipants');
    if (numParticipantsInput) {
        numParticipantsInput.addEventListener('change', updatePricing);
    }
});

// Display activities in grid
function displayActivities(activitiesToDisplay) {
    const grid = document.getElementById('activitiesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (activitiesToDisplay.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; padding: 3rem; grid-column: 1/-1;">No activities found. Please adjust your filters.</p>';
        return;
    }
    
    activitiesToDisplay.forEach(activity => {
        const card = document.createElement('div');
        card.className = 'activity-card';
        card.onclick = () => openBookingModal(activity.id);
        
        card.innerHTML = `
            <div class="activity-card-image" style="background: ${activity.image};">
                <span style="font-size: 6rem;">${activity.icon}</span>
                <div class="difficulty-badge ${activity.difficulty}">${activity.difficulty.toUpperCase()}</div>
            </div>
            <div class="activity-card-content">
                <h3>${activity.name}</h3>
                <div class="activity-type">${activity.type}</div>
                <div class="activity-meta">
                    <span class="meta-item">
                        <span class="meta-icon">⏱️</span>
                        ${activity.durationText}
                    </span>
                    <span class="meta-item">
                        <span class="meta-icon">👥</span>
                        ${activity.minAge}+
                    </span>
                </div>
                <p class="activity-description">${activity.description}</p>
                <div class="activity-highlights">
                    ${activity.highlights.slice(0, 3).map(h => `<div class="highlight-item">${h}</div>`).join('')}
                </div>
                <div class="activity-card-footer">
                    <div class="activity-price">
                        <span class="price-label">From</span>
                        <span class="price-amount">QR ${activity.price}</span>
                        <span class="price-period">per person</span>
                    </div>
                    <button class="btn-book-activity" onclick="event.stopPropagation(); openBookingModal(${activity.id})">Book Now</button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Search activities
function searchActivities() {
    console.log('Search activities clicked');
    
    const type = document.getElementById('typeFilter').value;
    const duration = document.getElementById('durationFilter').value;
    const difficulty = document.getElementById('difficultyFilter').value;
    
    let filtered = [...adventures];
    
    // Filter by type
    if (type !== 'all') {
        filtered = filtered.filter(a => a.type === type);
    }
    
    // Filter by duration
    if (duration !== 'all') {
        filtered = filtered.filter(a => a.duration === duration);
    }
    
    // Filter by difficulty
    if (difficulty !== 'all') {
        filtered = filtered.filter(a => a.difficulty === difficulty);
    }
    
    filteredActivities = filtered;
    displayActivities(filteredActivities);
}

// Sort activities
function sortActivities() {
    const sortBy = document.getElementById('sortBy').value;
    let sorted = [...filteredActivities];
    
    if (sortBy === 'price-low') {
        sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'duration') {
        const durationOrder = { short: 1, half: 2, full: 3 };
        sorted.sort((a, b) => durationOrder[a.duration] - durationOrder[b.duration]);
    }
    // 'featured' keeps the original order
    
    displayActivities(sorted);
}

// Open booking modal
function openBookingModal(activityId) {
    const activity = adventures.find(a => a.id === activityId);
    if (!activity) return;
    
    currentActivity = activity;
    
    // Populate activity information
    document.getElementById('modalActivityImage').innerHTML = `<span style="font-size: 6rem;">${activity.icon}</span>`;
    document.getElementById('modalActivityImage').style.background = activity.image;
    document.getElementById('modalActivityName').textContent = activity.name;
    document.getElementById('modalActivityType').textContent = activity.type.toUpperCase();
    document.getElementById('modalDuration').innerHTML = `⏱️ ${activity.durationText}`;
    document.getElementById('modalDifficulty').innerHTML = `🎯 ${activity.difficulty.charAt(0).toUpperCase() + activity.difficulty.slice(1)}`;
    document.getElementById('modalDescription').textContent = activity.description;
    
    // Populate includes
    const includesList = document.getElementById('modalIncludes');
    includesList.innerHTML = `
        <h4>Activity Includes</h4>
        <ul>
            ${activity.includes.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    
    // Update booking summary
    document.getElementById('summaryDuration').textContent = activity.durationText;
    document.getElementById('summaryDifficulty').textContent = activity.difficulty.charAt(0).toUpperCase() + activity.difficulty.slice(1);
    document.getElementById('summaryMinAge').textContent = activity.minAge;
    
    // Set initial pricing
    updatePricing();
    
    // Show modal
    document.getElementById('bookingModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close booking modal
function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('bookingForm').reset();
}

// Update pricing
function updatePricing() {
    if (!currentActivity) return;
    
    const numParticipants = parseInt(document.getElementById('numParticipants').value) || 2;
    const pricePerPerson = currentActivity.price;
    const subtotal = pricePerPerson * numParticipants;
    const total = subtotal;
    
    document.getElementById('pricePerPerson').textContent = `QR ${pricePerPerson}`;
    document.getElementById('numPax').textContent = numParticipants;
    document.getElementById('subtotal').textContent = `QR ${subtotal}`;
    document.getElementById('total').textContent = `QR ${total}`;
}

// Submit booking
function submitBooking(event) {
    event.preventDefault();
    
    if (!currentActivity) return;
    
    const name = document.getElementById('guestName').value;
    const email = document.getElementById('guestEmail').value;
    const phone = document.getElementById('guestPhone').value;
    const date = document.getElementById('bookingDate').value;
    const participants = document.getElementById('numParticipants').value;
    const pickup = document.getElementById('pickupLocation').value;
    const requests = document.getElementById('specialRequests').value;
    const total = document.getElementById('total').textContent;
    
    // Validate
    if (!name || !email || !date || !participants) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Create booking data
    const bookingData = {
        activity: currentActivity.name,
        type: currentActivity.type,
        guestName: name,
        email: email,
        phone: phone,
        date: date,
        participants: participants,
        pickupLocation: pickup,
        specialRequests: requests,
        total: total,
        bookingDate: new Date().toISOString()
    };
    
    // Log booking data (in real app, this would be sent to server)
    console.log('Booking submitted:', bookingData);
    
    // Show success message
    alert(`✓ Adventure Booking Confirmed!

Activity: ${currentActivity.name}
Guest: ${name}
Date: ${date}
Participants: ${participants}
Total: ${total}

A confirmation email will be sent to ${email}

Important Reminders:
${currentActivity.requirements}

Pickup details will be confirmed 24 hours before your activity.
Have an amazing adventure in Qatar!`);
    
    // Close modal and reset
    closeBookingModal();
}


// Romantic Experiences Database

const experiences = [
    // ROMANTIC DINING
    {
        id: 1,
        name: "Private Beach Dinner",
        type: "dining",
        timeOfDay: "evening",
        duration: "short",
        durationText: "3 hours",
        price: 1500,
        icon: "🏖️",
        image: "linear-gradient(135deg, #FF6B9D 0%, #8C1D40 100%)",
        description: "Exclusive private dinner on the beach with candlelight, champagne, and personalized service",
        includes: ["Private beach setup", "4-course gourmet menu", "Champagne & wine", "Candlelight ambiance", "Dedicated server", "Floral decoration"]
    },
    {
        id: 2,
        name: "Rooftop Dining with Skyline Views",
        type: "dining",
        timeOfDay: "evening",
        duration: "short",
        durationText: "2-3 hours",
        price: 800,
        icon: "🌃",
        image: "linear-gradient(135deg, #8C1D40 0%, #FFB81C 100%)",
        description: "Intimate rooftop dinner with panoramic views of Doha's glittering skyline",
        includes: ["Reserved rooftop table", "5-course tasting menu", "Wine pairing", "Live music", "Photographer available"]
    },
    {
        id: 3,
        name: "Floating Restaurant Experience",
        type: "dining",
        timeOfDay: "evening",
        duration: "short",
        durationText: "2 hours",
        price: 650,
        icon: "⛵",
        image: "linear-gradient(135deg, #0C616F 0%, #8C1D40 100%)",
        description: "Dine on a private floating platform with stunning water views",
        includes: ["Floating platform setup", "Chef-prepared menu", "Premium beverages", "Ambient lighting", "Music playlist"]
    },
    {
        id: 4,
        name: "Desert Starlight Dinner",
        type: "dining",
        timeOfDay: "evening",
        duration: "half",
        durationText: "4 hours",
        price: 1200,
        icon: "⭐",
        image: "linear-gradient(135deg, #8C1D40 0%, #D4A574 100%)",
        description: "Private dinner in the desert under a canopy of stars with traditional entertainment",
        includes: ["Private desert camp", "Gourmet BBQ dinner", "Champagne", "Stargazing with telescope", "Traditional music", "4x4 transport"]
    },

    // SUNSET CRUISE
    {
        id: 5,
        name: "Luxury Yacht Sunset Cruise",
        type: "cruise",
        timeOfDay: "sunset",
        duration: "short",
        durationText: "3 hours",
        price: 2500,
        icon: "🛥️",
        image: "linear-gradient(135deg, #FF6B9D 0%, #0C616F 100%)",
        description: "Private luxury yacht cruise along the coastline during golden hour",
        includes: ["Private luxury yacht", "Professional captain & crew", "Gourmet catering", "Champagne & beverages", "Sound system", "Swimming stop"]
    },
    {
        id: 6,
        name: "Traditional Dhow Sunset Cruise",
        type: "cruise",
        timeOfDay: "sunset",
        duration: "short",
        durationText: "2 hours",
        price: 450,
        icon: "⛵",
        image: "linear-gradient(135deg, #8C1D40 0%, #0C616F 100%)",
        description: "Romantic cruise on a traditional wooden dhow with dinner and live music",
        includes: ["Traditional dhow boat", "International buffet", "Soft drinks included", "Live entertainment", "Sunset views"]
    },
    {
        id: 7,
        name: "Catamaran Champagne Sunset",
        type: "cruise",
        timeOfDay: "sunset",
        duration: "short",
        durationText: "2.5 hours",
        price: 950,
        icon: "⛵",
        image: "linear-gradient(135deg, #FFB81C 0%, #0C616F 100%)",
        description: "Sail on a spacious catamaran with champagne and canapés",
        includes: ["Catamaran cruise", "Champagne & canapés", "Professional crew", "Comfortable seating", "Sunset photography"]
    },

    // COUPLES SPA
    {
        id: 8,
        name: "Royal Couples Spa Package",
        type: "spa",
        timeOfDay: "afternoon",
        duration: "half",
        durationText: "4 hours",
        price: 1800,
        icon: "💆",
        image: "linear-gradient(135deg, #A12852 0%, #8C1D40 100%)",
        description: "Indulgent spa day with couples massage, hammam, and private relaxation suite",
        includes: ["Private couples suite", "90-min couples massage", "Traditional hammam", "Facial treatments", "Champagne & refreshments", "Pool & sauna access"]
    },
    {
        id: 9,
        name: "Sunset Spa & Beach Experience",
        type: "spa",
        timeOfDay: "sunset",
        duration: "half",
        durationText: "3 hours",
        price: 1200,
        icon: "🌅",
        image: "linear-gradient(135deg, #FF6B9D 0%, #FFB81C 100%)",
        description: "Beachside couples massage followed by sunset champagne",
        includes: ["Beach cabana setup", "60-min couples massage", "Sunset champagne service", "Light refreshments", "Private beach access"]
    },
    {
        id: 10,
        name: "Desert Spa Retreat",
        type: "spa",
        timeOfDay: "morning",
        duration: "full",
        durationText: "6 hours",
        price: 2200,
        icon: "🏜️",
        image: "linear-gradient(135deg, #8C1D40 0%, #D4A574 100%)",
        description: "Full-day desert wellness retreat with spa treatments and gourmet lunch",
        includes: ["Desert resort access", "Couples massage", "Body treatments", "Yoga session", "Gourmet lunch", "Relaxation lounge", "Transport"]
    },

    // COUPLES ADVENTURE
    {
        id: 11,
        name: "Hot Air Balloon Sunrise Flight",
        type: "adventure",
        timeOfDay: "morning",
        duration: "half",
        durationText: "4 hours",
        price: 2800,
        icon: "🎈",
        image: "linear-gradient(135deg, #FFB81C 0%, #FF6B9D 100%)",
        description: "Romantic sunrise hot air balloon flight over the desert with champagne breakfast",
        includes: ["Hot air balloon flight", "Sunrise views", "Champagne breakfast", "Flight certificate", "Professional pilot", "Hotel pickup"]
    },
    {
        id: 12,
        name: "Private Island Picnic",
        type: "adventure",
        timeOfDay: "afternoon",
        duration: "half",
        durationText: "5 hours",
        price: 1600,
        icon: "🏝️",
        image: "linear-gradient(135deg, #0C616F 0%, #4CAF50 100%)",
        description: "Exclusive access to a private island with gourmet picnic and water activities",
        includes: ["Private boat transfer", "Secluded island access", "Gourmet picnic basket", "Snorkeling equipment", "Beach setup", "Return transport"]
    },
    {
        id: 13,
        name: "Horseback Riding on the Beach",
        type: "adventure",
        timeOfDay: "sunset",
        duration: "short",
        durationText: "2 hours",
        price: 550,
        icon: "🐴",
        image: "linear-gradient(135deg, #D4A574 0%, #FF6B9D 100%)",
        description: "Romantic beach horseback ride during sunset with refreshments",
        includes: ["2 horses with guides", "Beach riding route", "Sunset timing", "Photography", "Refreshments", "Safety equipment"]
    },

    // LUXURY EXPERIENCE
    {
        id: 14,
        name: "Helicopter Tour with Champagne",
        type: "luxury",
        timeOfDay: "afternoon",
        duration: "short",
        durationText: "1.5 hours",
        price: 3500,
        icon: "🚁",
        image: "linear-gradient(135deg, #8C1D40 0%, #FFB81C 100%)",
        description: "Private helicopter tour of Doha's landmarks with champagne service",
        includes: ["Private helicopter", "60-min aerial tour", "Professional pilot", "Champagne service", "Photography", "Airport transfers"]
    },
    {
        id: 15,
        name: "Luxury Desert Camp Overnight",
        type: "luxury",
        timeOfDay: "evening",
        duration: "full",
        durationText: "18 hours",
        price: 3200,
        icon: "⛺",
        image: "linear-gradient(135deg, #A12852 0%, #D4A574 100%)",
        description: "Exclusive desert camp with luxury amenities, private chef, and stargazing",
        includes: ["Luxury tent suite", "Private chef service", "All meals & beverages", "Stargazing equipment", "Entertainment", "4x4 transport", "Butler service"]
    },
    {
        id: 16,
        name: "Private Yacht Full-Day Charter",
        type: "luxury",
        timeOfDay: "afternoon",
        duration: "full",
        durationText: "8 hours",
        price: 4500,
        icon: "🛥️",
        image: "linear-gradient(135deg, #0C616F 0%, #8C1D40 100%)",
        description: "Full-day luxury yacht charter with gourmet catering and water sports",
        includes: ["Luxury yacht 8 hours", "Captain & crew", "Gourmet lunch & dinner", "Premium drinks", "Water sports equipment", "Snorkeling gear", "Swimming stops"]
    },
    {
        id: 17,
        name: "Penthouse Suite Experience",
        type: "luxury",
        timeOfDay: "evening",
        duration: "full",
        durationText: "24 hours",
        price: 5000,
        icon: "🏙️",
        image: "linear-gradient(135deg, #8C1D40 0%, #FFB81C 100%)",
        description: "Luxury penthouse suite with private chef, spa, and panoramic city views",
        includes: ["Penthouse suite 24hrs", "Private chef service", "In-room spa treatments", "Champagne & flowers", "Personal concierge", "Breakfast & dinner"]
    },
    {
        id: 18,
        name: "Proposal Package - Ultimate Romance",
        type: "luxury",
        timeOfDay: "sunset",
        duration: "half",
        durationText: "4 hours",
        price: 6000,
        icon: "💍",
        image: "linear-gradient(135deg, #FF6B9D 0%, #8C1D40 100%)",
        description: "Elaborate marriage proposal setup with photographer, musicians, and champagne celebration",
        includes: ["Romantic location setup", "Professional photographer", "Live musicians", "Floral decoration", "Champagne & cake", "Private dinner", "Video recording", "Proposal planning"]
    }
];

let filteredExperiences = [...experiences];
let currentExperience = null;

window.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    const experienceDateInput = document.getElementById('experienceDate');
    const bookingDateInput = document.getElementById('bookingDate');
    
    if (experienceDateInput) experienceDateInput.min = today;
    if (bookingDateInput) bookingDateInput.min = today;
    
    displayExperiences(experiences);
});

function displayExperiences(experiencesToDisplay) {
    const grid = document.getElementById('experiencesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (experiencesToDisplay.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; padding: 3rem; grid-column: 1/-1;">No experiences found. Please adjust your filters.</p>';
        return;
    }
    
    experiencesToDisplay.forEach(experience => {
        const card = document.createElement('div');
        card.className = 'experience-card';
        card.onclick = () => openBookingModal(experience.id);
        
        card.innerHTML = `
            <div class="experience-card-image" style="background: ${experience.image};">
                <span style="font-size: 6rem;">${experience.icon}</span>
            </div>
            <div class="experience-card-content">
                <h3>${experience.name}</h3>
                <div class="experience-category">${experience.type}</div>
                <div class="experience-meta">
                    <span class="meta-item">
                        <span class="meta-icon">⏱️</span>
                        ${experience.durationText}
                    </span>
                    <span class="meta-item">
                        <span class="meta-icon">🌅</span>
                        ${experience.timeOfDay}
                    </span>
                </div>
                <p class="experience-description">${experience.description}</p>
                <div class="experience-highlights">
                    ${experience.includes.slice(0, 3).map(h => `<div class="highlight-item">${h}</div>`).join('')}
                </div>
                <div class="experience-card-footer">
                    <div class="experience-price">
                        <span class="price-label">For 2 People</span>
                        <span class="price-amount">QR ${experience.price}</span>
                    </div>
                    <button class="btn-book-experience" onclick="event.stopPropagation(); openBookingModal(${experience.id})">Book Now</button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function searchExperiences() {
    const type = document.getElementById('typeFilter').value;
    const time = document.getElementById('timeFilter').value;
    const duration = document.getElementById('durationFilter').value;
    const priceRange = document.getElementById('priceFilter').value;
    
    let filtered = [...experiences];
    
    if (type !== 'all') {
        filtered = filtered.filter(e => e.type === type);
    }
    
    if (time !== 'all') {
        filtered = filtered.filter(e => e.timeOfDay === time);
    }
    
    if (duration !== 'all') {
        filtered = filtered.filter(e => e.duration === duration);
    }
    
    if (priceRange !== 'all') {
        if (priceRange === 'moderate') {
            filtered = filtered.filter(e => e.price >= 200 && e.price <= 500);
        } else if (priceRange === 'premium') {
            filtered = filtered.filter(e => e.price > 500 && e.price <= 1000);
        } else if (priceRange === 'luxury') {
            filtered = filtered.filter(e => e.price > 1000);
        }
    }
    
    filteredExperiences = filtered;
    displayExperiences(filteredExperiences);
}

function sortExperiences() {
    const sortBy = document.getElementById('sortBy').value;
    let sorted = [...filteredExperiences];
    
    if (sortBy === 'price-low') {
        sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        sorted.sort((a, b) => b.price - a.price);
    }
    
    displayExperiences(sorted);
}

function openBookingModal(experienceId) {
    const experience = experiences.find(e => e.id === experienceId);
    if (!experience) return;
    
    currentExperience = experience;
    
    document.getElementById('modalExperienceImage').innerHTML = `<span style="font-size: 6rem;">${experience.icon}</span>`;
    document.getElementById('modalExperienceImage').style.background = experience.image;
    document.getElementById('modalExperienceName').textContent = experience.name;
    document.getElementById('modalType').textContent = experience.type.toUpperCase();
    document.getElementById('modalDuration').innerHTML = `⏱️ ${experience.durationText}`;
    document.getElementById('modalTime').innerHTML = `🌅 ${experience.timeOfDay}`;
    document.getElementById('modalDescription').textContent = experience.description;
    
    const includesList = document.getElementById('modalIncludes');
    includesList.innerHTML = `
        <h4>Experience Includes</h4>
        <ul>
            ${experience.includes.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    
    document.getElementById('totalPrice').textContent = `QR ${experience.price}`;
    
    document.getElementById('bookingModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('bookingForm').reset();
}

function submitBooking(event) {
    event.preventDefault();
    
    if (!currentExperience) return;
    
    const name = document.getElementById('guestName').value;
    const partner = document.getElementById('partnerName').value;
    const email = document.getElementById('guestEmail').value;
    const phone = document.getElementById('guestPhone').value;
    const date = document.getElementById('bookingDate').value;
    const occasion = document.getElementById('occasion').value;
    const requests = document.getElementById('specialRequests').value;
    
    if (!name || !email || !phone || !date) {
        alert('Please fill in all required fields');
        return;
    }
    
    let occasionText = occasion ? `\nOccasion: ${occasion}` : '';
    let partnerText = partner ? `\nPartner: ${partner}` : '';
    
    alert(`💕 Romantic Experience Confirmed!

Experience: ${currentExperience.name}
Your Name: ${name}${partnerText}
Date: ${date}
Time: ${currentExperience.timeOfDay}${occasionText}
Total: QR ${currentExperience.price}

Confirmation sent to ${email}

We'll call you at ${phone} to finalize arrangements.

Special Requests: ${requests || 'None'}

Create unforgettable memories in Qatar! 💕`);
    
    closeBookingModal();
}


// Art & Culture Attractions Database

const attractions = [
    // MUSEUMS
    {
        id: 1,
        name: "Museum of Islamic Art",
        category: "museum",
        duration: "half",
        durationText: "3-4 hours",
        price: 50,
        hours: "9 AM - 7 PM (Closed Mondays)",
        location: "Corniche, Doha",
        icon: "🕌",
        image: "linear-gradient(135deg, #8C1D40 0%, #0C616F 100%)",
        description: "World-renowned museum designed by I.M. Pei showcasing 1,400 years of Islamic art and culture",
        highlights: [
            "I.M. Pei architecture",
            "Rare Islamic artifacts",
            "Stunning waterfront location",
            "Guided tours available",
            "Gift shop & café"
        ]
    },
    {
        id: 2,
        name: "National Museum of Qatar",
        category: "museum",
        duration: "half",
        durationText: "3-4 hours",
        price: 50,
        hours: "9 AM - 7 PM (Closed Tuesdays)",
        location: "Museum Park Street, Doha",
        icon: "🏛️",
        image: "linear-gradient(135deg, #A12852 0%, #D4A574 100%)",
        description: "Stunning building inspired by desert rose crystal, telling the story of Qatar and its people",
        highlights: [
            "Jean Nouvel architecture",
            "Interactive exhibitions",
            "Qatar's history & heritage",
            "Multimedia displays",
            "Restaurant with lagoon views"
        ]
    },
    {
        id: 3,
        name: "Mathaf: Arab Museum of Modern Art",
        category: "museum",
        duration: "short",
        durationText: "2 hours",
        price: 0,
        hours: "9 AM - 7 PM (Closed Mondays)",
        location: "Education City, Doha",
        icon: "🎨",
        image: "linear-gradient(135deg, #FFB81C 0%, #8C1D40 100%)",
        description: "Leading institution for modern and contemporary Arab art",
        highlights: [
            "Free admission",
            "Contemporary Arab art",
            "Rotating exhibitions",
            "Educational programs",
            "Museum shop"
        ]
    },
    {
        id: 4,
        name: "Fire Station Artist in Residence",
        category: "museum",
        duration: "short",
        durationText: "1-2 hours",
        price: 0,
        hours: "9 AM - 5 PM (Sun-Thu)",
        location: "Al Rumeilah, Doha",
        icon: "🔥",
        image: "linear-gradient(135deg, #E53935 0%, #8C1D40 100%)",
        description: "Contemporary art space in a converted fire station",
        highlights: [
            "Free entry",
            "Artist studios",
            "Contemporary exhibitions",
            "Cultural workshops",
            "Café & outdoor space"
        ]
    },

    // HERITAGE SITES
    {
        id: 5,
        name: "Souq Waqif",
        category: "heritage",
        duration: "half",
        durationText: "3-4 hours",
        price: 0,
        hours: "24/7 (shops 8 AM - 12 AM)",
        location: "Souq Waqif Street, Doha",
        icon: "🏪",
        image: "linear-gradient(135deg, #D4A574 0%, #8C1D40 100%)",
        description: "Traditional marketplace with spices, textiles, handicrafts, and authentic Qatari atmosphere",
        highlights: [
            "Free to explore",
            "Traditional souq experience",
            "Spices & textiles",
            "Local restaurants",
            "Falcon souq",
            "Evening entertainment"
        ]
    },
    {
        id: 6,
        name: "Al Zubarah Fort (UNESCO)",
        category: "heritage",
        duration: "half",
        durationText: "3-4 hours including travel",
        price: 0,
        hours: "9 AM - 4 PM (Closed Mondays)",
        location: "Al Zubarah, 105 km from Doha",
        icon: "🏰",
        image: "linear-gradient(135deg, #8C1D40 0%, #D4A574 100%)",
        description: "UNESCO World Heritage Site, Qatar's most extensive archaeological site",
        highlights: [
            "Free admission",
            "UNESCO heritage site",
            "18th-century fort",
            "Archaeological remains",
            "Visitor center",
            "Guided tours available"
        ]
    },
    {
        id: 7,
        name: "Sheikh Faisal Museum",
        category: "heritage",
        duration: "half",
        durationText: "3 hours including travel",
        price: 25,
        hours: "9 AM - 4:30 PM (Closed Sun)",
        location: "Al Samriya, Al Shahaniya",
        icon: "🏺",
        image: "linear-gradient(135deg, #A12852 0%, #8C1D40 100%)",
        description: "Private museum with eclectic collection spanning Islamic art to vintage cars",
        highlights: [
            "Vintage car collection",
            "Islamic art & manuscripts",
            "Traditional Qatari items",
            "Carpets & textiles",
            "Fossil exhibits"
        ]
    },
    {
        id: 8,
        name: "Msheireb Museums",
        category: "heritage",
        duration: "short",
        durationText: "2-3 hours",
        price: 0,
        hours: "9 AM - 5 PM (Closed Mondays)",
        location: "Msheireb Downtown, Doha",
        icon: "🏘️",
        image: "linear-gradient(135deg, #0C616F 0%, #8C1D40 100%)",
        description: "Four heritage houses telling stories of family, community, oil, and slavery",
        highlights: [
            "Free admission",
            "Four historic houses",
            "Qatar's social history",
            "Interactive displays",
            "Air-conditioned comfort"
        ]
    },

    // ARCHITECTURE
    {
        id: 9,
        name: "Katara Cultural Village",
        category: "architecture",
        duration: "half",
        durationText: "3-4 hours",
        price: 0,
        hours: "24/7 access",
        location: "Katara, Doha",
        icon: "🎭",
        image: "linear-gradient(135deg, #8C1D40 0%, #FFB81C 100%)",
        description: "Cultural hub with amphitheater, galleries, restaurants, and beautiful architecture",
        highlights: [
            "Free to explore",
            "Opera house & amphitheater",
            "Art galleries",
            "Beachfront dining",
            "Cultural events",
            "Photography spots"
        ]
    },
    {
        id: 10,
        name: "The Pearl-Qatar",
        category: "architecture",
        duration: "half",
        durationText: "3-4 hours",
        price: 0,
        hours: "24/7 access",
        location: "The Pearl, Doha",
        icon: "💎",
        image: "linear-gradient(135deg, #0C616F 0%, #FFB81C 100%)",
        description: "Man-made island with Mediterranean-style marinas, luxury shopping, and dining",
        highlights: [
            "Free to explore",
            "Luxury shopping",
            "Marina views",
            "High-end dining",
            "Photo opportunities",
            "Evening strolls"
        ]
    },
    {
        id: 11,
        name: "Education City Mosque",
        category: "architecture",
        duration: "short",
        durationText: "1 hour",
        price: 0,
        hours: "Open for tours (check schedule)",
        location: "Education City, Doha",
        icon: "🕌",
        image: "linear-gradient(135deg, #8C1D40 0%, #4CAF50 100%)",
        description: "Stunning modern Islamic architecture with intricate designs and peaceful atmosphere",
        highlights: [
            "Free admission",
            "Modern Islamic design",
            "Beautiful interiors",
            "Guided tours available",
            "Photography allowed (outside)"
        ]
    },

    // PERFORMING ARTS
    {
        id: 12,
        name: "Qatar National Theatre",
        category: "performance",
        duration: "short",
        durationText: "2-3 hours (per show)",
        price: 150,
        hours: "Varies by performance",
        location: "Katara Cultural Village",
        icon: "🎭",
        image: "linear-gradient(135deg, #A12852 0%, #8C1D40 100%)",
        description: "World-class performances including opera, ballet, and theatrical productions",
        highlights: [
            "International performances",
            "Opera & ballet",
            "Theatre productions",
            "Concert series",
            "Modern facilities"
        ]
    },
    {
        id: 13,
        name: "Qatar Philharmonic Orchestra",
        category: "performance",
        duration: "short",
        durationText: "2 hours",
        price: 120,
        hours: "Varies by concert",
        location: "Katara Opera House",
        icon: "🎼",
        image: "linear-gradient(135deg, #8C1D40 0%, #0C616F 100%)",
        description: "Classical music performances by resident and guest orchestras",
        highlights: [
            "Classical concerts",
            "International soloists",
            "Symphony performances",
            "Chamber music",
            "World-class venue"
        ]
    },
    {
        id: 14,
        name: "Traditional Dhow Cruise with Entertainment",
        category: "performance",
        duration: "short",
        durationText: "2 hours",
        price: 180,
        hours: "Evening departures",
        location: "Corniche, Doha",
        icon: "⛵",
        image: "linear-gradient(135deg, #0C616F 0%, #8C1D40 100%)",
        description: "Sunset cruise with traditional music, dance, and dinner",
        highlights: [
            "Traditional dhow boat",
            "Live entertainment",
            "Buffet dinner",
            "Sunset views",
            "Cultural experience"
        ]
    },

    // CULTURAL EXPERIENCES
    {
        id: 15,
        name: "Arabic Calligraphy Workshop",
        category: "experience",
        duration: "short",
        durationText: "2 hours",
        price: 200,
        hours: "Various times (booking required)",
        location: "Katara Cultural Village",
        icon: "✍️",
        image: "linear-gradient(135deg, #8C1D40 0%, #D4A574 100%)",
        description: "Learn the ancient art of Arabic calligraphy from master artists",
        highlights: [
            "Hands-on workshop",
            "Professional instruction",
            "All materials included",
            "Take home artwork",
            "Small group setting"
        ]
    },
    {
        id: 16,
        name: "Traditional Henna Art Experience",
        category: "experience",
        duration: "short",
        durationText: "1 hour",
        price: 80,
        hours: "Daily 10 AM - 8 PM",
        location: "Souq Waqif",
        icon: "🤲",
        image: "linear-gradient(135deg, #D4A574 0%, #8C1D40 100%)",
        description: "Get beautiful traditional henna designs applied by skilled artists",
        highlights: [
            "Authentic henna art",
            "Traditional patterns",
            "Experienced artists",
            "Natural henna",
            "Cultural experience"
        ]
    },
    {
        id: 17,
        name: "Qatar National Library Tour",
        category: "experience",
        duration: "short",
        durationText: "1-2 hours",
        price: 0,
        hours: "8 AM - 8 PM (Sun-Thu)",
        location: "Education City",
        icon: "📚",
        image: "linear-gradient(135deg, #0C616F 0%, #8C1D40 100%)",
        description: "Explore stunning modern library with millions of books and manuscripts",
        highlights: [
            "Free admission",
            "Architectural marvel",
            "Heritage library collection",
            "Modern facilities",
            "Quiet study spaces",
            "Café"
        ]
    },
    {
        id: 18,
        name: "Spice Market Tour & Cooking Class",
        category: "experience",
        duration: "half",
        durationText: "4 hours",
        price: 280,
        hours: "Morning sessions",
        location: "Souq Waqif",
        icon: "🌶️",
        image: "linear-gradient(135deg, #FFB81C 0%, #8C1D40 100%)",
        description: "Market tour followed by hands-on Qatari cooking class",
        highlights: [
            "Guided spice market tour",
            "Hands-on cooking class",
            "Traditional recipes",
            "Enjoy your meal",
            "Recipe booklet included"
        ]
    }
];

let filteredAttractions = [...attractions];
let currentAttraction = null;

window.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    const visitDateInput = document.getElementById('visitDate');
    const bookingDateInput = document.getElementById('bookingDate');
    
    if (visitDateInput) visitDateInput.min = today;
    if (bookingDateInput) bookingDateInput.min = today;
    
    displayAttractions(attractions);
    
    const numVisitorsInput = document.getElementById('numVisitors');
    if (numVisitorsInput) {
        numVisitorsInput.addEventListener('change', updatePricing);
    }
});

function displayAttractions(attractionsToDisplay) {
    const grid = document.getElementById('attractionsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (attractionsToDisplay.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; padding: 3rem; grid-column: 1/-1;">No attractions found. Please adjust your filters.</p>';
        return;
    }
    
    attractionsToDisplay.forEach(attraction => {
        const card = document.createElement('div');
        card.className = 'attraction-card';
        card.onclick = () => openBookingModal(attraction.id);
        
        const freeBadge = attraction.price === 0 ? '<div class="free-badge">FREE ENTRY</div>' : '';
        
        card.innerHTML = `
            <div class="attraction-card-image" style="background: ${attraction.image};">
                <span style="font-size: 6rem;">${attraction.icon}</span>
                ${freeBadge}
            </div>
            <div class="attraction-card-content">
                <h3>${attraction.name}</h3>
                <div class="attraction-category">${attraction.category}</div>
                <div class="attraction-meta">
                    <span class="meta-item">
                        <span class="meta-icon">⏱️</span>
                        ${attraction.durationText}
                    </span>
                    <span class="meta-item">
                        <span class="meta-icon">📍</span>
                        ${attraction.location}
                    </span>
                </div>
                <p class="attraction-description">${attraction.description}</p>
                <div class="attraction-highlights">
                    ${attraction.highlights.slice(0, 3).map(h => `<div class="highlight-item">${h}</div>`).join('')}
                </div>
                <div class="attraction-card-footer">
                    <div class="attraction-price">
                        ${attraction.price === 0 ? 
                            '<span class="price-free">Free Entry</span>' : 
                            `<span class="price-label">From</span>
                             <span class="price-amount">QR ${attraction.price}</span>
                             <span class="price-period">per person</span>`
                        }
                    </div>
                    <button class="btn-book-attraction" onclick="event.stopPropagation(); openBookingModal(${attraction.id})">Book Visit</button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function searchAttractions() {
    const category = document.getElementById('categoryFilter').value;
    const duration = document.getElementById('durationFilter').value;
    const priceRange = document.getElementById('priceFilter').value;
    
    let filtered = [...attractions];
    
    if (category !== 'all') {
        filtered = filtered.filter(a => a.category === category);
    }
    
    if (duration !== 'all') {
        filtered = filtered.filter(a => a.duration === duration);
    }
    
    if (priceRange !== 'all') {
        if (priceRange === 'free') {
            filtered = filtered.filter(a => a.price === 0);
        } else if (priceRange === 'budget') {
            filtered = filtered.filter(a => a.price > 0 && a.price < 100);
        } else if (priceRange === 'moderate') {
            filtered = filtered.filter(a => a.price >= 100 && a.price <= 300);
        }
    }
    
    filteredAttractions = filtered;
    displayAttractions(filteredAttractions);
}

function sortAttractions() {
    const sortBy = document.getElementById('sortBy').value;
    let sorted = [...filteredAttractions];
    
    if (sortBy === 'name') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price-low') {
        sorted.sort((a, b) => a.price - b.price);
    }
    
    displayAttractions(sorted);
}

function openBookingModal(attractionId) {
    const attraction = attractions.find(a => a.id === attractionId);
    if (!attraction) return;
    
    currentAttraction = attraction;
    
    document.getElementById('modalAttractionImage').innerHTML = `<span style="font-size: 6rem;">${attraction.icon}</span>`;
    document.getElementById('modalAttractionImage').style.background = attraction.image;
    document.getElementById('modalAttractionName').textContent = attraction.name;
    document.getElementById('modalCategory').textContent = attraction.category.toUpperCase();
    document.getElementById('modalDuration').innerHTML = `⏱️ ${attraction.durationText}`;
    document.getElementById('modalLocation').innerHTML = `📍 ${attraction.location}`;
    document.getElementById('modalDescription').textContent = attraction.description;
    
    const highlightsList = document.getElementById('modalHighlights');
    highlightsList.innerHTML = `
        <h4>Highlights</h4>
        <ul>
            ${attraction.highlights.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    
    document.getElementById('summaryDuration').textContent = attraction.durationText;
    document.getElementById('summaryHours').textContent = attraction.hours;
    
    updatePricing();
    
    document.getElementById('bookingModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('bookingForm').reset();
}

function updatePricing() {
    if (!currentAttraction) return;
    
    const numVisitors = parseInt(document.getElementById('numVisitors').value) || 2;
    const pricePerPerson = currentAttraction.price;
    const total = pricePerPerson * numVisitors;
    
    document.getElementById('pricePerPerson').textContent = pricePerPerson === 0 ? 'FREE' : `QR ${pricePerPerson}`;
    document.getElementById('numPax').textContent = numVisitors;
    document.getElementById('total').textContent = total === 0 ? 'FREE ENTRY' : `QR ${total}`;
}

function submitBooking(event) {
    event.preventDefault();
    
    if (!currentAttraction) return;
    
    const name = document.getElementById('guestName').value;
    const email = document.getElementById('guestEmail').value;
    const date = document.getElementById('bookingDate').value;
    const visitors = document.getElementById('numVisitors').value;
    const time = document.getElementById('visitTime').value;
    const total = document.getElementById('total').textContent;
    
    if (!name || !email || !date) {
        alert('Please fill in all required fields');
        return;
    }
    
    alert(`✓ Visit Confirmed!

Attraction: ${currentAttraction.name}
Guest: ${name}
Date: ${date}
Time: ${time}
Visitors: ${visitors}
Total: ${total}

Confirmation sent to ${email}

Opening Hours: ${currentAttraction.hours}
Location: ${currentAttraction.location}

Enjoy your cultural experience!`);
    
    closeBookingModal();
}

// Beach Holiday Options Database

const beachOptions = [
    // BEACH ACCESS
    {
        id: 1,
        name: "Katara Beach",
        category: "beach",
        duration: "full",
        durationText: "Full day access",
        price: 0,
        location: "Katara Cultural Village",
        icon: "🏖️",
        image: "linear-gradient(135deg, #0C616F 0%, #4CAF50 100%)",
        description: "Beautiful public beach with golden sand, calm waters, and cultural village nearby",
        facilities: ["Free access", "Changing rooms", "Showers", "Nearby restaurants", "Lifeguards", "Beach volleyball", "Parking available", "Family-friendly"]
    },
    {
        id: 2,
        name: "Fuwairit Beach",
        category: "beach",
        duration: "full",
        durationText: "Full day access",
        price: 0,
        location: "North of Qatar, 80km from Doha",
        icon: "🏝️",
        image: "linear-gradient(135deg, #4CAF50 0%, #0C616F 100%)",
        description: "Remote pristine beach perfect for camping, turtle watching, and escaping the city",
        facilities: ["Free access", "Natural beach", "Turtle nesting site", "Camping allowed", "4x4 access recommended", "Secluded", "Bring supplies", "Perfect for day trips"]
    },
    {
        id: 3,
        name: "Sealine Beach",
        category: "beach",
        duration: "full",
        durationText: "Full day access",
        price: 0,
        location: "Mesaieed, 60km south of Doha",
        icon: "🏜️",
        image: "linear-gradient(135deg, #D4A574 0%, #0C616F 100%)",
        description: "Unique beach where desert dunes meet the sea, popular for water sports and camping",
        facilities: ["Free access", "Desert & beach combo", "Water sports", "Camping spots", "Dune views", "Kite surfing spot", "Basic facilities", "4x4 friendly"]
    },
    {
        id: 4,
        name: "Simaisma Beach",
        category: "beach",
        duration: "full",
        durationText: "Full day access",
        price: 0,
        location: "Simaisma, North of Doha",
        icon: "🌊",
        image: "linear-gradient(135deg, #0C616F 0%, #FFB81C 100%)",
        description: "Quiet family beach with shallow waters perfect for children",
        facilities: ["Free access", "Shallow waters", "Child-friendly", "Picnic areas", "Clean beach", "Less crowded", "Parking", "Basic amenities"]
    },

    // WATER SPORTS
    {
        id: 5,
        name: "Jet Ski Rental Package",
        category: "watersports",
        duration: "hourly",
        durationText: "1 hour",
        price: 300,
        location: "Multiple beach locations",
        icon: "🏍️",
        image: "linear-gradient(135deg, #FFB81C 0%, #0C616F 100%)",
        description: "High-speed jet ski rental with safety equipment and instruction",
        facilities: ["Latest jet ski models", "Safety briefing", "Life jackets provided", "Fuel included", "Instructor available", "Locker facilities", "Insurance included"]
    },
    {
        id: 6,
        name: "Parasailing Adventure",
        category: "watersports",
        duration: "hourly",
        durationText: "30 minutes",
        price: 350,
        location: "West Bay Beach",
        icon: "🪂",
        image: "linear-gradient(135deg, #0C616F 0%, #FF6B9D 100%)",
        description: "Soar 200 feet above the Gulf with breathtaking aerial views",
        facilities: ["Professional crew", "Safety equipment", "200ft flight", "Solo or tandem", "Photos available", "No experience needed", "Weight limit 120kg"]
    },
    {
        id: 7,
        name: "Banana Boat Ride",
        category: "watersports",
        duration: "hourly",
        durationText: "15 minutes",
        price: 80,
        location: "Katara Beach",
        icon: "🍌",
        image: "linear-gradient(135deg, #FFB81C 0%, #4CAF50 100%)",
        description: "Fun group activity bouncing across the waves",
        facilities: ["Group activity (6-8 people)", "Life jackets", "Experienced driver", "Fun for all ages", "Great for families", "Photos included"]
    },
    {
        id: 8,
        name: "Kayaking Experience",
        category: "watersports",
        duration: "half",
        durationText: "2 hours",
        price: 150,
        location: "Al Thakira Mangroves",
        icon: "🛶",
        image: "linear-gradient(135deg, #4CAF50 0%, #0C616F 100%)",
        description: "Paddle through serene mangroves spotting wildlife",
        facilities: ["Kayak & paddle", "Life jacket", "Guide included", "Wildlife spotting", "Eco-friendly", "Bottled water", "Scenic route"]
    },
    {
        id: 9,
        name: "Stand-Up Paddleboarding",
        category: "watersports",
        duration: "hourly",
        durationText: "1 hour",
        price: 120,
        location: "The Pearl Marina",
        icon: "🏄",
        image: "linear-gradient(135deg, #0C616F 0%, #4CAF50 100%)",
        description: "Glide across calm marina waters with beautiful views",
        facilities: ["SUP board rental", "Paddle", "Life vest", "Basic instruction", "Calm waters", "Equipment storage", "All levels welcome"]
    },
    {
        id: 10,
        name: "Donut Tube Ride",
        category: "watersports",
        duration: "hourly",
        durationText: "15 minutes",
        price: 70,
        location: "Multiple locations",
        icon: "🍩",
        image: "linear-gradient(135deg, #FF6B9D 0%, #0C616F 100%)",
        description: "Exciting inflatable tube ride pulled by speedboat",
        facilities: ["Inflatable tube", "Speedboat ride", "Safety equipment", "Fun for all ages", "Group discounts", "Photos available"]
    },

    // ISLAND RESORTS
    {
        id: 11,
        name: "Banana Island Day Pass",
        category: "island",
        duration: "full",
        durationText: "Full day (9 AM - 6 PM)",
        price: 450,
        location: "Banana Island by Anantara",
        icon: "🏝️",
        image: "linear-gradient(135deg, #4CAF50 0%, #FFB81C 100%)",
        description: "Exclusive luxury island resort with pristine beaches and world-class facilities",
        facilities: ["Ferry transfer included", "Beach access", "Pool access", "Water sports", "Lunch buffet", "Towels & lockers", "Spa discounts", "Kids club"]
    },
    {
        id: 12,
        name: "Purple Island (Al Khor Island)",
        category: "island",
        duration: "half",
        durationText: "Half day trip",
        price: 200,
        location: "Al Khor, North Qatar",
        icon: "🟣",
        image: "linear-gradient(135deg, #A12852 0%, #4CAF50 100%)",
        description: "Natural island famous for purple flowers and mangrove forests",
        facilities: ["Boat transfer", "Nature walks", "Mangrove viewing", "Bird watching", "Photography spots", "Guide included", "Refreshments", "Eco-tourism"]
    },
    {
        id: 13,
        name: "Safliya Island Excursion",
        category: "island",
        duration: "full",
        durationText: "Full day adventure",
        price: 550,
        location: "Safliya Island",
        icon: "⛵",
        image: "linear-gradient(135deg, #0C616F 0%, #4CAF50 100%)",
        description: "Remote island adventure with snorkeling and beach BBQ",
        facilities: ["Boat transport", "Snorkeling equipment", "BBQ lunch", "Beach games", "Swimming", "Professional crew", "Cooler drinks", "Fishing gear"]
    },

    // BEACH ACTIVITIES
    {
        id: 14,
        name: "Beach Volleyball Court Rental",
        category: "activity",
        duration: "hourly",
        durationText: "2 hours",
        price: 100,
        location: "Katara Beach",
        icon: "🏐",
        image: "linear-gradient(135deg, #FFB81C 0%, #4CAF50 100%)",
        description: "Professional beach volleyball court with equipment",
        facilities: ["Full court access", "Volleyball provided", "Net setup", "Shaded seating", "Changing rooms nearby", "Shower facilities", "Up to 12 players"]
    },
    {
        id: 15,
        name: "Beach Cabana Rental",
        category: "activity",
        duration: "full",
        durationText: "Full day",
        price: 300,
        location: "Various beach clubs",
        icon: "⛱️",
        image: "linear-gradient(135deg, #FF6B9D 0%, #0C616F 100%)",
        description: "Private beachfront cabana with table service",
        facilities: ["Private cabana", "Comfortable seating", "Shade coverage", "Table service", "Cooler & ice", "Beach toys", "Towels included", "WiFi access"]
    },
    {
        id: 16,
        name: "Beach Photography Session",
        category: "activity",
        duration: "hourly",
        durationText: "1 hour",
        price: 400,
        location: "Your choice of beach",
        icon: "📸",
        image: "linear-gradient(135deg, #0C616F 0%, #FFB81C 100%)",
        description: "Professional beach photography for families or couples",
        facilities: ["Professional photographer", "1 hour session", "Multiple locations", "Outfit changes", "50+ edited photos", "Online gallery", "Print package available"]
    },
    {
        id: 17,
        name: "Beach Yoga Class",
        category: "activity",
        duration: "hourly",
        durationText: "1 hour",
        price: 80,
        location: "Katara Beach",
        icon: "🧘",
        image: "linear-gradient(135deg, #4CAF50 0%, #FFB81C 100%)",
        description: "Sunrise or sunset yoga session on the beach",
        facilities: ["Certified instructor", "Yoga mats provided", "All levels welcome", "Sunrise or sunset", "Meditation included", "Small groups", "Refreshing drinks"]
    },

    // BOAT TRIPS
    {
        id: 18,
        name: "Sunset Dhow Cruise",
        category: "cruise",
        duration: "half",
        durationText: "2 hours",
        price: 200,
        location: "Doha Corniche",
        icon: "⛵",
        image: "linear-gradient(135deg, #8C1D40 0%, #FFB81C 100%)",
        description: "Traditional wooden dhow cruise along the coastline during sunset",
        facilities: ["Traditional dhow boat", "Buffet dinner", "Soft drinks", "Live music", "Sunset views", "Air-conditioned cabin", "Photo opportunities"]
    },
    {
        id: 19,
        name: "Speed Boat Island Tour",
        category: "cruise",
        duration: "half",
        durationText: "3 hours",
        price: 450,
        location: "Multiple departure points",
        icon: "🚤",
        image: "linear-gradient(135deg, #0C616F 0%, #E53935 100%)",
        description: "High-speed boat tour to remote islands with swimming stops",
        facilities: ["Speed boat", "Professional captain", "Island stops", "Snorkeling gear", "Refreshments", "Safety equipment", "Swimming breaks", "Cooler box"]
    },
    {
        id: 20,
        name: "Fishing Charter",
        category: "cruise",
        duration: "half",
        durationText: "4 hours",
        price: 600,
        location: "Various marinas",
        icon: "🎣",
        image: "linear-gradient(135deg, #0C616F 0%, #4CAF50 100%)",
        description: "Deep sea fishing experience with equipment and expert crew",
        facilities: ["Fishing boat charter", "All equipment", "Bait included", "Experienced crew", "Fish cleaning", "Refreshments", "Cooler for catch", "Photos of catch"]
    },
    {
        id: 21,
        name: "Glass Bottom Boat Tour",
        category: "cruise",
        duration: "hourly",
        durationText: "1.5 hours",
        price: 180,
        location: "The Pearl Marina",
        icon: "🐠",
        image: "linear-gradient(135deg, #4CAF50 0%, #0C616F 100%)",
        description: "See underwater marine life without getting wet",
        facilities: ["Glass bottom viewing", "Marine life spotting", "Educational tour", "Family-friendly", "Comfortable seating", "Refreshments", "Photo opportunities", "Air-conditioned"]
    }
];

let filteredBeachOptions = [...beachOptions];
let currentBeach = null;

window.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    const visitDateInput = document.getElementById('visitDate');
    const bookingDateInput = document.getElementById('bookingDate');
    
    if (visitDateInput) visitDateInput.min = today;
    if (bookingDateInput) bookingDateInput.min = today;
    
    displayBeachOptions(beachOptions);
    
    const numPeopleInput = document.getElementById('numPeople');
    if (numPeopleInput) {
        numPeopleInput.addEventListener('change', updatePricing);
    }
});

function displayBeachOptions(optionsToDisplay) {
    const grid = document.getElementById('beachGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (optionsToDisplay.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; padding: 3rem; grid-column: 1/-1;">No beach options found. Please adjust your filters.</p>';
        return;
    }
    
    optionsToDisplay.forEach(option => {
        const card = document.createElement('div');
        card.className = 'beach-card';
        card.onclick = () => openBookingModal(option.id);
        
        const freeBadge = option.price === 0 ? '<div class="free-badge">FREE ACCESS</div>' : '';
        
        card.innerHTML = `
            <div class="beach-card-image" style="background: ${option.image};">
                <span style="font-size: 6rem;">${option.icon}</span>
                ${freeBadge}
            </div>
            <div class="beach-card-content">
                <h3>${option.name}</h3>
                <div class="beach-category">${option.category}</div>
                <div class="beach-meta">
                    <span class="meta-item">
                        <span class="meta-icon">📍</span>
                        ${option.location}
                    </span>
                    <span class="meta-item">
                        <span class="meta-icon">⏱️</span>
                        ${option.durationText}
                    </span>
                </div>
                <p class="beach-description">${option.description}</p>
                <div class="beach-highlights">
                    ${option.facilities.slice(0, 3).map(f => `<div class="highlight-item">${f}</div>`).join('')}
                </div>
                <div class="beach-card-footer">
                    <div class="beach-price">
                        ${option.price === 0 ? 
                            '<span class="price-free">Free Access</span>' : 
                            `<span class="price-label">From</span>
                             <span class="price-amount">QR ${option.price}</span>
                             <span class="price-period">per person</span>`
                        }
                    </div>
                    <button class="btn-book-beach" onclick="event.stopPropagation(); openBookingModal(${option.id})">Book Now</button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function searchBeachOptions() {
    const category = document.getElementById('categoryFilter').value;
    const duration = document.getElementById('durationFilter').value;
    const priceRange = document.getElementById('priceFilter').value;
    
    let filtered = [...beachOptions];
    
    if (category !== 'all') {
        filtered = filtered.filter(b => b.category === category);
    }
    
    if (duration !== 'all') {
        filtered = filtered.filter(b => b.duration === duration);
    }
    
    if (priceRange !== 'all') {
        if (priceRange === 'free') {
            filtered = filtered.filter(b => b.price === 0);
        } else if (priceRange === 'budget') {
            filtered = filtered.filter(b => b.price > 0 && b.price < 200);
        } else if (priceRange === 'moderate') {
            filtered = filtered.filter(b => b.price >= 200 && b.price <= 500);
        } else if (priceRange === 'premium') {
            filtered = filtered.filter(b => b.price > 500);
        }
    }
    
    filteredBeachOptions = filtered;
    displayBeachOptions(filteredBeachOptions);
}

function sortBeachOptions() {
    const sortBy = document.getElementById('sortBy').value;
    let sorted = [...filteredBeachOptions];
    
    if (sortBy === 'name') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price-low') {
        sorted.sort((a, b) => a.price - b.price);
    }
    
    displayBeachOptions(sorted);
}

function openBookingModal(beachId) {
    const beach = beachOptions.find(b => b.id === beachId);
    if (!beach) return;
    
    currentBeach = beach;
    
    document.getElementById('modalBeachImage').innerHTML = `<span style="font-size: 6rem;">${beach.icon}</span>`;
    document.getElementById('modalBeachImage').style.background = beach.image;
    document.getElementById('modalBeachName').textContent = beach.name;
    document.getElementById('modalCategory').textContent = beach.category.toUpperCase();
    document.getElementById('modalLocation').innerHTML = `📍 ${beach.location}`;
    document.getElementById('modalDuration').innerHTML = `⏱️ ${beach.durationText}`;
    document.getElementById('modalDescription').textContent = beach.description;
    
    const facilitiesList = document.getElementById('modalFacilities');
    facilitiesList.innerHTML = `
        <h4>Facilities & Amenities</h4>
        <ul>
            ${beach.facilities.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    
    updatePricing();
    
    document.getElementById('bookingModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('bookingForm').reset();
}

function updatePricing() {
    if (!currentBeach) return;
    
    const numPeople = parseInt(document.getElementById('numPeople').value) || 2;
    const pricePerPerson = currentBeach.price;
    const total = pricePerPerson * numPeople;
    
    document.getElementById('pricePerPerson').textContent = pricePerPerson === 0 ? 'FREE' : `QR ${pricePerPerson}`;
    document.getElementById('numPax').textContent = numPeople;
    document.getElementById('total').textContent = total === 0 ? 'FREE ACCESS' : `QR ${total}`;
}

function submitBooking(event) {
    event.preventDefault();
    
    if (!currentBeach) return;
    
    const name = document.getElementById('guestName').value;
    const email = document.getElementById('guestEmail').value;
    const date = document.getElementById('bookingDate').value;
    const people = document.getElementById('numPeople').value;
    const time = document.getElementById('preferredTime').value;
    const total = document.getElementById('total').textContent;
    
    if (!name || !email || !date) {
        alert('Please fill in all required fields');
        return;
    }
    
    alert(`🏖️ Beach Day Confirmed!

Experience: ${currentBeach.name}
Guest: ${name}
Date: ${date}
Time: ${time}
People: ${people}
Total: ${total}

Confirmation sent to ${email}

Location: ${currentBeach.location}

What to bring:
- Swimwear & towel
- Sunscreen (SPF 50+)
- Sunglasses & hat
- Plenty of water
- Beach toys (optional)

Enjoy your beach day in Qatar! ☀️🌊`);
    
    closeBookingModal();
}

// Family Activities Database

const familyActivities = [
    // THEME PARKS
    {
        id: 1,
        name: "Angry Birds World",
        type: "theme-park",
        ageRange: "all",
        ageText: "All ages (best 3-12)",
        duration: "4-5 hours",
        adultPrice: 250,
        childPrice: 200,
        location: "Doha Festival City Mall",
        icon: "🎮",
        image: "linear-gradient(135deg, #E53935 0%, #FFB81C 100%)",
        description: "Qatar's first indoor theme park with rides, games, and entertainment based on Angry Birds",
        features: ["15+ rides & attractions", "Indoor air-conditioned", "Arcade games", "Character meet & greet", "Birthday party packages", "Food court nearby", "All-day access", "Lockers available"]
    },
    {
        id: 2,
        name: "Virtuocity - VR Gaming",
        type: "entertainment",
        ageRange: "teen",
        ageText: "8+ years",
        duration: "2-3 hours",
        adultPrice: 150,
        childPrice: 150,
        location: "Place Vendôme Mall",
        icon: "🎮",
        image: "linear-gradient(135deg, #8C1D40 0%, #0C616F 100%)",
        description: "State-of-the-art virtual reality gaming center with latest VR experiences",
        features: ["Latest VR technology", "Multiple game zones", "Racing simulators", "Adventure games", "Family-friendly options", "Comfortable gaming pods", "Snack bar", "Group packages"]
    },
    {
        id: 3,
        name: "Quest Qatar",
        type: "theme-park",
        ageRange: "all",
        ageText: "All ages",
        duration: "Full day",
        adultPrice: 300,
        childPrice: 250,
        location: "Doha Oasis",
        icon: "🎢",
        image: "linear-gradient(135deg, #FFB81C 0%, #E53935 100%)",
        description: "Adventure theme park with rides, climbing walls, and family activities",
        features: ["Rock climbing", "Zip lines", "Rope courses", "Kids play areas", "Restaurants", "All-day wristbands", "Birthday venues", "Group activities"]
    },

    // EDUCATIONAL
    {
        id: 4,
        name: "Qatar National Library - Kids Program",
        type: "educational",
        ageRange: "child",
        ageText: "4-12 years",
        duration: "2 hours",
        adultPrice: 0,
        childPrice: 0,
        location: "Education City",
        icon: "📚",
        image: "linear-gradient(135deg, #4CAF50 0%, #0C616F 100%)",
        description: "Free children's library with storytelling sessions and educational programs",
        features: ["Free admission", "Children's library", "Storytelling sessions", "Educational workshops", "Reading areas", "Computer access", "Café", "Beautiful architecture"]
    },
    {
        id: 5,
        name: "Oxygen Park",
        type: "outdoor",
        ageRange: "all",
        ageText: "All ages",
        duration: "3-4 hours",
        adultPrice: 0,
        childPrice: 0,
        location: "Al Gharrafa",
        icon: "🌳",
        image: "linear-gradient(135deg, #4CAF50 0%, #FFB81C 100%)",
        description: "Qatar's largest park with playgrounds, cycling tracks, and family picnic areas",
        features: ["Free entry", "Multiple playgrounds", "Cycling tracks", "Picnic areas", "Walking trails", "Cafeteria", "Clean facilities", "Evening lighting"]
    },
    {
        id: 6,
        name: "Mathaf - Arab Museum (Family Tours)",
        type: "educational",
        ageRange: "child",
        ageText: "6+ years",
        duration: "2 hours",
        adultPrice: 0,
        childPrice: 0,
        location: "Education City",
        icon: "🎨",
        image: "linear-gradient(135deg, #8C1D40 0%, #FFB81C 100%)",
        description: "Free museum with family-friendly art workshops and guided tours",
        features: ["Free admission", "Family art workshops", "Interactive exhibits", "Guided tours", "Kids activities", "Modern art", "Café", "Gift shop"]
    },

    // OUTDOOR FUN
    {
        id: 7,
        name: "Desert Safari Family Package",
        type: "outdoor",
        ageRange: "child",
        ageText: "5+ years",
        duration: "5 hours",
        adultPrice: 350,
        childPrice: 250,
        location: "Desert pickup",
        icon: "🏜️",
        image: "linear-gradient(135deg, #D4A574 0%, #8C1D40 100%)",
        description: "Family-friendly desert adventure with gentle dune bashing and camel rides",
        facilities: ["Family-safe 4x4 driving", "Camel riding", "Sandboarding", "Traditional camp", "BBQ dinner", "Entertainment", "Photo opportunities", "Hotel pickup"]
    },
    {
        id: 8,
        name: "Al Bidda Park",
        type: "outdoor",
        ageRange: "all",
        ageText: "All ages",
        duration: "2-3 hours",
        adultPrice: 0,
        childPrice: 0,
        location: "Corniche, West Bay",
        icon: "⛲",
        image: "linear-gradient(135deg, #4CAF50 0%, #0C616F 100%)",
        description: "Waterfront park with fountains, playgrounds, and stunning city views",
        features: ["Free entry", "Water fountains", "Playgrounds", "Walking paths", "Skyline views", "Cafés", "Clean toilets", "Evening shows"]
    },
    {
        id: 9,
        name: "Aspire Park & Lake",
        type: "outdoor",
        ageRange: "all",
        ageText: "All ages",
        duration: "3-4 hours",
        adultPrice: 0,
        childPrice: 0,
        location: "Aspire Zone",
        icon: "🦆",
        image: "linear-gradient(135deg, #4CAF50 0%, #0C616F 100%)",
        description: "Beautiful park with lake, duck feeding, playgrounds, and sports facilities",
        features: ["Free entry", "Duck feeding", "Playground", "Lake views", "Cycling paths", "Kiosks", "Picnic spots", "Torch Tower views"]
    },

    // ENTERTAINMENT
    {
        id: 10,
        name: "Magic Planet",
        type: "entertainment",
        ageRange: "child",
        ageText: "2-12 years",
        duration: "2-3 hours",
        adultPrice: 80,
        childPrice: 120,
        location: "Multiple malls",
        icon: "🎪",
        image: "linear-gradient(135deg, #FF6B9D 0%, #FFB81C 100%)",
        description: "Indoor family entertainment center with games, rides, and activities",
        features: ["Arcade games", "Soft play areas", "Bumper cars", "Ball pits", "Prizes", "Birthday packages", "Café", "Token system"]
    },
    {
        id: 11,
        name: "Gondolania Theme Park",
        type: "theme-park",
        ageRange: "all",
        ageText: "All ages",
        duration: "3-4 hours",
        adultPrice: 150,
        childPrice: 120,
        location: "Villaggio Mall",
        icon: "🎡",
        image: "linear-gradient(135deg, #0C616F 0%, #FFB81C 100%)",
        description: "Indoor theme park with gondola rides through Venice-themed canals",
        features: ["Gondola rides", "Roller coasters", "Carousel", "Arcade games", "Indoor ice rink nearby", "Food court", "Shopping mall access", "Air-conditioned"]
    },
    {
        id: 12,
        name: "Circus Land",
        type: "entertainment",
        ageRange: "child",
        ageText: "3-12 years",
        duration: "2 hours",
        adultPrice: 100,
        childPrice: 150,
        location: "Various malls",
        icon: "🎪",
        image: "linear-gradient(135deg, #E53935 0%, #FFB81C 100%)",
        description: "Circus-themed play center with climbing structures and games",
        features: ["Climbing frames", "Slides", "Ball pits", "Trampolines", "Party rooms", "Supervised play", "Sock requirement", "Parent café"]
    },

    // WATER ACTIVITIES
    {
        id: 13,
        name: "Aqua Park Qatar",
        type: "water",
        ageRange: "all",
        ageText: "All ages",
        duration: "Full day",
        adultPrice: 200,
        childPrice: 150,
        location: "Salwa Road",
        icon: "💦",
        image: "linear-gradient(135deg, #0C616F 0%, #4CAF50 100%)",
        description: "Water park with slides, wave pools, and family-friendly attractions",
        features: ["Water slides", "Wave pool", "Lazy river", "Kids splash zone", "Lifeguards", "Lockers", "Food outlets", "Cabana rental"]
    },
    {
        id: 14,
        name: "Katara Beach Family Day",
        type: "water",
        ageRange: "all",
        ageText: "All ages",
        duration: "4-6 hours",
        adultPrice: 0,
        childPrice: 0,
        location: "Katara Cultural Village",
        icon: "🏖️",
        image: "linear-gradient(135deg, #0C616F 0%, #FFB81C 100%)",
        description: "Free public beach perfect for families with calm waters",
        features: ["Free access", "Calm waters", "Lifeguards", "Changing rooms", "Beach volleyball", "Nearby restaurants", "Cultural village", "Evening atmosphere"]
    },
    {
        id: 15,
        name: "Banana Boat Family Ride",
        type: "water",
        ageRange: "child",
        ageText: "6+ years",
        duration: "20 minutes",
        adultPrice: 80,
        childPrice: 80,
        location: "Multiple beaches",
        icon: "🍌",
        image: "linear-gradient(135deg, #FFB81C 0%, #0C616F 100%)",
        description: "Fun inflatable banana boat ride for the whole family",
        features: ["Family group activity", "Life jackets provided", "Safe speeds", "Professional driver", "Photos available", "Laughter guaranteed", "All safety equipment", "Beach access"]
    },
    {
        id: 16,
        name: "Kayaking for Families",
        type: "water",
        ageRange: "child",
        ageText: "8+ years",
        duration: "2 hours",
        adultPrice: 150,
        childPrice: 100,
        location: "Al Thakira Mangroves",
        icon: "🛶",
        image: "linear-gradient(135deg, #4CAF50 0%, #0C616F 100%)",
        description: "Gentle kayaking through mangroves with wildlife spotting",
        features: ["Family kayaks available", "Calm waters", "Wildlife viewing", "Guide included", "All equipment", "Snacks & water", "Educational", "Photo stops"]
    },
    {
        id: 17,
        name: "Swimming Pool Day Pass - 5 Star Hotels",
        type: "water",
        ageRange: "all",
        ageText: "All ages",
        duration: "Full day",
        adultPrice: 300,
        childPrice: 200,
        location: "Various luxury hotels",
        icon: "🏊",
        image: "linear-gradient(135deg, #0C616F 0%, #8C1D40 100%)",
        description: "Day access to luxury hotel pools with facilities",
        features: ["Pool access", "Beach access", "Towels included", "Changing rooms", "Kids pools", "Food & beverage credit", "Lounge chairs", "Waiter service"]
    },
    {
        id: 18,
        name: "Indoor Trampoline Park",
        type: "entertainment",
        ageRange: "child",
        ageText: "4+ years",
        duration: "2 hours",
        adultPrice: 100,
        childPrice: 120,
        location: "Various locations",
        icon: "🤸",
        image: "linear-gradient(135deg, #FFB81C 0%, #E53935 100%)",
        description: "Indoor trampoline facility with foam pits and dodgeball",
        features: ["Trampoline zones", "Foam pits", "Dodgeball courts", "Toddler area", "Safety briefing", "Grip socks required", "Party packages", "Café area"]
    }
];

let filteredActivities = [...familyActivities];
let currentActivity = null;

window.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    const visitDateInput = document.getElementById('visitDate');
    const bookingDateInput = document.getElementById('bookingDate');
    
    if (visitDateInput) visitDateInput.min = today;
    if (bookingDateInput) bookingDateInput.min = today;
    
    displayActivities(familyActivities);
    
    const numAdultsInput = document.getElementById('numAdults');
    const numChildrenInput = document.getElementById('numChildren');
    
    if (numAdultsInput) numAdultsInput.addEventListener('change', updatePricing);
    if (numChildrenInput) numChildrenInput.addEventListener('change', updatePricing);
});

function displayActivities(activitiesToDisplay) {
    const grid = document.getElementById('activitiesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (activitiesToDisplay.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; padding: 3rem; grid-column: 1/-1;">No activities found. Please adjust your filters.</p>';
        return;
    }
    
    activitiesToDisplay.forEach(activity => {
        const card = document.createElement('div');
        card.className = 'activity-card';
        card.onclick = () => openBookingModal(activity.id);
        
        const freeBadge = activity.adultPrice === 0 ? '<div class="free-badge">FREE</div>' : '';
        
        card.innerHTML = `
            <div class="activity-card-image" style="background: ${activity.image};">
                <span style="font-size: 6rem;">${activity.icon}</span>
                ${freeBadge}
            </div>
            <div class="activity-card-content">
                <h3>${activity.name}</h3>
                <div class="activity-category">${activity.type}</div>
                <div class="activity-meta">
                    <span class="meta-item">
                        <span class="meta-icon">👶</span>
                        ${activity.ageText}
                    </span>
                    <span class="meta-item">
                        <span class="meta-icon">⏱️</span>
                        ${activity.duration}
                    </span>
                </div>
                <p class="activity-description">${activity.description}</p>
                <div class="activity-highlights">
                    ${activity.features.slice(0, 3).map(f => `<div class="highlight-item">${f}</div>`).join('')}
                </div>
                <div class="activity-card-footer">
                    <div class="activity-price">
                        ${activity.adultPrice === 0 ? 
                            '<span class="price-free">Free Entry</span>' : 
                            `<span class="price-label">From</span>
                             <span class="price-amount">QR ${Math.min(activity.adultPrice, activity.childPrice)}</span>
                             <span class="price-period">per person</span>`
                        }
                    </div>
                    <button class="btn-book-activity" onclick="event.stopPropagation(); openBookingModal(${activity.id})">Book Now</button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function searchActivities() {
    const type = document.getElementById('typeFilter').value;
    const age = document.getElementById('ageFilter').value;
    const priceRange = document.getElementById('priceFilter').value;
    
    let filtered = [...familyActivities];
    
    if (type !== 'all') {
        filtered = filtered.filter(a => a.type === type);
    }
    
    if (age !== 'all') {
        filtered = filtered.filter(a => a.ageRange === age || a.ageRange === 'all');
    }
    
    if (priceRange !== 'all') {
        if (priceRange === 'free') {
            filtered = filtered.filter(a => a.adultPrice === 0);
        } else if (priceRange === 'budget') {
            filtered = filtered.filter(a => a.adultPrice > 0 && a.adultPrice < 100);
        } else if (priceRange === 'moderate') {
            filtered = filtered.filter(a => a.adultPrice >= 100 && a.adultPrice <= 300);
        }
    }
    
    filteredActivities = filtered;
    displayActivities(filteredActivities);
}

function sortActivities() {
    const sortBy = document.getElementById('sortBy').value;
    let sorted = [...filteredActivities];
    
    if (sortBy === 'name') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price-low') {
        sorted.sort((a, b) => a.adultPrice - b.adultPrice);
    }
    
    displayActivities(sorted);
}

function openBookingModal(activityId) {
    const activity = familyActivities.find(a => a.id === activityId);
    if (!activity) return;
    
    currentActivity = activity;
    
    document.getElementById('modalActivityImage').innerHTML = `<span style="font-size: 6rem;">${activity.icon}</span>`;
    document.getElementById('modalActivityImage').style.background = activity.image;
    document.getElementById('modalActivityName').textContent = activity.name;
    document.getElementById('modalType').textContent = activity.type.toUpperCase();
    document.getElementById('modalAgeRange').innerHTML = `👶 ${activity.ageText}`;
    document.getElementById('modalDuration').innerHTML = `⏱️ ${activity.duration}`;
    document.getElementById('modalDescription').textContent = activity.description;
    
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = `
        <h4>Features & Facilities</h4>
        <ul>
            ${activity.features.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    
    updatePricing();
    
    document.getElementById('bookingModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('bookingForm').reset();
}

function updatePricing() {
    if (!currentActivity) return;
    
    const numAdults = parseInt(document.getElementById('numAdults').value) || 2;
    const numChildren = parseInt(document.getElementById('numChildren').value) || 2;
    
    const adultPriceEach = currentActivity.adultPrice;
    const childPriceEach = currentActivity.childPrice;
    
    const adultTotal = adultPriceEach * numAdults;
    const childTotal = childPriceEach * numChildren;
    const total = adultTotal + childTotal;
    
    document.getElementById('adultCount').textContent = numAdults;
    document.getElementById('childCount').textContent = numChildren;
    document.getElementById('adultPrice').textContent = adultPriceEach === 0 ? 'FREE' : `QR ${adultPriceEach}`;
    document.getElementById('childPrice').textContent = childPriceEach === 0 ? 'FREE' : `QR ${childPriceEach}`;
    document.getElementById('adultTotal').textContent = adultTotal === 0 ? 'FREE' : `QR ${adultTotal}`;
    document.getElementById('childTotal').textContent = childTotal === 0 ? 'FREE' : `QR ${childTotal}`;
    document.getElementById('total').textContent = total === 0 ? 'FREE ENTRY' : `QR ${total}`;
}

function submitBooking(event) {
    event.preventDefault();
    
    if (!currentActivity) return;
    
    const name = document.getElementById('parentName').value;
    const email = document.getElementById('guestEmail').value;
    const date = document.getElementById('bookingDate').value;
    const adults = document.getElementById('numAdults').value;
    const children = document.getElementById('numChildren').value;
    const ages = document.getElementById('childrenAges').value;
    const total = document.getElementById('total').textContent;
    
    if (!name || !email || !date) {
        alert('Please fill in all required fields');
        return;
    }
    
    alert(`👨‍👩‍👧‍👦 Family Activity Booked!

Activity: ${currentActivity.name}
Parent: ${name}
Date: ${date}
Adults: ${adults}
Children: ${children}
Children's Ages: ${ages || 'Not specified'}
Total: ${total}

Confirmation sent to ${email}

Location: ${currentActivity.location}
Age Range: ${currentActivity.ageText}

What to bring:
- Comfortable clothes & shoes
- Water bottles
- Snacks (if needed)
- Sunscreen & hats
- Camera for memories!

Have a wonderful family day! 🎉`);
    
    closeBookingModal();
}