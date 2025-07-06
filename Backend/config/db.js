import mongoose from "mongoose";
import { ENV_VARS } from './envVars.js'
import logger from "./logger.js";

export const connectDB = async () =>
    {
        logger.info({mongo_uri: ENV_VARS.MONGO_URI},"ConnectDB reached.");
        try{
            logger.info("Trying connect");
            const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
            logger.info({host: conn.connection.host},"MongoDB connected: ");
        }catch(error){
            logger.error("Error connection to: " + error.message);
            process.exit(1);
        }
        logger.info("Exiting ConnectDB, MongoDB connection established successfully.");
    }