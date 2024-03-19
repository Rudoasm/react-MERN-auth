import express from "express";
import { test,
    deleteUser, } from "../controllers/userController.js";
    import { verifyToken } from '../utilities/verifyUser.js';

const router = express.Router();

router.get("/", test);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;