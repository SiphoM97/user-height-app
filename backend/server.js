const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

// MongoDB Schema and Model
const submissionSchema = new mongoose.Schema({
  name: String,
  height: Number,
});

const Submission = mongoose.model('Submission', submissionSchema);

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
    // Save to DB
    const newSubmission = new Submission({ name, height: parseFloat(height) });
    await newSubmission.save();

    // Calculate average height
    const allSubmissions = await Submission.find();
    const totalHeight = allSubmissions.reduce((sum, entry) => sum + entry.height, 0);
    const averageHeight = totalHeight / allSubmissions.length;

    // Simulated email
    console.log(`✉️ Email sent to ${email}:
  - Your height: ${height}
  - Average height: ${averageHeight.toFixed(2)}
    `);

    return res.status(200).json({
      message: 'Submission received!',
      averageHeight: averageHeight.toFixed(2),
    });

  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
