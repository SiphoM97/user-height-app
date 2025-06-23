const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Submission = require('./models/Submission'); // Model imported from external file

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Default route
app.get('/', (req, res) => {
  res.send('API is running ');
});

// POST route
app.post('/submit', async (req, res) => {
  const { name, height, email } = req.body;

  if (!name || !height || !email) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Save submission to DB
    const newSubmission = new Submission({ name, height: parseFloat(height) });
    await newSubmission.save();

    // Calculate average height
    const allSubmissions = await Submission.find();
    const totalHeight = allSubmissions.reduce((sum, entry) => sum + entry.height, 0);
    const averageHeight = totalHeight / allSubmissions.length;

    // Simulate sending email
    console.log(`✉️ Email sent to ${email}:
  - Your height: ${height}
  - Average height: ${averageHeight.toFixed(2)}
    `);

    res.status(200).json({
      message: 'Submission received!',
      averageHeight: averageHeight.toFixed(2),
    });
  } catch (error) {
    console.error(' Error saving submission:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
