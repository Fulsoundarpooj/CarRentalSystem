// import React, { useEffect, useState } from "react";

// export default function SubmitCarPage() {
//   const [list, setList] = useState([]);
//   const [files, setFiles] = useState({});
//   const [ratings, setRatings] = useState({});

//   const loadBookings = (userName) => {
//     fetch(`http://localhost:8080/user/bookings/${userName}`)
//       .then(res => res.json())
//       .then(data => setList(data))
//       .catch(err => console.error(err));
//   };

//   useEffect(() => {
//     const userName = localStorage.getItem("username");
//     if (userName) loadBookings(userName);
//   }, []);

//   const handleFileChange = (bookingId, field, file) => {
//     setFiles(prev => ({
//       ...prev,
//       [bookingId]: { ...prev[bookingId], [field]: file }
//     }));
//   };

//   const setRating = (bookingId, star) => {
//     setRatings(prev => ({
//       ...prev,
//       [bookingId]: { ...prev[bookingId], rating: star }
//     }));
//   };

//   const setComment = (bookingId, comment) => {
//     setRatings(prev => ({
//       ...prev,
//       [bookingId]: { ...prev[bookingId], comment }
//     }));
//   };

//   const uploadCarPics = (bookingId) => {
//     const bookingFiles = files[bookingId];
//     const rating = ratings[bookingId];
//     const booking = list.find(b => b.id === bookingId);

//     if (!bookingFiles?.frontPic || !bookingFiles?.backPic ||
//         !bookingFiles?.leftSidePic || !bookingFiles?.rightSidePic) {
//       alert("Please upload all 4 car images");
//       return;
//     }

//     if (!rating?.rating) {
//       alert("Please give rating");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("frontPic", bookingFiles.frontPic);
//     formData.append("backPic", bookingFiles.backPic);
//     formData.append("leftSidePic", bookingFiles.leftSidePic);
//     formData.append("rightSidePic", bookingFiles.rightSidePic);

//     formData.append(
//       "rating",
//       new Blob([JSON.stringify({
//         carId: booking.carId,
//         rating: rating.rating,
//         comment: rating.comment || ""
//       })], { type: "application/json" })
//     );

//     fetch(`http://localhost:8080/user/uploadDocsForCarPic/${bookingId}`, {
//       method: "POST",
//       body: formData
//     })
//       .then(res => {
//         if (!res.ok) throw new Error();
//         return res.json();
//       })
//       .then(() => {
//         alert("Car submitted successfully with rating");
//         loadBookings(localStorage.getItem("username"));
//       })
//       .catch(() => alert("Submission failed"));
//   };

//   const eligibleBookings = list.filter(
//     b => b.status === "BOOKED" && b.isSubmitCar === false
//   );

//   return (
//     <>
//       <style>{`
//         body { margin: 0; }

//         .submit-page {
//           min-height: 100vh;
//           background: linear-gradient(135deg,#020617,#0f172a);
//           padding: 60px;
//           color: white;
//         }

//         .container {
//           max-width: 1100px;
//           margin: auto;
//         }

//         .title {
//           font-size: 34px;
//           font-weight: 800;
//           margin-bottom: 40px;
//         }

//         .section {
//           background: rgba(255,255,255,0.06);
//           backdrop-filter: blur(18px);
//           border-radius: 26px;
//           padding: 32px;
//           margin-bottom: 28px;
//           box-shadow: 0 25px 50px rgba(0,0,0,0.4);
//         }

//         .header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//         }

//         .meta p {
//           margin: 4px 0;
//           color: #cbd5f5;
//         }

//         .upload-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 14px;
//           margin-top: 18px;
//         }

//         input[type="file"] {
//           background: rgba(255,255,255,0.1);
//           padding: 14px;
//           border-radius: 14px;
//           border: none;
//           color: white;
//         }

//         .stars {
//           margin-top: 18px;
//         }

//         .stars span {
//           font-size: 28px;
//           cursor: pointer;
//           margin-right: 6px;
//         }

//         textarea {
//           width: 100%;
//           margin-top: 14px;
//           padding: 14px;
//           border-radius: 16px;
//           background: rgba(255,255,255,0.08);
//           border: none;
//           color: white;
//           resize: none;
//           min-height: 80px;
//         }

