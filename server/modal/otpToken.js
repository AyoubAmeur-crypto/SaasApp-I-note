const mongoose = require("mongoose")

const newOtp = new mongoose.Schema({


    email:{

        type:String,
        unique:true
    },

    otpHash:{

        type:String,
        unique:true
    },
    CreatedAt:{type:Date,default:Date.now(), expires:300}
})

const otpHash = mongoose.model('otpHash',newOtp)

module.exports = otpHash