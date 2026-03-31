// models/message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversationId: { type: String, required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, refPath: "senderModel", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, refPath: "receiverModel", required: true },
  senderModel: { type: String, enum: ["Student", "Teacher"], required: true },
  receiverModel: { type: String, enum: ["Student", "Teacher"], required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", messageSchema);
