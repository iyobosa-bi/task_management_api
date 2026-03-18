import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app =  express();
app.use(express.json());

app.use("/tasks", taskRoutes);

//routes defintion

app.get("/",(req,res)=>{
    res.send("Welcome to Task Manager API");
}); 

export default app;

