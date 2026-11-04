// export default function UserHome() {
// const userName = localStorage.getItem("username");

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>🚗 Welcome&nbsp;{userName} to Car Rental Dashboard</h1>
      
//       <p>Add cars, view Approval-pending bookings and view upload documents and revenue of business.</p>
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
        <h1 style={styles.title}>🚗 Welcome, {userName}</h1>
        <p style={styles.subtitle}>
          Admin dashboard for managing car rentals smoothly and efficiently.
        </p>
      </div>

      {/* CAR SHOWCASE */}
      <div style={styles.showcase}>
        <div style={styles.showItem}>
          <div style={styles.carIcon}>🚘</div>
          <p style={styles.caption}>Manage Booking Requests</p>
        </div>

        <div style={styles.showItem}>
          <div style={styles.carIcon}>🚙</div>
          <p style={styles.caption}>Track Car Availability</p>
        </div>

        <div style={styles.showItem}>
          <div style={styles.carIcon}>🚕</div>
          <p style={styles.caption}>Handle Customer Documents</p>
        </div>
      </div>

      {/* FOOTER NOTE */}
      <p style={styles.note}>
        Select an option from the menu to get started.
      </p>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg, #f8fafc, #eef2ff)"
  },
  hero: {
    background: "linear-gradient(135deg, #2563eb, #1e40af)",
    padding: "35px",
    borderRadius: "24px",
    color: "#fff",
    marginBottom: "50px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
  },
  title: {
    fontSize: "32px",
    marginBottom: "10px"
  },
  subtitle: {
    fontSize: "16px",
    opacity: 0.9
  },
  showcase: {
    display: "flex",
    justifyContent: "center",
    gap: "60px",
    flexWrap: "wrap"
  },
  showItem: {
    textAlign: "center",
    maxWidth: "180px"
  },
  carIcon: {
    fontSize: "60px",
    marginBottom: "15px"
  },
  caption: {
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
