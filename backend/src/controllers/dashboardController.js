import Laptop from "../models/Laptop.js";
import User from "../models/User.js";

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

  // Department distribution
  const deptStats = await Laptop.aggregate([
    { $match: { department: { $ne: "" } } },
    { $group: { _id: "$department", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  // Laptop make distribution
  const makeStats = await Laptop.aggregate([
    { $match: { make: { $ne: "" } } },
    { $group: { _id: "$make", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  // Monthly laptop additions (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  const monthlyAdditions = await Laptop.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } }
  ]);

  // Software installation stats
  const softwareStats = await Laptop.aggregate([
    { $unwind: { path: "$software", preserveNullAndEmptyArrays: true } },
    { $match: { "software.name": { $ne: "" } } },
    {
      $group: {
        _id: "$software.name",
        installed: {
          $sum: { $cond: [{ $eq: ["$software.installed", true] }, 1, 0] }
        },
        total: { $sum: 1 }
      }
    },
    { $sort: { installed: -1 } },
    { $limit: 10 }
  ]);

  // Warranty expiry by month
  const warrantyByMonth = await Laptop.aggregate([
    { $match: { warrantyExpiry: { $gte: now } } },
    {
      $group: {
        _id: {
          year: { $year: "$warrantyExpiry" },
          month: { $month: "$warrantyExpiry" }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
    { $limit: 12 }
  ]);

  // Office license types
  const licenseStats = await Laptop.aggregate([
    { $group: { _id: "$officeLicense.type", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  // User stats (for admin dashboard)
  const userStats = await User.aggregate([
    { $group: { _id: "$role", count: { $sum: 1 } } }
  ]);

  const activeUsers = await User.countDocuments({ isActive: true });

  res.json({
    totals: { total, received, inSetup, configured, handed },
    warranties: { exp30, exp60, exp90 },
    softwareInstalled,
    charts: {
      departmentDistribution: deptStats,
      makeDistribution: makeStats,
      monthlyAdditions,
      softwareStats,
      warrantyByMonth,
      licenseStats,
      userStats,
      activeUsers
    }
  });
};
