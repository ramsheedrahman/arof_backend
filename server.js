import express from 'express'
import dotenv from "dotenv";
import cors from 'cors'
import morgan from "morgan";
import connectDB from './config/Db.js';
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js'
import productsRoute from './routes/productsRoute.js'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Now you can use __dirname as usual

const app=express()
dotenv.config();
connectDB()
//middelwares
app.use(cors({
  origin: 'https://ecommerce-arof.vercel.app/',
  credentials: true // if you're using cookies
}));
app.use(express.json({limit:'10mb'}));
app.use(morgan("dev"));
//routes
app.use("/auth", authRoute);
app.use("/category",categoryRoute);
app.use("/product",productsRoute);



const PORT = process.env.PORT || 8000;
console.log(process.env.STRIPE_SECRET_KEY)
app.listen(PORT, () => {
          console.log(
`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
        .white
    );
  });
