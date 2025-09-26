import { useEffect, useState } from "react";
import { listUsersApi, createUserApi, updateUserApi } from "../api/users";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", taNumber: "", role: "staff" });
  const [msg, setMsg] = useState("");

  const load = async () => {
    const data = await listUsersApi();
    setUsers(data);
  };
  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await createUserApi(form);
      setForm({ username: "", taNumber: "", role: "staff" });
      load();
      setMsg("✅ User created");
    } catch (e) {
      setMsg("❌ " + (e.response?.data?.message || e.message));
    }
  };

  const toggleActive = async (u) => {
    await updateUserApi(u._id, { isActive: !u.isActive });
    load();
  };

  const setRole = async (u, role) => {
    await updateUserApi(u._id, { role });
    load();
  };

  return (
    <>
      <div className="card">
        <h2>Create User</h2>
        {msg && <div>{msg}</div>}
        <form onSubmit={create} className="row">
          <div className="field"><label>Username</label>
            <input value={form.username} onChange={(e)=>setForm({...form, username:e.target.value})} required />
          </div>
          <div className="field"><label>TA Number (login secret)</label>
            <input value={form.taNumber} onChange={(e)=>setForm({...form, taNumber:e.target.value})} required />
          </div>
          <div className="field"><label>Role</label>
            <select value={form.role} onChange={(e)=>setForm({...form, role:e.target.value})}>
              <option value="staff">staff</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <button className="btn">Create</button>
        </form>
      </div>

      <div className="card">
        <h2>Users</h2>
        <table>
          <thead><tr><th>Username</th><th>Role</th><th>Active</th><th>Last Login</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.username}</td>
                <td>
                  <select value={u.role} onChange={(e)=>setRole(u, e.target.value)}>
                    <option value="staff">staff</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td>{u.isActive ? "✅" : "❌"}</td>
                <td>{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : "-"}</td>
                <td>
                  <button className="btn secondary" onClick={()=>toggleActive(u)}>
                    {u.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
