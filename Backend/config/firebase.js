import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import logger from './logger.js';

import { ENV_VARS } from "./envVars.js";
import admin from "firebase-admin"
const serviceAccount = require('../../dogood-firebase.json'); 

logger.info("Initializing firebase project");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: ENV_VARS.FIREBASE_STORAGE,
});

export const Firebase = admin;