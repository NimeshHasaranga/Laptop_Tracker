import { useEffect, useState } from "react";
import { getDashboardApi } from "../api/laptops";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function UserDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    getDashboardApi().then(response => {
      setData(response);
      setLoading(false);
    }); 
  }, []);

  if (loading) return <div className="card">Loading dashboard...</div>;
  if (!data) return <div className="card">Error loading dashboard</div>;

  const { totals, warranties, softwareInstalled, charts } = data;

  // Prepare chart data for user view
  const statusData = [
    { name: 'Received', value: totals.received, color: '#FF8042' },
    { name: 'In Setup', value: totals.inSetup, color: '#FFBB28' },
    { name: 'Configured', value: totals.configured, color: '#00C49F' },
    { name: 'Handed Over', value: totals.handed, color: '#0088FE' }
  ];

  const monthlyData = charts.monthlyAdditions.map(item => ({
    month: new Date(item._id.year, item._id.month - 1).toLocaleString('default', { month: 'short' }),
    laptops: item.count
  }));

  const softwareData = charts.softwareStats.slice(0, 6).map(item => ({
    name: item._id.length > 15 ? item._id.substring(0, 15) + '...' : item._id,
    installed: item.installed,
    pending: item.total - item.installed,
    percentage: item.total > 0 ? Math.round((item.installed / item.total) * 100) : 0
  }));

  const warrantyData = [
    { name: 'Expiring in 30 days', value: warranties.exp30, color: '#FF0000' },
    { name: 'Expiring in 60 days', value: warranties.exp60 - warranties.exp30, color: '#FF8042' },
    { name: 'Expiring in 90 days', value: warranties.exp90 - warranties.exp60, color: '#FFBB28' },
    { name: 'Good Status', value: totals.total - warranties.exp90, color: '#00C49F' }
  ].filter(item => item.value > 0);

  return (
    <div className="user-dashboard">
      {/* KPI Cards */}
      <div className="kpis">
        <div className="kpi kpi-blue">
          <div>Total Laptops</div>
          <h2>{totals.total}</h2>
        </div>
        <div className="kpi kpi-green">
          <div>Configured</div>
          <h2>{totals.configured}</h2>
        </div>
        <div className="kpi kpi-orange">
          <div>Pending Setup</div>
          <h2>{totals.received + totals.inSetup}</h2>
        </div>
        <div className="kpi kpi-purple">
          <div>Software Installed</div>
          <h2>{softwareInstalled}</h2>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Status Overview */}
        <div className="card chart-container">
          <h3>Current Status Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="card chart-container">
          <h3>Laptops by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={charts.departmentDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend */}
        <div className="card chart-container full-width">
          <h3>Laptop Addition Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="laptops" stroke="#00C49F" fill="#00C49F" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Software Installation Progress */}
        <div className="card chart-container">
          <h3>Software Installation Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={softwareData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'percentage') return [`${value}%`, 'Installation Rate'];
                  return [value, name];
                }}
              />
              <Bar dataKey="percentage" fill="#00C49F" name="Installation Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Warranty Status */}
        <div className="card chart-container">
          <h3>Warranty Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={warrantyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => value > 0 ? `${name}: ${value}` : ''}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {warrantyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Laptop Makes */}
        <div className="card chart-container">
          <h3>Laptops by Make</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={charts.makeDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884D8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="quick-stats">
        <div className="card">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <div className="stat-item">
              <span className="stat-label">Laptops Needing Setup:</span>
              <span className="stat-value warning">{totals.received + totals.inSetup}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Ready for Handover:</span>
              <span className="stat-value success">{totals.configured}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Warranty Expiring Soon:</span>
              <span className="stat-value danger">{warranties.exp30}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .user-dashboard {
          padding: 20px;
        }
        
        .kpis {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .kpi {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          text-align: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .kpi:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .kpi-blue {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .kpi-green {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          color: white;
        }
        
        .kpi-purple {
          background: linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%);
          color: white;
        }
        
        .kpi-orange {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
        }
        
        .kpi-blue div,
        .kpi-green div,
        .kpi-purple div,
        .kpi-orange div {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          margin-bottom: 10px;
        }
        
        .kpi-blue h2,
        .kpi-green h2,
        .kpi-purple h2,
        .kpi-orange h2 {
          color: white;
          margin: 0;
          font-size: 32px;
        }
        
        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .chart-container {
          min-height: 350px;
        }
        
        .chart-container.full-width {
          grid-column: 1 / -1;
        }
        
        .chart-container h3 {
          margin-bottom: 20px;
          color: #333;
        }
        
        .quick-stats {
          margin-top: 30px;
        }
        
        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 6px;
          border-left: 4px solid #0088FE;
        }
        
        .stat-label {
          font-weight: 500;
          color: #333;
        }
        
        .stat-value {
          font-weight: bold;
          font-size: 18px;
        }
        
        .stat-value.warning {
          color: #FFBB28;
        }
        
        .stat-value.success {
          color: #00C49F;
        }
        
        .stat-value.danger {
          color: #FF8042;
        }
        
        @media (max-width: 768px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }
          
          .kpis {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}
