// import React, { useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// export default function MakePayment() {
//   const { bookingId } = useParams();
//   const navigate = useNavigate();

//   const [mode, setMode] = useState("");

//   const handlePayment = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:8080/user/payment",
//         null,
//         {
//           params: {
//             bookingId: bookingId,
//             mode: mode
//           }
//         }
//       );

//       alert(res.data.message);
//      navigate("/user/dashboard");
//  // redirect after payment
//     } catch (err) {
//       alert("Payment Failed");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Make Payment for Booking #{bookingId}</h2>

//       <div className="card p-4 mt-3 shadow">
//         <label className="form-label">Select Payment Mode</label>
        
//         <select
//           className="form-control mb-3"
//           onChange={(e) => setMode(e.target.value)}
//         >
//           <option value="">Select Mode</option>
//           <option value="CARD">Card</option>
//           <option value="UPI">UPI</option>
//           <option value="CASH">Cash</option>
//         </select>

//         <button className="btn btn-success" onClick={handlePayment}>
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";

export default function MakePayment({ bookingId, onPaymentComplete }) {
  const [mode, setMode] = useState("");

  const handlePayment = async () => {
    if (!mode) {
      alert("Please select a payment mode!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/user/payment",
        null,
        { params: { bookingId: bookingId, mode: mode } }
      );

      alert(res.data.message);
      onPaymentComplete();
    } catch {
      alert("Payment Failed");
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
        }

        .paymentRoot {
          min-height: 100vh;
          background: radial-gradient(circle at top, #0f172a, #020617);
          color: white;
          padding: 60px 24px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .paymentShell {
          width: 100%;
          max-width: 900px;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
        }

        .leftPane h1 {
          font-size: 42px;
          font-weight: 800;
          margin-bottom: 16px;
          letter-spacing: -1px;
        }

        .leftPane p {
          color: #9ca3af;
          line-height: 1.7;
          max-width: 420px;
        }

        .bookingTag {
          display: inline-block;
          margin-top: 22px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          font-size: 14px;
          color: #c7d2fe;
        }

        .rightPane {
          backdrop-filter: blur(20px);
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.06),
            rgba(255,255,255,0.02)
          );
          border-radius: 24px;
          padding: 36px;
          box-shadow: 0 40px 120px rgba(0,0,0,0.5);
        }

        .rightPane label {
          font-size: 14px;
          color: #a5b4fc;
          margin-bottom: 10px;
          display: block;
        }

        .rightPane select {
          width: 100%;
          padding: 16px;
          font-size: 16px;
          border-radius: 14px;
          background: rgba(0,0,0,0.6);
          color: white;
          border: 1px solid rgba(255,255,255,0.12);
          outline: none;
          margin-bottom: 28px;
        }

        .rightPane select option {
          background: #020617;
          color: white;
        }

        .payBtn {
          width: 100%;
          padding: 16px;
          border-radius: 16px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          font-weight: 700;
          color: black;
          background: linear-gradient(135deg, #a5b4fc, #22d3ee);
          transition: 0.25s ease;
        }

        .payBtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(165,180,252,0.45);
        }

        @media (max-width: 900px) {
          .paymentShell {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .leftPane h1 {
            font-size: 32px;
          }
        }
      `}</style>

      <div className="paymentRoot">
        <div className="paymentShell">

          {/* LEFT CONTENT */}
          <div className="leftPane">
            <h1>Complete Payment</h1>
            <p>
              You're just one step away from confirming your booking.
              Choose a payment method below and complete the transaction securely.
            </p>

            <div className="bookingTag">
              Booking ID • #{bookingId}
            </div>
          </div>

          {/* RIGHT ACTION */}
          <div className="rightPane">
            <label>Payment Method</label>
            <select onChange={(e) => setMode(e.target.value)}>
              <option value="">Select payment option</option>
              <option value="CARD">Credit / Debit Card</option>
              <option value="UPI">UPI</option>
              <option value="CASH">Cash</option>
            </select>

            <button className="payBtn" onClick={handlePayment}>
              Confirm & Pay
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
