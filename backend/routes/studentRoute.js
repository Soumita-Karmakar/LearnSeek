const express = require('express');
const router = express.Router();
const {addStudent , studentDetails , UpdateStudent , getStudentMessages,  sendMessageFromStudent, updateStudentProfileImage} = require('../controllers/studentControllers');
const upload = require("../middlewares/upload");


router.post('/addStudent',addStudent)

router.get('/studentDetails/:id', studentDetails)
router.patch('/studentUpdate/:id', UpdateStudent)

router.get("/messages/:id", getStudentMessages);

router.post("/sendmessage", sendMessageFromStudent);

router.patch("/uploadProfileImage/:id", upload.single("profileImage"), updateStudentProfileImage);

module.exports = router;
