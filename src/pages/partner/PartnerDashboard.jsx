// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import ManageCars from "./ManageCars";
// import PartnerRevenuePage from "./PartnerRevenuePage";
// import PartnerBookingHistory from "./PartnerBookingHistory";
// // import AllBookings from "../AllBookings";
// // import AdminRevenuePage from "./AdminRevenuePage";
// // import MakeCarAvailable from "./MakeCarAvailable";
// //import AdminHome from "./AdminHome";

// export default function AdminDashboard() {
//   const [activePage, setActivePage] = useState("home");
//   const navigate = useNavigate();

//   // ✅ LOGOUT FUNCTION
//   const logout = () => {
//     localStorage.removeItem("token"); // clear auth
//     navigate("/login");               // redirect to login
//   };

//   const renderPage = () => {
//    // if (activePage === "home") return <AdminHome/>; 
//     if (activePage === "manageCars") return <ManageCars />;
//      if (activePage === "allBookings") return <PartnerBookingHistory />;
//     if (activePage === "revenue") return <PartnerRevenuePage />;
//     // if (activePage === "availCar") return <MakeCarAvailable/>;
//     return null;
//   };

//   return (
//     <div style={styles.wrapper}>
//       {/* TOP NAVBAR */}
//       <div style={styles.navbar}>
//         <div style={styles.logo}>🚗 Partner Panel</div>

//         <button style={styles.navBtn} onClick={logout}>
//           Logout
//         </button>
//       </div>

//       <div style={styles.layout}>
//         {/* SIDEBAR */}
//         <div style={styles.sidebar}>
//           <h3 style={styles.sideTitle}>Menu</h3>

//           <button style={styles.sideBtn} onClick={() => setActivePage("home")}>
//             🏠 Dashboard
//           </button>

//           <button style={styles.sideBtn} onClick={() => setActivePage("manageCars")}>
//             🚘 Manage Cars
//           </button>

//           <button style={styles.sideBtn} onClick={() => setActivePage("allBookings")}>
//             📑 All Bookings
//           </button>

//           <button style={styles.sideBtn} onClick={() => setActivePage("revenue")}>
//             💰 Revenue
//           </button>

//           {/* <button style={styles.sideBtn} onClick={() => setActivePage("availCar")}>
//             🚘 Make Car Available
//           </button> */}
//         </div>

//         {/* CONTENT */}
//         <div style={styles.content}>{renderPage()}</div>
//       </div>
//     </div>
//   );
// }

// /* ---------------- CSS ---------------- */
// const styles = {
//   wrapper: {
//     height: "100vh",
//     backgroundColor: "#f3f4f6",
//     display: "flex",
//     flexDirection: "column"
//   },
//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "15px 25px",
//     backgroundColor: "#111827",
//     color: "white"
//   },
//   navBtn: {
//     padding: "8px 16px",
//     backgroundColor: "#ef4444",
//     border: "none",
//     borderRadius: "6px",
//     color: "white",
//     cursor: "pointer",
//     fontWeight: "bold"
//   },
//   layout: {
//     display: "flex",
//     height: "100%"
//   },
//   sidebar: {
//     width: "220px",
//     backgroundColor: "#1f2937",
//     color: "white",
//     padding: "20px",
//     display: "flex",
//     flexDirection: "column"
//   },
//   sideTitle: {
//     fontSize: "18px",
//     marginBottom: "15px",
//     color: "#9ca3af"
//   },
//   sideBtn: {
//     backgroundColor: "#374151",
//     color: "white",
//     padding: "12px",
//     border: "none",
//     borderRadius: "6px",
//     marginBottom: "12px",
//     cursor: "pointer",
//     fontSize: "16px",
//     textAlign: "left"
//   },
//   content: {
//     flex: 1,
//     padding: "30px",
//     backgroundColor: "white",
//     overflowY: "auto"
//   }
// };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ManageCars from "./ManageCars";
import PartnerBookingHistory from "./PartnerBookingHistory";
import PartnerRevenuePage from "./PartnerRevenuePage";

export default function PartnerDashboard() {
  const [activePage, setActivePage] = useState("home");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderPage = () => {
    if (activePage === "manageCars") return <ManageCars />;
    if (activePage === "bookings") return <PartnerBookingHistory />;
    if (activePage === "revenue") return <PartnerRevenuePage />;
    return (
      <section style={styles.hero}>
        <div style={styles.overlay}>
          <h1 style={styles.heroTitle}>Partner Dashboard</h1>
          <p style={styles.heroText}>
            Manage your cars, bookings and revenue easily
          </p>

          <div style={styles.actionBox}>
            <button
              style={styles.actionBtn}
              onClick={() => setActivePage("manageCars")}
            >
              🚘 Manage Cars
            </button>

            <button
              style={styles.actionBtn}
              onClick={() => setActivePage("bookings")}
            >
              📑 My Bookings
            </button>

            <button
              style={styles.actionBtn}
              onClick={() => setActivePage("revenue")}
            >
              💰 Revenue
            </button>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div>
      {/* ================= NAVBAR ================= */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>MYCARZ</h2>

        <ul style={styles.navLinks}>
          <li
            style={activePage === "home" ? styles.activeLink : {}}
            onClick={() => setActivePage("home")}
          >
            Home
          </li>

          <li
            style={activePage === "manageCars" ? styles.activeLink : {}}
            onClick={() => setActivePage("manageCars")}
          >
            Manage Cars
          </li>

          <li
            style={activePage === "bookings" ? styles.activeLink : {}}
            onClick={() => setActivePage("bookings")}
          >
            My Bookings
          </li>

          <li
            style={activePage === "revenue" ? styles.activeLink : {}}
            onClick={() => setActivePage("revenue")}
          >
            Revenue
          </li>
        </ul>

        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </nav>

      {/* ================= CONTENT ================= */}
      {renderPage()}
    </div>
  );
}

/* ======================= STYLES ======================= */

const styles = {
  navbar: {
    height: "70px",
    backgroundColor: "#1e1b4b",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
    color: "white"
  },

  logo: {
    fontWeight: "bold",
    fontSize: "22px"
  },

  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "30px",
    fontSize: "16px",
    cursor: "pointer"
  },

  activeLink: {
    borderBottom: "3px solid #6366f1",
    paddingBottom: "5px"
  },

  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  hero: {
    height: "calc(100vh - 70px)",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1502877338535-766e1452684a')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },

  overlay: {
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.55)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "80px"
  },

  heroTitle: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "10px"
  },

  heroText: {
    fontSize: "20px",
    marginBottom: "35px",
    maxWidth: "500px"
  },

  actionBox: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "14px",
    display: "flex",
    gap: "15px",
    maxWidth: "700px"
  },

  actionBtn: {
    flex: 1,
    backgroundColor: "#4f46e5",
    border: "none",
    color: "white",
    padding: "14px",
    fontSize: "16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};
