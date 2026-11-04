// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function ViewCar({ carId, onBack, onBookNow }) {
//   const [data, setData] = useState(null);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!carId) return;

//     axios
//       .get(`http://localhost:8080/user/carsById/${carId}`)
//       .then(res => setData(res.data))
//       .catch(() => alert("Car not found"));
//   }, [carId]);

//   const downloadDocs = () => {
//     axios({
//       url: `http://localhost:8080/user/car/${carId}/download-docs`,
//       method: "GET",
//       responseType: "blob",
//       headers: { Authorization: token }
//     }).then(res => {
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `car-docs-${carId}.zip`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     });
//   };

//   if (!data) return <h2 style={{ textAlign: "center", color: "white" }}>Loading...</h2>;

//   const { car, averageRating, ratingBreakdown, comments } = data;

//   return (
//     <>
//       <style>{`
//         .bg {
//           min-height: 100vh;
//           background: linear-gradient(135deg, #0f172a, #020617);
//           padding: 40px;
//           color: white;
//         }

//         .container {
//           max-width: 1300px;
//           margin: auto;
//         }

//         .back-btn {
//           margin-bottom: 30px;
//           background: rgba(255,255,255,0.1);
//           border: none;
//           padding: 12px 18px;
//           border-radius: 12px;
//           color: white;
//           cursor: pointer;
//           font-weight: 600;
//         }

//         .layout {
//           display: grid;
//           grid-template-columns: 480px 1fr;
//           gap: 40px;
//           align-items: flex-start;
//         }

//         .image-box img {
//           width: 100%;
//           height: auto;
//           object-fit: contain;
//           border-radius: 22px;
//           background: rgba(255,255,255,0.05);
//           padding: 16px;
//         }

//         .title {
//           font-size: 36px;
//           font-weight: 800;
//           margin-bottom: 10px;
//         }

//         .price {
//           font-size: 28px;
//           font-weight: 800;
//           color: #a5b4fc;
//           margin-bottom: 30px;
//         }

//         .specs {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 16px;
//         }

//         .spec {
//           background: rgba(255,255,255,0.08);
//           padding: 14px;
//           border-radius: 14px;
//           font-size: 14px;
//         }

//         .rating {
//           margin-top: 40px;
//         }

//         .review {
//           margin-top: 10px;
//           background: rgba(255,255,255,0.08);
//           padding: 12px;
//           border-radius: 12px;
//         }

//         .actions {
//           margin-top: 40px;
//           display: flex;
//           gap: 16px;
//           flex-wrap: wrap;
//         }

//         .btn {
//           padding: 14px 24px;
//           border-radius: 14px;
//           border: none;
//           font-weight: 700;
//           cursor: pointer;
//         }

//         .download {
//           background: #111827;
//           color: white;
//         }

//         .book {
//           background: linear-gradient(135deg, #22c55e, #16a34a);
//           color: white;
//         }

//         @media (max-width: 900px) {
//           .layout {
//             grid-template-columns: 1fr;
//           }
//         }
//       `}</style>

//       <div className="bg">
//         <div className="container">

//           <button className="back-btn" onClick={onBack}>
//             ← Back to Browse
//           </button>

//           <div className="layout">
//             {/* IMAGE LEFT */}
//             <div className="image-box">
//               <img src={car.imageUrl} alt={car.carName} />
//             </div>

//             {/* INFO RIGHT */}
//             <div>
//               <div className="title">{car.carName}</div>
//               <div className="price">₹{car.pricePerDay} / day</div>

//               <div className="specs">
//                 <div className="spec"><b>Brand:</b> {car.brand}</div>
//                 <div className="spec"><b>Fuel:</b> {car.fuelType}</div>
//                 <div className="spec"><b>Transmission:</b> {car.transmission}</div>
//                 <div className="spec"><b>Seats:</b> {car.seats}</div>
//                 <div className="spec"><b>City:</b> {car.city}</div>
//                 <div className="spec"><b>Type:</b> {car.vehicalType}</div>
//                 <div className="spec"><b>Year:</b> {car.modelYear}</div>
//               </div>

//               {/* RATING */}
//               <div className="rating">
//                 <h3>⭐ {averageRating?.toFixed(1) || "0.0"} / 5</h3>
//                 {[5,4,3,2,1].map(s => (
//                   <div key={s}>{s} ⭐ : {ratingBreakdown?.[s] || 0} users</div>
//                 ))}

//                 <h4 style={{ marginTop: "14px" }}>User Reviews</h4>
//                 {comments.length === 0 && <p>No reviews yet</p>}

//                 {comments.map((c, i) => (
//                   <div key={i} className="review">
//                     <b>{c.rating} ⭐</b>
//                     <p>{c.comment}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* ACTIONS */}
//               <div className="actions">
//                 <button className="btn download" onClick={downloadDocs}>
//                   Download Documents
//                 </button>

