// import React, { useEffect, useState } from "react";

// export default function BookingHistory({ onMakePayment, onUploadDocs }) {
//   const [list, setList] = useState([]);

//   const fetchBookings = (userName) => {
//     fetch(`http://localhost:8080/user/bookings/${userName}`)
//       .then(res => res.json())
//       .then(data => setList(data))
//       .catch(err => console.log(err));
//   };

//   const cancelBooking = (id) => {
//     fetch(`http://localhost:8080/user/booking/cancel/${id}`, { method: "DELETE" })
//       .then(() => {
//         const userName = localStorage.getItem("username");
//         if (userName) fetchBookings(userName);
//       });
//   };

//   useEffect(() => {
//     const userName = localStorage.getItem("username");
//     if (userName) fetchBookings(userName);
//   }, []);

//   return (
//     <>
//       <style>{`
//         .page {
//           padding: 30px;
//           background: #f9fafb;
//           min-height: 100vh;
//         }

//         .title {
//           font-size: 28px;
//           font-weight: 600;
//           margin-bottom: 25px;
//         }

//         .bookingRow {
//           background: white;
//           padding: 18px 22px;
//           border-radius: 16px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 16px;
//           box-shadow: 0 8px 20px rgba(0,0,0,0.08);
//         }

//         .left h4 {
//           margin: 0;
//         }

//         .left p {
//           margin: 4px 0;
//           color: #6b7280;
//         }

//         .status {
//           padding: 6px 14px;
//           border-radius: 20px;
//           font-size: 13px;
//           font-weight: 600;
//         }

//         .actions button {
//           margin-left: 10px;
//           padding: 8px 14px;
//           border: none;
//           border-radius: 8px;
//           cursor: pointer;
//           color: white;
//         }

//         .cancel { background: #dc2626; }
//         .pay { background: #16a34a; }
//         .upload { background: #f59e0b; color: black; }
//       `}</style>

//       <div className="page">
//         <div className="title">My Bookings</div>

//         {list.map(b => (
//           <div key={b.id} className="bookingRow">
//             <div className="left">
//               <h4>Booking #{b.id}</h4>
//               <p>Total: ₹{b.totalAmount}</p>
//             </div>

//             <span className="status" style={statusColor[b.status]}>
//               {b.status}
//             </span>

//             <div className="actions">
//               {b.status !== "REJECTED" && b.status !== "CANCELLED" && (
//                 <button className="cancel" onClick={() => cancelBooking(b.id)}>
//                   Cancel
//                 </button>
//               )}

//               {b.status === "APPROVED" && (
//                 <button className="pay" onClick={() => onMakePayment(b.id)}>
//                   Pay
//                 </button>
//               )}

//               {b.status === "DOCUMENT-PENDING" && (
//                 <button className="upload" onClick={() => onUploadDocs(b.id)}>
//                   Upload Docs
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}

//         {list.length === 0 && (
//           <p style={{ textAlign: "center", color: "#6b7280" }}>
//             No bookings found
//           </p>
//         )}
//       </div>
//     </>
//   );
// }

// const statusColor = {
//   APPROVED: { background: "#dcfce7", color: "#166534" },
//   REJECTED: { background: "#fee2e2", color: "#991b1b" },
//   "DOCUMENT-PENDING": { background: "#fef3c7", color: "#92400e" },
//   PENDING: { background: "#e0e7ff", color: "#3730a3" }
// };

import React, { useEffect, useState } from "react";

export default function BookingHistory({ onMakePayment, onUploadDocs }) {
  const [list, setList] = useState([]);

  const fetchBookings = (userName) => {
    fetch(`http://localhost:8080/user/bookings/${userName}`)
      .then(res => res.json())
      .then(data => setList(data))
      .catch(err => console.log(err));
  };

  const cancelBooking = (id) => {
    fetch(`http://localhost:8080/user/booking/cancel/${id}`, { method: "DELETE" })
      .then(() => {
        const userName = localStorage.getItem("username");
        if (userName) fetchBookings(userName);
      });
  };

  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (userName) fetchBookings(userName);
  }, []);

  return (
    <>
      <style>{`
        body { margin: 0; }

        .history-page {
          min-height: 100vh;
          background: linear-gradient(135deg,#020617,#0f172a);
          padding: 50px;
          color: white;
        }

        .container {
          max-width: 1100px;
          margin: auto;
        }

        .title {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 35px;
        }

        .booking-row {
          display: grid;
          grid-template-columns: 1.2fr 0.6fr 1fr;
          align-items: center;
          padding: 22px 28px;
          border-radius: 22px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(18px);
          box-shadow: 0 18px 40px rgba(0,0,0,0.35);
          margin-bottom: 18px;
        }

        .booking-left h4 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
        }

        .booking-left p {
          margin-top: 6px;
          font-size: 14px;
          color: #9ca3af;
        }

        .status {
          justify-self: center;
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
          text-align: center;
          min-width: 140px;
        }

        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        .actions button {
          padding: 10px 18px;
          border-radius: 14px;
          border: none;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .cancel {
          background: #dc2626;
          color: white;
        }

        .pay {
          background: linear-gradient(135deg,#22c55e,#16a34a);
          color: white;
        }

        .upload {
          background: linear-gradient(135deg,#facc15,#f59e0b);
          color: #111827;
        }

        .empty {
          text-align: center;
          color: #9ca3af;
          margin-top: 60px;
          font-size: 16px;
        }

        @media(max-width: 900px) {
          .booking-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .status {
            justify-self: flex-start;
          }

          .actions {
            justify-content: flex-start;
            flex-wrap: wrap;
          }
        }
      `}</style>

      <div className="history-page">
        <div className="container">
          <div className="title">My Bookings</div>

          {list.map(b => (
            <div key={b.id} className="booking-row">
              <div className="booking-left">
                <h4>Booking #{b.id}</h4>
                <p>Total Amount: ₹{b.totalAmount}</p>
              </div>

              <span className="status" style={statusColor[b.status]}>
                {b.status}
              </span>

              <div className="actions">
                {b.status !== "REJECTED" && b.status !== "CANCELLED" && (
                  <button className="cancel" onClick={() => cancelBooking(b.id)}>
                    Cancel
                  </button>
                )}

                {b.status === "APPROVED" && (
                  <button className="pay" onClick={() => onMakePayment(b.id)}>
                    Pay
                  </button>
                )}

                {b.status === "DOCUMENT-PENDING" && (
                  <button className="upload" onClick={() => onUploadDocs(b.id)}>
                    Upload Docs
                  </button>
                )}
              </div>
            </div>
          ))}

          {list.length === 0 && (
            <div className="empty">No bookings found</div>
          )}
        </div>
      </div>
    </>
  );
}

const statusColor = {
  APPROVED: { background: "#166534", color: "#dcfce7" },
  REJECTED: { background: "#991b1b", color: "#fee2e2" },
  "DOCUMENT-PENDING": { background: "#92400e", color: "#fef3c7" },
  PENDING: { background: "#3730a3", color: "#e0e7ff" }
};
