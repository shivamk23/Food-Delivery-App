import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from "./routes/userRoute.js";
import "dotenv/config"
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const corsOptions = {
   origin: ['http://localhost:5173', 'http://localhost:5174', 'https://foodie-frontend-vidr.onrender.com' , 'https://foodie-admin-io78.onrender.com'], // Add deployed front-end origin
   credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};
 
//app config
const app = express()
const port = process.env.PORT || 4000;

//middleware
app.use(express.json())
app.use(cors(corsOptions));

// DB Connection
connectDB();

// API Endpoint
app.use("/api/food" , foodRouter)
app.use("/images" , express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart" , cartRouter)
app.use("/api/order" , orderRouter)

app.get("/" , (req,res)=>{
     res.send("API Working")
})

app.listen(port,()=>
{
   console.log(`server started on port http://localhost:${port}`)
})

