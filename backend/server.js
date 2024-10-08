import express from 'express'
import authRoutes from './src/routes/auth.routes.js'
import userRoutes from './src/routes/user.route.js'
import postRouter from './src/routes/post.routes.js'
import notiRouter from './src/routes/notification.routes.js'
import dotenv from 'dotenv'
import connectMongoDB from './src/db/connectMongoDB.js'
import cookieParser from 'cookie-parser';
import cors from "cors"

import { v2 as cloudinary } from 'cloudinary'

dotenv.config();
const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:'5mb'}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/post",postRouter)
app.use("/api/notification",notiRouter)

app.listen(process.env.PORT,()=>{
    console.log(`server running at port:${process.env.PORT}`);
    connectMongoDB();
})
