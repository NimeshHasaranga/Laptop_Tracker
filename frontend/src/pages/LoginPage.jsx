// import { useState } from "react";
// import { loginApi } from "../api/auth";

// export default function LoginPage() {
//   const [form, setForm] = useState({ username: "", taNumber: "" });
//   const [error, setError] = useState("");

//   const submit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const data = await loginApi(form);
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);
//       localStorage.setItem("username", data.username);
//       window.location = "/";
//     } catch (e) {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card" style={{ maxWidth: 420, margin: "80px auto" }}>
//         <h2>Login</h2>
//         <form onSubmit={submit} className="row">
//           {error && <div style={{ color: "#ef4444" }}>{error}</div>}
//           <div className="field">
//             <label>Username</label>
//             <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
//           </div>
//           <div className="field">
//             <label>TA Number</label>
//             <input type="password" value={form.taNumber} onChange={(e) => setForm({ ...form, taNumber: e.target.value })} />
//           </div>
//           <button className="btn" type="submit">Sign In</button>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState } from "react"; 
import { loginApi } from "../api/auth";
import logo from "../pictures/logo.png"; // replace with your actual logo path

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", taNumber: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginApi(form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);
      window.location = "/";
    } catch {
      setError("Invalid username or TA number");
    }
  };

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoWrapper}>
          <img src={logo} alt="App Logo" style={styles.logo} />
        </div>

        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to manage your laptops</p>

        <form onSubmit={submit} style={styles.form}>
          {error && <div style={styles.error}>{error}</div>}

          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="TA Number"
            value={form.taNumber}
            onChange={(e) => setForm({ ...form, taNumber: e.target.value })}
            style={styles.input}
          />

          <div style={styles.options}>
            <label style={styles.remember}>
              <input type="checkbox" style={{ marginRight: 6 }} /> Remember me
            </label>
            <a href="#" style={styles.link}>
              Forgot Password?
            </a>
          </div>

          <button type="submit" style={styles.button}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  bg: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e40af, #1e3a8a)", // darker blue gradient
    fontFamily: "Inter, Arial, sans-serif",
    padding: "10px",
  },
  card: {
    background: "#0f172a",
    padding: "40px 32px",
    borderRadius: "16px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
    width: "100%",
    maxWidth: "380px",
    textAlign: "center",
    color: "#f1f5f9",
    animation: "fadeIn 0.5s ease-in-out",
  },
  logoWrapper: {
    width: "80px",
    height: "80px",
    margin: "0 auto 16px",
    borderRadius: "50%",
    background: "#1e293b",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },
  logo: { maxWidth: "50px", maxHeight: "50px" },
  title: { marginBottom: "8px", fontSize: "22px", fontWeight: "600" },
  subtitle: {
    marginBottom: "20px",
    fontSize: "14px",
    color: "#94a3b8",
  },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "#f1f5f9",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease-in-out",
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "13px",
    marginTop: "-6px",
  },
  remember: { display: "flex", alignItems: "center", fontSize: "13px" },
  link: {
    color: "#3b82f6",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
  },
  error: {
    color: "#ef4444",
    fontSize: "14px",
    textAlign: "center",
  },
};
