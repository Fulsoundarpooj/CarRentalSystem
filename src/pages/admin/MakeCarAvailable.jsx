// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function MakeCarAvailable() {
//   const [list, setList] = useState([]);

//   /* ================= LOAD SUBMITTED CARS ================= */
//   const loadSubmittedCars = () => {
//     axios
//       .get("http://localhost:8080/admin/getSubmitedCar")
//       .then(res => setList(res.data))
//       .catch(err => console.error(err));
//   };

//   useEffect(() => {
//     loadSubmittedCars();
//   }, []);

//   /* ================= MAKE AVAILABLE ================= */
//   const makeAvailable = (bookingId) => {
//     axios
//       .put(`http://localhost:8080/admin/makeCarAvailable/${bookingId}`)
//       .then(() => {
//         alert("Car marked as available ✅");
//         loadSubmittedCars(); // refresh list
//       })
//       .catch(() => alert("Failed to make car available ❌"));
//   };

//   /* ================= GROUP BY CITY ================= */
//   const groupedByCity = list.reduce((acc, booking) => {
//     acc[booking.city] = acc[booking.city] || [];
//     acc[booking.city].push(booking);
//     return acc;
//   }, {});

//   /* ================= UI ================= */
//   return (
//     <div style={styles.page}>
//       <h2 style={styles.title}>Make Car Available</h2>

//       {Object.keys(groupedByCity).length === 0 && (
//         <p style={styles.empty}>No submitted cars found.</p>
//       )}

//       {Object.entries(groupedByCity).map(([city, bookings]) => (
//         <section key={city} style={styles.section}>
//           <h3 style={styles.cityTitle}>{city}</h3>

//           <div style={styles.grid}>
//             {bookings.map(b => (
//               <div key={b.id} style={styles.card}>
//                 <div style={styles.header}>
//                   <span style={styles.bookingId}>
//                     Booking #{b.id}
//                   </span>
//                   <span style={styles.badge}>SUBMITTED</span>
//                 </div>

//                 <p><strong>Car:</strong> {b.carName}</p>
//                 <p><strong>Customer:</strong> {b.customerName}</p>

//                 <p style={styles.date}>
//                   <strong>From:</strong> {b.startDate} <br />
//                   <strong>To:</strong> {b.endDate}
//                 </p>

//                 <button
//                   style={styles.makeAvailableBtn}
//                   onClick={() => makeAvailable(b.id)}
//                 >
//                   Make Car Available
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// }

// /* ================= STYLES ================= */

// const styles = {
//   page: {
//     padding: "30px",
//     background: "#f4f6f9",
//     minHeight: "100vh"
//   },
//   title: {
//     fontSize: "26px",
//     marginBottom: "30px",
//     color: "#111827"
//   },
//   section: {
//     marginBottom: "40px"
//   },
//   cityTitle: {
//     marginBottom: "15px",
//     color: "#1e40af"
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
//     gap: "20px"
//   },
//   card: {
//     background: "#fff",
//     borderRadius: "16px",
//     padding: "18px",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: "10px"
//   },
//   bookingId: {
//     fontWeight: "600"
//   },
//   badge: {
//     background: "#fef3c7",
//     color: "#92400e",
//     padding: "4px 10px",
//     borderRadius: "20px",
//     fontSize: "12px",
//     fontWeight: "600"
//   },
//   date: {
//     fontSize: "14px",
//     color: "#4b5563"
//   },
//   makeAvailableBtn: {
//     marginTop: "15px",
//     width: "100%",
//     padding: "12px",
//     borderRadius: "12px",
//     border: "none",
//     background: "#16a34a",
//     color: "#fff",
//     fontSize: "16px",
//     fontWeight: "600",
//     cursor: "pointer"
//   },
//   empty: {
//     textAlign: "center",
//     color: "#6b7280",
//     fontStyle: "italic"
//   }
// };

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MakeCarAvailable() {
  const [list, setList] = useState([]);

  /* ================= LOAD SUBMITTED CARS ================= */
  const loadSubmittedCars = () => {
    axios
      .get("http://localhost:8080/admin/getSubmitedCar")
      .then(res => setList(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadSubmittedCars();
  }, []);

  /* ================= MAKE AVAILABLE ================= */
  const makeAvailable = (bookingId) => {
    axios
      .put(`http://localhost:8080/admin/makeCarAvailable/${bookingId}`)
      .then(() => {
        alert("Car marked as available ✅");
        loadSubmittedCars();
      })
      .catch(() => alert("Failed to make car available ❌"));
  };

  /* ================= DOWNLOAD CAR PICS ================= */
  const downloadCarPics = (bookingId) => {
    axios({
      url: `http://localhost:8080/admin/downloadForCarPic/all/${bookingId}`,
      method: "GET",
      responseType: "blob"
    })
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `car-pics-booking-${bookingId}.zip`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(() => alert("Failed to download car pics ❌"));
  };

  /* ================= GROUP BY CITY ================= */
  const groupedByCity = list.reduce((acc, booking) => {
    acc[booking.city] = acc[booking.city] || [];
    acc[booking.city].push(booking);
    return acc;
  }, {});

  return (
    <>
      <style>{`
        .make-available-page {
          min-height: 100vh;
          padding: 40px;
          background: linear-gradient(135deg,#020617,#0f172a);
          color: white;
        }

        h2 {
          font-size: 28px;
          margin-bottom: 30px;
        }

        .city-section {
          margin-bottom: 50px;
        }

        .city-title {
          font-size: 20px;
          margin-bottom: 14px;
          color: #c7d2fe;
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

        .badge {
          padding: 4px 12px;
          border-radius: 20px;
          background: rgba(251,191,36,0.15);
          color: #fde68a;
          font-size: 12px;
          font-weight: 600;
        }

        .actions {
          display: flex;
          gap: 10px;
        }

        .btn-download {
          padding: 8px 14px;
          border-radius: 10px;
          border: none;
          background: #2563eb;
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-available {
          padding: 8px 14px;
          border-radius: 10px;
          border: none;
          background: #16a34a;
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .empty {
          text-align: center;
          color: #cbd5f5;
          opacity: 0.8;
        }

        @media(max-width:768px){
          .make-available-page {
            padding: 20px;
          }
          .glass-table th,
          .glass-table td {
            padding: 12px;
            font-size: 13px;
          }
        }
      `}</style>

      <div className="make-available-page">
        <h2>Make Car Available</h2>

        {Object.keys(groupedByCity).length === 0 && (
          <p className="empty">No submitted cars found.</p>
        )}

        {Object.entries(groupedByCity).map(([city, bookings]) => (
          <div key={city} className="city-section">
            <div className="city-title">{city}</div>

            <table className="glass-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Car</th>
                  <th>Customer</th>
                  <th>Journey</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id}>
                    <td>#{b.id}</td>
                    <td>{b.carName}</td>
                    <td>{b.customerName}</td>
                    <td>
                      {b.startDate}<br />{b.endDate}
                    </td>
                    <td>
                      <span className="badge">SUBMITTED</span>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn-download"
                          onClick={() => downloadCarPics(b.id)}
                        >
                          Download Pics
                        </button>
                        <button
                          className="btn-available"
                          onClick={() => makeAvailable(b.id)}
                        >
                          Make Available
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}
