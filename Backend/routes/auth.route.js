import express from "express";
import { signup, login, logout, authenticateUser} from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);

authRoutes.post("/login", login);

authRoutes.post("/logout", logout);

authRoutes.get("/authenticate", authenticateUser);

export default authRoutes;