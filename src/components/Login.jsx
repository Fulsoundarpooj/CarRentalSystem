// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({ username: "", password: "", role: "USER" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submitLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     const loginUrl =
//       form.role === "ADMIN"
//         ? "http://localhost:8080/admin/login"
//         :form.role === "USER" ? "http://localhost:8080/user/login" 
//         : "http://localhost:8080/partner/login";

//     const authHeader = "Basic " + btoa(`${form.username}:${form.password}`);

//     try {
//       const res = await axios.post(
//         loginUrl,
//         {},
//         { headers: { Authorization: authHeader } }
        
//       );

//       // Save values
//       localStorage.setItem("token", authHeader);
//       localStorage.setItem("role", res.data.role);
//       localStorage.setItem("username", res.data.username);
//       localStorage.setItem("userId", res.data.userId);

//       // Redirect based on role
//       if (res.data.role === "ADMIN") navigate("/admin/dashboard");
//       if (res.data.role === "USER") navigate("/user/dashboard");
//       if (res.data.role === "PARTNER") navigate("/partner/dashboard");

//     } catch (err) {
//       setError(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <form style={styles.form} onSubmit={submitLogin}>
//         <h2 style={styles.title}>Login</h2>

//         {error && <p style={styles.error}>{error}</p>}

//         {/* ROLE Selector */}
//         <select name="role" style={styles.input} onChange={handleChange}>
//           <option value="USER">User</option>
//           <option value="ADMIN">Admin</option>
//            <option value="PARTNER">Partner</option>
//         </select>

//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           style={styles.input}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           style={styles.input}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit" style={styles.button}>Login</button>

//         <p style={{ marginTop: "10px" }}>
//           Don't have an account? <a href="/register">Register</a>
//         </p>
//         <p style={{ marginTop: "10px" }}>
//           Don't have an account? <a href="/partnerRegister">Register Partner</a>
//         </p>
//       </form>
//     </div>
//   );
// }

// /* CSS */
// const styles = {
//   container: {
//     height: "100vh",
//     background: "#f3f4f6",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   form: {
//     width: "350px",
//     padding: "30px",
//     background: "white",
//     borderRadius: "10px",
//     boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//   },
//   title: {
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   input: {
//     width: "100%",
//     padding: "12px",
//     marginBottom: "12px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     width: "100%",
//     padding: "12px",
//     background: "#111827",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   error: {
//     background: "#fee2e2",
//     padding: "10px",
//     borderRadius: "6px",
//     color: "#b91c1c",
//     marginBottom: "10px",
//     textAlign: "center",
//   },
// };

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "", role: "USER" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    setError("");

    const loginUrl =
      form.role === "ADMIN"
        ? "http://localhost:8080/admin/login"
        : form.role === "USER"
        ? "http://localhost:8080/user/login"
        : "http://localhost:8080/partner/login";

    const authHeader = "Basic " + btoa(`${form.username}:${form.password}`);

    try {
      const res = await axios.post(
        loginUrl,
        {},
        { headers: { Authorization: authHeader } }
      );

      localStorage.setItem("token", authHeader);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("userId", res.data.userId);

      if (res.data.role === "ADMIN") navigate("/admin/dashboard");
      if (res.data.role === "USER") navigate("/user/dashboard");
      if (res.data.role === "PARTNER") navigate("/partner/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={submitLogin}>
        <h2>Login</h2>

        {error && <div className="error">{error}</div>}

        <select name="role" onChange={handleChange}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="PARTNER">Partner</option>
        </select>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <p>
          Don&apos;t have an account? <a href="/register">Register</a>
        </p>
        <p>
          Want to become Partner? <a href="/partnerRegister">Register Partner</a>
        </p>
      </form>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg,#020617,#0f172a);
          color: white;
        }

        .login-form {
          width: 360px;
          padding: 34px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(16px);
          border-radius: 18px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.35);
        }

        .login-form h2 {
          text-align: center;
          margin-bottom: 24px;
          font-size: 26px;
          font-weight: 700;
        }

        .login-form input,
        .login-form select {
          width: 100%;
          padding: 12px 14px;
          margin-bottom: 14px;
          border-radius: 10px;
          border: none;
          outline: none;
          font-size: 14px;
          background: rgba(255,255,255,0.15);
          color: white;
        }

        .login-form input::placeholder {
          color: #cbd5f5;
        }

        .login-form select option {
          color: black;
        }

        .login-form button {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          background: #2563eb;
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }

        .login-form button:hover {
          background: #1d4ed8;
        }

        .login-form p {
          margin-top: 12px;
          font-size: 13px;
          text-align: center;
          color: #c7d2fe;
        }

        .login-form a {
          color: #93c5fd;
          text-decoration: none;
          font-weight: 600;
        }

        .error {
          background: rgba(239,68,68,0.2);
          color: #fecaca;
          padding: 10px;
          border-radius: 10px;
          text-align: center;
          margin-bottom: 14px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
