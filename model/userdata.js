//adding student
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
          },
    email: {
        type: String,
        required: true,
    },
    section: {
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
    campus: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    teamnumber: {
      type: Number,
      required: true,
    },
    mentor: {
      type: String,
      required: true,
      }
    


});


const userdetails = mongoose.model('userdetails',userSchema)

module.exports = userdetails