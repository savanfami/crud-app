import bcrypt from 'bcryptjs'
import user from '../models/userSchema.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const secretkey=process.env.SECRET_KEY
 export const userSignup=async(req,res)=>{
    try{
        
    const{name,email,password}=req.body
    
    const existingUser=await user.findOne({email})
    console.log(existingUser,"hhhhhh");
    if(existingUser){
        return  res.status(409).json({success:false,message:'user already exists'})
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const newUser= await user({
        name,
        email,
        password:hashedPassword
    })

    await newUser.save()
    res.status(200).json({success:true,message:'user created successfullyy',newUser})

    }catch(err){
        console.error('Error creating user:', err);
        res.status(500).json({success:false,message:"internal server error"})
    }
}

 export const userLogin=async(req,res)=>{
    try{

        const{email,password}=req.body
        
        const findUser=await user.findOne({email})
        if(!findUser){
            return  res.status(404).json({success:false,message:'user not found'})
        }

        const validatePassword=await bcrypt.compare(password,findUser.password)
        if(!validatePassword){
            return res.status(401).json({message:'invalid Password'})
        }
        const token=jwt.sign({userId:findUser.id},secretkey,{expiresIn:'1h'})

        res.cookie('jwt',token,{httpOnly:true,secure:true,maxAge:3600000})
        res.json({success:true,message:'login successfull',findUser})
    }catch(err){
        console.error('error logging user',err)
        res.status(500).json({success:false,message:'internal server error'})
    }
}


export const logout=(req,res)=>{
    try{
        res.status(200).clearCookie('token').json({success:true,message:'logout success'})

    }catch(err){
        res.status(400).json({success:false,message:'bad request'})
    }
}
