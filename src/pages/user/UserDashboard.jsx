// import React, { useState } from "react";

// import UserHome from "./UserHome";
// import UserServices from "./UserServices";
// import UserContactUs from "./UserContactUs";

// import BrowseCars from "../BrowseCar";
// import BookingHistory from "../BookingHistory";
// import BookCar from "../BookCar";
// import UploadDocs from "../UploadDocs";
// import MakePayment from "./MakePayment";
// import UserSpendingPage from "./UserSpendingPage";
// import SubmitCarPage from "./SubmitCarPage";
// //import MakePayment from "../MakePayment";

// export default function UserDashboard() {
//   const [activePage, setActivePage] = useState("home");
//   const [selectedCarId, setSelectedCarId] = useState(null);
//   const [selectedBookingId, setSelectedBookingId] = useState(null);
//   const userName = localStorage.getItem("username");

//   const logout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   const renderPage = () => {
//     switch (activePage) {
//       case "home":
//         return <UserHome />;
//       case "browseCars":
//         return (
//           <BrowseCars
//             onBookCar={(carId) => {
//               setSelectedCarId(carId);
//               setActivePage("bookCar");
//             }}
//           />
//         );
//       // case "bookings":
//       //   return <BookingHistory />;
//       case "bookCar":
//         return (
//           <BookCar
//             carId={selectedCarId}
//             onBookingCreated={(bookingId) => {
//               setSelectedBookingId(bookingId);
//               setActivePage("uploadDocs");
//             }}
//           />
//         );
//       case "uploadDocs":
//         return (
//           <UploadDocs
//             bookingId={selectedBookingId}
//             onUploadComplete={() => setActivePage("bookings")}
//           />
//         );

//       case "bookings":
//   return (
//     <BookingHistory
//       onMakePayment={(bookingId) => {
//         setSelectedBookingId(bookingId);
//         setActivePage("payment"); // render MakePayment inside dashboard
//         }}

//         onUploadDocs={(bookingId) => {
//   setSelectedBookingId(bookingId);
//   setActivePage("uploadDocs");  // this will load UploadDocs component
// }}

//     />
//   );

// case "payment":
//   return (
//     <MakePayment
//       bookingId={selectedBookingId}
//       onPaymentComplete={() => setActivePage("bookings")} // go back to bookings
//     />
//   );
//       case "services":
//         return <UserServices />;
//       case "contact":
//         return <UserContactUs />;
//       case "payment":
//         return <MakePayment bookingId={selectedBookingId} />;

//         case "spending":
//   return <UserSpendingPage />;

//   case "submitcar":
//   return <SubmitCarPage/>;

//       default:
//         return <UserHome />;

//     }
//   };

//   return (
//     <div style={styles.wrapper}>
//       {/* Top Navigation */}
//       <div style={styles.navbar}>
//         <div style={styles.logo}>🚗 User Dashboard</div>
//         <div style={styles.topLinks}>
//           <span style={styles.navLink} onClick={() => setActivePage("home")}>Home</span>
//           <span style={styles.navLink} onClick={() => setActivePage("services")}>Services</span>
//           <span style={styles.navLink} onClick={() => setActivePage("contact")}>Contact Us</span>
//           <button style={styles.navBtn} onClick={logout}>Logout<span style={{ marginLeft: "6px", fontWeight: "600" }}></span>{userName}</button>
//         </div>
//       </div>

//       {/* Sidebar + Content */}
//       <div style={styles.layout}>
//         <div style={styles.sidebar}>
//           <h3 style={styles.sideTitle}>Menu</h3>
//           <button style={styles.sideBtn} onClick={() => setActivePage("home")}>🏠 Dashboard</button>
//           <button style={styles.sideBtn} onClick={() => setActivePage("browseCars")}>🚘 Browse Cars</button>
//           <button style={styles.sideBtn} onClick={() => setActivePage("bookings")}>📑 My Bookings</button>
//           <button style={styles.sideBtn} onClick={() => setActivePage("spending")}>💰 My Spending</button>
//           <button style={styles.sideBtn} onClick={() => setActivePage("submitcar")}>🚘 Submit Car</button>
//         </div>

//         <div style={styles.content}>
//           {renderPage()}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ------------ STYLES ------------ */
// const styles = {
//   wrapper: { height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f3f4f6" },
//   navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 25px", backgroundColor: "#111827", color: "white" },
//   logo: { fontSize: "20px", fontWeight: "bold" },
//   topLinks: { display: "flex", gap: "20px", alignItems: "center" },
//   navLink: { color: "white", cursor: "pointer", fontSize: "16px" },
//   navBtn: { padding: "8px 16px", backgroundColor: "#ef4444", border: "none", borderRadius: "6px", color: "white", cursor: "pointer", fontWeight: "bold" },
//   layout: { display: "flex", height: "100%" },
//   sidebar: { width: "220px", backgroundColor: "#1f2937", color: "white", padding: "20px", display: "flex", flexDirection: "column" },
//   sideTitle: { fontSize: "18px", marginBottom: "15px", color: "#9ca3af" },
//   sideBtn: { backgroundColor: "#374151", color: "white", padding: "12px", border: "none", borderRadius: "6px", marginBottom: "12px", cursor: "pointer", fontSize: "16px", textAlign: "left" },
//   content: { flex: 1, padding: "30px", backgroundColor: "white", overflowY: "auto" },
// };

