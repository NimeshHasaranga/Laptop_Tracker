import mongoose from "mongoose";

const softwareItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // e.g. "Office", "Chrome"
    installed: { type: Boolean, default: false },
    version: { type: String, default: "" },
    installedAt: Date,
    installedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { _id: false }
);

const laptopSchema = new mongoose.Schema(
  {
    serialNumber: { type: String, required: true, unique: true, trim: true },
    assetTag: { type: String, trim: true }, // "laptop identification"
    make: String,
    model: String,
    computerName: String,
    department: String,
    assignedUserName: String,
    officeLicense: {
      type: {
        type: String,
        enum: ["O365", "Volume", "OEM", "None"],
        default: "O365"
      },
      activated: { type: Boolean, default: false }
    },
    jobNo: String,
    technician: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["received", "in-setup", "configured", "handed-over", "retired"],
      default: "received"
    },
    purchaseDate: Date,
    warrantyExpiry: Date,

    // Up to 10 items; UI should cap this length in v1
    software: {
      type: [softwareItemSchema],
      validate: [arr => arr.length <= 10, "software max 10"]
    },

    domainConfigured: { type: Boolean, default: false },
    handedOver: { type: Boolean, default: false },
    assetLabeled: { type: Boolean, default: false },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

// laptopSchema.index({ serialNumber: 1 }, { unique: true });
laptopSchema.index({ model: 1, assetTag: 1, assignedUserName: 1, status: 1 });
laptopSchema.index({
  serialNumber: "text",
  model: "text",
  assetTag: "text",
  assignedUserName: "text"
});

const Laptop = mongoose.model("Laptop", laptopSchema);
export default Laptop;
