import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/db.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import questionRoutes from '../src/routes/question.routes.js'
import answerRoutes from '../src/routes/answers.routes.js'
import authRoutes from '../src/routes/auth.routes.js'
import notificationRoutes from '../src/routes/notifications.routes.js'
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
app.use('/questions', questionRoutes)
app.use("/answers", answerRoutes);
app.use("/notifications", notificationRoutes);
connectDB();
const Port = process.env.PORT
app.listen(Port,()=>{
    console.log("Server is running on-"+Port)
})