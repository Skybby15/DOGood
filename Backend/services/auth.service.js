import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import logger from "../config/logger.js";

/**
 * Signup user
 * @param {{email:string, password:string, username: string, isAdoptionCentre: boolean}} credentials - user signup credentials
 * @returns {Promise<User>} - the newly created user
 */
export async function signupAuth(credentials) {
    logger.info("SignupAuth called with email: ", credentials.email);   

    const { email, password, username, isAdoptionCentre } = credentials;
    
    if(!email || !password || !username || isAdoptionCentre == null){
        throw new Error("All fields are required");
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email)){
        throw new Error("Invalid email");
    }
    if(password.length < 6){
        throw new Error("Password must be at least 6 characters");
    }
    const existingUserByEmail = await User.findOne({email:email})

    if(existingUserByEmail){
        throw new Error("Email already exists");
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

    await newUser.save();
    logger.info("SignupAuth exiting, new user created with ID: ", newUser._id);
    return newUser;
}

/**
 * Login user
 * @param {{email:string, password:string}} credentials - user login credentials
 * @returns {Promise<User>} - the logged in user
 */
export async function loginAuth(credentials) {
    logger.info({email: credentials.email},"LoginAuth called with email: ");
    const { email, password } = credentials;

    if (!email || !password) {
        throw new Error("All fields are required");
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    logger.info({userid: user._id},"LoginAuth exiting successfully");
    return user;
}