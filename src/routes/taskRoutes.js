import express from "express";
import {
  handleCreateTask,
  handleFetchTasks,
  handleUpdateTask,
  handleUpdateTaskAssigneeStatus,
  handleUnassignTask,
  handleDeleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", handleCreateTask);

router.get("/", handleFetchTasks);

router.patch("/:id", handleUpdateTask);

router.patch("/:id/status", handleUpdateTaskAssigneeStatus);

router.patch("/:id/unassign", handleUnassignTask);

router.delete("/:id", handleDeleteTask);

export default router;
