import { Router } from "express";
import * as usersController from '../controllers/users.controller.js';
import verifySignup from "../middlewares/signupVerification.js";

const router = Router();

router.post('/register', verifySignup, usersController.registerUser);

export default router;