// import React, { useState } from "react";
// import axios from "axios";


// export default function UploadDocs({bookingId, onUploadComplete}) {


//   const [identityCard, setIdentityCard] = useState(null);
//   const [drivingLicense, setDrivingLicense] = useState(null);
  
//   const handleUpload = async (e) => {
//   e.preventDefault();

//   if (!identityCard || !drivingLicense) {
//     alert("Please select both documents!");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("identityCard", identityCard);
//   formData.append("drivingLicense", drivingLicense);

//   try {
//     await axios.post(
//       `http://localhost:8080/user/uploadDocs/${bookingId}`,
//       formData,
//       { headers: { "Content-Type": "multipart/form-data" } }
//     );

//     alert("Documents uploaded successfully!");
//     onUploadComplete();

//   } catch (error) {
//     alert(error.response?.data?.error || "Upload failed");
//   }
// };


//   if (!bookingId) {
//     return <h2 style={{ textAlign: "center" }}>Invalid booking</h2>;
//   }

//   return (
//     <div
//       style={{
//         maxWidth: "500px",
//         margin: "0 auto",
//         padding: "20px",
//       }}
//     >
//       <h2
//         style={{
//           textAlign: "center",
//           marginBottom: "20px",
//           fontWeight: "bold",
//         }}
//       >
//         Upload Required Documents for Booking #{bookingId}
//       </h2>

//       <form
//         onSubmit={handleUpload}
//         style={{
//           background: "white",
//           padding: "25px",
//           borderRadius: "12px",
//           boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
//         }}
//       >
//         <div style={{ marginBottom: "15px" }}>
//           <label style={{ fontWeight: "600" }}>
//             Identity Card (JPG)
//           </label>
//           <input
//             type="file"
//             accept="image/jpeg"
//             onChange={(e) => setIdentityCard(e.target.files[0])}
//             required
//             style={{
//               width: "100%",
//               padding: "10px",
//               borderRadius: "8px",
//               border: "1px solid #ccc",
//             }}
//           />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label style={{ fontWeight: "600" }}>
//             Driving License (JPG)
//           </label>
//           <input
//             type="file"
//             accept="image/jpeg"
//             onChange={(e) => setDrivingLicense(e.target.files[0])}
//             required
//             style={{
//               width: "100%",
//               padding: "10px",
//               borderRadius: "8px",
//               border: "1px solid #ccc",
//             }}
//           />
//         </div>

//         <button
//           type="submit"
//           style={{
//             width: "100%",
//             backgroundColor: "#10b981",
//             color: "white",
//             padding: "12px",
//             border: "none",
//             borderRadius: "8px",
//             fontSize: "16px",
//             fontWeight: "600",
//             cursor: "pointer",
//           }}
//         >
//           Upload Documents
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";

export default function UploadDocs({ bookingId, onUploadComplete }) {
  const [identityCard, setIdentityCard] = useState(null);
  const [drivingLicense, setDrivingLicense] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!identityCard || !drivingLicense) {
      alert("Please select both documents!");
      return;
    }

    const formData = new FormData();
    formData.append("identityCard", identityCard);
    formData.append("drivingLicense", drivingLicense);

    try {
      await axios.post(
        `http://localhost:8080/user/uploadDocs/${bookingId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Documents uploaded successfully!");
      onUploadComplete();
    } catch (error) {
      alert(error.response?.data?.error || "Upload failed");
    }
  };

  if (!bookingId) {
    return <h2 style={{ textAlign: "center", color: "white" }}>Invalid booking</h2>;
  }

  return (
    <>
      <style>{`
        body { margin: 0; }

        .upload-page {
          min-height: 100vh;
          background: linear-gradient(135deg,#020617,#0f172a);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          color: white;
        }

        .upload-card {
          width: 100%;
          max-width: 520px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(18px);
          border-radius: 24px;
          padding: 35px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        .title {
          font-size: 26px;
          font-weight: 800;
          text-align: center;
          margin-bottom: 6px;
        }

        .subtitle {
          font-size: 14px;
          color: #9ca3af;
          text-align: center;
          margin-bottom: 30px;
        }

        .upload-box {
          border: 2px dashed rgba(255,255,255,0.25);
          border-radius: 18px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: 0.3s;
          margin-bottom: 18px;
        }

        .upload-box:hover {
          border-color: #38bdf8;
          background: rgba(56,189,248,0.08);
        }

        .upload-box label {
          display: block;
          cursor: pointer;
        }

        .upload-box span {
          display: block;
          font-size: 15px;
          margin-top: 6px;
          color: #e5e7eb;
        }

        .upload-box input {
          display: none;
        }

        .file-name {
          margin-top: 8px;
          font-size: 13px;
          color: #a5b4fc;
        }

        .submit-btn {
          width: 100%;
          margin-top: 25px;
          padding: 16px;
          border-radius: 18px;
          border: none;
          background: linear-gradient(135deg,#22c55e,#16a34a);
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          color: white;
        }
      `}</style>

      <div className="upload-page">
        <div className="upload-card">
          <div className="title">Upload Documents</div>
          <div className="subtitle">
            Booking ID #{bookingId} • Required for verification
          </div>

          <form onSubmit={handleUpload}>
            {/* IDENTITY CARD */}
            <div className="upload-box">
              <label>
                📄 Identity Card (JPG)
                <span>Click to upload your ID</span>
                <input
                  type="file"
                  accept="image/jpeg"
                  onChange={(e) => setIdentityCard(e.target.files[0])}
                  required
                />
              </label>
              {identityCard && (
                <div className="file-name">{identityCard.name}</div>
              )}
            </div>

            {/* DRIVING LICENSE */}
            <div className="upload-box">
              <label>
                🚘 Driving License (JPG)
                <span>Click to upload license</span>
                <input
                  type="file"
                  accept="image/jpeg"
                  onChange={(e) => setDrivingLicense(e.target.files[0])}
                  required
                />
              </label>
              {drivingLicense && (
                <div className="file-name">{drivingLicense.name}</div>
              )}
            </div>

            <button type="submit" className="submit-btn">
              Upload & Continue →
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
