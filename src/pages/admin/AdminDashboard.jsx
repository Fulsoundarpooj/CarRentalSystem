// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import ManageCars from "../ManageCars";
// import AllBookings from "../AllBookings";
// import AdminRevenuePage from "./AdminRevenuePage";
// import MakeCarAvailable from "./MakeCarAvailable";
// import AdminHome from "./AdminHome";
// import VerifyCars from "./VerifyCars";

// export default function AdminDashboard() {
//   const [activePage, setActivePage] = useState("home");
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const renderPage = () => {
//     if (activePage === "manageCars") return <ManageCars />;
//     if (activePage === "allBookings") return <AllBookings />;
//     if (activePage === "addCar") return <VerifyCars />;
//     if (activePage === "revenue") return <AdminRevenuePage />;
//     if (activePage === "availCar") return <MakeCarAvailable />;
//     return <AdminHome />;
//   };

//   return (
//     <div>
//       {/* ================= NAVBAR ================= */}
//       <nav style={styles.navbar}>
//         <h2 style={styles.logo}>MYCARZ • Admin</h2>

//         <ul style={styles.navLinks}>
//           <li
//             style={activePage === "home" ? styles.activeLink : {}}
//             onClick={() => setActivePage("home")}
//           >
//             Home
//           </li>

//           <li
//             style={activePage === "manageCars" ? styles.activeLink : {}}
//             onClick={() => setActivePage("manageCars")}
//           >
//             Manage Cars
//           </li>

//           <li
//             style={activePage === "allBookings" ? styles.activeLink : {}}
//             onClick={() => setActivePage("allBookings")}
//           >
//             All Bookings
//           </li>

//           <li
//             style={activePage === "addCar" ? styles.activeLink : {}}
//             onClick={() => setActivePage("addCar")}
//           >
//             Add Car To System
//           </li>

//           <li
//             style={activePage === "revenue" ? styles.activeLink : {}}
//             onClick={() => setActivePage("revenue")}
//           >
//             Revenue
//           </li>

//           <li
//             style={activePage === "availCar" ? styles.activeLink : {}}
//             onClick={() => setActivePage("availCar")}
//           >
//             Make Car Available
//           </li>
//         </ul>

//         <button style={styles.logoutBtn} onClick={logout}>
//           Logout
//         </button>
//       </nav>

//       {/* ================= CONTENT ================= */}
//       {activePage === "home" ? (
//         <section style={styles.hero}>
//           <div style={styles.overlay}>
//             <h1 style={styles.heroTitle}>Admin Dashboard</h1>
//             <p style={styles.heroText}>
//               Control cars, partners, bookings and revenue from one place
//             </p>

//             <div style={styles.actionBox}>
//               <button
//                 style={styles.actionBtn}
//                 onClick={() => setActivePage("manageCars")}
//               >
//                 🚘 Manage Cars
//               </button>

//               <button
//                 style={styles.actionBtn}
//                 onClick={() => setActivePage("allBookings")}
//               >
//                 📑 All Bookings
//               </button>

//               <button
//                 style={styles.actionBtn}
//                 onClick={() => setActivePage("revenue")}
//               >
//                 💰 Revenue
//               </button>
//             </div>
//           </div>
//         </section>
//       ) : (
//         <div style={styles.pageContent}>{renderPage()}</div>
//       )}
//     </div>
//   );
// }

// /* ======================= STYLES ======================= */

// const styles = {
//   navbar: {
//     height: "70px",
//     backgroundColor: "#1e1b4b",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "0 40px",
//     color: "white"
//   },

//   logo: {
//     fontWeight: "bold",
//     fontSize: "22px"
//   },

//   navLinks: {
//     listStyle: "none",
//     display: "flex",
//     gap: "26px",
//     fontSize: "16px",
//     cursor: "pointer"
//   },

//   activeLink: {
//     borderBottom: "3px solid #6366f1",
//     paddingBottom: "6px"
//   },

//   logoutBtn: {
//     backgroundColor: "#ef4444",
//     color: "white",
//     border: "none",
//     padding: "8px 16px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontWeight: "bold"
//   },

//   hero: {
//     height: "calc(100vh - 70px)",
//     backgroundImage:
//       "url('https://images.unsplash.com/photo-1549921296-3b4a4c1c2c0b')",
//     backgroundSize: "cover",
//     backgroundPosition: "center"
//   },

//   overlay: {
//     height: "100%",
//     backgroundColor: "rgba(0,0,0,0.6)",
//     color: "white",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     paddingLeft: "80px"
//   },

//   heroTitle: {
//     fontSize: "48px",
//     fontWeight: "bold",
//     marginBottom: "10px"
//   },

//   heroText: {
//     fontSize: "20px",
//     marginBottom: "35px",
//     maxWidth: "550px"
//   },

//   actionBox: {
//     backgroundColor: "white",
//     padding: "20px",
//     borderRadius: "14px",
//     display: "flex",
//     gap: "15px",
//     maxWidth: "750px"
//   },

//   actionBtn: {
//     flex: 1,
//     backgroundColor: "#4f46e5",
//     border: "none",
//     color: "white",
//     padding: "14px",
//     fontSize: "16px",
//     borderRadius: "10px",
//     cursor: "pointer",
//     fontWeight: "bold"
//   },

//   pageContent: {
//     padding: "30px",
//     minHeight: "calc(100vh - 70px)",
//     backgroundColor: "#f8fafc"
//   }
// };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ManageCars from "../ManageCars";
import AllBookings from "../AllBookings";
import AdminRevenuePage from "./AdminRevenuePage";
import MakeCarAvailable from "./MakeCarAvailable";
import AdminHome from "./AdminHome";
import VerifyCars from "./VerifyCars";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("home");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderPage = () => {
    if (activePage === "manageCars") return <ManageCars />;
    if (activePage === "allBookings") return <AllBookings />;
    if (activePage === "addCar") return <VerifyCars />;
    if (activePage === "revenue") return <AdminRevenuePage />;
    if (activePage === "availCar") return <MakeCarAvailable />;
    return <AdminHome />;
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Segoe UI", sans-serif;
        }

        body {
          background: #f9fafb;
        }

        .navbar {
          height: 72px;
          background: #1e1b4b;
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
        }

        .logo {
          font-size: 22px;
          font-weight: bold;
        }

        .nav-links {
          display: flex;
          gap: 24px;
        }

        .nav-links span {
          cursor: pointer;
          font-size: 16px;
        }

        .nav-links span.active {
          border-bottom: 3px solid #6366f1;
          padding-bottom: 6px;
        }

        .nav-links span:hover {
          text-decoration: underline;
        }

        .nav-actions button {
          padding: 8px 16px;
          background: #ef4444;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
        }

        .hero {
          height: 420px;
          background:
            linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
            url("https://images.unsplash.com/photo-1542362567-b07e54358753");
          background-size: cover;
          background-position: center;
          color: white;
          padding: 80px;
        }

        .hero h1 {
          font-size: 42px;
          max-width: 600px;
          margin-bottom: 20px;
        }

        .hero p {
          font-size: 18px;
          max-width: 520px;
          margin-bottom: 30px;
          opacity: 0.9;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
        }

        .hero-actions button {
          padding: 14px 28px;
          background: #4f46e5;
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .hero-actions button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(79,70,229,0.4);
        }

        .page-content {
          padding: 40px;
          background: white;
          min-height: calc(100vh - 72px);
        }
      `}</style>

      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">MYCARZ • ADMIN</div>

        <div className="nav-links">
          {[
            ["home", "Home"],
            ["manageCars", "Manage Cars"],
            ["allBookings", "Bookings"],
            ["addCar", "Add Car"],
            ["revenue", "Revenue"],
            ["availCar", "Availability"]
          ].map(([key, label]) => (
            <span
              key={key}
              className={activePage === key ? "active" : ""}
              onClick={() => setActivePage(key)}
            >
              {label}
            </span>
          ))}
        </div>

        <div className="nav-actions">
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {/* HERO */}
      {activePage === "home" ? (
        <div className="hero">
          <h1>Admin Control Center</h1>
          <p>
            Manage vehicles, verify listings, track bookings and monitor revenue
            with full control.
          </p>

          <div className="hero-actions">
            <button onClick={() => setActivePage("manageCars")}>
              Manage Cars
            </button>
            <button onClick={() => setActivePage("allBookings")}>
              View Bookings
            </button>
            <button onClick={() => setActivePage("revenue")}>
              Revenue
            </button>
          </div>
        </div>
      ) : (
        <div className="page-content">{renderPage()}</div>
      )}
    </>
  );
}
