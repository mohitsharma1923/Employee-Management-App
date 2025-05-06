import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addEmployee, upload ,getEmployees,getEmployee,updateEmployee} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/add",authMiddleware,upload.single("image"),addEmployee);
router.get("/",authMiddleware,getEmployees);
router.get("/:id",authMiddleware,getEmployee);
router.put("/:id",authMiddleware,updateEmployee);



export default router