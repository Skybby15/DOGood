import jwt from "jsonwebtoken";

import { ENV_VARS } from "../config/envVars.js";
import logger from "../config/logger.js";

import { User } from "../models/user.model.js";

import express from 'express';


/**
 * Middleware to protect routes
 * @param {express.Request} req - request
 * @param {express.Response} res - response
 * @param {express.NextFunction} next - function that is called after route checks
 * @returns {express.Response | void} an error Response if unauthorized or an error occurs, otherwise calls next()
 * @description This middleware checks if the request has a valid JWT token in the Authorization header.
 */
const protectRoute = async (req, res, next) => {
    logger.info("ProtectRoute middleware called");

    try{
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) 
            return res.status(401).json({ message: "Missing token" });

        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(401).json({success:false, message:"Unauthorized"});
        }
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({success:false, message:"Invalid token"});
        }
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(404).json({success:false, message:"User not found"});
        }
        req.user = user;
        next();
    }catch(error){
        logger.error({error: error.message},"Error in protectRoute");
        return res.status(500).json({success:false, message:"Internal Server Error"});
    }

    logger.info("Exiting ProtectRoute middleware");
}

export default protectRoute;