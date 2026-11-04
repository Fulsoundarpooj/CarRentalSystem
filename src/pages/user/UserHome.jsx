// export default function UserHome() {
// const userName = localStorage.getItem("username");

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>🚗 Welcome <br/>{userName} to Car Rental Dashboard</h1>
      
//       <p>Browse cars, view your bookings, and upload documents easily.</p>
//     </div>
//   );
// }

import React from "react";

export default function UserHome() {
  const userName = localStorage.getItem("username");

  return (
    <div style={styles.page}>
      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          🚗 Welcome, {userName}
        </h1>
        <p style={styles.subtitle}>
          Find the perfect car, manage your bookings, and upload documents with ease.
        </p>
      </div>

      {/* VISUAL SECTION */}
      <div style={styles.visuals}>
        <div style={styles.visualItem}>
          <span style={styles.icon}>🚘</span>
          <p style={styles.text}>Browse Available Cars</p>
        </div>

        <div style={styles.visualItem}>
          <span style={styles.icon}>📅</span>
          <p style={styles.text}>View Your Bookings</p>
        </div>

        <div style={styles.visualItem}>
          <span style={styles.icon}>📄</span>
          <p style={styles.text}>Upload Documents</p>
        </div>
      </div>

      <p style={styles.note}>
        Use the menu to start your journey 🚀
      </p>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg, #f8fafc, #e0f2fe)"
  },
  hero: {
    background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
    padding: "35px",
    borderRadius: "22px",
    color: "#fff",
    marginBottom: "50px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
  },
  title: {
    fontSize: "32px",
    marginBottom: "10px",
    lineHeight: 1.2
  },
  subtitle: {
    fontSize: "16px",
    opacity: 0.9,
    maxWidth: "520px"
  },
  visuals: {
    display: "flex",
    justifyContent: "center",
    gap: "70px",
    flexWrap: "wrap"
  },
  visualItem: {
    textAlign: "center",
    maxWidth: "160px"
  },
  icon: {
    fontSize: "56px",
    marginBottom: "12px"
  },
  text: {
    fontSize: "15px",
    color: "#374151"
  },
  note: {
    textAlign: "center",
    marginTop: "60px",
    color: "#6b7280",
    fontSize: "14px"
  }
};
