
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function ManageCars() {
//   const [cars, setCars] = useState([]);
//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   const [form, setForm] = useState({
//     carName: "",
//     brand: "",
//     fuelType: "",
//     transmission: "",
//     seats: "",
//     pricePerDay: "",
//     modelYear: "",
//     imageUrl: "",
//     city: "",
//     vehicalType: ""
//   });

//   const [formDocs, setFormDocs] = useState({
//     identityCard: null,
//     insurance: null,
//     puc: null
//   });

//   const loadCars = () => {
//     axios
//       .get(`http://localhost:8080/partner/cars/${userId}`, {
//         headers: { Authorization: token }
//       })
//       .then(res => setCars(res.data));
//   };

//   useEffect(() => loadCars(), []);

//   const saveCar = () => {
//     if (!formDocs.identityCard || !formDocs.insurance || !formDocs.puc) {
//       alert("Please upload all 3 documents");
//       return;
//     }

//     const formData = new FormData();

//     formData.append(
//       "car",
//       new Blob([JSON.stringify({ ...form, userId })], {
//         type: "application/json"
//       })
//     );

//     formData.append("identityCard", formDocs.identityCard);
//     formData.append("insurance", formDocs.insurance);
//     formData.append("puc", formDocs.puc);

//     axios.post("http://localhost:8080/partner/addCar", formData, {
//       headers: {
//         Authorization: token,
//         "Content-Type": "multipart/form-data"
//       }
//     })
//     .then(() => {
//       alert("Car added successfully");
//       loadCars();
//     })
//     .catch(() => alert("Add car failed"));
//   };

//   return (
//     <div style={styles.page}>
//       <h2 style={styles.title}>🚗 Manage Cars</h2>

//       {/* ADD CAR FORM */}
//       <div style={styles.form}>
//         <input style={styles.input} placeholder="Car Name"
//           onChange={e => setForm({ ...form, carName: e.target.value })} />

//         <input style={styles.input} placeholder="Brand"
//           onChange={e => setForm({ ...form, brand: e.target.value })} />

//         <input style={styles.input} placeholder="Fuel Type"
//           onChange={e => setForm({ ...form, fuelType: e.target.value })} />

//         <input style={styles.input} placeholder="Transmission"
//           onChange={e => setForm({ ...form, transmission: e.target.value })} />

//         <input style={styles.input} type="number" placeholder="Seats"
//           onChange={e => setForm({ ...form, seats: e.target.value })} />

//         <input style={styles.input} type="number" placeholder="Price / Day"
//           onChange={e => setForm({ ...form, pricePerDay: e.target.value })} />

//         <input style={styles.input} type="number" placeholder="Model Year"
//           onChange={e => setForm({ ...form, modelYear: e.target.value })} />

//         <input style={styles.input} placeholder="Image URL"
//           onChange={e => setForm({ ...form, imageUrl: e.target.value })} />

//         <select style={styles.input}
//           onChange={e => setForm({ ...form, vehicalType: e.target.value })}>
//           <option value="">Vehicle Type</option>
//           <option>Sedan</option>
//           <option>SUV</option>
//           <option>Hatchback</option>
//         </select>

//         <select style={styles.input}
//           onChange={e => setForm({ ...form, city: e.target.value })}>
//           <option value="">City</option>
//           <option>Pune</option>
//           <option>Mumbai</option>
//           <option>Nagpur</option>
//         </select>

//         {/* DOCUMENTS */}
//        {/* IDENTITY CARD */}
// <label style={styles.fileLabel}>
//   <span style={styles.fileText}>
//     {formDocs.identityCard ? formDocs.identityCard.name : "Upload Identity Card (JPG)"}
//   </span>
//   <input
//     type="file"
//     accept="image/jpeg"
//     style={styles.hiddenFile}
//     onChange={e =>
//       setFormDocs({ ...formDocs, identityCard: e.target.files[0] })
//     }
//   />
// </label>

// {/* INSURANCE */}
// <label style={styles.fileLabel}>
//   <span style={styles.fileText}>
//     {formDocs.insurance ? formDocs.insurance.name : "Upload Insurance (JPG)"}
//   </span>
//   <input
//     type="file"
//     accept="image/jpeg"
//     style={styles.hiddenFile}
//     onChange={e =>
//       setFormDocs({ ...formDocs, insurance: e.target.files[0] })
//     }
//   />
// </label>

// {/* PUC */}
// <label style={styles.fileLabel}>
//   <span style={styles.fileText}>
//     {formDocs.puc ? formDocs.puc.name : "Upload PUC (JPG)"}
//   </span>
//   <input
//     type="file"
//     accept="image/jpeg"
//     style={styles.hiddenFile}
//     onChange={e =>
//       setFormDocs({ ...formDocs, puc: e.target.files[0] })
//     }
//   />
// </label>

//         <button style={styles.addBtn} onClick={saveCar}>
//           Add Car
//         </button>
//       </div>

//       {/* CAR LIST */}
//       <div style={styles.grid}>
//   {cars.map(c => (
//     <div key={c.id} style={styles.card}>
//       <img src={c.imageUrl} alt={c.carName} style={styles.image} />

//       <h3>{c.carName}</h3>
//       <p>Brand:{c.brand}</p>
//       <p>Price/Day : ₹ {c.pricePerDay} / day</p>
//       <p>City: {c.city}</p>

//       {/* STATUS MESSAGE */}
//       {c.verificationStatus === "APPROVED" && (
//         <p style={styles.approved}>
//           ✔ Car added to system
//         </p>
//       )}

//       {c.verificationStatus === "REJECTED" && (
//         <p style={styles.rejected}>
//           ✖ Car is not verified hence Rejected
//         </p>
//       )}

//       {!c.verificationStatus && (
//         <p style={styles.pending}>
//           ⏳ Pending verification
//         </p>
//       )}
//     </div>
//   ))}
// </div>
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
//     marginBottom: 20
//   },
//   form: {
//     background: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: 12,
//     boxShadow: "0 6px 16px rgba(0,0,0,0.1)"
//   },
//   input: {
//     padding: 10,
//     borderRadius: 8,
//     border: "1px solid #ccc"
//   },
//   file: {
//     padding: 6
//   },
//   addBtn: {
//     gridColumn: "1 / -1",
//     padding: 12,
//     background: "#28a745",
//     color: "#fff",
//     border: "none",
//     borderRadius: 10,
//     cursor: "pointer",
//     fontSize: 16
//   },
//   grid: {
//     marginTop: 30,
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
//     gap: 20
//   },
//   card: {
//     background: "#fff",
//     padding: 15,
//     borderRadius: 12,
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
//   },
//   image: {
//     width: "100%",
//     height: 160,
//     objectFit: "cover",
//     borderRadius: 10,
//     marginBottom: 10
//   }
// ,
//   fileLabel: {
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   padding: "10px 14px",
//   border: "2px dashed #bbb",
//   borderRadius: 10,
//   cursor: "pointer",
//   backgroundColor: "#fafafa",
//   transition: "0.2s",
//   fontSize: 14
// },
// fileText: {
//   color: "#555",
//   whiteSpace: "nowrap",
//   overflow: "hidden",
//   textOverflow: "ellipsis",
//   maxWidth: "90%"
// },
// hiddenFile: {
//   display: "none"
// },
// approved: {
//   color: "#28a745",
//   fontWeight: "bold",
//   marginTop: 8
// },
// rejected: {
//   color: "#dc3545",
//   fontWeight: "bold",
//   marginTop: 8
// },
// pending: {
//   color: "#ff9800",
//   fontWeight: "bold",
//   marginTop: 8
// }
// };

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManageCars() {
  const [cars, setCars] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    carName: "",
    brand: "",
    fuelType: "",
    transmission: "",
    seats: "",
    pricePerDay: "",
    modelYear: "",
    imageUrl: "",
    city: "",
    vehicalType: ""
  });

  const [formDocs, setFormDocs] = useState({
    identityCard: null,
    insurance: null,
    puc: null
  });

  const loadCars = () => {
    axios
      .get(`http://localhost:8080/partner/cars/${userId}`, {
        headers: { Authorization: token }
      })
      .then(res => setCars(res.data));
  };

  useEffect(() => loadCars(), []);

  const saveCar = () => {
    if (!formDocs.identityCard || !formDocs.insurance || !formDocs.puc) {
      alert("Upload all documents");
      return;
    }

    const formData = new FormData();
    formData.append(
      "car",
      new Blob([JSON.stringify({ ...form, userId })], {
        type: "application/json"
      })
    );
    formData.append("identityCard", formDocs.identityCard);
    formData.append("insurance", formDocs.insurance);
    formData.append("puc", formDocs.puc);

    axios
      .post("http://localhost:8080/partner/addCar", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {
        alert("Car submitted for verification");
        loadCars();
      });
  };

  return (
    <>
      <style>{`
        body { margin: 0; }

        .manage-page {
          min-height: 100vh;
          background: linear-gradient(135deg,#020617,#0f172a);
          padding: 50px;
          color: white;
        }

        h1 {
          font-size: 28px;
          margin-bottom: 30px;
        }

        .glass {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(16px);
          border-radius: 24px;
          padding: 30px;
          margin-bottom: 40px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(240px,1fr));
          gap: 18px;
        }

        .input, .select {
          padding: 14px;
          border-radius: 16px;
          border: none;
          background: rgba(255,255,255,0.08);
          color: white;
          font-size: 14px;
          outline: none;
        }

        .file {
          border: 2px dashed rgba(255,255,255,0.3);
          padding: 16px;
          border-radius: 16px;
          text-align: center;
          cursor: pointer;
        }

        .file span {
          font-size: 13px;
          color: #c7d2fe;
        }

        .submit {
          grid-column: 1 / -1;
          padding: 18px;
          border-radius: 20px;
          border: none;
          background: #22c55e;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          font-size: 14px;
        }

        th {
          text-align: left;
          color: #e5e7eb;
          font-size: 13px;
        }

        tr:hover {
          background: rgba(255,255,255,0.05);
        }

        .approved { color: #22c55e; font-weight: 600; }
        .pending { color: #facc15; font-weight: 600; }
        .rejected { color: #ef4444; font-weight: 600; }

        @media(max-width:900px){
          .manage-page { padding: 20px; }
        }
      `}</style>

      <div className="manage-page">
        <h1>Manage Cars</h1>

        {/* ADD CAR */}
        <div className="glass">
          <h2>Add New Car</h2>

          <div className="form-grid">
            <input className="input" placeholder="Car Name" onChange={e => setForm({ ...form, carName: e.target.value })} />
            <input className="input" placeholder="Brand" onChange={e => setForm({ ...form, brand: e.target.value })} />
            <input className="input" placeholder="Fuel Type" onChange={e => setForm({ ...form, fuelType: e.target.value })} />
            <input className="input" placeholder="Transmission" onChange={e => setForm({ ...form, transmission: e.target.value })} />
            <input className="input" type="number" placeholder="Seats" onChange={e => setForm({ ...form, seats: e.target.value })} />
            <input className="input" type="number" placeholder="Price / Day" onChange={e => setForm({ ...form, pricePerDay: e.target.value })} />
            <input className="input" type="number" placeholder="Model Year" onChange={e => setForm({ ...form, modelYear: e.target.value })} />
            <input className="input" placeholder="Image URL" onChange={e => setForm({ ...form, imageUrl: e.target.value })} />

            <select className="select" onChange={e => setForm({ ...form, vehicalType: e.target.value })}>
              <option value="">Vehicle Type</option>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Hatchback</option>
            </select>

            <select className="select" onChange={e => setForm({ ...form, city: e.target.value })}>
              <option value="">City</option>
              <option>Pune</option>
              <option>Mumbai</option>
              <option>Nagpur</option>
            </select>

            {["identityCard","insurance","puc"].map(doc => (
              <label key={doc} className="file">
                <span>{formDocs[doc]?.name || `Upload ${doc}`}</span>
                <input hidden type="file" accept="image/jpeg"
                  onChange={e => setFormDocs({ ...formDocs, [doc]: e.target.files[0] })}/>
              </label>
            ))}

            <button className="submit" onClick={saveCar}>
              Submit Car for Verification →
            </button>
          </div>
        </div>

        {/* CAR LIST */}
        <div className="glass">
          <h2>Your Submitted Cars</h2>

          <table>
            <thead>
              <tr>
                <th>Car</th>
                <th>City</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cars.map(c => (
                <tr key={c.id}>
                  <td>{c.carName} ({c.brand})</td>
                  <td>{c.city}</td>
                  <td>₹ {c.pricePerDay} / day</td>
                  <td>
                    {c.verificationStatus === "APPROVED" && <span className="approved">Approved</span>}
                    {c.verificationStatus === "REJECTED" && <span className="rejected">Rejected</span>}
                    {!c.verificationStatus && <span className="pending">Pending</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
