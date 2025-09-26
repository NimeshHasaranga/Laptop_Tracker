import AuditLog from "../models/AuditLog.js";

export async function writeAudit({ entity, entityId, action, changedBy, diff = [] }) {
  try {
    await AuditLog.create({ entity, entityId, action, changedBy, diff, changedAt: new Date() });
  } catch (e) {
    console.error("Audit write failed:", e.message);
  }
}
    