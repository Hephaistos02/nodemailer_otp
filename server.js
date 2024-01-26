const express = require('express')
const app=express()
const mongoose=require('mongoose')
const router=require('./routes/user')
const otpRouter=require('./routes/otp')

app.use(express.json())

app.use('/',router)
app.use('/',router)
app.use('/',otpRouter)
app.listen(3000,()=>{
  console.log("server running")
mongoose.connect("mongodb://localhost:27017",{
  useNewUrlParser:true,
  UseUnifiedTopology:true
}).then(()=>{
  console.log("db connected")
})
.catch((err)=>{
  console.log(err)
})
})