import React, { useEffect, useState } from "react";
import axios from "axios";

function getCurrentMonth() {
  const d = new Date();
  return d.toISOString().slice(0, 7); // "YYYY-MM"
}

function Summary() {
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/expenses")
      .then(res => {
        console.log("Fetched expenses:", res.data); // For debugging
        const month = getCurrentMonth();
        const filtered = res.data.filter(exp => 
          exp.date && exp.date.startsWith(month)
        );
        setFilteredExpenses(filtered);
        setTotal(filtered.reduce((acc, exp) => acc + Number(exp.amount), 0));
      });
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: 700, margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Monthly Summary</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Title</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Amount</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Date</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Category</th>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: 16, color: "#888" }}>
                No expenses found for this month.
              </td>
            </tr>
          ) : (
            filteredExpenses.map((exp, idx) => (
              <tr key={idx}>
                <td style={{ border: "1px solid #eee", padding: 8 }}>{exp.title}</td>
                <td style={{ border: "1px solid #eee", padding: 8 }}>₹{exp.amount}</td>
                <td style={{ border: "1px solid #eee", padding: 8 }}>{exp.date}</td>
                <td style={{ border: "1px solid #eee", padding: 8 }}>{exp.category}</td>
                <td style={{ border: "1px solid #eee", padding: 8 }}>{exp.notes}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div style={{ fontSize: "1.3rem", textAlign: "right" }}>
        <b>Total spent this month:</b> <span style={{ color: "#007bff" }}>₹{total}</span>
      </div>
    </div>
  );
}

export default Summary;
