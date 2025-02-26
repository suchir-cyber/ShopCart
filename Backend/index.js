// packages
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

//utils
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/db.js'
import categoryRoutes from './routes/categoryRoutes.js'
import { productRoutes } from './routes/productRoutes.js'

dotenv.config();
const port = process.env.PORT || 5000;

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use("/api/users",userRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/product",productRoutes);

app.listen(port,() => console.log(`Server is working on port : ${port}`))