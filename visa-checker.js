function checkVisaRequirement() {
    const select = document.getElementById('nationalitySelect');
    const nationality = select.value;
    const countryName = select.options[select.selectedIndex].text;
    const resultDiv = document.getElementById('visaResult');
    
    if (!nationality) {
        alert('Please select your nationality');
        return;
    }
    
    let resultHTML = '';
    
    if (nationality === 'visa-free') {
        resultHTML = `
            <div class="result-header visa-free-result">
                <div class="result-icon">✓</div>
                <h3>Great News, ${countryName} Citizens!</h3>
            </div>
            <div class="result-content">
                <p class="result-status">You do NOT need a visa to enter Qatar</p>
                <div class="result-details">
                    <h4>Details:</h4>
                    <ul>
                        <li><strong>Entry:</strong> Visa-free upon arrival</li>
                        <li><strong>Duration:</strong> Stay up to 90 days within 180 days</li>
                        <li><strong>Cost:</strong> FREE</li>
                        <li><strong>Processing:</strong> Instant at immigration</li>
                    </ul>
                    <h4>What You Need:</h4>
                    <ul>
                        <li>✓ Valid passport (minimum 6 months validity)</li>
                        <li>✓ Return or onward flight ticket</li>
                        <li>✓ Proof of accommodation in Qatar</li>
                        <li>✓ Sufficient funds for your stay</li>
                    </ul>
                </div>
            </div>
        `;
    } else if (nationality === 'gcc') {
        resultHTML = `
            <div class="result-header gcc-result">
                <div class="result-icon">🌟</div>
                <h3>Welcome, GCC Citizen!</h3>
            </div>
            <div class="result-content">
                <p class="result-status">You can enter Qatar with just your National ID</p>
                <div class="result-details">
                    <h4>Details:</h4>
                    <ul>
                        <li><strong>Entry:</strong> Free movement as GCC citizen</li>
                        <li><strong>Duration:</strong> Unlimited stay</li>
                        <li><strong>Cost:</strong> FREE</li>
                        <li><strong>Requirements:</strong> Valid national ID card or passport</li>
                    </ul>
                    <p class="info-note">As a GCC citizen, you enjoy full freedom of movement within Qatar with no visa requirements.</p>
                </div>
            </div>
        `;
    } else if (nationality === 'visa-on-arrival') {
        resultHTML = `
            <div class="result-header arrival-result">
                <div class="result-icon">🛂</div>
                <h3>Visa on Arrival Available for ${countryName}</h3>
            </div>
            <div class="result-content">
                <p class="result-status">You can obtain a visa upon arrival at the airport</p>
                <div class="result-details">
                    <h4>Details:</h4>
                    <ul>
                        <li><strong>Entry:</strong> Visa on arrival at Hamad International Airport</li>
                        <li><strong>Duration:</strong> 30 days (extendable for another 30 days)</li>
                        <li><strong>Cost:</strong> QAR 100 (approximately USD 27)</li>
                        <li><strong>Processing Time:</strong> 10-30 minutes at immigration</li>
                    </ul>
                    <h4>Required Documents:</h4>
                    <ul>
                        <li>✓ Valid passport (minimum 6 months validity)</li>
                        <li>✓ Confirmed hotel reservation</li>
                        <li>✓ Return flight ticket</li>
                        <li>✓ Payment for visa fee (cash or card accepted)</li>
                    </ul>
                    <p class="info-note">Make sure to have all documents ready when you arrive at immigration to ensure smooth processing.</p>
                </div>
            </div>
        `;
    } else if (nationality === 'e-visa') {
        resultHTML = `
            <div class="result-header evisa-result">
                <div class="result-icon">💻</div>
                <h3>e-Visa Required for ${countryName}</h3>
            </div>
            <div class="result-content">
                <p class="result-status">You need to apply for an electronic visa before traveling</p>
                <div class="result-details">
                    <h4>Details:</h4>
                    <ul>
                        <li><strong>Application:</strong> Apply online before travel</li>
                        <li><strong>Processing Time:</strong> 3-5 business days</li>
                        <li><strong>Duration:</strong> 30 days (single or multiple entry)</li>
                        <li><strong>Cost:</strong> QAR 100-200 (varies by nationality)</li>
                    </ul>
                    <h4>How to Apply:</h4>
                    <ol>
                        <li>Visit Qatar's official e-visa portal</li>
                        <li>Fill out the online application form</li>
                        <li>Upload required documents (passport copy, photo, hotel booking)</li>
                        <li>Pay the visa fee online</li>
                        <li>Receive e-visa via email (print and carry)</li>
                    </ol>
                    <h4>Required Documents:</h4>
                    <ul>
                        <li>✓ Passport copy (6 months validity)</li>
                        <li>✓ Recent passport-sized photograph</li>
                        <li>✓ Hotel reservation confirmation</li>
                        <li>✓ Return flight booking</li>
                        <li>✓ Completed online application</li>
                    </ul>
                    <p class="warning-note">⚠️ Apply at least 7 days before your planned travel date to allow for processing.</p>
                </div>
            </div>
        `;
    } else if (nationality === 'embassy-visa') {
        resultHTML = `
            <div class="result-header embassy-result">
                <div class="result-icon">🏛️</div>
                <h3>Embassy Visa Required for ${countryName}</h3>
            </div>
            <div class="result-content">
                <p class="result-status">You must apply for a visa at a Qatar Embassy or Consulate</p>
                <div class="result-details">
                    <h4>Details:</h4>
                    <ul>
                        <li><strong>Application:</strong> In person at Qatar Embassy/Consulate</li>
                        <li><strong>Processing Time:</strong> 10-15 business days</li>
                        <li><strong>Duration:</strong> Varies (typically 30 days)</li>
                        <li><strong>Cost:</strong> Varies by nationality and visa type</li>
                    </ul>
                    <h4>Application Process:</h4>
                    <ol>
                        <li>Locate the nearest Qatar Embassy or Consulate</li>
                        <li>Schedule an appointment (if required)</li>
                        <li>Submit application with all required documents</li>
                        <li>Pay visa fee</li>
                        <li>Collect passport with visa stamp</li>
                    </ol>
                    <h4>Required Documents:</h4>
                    <ul>
                        <li>✓ Completed visa application form</li>
                        <li>✓ Original passport (6 months validity)</li>
                        <li>✓ Two recent passport-sized photos</li>
                        <li>✓ Hotel booking confirmation</li>
                        <li>✓ Flight itinerary</li>
                        <li>✓ Bank statements (last 3 months)</li>
                        <li>✓ Travel insurance</li>
                        <li>✓ Visa fee payment</li>
                    </ul>
                    <p class="warning-note">⚠️ Apply at least 3-4 weeks before your intended travel date.</p>
                </div>
            </div>
        `;
    }
    
    resultDiv.innerHTML = resultHTML;
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


// Concerts & Shows Database - Organized by Category

const shows = {

    concerts: [
        {
            id: 1,
            name: "Andrea Bocelli - Voices of Hope Tour",
            category: "Classical Concert",
            date: "April 12, 2026",
            time: "8:00 PM",
            venue: "Lusail Stadium",
            location: "Lusail Boulevard, Lusail City",
            icon: "🎵",
            image: "linear-gradient(135deg, #8C1D40 0%, #FFB81C 100%)",
            description: "The world's most beloved tenor Andrea Bocelli brings his stunning repertoire to Doha's magnificent Lusail Stadium. Experience an unforgettable evening of opera arias, sacred songs, and crossover classics performed with the Qatar Philharmonic Orchestra under the stars.",
            highlights: ["Andrea Bocelli live", "Qatar Philharmonic Orchestra", "Stadium concert", "Opera classics", "Sacred songs", "World-class production", "VIP packages available", "Open-air spectacle"],
            tickets: "QR 300 - 2000",
            booking: "Q-Tickets.com",
            artists: ["Andrea Bocelli (Tenor)", "Qatar Philharmonic Orchestra", "Special guest soprano"],
            tips: ["Book early — this will sell out", "VIP packages include meet & greet", "Stadium opens 2 hours before show", "Bring a light jacket for evening", "Photography without flash permitted"]
        },
        {
            id: 2,
            name: "Ed Sheeran - Mathematics World Tour",
            category: "Pop Concert",
            date: "March 8, 2026",
            time: "8:30 PM",
            venue: "Lusail Stadium",
            location: "Lusail City",
            icon: "🎸",
            image: "linear-gradient(135deg, #E53935 0%, #FFB81C 100%)",
            description: "Global superstar Ed Sheeran performs his biggest hits including Shape of You, Thinking Out Loud, Perfect, and Castle on the Hill in an intimate stadium show featuring just Ed, his guitar, and his revolutionary loop pedal technology.",
            highlights: ["Ed Sheeran solo performance", "Loop pedal mastery", "All the hits", "Stadium show", "360-degree stage", "Opening act", "Merchandise available", "Family-friendly"],
            tickets: "QR 350 - 1500",
            booking: "Q-Tickets.com",
            artists: ["Ed Sheeran", "Opening act TBA"],
            tips: ["Doors open 2 hours early", "No professional cameras", "Ed performs completely solo — incredible to watch", "Merchandise lines are long — shop early", "Public transport recommended"]
        },
        {
            id: 3,
            name: "Coldplay - Music of the Spheres Tour",
            category: "Rock Concert",
            date: "January 20, 2026",
            time: "8:00 PM",
            venue: "Lusail Stadium",
            location: "Lusail City",
            icon: "🌟",
            image: "linear-gradient(135deg, #0C616F 0%, #FFB81C 100%)",
            description: "Coldplay's spectacular Music of the Spheres tour comes to Doha with their groundbreaking eco-friendly production. LED wristbands, confetti cannons, lasers, and the band's biggest hits create an unforgettable visual and musical experience.",
            highlights: ["Coldplay live", "LED wristband light show", "Eco-friendly production", "Yellow, Fix You, Viva La Vida", "Confetti cannons", "Lasers & fireworks", "Interactive experience", "Two-hour set"],
            tickets: "QR 400 - 1800",
            booking: "Q-Tickets.com",
            artists: ["Coldplay - Chris Martin, Jonny Buckland, Guy Berryman, Will Champion"],
            tips: ["LED wristbands given at entry — keep it on!", "Confetti moment is unforgettable", "Arrive early for best viewing", "The production is as important as the music", "Sustainable concert — bring reusable bottles"]
        },
        {
            id: 4,
            name: "The Weeknd - After Hours Tour",
            category: "R&B/Pop Concert",
            date: "November 5, 2026",
            time: "9:00 PM",
            venue: "Lusail Stadium",
            location: "Lusail City",
            icon: "💿",
            image: "linear-gradient(135deg, #E53935 0%, #2c2c2c 100%)",
            description: "The Weeknd brings his cinematic After Hours experience to Qatar with a visually stunning production featuring Blinding Lights, Starboy, Can't Feel My Face, and I Feel It Coming in an immersive audiovisual spectacle.",
            highlights: ["The Weeknd live", "After Hours production", "All major hits", "Cinematic visuals", "Stunning light show", "Special effects", "Two-hour performance", "Premium sound system"],
            tickets: "QR 350 - 1600",
            booking: "Q-Tickets.com",
            artists: ["The Weeknd", "Live band", "Opening DJ set"],
            tips: ["Later start time — 9 PM", "Visual production is extraordinary", "Standing area gets very crowded", "Age 16+ recommended", "Metro runs late for the show"]
        }
    ],

    theater: [
        {
            id: 5,
            name: "The Lion King - Middle East Tour",
            category: "Musical Theater",
            date: "February 10 - March 5, 2026",
            time: "8:00 PM (7 shows weekly)",
            venue: "Qatar National Convention Centre",
            location: "Education City, Doha",
            icon: "🎭",
            image: "linear-gradient(135deg, #FFB81C 0%, #E53935 100%)",
            description: "Disney's award-winning musical The Lion King makes its Qatar debut with the complete Broadway production. Stunning costumes, innovative puppetry, and Elton John's iconic score bring the Pride Lands to life in this unmissable theatrical event.",
            highlights: ["Broadway production", "Circle of Life live", "Innovative puppetry", "Full orchestra", "Multiple shows", "Family-friendly", "Matinee performances", "QNCC theatre"],
            tickets: "QR 200 - 800",
            booking: "QNCC box office & Q-Tickets.com",
            artists: ["International cast", "Live orchestra", "Broadway creative team"],
            tips: ["Book well in advance — extremely popular", "Matinee shows available weekends", "Premium seats center orchestra", "Running time 2 hours 30 mins with interval", "Perfect for ages 6+"]
        },
        {
            id: 6,
            name: "Shakespeare - Hamlet",
            category: "Classical Drama",
            date: "April 15-20, 2026",
            time: "7:30 PM",
            venue: "Katara Opera House",
            location: "Katara Cultural Village",
            icon: "👑",
            image: "linear-gradient(135deg, #8C1D40 0%, #2c2c2c 100%)",
            description: "A visiting British theater company presents Shakespeare's Hamlet in the intimate Katara Opera House. This fresh, modern interpretation of the timeless tragedy features a renowned international cast.",
            highlights: ["Shakespeare classic", "International cast", "Katara Opera House", "Modern interpretation", "English performance", "Intimate venue", "6 nights only", "Post-show discussions"],
            tickets: "QR 150 - 500",
            booking: "Katara box office",
            artists: ["London Theater Company", "Renowned Shakespearean actors"],
            tips: ["Performed in English", "2 hours 45 mins including interval", "Post-show Q&A on weekends", "Smart casual dress code", "Book online to guarantee seats"]
        },
        {
            id: 7,
            name: "Doha Players - Local Theater Production",
            category: "Community Theater",
            date: "Monthly performances",
            time: "8:00 PM",
            venue: "Qatar Theatre",
            location: "Doha",
            icon: "🎬",
            image: "linear-gradient(135deg, #4CAF50 0%, #8C1D40 100%)",
            description: "Doha Players, Qatar's leading English-language amateur theater group, presents monthly productions ranging from comedies to dramas. A wonderful showcase of local talent in an intimate theater setting.",
            highlights: ["Local talent", "English performances", "Monthly shows", "Variety of genres", "Affordable tickets", "Community atmosphere", "Regular productions", "Intimate venue"],
            tickets: "QR 50 - 100",
            booking: "DohaPlayers.com",
            artists: ["Doha Players cast - local expat community"],
            tips: ["Check website for current production", "Very affordable entertainment", "Great for expat community", "Often includes post-show mingling", "Limited seating — book ahead"]
        }
    ],

    classical: [
        {
            id: 8,
            name: "Qatar Philharmonic Orchestra - Gala Concert",
            category: "Classical Music",
            date: "March 15, 2026",
            time: "7:30 PM",
            venue: "Katara Opera House",
            location: "Katara Cultural Village",
            icon: "🎻",
            image: "linear-gradient(135deg, #8C1D40 0%, #0C616F 100%)",
            description: "The Qatar Philharmonic Orchestra performs a stunning programme of classical masterworks including Beethoven's 9th Symphony, Tchaikovsky's 1812 Overture, and Vivaldi's Four Seasons in the acoustically perfect Katara Opera House.",
            highlights: ["Qatar Philharmonic", "Classical masterworks", "Beethoven's 9th", "Opera House acoustics", "International soloists", "Full orchestra", "World-class musicians", "Elegant evening"],
            tickets: "QR 150 - 600",
            booking: "Katara box office",
            artists: ["Qatar Philharmonic Orchestra", "International guest conductor", "Visiting soloists"],
            tips: ["Dress code: Smart/formal", "Arrive 20 mins early", "Programme notes available in English & Arabic", "No late entry after start", "The Opera House acoustics are world-class"]
        },
        {
            id: 9,
            name: "Yo-Yo Ma - Solo Cello Recital",
            category: "Solo Recital",
            date: "May 8, 2026",
            time: "8:00 PM",
            venue: "Katara Opera House",
            location: "Katara Cultural Village",
            icon: "🎼",
            image: "linear-gradient(135deg, #D4A574 0%, #8C1D40 100%)",
            description: "Legendary cellist Yo-Yo Ma performs an intimate solo recital featuring Bach's complete Cello Suites in one of the most anticipated classical music events of the year.",
            highlights: ["Yo-Yo Ma live", "Bach Cello Suites", "Solo performance", "Intimate recital", "Once-in-a-lifetime", "World's greatest cellist", "Opera House setting", "Limited seating"],
            tickets: "QR 400 - 1200",
            booking: "Katara box office - advance booking essential",
            artists: ["Yo-Yo Ma (Cello)"],
            tips: ["This WILL sell out immediately — book as soon as tickets release", "No photography during performance", "Formal dress code", "Arguably the greatest living cellist", "An unforgettable evening"]
        },
        {
            id: 10,
            name: "Vienna Boys Choir - Christmas Concert",
            category: "Choral Performance",
            date: "December 15, 2026",
            time: "7:00 PM",
            venue: "QNCC Theatre",
            location: "Education City",
            icon: "🎶",
            image: "linear-gradient(135deg, #4CAF50 0%, #E53935 100%)",
            description: "The legendary Vienna Boys Choir brings their angelic voices to Doha for a magical Christmas concert featuring traditional carols, classical pieces, and festive favorites.",
            highlights: ["Vienna Boys Choir", "Christmas concert", "Angelic voices", "Traditional carols", "Classical repertoire", "Family-friendly", "Festive atmosphere", "600-year tradition"],
            tickets: "QR 200 - 700",
            booking: "Q-Tickets.com",
            artists: ["Vienna Boys Choir"],
            tips: ["Perfect for families", "Get children excited about classical music", "Dress warmly — venues are air-conditioned", "Beautiful holiday tradition", "Great Christmas gift experience"]
        }
    ],

    film: [
        {
            id: 11,
            name: "Outdoor Cinema - Classic Films",
            category: "Film Screening",
            date: "Every Friday October - April",
            time: "7:00 PM",
            venue: "MIA Park",
            location: "Museum of Islamic Art Park",
            icon: "🎬",
            image: "linear-gradient(135deg, #0C616F 0%, #2c2c2c 100%)",
            description: "Free outdoor cinema every Friday evening at MIA Park featuring classic films under the stars. Bring a picnic blanket, enjoy the Doha skyline, and watch beloved movies on a massive screen by the waterfront.",
            highlights: ["Free admission", "Classic films", "Outdoor setting", "Doha skyline views", "Picnic atmosphere", "Weekly screenings", "Family-friendly", "Waterfront location"],
            tickets: "Free",
            booking: "No booking required — first come first served",
            artists: ["Classic Hollywood films", "Family movies", "Occasional Bollywood nights"],
            tips: ["Arrive by 6:30 PM for good spots on the grass", "Bring picnic blankets & cushions", "Food kiosks available", "Becomes very popular — go early", "Stunning location with city lights"]
        },
        {
            id: 12,
            name: "Doha Film Institute - Premiere Screening",
            category: "Film Premiere",
            date: "Various dates",
            time: "7:30 PM",
            venue: "VOX Cinemas & Katara",
            location: "Multiple venues",
            icon: "🎞️",
            image: "linear-gradient(135deg, #E53935 0%, #FFB81C 100%)",
            description: "Doha Film Institute regularly hosts premiere screenings of international and regional films with director Q&As, bringing world cinema to Qatar audiences before general release.",
            highlights: ["Film premieres", "Director Q&A", "International cinema", "Regional films", "Red carpet events", "Industry guests", "Pre-release screenings", "Cinema culture"],
            tickets: "QR 40 - 100",
            booking: "DFI website",
            artists: ["International filmmakers", "Regional directors", "Industry professionals"],
            tips: ["Follow DFI social media for announcements", "Q&A sessions are fascinating", "Great way to discover world cinema", "Often subtitled in English", "Network with film enthusiasts"]
        }
    ],

    comedy: [
        {
            id: 13,
            name: "Trevor Noah - Stand-Up Comedy",
            category: "Stand-Up Comedy",
            date: "February 20, 2026",
            time: "8:30 PM",
            venue: "QNCC Auditorium",
            location: "Education City",
            icon: "🎤",
            image: "linear-gradient(135deg, #FFB81C 0%, #E53935 100%)",
            description: "Former Daily Show host Trevor Noah brings his razor-sharp observational comedy to Doha. Expect global politics, cultural observations, and hilarious storytelling from one of the world's top comedians.",
            highlights: ["Trevor Noah live", "Stand-up comedy", "Political humor", "Cultural commentary", "90-minute set", "International comedian", "Adult content", "One night only"],
            tickets: "QR 200 - 700",
            booking: "Q-Tickets.com",
            artists: ["Trevor Noah", "Opening comedian"],
            tips: ["Age 18+ recommended due to content", "No phones/recording during show", "Arrive early — seating is general admission by section", "Expect political and cultural humor", "Opening act starts 30 mins before Trevor"]
        },
        {
            id: 14,
            name: "Comedy Night at Katara",
            category: "Comedy Show",
            date: "Monthly - Last Thursday",
            time: "9:00 PM",
            venue: "Katara Drama Theatre",
            location: "Katara Cultural Village",
            icon: "😂",
            image: "linear-gradient(135deg, #8C1D40 0%, #FFB81C 100%)",
            description: "A monthly comedy night showcasing regional and international stand-up comedians. A rotating lineup ensures fresh material every month in an intimate comedy club atmosphere.",
            highlights: ["Monthly comedy night", "Multiple comedians", "Regional talent", "International acts", "Intimate venue", "Late-night show", "Affordable tickets", "Comedy club vibe"],
            tickets: "QR 80 - 150",
            booking: "Katara website",
            artists: ["Rotating lineup of 3-4 comedians per night"],
            tips: ["Age 18+ only", "Shows run about 2 hours", "Limited seating — book ahead", "No food but drinks available", "Great date night activity"]
        },
        {
            id: 15,
            name: "Magic Show - Illusion Masters",
            category: "Magic & Illusion",
            date: "March 25-27, 2026",
            time: "7:00 PM & 9:00 PM",
            venue: "City Center Doha Auditorium",
            location: "City Center Doha",
            icon: "🎩",
            image: "linear-gradient(135deg, #2c2c2c 0%, #FFB81C 100%)",
            description: "A spectacular magic and illusion show featuring international magicians with grand illusions, mind-reading, escape artistry, and close-up magic. Perfect family entertainment with stunning stage production.",
            highlights: ["Grand illusions", "International magicians", "Family show", "Multiple performances", "Close-up magic", "Escape acts", "Mind reading", "Spectacular production"],
            tickets: "QR 100 - 300",
            booking: "Q-Tickets.com",
            artists: ["International magic troupe", "Award-winning illusionists"],
            tips: ["Perfect for children 5+", "Two shows nightly", "Front row seats offer amazing close-ups", "Photography allowed in certain segments", "Meet the magicians after the show"]
        }
    ],

    arabic: [
        {
            id: 16,
            name: "Amr Diab - Live in Concert",
            category: "Arabic Pop",
            date: "April 30, 2026",
            time: "9:00 PM",
            venue: "Lusail Stadium",
            location: "Lusail City",
            icon: "🎤",
            image: "linear-gradient(135deg, #8C1D40 0%, #FFB81C 100%)",
            description: "The legendary Amr Diab, Egypt's biggest star and the Father of Mediterranean Music, performs his greatest hits in a massive stadium concert. Expect Tamally Maak, Nour El Ain, Habibi Ya Nour El Ain and more.",
            highlights: ["Amr Diab live", "All the hits", "Stadium show", "Full production", "Arabic pop", "Mediterranean sound", "Three-hour concert", "Regional superstar"],
            tickets: "QR 250 - 1200",
            booking: "Q-Tickets.com",
            artists: ["Amr Diab", "Live band"],
            tips: ["Huge regional draw — expect big crowds", "Later start time typical for Arabic concerts", "Stadium will be electric", "Family sections available", "Arabic & English announcements"]
        },
        {
            id: 17,
            name: "Nancy Ajram - Intimate Performance",
            category: "Arabic Pop",
            date: "June 10, 2026",
            time: "9:00 PM",
            venue: "Katara Amphitheater",
            location: "Katara Cultural Village",
            icon: "🌟",
            image: "linear-gradient(135deg, #FF6B9D 0%, #8C1D40 100%)",
            description: "Lebanese superstar Nancy Ajram performs an intimate outdoor concert at Katara's stunning amphitheater. Her blend of traditional Arabic music with pop sensibilities has made her one of the Arab world's biggest stars.",
            highlights: ["Nancy Ajram live", "Outdoor amphitheater", "Waterfront setting", "Lebanese pop", "Traditional fusion", "Intimate venue", "2-hour show", "Beautiful setting"],
            tickets: "QR 200 - 800",
            booking: "Katara box office",
            artists: ["Nancy Ajram", "Live musicians"],
            tips: ["The amphitheater setting is magical", "Bring a light jacket for evening breeze", "VIP tables include refreshments", "Family-friendly show", "Book early — limited capacity"]
        },
        {
            id: 18,
            name: "Traditional Oud Concert",
            category: "Traditional Arabic Music",
            date: "Monthly performances",
            time: "8:00 PM",
            venue: "Souq Waqif Cultural Center",
            location: "Souq Waqif",
            icon: "🎵",
            image: "linear-gradient(135deg, #D4A574 0%, #8C1D40 100%)",
            description: "Monthly performances of traditional Arabic music featuring master oud players in the atmospheric Souq Waqif Cultural Center. An authentic cultural experience showcasing classical Arabic musical heritage.",
            highlights: ["Traditional oud music", "Master musicians", "Cultural center", "Souq atmosphere", "Classical Arabic repertoire", "Monthly performances", "Intimate setting", "Free admission"],
            tickets: "Free",
            booking: "Walk-ins welcome — limited seating",
            artists: ["Master oud players", "Traditional ensemble"],
            tips: ["Arrive 30 minutes early for seating", "Very intimate and authentic", "Photography respectfully allowed", "Combine with Souq Waqif dinner", "Perfect cultural immersion"]
        }
    ],

    dance: [
        {
            id: 19,
            name: "Royal Ballet - Swan Lake",
            category: "Classical Ballet",
            date: "November 12-14, 2026",
            time: "7:30 PM",
            venue: "QNCC Theatre",
            location: "Education City",
            icon: "🩰",
            image: "linear-gradient(135deg, #FFFFFF 0%, #8C1D40 100%)",
            description: "The world-renowned Royal Ballet brings Tchaikovsky's timeless Swan Lake to Qatar with full orchestra, elaborate sets, and a company of 70 dancers. A once-in-a-lifetime opportunity to see ballet at its finest.",
            highlights: ["Royal Ballet", "Swan Lake", "Tchaikovsky score", "Live orchestra", "70 dancers", "Elaborate production", "World-class ballet", "Three performances"],
            tickets: "QR 300 - 1000",
            booking: "Q-Tickets.com",
            artists: ["The Royal Ballet", "Principal dancers", "Live orchestra"],
            tips: ["This is a very rare opportunity — book immediately", "Formal dress recommended", "Running time 3 hours with intervals", "Suitable for ages 8+", "Premium seats center stalls"]
        },
        {
            id: 20,
            name: "Flamenco Night - Spanish Passion",
            category: "Flamenco",
            date: "May 5, 2026",
            time: "8:30 PM",
            venue: "Katara Opera House",
            location: "Katara Cultural Village",
            icon: "💃",
            image: "linear-gradient(135deg, #E53935 0%, #FFB81C 100%)",
            description: "A mesmerizing evening of authentic Spanish flamenco featuring virtuoso guitar, passionate vocals, and stunning dance. A visiting troupe from Seville brings the heart and soul of Andalusia to Doha.",
            highlights: ["Authentic flamenco", "Spanish troupe", "Live guitar", "Passionate vocals", "Traditional dance", "Intimate venue", "Cultural experience", "One night only"],
            tickets: "QR 150 - 400",
            booking: "Katara box office",
            artists: ["Seville Flamenco Company", "Master guitarist", "Cantaor (singer)", "Principal dancers"],
            tips: ["The small venue creates incredible atmosphere", "No photography during performance", "Expect passion and intensity", "Suitable for adults and teens", "Show runs 90 minutes no interval"]
        }
    ]
};

let currentShow = null;

window.addEventListener('DOMContentLoaded', () => {
    displayAllShows();
});

function displayAllShows() {
    displayCategory('concertsGrid', shows.concerts);
    displayCategory('theaterGrid', shows.theater);
    displayCategory('classicalGrid', shows.classical);
    displayCategory('filmGrid', shows.film);
    displayCategory('comedyGrid', shows.comedy);
    displayCategory('arabicGrid', shows.arabic);
    displayCategory('danceGrid', shows.dance);
}

function displayCategory(gridId, items) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    grid.innerHTML = '';

    items.forEach(show => {
        const card = document.createElement('div');
        card.className = 'show-card';

        const freeBadge = show.tickets.toLowerCase().includes('free') ?
            '<div class="free-badge">FREE</div>' : '';

        card.innerHTML = `
            <div class="show-card-image" style="background: ${show.image};">
                <span style="font-size: 5rem;">${show.icon}</span>
                ${freeBadge}
            </div>
            <div class="show-card-content">
                <h3>${show.name}</h3>
                <div class="show-category">${show.category}</div>
                <div class="show-meta">
                    <span class="meta-item">📅 ${show.date}</span>
                </div>
                <div class="show-meta">
                    <span class="meta-item">🕐 ${show.time}</span>
                </div>
                <div class="show-meta">
                    <span class="meta-item">📍 ${show.venue}</span>
                </div>
                <p class="show-description">${show.description.substring(0, 130)}...</p>
                <div class="show-highlights">
                    ${show.highlights.slice(0, 4).map(h => `<span class="highlight-tag">${h}</span>`).join('')}
                </div>
                <div class="show-card-footer">
                    <button class="btn-view-show">View Details</button>
                </div>
            </div>
        `;

        card.onclick = () => openShowModal(show);
        grid.appendChild(card);
    });
}

