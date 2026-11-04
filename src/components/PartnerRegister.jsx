import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PartnerRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
   contactno: "",
   password: "",
   confirmPassword: "",
   gender:""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:8080/partner/register", form);
      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={submitRegister}>
        <h2 style={styles.title}>Register</h2>

        {message && <p style={styles.msg}>{message}</p>}
   <input
  type="text"
  name="name"
  placeholder="Full Name"
  style={styles.input}
  onChange={handleChange}
  required
/>

<input
  type="text"
  name="username"
  placeholder="Username"
  style={styles.input}
  onChange={handleChange}
  required
/>

<input
  type="email"
  name="email"
  placeholder="Email"
  style={styles.input}
  onChange={handleChange}
  required
/>

<input
  type="number"
  name="contactno"
  placeholder="Contact Number"
  style={styles.input}
  onChange={handleChange}
  required
/>

<input
  type="password"
  name="password"
  placeholder="Password"
  style={styles.input}
  onChange={handleChange}
  required
/>

<input
  type="password"
  name="confirmPassword"
  placeholder="Confirm Password"
  style={styles.input}
  onChange={handleChange}
  required
/>

<select
          name="gender"
          style={styles.input}
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "350px",
    padding: "30px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#111827",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  msg: {
    background: "#e0f2fe",
    padding: "10px",
    borderRadius: "6px",
    color: "#0369a1",
    marginBottom: "10px",
    textAlign: "center",
  },
};
