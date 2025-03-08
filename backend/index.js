const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const studentRoutes = require('./routes/studentRoutes');
app.use('/students', studentRoutes);


// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("Error connecting to MongoDB:", err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});