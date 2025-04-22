import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addEmployee, upload } from "../controllers/employeeController.js";

const router = express.Router();

router.post("/add",authMiddleware,upload.single("image"),addEmployee);



export default router