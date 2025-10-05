const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date }, // event date
  publishedBy: { type: String }, // username who published
  summary: { type: String },
  image: { type: String },
  lastRegistrationDate: { type: Date },
  wing: { 
    type: String, 
    enum: ['All', 'Competitive Programming', 'Software Engineering', 'Linux Networking', 'Deep Neural Research'], 
    default: 'All' 
  },
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);