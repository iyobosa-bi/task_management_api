import {
  createTask,
  fetchTasks,
  updateTask,
  assigneeTaskStatusUpdate,
  unassignTaskService,
  deleteTaskByAssigner,
} from "../service/taskService.js";
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

export const handleUpdateTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    const currentUserId = parseInt(req.body.userId); //gets the userid from the request body. This is an assumption the user knows his userid but it ought to be validated

    const updatedTask = await updateTask(taskId, req.body, currentUserId);

    sendSuccessResponse(res, updatedTask, "Task updated successfully", 200);
  } catch (e) {
    sendErrorResponse(res, e.message, "Failed to update task", 400);
  }
};

export const handleUpdateTaskAssigneeStatus = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const currentUserId = parseInt(req.body.userId);
    const updatedTask = await assigneeTaskStatusUpdate(
      taskId,
      req.body,
      currentUserId,
    );

    sendSuccessResponse(
      res,
      updatedTask,
      "Task status updated successfully",
      200,
    );
  } catch (e) {
    sendErrorResponse(res, e.message, "Failed to update task status", 400);
  }
};

export const handleUnassignTask = async (req, res) => {
  const taskId = parseInt(req.params.id);
  const currentUserId = parseInt(req.body.userId);

  try {
    const result = await unassignTaskService(taskId, currentUserId);

    if (result) {
      sendSuccessResponse(res, null, "Task unassigned successfully", 200);
    }
  } catch (e) {
    sendErrorResponse(res, e.message, "Failed to unassign task", 500);
  }
};

//deleete task

export const handleDeleteTask = async (req, res) => {
  const taskId = parseInt(req.params.id);
  const userId = parseInt(req.body.userId);

  try {
    const response = await deleteTaskByAssigner(taskId, userId);

    if (!response) {
      sendErrorResponse(
        res,
        "Failed to delete task",
        "Failed to delete task",
        400,
      );
    } else {
      sendSuccessResponse(res, null, "Task deleted successfully", 200);
    }
  } catch (e) {
    sendErrorResponse(res, e.message, "Failed to delete task", e.statusCode);
  }
};
