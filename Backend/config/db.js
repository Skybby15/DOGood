import mongoose from "mongoose";
import { ENV_VARS } from './envVars.js'


export const connectDB = async () =>
    {
        console.log("Am ajuns la connect: ");
        console.log(ENV_VARS.MONGO_URI);
        try{
            const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
            console.log("MongoDB connected: " + conn.connection.host);
        }catch(error){
            console.error("Error connection to: " + error.message);
            process.exit(1);
        }
    }