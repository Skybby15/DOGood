import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVars.js"


import express from "express";
/**
 * Generates a JWT token and sets it as a cookie in the response.
 * @param {string} userId - The ID of the user to include in the token payload.
 * @param {express.Response} res - The Express response object to set the cookie on.
 * @returns {string} The generated JWT token.
 */
export const generateToken = (userId) =>{
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn: "15d"});

    return token;
};