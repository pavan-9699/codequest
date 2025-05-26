import mongoose from "mongoose";
 const userschema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    otp:{type:String,required:false},
    password:{type:String,required:true},
    about:{type:String},
    tags:{type:[String]},
    joinedon:{type:Date,default:Date.now},
 })

 export default mongoose.model("User",userschema)