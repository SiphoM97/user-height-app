const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

// app.get added. 
let submissions = [];

app.post('/submit', (req, res) => {
  const { name, height, email } = req.body;

  if (!name || !height || !email) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  submissions.push({ name, height: parseFloat(height) });

  const totalHeight = submissions.reduce((sum, entry) => sum + entry.height, 0);
  const averageHeight = totalHeight / submissions.length;

  // Simulate sending email
  console.log(`✉️ Email sent to ${email}:
  - Your height: ${height}
  - Average height: ${averageHeight.toFixed(2)}
  `);

  return res.status(200).json({
    message: 'Submission received!',
    averageHeight: averageHeight.toFixed(2),
  });
});
