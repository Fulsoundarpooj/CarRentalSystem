// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function ManageCars() {
//   const [cars, setCars] = useState([]);
//   const [form, setForm] = useState({
//     carName: "",
//     brand: "",
//     pricePerDay: 0,
//     available: true,
//     fuelType: "",
//     transmission: "",
//     seats: 0,
//     modelYear: 0,
//     rating: 0,
//     imageUrl: "",
//     features: "",
//     city: "",
//     vehicalType: ""
//   });

//   const token = localStorage.getItem("token");

//   const loadCars = () => {
//     axios
//       .get("http://localhost:8080/user/cars", {
//         headers: { Authorization: token }
//       })
//       .then((res) => setCars(res.data))
//       .catch((err) => console.log("Load Cars Error", err));
//   };

//   useEffect(() => loadCars(), []);

//   const saveCar = () => {
//     axios
//       .post("http://localhost:8080/admin/addCar", form, {
//         headers: { Authorization: token }
//       })
//       .then(() => {
//         alert("Car Added");
//         loadCars();
//         setForm({
//         carName: "",
//         brand: "",
//         pricePerDay: 0,
//         available: true,
//         fuelType: "",
//         transmission: "",
//         seats: 0,
//         modelYear: 0,
//         rating: 0,
//         imageUrl: "",
//         features: "",
//         city: "",
//         vehicalType: ""
//       });
//       })
//       .catch((err) => console.log("Add Car Error", err));
//   };

//   const deleteCar = (id) => {
//     axios
//       .delete(`http://localhost:8080/admin/deleteCar/${id}`, {
//         headers: { Authorization: token }
//       })
//       .then(() => loadCars())
//       .catch((err) => console.log("Delete Error", err));
//   };

//   return (
//     <div style={styles.page}>
//       <h2 style={styles.title}>Manage Cars</h2>

//       {/* Form Section */}
//       <div style={styles.formSection}>

//         <input style={styles.input} placeholder="Car Name"
//           onChange={(e) => setForm({ ...form, carName: e.target.value })}
//         />

//         <input style={styles.input} placeholder="Brand"
//           onChange={(e) => setForm({ ...form, brand: e.target.value })}
//         />

//         <input style={styles.input} placeholder="Fuel Type"
//           onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
//         />

//         <input style={styles.input} placeholder="Transmission"
//           onChange={(e) => setForm({ ...form, transmission: e.target.value })}
//         />

//         <input style={styles.input} type="number" placeholder="Seats"
//           onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })}
//         />

//         <input style={styles.input} type="number" placeholder="Price Per Day"
//           onChange={(e) => setForm({ ...form, pricePerDay: Number(e.target.value) })}
//         />

//         <input style={styles.input} placeholder="Image URL"
//           onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
//         />

//         {/* NEW FIELD – VEHICLE TYPE */}
//         <select
//           style={styles.input}
//           onChange={(e) => setForm({ ...form, vehicalType: e.target.value })}
//         >
//           <option value="">Select Vehicle Type</option>
//           <option value="Sedan">Sedan</option>
//           <option value="SUV">SUV</option>
//           <option value="Hatchback">Hatchback</option>
//         </select>

//         {/* NEW FIELD – CITY */}
//         <select
//           style={styles.input}
//           onChange={(e) => setForm({ ...form, city: e.target.value })}
//         >
//           <option value="">Select City</option>
//           <option value="Pune">Pune</option>
//           <option value="Mumbai">Mumbai</option>
//           <option value="Nagpur">Nagpur</option>
//         </select>

//         <button style={styles.addButton} onClick={saveCar}>Add Car</button>
//       </div>

//       {/* Card Grid */}
//       <div style={styles.grid}>
//         {cars.map((c) => (
//           <div key={c.id} style={styles.card}>
//             <img src={c.imageUrl} alt={c.carName} style={styles.cardImage} />

//             <h3 style={styles.carName}>{c.carName}</h3>
//             <p style={styles.brand}>{c.brand}</p>
//             <p style={styles.brand}>Type: {c.vehicleType}</p>
//             <p style={styles.brand}>City: {c.city}</p>

//             <p style={styles.price}>₹{c.pricePerDay}</p>

//             <button
//               onClick={() => deleteCar(c.id)}
//               style={styles.deleteBtn}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ---------------- INLINE CSS ------------------- */

