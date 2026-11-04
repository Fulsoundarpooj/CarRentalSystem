// import React, { useEffect, useState } from "react";

// export default function PartnerBookingHistory() {
//   const [list, setList] = useState([]);

//   const fetchBookings = (partnerId) => {
//     fetch(`http://localhost:8080/partner/allBookings/${partnerId}`)
//       .then(res => res.json())
//       .then(data => setList(data))
//       .catch(err => console.log(err));
//   };

//   useEffect(() => {
//     const partnerId = localStorage.getItem("userId"); // set this at login
//     if (partnerId) fetchBookings(partnerId);
//   }, []);

//   return (
//     <>
//       <style>{`
//         body {
//           background: #f4f6f9;
//         }

//         .page {
//           padding: 30px;
//           min-height: 100vh;
//         }

//         .title {
//           font-size: 28px;
//           font-weight: 700;
//           margin-bottom: 30px;
//           color: #111827;
//         }

//         .bookingCard {
//           background: white;
//           border-radius: 18px;
//           padding: 22px;
//           margin-bottom: 18px;
//           box-shadow: 0 12px 30px rgba(0,0,0,0.08);
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .left h4 {
//           margin: 0;
//           font-size: 18px;
//           font-weight: 600;
//         }

//         .left p {
//           margin: 6px 0;
//           color: #6b7280;
//           font-size: 14px;
//         }

//         .right {
//           text-align: right;
//         }

//         .amount {
//           font-size: 18px;
//           font-weight: 700;
//           margin-bottom: 8px;
//         }

//         .partnerAmount {
//           font-size: 14px;
//           color: #16a34a;
//           font-weight: 600;
//         }

//         .status {
//           display: inline-block;
//           margin-top: 10px;
//           padding: 6px 16px;
//           border-radius: 999px;
//           font-size: 13px;
//           font-weight: 600;
//         }

//         .empty {
//           text-align: center;
//           color: #6b7280;
//           margin-top: 60px;
//           font-size: 16px;
//         }
//       `}</style>

//       <div className="page">
//         <div className="title">Partner Booking History</div>

//         {list.map(b => (
//           <div key={b.id} className="bookingCard">
//             <div className="left">
//               <h4>Booking #{b.id}</h4>
//               <p>Customer Name: {b.customerName}</p>
//               <p>Car Name: {b.carName}</p>
//               <p>From: {b.startDate} → To: {b.endDate}</p>
//             </div>

//             <div className="right">
//               <div className="amount">₹{b.totalAmount}</div>
//               <div className="partnerAmount">
//                 Partner Share (70%): ₹{Math.round(b.totalAmount * 0.7)}
//               </div>

//               <span className="status" style={statusColor[b.status]}>
//                 {b.status}
//               </span>
//             </div>
//           </div>
//         ))}

//         {list.length === 0 && (
//           <div className="empty">No bookings available</div>
//         )}
//       </div>
//     </>
//   );
// }

// const statusColor = {
//   APPROVED: { background: "#dcfce7", color: "#166534" },
//   REJECTED: { background: "#fee2e2", color: "#991b1b" },
//   PENDING: { background: "#e0e7ff", color: "#3730a3" },
//   "DOCUMENT-PENDING": { background: "#fef3c7", color: "#92400e" },
// };

import React, { useEffect, useState } from "react";

export default function PartnerBookingHistory() {
  const [list, setList] = useState([]);

  const fetchBookings = (partnerId) => {
    fetch(`http://localhost:8080/partner/allBookings/${partnerId}`)
      .then(res => res.json())
      .then(data => setList(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const partnerId = localStorage.getItem("userId");
    if (partnerId) fetchBookings(partnerId);
  }, []);

  return (
    <>
      <style>{`
        .page {
          min-height: 100vh;
          padding: 40px;
          background: linear-gradient(135deg,#020617,#0f172a);
          color: white;
        }

        h2 {
          font-size: 28px;
          margin-bottom: 30px;
        }

        .glass-table {
          width: 100%;
          border-collapse: collapse;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(14px);
          border-radius: 18px;
          overflow: hidden;
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
        }

        .center {
          text-align: center;
        }

        .amount {
          font-weight: 700;
        }

        .partner {
          color: #22c55e;
          font-weight: 600;
        }

        .status {
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
        }

        .empty {
          text-align: center;
          color: #cbd5f5;
          opacity: 0.8;
          margin-top: 60px;
        }

        @media(max-width:768px){
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
        <h2>Partner Booking History</h2>

        {list.length === 0 && (
          <p className="empty">No bookings available</p>
        )}

        {list.length > 0 && (
          <table className="glass-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Car</th>
                <th>Journey</th>
                <th className="right">Total</th>
                <th className="right">Partner Share</th>
                <th className="center">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map(b => (
                <tr key={b.id}>
                  <td>#{b.id}</td>
                  <td>{b.customerName}</td>
                  <td>{b.carName}</td>
                  <td>
                    {b.startDate}<br />
                    {b.endDate}
                  </td>
                  <td className="right amount">₹{b.totalAmount}</td>
                  <td className="right partner">
                    ₹{Math.round(b.totalAmount * 0.7)}
                  </td>
                  <td className="center">
                    <span className="status" style={statusColor[b.status]}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

const statusColor = {
  BOOKED: { background: "#22c55e", color: "#052e16" },
  "JOURNEY-END": { background: "#38bdf8", color: "#082f49" },
  CANCELLED: { background: "#ef4444", color: "#450a0a" },
  "PENDING-APPROVAL": { background: "#facc15", color: "#422006" },
};
