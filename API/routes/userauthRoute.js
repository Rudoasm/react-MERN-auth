import express from "express";
import { signup, signin, signout } from "../controllers/authController.js";
const router = express.Router();

router.post("/signUp", signup);
router.post("/signIn", signin);
router.get("/signout", signout);
export default router;
// export as default so it can be imported however needed.
