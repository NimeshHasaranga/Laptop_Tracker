import Laptop from "../models/Laptop.js";

export const getDashboard = async (req, res) => {
  const now = new Date();
  const soon30 = new Date(now); soon30.setDate(now.getDate() + 30);
  const soon60 = new Date(now); soon60.setDate(now.getDate() + 60);
  const soon90 = new Date(now); soon90.setDate(now.getDate() + 90);

  const [total, received, inSetup, configured, handed, exp30, exp60, exp90] = await Promise.all([
    Laptop.countDocuments({}),
    Laptop.countDocuments({ status: "received" }),
    Laptop.countDocuments({ status: "in-setup" }),
    Laptop.countDocuments({ status: "configured" }),
    Laptop.countDocuments({ handedOver: true }),
    Laptop.countDocuments({ warrantyExpiry: { $gte: now, $lte: soon30 } }),
    Laptop.countDocuments({ warrantyExpiry: { $gte: now, $lte: soon60 } }),
    Laptop.countDocuments({ warrantyExpiry: { $gte: now, $lte: soon90 } })
  ]);

  // sum of installed software across all laptops
  const agg = await Laptop.aggregate([
    { $unwind: { path: "$software", preserveNullAndEmptyArrays: true } },
    { $match: { "software.installed": true } },
    { $group: { _id: null, installedCount: { $sum: 1 } } }
  ]);
  const softwareInstalled = agg?.[0]?.installedCount || 0;

  res.json({
    totals: { total, received, inSetup, configured, handed },
    warranties: { exp30, exp60, exp90 },
    softwareInstalled
  });
};
