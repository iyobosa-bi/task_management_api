import express from "express";
import {
  handleCreateTask,
  handleFetchTasks,
  handleUpdateTask,
  handleUpdateTaskAssigneeStatus
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", handleCreateTask);

router.get("/", handleFetchTasks);

router.patch("/:id", handleUpdateTask);

router.patch("/:id/status", handleUpdateTaskAssigneeStatus);

export default router;
