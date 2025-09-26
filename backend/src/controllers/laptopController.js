import Laptop from "../models/Laptop.js";
import { writeAudit } from "../utils/auditLogger.js";
import { diffObjects } from "../utils/diff.js";

export const createLaptop = async (req, res) => {
  const data = req.body || {};
  data.createdBy = req.user.id;
  const exists = await Laptop.findOne({ serialNumber: data.serialNumber });
  if (exists) return res.status(409).json({ message: "Serial number already exists" });

  // enforce software array max length 10
  if (Array.isArray(data.software) && data.software.length > 10) {
    data.software = data.software.slice(0, 10);
  }

  const created = await Laptop.create(data);
  await writeAudit({
    entity: "laptop",
    entityId: created._id,
    action: "create",
    changedBy: req.user.id,
    diff: Object.entries(data).map(([k, v]) => ({ path: k, from: undefined, to: v }))
  });

  res.status(201).json(created);
};

export const listLaptops = async (req, res) => {
  const {
    q,
    status,
    department,
    handedOver,
    domainConfigured,
    assetLabeled,
    page = 1,
    limit = 10,
    sort = "-createdAt"
  } = req.query;

  const filter = {};
  if (q) filter.$text = { $search: q };
  if (status) filter.status = status;
  if (department) filter.department = department;
  if (handedOver !== undefined) filter.handedOver = handedOver === "true";
  if (domainConfigured !== undefined) filter.domainConfigured = domainConfigured === "true";
  if (assetLabeled !== undefined) filter.assetLabeled = assetLabeled === "true";

  const skip = (Number(page) - 1) * Number(limit);

  const [items, total] = await Promise.all([
    Laptop.find(filter).sort(sort).skip(skip).limit(Number(limit)),
    Laptop.countDocuments(filter)
  ]);

  res.json({
    items,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit))
  });
};

export const getLaptop = async (req, res) => {
  const item = await Laptop.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

export const updateLaptop = async (req, res) => {
  const id = req.params.id;
  const prev = await Laptop.findById(id);
  if (!prev) return res.status(404).json({ message: "Not found" });

  const before = prev.toObject();
  Object.assign(prev, req.body || {});
  prev.updatedBy = req.user.id;

  if (Array.isArray(prev.software) && prev.software.length > 10) {
    prev.software = prev.software.slice(0, 10);
  }

  await prev.save();
  const after = prev.toObject();

  const diff = diffObjects(before, after, ["__v", "updatedAt", "createdAt"]);
  await writeAudit({ entity: "laptop", entityId: prev._id, action: "update", changedBy: req.user.id, diff });

  res.json(prev);
};

export const deleteLaptop = async (req, res) => {
  const id = req.params.id;
  const item = await Laptop.findById(id);
  if (!item) return res.status(404).json({ message: "Not found" });
  await item.deleteOne();
  await writeAudit({ entity: "laptop", entityId: id, action: "delete", changedBy: req.user.id });
  res.json({ success: true });
};
