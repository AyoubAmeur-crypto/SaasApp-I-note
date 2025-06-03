const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const User = require("./modal/user")
const Note = require("./modal/Note")
const verifcationotpToken = require("./modal/otpToken")
const nodemailer = require("nodemailer")
const fs = require('fs');
const path = require('path');
const logoPath = path.join(__dirname, './LOGO.png');
const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });
const cors = require("cors")
const otpHash = require("./modal/otpToken")

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3000,()=>{

    console.log("connected succsufuly to the port");
    
})

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"
  
    if (!token) {
      return res.status(401).json("Access Denied. No token provided.");
    }
  
    try {
      const verified = jwt.verify(token, process.env.SECRET_KEY);
      req.user = verified; 
      next();
    } catch (err) {
      return res.status(403).json("Invalid Token");
    }
  };
  

mongoose.connect(process.env.MONGODB_URL).then(()=>{

    console.log("connected succesfuly to the db");
    
}
).catch((err)=>{

    console.log("can't connect due to this",err);
    
})


app.post("/login",async (req,res)=>{


    try {

        const {email,pass} = req.body

        if(!email || !pass){

            return res.status(409).json("All the inputs are required!")
        }

        const wantedUser = await User.findOne({$or: [{email: email}, {userName: email}]})

        if(!wantedUser){

            return res.status(404).json("this user doesn't exist !")
        }
        const passCheck = await bcrypt.compare(pass,wantedUser.password)

        if(!passCheck){

            return res.status(500).json("Passsword Incorrect!")
        }
        const token = jwt.sign({id:wantedUser._id,firstName:wantedUser.firstName,lastName:wantedUser.lastName,userName:wantedUser.userName,email:wantedUser.email},process.env.SECRET_KEY,{expiresIn:"1h"})

        res.status(201).json(token)
    } catch (error) {
        
        console.log("smtg happened due to this",error);
        res.status(500).send("couldn't complete the login check the console")
        
    }


})


app.post("/signup",async (req,res)=>{


    try {

        const {fname,lname,username,email,password,repass} = req.body
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        const checkMail = await User.findOne({email:email})
        if(!fname || !lname || !username || !email || !password || !repass){

            return res.status(409).json("All the inputs are required!")
        }
        if(checkMail){

            return res.status(409).json("email already exist!")
        }
        const checkUserName = await User.findOne({userName:username})

        if(checkUserName){

            return res.status(409).json("Username is already exists!")
        }
        if(password !== repass){

            return res.status(409).json("Password do not match")

            
        }
        if(!strongPasswordRegex.test(password)){

            return res.status(409).json("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character")
        }
        
        const salt = await bcrypt.genSalt()
        const hashedPass = await bcrypt.hash(password,salt)

        const MyUser =  new User({

            firstName:fname,
            lastName:lname,
            email:email,
            userName:username,
            password:hashedPass
        })

        await MyUser.save()

        res.status(201).json("User created Successfuly")
        
    } catch (error) {

        res.status(404).send("Smtg happened check the console")
        console.log("Smtg happend due to this",error);
        
        
    }
})


app.post("/addNote",verifyToken,async (req,res)=>{


    try {

        const {title,description,startdate,endDate} = req.body

        if(!title || !description || !startdate || !endDate){

            return res.status(409).json("All the input are required")
        }

        const myNote = new Note({
            
            
            user: req.user.id,
            name:title,
            description:description,
            startDate:startdate,
            estimatedDate:endDate

        }) 

        await myNote.save()

        return res.status(201).json({

            success:true,
            message:"Note created Successfuly",
            note:myNote
        })
        
    } catch (error) {

        res.status(500).json("Internal server error")
        console.log("dmtg happend due to this",error);
        
        
    }
})

app.get("/getNotes",verifyToken,async (req,res)=>{


    try {

        const data = await Note.find({user:req.user.id})

        if(!data){

            return res.status(404).json({
                message:"No Notes Available"
            })
        }

        return res.status(201).json(data)
        
    } catch (error) {


      res.status(500).json({
            message:"Internal server error"
      })

      console.log("Error happend due to this",error);

    }
      
})



app.delete("/deleteItem/:id",verifyToken,async (req,res)=>{


    try {

        const {id} = req.params

        const deletedOne = await Note.findByIdAndDelete(id)

        if(!deletedOne) {


            return res.status(404).send("Not Found")
        }

        res.status(200).send("Deleted Successfuly")
        
    } catch (error) {
        
        res.status(500).send("Internal error")
        console.log("smtg happendee due to this",error)
    }



})

app.put("/UpdateNote/:id",verifyToken,async (req,res)=>{


    try {

        const {id}=req.params
        const {title,description,startDate,endDate}=req.body

        const UpdatedNote = await Note.findByIdAndUpdate(id,{
            
            name:title,
        description:description,
        startDate:startDate,
        estimatedDate:endDate

        },{new:true})

        


        res.status(200).send("Update Successfuly")
        
    } catch (error) {

        console.log("Smtg happened due to this",error);
        res.status(500).send("Internal error ")
        
        
    }
})


app.put("/doneNote/:id", verifyToken,async (req,res)=> {


    try {

        const {id}= req.params

        const note = await Note.findById(id)

        if(!note){

            return res.status(404).send({message:"Note not found"})
        }

        note.done = !note.done

        await note.save()

        res.status(200).json(note.done)
        
    } catch (error) {
        
        console.log("smtg happede due to this",error);
        res.status(500).send("Internal error")
        
    }
})


