// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminRevenuePage() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const ADMIN_SHARE = 0.3; // ✅ 30% admin share

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/admin/allBookings")
//       .then(res => {
//         // only revenue generating bookings
//         const booked = res.data.filter(
//           b => b.status === "BOOKED" || b.status === "JOURNEY-END"
//         );
//         setBookings(booked);
//       })
//       .catch(() => setError("Failed to load revenue data"))
//       .finally(() => setLoading(false));
//   }, []);

//   /* ================= CITY-WISE ADMIN REVENUE ================= */
//   const cityRevenue = bookings.reduce((acc, b) => {
//     const city = b.city || "Unknown";
//     const adminAmount = (b.totalAmount || 0) * ADMIN_SHARE;

//     acc[city] = (acc[city] || 0) + adminAmount;
//     return acc;
//   }, {});

//   /* ================= TOTAL ADMIN REVENUE ================= */
//   const totalRevenue = bookings.reduce(
//     (sum, b) => sum + (b.totalAmount || 0) * ADMIN_SHARE,
//     0
//   );

//   return (
//     <div className="admin-wrapper">
//       <h1>Admin Revenue Dashboard (30% Share)</h1>

//       {loading && <p className="info">Loading revenue...</p>}
//       {error && <p className="error">{error}</p>}

//       {!loading && !error && (
//         <>
//           {/* TOTAL REVENUE */}
//           <div className="total-card">
//             <span>Total Admin Revenue (30%)</span>
//             <h2>₹ {totalRevenue.toLocaleString()}</h2>
//           </div>

//           {/* CITY-WISE */}
//           <div className="card">
//             <h3>City-wise Admin Revenue</h3>
//             <table className="revenue-table">
//               <thead>
//                 <tr>
//                   <th>City</th>
//                   <th className="amount">Admin Share (₹)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.entries(cityRevenue).map(([city, amount]) => (
//                   <tr key={city}>
//                     <td>{city}</td>
//                     <td className="amount">₹ {amount.toLocaleString()}</td>
//                   </tr>
//                 ))}

//                 <tr className="total-row">
//                   <td>Total</td>
//                   <td className="amount">₹ {totalRevenue.toLocaleString()}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           {/* DETAILED BOOKINGS */}
//           <div className="card">
//             <h3>Admin Earnings Per Booking (30%)</h3>
//             <table className="revenue-table">
//               <thead>
//                 <tr>
//                   <th>Booking ID</th>
//                   <th>Car</th>
//                   <th>City</th>
//                   <th>Customer</th>
//                   <th className="amount">Admin Amount (₹)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bookings.map(b => (
//                   <tr key={b.id}>
//                     <td>{b.id}</td>
//                     <td>{b.carName}</td>
//                     <td>{b.city}</td>
//                     <td>{b.customerName}</td>
//                     <td className="amount">
//                       ₹ {(b.totalAmount * ADMIN_SHARE).toLocaleString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// /* ================= CSS ================= */
// const styles = `
// .admin-wrapper {
//   padding: 30px;
//   max-width: 1200px;
//   margin: auto;
//   font-family: 'Segoe UI', sans-serif;
//   background: #f8fafc;
//   min-height: 100vh;
// }

// .admin-wrapper h1 {
//   font-size: 28px;
//   margin-bottom: 24px;
//   color: #0f172a;
// }

// .total-card {
//   background: linear-gradient(135deg, #2563eb, #1e40af);
//   color: white;
//   padding: 24px;
//   border-radius: 16px;
//   margin-bottom: 30px;
//   box-shadow: 0 15px 35px rgba(0,0,0,0.15);
// }

// .total-card span {
//   font-size: 14px;
//   opacity: 0.9;
// }

// .total-card h2 {
//   margin-top: 8px;
//   font-size: 32px;
// }

// .card {
//   background: white;
//   padding: 24px;
//   border-radius: 16px;
//   margin-bottom: 30px;
//   box-shadow: 0 10px 25px rgba(0,0,0,0.08);
// }

// .card h3 {
//   margin-bottom: 16px;
//   color: #1e293b;
// }

// .revenue-table {
//   width: 100%;
//   border-collapse: collapse;
// }

