import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/db.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import authRoutes from '../src/routes/auth.routes.js'
dotenv.config();

const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
}));

app.use(bodyParser.json({ limit: "10mb" })); // Adjust limit as needed
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser())
app.use("/auth",authRoutes)

connectDB();
const Port = process.env.PORT
app.listen(Port,()=>{
    console.log("Server is running on-"+Port)
})