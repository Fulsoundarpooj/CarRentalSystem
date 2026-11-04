// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function BookCar({ carId, onBookingCreated }) {
//   const [car, setCar] = useState(null);
//   const userId = localStorage.getItem("userId");

//   const today = new Date().toISOString().split("T")[0];

//   const [form, setForm] = useState({
//     userId,
//     carId,
//     startDate: "",
//     endDate: "",
//     paymentMode: "",
//     customerName: "",
//     customerMobile: "",
//     city: "",
//   });

//   useEffect(() => {
//     if (!carId) return;

//     axios
//       .get(`http://localhost:8080/user/carsById/${carId}`)
//       .then(res => setCar(res.data.car))
//       .catch(() => alert("Failed to load car"));
//   }, [carId]);

//   useEffect(() => {
//     setForm(prev => ({ ...prev, carId }));
//   }, [carId]);

//   const handleChange = e =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async () => {
//     try {
//       const res = await axios.post("http://localhost:8080/user/book", form);
//       if (res.data?.booking?.id) {
//         onBookingCreated(res.data.booking.id);
//       }
//     } catch (error) {
//       alert(error.response?.data?.error || "Booking failed");
//     }
//   };

//   if (!car)
//     return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;

//   return (
//     <>
//       <style>{`
//         body { margin: 0; }

//         .book-page {
//           min-height: 100vh;
//           background: linear-gradient(135deg,#020617,#0f172a);
//           padding: 50px;
//           color: white;
//         }

//         .layout {
//           max-width: 1200px;
//           margin: auto;
//           display: grid;
//           grid-template-columns: 420px 1fr;
//           gap: 50px;
//         }

//         .car-preview img {
//           width: 100%;
//           border-radius: 22px;
//           object-fit: cover;
//         }

//         .price {
//           font-size: 26px;
//           font-weight: 800;
//           margin-top: 12px;
//           color: #a5b4fc;
//         }

//         .section {
//           margin-bottom: 22px;
//         }

//         .label {
//           font-size: 14px;
//           color: #9ca3af;
//           margin-bottom: 6px;
//         }

//         .input, .select {
//           width: 100%;
//           padding: 14px;
//           border-radius: 14px;
//           border: none;
//           font-size: 15px;
//           background: rgba(255,255,255,0.08);
//           color: white;
//           outline: none;
//         }

//         .row {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 16px;
//         }

//         .submit {
//           width: 100%;
//           padding: 16px;
//           margin-top: 25px;
//           border-radius: 16px;
//           border: none;
//           background: #22c55e;
//           font-size: 16px;
//           font-weight: 700;
//           cursor: pointer;
//         }

//         @media(max-width:900px){
//           .layout { grid-template-columns: 1fr; }
//         }
//       `}</style>

//       <div className="book-page">
//         <div className="layout">

//           {/* LEFT – CAR SUMMARY */}
//           <div className="car-preview">
//             <img src={car.imageUrl} alt={car.carName} />
//             <h2>{car.carName}</h2>
//             <p>{car.brand} • {car.vehicalType}</p>
//             <div className="price">₹{car.pricePerDay} / day</div>
//           </div>

//           {/* RIGHT – BOOKING FLOW */}
//           <div>
//             <h1>Confirm Booking</h1>

//             <div className="row">
//               <div className="section">
//                 <div className="label">Start Date</div>
//                 <input
//                   type="date"
//                   name="startDate"
//                   min={today}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>

//               <div className="section">
//                 <div className="label">End Date</div>
//                 <input
//                   type="date"
//                   name="endDate"
//                   min={form.startDate || today}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>
//             </div>

//             <div className="section">
//               <div className="label">Customer Name</div>
//               <input
//                 name="customerName"
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div className="section">
//               <div className="label">Mobile Number</div>
//               <input
//                 name="customerMobile"
//                 onChange={handleChange}
//                 className="input"
//               />
//             </div>

//             <div className="row">
//               <div className="section">
//                 <div className="label">City</div>
//                 <select
//                   name="city"
//                   onChange={handleChange}
//                   className="select"
//                 >
//                   <option value="">Select City</option>
//                   <option value="Pune">Pune</option>
//                   <option value="Mumbai">Mumbai</option>
//                   <option value="Nagpur">Nagpur</option>
//                 </select>
//               </div>

