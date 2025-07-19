const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
  getAllConversations,
} = require("../controllers/chatController");

router.post("/chat/:studentId/:teacherId", sendMessage);
router.get("/chat/:studentId/:teacherId", getMessages);
router.get("/conversations/:userId/:role", getAllConversations);

module.exports = router;
