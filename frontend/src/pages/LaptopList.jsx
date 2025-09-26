import { useEffect, useState } from "react";
import { listLaptopsApi, updateLaptopApi } from "../api/laptops";

export default function LaptopList() {
  const [query, setQuery] = useState({ q: "", status: "", page: 1, limit: 10 });
  const [data, setData] = useState({ items: [], total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(false);
  const [editRows, setEditRows] = useState({}); // track editable values

  const load = async () => {
    setLoading(true);
    try {
      const res = await listLaptopsApi(query);
      setData(res);

      // initialize editRows with API data
      const rows = {};
      res.items.forEach((it) => {
        rows[it._id] = { ...it };
      });
      setEditRows(rows);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, [query.page, query.limit, query.status]);

  const handleChange = (id, field, value) => {
    setEditRows((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const handleUpdate = async (id) => {
    try {
      await updateLaptopApi(id, editRows[id]);
      alert("✅ Laptop updated successfully");
      load();
    } catch (e) {
      alert("❌ Update failed: " + (e.response?.data?.message || e.message));
    }
  };

  return (
    <div className="card">
      <h2>Laptops</h2>
      <div className="row" style={{ marginBottom: 10, gap: 8 }}>
        <input
          placeholder="Search serial / model / asset / user"
          value={query.q}
          onChange={(e) => setQuery({ ...query, q: e.target.value })}
        />
        <select
          value={query.status}
          onChange={(e) => setQuery({ ...query, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option>New</option>
          <option>software-installed</option>
          <option>configured</option>
          <option>handed-over</option>
        </select>
        <button className="btn" onClick={() => setQuery({ ...query, page: 1 })}>
          Search
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Asset</th>
              <th>Serial</th>
              <th>User Name</th>
              <th>Computer Name</th>
              <th>Office License</th>
              <th>Job No</th>
              <th>Domain</th>
              <th>Handover</th>
              <th>Asset Label</th>
              <th>Software (installed/12)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((it) => {
              const row = editRows[it._id] || {};
              const installedCount = (row.software || []).filter(
                (s) => s.installed
              ).length;

              return (
                <tr key={it._id}>
                  <td>
                    <input
                      value={row.model || ""}
                      onChange={(e) =>
                        handleChange(it._id, "model", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={row.assetTag || ""}
                      onChange={(e) =>
                        handleChange(it._id, "assetTag", e.target.value)
                      }
                    />
                  </td>
                  <td>{row.serialNumber}</td>
                  <td>
                    <input
                      value={row.assignedUserName || ""}
                      onChange={(e) =>
                        handleChange(it._id, "assignedUserName", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={row.computerName || ""}
                      onChange={(e) =>
                        handleChange(it._id, "computerName", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={row.officeLicense?.type || ""}
                      onChange={(e) =>
                        handleChange(it._id, "officeLicense", {
                          ...row.officeLicense,
                          type: e.target.value
                        })
                      }
                    >
                      <option>E1</option>
                      <option>E3</option>
                      <option>Business Basic</option>
                      <option>Business Standard</option>
                    </select>
                    <input
                      type="checkbox"
                      checked={row.officeLicense?.activated || false}
                      onChange={(e) =>
                        handleChange(it._id, "officeLicense", {
                          ...row.officeLicense,
                          activated: e.target.checked
                        })
                      }
                    />{" "}
                    Activated
                  </td>
                  <td>
                    <input
                      value={row.jobNo || ""}
                      onChange={(e) =>
                        handleChange(it._id, "jobNo", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={row.domainConfigured || false}
                      onChange={(e) =>
                        handleChange(it._id, "domainConfigured", e.target.checked)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={row.handedOver || false}
                      onChange={(e) =>
                        handleChange(it._id, "handedOver", e.target.checked)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={row.assetLabeled || false}
                      onChange={(e) =>
                        handleChange(it._id, "assetLabeled", e.target.checked)
                      }
                    />
                  </td>
                  <td>{installedCount}/12</td>
                  <td>
                    <button
                      className="btn secondary"
                      onClick={() => handleUpdate(it._id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div
        className="row"
        style={{ justifyContent: "space-between", marginTop: 12 }}
      >
        <div>
          Page {data.page} of {data.pages}
        </div>
        <div className="row" style={{ gap: 6 }}>
          <button
            className="btn secondary"
            disabled={data.page <= 1}
            onClick={() => setQuery({ ...query, page: data.page - 1 })}
          >
            Prev
          </button>
          <button
            className="btn"
            disabled={data.page >= data.pages}
            onClick={() => setQuery({ ...query, page: data.page + 1 })}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
