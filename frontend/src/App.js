import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import LaptopList from "./pages/LaptopList";
import LaptopForm from "./pages/LaptopForm";
import AdminUsers from "./pages/AdminUsers";
import Navbar from "./components/Navbar"; // ✅ import new Navbar

const getToken = () => localStorage.getItem("token");
const getRole = () => localStorage.getItem("role") || "staff";

function Layout({ children }) {
  return (
    <div>
      <Navbar />  {/* ✅ replaced inline nav */}
      <div style={{ height: 16 }} />
      {children}
    </div>
  );
}

function RequireAuth({ children }) {
  return getToken() ? children : <Navigate to="/login" replace />;
}

function RequireAdmin({ children }) {
  return getToken() && getRole() === "admin" ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout><Dashboard /></Layout>
          </RequireAuth>
        }
      />
      <Route
        path="/laptops"
        element={
          <RequireAuth>
            <Layout><LaptopList /></Layout>
          </RequireAuth>
        }
      />
      <Route
        path="/laptops/new"
        element={
          <RequireAuth>
            <Layout><LaptopForm /></Layout>
          </RequireAuth>
        }
      />
      <Route
        path="/admin/users"
        element={
          <RequireAdmin>
            <Layout><AdminUsers /></Layout>
          </RequireAdmin>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
