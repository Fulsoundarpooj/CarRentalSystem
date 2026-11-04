// import React, { useState } from "react";
// import axios from "axios";
// export default function BrowseCars({ onViewDetails }) {
//   const [filters, setFilters] = useState({
//     city: "",
//     vehicalType: "",
//     minPrice: "",
//     maxPrice: ""
//   });
//   const [cars, setCars] = useState([]);
 
//   const searchCars = () => {
//     axios
//       .get("http://localhost:8080/user/cars/filter", { params: filters })
//       .then(res => setCars(res.data))
//       .catch(err => console.log("Filter Error:", err));
//   };

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
//           margin-bottom: 20px;
//         }

//         .filters {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
//           gap: 12px;
//           margin-bottom: 30px;
//         }

//         .filters select,
//         .filters input {
//           padding: 12px;
//           border-radius: 8px;
//           border: 1px solid #d1d5db;
//           font-size: 15px;
//         }

//         .filters button {
//           grid-column: 1 / -1;
//           padding: 14px;
//           background: #1e40af;
//           color: white;
//           border: none;
//           border-radius: 10px;
//           font-size: 16px;
//           cursor: pointer;
//         }

//         .list {
//           display: flex;
//           flex-direction: column;
//           gap: 18px;
//         }

//         .row {
//           display: flex;
//           gap: 20px;
//           background: white;
//           border-radius: 16px;
//           padding: 18px;
//           box-shadow: 0 8px 20px rgba(0,0,0,0.08);
//           align-items: center;
//         }

//         .row img {
//           width: 220px;
//           height: 140px;
//           object-fit: cover;
//           border-radius: 14px;
//         }

//         .details {
//           flex: 1;
//         }

//         .details h3 {
//           margin: 0;
//           font-size: 20px;
//         }

//         .details p {
//           margin: 4px 0;
//           color: #6b7280;
//         }

//         .priceBox {
//           text-align: right;
//           min-width: 150px;
//         }

//         .price {
//           font-size: 22px;
//           font-weight: 700;
//           color: #111827;
//         }

//         .priceBox button {
//           margin-top: 10px;
//           padding: 10px 18px;
//           background: #2563eb;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           cursor: pointer;
//           width: 100%;
//         }
//       `}</style>

//       <div className="page">
//         <div className="title">Browse Cars</div>

//         {/* FILTERS */}
//         <div className="filters">
//           <select onChange={e => setFilters({ ...filters, city: e.target.value })}>
//             <option value="">Select City</option>
//             <option value="Pune">Pune</option>
//             <option value="Mumbai">Mumbai</option>
//             <option value="Nagpur">Nagpur</option>
//           </select>

//           <select onChange={e => setFilters({ ...filters, vehicalType: e.target.value })}>
//             <option value="">Vehicle Type</option>
//             <option value="SUV">SUV</option>
//             <option value="SEDAN">SEDAN</option>
//             <option value="HATCHBACK">HATCHBACK</option>
//           </select>

//           <input type="number" placeholder="Min Price" onChange={e => setFilters({ ...filters, minPrice: e.target.value })} />
//           <input type="number" placeholder="Max Price" onChange={e => setFilters({ ...filters, maxPrice: e.target.value })} />

//           <button onClick={searchCars}>Search Cars</button>
//         </div>

//         {/* LIST */}
//         <div className="list">
//           {cars.map(c => (
//             <div key={c.id} className="row">
//               <img src={c.imageUrl} alt={c.carName} />

//               <div className="details">
//                 <h3>{c.carName}</h3>
//                 <p>{c.brand}</p>
//                 <p>Type: {c.vehicleType}</p>
//                 <p>City: {c.city}</p>
//               </div>

//               <div className="priceBox">
//                 <div className="price">₹{c.pricePerDay}/day</div>
                

//                 <button onClick={() => onViewDetails(c.id)}>
//   View Details
// </button>

//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import axios from "axios";

