import path from 'path';
import multer from "multer";
import User from "../models/User.js";
import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";



const storage = multer.diskStorage({
    designation: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })


const addEmployee = async (req, res) => {
    try {
        const { name, email, employeeId, dob, gender, maritalStatus, designation, department, salary, password, role } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, error: "User already registered in emp" })

        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : "",

        })
        console.log(newUser)
        const savedUser = await newUser.save();

        const newEmployee= new Employee({
             userId:savedUser._id,
             employeeId,
             dob,
             gender,
             maritalStatus,
             designation,
             department,
             salary,
        })

        await newEmployee.save();
        return res.status(200).json({success:true,message:"Employee added successfully"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, error: "add employee server error" })
    }
}


export { addEmployee, upload }
