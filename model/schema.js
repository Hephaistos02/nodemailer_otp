const {default : mongoose} = require ("mongoose")

const schema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String
    }
})


module.exports = mongoose.model("schema",schema)