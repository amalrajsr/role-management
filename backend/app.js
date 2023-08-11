import express from 'express'
import dotenv from 'dotenv'
import adminRoutes from './routes/adminRoute.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
import './config/db.js'
import {errorHandler}  from './middleware/errorHandler.js'
import notFound from './utils/404.js'
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
app.use('/api/v1/admin/',adminRoutes)
app.use('/api/v1/user/',userRoutes)
app.use(notFound)
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})


