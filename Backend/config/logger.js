import pino from "pino";
import path from "path";
import fs from "fs";
import { ENV_VARS } from "./envVars.js";

// Ensure the logs folder exists
const logDir = path.resolve('logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true }); // creates nested folders if needed
}

// Create write stream
const logStream = fs.createWriteStream(path.join(logDir, 'app.log'), { flags: 'a' });

// Create Pino logger instance
const logger = pino(
  {
    level: ENV_VARS.LOG_LEVEL,
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level(label) {
        return { level: label };
      }
    }
  },
  pino.multistream([
    { stream: process.stdout },      // console
    { stream: logStream }           // file
  ])
);

export default logger;