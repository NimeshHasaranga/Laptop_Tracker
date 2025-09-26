import User from "../models/User.js";

export async function ensureInitialAdmin() {
  const username = process.env.ADMIN_USERNAME;
  const ta = process.env.ADMIN_TA;

  if (!username || !ta) {
    console.warn("⚠️ ADMIN_USERNAME or ADMIN_TA not set; skipping auto-admin creation");
    return;
  }

  const existing = await User.findOne({ username });
  if (existing) {
    console.log("ℹ️ Admin user exists");
    return;
  }

  const user = new User({
    username,
    taNumber: ta,
    role: "admin",
    isActive: true
  });
  await user.save();
  console.log(`✅ Admin user created: ${username}`);
}
