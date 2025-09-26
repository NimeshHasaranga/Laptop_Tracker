import { useState } from "react";
import { createLaptopApi } from "../api/laptops";

// Fixed 12 software items
const fixedSoftware = [
  { name: "Autoline", installed: false },
  { name: "Kview", installed: false },
  { name: "ManageEngine Agent", installed: false },
  { name: "SAP GUI", installed: false },
  { name: "Trelix Agent", installed: false },
  { name: "Trellix Endpoint Security", installed: false },
  { name: "Adobe Reader", installed: false },
  { name: "Check Point VPN", installed: false },
  { name: "VLC Media Player", installed: false },
  { name: "WinRAR", installed: false },
  { name: "Google Chrome", installed: false },
  { name: "Microsoft Edge", installed: false }
];

const newLaptopForm = () => ({
  serialNumber: "",
  assetTag: "",
  make: "",
  model: "",
  computerName: "",
  department: "",
  assignedUserName: "",
  officeLicense: { type: "E1", activated: false },
  jobNo: "",
  status: "New",
  purchaseDate: "",
  warrantyExpiry: "",
  domainConfigured: false,
  handedOver: false,
  assetLabeled: false,
  software: fixedSoftware.map(s => ({ ...s }))
});

export default function LaptopForm() {
  const [forms, setForms] = useState([newLaptopForm()]);
  const [msg, setMsg] = useState("");

  const addForm = () => setForms([...forms, newLaptopForm()]);

  const removeForm = (index) => {
    if (forms.length === 1) return;
    setForms(forms.filter((_, i) => i !== index));
  };

  const updateForm = (index, patch) => {
    const updated = [...forms];
    updated[index] = { ...updated[index], ...patch };
    setForms(updated);
  };

  const updateSoftware = (formIdx, swIdx, patch) => {
    const updated = [...forms];
    const softwareList = [...updated[formIdx].software];
    softwareList[swIdx] = { ...softwareList[swIdx], ...patch };
    updated[formIdx].software = softwareList;
    setForms(updated);
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      for (const form of forms) {
        const payload = { ...form };
        if (payload.purchaseDate) payload.purchaseDate = new Date(payload.purchaseDate);
        if (payload.warrantyExpiry) payload.warrantyExpiry = new Date(payload.warrantyExpiry);
        await createLaptopApi(payload);
      }
      setMsg("✅ All laptops created successfully!");
      setForms([newLaptopForm()]);
    } catch (e) {
      setMsg("❌ " + (e.response?.data?.message || e.message));
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Add New Laptop</h2>
      {msg && <div style={styles.message}>{msg}</div>}

      <form onSubmit={submit} style={styles.form}>
        {forms.map((form, formIdx) => (
          <div key={formIdx} style={styles.formSection}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.subHeading}>Laptop #{formIdx + 1}</h3>
              {forms.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeForm(formIdx)}
                  style={styles.removeBtn}
                >
                  ❌ Remove
                </button>
              )}
            </div>

            {/* Laptop Info */}
            <div style={styles.grid}>
              <div style={styles.field}>
                <label style={styles.label}>Serial Number *</label>
                <input
                  style={styles.input}
                  value={form.serialNumber}
                  onChange={(e) => updateForm(formIdx, { serialNumber: e.target.value })}
                  required
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Asset Tag</label>
                <input
                  style={styles.input}
                  value={form.assetTag}
                  onChange={(e) => updateForm(formIdx, { assetTag: e.target.value })}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Make</label>
                <input
                  style={styles.input}
                  value={form.make}
                  onChange={(e) => updateForm(formIdx, { make: e.target.value })}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Model</label>
                <input
                  style={styles.input}
                  value={form.model}
                  onChange={(e) => updateForm(formIdx, { model: e.target.value })}
                />
              </div>
            </div>

            {/* Software Checklist */}
            <div style={{ width: "100%", marginTop: 20 }}>
              <h4 style={styles.subHeading}>Software Checklist</h4>

              <div style={styles.softwareGrid}>
                {/* Left column (first 6) */}
                <div style={styles.softwareCol}>
                  {form.software.slice(0, 6).map((s, i) => (
                    <label key={i} style={styles.softwareItem}>
                      <input
                        type="checkbox"
                        checked={s.installed}
                        onChange={(e) =>
                          updateSoftware(formIdx, i, { installed: e.target.checked })
                        }
                        style={styles.checkbox}
                      />
                      <span>{s.name}</span>
                    </label>
                  ))}
                </div>

                {/* Right column (last 6) */}
                <div style={styles.softwareCol}>
                  {form.software.slice(6, 12).map((s, i) => (
                    <label key={i + 6} style={styles.softwareItem}>
                      <input
                        type="checkbox"
                        checked={s.installed}
                        onChange={(e) =>
                          updateSoftware(formIdx, i + 6, { installed: e.target.checked })
                        }
                        style={styles.checkbox}
                      />
                      <span>{s.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <hr style={styles.hr} />
          </div>
        ))}

        <button type="button" style={styles.secondaryBtn} onClick={addForm}>
          + Add Another Laptop
        </button>
        <button type="submit" style={styles.primaryBtn}>
          Save All
        </button>
      </form>
    </div>
  );
}

/* 🎨 Styles */
const styles = {
  card: {
    background: "#1e293b",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    color: "#f1f5f9",
    margin: "20px auto",
    maxWidth: "1200px"
  },
  heading: { fontSize: "22px", marginBottom: "12px", color: "#3b82f6" },
  subHeading: { fontSize: "18px", margin: "16px 0 8px", color: "#38bdf8" },
  message: { marginBottom: "12px", color: "#22c55e" },
  form: { display: "flex", flexDirection: "column", gap: "24px" },
  formSection: { padding: "16px", borderRadius: "8px", background: "#0f172a" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "14px", color: "#94a3b8" },
  input: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "#f8fafc",
    outline: "none",
    transition: "border 0.3s, box-shadow 0.3s",
  },
  hr: { margin: "20px 0", borderColor: "#334155" },
  primaryBtn: {
    background: "linear-gradient(to right, #3b82f6, #2563eb)",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "12px"
  },
  secondaryBtn: {
    background: "#334155",
    color: "#f1f5f9",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    marginRight: "12px"
  },
  removeBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600"
  },
  checkbox: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
    accentColor: "#3b82f6"
  },
  softwareGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "12px"
  },
  softwareCol: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  softwareItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#1e293b",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #334155"
  }
};
