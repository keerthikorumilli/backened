const mongoose = require('mongoose')

const referencenoteSchema = new mongoose.Schema({
    CourseId:{
        type:String,
        required:true
    },
     Topicname : {                 
        type : String,
        required : true
    },
    Explanation: {
        type : String,
        required : true
    },
    ResourceLinks:{
        type:String,
        required:true
    }
})

const referencenote = mongoose.model('referencenote',referencenoteSchema)

module.exports = referencenote