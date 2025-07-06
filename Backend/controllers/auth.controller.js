import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { signupAuth, loginAuth} from "../services/auth.service.js";
import logger from "../config/logger.js";
import protectRoute from "../middleware/protectRoute.js";

import express from 'express';

/**
 * Signup controller function
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @returns 
 */
export async function signup(req,res)
{
    logger.info({body: req.body},"Signing up with body: ");

    let newUser = new User();

    try{
        newUser = await signupAuth(req.body);
    }catch(error){
        logger.error({error: error.message},"Error in signup service");
        return res.status(400).json({success:false, message:error.message});
    }

    return res.status(201).json({success:true, user: {
                ...newUser._doc,
                password:""
            },
            message:"User created successfully"})
}

/**
 * Login controller function
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @returns 
 */
export async function login(req, res)
{
    let user = new User();

    try{
        user = await loginAuth(req.body);
    }catch(error)
    {
        logger.error({error: error.message},"Error in login service");
        return res.status(400).json({success:false, message:error.message});
    }

    let token;

    try{
        token = generateToken(user._id);
    }catch(error){
        logger.error({error: error.message},"Error in token generation");
        return res.status(500).json({success:false, message:"Internal server error"});
    }

    return res.status(200).json({
        success:true,
        user:{
            ...user._doc,
            password:"" ,
        },
        token: token
    })
}

//idk how it works yet
export async function logout(req, res)
{
    try{
        res.clearCookie("jwt-dogood");
        res.status(200).json({success:true, message: "Logged out successfully"})
    }
    catch(error){
        logger.error({error: error.message},"Error in logout controller");
        res.status(500).json({success:false, message:"Internal server error"});
    }
};

/**
 * Authenticate user
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function authenticateUser(req,res)
{
    logger.info("Entering profile for user: ");

    protectRoute(req, res, async () => {
        logger.info("User profile retrieved successfully.");
        return res.status(200).json({
            success: true,
            user: {
                ...req.user._doc,
                password: "" 
            }
        });
    });

}