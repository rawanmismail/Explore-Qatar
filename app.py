from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-in-production'

def get_db_connection():
    conn = sqlite3.connect('tourism.db')
    conn.row_factory = sqlite3.Row
    return conn

HOTELS = [
    {'id': 1, 'name': 'Four Seasons Doha', 'category': 'Luxury', 'location': 'West Bay', 'price': 450, 'rating': 5},
    {'id': 2, 'name': 'Souq Waqif Boutique Hotels', 'category': 'Boutique', 'location': 'Souq Waqif', 'price': 280, 'rating': 4},
    {'id': 3, 'name': 'The Pearl Gates Hotel', 'category': 'Luxury', 'location': 'The Pearl', 'price': 380, 'rating': 5},
    {'id': 4, 'name': 'City Centre Rotana', 'category': 'Business', 'location': 'City Centre', 'price': 220, 'rating': 4},
]

ACTIVITIES = {
    'Adventure': [
        {'id': 1, 'name': 'Desert Safari', 'description': 'Thrilling dune bashing', 'price': 150},
        {'id': 2, 'name': 'Kayaking', 'description': 'Mangrove kayaking', 'price': 90},
    ],
    'Art & culture': [
        {'id': 3, 'name': 'Museum Tour', 'description': 'Guided museum experience', 'price': 60},
        {'id': 4, 'name': 'Katara Village Tour', 'description': 'Cultural exploration', 'price': 50},
    ],
    'Romantic getaway': [
        {'id': 5, 'name': 'Dhow Cruise Dinner', 'description': 'Romantic dinner cruise', 'price': 180},
    ],
    'Beach holiday': [
        {'id': 6, 'name': 'Beach Day Pass', 'description': 'Luxury beach access', 'price': 100},
    ],
    'Family break': [
        {'id': 7, 'name': 'Theme Park Tickets', 'description': 'Family entertainment', 'price': 120},
    ],
    'Dining': [
        {'id': 8, 'name': 'Traditional Dining Experience', 'description': 'Authentic Qatar cuisine', 'price': 80},
    ],
    'Spa & wellness': [
        {'id': 9, 'name': 'Luxury Spa Package', 'description': 'Full day relaxation', 'price': 200},
    ],
    'Shopping': [
        {'id': 10, 'name': 'Souq Waqif Shopping Tour', 'description': 'Guided shopping experience', 'price': 40},
    ],
}

EVENTS = [
    {'id': 1, 'name': 'Qatar Food Festival', 'date': '2026-03-15', 'category': 'Festivals', 'price': 45},
    {'id': 2, 'name': 'Doha Cultural Festival', 'date': '2026-04-20', 'category': 'Cultural', 'price': 35},
    {'id': 3, 'name': 'Formula 1 Qatar', 'date': '2026-11-25', 'category': 'Sports', 'price': 250},
]

@app.route('/')
def index():
    return render_template('index.html', hotels=HOTELS, activities=ACTIVITIES, events=EVENTS)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        email = request.form['email']
        password = request.form['password']
        
        conn = get_db_connection()
        try:
            conn.execute('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
                        (first_name, last_name, email, generate_password_hash(password)))
            conn.commit()
            conn.close()
            return redirect(url_for('login'))
        except sqlite3.IntegrityError:
            conn.close()
            return render_template('register.html', error='Email already exists')
    
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
        conn.close()
        
        if user and check_password_hash(user['password'], password):
            session['user_id'] = user['id']
            session['first_name'] = user['first_name']
            session['last_name'] = user['last_name']
            session['email'] = user['email']
            return redirect(url_for('index'))
        else:
            return render_template('login.html', error='Invalid credentials')
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

@app.route('/profile')
def profile():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE id = ?', (session['user_id'],)).fetchone()
    notifications = conn.execute('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 10',
                                (session['user_id'],)).fetchall()
    conn.close()
    
    return render_template('profile.html', user=user, notifications=notifications)

@app.route('/book', methods=['POST'])
def book():
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': 'Please login to book'})
    
    data = request.json
    conn = get_db_connection()
    conn.execute('''INSERT INTO bookings 
                    (user_id, booking_type, item_name, booking_date, num_people, total_price)
                    VALUES (?, ?, ?, ?, ?, ?)''',
                 (session['user_id'], data['type'], data['name'], 
                  data['date'], data['people'], data['price']))
    
    conn.execute('''INSERT INTO notifications (user_id, message) VALUES (?, ?)''',
                (session['user_id'], f'Your {data["type"]} booking for {data["name"]} is confirmed.'))
    conn.commit()
    conn.close()
    
    return jsonify({'success': True, 'message': 'Booking confirmed!'})

@app.route('/my-bookings')
def my_bookings():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    bookings = conn.execute('SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC',
                           (session['user_id'],)).fetchall()
    favorites = conn.execute('SELECT * FROM favorites WHERE user_id = ?',
                            (session['user_id'],)).fetchall()
    conn.close()
    
    return render_template('bookings.html', bookings=bookings, favorites=favorites)

@app.route('/add-favorite', methods=['POST'])
def add_favorite():
    if 'user_id' not in session:
        return jsonify({'success': False})
    
    data = request.json
    conn = get_db_connection()
    conn.execute('INSERT INTO favorites (user_id, item_type, item_name) VALUES (?, ?, ?)',
                (session['user_id'], data['type'], data['name']))
    conn.commit()
    conn.close()
    
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)