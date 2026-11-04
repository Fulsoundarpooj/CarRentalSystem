// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function PartnerRevenuePage() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const PARTNER_SHARE = 0.7; // ✅ 70% partner share
//   const partnerId = localStorage.getItem("userId");

//   useEffect(() => {
//     if (!partnerId) {
//       setError("Partner not logged in");
//       setLoading(false);
//       return;
//     }

//     axios
//       .get(`http://localhost:8080/partner/allBookings/${partnerId}`)
//       .then(res => {
//         // Revenue only for completed / valid bookings
//         const valid = res.data.filter(
//           b => b.status === "BOOKED" || b.status === "JOURNEY-END"
//         );
//         setBookings(valid);
//       })
//       .catch(() => setError("Failed to load partner revenue"))
//       .finally(() => setLoading(false));
//   }, [partnerId]);

//   /* ================= CITY-WISE PARTNER REVENUE ================= */
//   const cityRevenue = bookings.reduce((acc, b) => {
//     const city = b.city || "Unknown";
//     const partnerAmount = (b.totalAmount || 0) * PARTNER_SHARE;

//     acc[city] = (acc[city] || 0) + partnerAmount;
//     return acc;
//   }, {});

//   /* ================= TOTAL PARTNER REVENUE ================= */
//   const totalRevenue = bookings.reduce(
//     (sum, b) => sum + (b.totalAmount || 0) * PARTNER_SHARE,
//     0
//   );

//   return (
//     <div className="partner-wrapper">
//       <h1>Partner Revenue Dashboard (70% Share)</h1>

//       {loading && <p className="info">Loading revenue...</p>}
//       {error && <p className="error">{error}</p>}

//       {!loading && !error && (
//         <>
//           {/* TOTAL REVENUE */}
//           <div className="total-card">
//             <span>Total Partner Revenue (70%)</span>
//             <h2>₹ {totalRevenue.toLocaleString()}</h2>
//           </div>

//           {/* CITY-WISE */}
//           <div className="card">
//             <h3>City-wise Partner Revenue</h3>
//             <table className="revenue-table">
//               <thead>
//                 <tr>
//                   <th>City</th>
//                   <th className="amount">Partner Share (₹)</th>
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

//           {/* BOOKING DETAILS */}
//           <div className="card">
//             <h3>Partner Earnings Per Booking</h3>
//             <table className="revenue-table">
//               <thead>
//                 <tr>
//                   <th>Booking ID</th>
//                   <th>Car</th>
//                   <th>City</th>
//                   <th>Customer</th>
//                   <th className="amount">Partner Amount (₹)</th>
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
//                       ₹ {(b.totalAmount * PARTNER_SHARE).toLocaleString()}
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
// .partner-wrapper {
//   padding: 30px;
//   max-width: 1200px;
//   margin: auto;
//   font-family: 'Segoe UI', sans-serif;
//   background: #f8fafc;
//   min-height: 100vh;
// }

// .partner-wrapper h1 {
//   font-size: 28px;
//   margin-bottom: 24px;
//   color: #0f172a;
// }

// .total-card {
//   background: linear-gradient(135deg, #16a34a, #065f46);
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
//   background: #064e3b;
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

export default function PartnerRevenuePage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const PARTNER_SHARE = 0.7;
  const partnerId = localStorage.getItem("userId");

  useEffect(() => {
    if (!partnerId) {
      setError("Partner not logged in");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/partner/allBookings/${partnerId}`)
      .then(res => {
        const valid = res.data.filter(
          b => b.status === "BOOKED" || b.status === "JOURNEY-END"
        );
        setBookings(valid);
      })
      .catch(() => setError("Failed to load partner revenue"))
      .finally(() => setLoading(false));
  }, [partnerId]);

  /* ================= CITY WISE ================= */
  const cityRevenue = bookings.reduce((acc, b) => {
    const city = b.city || "Unknown";
    acc[city] = (acc[city] || 0) + b.totalAmount * PARTNER_SHARE;
    return acc;
  }, {});

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + b.totalAmount * PARTNER_SHARE,
    0
  );

  return (
    <>
      <style>{`
        .page {
          min-height: 100vh;
          padding: 40px;
          background: linear-gradient(135deg,#020617,#0f172a);
          color: white;
        }

        h1 {
          font-size: 28px;
          margin-bottom: 30px;
        }

        .glass-box {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(14px);
          border-radius: 18px;
          padding: 24px;
          margin-bottom: 30px;
        }

        .total-revenue {
          background: linear-gradient(135deg,#16a34a,#065f46);
          padding: 26px;
          border-radius: 18px;
          margin-bottom: 40px;
        }

        .total-revenue span {
          font-size: 14px;
          opacity: 0.9;
        }

        .total-revenue h2 {
          font-size: 36px;
          margin-top: 10px;
        }

        .glass-table {
          width: 100%;
          border-collapse: collapse;
        }

        .glass-table th {
          padding: 16px;
          font-size: 13px;
          text-align: left;
          background: rgba(255,255,255,0.08);
          color: #e5e7eb;
        }

        .glass-table td {
          padding: 16px;
          font-size: 14px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .glass-table tr:hover {
          background: rgba(255,255,255,0.05);
        }

        .right {
          text-align: right;
          font-weight: 600;
        }

        .section-title {
          font-size: 18px;
          margin-bottom: 14px;
          color: #c7d2fe;
        }

        .info {
          color: #94a3b8;
        }

        .error {
          color: #f87171;
        }

        @media(max-width:768px) {
          .page {
            padding: 20px;
          }

          .glass-table th,
          .glass-table td {
            padding: 12px;
            font-size: 13px;
          }
        }
      `}</style>

      <div className="page">
        <h1>Partner Revenue Dashboard (70%)</h1>

        {loading && <p className="info">Loading revenue...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <>
            {/* TOTAL */}
            <div className="total-revenue">
              <span>Total Partner Revenue</span>
              <h2>₹ {totalRevenue.toLocaleString()}</h2>
            </div>

            {/* CITY WISE */}
            <div className="glass-box">
              <div className="section-title">City-wise Partner Revenue</div>

              <table className="glass-table">
                <thead>
                  <tr>
                    <th>City</th>
                    <th className="right">Partner Share (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(cityRevenue).map(([city, amount]) => (
                    <tr key={city}>
                      <td>{city}</td>
                      <td className="right">₹ {amount.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr>
                    <td><strong>Total</strong></td>
                    <td className="right">
                      <strong>₹ {totalRevenue.toLocaleString()}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* PER BOOKING */}
            <div className="glass-box">
              <div className="section-title">Partner Earnings Per Booking</div>

              <table className="glass-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Car</th>
                    <th>City</th>
                    <th>Customer</th>
                    <th className="right">Partner Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id}>
                      <td>#{b.id}</td>
                      <td>{b.carName}</td>
                      <td>{b.city}</td>
                      <td>{b.customerName}</td>
                      <td className="right">
                        ₹ {(b.totalAmount * PARTNER_SHARE).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
