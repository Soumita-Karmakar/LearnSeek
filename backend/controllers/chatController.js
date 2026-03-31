const Message = require("../models/message");

// 🧠 Generate consistent conversation ID between two parties
const generateConversationId = (studentId, teacherId) => {
  return [studentId, teacherId].sort().join("_");
};

// ✅ Send message (student ↔ teacher)
exports.sendMessage = async (req, res) => {
  const { studentId, teacherId } = req.params;
  const { senderId, senderModel, text } = req.body;

  const conversationId = generateConversationId(studentId, teacherId);
  const receiverId = senderModel === "Student" ? teacherId : studentId;
  const receiverModel = senderModel === "Student" ? "Teacher" : "Student";

  try {
    const newMessage = new Message({
      conversationId,
      senderId,
      senderModel,
      receiverId,
      receiverModel,
      text,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ message: "Error sending message", error: err });
  }
};

// ✅ Get all messages between a student and teacher
exports.getMessages = async (req, res) => {
  const { studentId, teacherId } = req.params;
  const conversationId = generateConversationId(studentId, teacherId);

  try {
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Error fetching messages", error: err });
  }
};

// ✅ Get all unique conversations (last message per person)
exports.getAllConversations = async (req, res) => {
  const { userId, role } = req.params;

  try {
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .sort({ createdAt: -1 })
      .populate("senderId", "name")
      .populate("receiverId", "name");

    const conversations = {};

    messages.forEach((msg) => {
      // Make sure populated sender/receiver are not null
      const sender = msg.senderId;
      const receiver = msg.receiverId;
      if (!sender || !receiver) return;

      const otherId =
        sender._id.toString() === userId
          ? receiver._id.toString()
          : sender._id.toString();

      // Only store the latest message per unique conversation
      if (!conversations[otherId]) {
        conversations[otherId] = msg;
      }
    });

    res.status(200).json(Object.values(conversations));
  } catch (err) {
    console.error("Conversation fetch error:", err);
    res.status(500).json({ message: "Failed to load conversations" });
  }
};
