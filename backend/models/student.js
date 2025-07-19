const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },

  phone: { type: String },
  city: { type: String, required: true },
  class: { type: String, required: true },

  profileImage: { type: String, default: "/default-profile.png" }, // ✅ Profile Picture
  bio: { type: String }, // ✅ Optional bio

  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Student", studentSchema);