app.put("/UpdateProfile/:id", verifyToken, async (req, res) => {
    try {

        const {id} = req.params

        const {firstName,lastName,userName,email}=req.body

        const wantedUser = await User.findById(id)
        if(!wantedUser){

            return res.status(404).json("The user is not exist")
        }

        if(userName){

            const checkExistUser = await User.findOne({userName:userName})

            if(checkExistUser && checkExistUser._id !== id){

                return res.status(409).json("User Already exists")
            }
        }

        if(firstName !== undefined) wantedUser.firstName=firstName
        if(lastName !== undefined) wantedUser.lastName=lastName
        if(userName !== undefined) wantedUser.userName=userName
        if(email !== undefined) wantedUser.email=email

        await wantedUser.save()

        const newToken = jwt.sign({id:wantedUser._id,firstName:wantedUser.firstName,lastName:wantedUser.lastName,userName:wantedUser.userName,email:wantedUser.email},process.env.SECRET_KEY,{expiresIn:"1h"})


        res.status(200).json(newToken)

      

    } catch (error) {

        console.log("smtg happend due to this",error);
        res.status(500).send("Internal error")
        
       
    }
});


app.post("/verifyEmail", async (req,res)=>{


    try {


        const {email}=req.body

        const wantedUser = await User.findOne({email})
        if(!wantedUser){ return res.status(404).send("User is not found")


        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const salt = await bcrypt.genSalt()

        const hashOtp = await bcrypt.hash(otp,salt)

        await verifcationotpToken.deleteMany({email})
        
        const optToken = new verifcationotpToken()
        
        optToken.email=email
        optToken.otpHash=hashOtp

        await optToken.save()
        const fs = require('fs');
    const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });


        const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  await transporter.sendMail({
    from: '"NoteApp" <noreply@noteApp.com>',
    to: email,
    subject: 'Your OTP Code',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Your OTP Code</title>
      <style>
        body {
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }
        .container {
          background-color: #ffffff;
          margin: 30px auto;
          padding: 30px;
          border-radius: 10px;
          max-width: 500px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 3px solid #FFD700;
        }
        .logo {
          max-width: 100px;
          margin-bottom: 10px;
        }
        h1 {
          color: #002244;
          font-size: 22px;
        }
        p {
          color: #333333;
          font-size: 16px;
          line-height: 1.5;
        }
        .otp-box {
          background-color: #FFD700;
          color: #002244;
          font-size: 28px;
          font-weight: bold;
          text-align: center;
          padding: 15px 0;
          border-radius: 8px;
          margin: 20px 0;
          letter-spacing: 4px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #777;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="container">
          <div style="text-align: center; margin-bottom: 20px;">
  <div style="font-size: 32px; font-weight: bold; color: #FFD700; margin-bottom: 10px;">
    Note<span style="color: #002244;">App</span>
  </div>
  <h1 style="color: #002244; font-size: 22px;">Verification Code</h1>
</div>
        <p>Hello,</p>
        <p>We received a request to reset your password. Please use the code below to verify your identity. This code is valid for 5 minutes.</p>
        <div class="otp-box">${otp}</div>
        <p>If you did not request this, you can safely ignore this email.</p>
        <p>Thank you,<br>NoteApp Team</p>
        <div class="footer">
          &copy; 2025 NoteApp. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `
   
  })

  res.json('OTP sent')

        
    } catch (error) {


        res.status(500).send("internal error")
        console.log("smtg happened due to this",error)



        
    }
})

app.post("/verifyOtp", async (req,res)=>{


    try {


        const {otp,email} = req.body

        const otpCheck = await otpHash.findOne({email:email})

        if(!otpCheck){
            return res.status(404).send("The email or the otp is not exists !")
        }


        const otpString = Array.isArray(otp) ? otp.join('') : otp

        const checkOtp = await bcrypt.compare(otpString,otpCheck.otpHash)
        if(!checkOtp){
            return res.status(409).send("OTP Incorrect!")
        }

        res.status(200).send("OTP Verified Successfuly")


        
    } catch (error) {

        res.status(500).send("Internal error")
        console.log("smtg happened due to this",error);
        
        
    }
})

app.post("/changePassword",async (req,res)=>{


    try {

        const {email,newPassword}=req.body


        const checkUser = await User.findOne({email:email})
        if(!checkUser){

            return res.status(404).send("This user doesn't exists!")
        }

        const salt = await bcrypt.genSalt()
        const hashedNewPassword = await bcrypt.hash(newPassword,salt)
        const updatedUser = await User.findOneAndUpdate({email:email},{$set:{password:hashedNewPassword}},{new:true})
        await updatedUser.save()

        res.status(200).send("Password Updated Successfuly")
        
    } catch (error) {

        res.status(500).send("Internal error")
        console.log("smtg due to this",error);
        
        
    }
})

app.post("/changePasswordwithToken",verifyToken,async (req,res)=>{


    try {


        const {email,Currentpassword,newOne,confirmedOne}=req.body


        const checkUser = await User.findOne({email:email})
        if(!checkUser){return res.status(404).json("User is not exist")}

        const checkPass = await bcrypt.compare(Currentpassword,checkUser.password)
        if(!checkPass){return res.status(409).json("Incorrect Password Try Again Please") }

        if(newOne !== confirmedOne){ return res.status(409).json("Passwords doesn't match")}

        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(!strongPasswordRegex.test(newOne)){return res.status(409).json("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character")}


        const hashedNewPassword = await bcrypt.hash(newOne,10)

        checkUser.password=hashedNewPassword
        await checkUser.save()

        res.status(200).json("Password changed Successfuly")

        
    } catch (error) {

        console.log("smtg happened due to this",error);
        res.status(500).json("Internal Error server")
        
        
    }
    



})