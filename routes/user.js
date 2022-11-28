import express from "express";
const router = express.Router();
import {signup,signin,googleSignin} from '../controllers/user.js'

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/googleSignin",googleSignin);
export default router;