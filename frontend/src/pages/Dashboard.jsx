import { useEffect, useState } from "react";
import { getDashboardApi } from "../api/laptops";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const getRole = () => localStorage.getItem("role") || "staff";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const loadDashboard = async () => {
      try {
        const response = await getDashboardApi();
        setData(response);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboard();
  }, []);

  if (loading) return <div className="card">Loading dashboard...</div>;
  if (!data) return <div className="card">Error loading dashboard</div>;

  // Render appropriate dashboard based on user role
  if (getRole() === "admin") {
    return <AdminDashboard />;
  } else {
    return <UserDashboard />;
  }
}
