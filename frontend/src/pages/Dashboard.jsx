import { useEffect, useState } from "react";
import { getDashboardApi } from "../api/laptops";

export default function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => { getDashboardApi().then(setData); }, []);
  if (!data) return <div className="card">Loading...</div>;

  const { totals } = data;
  return (
    <>
      <div className="kpis">
        <div className="kpi"><div>Total</div><h2>{totals.total}</h2></div>
        <div className="kpi"><div>Received</div><h2>{totals.received}</h2></div>
        <div className="kpi"><div>In Setup</div><h2>{totals.inSetup}</h2></div>
        <div className="kpi"><div>Configured</div><h2>{totals.configured}</h2></div>
        <div className="kpi"><div>Handed Over</div><h2>{totals.handed}</h2></div>
      </div>
    </>
  );
}
