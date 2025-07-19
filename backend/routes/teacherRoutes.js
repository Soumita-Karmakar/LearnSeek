const express = require('express');
const { addTeacher, searchTeacher, getHomeTeachers , getTeacherDetails, subjectTeacher , AllTeachers , updateTeacher , getTeacherMessages , sendMessageFromTeacher,updateTeacherProfileImage,getTopRatedTeachers} = require('../controllers/teacherController');
const router = express.Router();
const upload = require("../middlewares/upload")


router.post('/signup', addTeacher )

router.post('/search',searchTeacher)

router.get('/homeTeacher',getHomeTeachers)

router.get('/teacherDetails/:id', getTeacherDetails)

router.get('/subjectTeacher',subjectTeacher)

router.get('/AllTeachers',AllTeachers)

router.patch('/UpdateTeacher/:id', updateTeacher);

router.get("/messages/:id", getTeacherMessages);

router.post("/sendmessage", sendMessageFromTeacher);

router.patch("/uploadProfileImage/:id", upload.single("profileImage"), updateTeacherProfileImage);

router.get('/topRated', getTopRatedTeachers);



module.exports = router;
