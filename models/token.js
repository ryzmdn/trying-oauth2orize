const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    tokenType: {
      type: String,
      enum: ["access", "refresh", "authorization"],
      required: true,
    },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    scope: [String],
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Token", tokenSchema);