//         .submit-btn {
//           margin-top: 22px;
//           padding: 16px;
//           width: 100%;
//           border-radius: 18px;
//           border: none;
//           background: linear-gradient(135deg,#22c55e,#16a34a);
//           font-size: 16px;
//           font-weight: 700;
//           cursor: pointer;
//         }

//         .empty {
//           text-align: center;
//           color: #9ca3af;
//           margin-top: 80px;
//         }

//         @media(max-width: 768px) {
//           .submit-page { padding: 30px; }
//           .upload-grid { grid-template-columns: 1fr; }
//         }
//       `}</style>

//       <div className="submit-page">
//         <div className="container">
//           <div className="title">Submit Car & Rating</div>

//           {eligibleBookings.length === 0 && (
//             <div className="empty">No cars available for submission</div>
//           )}

//           {eligibleBookings.map(b => (
//             <div key={b.id} className="section">
//               <div className="header">
//                 <div className="meta">
//                   <h3>Booking #{b.id}</h3>
//                   <p>{b.carName} • {b.city}</p>
//                 </div>
//               </div>

//               <div className="upload-grid">
//                 {["frontPic","backPic","leftSidePic","rightSidePic"].map(f => (
//                   <input
//                     key={f}
//                     type="file"
//                     accept="image/jpg,image/jpeg"
//                     onChange={e => handleFileChange(b.id, f, e.target.files[0])}
//                   />
//                 ))}
//               </div>

//               <div className="stars">
//                 {[1,2,3,4,5].map(s => (
//                   <span
//                     key={s}
//                     style={{ color: ratings[b.id]?.rating >= s ? "#facc15" : "#64748b" }}
//                     onClick={() => setRating(b.id, s)}
//                   >
//                     ★
//                   </span>
//                 ))}
//               </div>

//               <textarea
//                 placeholder="Write your experience..."
//                 onChange={e => setComment(b.id, e.target.value)}
//               />

//               <button
//                 className="submit-btn"
//                 onClick={() => uploadCarPics(b.id)}
//               >
//                 Submit Car
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";

