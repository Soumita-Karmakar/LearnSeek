const Teacher = require("../models/teacher");
const Student = require("../models/student");

const userLogin = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    if (role === "teacher") {
  user = await Teacher.findOne({ email }).select("+password");
} else if (role === "student") {
  user = await Student.findOne({ email }).select("+password"); // ✅ important
}

    if (!user) {
      return res.status(400).json({ error: `No ${role} found with this email` });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.status(200).json({
      message: `Login successful as ${role}`,
      role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { userLogin };
