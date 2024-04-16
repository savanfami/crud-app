import  mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profilePic:{type:String},
    Role:{type:String,enum:['user','admin'],default:'user'}
})

const User=mongoose.model('user',userSchema)

export default User