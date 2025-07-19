const Teacher = require("../models/teacher");
const Message = require("../models/message");

const addTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      subjects,
      city,
      experience,
      bio,
      availability,
      phone,
    } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !subjects ||
      !city ||
      !experience ||
      !bio ||
      !availability ||
      !phone
    ) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const userexsists = await Teacher.findOne({ email: email });
    if (userexsists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newTeacher = new Teacher({
      name,
      email,
      password,
      subjects,
      city,
      experience,
      bio,
      availability,
      phone,
    });

    await newTeacher.save();
    res.status(201).json({ message: "Teacher added successfully", newTeacher });
  } catch {
    res.status(500).json({ message: "Error adding teacher" });
  }
};


const searchTeacher = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search term is required" });
    }

    const terms = query.toLowerCase().split(" ").filter(Boolean);

    const conditions = terms.map(term => ({
      $or: [
        { city: { $regex: new RegExp(term, "i") } },
        { subjects: { $in: [new RegExp(term, "i")] } }
      ]
    }));

    const teachers = await Teacher.find({ $and: conditions });

    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ message: "Error searching teachers" });
  }
};



const subjectTeacher = async (req, res) => {
    try{
        const {subject} = req.body;
        if(!subject){
            res.status(400).json({message : "Subject Required"});
        }
        const teachers =  await Teacher.find({subjects: { $in: [new RegExp(subject, 'i')] }})
        res.status(200).json(teachers);
    }
    catch{
        res.status(500).json({message : "Error searching teacher by subject"})
    }
}


const getHomeTeachers = async (req, res) => {
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const teachers = await Teacher.find({
      city: { $regex: new RegExp(city, "i") },
    })
      .sort({ createdAt: -1 }) // sort before limit for consistency
      .limit(5)
      .select("name subjects experience");
    res.status(200).json(teachers);
  } catch {
    res.status(500).json({ message: "Error getting home teachers" });
  }
};

const getTeacherDetails = async (req, res) =>{
    try{
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({message : "ID required "})
        }
        const teacher = await Teacher.findById(id)

        res.status(200).json(teacher)
    } catch{
        res.status(500).json({message : "Error getting teacher details "})
    }
}

const AllTeachers = async (req,res) => {
    try{
        
        const FindTeacher = await Teacher.find();
        return res.status(200).json(FindTeacher);
    }
    catch{
        res.status(500).json({ message: "Error " });
    }
};

const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent updates to name and email
    const {
      city,
      qualification,
      phone,
      subjects,
      availability,
      mode,
      fee,
      experience,
      bio,
      profileImage
    } = req.body;

    const updateFields = {
      city,
      qualification,
      phone,
      subjects,
      availability,
      mode,
      fee,
      experience,
      bio,
      profileImage
    };

    // Remove any undefined fields to avoid overwriting them as undefined
    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === undefined || updateFields[key] === "") {
        delete updateFields[key];
      }
    });

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    return res.status(200).json(updatedTeacher);
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const getTeacherMessages = async (req, res) => {
  try {
    const teacherId = req.params.id;

    const messages = await Message.find({ teacher: teacherId })
      .populate("student", "name email")
      .sort({ createdAt: -1 }); // optional: show latest first

    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching teacher messages:", err);
    res.status(500).json({ message: "Failed to fetch teacher messages" });
  }
};


const sendMessageFromTeacher = async (req, res) => {
  try {
    const { teacher, student, message } = req.body;

    if (!teacher || !student || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = await Message.create({ teacher, student, message });

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (err) {
    console.error("Teacher Message Error:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
};


const updateTeacherProfileImage = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (req.file) {
      teacher.profileImage = req.file.filename;
    }

    await teacher.save();
    res.json({ message: "Profile image updated", profileImage: teacher.profileImage });
  } catch (err) {
    console.error("Teacher image upload error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Top Rated Teachers and Popular Subjects
const getTopRatedTeachers = async (req, res) => {
  try {
    const topTeachers = await Teacher.find()
      .sort({ rating: -1 }) // Sort by highest rating
      .limit(6); // Limit to top 6 teachers

    const subjectCounts = {};

    topTeachers.forEach((teacher) => {
      const subjects = Array.isArray(teacher.subjects)
        ? teacher.subjects
        : teacher.subjects?.split(',') || [];

      subjects.forEach((subj) => {
        const trimmed = subj.trim().toLowerCase();
        subjectCounts[trimmed] = (subjectCounts[trimmed] || 0) + 1;
      });
    });

    // Get unique and most frequent subjects (top 5)
    const popularSubjects = Object.entries(subjectCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map((entry) => entry[0]);

    res.json({
      teachers: topTeachers,
      subjects: popularSubjects,
    });
  } catch (err) {
    console.error("Error fetching top-rated teachers:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = { addTeacher, searchTeacher, getHomeTeachers , getTeacherDetails , subjectTeacher, AllTeachers , updateTeacher , getTeacherMessages , sendMessageFromTeacher , updateTeacherProfileImage , getTopRatedTeachers};