// const styles = {
//   page: {
//     padding: "20px",
//     backgroundColor: "#f7f3f8",
//     minHeight: "100vh"
//   },
//   title: {
//     textAlign: "center",
//     marginBottom: "20px",
//     fontSize: "28px",
//     fontWeight: "bold"
//   },
//   formSection: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: "10px",
//     marginBottom: "30px"
//   },
//   input: {
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     fontSize: "15px"
//   },
//   addButton: {
//     gridColumn: "1 / -1",
//     padding: "12px",
//     backgroundColor: "#28a745",
//     color: "white",
//     borderRadius: "10px",
//     fontWeight: "bold",
//     border: "none",
//     cursor: "pointer"
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
//     gap: "25px"
//   },
//   card: {
//     background: "white",
//     padding: "15px",
//     borderRadius: "15px",
//     textAlign: "center",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
//   },
//   cardImage: {
//     width: "100%",
//     height: "170px",
//     objectFit: "cover",
//     borderRadius: "12px"
//   },
//   carName: {
//     fontSize: "20px",
//     fontWeight: "bold",
//     marginTop: "10px"
//   },
//   brand: {
//     color: "#666"
//   },
//   price: {
//     fontSize: "18px",
//     fontWeight: "bold",
//     marginTop: "8px"
//   },
//   deleteBtn: {
//     padding: "8px",
//     backgroundColor: "red",
//     color: "white",
//     borderRadius: "8px",
//     border: "none",
//     width: "100%",
//     marginTop: "10px",
//     cursor: "pointer"
//   }
// };

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function ManageCars() {
//   const [cars, setCars] = useState([]);
//   const [form, setForm] = useState({
//     carName: "",
//     brand: "",
//     pricePerDay: 0,
//     available: true,
//     fuelType: "",
//     transmission: "",
//     seats: 0,
//     modelYear: 0,
//     rating: 0,
//     imageUrl: "",
//     features: "",
//     city: "",
//     vehicalType: ""
//   });

//   const token = localStorage.getItem("token");

//   const loadCars = () => {
//     axios
//       .get("http://localhost:8080/user/cars", {
//         headers: { Authorization: token }
//       })
//       .then((res) => setCars(res.data))
//       .catch((err) => console.log("Load Cars Error", err));
//   };

//   useEffect(() => loadCars(), []);

//   const saveCar = () => {
//     axios
//       .post("http://localhost:8080/admin/addCar", form, {
//         headers: { Authorization: token }
//       })
//       .then(() => {
//         alert("Car Added");
//         loadCars();
//         setForm({
//           carName: "",
//           brand: "",
//           pricePerDay: 0,
//           available: true,
//           fuelType: "",
//           transmission: "",
//           seats: 0,
//           modelYear: 0,
//           rating: 0,
//           imageUrl: "",
//           features: "",
//           city: "",
//           vehicalType: ""
//         });
//       })
//       .catch((err) => console.log("Add Car Error", err));
//   };

//   const deleteCar = (id) => {
//     axios
//       .delete(`http://localhost:8080/admin/deleteCar/${id}`, {
//         headers: { Authorization: token }
//       })
//       .then(() => loadCars())
//       .catch((err) => console.log("Delete Error", err));
//   };

//   return (
//     <div style={styles.page}>
//       <h2 style={styles.title}>Manage Cars</h2>

//       {/* Form Section */}
//       <div style={styles.formSection}>
//         <input
//           style={styles.input}
//           placeholder="Car Name"
//           value={form.carName}
//           onChange={(e) => setForm({ ...form, carName: e.target.value })}
//         />

//         <input
//           style={styles.input}
//           placeholder="Brand"
//           value={form.brand}
//           onChange={(e) => setForm({ ...form, brand: e.target.value })}
//         />

//         <input
//           style={styles.input}
//           placeholder="Fuel Type"
//           value={form.fuelType}
//           onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
//         />

//         <input
//           style={styles.input}
//           placeholder="Transmission"
//           value={form.transmission}
//           onChange={(e) => setForm({ ...form, transmission: e.target.value })}
//         />

//         {/* FIXED — Shows empty input instead of 0 */}
//         <input
//           style={styles.input}
//           type="number"
//           placeholder="Seats"
//           value={form.seats === 0 ? "" : form.seats}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               seats: e.target.value === "" ? 0 : Number(e.target.value)
//             })
//           }
//         />

//         {/* FIXED — Shows empty input instead of 0 */}
//         <input
//           style={styles.input}
//           type="number"
//           placeholder="Price Per Day"
//           value={form.pricePerDay === 0 ? "" : form.pricePerDay}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               pricePerDay: e.target.value === "" ? 0 : Number(e.target.value)
//             })
//           }
//         />

//         <input
//           style={styles.input}
//           placeholder="Image URL"
//           value={form.imageUrl}
//           onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
//         />

//         <select
//           style={styles.input}
//           value={form.vehicalType}
//           onChange={(e) => setForm({ ...form, vehicalType: e.target.value })}
//         >
//           <option value="">Select Vehicle Type</option>
//           <option value="Sedan">Sedan</option>
//           <option value="SUV">SUV</option>
//           <option value="Hatchback">Hatchback</option>
//         </select>

//         <select
//           style={styles.input}
//           value={form.city}
//           onChange={(e) => setForm({ ...form, city: e.target.value })}
//         >
//           <option value="">Select City</option>
//           <option value="Pune">Pune</option>
//           <option value="Mumbai">Mumbai</option>
//           <option value="Nagpur">Nagpur</option>
//         </select>

//         <button style={styles.addButton} onClick={saveCar}>
//           Add Car
//         </button>
//       </div>

//       {/* Car Cards */}
//       <div style={styles.grid}>
//         {cars.map((c) => (
//           <div key={c.id} style={styles.card}>
//             <img src={c.imageUrl} alt={c.carName} style={styles.cardImage} />

//             <h3 style={styles.carName}>{c.carName}</h3>
//             <p style={styles.brand}>{c.brand}</p>
//             <p style={styles.brand}>Type: {c.vehicleType}</p>
//             <p style={styles.brand}>City: {c.city}</p>

//             <p style={styles.price}>₹{c.pricePerDay}</p>

//             <button style={styles.deleteBtn} onClick={() => deleteCar(c.id)}>
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ---------------- INLINE CSS ------------------- */

// const styles = {
//   page: {
//     padding: "20px",
//     backgroundColor: "#f7f3f8",
//     minHeight: "100vh"
//   },
//   title: {
//     textAlign: "center",
//     marginBottom: "20px",
//     fontSize: "28px",
//     fontWeight: "bold"
//   },
//   formSection: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: "10px",
//     marginBottom: "30px"
//   },
//   input: {
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     fontSize: "15px"
//   },
//   addButton: {
//     gridColumn: "1 / -1",
//     padding: "12px",
//     backgroundColor: "#28a745",
//     color: "white",
//     borderRadius: "10px",
//     fontWeight: "bold",
//     border: "none",
//     cursor: "pointer"
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
//     gap: "25px"
//   },
//   card: {
//     background: "white",
//     padding: "15px",
//     borderRadius: "15px",
//     textAlign: "center",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
//   },
//   cardImage: {
//     width: "100%",
//     height: "170px",
//     objectFit: "cover",
//     borderRadius: "12px"
//   },
//   carName: {
//     fontSize: "20px",
//     fontWeight: "bold",
//     marginTop: "10px"
//   },
//   brand: {
//     color: "#666"
//   },
//   price: {
//     fontSize: "18px",
//     fontWeight: "bold",
//     marginTop: "8px"
//   },
//   deleteBtn: {
//     padding: "8px",
//     backgroundColor: "red",
//     color: "white",
//     borderRadius: "8px",
//     border: "none",
//     width: "100%",
//     marginTop: "10px",
//     cursor: "pointer"
//   }
// };

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function ManageCars() {
//   const [cars, setCars] = useState([]);
//   const token = localStorage.getItem("token");

//   const loadCars = () => {
//     axios
//       .get("http://localhost:8080/user/cars", {
//         headers: { Authorization: token }
//       })
//       .then((res) => setCars(res.data))
//       .catch((err) => console.log("Load Cars Error", err));
//   };

//   useEffect(() => {
//     loadCars();
//   }, []);

//   const deleteCar = (id) => {
//     axios
//       .delete(`http://localhost:8080/admin/deleteCar/${id}`, {
//         headers: { Authorization: token }
//       })
//       .then(() => {
//         alert("Car Deleted Successfully");
//         loadCars();
//       })
//       .catch((err) => console.log("Delete Error", err));
//   };

//   return (
//     <div style={styles.page}>
//       <h2 style={styles.title}>Manage Cars</h2>

//       {/* Cars Grid */}
//       <div style={styles.grid}>
//         {cars.map((c) => (
//           <div key={c.id} style={styles.card}>
//             <img
//               src={c.imageUrl}
//               alt={c.carName}
//               style={styles.cardImage}
//             />

//             <h3 style={styles.carName}>{c.carName}</h3>
//             <p style={styles.brand}>{c.brand}</p>
//             <p style={styles.brand}>Type: {c.vehicalType}</p>
//             <p style={styles.brand}>City: {c.city}</p>

//             <p style={styles.price}>₹{c.pricePerDay} / day</p>

//             <button
//               style={styles.deleteBtn}
//               onClick={() => deleteCar(c.id)}
//             >
//               Delete Car
//             </button>
//           </div>
//         ))}

//         {cars.length === 0 && (
//           <p style={styles.empty}>No cars available</p>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ---------------- INLINE CSS ------------------- */

// const styles = {
//   page: {
//     padding: "30px",
//     backgroundColor: "#f7f3f8",
//     minHeight: "100vh"
//   },
//   title: {
//     textAlign: "center",
//     marginBottom: "30px",
//     fontSize: "28px",
//     fontWeight: "bold"
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
//     gap: "25px"
//   },
//   card: {
//     background: "white",
//     padding: "16px",
//     borderRadius: "18px",
//     textAlign: "center",
//     boxShadow: "0 6px 18px rgba(0,0,0,0.1)"
//   },
//   cardImage: {
//     width: "100%",
//     height: "180px",
//     objectFit: "cover",
//     borderRadius: "14px"
//   },
//   carName: {
//     fontSize: "20px",
//     fontWeight: "bold",
//     marginTop: "12px"
//   },
//   brand: {
//     color: "#6b7280",
//     fontSize: "14px",
//     marginTop: "4px"
//   },
//   price: {
//     fontSize: "18px",
//     fontWeight: "bold",
//     marginTop: "10px"
//   },
//   deleteBtn: {
//     padding: "10px",
//     backgroundColor: "#dc2626",
//     color: "white",
//     borderRadius: "10px",
//     border: "none",
//     width: "100%",
//     marginTop: "14px",
//     cursor: "pointer",
//     fontWeight: "600"
//   },
//   empty: {
//     gridColumn: "1 / -1",
//     textAlign: "center",
//     color: "#6b7280",
//     fontSize: "16px"
//   }
// };

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManageCars() {
  const [cars, setCars] = useState([]);
  const token = localStorage.getItem("token");

  const loadCars = () => {
    axios
      .get("http://localhost:8080/user/cars", {
        headers: { Authorization: token }
      })
      .then((res) => setCars(res.data))
      .catch((err) => console.log("Load Cars Error", err));
  };

  useEffect(() => {
    loadCars();
  }, []);

  const deleteCar = (id) => {
    axios
      .delete(`http://localhost:8080/admin/deleteCar/${id}`, {
        headers: { Authorization: token }
      })
      .then(() => {
        alert("Car Deleted Successfully");
        loadCars();
      })
      .catch((err) => console.log("Delete Error", err));
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

        .container {
          max-width: 1200px;
          margin: auto;
        }

        .title {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 30px;
        }

        .table {
          background: rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
        }

        .row {
          display: grid;
          grid-template-columns: 120px 1.5fr 1fr 1fr 1fr 1fr 140px;
          align-items: center;
          gap: 14px;
          padding: 18px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .row.header {
          font-size: 14px;
          font-weight: 600;
          color: #cbd5f5;
          background: rgba(255,255,255,0.08);
        }

        .row:last-child {
          border-bottom: none;
        }

        .car-img {
          width: 100px;
          height: 70px;
          border-radius: 14px;
          object-fit: cover;
        }

        .name {
          font-weight: 700;
          font-size: 16px;
        }

        .muted {
          font-size: 14px;
          color: #9ca3af;
        }

        .price {
          font-weight: 700;
          color: #a5b4fc;
        }

        .delete-btn {
          background: #dc2626;
          border: none;
          padding: 10px;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        .empty {
          text-align: center;
          padding: 40px;
          color: #9ca3af;
        }

        @media(max-width: 1000px) {
          .row {
            grid-template-columns: 1fr;
            text-align: left;
          }

          .row.header {
            display: none;
          }

          .row div {
            margin-bottom: 6px;
          }
        }
      `}</style>

      <div className="manage-page">
        <div className="container">
          <h2 className="title">Manage Cars</h2>

          <div className="table">
            {/* HEADER */}
            <div className="row header">
              <div>Image</div>
              <div>Car</div>
              <div>Brand</div>
              <div>Type</div>
              <div>City</div>
              <div>Price</div>
              <div>Action</div>
            </div>

            {/* DATA */}
            {cars.map((c) => (
              <div className="row" key={c.id}>
                <img src={c.imageUrl} alt={c.carName} className="car-img" />

                <div className="name">{c.carName}</div>

                <div className="muted">{c.brand}</div>

                <div className="muted">{c.vehicalType}</div>

                <div className="muted">{c.city}</div>

                <div className="price">₹{c.pricePerDay} / day</div>

                <button
                  className="delete-btn"
                  onClick={() => deleteCar(c.id)}
                >
                  Delete
                </button>
              </div>
            ))}

            {cars.length === 0 && (
              <div className="empty">No cars available</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
