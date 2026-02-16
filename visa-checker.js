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

