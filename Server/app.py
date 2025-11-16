from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
from datetime import datetime, date
import os

print("Using database at:", os.path.abspath("database.db"))

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/add_expense', methods=['POST'])
def add_expense():
    try:
        data = request.json
        print("Received data:", data)   
        title = data.get("title")
        amount = data.get("amount")
        date_str = data.get("date")  
        category = data.get("category")
        notes = data.get("notes")

        # Ensure date in correct format
        try:
            expense_date = datetime.strptime(date_str, '%Y-%m-%d')
            date_to_store = expense_date.strftime('%Y-%m-%d')
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use yyyy-mm-dd.'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO expenses (title, amount, date, category, notes)
            VALUES (?, ?, ?, ?, ?)
        """, (title, amount, date_to_store, category, notes))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Expense added successfully'}), 201

    except Exception as e:
        print("ERROR WHILE INSERTING:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    conn = get_db_connection()
    expenses = conn.execute('SELECT * FROM expenses').fetchall()
    conn.close()
    return jsonify([dict(row) for row in expenses])

@app.route('/api/summary_this_month', methods=['GET'])
def summary_this_month():
    conn = get_db_connection()
    cur = conn.cursor()
    today = date.today()
    first_of_month = today.replace(day=1)
    cur.execute('''
        SELECT SUM(amount) 
        FROM expenses
        WHERE date >= ? AND date <= ?
    ''', (first_of_month.isoformat(), today.isoformat()))
    total = cur.fetchone()[0]
    conn.close()
    return jsonify({'total': total or 0})

@app.route('/')
def home():
    return 'Server is running!'

if __name__ == '__main__':
    app.run(debug=True)
