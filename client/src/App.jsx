import React, { useState } from "react";
import AddExpense from "./screens/AddExpense";
import Summary from "./screens/Summary";
import Analysis from "./screens/Analysis";

const styles = {
  outer: {
    minHeight: "100vh",
    width: "100vw",
    background: "#f8fafc",
    margin: 0,
    padding: 0,
  },
  navbar: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#334155",
  padding: "10px 28px",           // Reduced top/bottom padding
  color: "#fff",
  boxShadow: "0 2px 10px rgba(0,0,0,0.09)",
  fontSize: "1.08rem",
  position: "sticky",
  top: 0,
  zIndex: 10,
  minHeight: "45px",              // Reduced minHeight
},

  navGroup: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    gap: "12px", // uniform spacing between buttons
  },
  navlink: {
    margin: 0,
    padding: "11px 30px",
    borderRadius: "8px",
    background: "transparent",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
    fontSize: "16px",
    letterSpacing: "0.5px",
    transition: "background 0.15s",
  },
  navlinkActive: {
    background: "#64748b",
  },
  pageBody: {
  minHeight: "calc(100vh - 45px)", 
  padding: "24px 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
},

};

function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "add":
        return <AddExpense />;
      case "summary":
        return <Summary />;
      case "analysis":
        return <Analysis />;
      default:
        return (
          <div style={{ textAlign: "center", fontSize: "2.1rem", color: "#334155" }}>
            Expense Tracker <br />
            <span style={{ fontSize: "1.1rem", color: "#555" }}></span>
          </div>
        );
    }
  };

  return (
    <div style={styles.outer}>
      <nav style={styles.navbar}>
        <span style={{ fontWeight: "bold", fontSize: "1.5rem", letterSpacing: "1px" }}>
          ExpenseTracker
        </span>
        <div style={styles.navGroup}>
          <button
            style={{
              ...styles.navlink,
              ...(page === "add" ? styles.navlinkActive : {}),
            }}
            onClick={() => setPage("add")}
          >
            Add Expense
          </button>
          <button
            style={{
              ...styles.navlink,
              ...(page === "summary" ? styles.navlinkActive : {}),
            }}
            onClick={() => setPage("summary")}
          >
            Summary (This Month)
          </button>
          <button
            style={{
              ...styles.navlink,
              ...(page === "analysis" ? styles.navlinkActive : {}),
            }}
            onClick={() => setPage("analysis")}
          >
            Analysis
          </button>
        </div>
      </nav>
      <div style={styles.pageBody}>{renderPage()}</div>
    </div>
  );
}

export default App;
