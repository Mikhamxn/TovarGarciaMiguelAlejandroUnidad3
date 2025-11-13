import { Router } from "express";
import { authController } from "../controllers/authController.js";

const rutasAuth = Router();

rutasAuth.post("/api/auth/registrar", authController.registrar);
rutasAuth.post("/api/auth/login", authController.login);

export default rutasAuth;
