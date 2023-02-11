const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
});

const announcement = mongoose.model('announcement',announcementSchema)

module.exports = announcement