import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req,res){
    try{
        const {email, password, username, isAdoptionCentre} = req.body;
        if(!email || !password || !username || !isAdoptionCentre){
            return res.status(400).json({success:false, message:"All fields are required"})
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false, message:"Invalid email"})
        }
        if(password.lenght < 6){
            return res.status(400).json({success:false, message:"Password must be at least 6 characters"})
        }
        const existingUserByEmail = await User.findOne({email:email})

        if(existingUserByEmail){
            return res.status(400).json({success:false, message:"Email already exists"})
        }

        const existingUserByUsername = await User.findOne({username:username})

        if(existingUserByUsername){
            return res.status(400).json({success:false, message:"Username already exists"})
        }


        const image="";
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            email:email,
            password:hashedPassword,
            username:username,
            image:image,
            isAdoptionCentre:isAdoptionCentre
        })
    
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json({success:true, user: {
            ...newUser._doc,
            password:""
        },
        message:"User created successfully"})
    }catch(error){
        console.log("Error in signup controller" + error.message);
        res.status(500).json({success:false, message:"Internal server error"});
    }
}

export async function login(req, res){
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({success:false, message:"All fields are necessary"});
        }
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(404).json({success:false, message: "invalid credetials"});
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({success:false, message: "invalid credetials"});
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            success:true,
            user:{
                ...user._doc,
                password:"" 
            }
        })
    }catch(error){
        console.log("Error in login contr: ", error.message);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
}

export async function logout(req, res){
    try{
        res.clearCookie("jwt-dogood");
        res.status(200).json({success:true, message: "Logged out successfully"})
    }
    catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({success:false, message:"Internal server error"});
    }
};