import express from "express";
const router = express.Router();

import { signUp ,signIn,googleSignIn} from "../controllers/user.js";
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/googleSignIn", googleSignIn);

export default router;
