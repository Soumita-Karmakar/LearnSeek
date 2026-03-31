const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },

  subjects: [{ type: String, required: true }],
  experience: { type: String, required: true },
  city: { type: String, required: true },
  bio: { type: String },
  phone: { type: String },

  // ✅ Add missing fields
  qualification: { type: String }, // newly added
  mode: { type: String },          // e.g., "Online", "Offline"
  fee: { type: String },           // e.g., "500" (₹ per hour)
  

  availability: { type: String },

   rating: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },

  profileImage: {
  type: String,
  default: "default-profile.png"
}


});

module.exports = mongoose.model('Teacher', teacherSchema);
