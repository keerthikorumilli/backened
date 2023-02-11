const mongoose = require('mongoose')

const addscheduleSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
      },
      day: {
        type: String, 
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      task: {
        type: String,
        required: true,
      },
      deadline: {
        type: String,
        required: true,
      },
      languageused: {
        type: String,
        required: true,
      },
      mentor: {
        type: String,
        required: true,
      }
    
    
});

const addschedule = mongoose.model('addschedule',addscheduleSchema)

module.exports = addschedule