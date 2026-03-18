import {
  insertTask,
  getAllTasks,
  fetchTaskById,
  updateTaskDetails,
  updateTaskStatus,
} from "../model/taskModel.js";

export const createTask = async (taskInfo) => {
  const { title, priority, assignedTo, assignedBy } = taskInfo; // Destructure the task information

  //validate for data Type

  if (
    typeof title !== "string" ||
    typeof priority !== "string" ||
    typeof assignedTo !== "number" ||
    typeof assignedBy !== "number"
  ) {
    throw new Error("A Validation Error Occured");
  }

  // validate for required fields and priority values
  if (!title || !priority || !assignedTo || !assignedBy) {
    throw new Error("All fields are required.");
  }

  if (!validPriorities.includes(priority.toLowerCase())) {
    throw new Error("Priority must be  low, medium, high.");
  }

  try {
    const newTask = await insertTask({
      title,
      priority,
      assignedTo,
      assignedBy,
    });
    return newTask;
  } catch (e) {
    throw new Error("Failed to create task: " + e.message);
  }
};

export const fetchTasks = async () => {
  try {
    const tasks = await getAllTasks();
    return tasks;
  } catch (e) {
    throw new Error("Failed to fetch tasks: " + e.message);
  }
};

const validPriorities = ["low", "medium", "high"];

export const updateTask = async (taskId, updateData, currentUserId) => {
  const { title, priority } = updateData;

  if (!currentUserId) {
    throw new Error(
      "Invalid Credentials: User ID is required for authorization",
    );
  }

  const existingTask = await fetchTaskById(taskId);
  if (!existingTask) {
    throw new Error("Task not found");
  }

  if (existingTask.assignedBy !== currentUserId) {
    throw new Error(
      "Authorization Error: Only the user who created the task can update it",
    );
  }

  if (!title && !priority) {
    throw new Error("All fields must be provided");
  }

  if (priority && !validPriorities.includes(priority.toLowerCase())) {
    throw new Error("Priority must be one of: low, medium, high");
  }

  if (typeof title !== "string" || typeof priority !== "string") {
    throw new Error("A Validation Error Occured");
  }

  const updatedTitle = title;
  const updatedPriority = priority;

  await updateTaskDetails(taskId, {
    title: updatedTitle,
    priority: updatedPriority,
  });

  return {
    ...existingTask,
    title: updatedTitle,
    priority: updatedPriority,
  };
};

const validStatuses = ["pending", "in-progress", "completed"];

export const assigneeTaskStatusUpdate = async (
  taskId,
  newStatus,
  currentUserId,
) => {
  const { status } = newStatus;

  const task = await fetchTaskById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  if (!currentUserId) {
    throw new Error(
      "Invalid Credentials: User ID is required for authorization",
    );
  }

  if (task.assignedTo !== currentUserId) {
    throw new Error(
      "Authorization Error: Only the user assigned to the task can update its status",
    );
  }

  if (!status) {
    throw new Error("All fields are required.");
  }

  if (!validStatuses.includes(status.toLowerCase())) {
    throw new Error("Status must be one of: pending, in-progress, completed");
  }

  //checking for passing the same status as the current status
  if (task.status === status) {
    throw new Error(`Task is already marked as ${status}`);
  }

  await updateTaskStatus(taskId, status);

  return {
    ...task,
    status: status,
  };
};