export default function SubmitCarPage() {
  const [list, setList] = useState([]);
  const [files, setFiles] = useState({});
  const [ratings, setRatings] = useState({});

  const loadBookings = (userName) => {
    fetch(`http://localhost:8080/user/bookings/${userName}`)
      .then(res => res.json())
      .then(data => setList(data))
      .catch(() => {});
  };

  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (userName) loadBookings(userName);
  }, []);

  const handleFileChange = (bookingId, field, file) => {
    setFiles(prev => ({
      ...prev,
      [bookingId]: { ...prev[bookingId], [field]: file }
    }));
  };

  const setRating = (bookingId, star) => {
    setRatings(prev => ({
      ...prev,
      [bookingId]: { ...prev[bookingId], rating: star }
    }));
  };

  const setComment = (bookingId, comment) => {
    setRatings(prev => ({
      ...prev,
      [bookingId]: { ...prev[bookingId], comment }
    }));
  };

  const uploadCarPics = (bookingId) => {
    const bookingFiles = files[bookingId];
    const rating = ratings[bookingId];
    const booking = list.find(b => b.id === bookingId);

    if (!bookingFiles?.frontPic || !bookingFiles?.backPic ||
        !bookingFiles?.leftSidePic || !bookingFiles?.rightSidePic) {
      alert("Please upload all 4 car images");
      return;
    }

    if (!rating?.rating) {
      alert("Please give rating");
      return;
    }

    const formData = new FormData();
    formData.append("frontPic", bookingFiles.frontPic);
    formData.append("backPic", bookingFiles.backPic);
    formData.append("leftSidePic", bookingFiles.leftSidePic);
    formData.append("rightSidePic", bookingFiles.rightSidePic);

    formData.append(
      "rating",
      new Blob([JSON.stringify({
        carId: booking.carId,
        rating: rating.rating,
        comment: rating.comment || ""
      })], { type: "application/json" })
    );

    fetch(`http://localhost:8080/user/uploadDocsForCarPic/${bookingId}`, {
      method: "POST",
      body: formData
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        alert("Car submitted successfully with rating");
        loadBookings(localStorage.getItem("username"));
      })
      .catch(() => alert("Submission failed"));
  };

  const eligibleBookings = list.filter(
    b => b.status === "BOOKED" && b.isSubmitCar === false
  );

  const uploadFields = [
    { key: "frontPic", label: "Front View" },
    { key: "backPic", label: "Back View" },
    { key: "leftSidePic", label: "Left Side" },
    { key: "rightSidePic", label: "Right Side" }
  ];

  return (
    <>
      <style>{`
        body { margin: 0; }

        .submitRoot {
          min-height: 100vh;
          background: radial-gradient(circle at top, #0f172a, #020617);
          padding: 60px 24px;
          color: white;
        }

        .container {
          max-width: 1100px;
          margin: auto;
        }

        .pageTitle {
          font-size: 40px;
          font-weight: 800;
          margin-bottom: 50px;
        }

        .glassSection {
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.06),
            rgba(255,255,255,0.02)
          );
          backdrop-filter: blur(22px);
          border-radius: 28px;
          padding: 36px;
          margin-bottom: 36px;
          box-shadow: 0 40px 120px rgba(0,0,0,0.5);
        }

        .meta h3 {
          margin: 0;
          font-size: 22px;
        }

        .meta p {
          margin-top: 6px;
          color: #a5b4fc;
        }

        .uploadGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          margin-top: 26px;
        }

        .uploadTile {
          position: relative;
          padding: 22px;
          border-radius: 18px;
          background: rgba(0,0,0,0.6);
          border: 1px dashed rgba(255,255,255,0.18);
          cursor: pointer;
          transition: 0.25s ease;
          text-align: center;
        }

        .uploadTile:hover {
          border-color: #a5b4fc;
          box-shadow: 0 0 0 1px rgba(165,180,252,0.5);
        }

        .uploadTile span {
          display: block;
          margin-top: 8px;
          font-size: 14px;
          color: #c7d2fe;
        }

        .uploadTile input {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
        }

        .stars {
          margin-top: 26px;
        }

        .stars span {
          font-size: 30px;
          margin-right: 6px;
          cursor: pointer;
        }

        textarea {
          width: 100%;
          margin-top: 20px;
          padding: 16px;
          border-radius: 18px;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          resize: none;
          min-height: 90px;
        }

        .submitBtn {
          margin-top: 26px;
          width: 100%;
          padding: 16px;
          border-radius: 18px;
          border: none;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          background: linear-gradient(135deg, #a5b4fc, #22d3ee);
          color: black;
        }

        .empty {
          text-align: center;
          color: #9ca3af;
          margin-top: 100px;
        }

        @media(max-width: 768px) {
          .uploadGrid { grid-template-columns: 1fr; }
          .pageTitle { font-size: 32px; }
        }
      `}</style>

      <div className="submitRoot">
        <div className="container">
          <div className="pageTitle">Submit Car & Experience</div>

          {eligibleBookings.length === 0 && (
            <div className="empty">No cars available for submission</div>
          )}

          {eligibleBookings.map(b => (
            <div key={b.id} className="glassSection">
              <div className="meta">
                <h3>Booking #{b.id}</h3>
                <p>{b.carName} • {b.city}</p>
              </div>

              <div className="uploadGrid">
                {uploadFields.map(u => (
                  <label key={u.key} className="uploadTile">
                    ⬆
                    <span>{u.label}</span>
                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                      {files[b.id]?.[u.key]?.name || "Click to upload"}
                    </span>
                    <input
                      type="file"
                      accept="image/jpg,image/jpeg"
                      onChange={e =>
                        handleFileChange(b.id, u.key, e.target.files[0])
                      }
                    />
                  </label>
                ))}
              </div>

              <div className="stars">
                {[1,2,3,4,5].map(s => (
                  <span
                    key={s}
                    style={{
                      color:
                        ratings[b.id]?.rating >= s ? "#facc15" : "#475569"
                    }}
                    onClick={() => setRating(b.id, s)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                placeholder="Share your experience with this car..."
                onChange={e => setComment(b.id, e.target.value)}
              />

              <button
                className="submitBtn"
                onClick={() => uploadCarPics(b.id)}
              >
                Submit Car
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
