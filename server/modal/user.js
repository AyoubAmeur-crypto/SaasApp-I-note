const mongoose = require("mongoose")


const user = new mongoose.Schema({

    firstName:{

        type:String,
        required:true
    },
    lastName:{

        type:String,
        required:true
    },
    userName:{

        type:String,
        required:true,
        unique:true
    },
    email:{


        type:String,
        required:true,
        unique:true
    },
    password:{

        type:String,
        required:true
    }
})


const User = mongoose.model("User",user)

module.exports = User
