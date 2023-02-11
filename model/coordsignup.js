const mongoose = require("mongoose");

const coordsignupSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String, 
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  dateofbirth: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  }


});


const coordsignup = mongoose.model('coordsignup',coordsignupSchema)

module.exports = coordsignup

