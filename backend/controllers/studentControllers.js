const Student = require("../models/student");
const Message = require("../models/message");

const addStudent = async (req,res) => {
    try{
        const {
            name,
            email,
            password,
            city,
            phone,
            class :studentClass ,
        } = req.body;

        if(
            !name ||
            !email ||
            !password ||
            !city ||
            !phone ||
            !studentClass 
        ) {
         return res.status(400).json({ message: "Please fill in all fields" });
        }

         const userexsists = await Student.findOne({ email: email });
            if (userexsists) {
              return res.status(400).json({ message: "Email already exists" });
            }
        const newStudent = new Student ({
            name,
            email,
            password,
            city,
            phone,
            class :studentClass ,
        })
         await newStudent.save();
            res.status(201).json({ message: "Student added successfully", newStudent });
        } catch {
             res.status(500).json({ message: "Error adding student" });
            }
            
}

const studentDetails = async (req,res) => {
    try{
        const { id } = req.params;

         if (!id) {
            return res.status(400).json({message : "ID required "})
        }
        const student = await Student.findById(id)
           res.status(200).json(student)
    } catch{
        res.status(500).json({message : "Error getting student details "})
    }
}

const UpdateStudent = async (req,res) =>{
      try {
        const { id } = req.params;
  
        const {
          city,
          phone,
          class: studentClass,
          bio,
          profileImage
        } = req.body;
    
        const updateFields = {
          city,
          phone,
          class: studentClass,
          bio,
          profileImage
        };
    
        // Remove any undefined fields to avoid overwriting them as undefined
        Object.keys(updateFields).forEach((key) => {
          if (updateFields[key] === undefined || updateFields[key] === "") {
            delete updateFields[key];
          }
        });
    
        const updatedstudent = await Student.findByIdAndUpdate(
          id,
          { $set: updateFields },
          { new: true }
        );
    
        if (!updatedstudent) {
          return res.status(404).json({ message: "student not found" });
        }
    
        return res.status(200).json(updatedstudent);
      } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    };

const getStudentMessages = async (req, res) => {
  try {
    const messages = await Message.find({ student: req.params.id }).populate("teacher", "name email");
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch student messages" });
  }
};


const sendMessageFromStudent = async (req, res) => {
  try {
    const { student, teacher, message } = req.body;

    if (!student || !teacher || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = await Message.create({ student, teacher, message });

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (err) {
    console.error("Send Message Error:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
};


const addReviewToTeacher = async (req, res) => {
  const { id } = req.params;
  const { studentId, rating, comment } = req.body;

  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    // Optional: check if this student already reviewed and update
    teacher.ratings.push({ studentId, rating, comment });
    await teacher.save();

    res.status(200).json({ message: "Review added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};



const updateStudentProfileImage = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (req.file) {
      student.profileImage = req.file.filename;
    }

    await student.save();
    res.json({ profileImage: student.profileImage });
  } catch (err) {
    console.error("Student image upload error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports ={addStudent , studentDetails , UpdateStudent ,   getStudentMessages, sendMessageFromStudent,  addReviewToTeacher , updateStudentProfileImage}