import React, { useState } from "react";

import UserHome from "./UserHome";
import UserServices from "./UserServices";
import UserContactUs from "./UserContactUs";
import BrowseCars from "../BrowseCar";
import BookingHistory from "../BookingHistory";
import BookCar from "../BookCar";
import UploadDocs from "../UploadDocs";
import MakePayment from "./MakePayment";
import UserSpendingPage from "./UserSpendingPage";
import SubmitCarPage from "./SubmitCarPage";
import ViewCar from "./ViewCar";


export default function UserDashboard() {
  const [activePage, setActivePage] = useState("home");
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const userName = localStorage.getItem("username");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <UserHome />;

      // case "browseCars":
      //   return (
      //     <BrowseCars
      //       onBookCar={(carId) => {
      //         setSelectedCarId(carId);
      //         setActivePage("bookCar");
      //       }}
      //     />
      //   );

      case "bookCar":
  return (
    <BookCar
      carId={selectedCarId}
      onBookingCreated={(bookingId) => {
        setSelectedBookingId(bookingId);
        setActivePage("uploadDocs");
      }}
    />
  );


      case "browseCars":
  return (
    <BrowseCars
      onViewDetails={(carId) => {
        setSelectedCarId(carId);
        setActivePage("viewCar");
      }}
    />
  );

// case "viewCar":
//   return <ViewCar carId={selectedCarId} />;


  //       case "viewCar":
  // return (
  //   <ViewCar
  //     carId={selectedCarId}
  //     onBack={() => setActivePage("browseCars")}
  //   />
  // );
 
  case "viewCar":
  return (
    <ViewCar
      carId={selectedCarId}
      onBack={() => setActivePage("browseCars")}
      onBookNow={(carId) => {
        setSelectedCarId(carId);
        setActivePage("bookCar");
      }}
    />
  );


      case "bookCar":
        return (
          <BookCar
            carId={selectedCarId}
            onBookingCreated={(bookingId) => {
              setSelectedBookingId(bookingId);
              setActivePage("uploadDocs");
            }}
          />
        );

      case "uploadDocs":
        return (
          <UploadDocs
            bookingId={selectedBookingId}
            onUploadComplete={() => setActivePage("bookings")}
          />
        );

      case "bookings":
        return (
          <BookingHistory
            onMakePayment={(bookingId) => {
              setSelectedBookingId(bookingId);
              setActivePage("payment");
            }}
            onUploadDocs={(bookingId) => {
              setSelectedBookingId(bookingId);
              setActivePage("uploadDocs");
            }}
          />
        );

      case "payment":
        return (
          <MakePayment
            bookingId={selectedBookingId}
            onPaymentComplete={() => setActivePage("bookings")}
          />
        );

      case "services":
        return <UserServices />;

      case "contact":
        return <UserContactUs />;

      case "spending":
        return <UserSpendingPage />;

      case "submitcar":
        return <SubmitCarPage />;

        default:
        return <UserHome />;
    }
  };

  return (
    <>
      {/* ================= CSS ================= */}
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

        .nav-links span:hover {
          text-decoration: underline;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 15px;
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
          background: linear-gradient(
              rgba(0, 0, 0, 0.45),
              rgba(0, 0, 0, 0.45)
            ),
            url("https://images.unsplash.com/photo-1542362567-b07e54358753");
          background-size: cover;
          background-position: center;
          color: white;
          padding: 80px;
        }

        .hero h1 {
          font-size: 42px;
          max-width: 600px;
          margin-bottom: 30px;
        }

        // .search-box {
        //   background: white;
        //   display: flex;
        //   gap: 10px;
        //   padding: 15px;
        //   border-radius: 12px;
        //   max-width: 900px;
        // }

        // .search-box input {
        //   flex: 1;
        //   padding: 12px;
        //   border-radius: 8px;
        //   border: 1px solid #d1d5db;
        // }

        // .search-box button {
        //   padding: 12px 30px;
        //   background: #4f46e5;
        //   border: none;
        //   color: white;
        //   border-radius: 8px;
        //   cursor: pointer;
        // }

        .page-content {
          padding: 40px;
          background: white;
          min-height: calc(100vh - 72px);
        }
      `}</style>

      {/* ================= NAVBAR ================= */}
      <div className="navbar">
        <div className="logo">MYCARZ</div>

        <div className="nav-links">
          <span onClick={() => setActivePage("home")}>Home</span>
          <span onClick={() => setActivePage("browseCars")}>Fleets</span>
          <span onClick={() => setActivePage("services")}>Services</span>
          <span onClick={() => setActivePage("contact")}>Contact</span>
          <span onClick={() => setActivePage("bookings")}>My Bookings</span>
          <span onClick={() => setActivePage("submitcar")}>Submit Car</span>
        </div>

        <div className="nav-actions">
          <span>{userName}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {/* ================= HERO ================= */}
      {activePage === "home" && (
        <div className="hero">
          <h1>India’s Premium Self Drive Cars</h1>

          {/* <div className="search-box">
            <input placeholder="Location" />
            <input type="datetime-local" />
            <input type="datetime-local" />
            <button onClick={() => setActivePage("browseCars")}>
              Search
            </button>
          </div> */}
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <div className="page-content">{renderPage()}</div>
    </>
  );
}