function openShowModal(show) {
    currentShow = show;

    document.getElementById('modalShowImage').innerHTML = `<span style="font-size: 6rem;">${show.icon}</span>`;
    document.getElementById('modalShowImage').style.background = show.image;
    document.getElementById('modalShowName').textContent = show.name;
    document.getElementById('modalShowCategory').textContent = show.category;
    document.getElementById('modalShowDate').textContent = `📅 ${show.date}`;
    document.getElementById('modalShowTime').textContent = `🕐 ${show.time}`;
    document.getElementById('modalShowVenue').textContent = `📍 ${show.venue}`;
    document.getElementById('modalShowDescription').textContent = show.description;

    document.getElementById('modalShowHighlights').innerHTML = `
        <h4>Show Highlights</h4>
        <ul>${show.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
    `;

    document.getElementById('detailDate').textContent = show.date;
    document.getElementById('detailTime').textContent = show.time;
    document.getElementById('detailVenue').textContent = show.venue;
    document.getElementById('detailLocation').textContent = show.location;
    document.getElementById('detailTickets').textContent = show.tickets;
    document.getElementById('detailBooking').textContent = `Booking: ${show.booking}`;

    document.getElementById('detailArtists').innerHTML = `
        <ul style="list-style:none; padding:0;">
            ${show.artists.map(a => `<li style="padding:0.4rem 0; color:#555;">⭐ ${a}</li>`).join('')}
        </ul>
    `;

    document.getElementById('detailTips').innerHTML = `
        <ul style="list-style:none; padding:0;">
            ${show.tips.map(t => `<li style="padding:0.4rem 0; color:#555;">💡 ${t}</li>`).join('')}
        </ul>
    `;

    document.getElementById('showModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeShowModal() {
    document.getElementById('showModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}