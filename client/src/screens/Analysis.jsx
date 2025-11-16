import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Analysis() {
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/expenses")
      .then(res => {
        const grouped = {};
        res.data.forEach(exp => {
          grouped[exp.category] = (grouped[exp.category] || 0) + Number(exp.amount);
        });
        setCategoryData(grouped);
      });
  }, []);

  // Prepare chart data
  const chartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "Expense Total",
        data: Object.values(categoryData),
        backgroundColor: "#007bff"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h3 style={{ textAlign: "center" }}>Expenses by Category</h3>
      {Object.keys(categoryData).length === 0 ? (
        <p>No data</p>
      ) : (
        <Bar data={chartData} options={options} height={350} width={800} />
      )}
    </div>
  );
}

export default Analysis;
