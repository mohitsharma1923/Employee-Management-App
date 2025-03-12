
import User from './models/User.js';  // Correct path with .js extension
import connectToDatabase from './db/db.js';
import bcrypt from 'bcrypt';


const userRegister = async () => {
  connectToDatabase();
  try {
    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser =await new User({
      name: "Admin",
      email: "admin@gmail.com",
      password:hashPassword,
      role: "admin",
      
    });
    await newUser.save();
    console.log("Admin user created successfully");
  } catch (error) {
    console.log("Error creating admin user:", error);
    
  }
};

userRegister()