//                 <button
//                   className="btn book"
//                   onClick={() => onBookNow(car.id)}
//                 >
//                   Book Now
//                 </button>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewCar({ carId, onBack, onBookNow }) {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!carId) return;

    axios
      .get(`http://localhost:8080/user/carsById/${carId}`)
      .then(res => setData(res.data))
      .catch(() => alert("Car not found"));
  }, [carId]);

  const downloadDocs = () => {
    axios({
      url: `http://localhost:8080/user/car/${carId}/download-docs`,
      method: "GET",
      responseType: "blob",
      headers: { Authorization: token }
    }).then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `car-docs-${carId}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };

  if (!data)
    return (
      <>
        <style>{`
          .skeleton {
            height: 18px;
            width: 100%;
            background: linear-gradient(90deg,#1f2933,#374151,#1f2933);
            background-size: 200% 100%;
            animation: shine 1.2s infinite;
            border-radius: 8px;
            margin-bottom: 12px;
          }
          @keyframes shine {
            to { background-position: -200% 0; }
          }
        `}</style>

        <div style={{ padding: 50, color: "white" }}>
          <div className="skeleton" style={{ height: 300 }} />
          <div className="skeleton" />
          <div className="skeleton" />
          <div className="skeleton" />
        </div>
      </>
    );

  const { car, averageRating, ratingBreakdown, comments } = data;

  return (
    <>
      <style>{`
        body { margin: 0; }

        .page {
          min-height: 100vh;
          background: linear-gradient(135deg, #020617, #0f172a);
          padding: 40px;
          color: white;
        }

        .container {
          max-width: 1300px;
          margin: auto;
        }

        .back {
          margin-bottom: 25px;
          background: rgba(255,255,255,0.1);
          border: none;
          color: white;
          padding: 12px 18px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
        }

        .layout {
          display: grid;
          grid-template-columns: 520px 1fr;
          gap: 40px;
        }

        /* IMAGE ZOOM */
        .image-wrap {
          overflow: hidden;
          border-radius: 24px;
          background: rgba(255,255,255,0.05);
        }

        .image-wrap img {
          width: 100%;
          transition: transform 0.5s ease;
        }

        .image-wrap:hover img {
          transform: scale(1.12);
        }

        .title {
          font-size: 38px;
          font-weight: 800;
        }

        .specs {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 14px;
          margin-top: 20px;
        }

        .spec {
          background: rgba(255,255,255,0.08);
          padding: 14px;
          border-radius: 14px;
          font-size: 14px;
        }

        .rating {
          margin-top: 35px;
        }

        .review {
          background: rgba(255,255,255,0.08);
          padding: 12px;
          border-radius: 12px;
          margin-top: 8px;
        }

        /* STICKY PRICE */
        .sticky {
          position: sticky;
          top: 20px;
          background: rgba(15,23,42,0.85);
          backdrop-filter: blur(10px);
          padding: 24px;
          border-radius: 22px;
          margin-top: 30px;
        }

        .price {
          font-size: 30px;
          font-weight: 800;
          color: #a5b4fc;
        }

        .btn {
          width: 100%;
          margin-top: 14px;
          padding: 14px;
          border-radius: 14px;
          border: none;
          font-weight: 700;
          cursor: pointer;
        }

        .book { background: #22c55e; }
        .download { background: #33415fff; color: white; }

        /* MODAL */
        .modal-bg {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
        }

        .modal {
          background: #a8b3e3ff;
          padding: 30px;
          border-radius: 22px;
          max-width: 400px;
          width: 100%;
          text-align: center;
        }

        .modal button {
          margin-top: 16px;
        }

        @media (max-width: 900px) {
          .layout { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="page">
        <div className="container">

          <button className="back" onClick={onBack}>
            ← Back to Browse
          </button>

          <div className="layout">
            {/* LEFT IMAGE */}
            <div className="image-wrap">
              <img src={car.imageUrl} alt={car.carName} />
            </div>

            {/* RIGHT INFO */}
            <div>
              <div className="title">{car.carName}</div>

              <div className="specs">
                <div className="spec">Brand: {car.brand}</div>
                <div className="spec">Fuel: {car.fuelType}</div>
                <div className="spec">Transmission: {car.transmission}</div>
                <div className="spec">Seats: {car.seats}</div>
                <div className="spec">City: {car.city}</div>
                <div className="spec">Type: {car.vehicalType}</div>
                <div className="spec">Year: {car.modelYear}</div>
              </div>

              <div className="rating">
                <h3>⭐ {averageRating?.toFixed(1) || "0.0"} / 5</h3>
                {[5,4,3,2,1].map(s => (
                  <div key={s}>{s} ⭐ : {ratingBreakdown?.[s] || 0}</div>
                ))}

                {comments.map((c,i)=>(
                  <div key={i} className="review">
                    <b>{c.rating} ⭐</b>
                    <p>{c.comment}</p>
                  </div>
                ))}
              </div>

              {/* STICKY PRICE */}
              <div className="sticky">
                <div className="price">₹{car.pricePerDay} / day</div>

                <button className="btn book" onClick={() => setShowModal(true)}>
                  Book Now
                </button>

                <button className="btn download" onClick={downloadDocs}>
                  Download Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOOKING MODAL */}
      {showModal && (
        <div className="modal-bg">
          <div className="modal">
            <h2>Confirm Booking</h2>
            <p>{car.carName}</p>

            <button
              className="btn book"
              onClick={() => onBookNow(car.id)}
            >
              Confirm Booking
            </button>

            <button
              className="btn"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
