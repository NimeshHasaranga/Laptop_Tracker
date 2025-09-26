import { Link } from "react-router-dom";
import logo from "../pictures/logo.png"; // ✅ replace with your logo path

const getToken = () => localStorage.getItem("token");
const getRole = () => localStorage.getItem("role") || "staff";

export default function Navbar() {
  const token = getToken();

  return (
    <header style={styles.navbar}>
      {/* Left: Logo */}
      <div style={styles.logoWrapper}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <span style={styles.appName}>Laptop Tracker</span>
      </div>

      {/* Center: Links */}
      <nav style={styles.links}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/laptops" style={styles.link}>Laptops</Link>
        <Link to="/laptops/new" style={styles.link}>Add New</Link>
        {getRole() === "admin" && (
          <Link to="/admin/users" style={styles.link}>Users</Link>
        )}
      </nav>

      {/* Right: Logout */}
      {token && (
        <button
          style={styles.logout}
          onClick={() => {
            localStorage.clear();
            window.location = "/login";
          }}
        >
          Logout
        </button>
      )}
    </header>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    background: "#1e293b", // dark blue
    borderBottom: "1px solid #334155",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    width: "32px",
    height: "32px",
  },
  appName: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#f1f5f9",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.2s",
  },
  logout: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background 0.3s",
  },
};
