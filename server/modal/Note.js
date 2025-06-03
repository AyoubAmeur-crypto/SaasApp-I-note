const mongoose = require("mongoose")
const User = require("./user")


const note = new mongoose.Schema({


    user:{

        type:mongoose.Schema.ObjectId,
        ref:User
    },
    name:{

        type:String,
        required:true
    },
    description:{

        type:String,
        required:true
    },
    startDate:{

        type:Date,
        default:Date.now()
    },
    estimatedDate:{

        type:Date,
        required:true,
    },done:{

        type:Boolean,
        default:false
    }
    
},{timestamps : true})

const Note = mongoose.model("MyNote",note)

module.exports = Note