import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    taNumber: { type: String, required: true }, // hashed
    role: { type: String, enum: ["admin", "staff"], default: "staff" },
    isActive: { type: Boolean, default: true },
    lastLoginAt: Date
  },
  { timestamps: true }
);

userSchema.methods.matchTA = async function (enteredTA) {
  return bcrypt.compare(enteredTA, this.taNumber);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("taNumber")) return next();
  this.taNumber = await bcrypt.hash(this.taNumber, 10);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
