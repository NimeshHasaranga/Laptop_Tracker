import mongoose from "mongoose";

const changeSchema = new mongoose.Schema(
  {
    path: String,
    from: {},
    to: {}
  },
  { _id: false }
);

const auditLogSchema = new mongoose.Schema(
  {
    entity: { type: String, enum: ["laptop", "user"], required: true },
    entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
    action: { type: String, enum: ["create", "update", "delete", "login"], required: true },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    changedAt: { type: Date, default: Date.now },
    diff: [changeSchema]
  },
  { timestamps: true }
);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);
export default AuditLog;
    