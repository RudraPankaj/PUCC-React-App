const mongoose = require('mongoose');

const eventsUri = process.env.MONGO_URI_EVENTS || process.env.MONGO_URI || 'mongodb://localhost:27017/events_db';

// create a separate connection for events collection
const eventsConn = mongoose.createConnection(eventsUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date }, // event date
  publishedBy: { type: String }, // username who published
  summary: { type: String },
  image: { type: String },
  lastRegistrationDate: { type: Date },
  wing: { type: String, enum: ['All', 'Competitive Programming', 'Software Engineering', 'Linux Networking', 'Deep Neural Research'], default: 'All' },
}, { timestamps: true });

module.exports = eventsConn.model('Event', EventSchema);