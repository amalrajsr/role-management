import express from 'express'
import dotenv from 'dotenv'
import adminRoutes from './routes/adminRoute.js'
import cors from 'cors'
import './config/db.js'
import {errorHandler}  from './middleware/errorHandler.js'
dotenv.config()
const app=express()
const PORT=process.env.PORT
app.use(
    cors({
      origin: [`http://localhost:5173`],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    })
  );
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/admin/',adminRoutes)
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})


