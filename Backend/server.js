import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.route.js"
import userRoutes from './routes/user.route.js';
import { connectDB } from "./config/db.js"


const app=express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

app.listen(5000, () => {
    connectDB();
});