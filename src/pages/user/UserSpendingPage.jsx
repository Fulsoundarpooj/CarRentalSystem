import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserSpendingPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // userId assumed to be stored at login time
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/user/userSpent/${userId}`)
      .then(res => {
        const bookedOnly = res.data.filter(b => b.status === "BOOKED" || b.status === "JOURNEY-END");
        setBookings(bookedOnly);
      })
      .catch(() => setError("Failed to load spending data"))
      .finally(() => setLoading(false));
  }, [userId]);

  const totalSpent = bookings.reduce(
    (sum, b) => sum + (b.totalAmount || 0),
    0
  );

  return (
    <div className="page-wrapper">
      {/* HEADER */}
      <div className="header">
        {/* <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button> */}
        <h1>My Spending</h1>
      </div>

      {/* SUMMARY CARD */}
      <div className="summary-card">
        <span>Total Spent Till Date</span>
        <h2>₹ {totalSpent.toLocaleString()}</h2>
      </div>

      {/* CONTENT */}
      {loading && <p className="info">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <table className="spending-table">
          <thead>
            <tr>
              <th>Car</th>
              <th>City</th>
              <th>Start</th>
              <th>End</th>
              <th>Payment</th>
              <th>Status</th>
              <th className="amount">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.carName}</td>
                <td>{b.city}</td>
                <td>{b.startDate}</td>
                <td>{b.endDate}</td>
                <td>{b.paymentMode}</td>
                <td className="status">{b.status}</td>
                <td className="amount">₹ {b.totalAmount.toLocaleString()}</td>
              </tr>
            ))}

            {/* TOTAL ROW */}
            <tr className="total-row">
              <td colSpan="6">Total</td>
              <td className="amount">₹ {totalSpent.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

/* ================= CSS ================= */
const styles = `
.page-wrapper {
  padding: 24px;
  max-width: 1200px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
  background: #f8fafc;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.header h1 {
  font-size: 26px;
  color: #0f172a;
}

.back-btn {
  background: transparent;
  border: none;
  color: #2563eb;
  font-size: 14px;
  cursor: pointer;
}

.summary-card {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: white;
  padding: 20px;
  border-radius: 14px;
  margin-bottom: 28px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}

.summary-card span {
  font-size: 14px;
  opacity: 0.9;
}

.summary-card h2 {
  margin-top: 6px;
  font-size: 30px;
}

.spending-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

.spending-table th,
.spending-table td {
  padding: 14px 16px;
}

.spending-table thead {
  background: #0f172a;
  color: white;
}

.spending-table tbody tr {
  border-bottom: 1px solid #e5e7eb;
}

.spending-table tbody tr:hover {
  background: #f1f5f9;
}

.amount {
  text-align: right;
  font-weight: 600;
}

.status {
  color: #16a34a;
  font-weight: 600;
}

.total-row {
  background: #f1f5f9;
  font-weight: 700;
}

.info {
  color: #475569;
}

.error {
  color: #dc2626;
}
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = styles;
  document.head.appendChild(style);
}