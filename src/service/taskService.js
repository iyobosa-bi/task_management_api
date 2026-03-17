import { insertTask, getAllTasks } from "../model/taskModel.js";

const validPriorities = ["low", "medium", "high"]; //Assuming these are the valid priorities for tasks

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
