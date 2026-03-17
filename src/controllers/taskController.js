import { createTask, fetchTasks } from "../service/taskService.js";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../service/responseTrait.js";

//create a task and return a response

export const handleCreateTask = async (req, res) => {
  try {
    const taskRequest = req.body;
    const newTask = await createTask(taskRequest);

    sendSuccessResponse(res, newTask, "Task created successfully", 201);
  } catch (e) {
    sendErrorResponse(res, e.message, "Failed to create task", 400);
  }
};

//fetch all tasks and return a response

export const handleFetchTasks = async (req, res) => {
  try {
    const tasks = await fetchTasks();
    sendSuccessResponse(res, tasks, "Tasks fetched successfully", 200);
  } catch (e) {
    sendErrorResponse(res, e.message, "Failed to fetch tasks", 500);
  }
};
