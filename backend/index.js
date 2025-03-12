import express from 'express'
import cors from 'cors'

import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import connectToDatabase from './db/db.js'

dotenv.config()


connectToDatabase()

const app=express();

app.use(cors());

app.use(express.json());
app.use("/api/auth",authRouter)
app.use("/api/department",departmentRouter)

app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`)
})