// .revenue-table th,
// .revenue-table td {
//   padding: 14px 16px;
// }

// .revenue-table thead {
//   background: #0f172a;
//   color: white;
// }

// .revenue-table tbody tr {
//   border-bottom: 1px solid #e5e7eb;
// }

// .revenue-table tbody tr:hover {
//   background: #f1f5f9;
// }

// .amount {
//   text-align: right;
//   font-weight: 600;
// }

// .total-row {
//   background: #f1f5f9;
//   font-weight: 700;
// }

// .info {
//   color: #475569;
// }

// .error {
//   color: #dc2626;
// }
// `;

// if (typeof document !== "undefined") {
//   const style = document.createElement("style");
//   style.innerHTML = styles;
//   document.head.appendChild(style);
// }

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminRevenuePage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ADMIN_SHARE = 0.3;

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/allBookings")
      .then(res => {
        const booked = res.data.filter(
          b => b.status === "BOOKED" || b.status === "JOURNEY-END"
        );
        setBookings(booked);
      })
      .catch(() => setError("Failed to load revenue data"))
      .finally(() => setLoading(false));
  }, []);

  const cityRevenue = bookings.reduce((acc, b) => {
    const city = b.city || "Unknown";
    const adminAmount = (b.totalAmount || 0) * ADMIN_SHARE;
    acc[city] = (acc[city] || 0) + adminAmount;
    return acc;
  }, {});

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + (b.totalAmount || 0) * ADMIN_SHARE,
    0
  );

  return (
    <>
      <style>{`
        .revenue-page {
          min-height: 100vh;
          background: linear-gradient(135deg,#020617,#0f172a);
          padding: 40px;
          color: white;
        }

        h1 {
          margin-bottom: 30px;
        }

        .highlight {
          font-size: 42px;
          font-weight: 800;
          color: #a5b4fc;
          margin-bottom: 40px;
        }

        .glass-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 50px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(14px);
          border-radius: 18px;
          overflow: hidden;
        }

        .glass-table th {
          text-align: left;
          padding: 18px;
          font-size: 14px;
          background: rgba(255,255,255,0.08);
          color: #e5e7eb;
        }

        .glass-table td {
          padding: 18px;
          border-top: 1px solid rgba(255,255,255,0.08);
          font-size: 15px;
        }

        .glass-table tr:hover {
          background: rgba(255,255,255,0.05);
        }

        .amount {
          text-align: right;
          font-weight: 700;
          color: #a5b4fc;
        }

        .section-title {
          margin-bottom: 14px;
          color: #c7d2fe;
          font-size: 18px;
        }

        .info {
          color: #cbd5f5;
        }

        .error {
          color: #ef4444;
        }

        @media(max-width:768px){
          .revenue-page {
            padding: 20px;
          }
          .glass-table th,
          .glass-table td {
            padding: 12px;
            font-size: 13px;
          }
        }
      `}</style>

      <div className="revenue-page">
        <h1>Admin Revenue Dashboard</h1>

        {loading && <p className="info">Loading revenue...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <>
            {/* TOTAL */}
            <div className="highlight">
              ₹ {totalRevenue.toLocaleString()} <span style={{ fontSize: 16 }}>(30% Admin Share)</span>
            </div>

            {/* CITY-WISE */}
            <div className="section-title">City-wise Revenue</div>
            <table className="glass-table">
              <thead>
                <tr>
                  <th>City</th>
                  <th className="amount">Admin Share (₹)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(cityRevenue).map(([city, amount]) => (
                  <tr key={city}>
                    <td>{city}</td>
                    <td className="amount">₹ {amount.toLocaleString()}</td>
                  </tr>
                ))}
                <tr>
                  <td><strong>Total</strong></td>
                  <td className="amount">
                    ₹ {totalRevenue.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* PER BOOKING */}
            <div className="section-title">Admin Earnings Per Booking</div>
            <table className="glass-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Car</th>
                  <th>City</th>
                  <th>Customer</th>
                  <th className="amount">Admin Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.carName}</td>
                    <td>{b.city}</td>
                    <td>{b.customerName}</td>
                    <td className="amount">
                      ₹ {(b.totalAmount * ADMIN_SHARE).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}

