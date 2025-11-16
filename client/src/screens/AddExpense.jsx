import React, { useState } from 'react';
import axios from "axios";

const styles = {
  outerContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    zIndex: 1
  },
  container: {
    width: '400px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  title: {
    textAlign: 'center',
    marginBottom: '15px',
    color: '#333'
  },
  message: {
    color: 'red',
    marginBottom: '15px',
    textAlign: 'center'
  },
  formGroup: {
    marginBottom: '12px'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  }
};

function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("General");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount || !date) {
      setMessage("Please fill in all required fields (title, amount, date).");
      return;
    }

    let isoDate = date;
    if (/^\d{2}-\d{2}-\d{4}$/.test(date)) {
      const [day, month, year] = date.split('-');
      isoDate = `${year}-${month}-${day}`;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/add_expense",
        {
          title,
          amount: Number(amount),
          date: isoDate,
          category,
          notes
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setMessage(response.data.message);

      setTitle("");
      setAmount("");
      setDate("");
      setCategory("General");
      setNotes("");
    } catch (error) {
      if (error.response && (error.response.data.message || error.response.data.error)) {
        setMessage(error.response.data.message || error.response.data.error);
      } else {
        setMessage("Failed to add expense. Try again.");
      }
    }
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h3 style={styles.title}>Add Expense</h3>
        {message && <p style={styles.message}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={styles.input}
              required
              onKeyDown={(e) => e.preventDefault()}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;
