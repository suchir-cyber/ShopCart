// packages
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import http from 'http'
import { Server } from 'socket.io'

//utils
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/db.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config();
const port = process.env.PORT || 5000;

connectDB()

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

app.use((req, res, next) => {
    req.io = io;
    next();
})

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use("/api/users",userRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/products",productRoutes);
app.use("/api/upload" , uploadRoutes);
app.use("/api/orders" , orderRoutes)

app.get("/api/config/paypal", (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
  });
  

const __dirname = path.resolve()
app.use('/uploads' , express.static(path.join(__dirname + "/uploads")));

server.listen(port,() => console.log(`Server is working on port : ${port}`))