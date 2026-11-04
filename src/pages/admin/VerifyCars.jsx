// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function VerifyCars() {
//   const [cars, setCars] = useState([]);
//   const token = localStorage.getItem("token");

//   const loadCars = () => {
//     axios
//       .get("http://localhost:8080/admin/getAddedCar", {
//         headers: { Authorization: token }
//       })
//       .then(res => setCars(res.data))
//       .catch(err => console.error(err));
//   };

//   useEffect(() => {
//     loadCars();
//   }, []);

//   const approveCar = (id) => {
//     axios
//       .put(`http://localhost:8080/admin/addCarToSystem/${id}`, {}, {
//         headers: { Authorization: token }
//       })
//       .then(() => {
//         alert("Car approved");
//         loadCars();
//       })
//       .catch(() => alert("Approve failed"));
//   };

//   const rejectCar = (id) => {
//     axios
//       .put(`http://localhost:8080/admin/rejectCarFromSystem/${id}`, {}, {
//         headers: { Authorization: token }
//       })
//       .then(() => {
//         alert("Car rejected");
//         loadCars();
//       })
//       .catch(() => alert("Reject failed"));
//   };

//   const downloadDocs = (id) => {
//     window.open(
//       `http://localhost:8080/admin/car/${id}/download-docs`,
//       "_blank"
//     );
//   };

//   return (
//     <div style={styles.page}>
//       <h2 style={styles.title}>🚘 Car Verification</h2>

//       <div style={styles.grid}>
//         {cars.map(car => (
//           <div key={car.id} style={styles.card}>
//             <img
//               src={car.imageUrl}
//               alt={car.carName}
//               style={styles.image}
//             />

//             <h3>{car.carName}</h3>
//             <p><b>Brand:</b> {car.brand}</p>
//             <p><b>City:</b> {car.city}</p>
//             <p><b>Type:</b> {car.vehicalType}</p>
//             <p><b>Seats:</b> {car.seats}</p>
//             <p><b>Year:</b> {car.modelYear}</p>
//             <p><b>Price:</b> ₹{car.pricePerDay}/day</p>

//             <p style={{
//               color:
//                 car.verificationStatus === "APPROVED" ? "green" :
//                 car.verificationStatus === "REJECTED" ? "red" : "orange"
//             }}>
//               <b>Status:</b> {car.verificationStatus || "PENDING"}
//             </p>

//             <div style={styles.actions}>
//               <button
//                 style={styles.downloadBtn}
//                 onClick={() => downloadDocs(car.id)}
//               >
//                 Download Docs
//               </button>

//               <button
//                 style={styles.approveBtn}
//                 onClick={() => approveCar(car.id)}
//                 disabled={car.verificationStatus === "APPROVED"}
//               >
//                 Approve
//               </button>

//               <button
//                 style={styles.rejectBtn}
//                 onClick={() => rejectCar(car.id)}
//                 disabled={car.verificationStatus === "REJECTED"}
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ===================== STYLES ===================== */

