// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function AllBookings() {
//   const [list, setList] = useState([]);

//   const load = () => {
//     axios.get("http://localhost:8080/admin/allBookings")
//       .then(res => setList(res.data));
//   };

//   useEffect(() => load(), []);

//   const updateStatus = (id, status) => {
//     axios.put(`http://localhost:8080/admin/booking/status/${id}?status=${status}`)
//       .then(() => load());
//   };

//   const downloadDocs = (id) => {
//     axios.get(`http://localhost:8080/admin/download/all/${id}`, {
//       responseType: "blob"
//     }).then((res) => {
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "Documents.zip";
//       a.click();
//     });
//   };

//   return (
//     <div className="container mt-4">
//       <h2>All Bookings</h2>

//       {list.map(b => (
//         <div key={b.id} className="card p-3 mt-3">
//           {/* <p>#Booking {b.id}</p> */}
//           <p>Customer Name:- {b.customerName}</p>
//           <p>From Date:-  {b.startDate} To End Date:- {b.endDate} </p>
//           <p>City:- {b.city}</p>
//           <p>Car Name:- {b.carName}</p>



//           <button onClick={() => updateStatus(b.id, "APPROVED")}
//             className="btn btn-success">Approve</button>

//           <button onClick={() => updateStatus(b.id, "REJECTED")}
//             className="btn btn-warning">Reject</button>

//           <button onClick={() => downloadDocs(b.id)}
//             className="btn btn-info">Download Docs</button>
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllBookings() {
  const [list, setList] = useState([]);

  const load = () => {
    axios
      .get("http://localhost:8080/admin/allBookings")
      .then(res => setList(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = (id, status) => {
    axios
      .put(`http://localhost:8080/admin/booking/status/${id}?status=${status}`)
      .then(() => load());
  };

  const downloadDocs = (id) => {
    axios
      .get(`http://localhost:8080/admin/download/all/${id}`, {
        responseType: "blob"
      })
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "Documents.zip";
        a.click();
      });
  };

  const pending = list.filter(b => b.status === "PENDING-APPROVAL");
  const approved = list.filter(b => b.status === "APPROVED");
  const rejected = list.filter(b => b.status === "REJECTED");
  const booked = list.filter(b => b.status === "BOOKED");

  const renderRows = (data, actionsEnabled) => (
    <>
      {data.length === 0 && (
        <p className="empty">No records found.</p>
      )}

      {data.map(b => (
        <div key={b.id} className="row">
          <div className="col">
            <div className="id">#{b.id}</div>
            <div className="sub">{b.customerName}</div>
          </div>

          <div className="col">
            <div className="main">{b.carName}</div>
            <div className="sub">{b.city}</div>
          </div>

          <div className="col">
            <div className="sub">From</div>
            <div className="main">{b.startDate}</div>
          </div>

          <div className="col">
            <div className="sub">To</div>
            <div className="main">{b.endDate}</div>
          </div>

          <div className={`status ${b.status.toLowerCase()}`}>
            {b.status}
          </div>

          <div className="actions">
            <button
              disabled={!actionsEnabled}
              className="approve"
              onClick={() => updateStatus(b.id, "APPROVED")}
            >
              Approve
            </button>

            <button
              disabled={!actionsEnabled}
              className="reject"
              onClick={() => updateStatus(b.id, "REJECTED")}
            >
              Reject
            </button>

            <button
              disabled={!actionsEnabled}
              className="download"
              onClick={() => downloadDocs(b.id)}
            >
              Docs
            </button>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <>
      <style>{`
        .page {
          min-height: 100vh;
          background: linear-gradient(135deg,#020617,#0f172a);
          padding: 40px;
          color: white;
        }

        h2 {
          margin-bottom: 30px;
        }

        h3 {
          margin: 30px 0 16px;
          color: #a5b4fc;
        }

        .row {
          display: grid;
          grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr 2fr;
          gap: 16px;
          padding: 18px;
          margin-bottom: 12px;
          border-radius: 18px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          align-items: center;
        }

        .col .main {
          font-weight: 600;
        }

        .col .sub {
          font-size: 13px;
          color: #9ca3af;
        }

        .id {
          font-weight: 700;
        }

        .status {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-align: center;
        }

        .status.pending-approval {
          background: #facc15;
          color: #1f2933;
        }

        .status.approved {
          background: #44db7cff;
          color: #052e16;
        }

        .status.rejected {
          background: #d44343ff;
          color: #0c0d0eff;
        }

        .status.booked {
          background: #3b82f6;
          color: #1f2933;
        }

        .actions {
          display: flex;
          gap: 10px;
        }

        .actions button {
          padding: 10px 14px;
          border-radius: 12px;
          border: none;
          font-weight: 600;
          cursor: pointer;
        }

        .approve {
          background: #22c55e;
        }

        .reject {
          background: #ef4444;
        }

        .download {
          background: #0ea5e9;
        }

        button:disabled {
          background: #64748b;
          cursor: not-allowed;
        }

        .empty {
          color: #9ca3af;
          font-style: italic;
          margin-bottom: 20px;
        }

        @media(max-width:900px) {
          .row {
            grid-template-columns: 1fr;
          }
          .actions {
            justify-content: space-between;
          }
        }
      `}</style>

      <div className="page">
        <h2>Admin Booking Management</h2>

        <h3>Pending Approval</h3>
        {renderRows(pending, true)}

        <h3>Approved</h3>
        {renderRows(approved, false)}

        <h3>Rejected</h3>
        {renderRows(rejected, false)}

        <h3>Booked</h3>
        {renderRows(booked, false)}
      </div>
    </>
  );
}
