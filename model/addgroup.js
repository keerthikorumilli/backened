const mongoose = require("mongoose");

const addgroupSchema = new mongoose.Schema({
    email: {
       type: String, 
       required: true,
    },
    teamnumber: {
       type: Number,
       required: true,
    },
    mentor: {
       type: String,
       required: true,
    }
    
    
});
const addgroup = mongoose.model('addgroup',addgroupSchema)

module.exports = addgroup