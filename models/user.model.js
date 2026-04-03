const mongoose = require("mongoose")
const UserSchema =new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    profileImage:{type:String},
    // profileImage:{
    //     secureUrl:{type:String, required:true},
    //     id:{type:String, required:true}
    // }
}, {timestamps:true})

const UserModel= mongoose.model("user", UserSchema)

module.exports= UserModel