const express=require('express')
const router=express.Router()
const nodemailer=require('nodemailer')
const schema=require('../model/schema')
router.post('/register',async (req,res)=>{
  try {
    const {username,password}=req.body
   await schema.create({username,password})
    res.status(200).json({message:"register successfully"})
  } catch (error){
    res.status(500).json({error:"register failed"})
    console.log(error);
  }
 
})
router.post('/forgot',async (req,res)=>{
  try {
    const {username}=req.body
   const schema1=await schema.findOne({username})
   if(!schema1)
   return res.status(401).json({error:"otp failed"})
  const otp= Math.floor(1000000+Math.random()*9000)
  const newotp= otp.toString()
  await schema.findByIdAndUpdate(schema1._id,{otp:newotp},{new:true})


  

  // Create a transporter using SMTP transport
  const transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sahilms750@gmail.com',
      pass: "hpcf ctiz vaya ogze"
    }
  });
  
  // Email content
  const mailOptions = {
    from: 'sahilms750@gmail.com',
    to: 'mumthazshihabudheen77@gmail.com',
    subject: 'subject otpp', 
    text: "The OTP for your password reset is : "  +newotp
  };
  
  // Send email
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
  
    res.status(200).json({message:"OTP sent Sucessfully"})
  } catch (error){
    res.status(500).json({error:"otp Sent failed"})
  }
 
})
module.exports=router
