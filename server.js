import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from "url";

dotenv.config()

const app=express();

// database config
connectDB();

//esmodeule fix
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.direname(__filename);

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'./client/build')))

//routes
app.use("/api/v1/auth",authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use("/api/v1/product",productRoutes)


//rest api
app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
//port
const PORT=8080;


//run listen
app.listen(PORT,()=>{
});