//               <div className="section">
//                 <div className="label">Payment Mode</div>
//                 <select
//                   name="paymentMode"
//                   onChange={handleChange}
//                   className="select"
//                 >
//                   <option value="">Select Payment</option>
//                   <option value="CARD">Card</option>
//                   <option value="UPI">UPI</option>
//                   <option value="CASH">Cash</option>
//                 </select>
//               </div>
//             </div>

//             <button className="submit" onClick={handleSubmit}>
//               Confirm & Continue →
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BookCar({ carId, onBookingCreated }) {
  const [car, setCar] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId,
    carId,
    startDate: "",
    endDate: "",
    paymentMode: "",
    customerName: "",
    customerMobile: "",
    city: "",
  });

  useEffect(() => {
    if (!carId) return;

    axios
      .get(`http://localhost:8080/user/carsById/${carId}`)
      .then(res => setCar(res.data.car))
      .catch(() => alert("Failed to load car"));
  }, [carId]);

  useEffect(() => {
    setForm(prev => ({ ...prev, carId }));
  }, [carId]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/user/book", form);
      if (res.data?.booking?.id) {
        onBookingCreated(res.data.booking.id);
      }
    } catch (error) {
      alert(error.response?.data?.error || "Booking failed");
    }
  };

  if (!car)
    return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;

  return (
    <>
      <style>{`
        body { margin: 0; }

        .book-page {
          min-height: 100vh;
          background: linear-gradient(135deg,#020617,#0f172a);
          padding: 50px;
          color: white;
        }

        .layout {
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 50px;
        }

        .car-preview img {
          width: 100%;
          border-radius: 22px;
          object-fit: cover;
        }

        .price {
          font-size: 26px;
          font-weight: 800;
          margin-top: 12px;
          color: #a5b4fc;
        }

        .section {
          margin-bottom: 22px;
        }

        .label {
          font-size: 14px;
          color: #9ca3af;
          margin-bottom: 6px;
        }

        .input, .select {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: none;
          font-size: 15px;
          background: rgba(255,255,255,0.08);
          color: white;
          outline: none;
        }

        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .submit {
          width: 100%;
          padding: 16px;
          margin-top: 25px;
          border-radius: 16px;
          border: none;
          background: #22c55e;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        .back-btn {
          background: transparent;
          border: 1px solid #94a3b8;
          color: white;
          padding: 10px 18px;
          border-radius: 14px;
          cursor: pointer;
          margin-bottom: 25px;
        }

        @media(max-width:900px){
          .layout { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="book-page">

        {/* ✅ GO BACK TO BOOK CAR BUTTON PAGE */}
        <button
          className="back-btn"
          onClick={() => navigate("/browse-cars")}
        >
          ← Back to Cars
        </button>

        <div className="layout">

          {/* LEFT – CAR SUMMARY */}
          <div className="car-preview">
            <img src={car.imageUrl} alt={car.carName} />
            <h2>{car.carName}</h2>
            <p>{car.brand} • {car.vehicalType}</p>
            <div className="price">₹{car.pricePerDay} / day</div>
          </div>

          {/* RIGHT – BOOKING FLOW */}
          <div>
            <h1>Confirm Booking</h1>

            <div className="row">
              <div className="section">
                <div className="label">Start Date</div>
                <input type="date" name="startDate" onChange={handleChange} className="input" />
              </div>

              <div className="section">
                <div className="label">End Date</div>
                <input type="date" name="endDate" onChange={handleChange} className="input" />
              </div>
            </div>

            <div className="section">
              <div className="label">Customer Name</div>
              <input name="customerName" onChange={handleChange} className="input" />
            </div>

            <div className="section">
              <div className="label">Mobile Number</div>
              <input name="customerMobile" onChange={handleChange} className="input" />
            </div>

            <div className="row">
              <div className="section">
                <div className="label">City</div>
                <select name="city" onChange={handleChange} className="select">
                  <option value="">Select City</option>
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Nagpur">Nagpur</option>
                </select>
              </div>

              <div className="section">
                <div className="label">Payment Mode</div>
                <select name="paymentMode" onChange={handleChange} className="select">
                  <option value="">Select Payment</option>
                  <option value="CARD">Card</option>
                  <option value="UPI">UPI</option>
                  <option value="CASH">Cash</option>
                </select>
              </div>
            </div>

            <button className="submit" onClick={handleSubmit}>
              Confirm & Continue →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