// const styles = {
//   page: {
//     padding: 20,
//     background: "#f4f6fb",
//     minHeight: "100vh"
//   },
//   title: {
//     textAlign: "center",
//     marginBottom: 25
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//     gap: 20
//   },
//   card: {
//     background: "#fff",
//     padding: 16,
//     borderRadius: 14,
//     boxShadow: "0 4px 14px rgba(0,0,0,0.1)"
//   },
//   image: {
//     width: "100%",
//     height: 170,
//     objectFit: "cover",
//     borderRadius: 10,
//     marginBottom: 10
//   },
//   actions: {
//     display: "flex",
//     gap: 10,
//     marginTop: 12,
//     flexWrap: "wrap"
//   },
//   downloadBtn: {
//     flex: 1,
//     padding: 8,
//     background: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: 8,
//     cursor: "pointer"
//   },
//   approveBtn: {
//     flex: 1,
//     padding: 8,
//     background: "#28a745",
//     color: "#fff",
//     border: "none",
//     borderRadius: 8,
//     cursor: "pointer"
//   },
//   rejectBtn: {
//     flex: 1,
//     padding: 8,
//     background: "#dc3545",
//     color: "#fff",
//     border: "none",
//     borderRadius: 8,
//     cursor: "pointer"
//   }
// };

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function VerifyCars() {
  const [cars, setCars] = useState([]);
  const token = localStorage.getItem("token");

  const loadCars = () => {
    axios
      .get("http://localhost:8080/admin/getAddedCar", {
        headers: { Authorization: token }
      })
      .then(res => setCars(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadCars();
  }, []);

  const approveCar = (id) => {
    axios
      .put(`http://localhost:8080/admin/addCarToSystem/${id}`, {}, {
        headers: { Authorization: token }
      })
      .then(() => loadCars());
  };

  const rejectCar = (id) => {
    axios
      .put(`http://localhost:8080/admin/rejectCarFromSystem/${id}`, {}, {
        headers: { Authorization: token }
      })
      .then(() => loadCars());
  };

  const downloadDocs = (id) => {
    window.open(
      `http://localhost:8080/admin/car/${id}/download-docs`,
      "_blank"
    );
  };

  return (
    <>
      <style>{`
        .page {
          min-height: 100vh;
          background: linear-gradient(135deg,#020617,#0f172a);
          padding: 40px;
          color: white;
        }

        h2 {
          margin-bottom: 30px;
        }

        .row {
          display: grid;
          grid-template-columns: 120px 2fr 1fr 1fr 1fr 2fr;
          gap: 16px;
          padding: 18px;
          margin-bottom: 14px;
          border-radius: 18px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          align-items: center;
        }

        .image {
          width: 100%;
          height: 80px;
          object-fit: cover;
          border-radius: 14px;
        }

        .main {
          font-weight: 600;
        }

        .sub {
          font-size: 13px;
          color: #9ca3af;
        }

        .status {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-align: center;
        }

        .pending {
          background: #facc15;
          color: #1f2933;
        }

        .approved {
          background: #22c55e;
          color: #052e16;
        }

        .rejected {
          background: #ef4444;
        }

        .actions {
          display: flex;
          gap: 10px;
        }

        .actions button {
          padding: 10px 14px;
          border-radius: 12px;
          border: none;
          font-weight: 600;
          cursor: pointer;
        }

        .download {
          background: #0ea5e9;
        }

        .approve {
          background: #22c55e;
        }

        .reject {
          background: #ef4444;
        }

        button:disabled {
          background: #64748b;
          cursor: not-allowed;
        }

        @media(max-width:900px) {
          .row {
            grid-template-columns: 1fr;
          }
          .actions {
            justify-content: space-between;
          }
        }
      `}</style>

      <div className="page">
        <h2>Car Verification</h2>

        {cars.map(car => (
          <div className="row" key={car.id}>
            <img src={car.imageUrl} className="image" alt={car.carName} />

            <div>
              <div className="main">{car.carName}</div>
              <div className="sub">{car.brand} • {car.vehicalType}</div>
            </div>

            <div>
              <div className="sub">City</div>
              <div className="main">{car.city}</div>
            </div>

            <div>
              <div className="sub">Seats</div>
              <div className="main">{car.seats}</div>
            </div>

            <div>
              <div className="sub">₹ / Day</div>
              <div className="main">₹{car.pricePerDay}</div>
            </div>

            <div className={`status ${
              car.verificationStatus === "APPROVED"
                ? "approved"
                : car.verificationStatus === "REJECTED"
                ? "rejected"
                : "pending"
            }`}>
              {car.verificationStatus || "PENDING"}
            </div>

            <div className="actions">
              <button
                className="download"
                onClick={() => downloadDocs(car.id)}
              >
                Docs
              </button>

              <button
                className="approve"
                disabled={car.verificationStatus === "APPROVED"}
                onClick={() => approveCar(car.id)}
              >
                Approve
              </button>

              <button
                className="reject"
                disabled={car.verificationStatus === "REJECTED"}
                onClick={() => rejectCar(car.id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