export default function BrowseCars({ onViewDetails }) {
  const [filters, setFilters] = useState({
    city: "",
    vehicalType: "",
    minPrice: "",
    maxPrice: ""
  });

  const [cars, setCars] = useState([]);

  const searchCars = () => {
    axios
      .get("http://localhost:8080/user/cars/filter", { params: filters })
      .then(res => setCars(res.data))
      .catch(err => console.log("Filter Error:", err));
  };

 return (
  <>
    <style>{`
      /* ===== GLOBAL BACKGROUND ===== */
      .bg-wrapper {
        min-height: 100vh;
        background: linear-gradient(135deg, #0f172a, #020617);
        padding: 40px;
      }

      /* ===== PAGE ===== */
      .browse-page {
        max-width: 1300px;
        margin: auto;
      }

      .page-title {
        font-size: 34px;
        font-weight: 800;
        margin-bottom: 30px;
        color: #f8fafc;
        letter-spacing: -0.5px;
      }

      /* ===== FILTER BAR ===== */
      .filter-bar {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 14px;
        padding: 20px;
        border-radius: 18px;
        background: rgba(255,255,255,0.08);
        backdrop-filter: blur(16px);
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
        margin-bottom: 40px;
      }

      .filter-bar select,
      .filter-bar input {
        padding: 14px;
        border-radius: 12px;
        border: none;
        font-size: 15px;
        background: rgba(255,255,255,0.15);
        color: white;
        outline: none;
      }

      .filter-bar select option {
        color: black;
      }

      .filter-bar input::placeholder {
        color: #cbd5f5;
      }

      .filter-bar button {
        grid-column: 1 / -1;
        padding: 16px;
        background: linear-gradient(135deg, #6366f1, #2563eb);
        border: none;
        border-radius: 14px;
        font-size: 16px;
        font-weight: 700;
        color: white;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .filter-bar button:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 30px rgba(99,102,241,0.4);
      }

      /* ===== CAR LIST ===== */
      .car-list {
        display: flex;
        flex-direction: column;
        gap: 26px;
      }

      .car-row {
        display: grid;
        grid-template-columns: 280px 1fr 200px;
        gap: 26px;
        align-items: center;
        padding: 26px;
        border-radius: 22px;
        background: rgba(255,255,255,0.07);
        backdrop-filter: blur(18px);
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08),
                    0 30px 60px rgba(0,0,0,0.4);
        transition: transform 0.25s ease, box-shadow 0.25s ease;
      }

      .car-row:hover {
        transform: translateY(-6px);
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.15),
                    0 40px 80px rgba(0,0,0,0.55);
      }

      .car-row img {
        width: 100%;
        height: 170px;
        object-fit: cover;
        border-radius: 18px;
      }

      /* ===== INFO ===== */
      .car-info h3 {
        margin: 0;
        font-size: 24px;
        font-weight: 800;
        color: #f8fafc;
      }

      .car-info p {
        margin: 6px 0;
        font-size: 15px;
        color: #c7d2fe;
      }

      /* ===== PRICE ===== */
      .price-box {
        text-align: right;
      }

      .price {
        font-size: 26px;
        font-weight: 800;
        color: #e0e7ff;
      }

      .price span {
        font-size: 14px;
        color: #94a3b8;
      }

      .price-box button {
        margin-top: 16px;
        width: 100%;
        padding: 14px;
        border-radius: 14px;
        border: none;
        font-size: 15px;
        font-weight: 700;
        background: linear-gradient(135deg, #22c55e, #16a34a);
        color: white;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .price-box button:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 30px rgba(34,197,94,0.4);
      }

      /* ===== RESPONSIVE ===== */
      @media (max-width: 900px) {
        .car-row {
          grid-template-columns: 1fr;
          text-align: center;
        }

        .price-box {
          text-align: center;
        }
      }
    `}</style>

    <div className="bg-wrapper">
      <div className="browse-page">
        <div className="page-title">Find Your Perfect Ride</div>

        {/* FILTER BAR */}
        <div className="filter-bar">
          <select onChange={e => setFilters({ ...filters, city: e.target.value })}>
            <option value="">Select City</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Nagpur">Nagpur</option>
          </select>

          <select onChange={e => setFilters({ ...filters, vehicalType: e.target.value })}>
            <option value="">Vehicle Type</option>
            <option value="SUV">SUV</option>
            <option value="SEDAN">Sedan</option>
            <option value="HATCHBACK">Hatchback</option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            onChange={e => setFilters({ ...filters, minPrice: e.target.value })}
          />

          <input
            type="number"
            placeholder="Max Price"
            onChange={e => setFilters({ ...filters, maxPrice: e.target.value })}
          />

          <button onClick={searchCars}>Search Cars</button>
        </div>

        {/* CAR LIST */}
        <div className="car-list">
          {cars.map(c => (
            <div key={c.id} className="car-row">
              <img src={c.imageUrl} alt={c.carName} />

              <div className="car-info">
                <h3>{c.carName}</h3>
                <p>{c.brand}</p>
                <p>Type: {c.vehicalType}</p>
                <p>City: {c.city}</p>
              </div>

              <div className="price-box">
                <div className="price">
                  ₹{c.pricePerDay}
                  <span> / day</span>
                </div>

                <button onClick={() => onViewDetails(c.id)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);
}