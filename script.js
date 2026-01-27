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

"""
================================================================================
END OF JAVASCRIPT FILE
================================================================================
"""