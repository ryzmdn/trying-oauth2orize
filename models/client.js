const mongoose = require("mongoose");
const crypto = require("crypto");

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    clientId: { type: String, unique: true },
    clientSecret: { type: String },
    redirectUri: { type: String, required: true },
    grants: [{ type: String }],
    scope: [{ type: String }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    trusted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

clientSchema.pre("save", function (next) {
  if (!this.clientId) {
    this.clientId = crypto.randomBytes(16).toString("hex");
    this.clientSecret = crypto.randomBytes(32).toString("hex");
  }
  next();
});

module.exports = mongoose.model("Client", clientSchema);
