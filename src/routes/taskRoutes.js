import express from "express";
import {handleCreateTask,handleFetchTasks} from "../controllers/taskController.js";


const router = express.Router();    

router.post("/",handleCreateTask);

router.get("/",handleFetchTasks);

export default router;

