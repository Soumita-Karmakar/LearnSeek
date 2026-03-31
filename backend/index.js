const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const reviewRoutes = require('./routes/reviewRoutes');

const loginRoute = require("./routes/loginRoute");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoute = require("./routes/studentRoute");
const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
//app.use("/api/auth", authRoutes);
app.use("/api/teacher",teacherRoutes);
app.use("/api/student",studentRoute);
app.use("/api",loginRoute);
app.use('/api',chatRoutes);
app.use('/api/reviews', reviewRoutes);
app.use("/uploads", express.static("uploads")); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
