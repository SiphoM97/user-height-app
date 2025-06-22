const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: String,
  height: Number,
  email: String,
});

module.exports = mongoose.model('Submission', submissionSchema);
