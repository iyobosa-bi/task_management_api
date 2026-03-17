
import db from "../config/db.js";


export const insertTask = async (taskPostRequest) => {
  const { title, priority, assignedTo, assignedBy } = taskPostRequest;

  const sql = `INSERT INTO tasks (title, priority, assignedTo, assignedBy) VALUES (?, ?, ?, ?)`;
  const params = [title, priority, assignedTo, assignedBy];

  try {
    const [dbResponse] = await db.execute(sql, params);

    // console.log("Task inserted with ID:", dbResponse.insertId);
    return {
      id: dbResponse.insertId,
      title,
      priority,
      status: "pending",       
      assignedTo,
      assignedBy,
      createdAt: new Date()   
    };
  } catch (e) {
    throw new Error("Database error: " + e.message);
  }
};


export const getAllTasks = async () => {
  const sql = "SELECT * FROM tasks";

  try {
    const [rows] = await db.query(sql);
    return rows;
  } catch (e) {
    throw new Error("Database error: " + e.message);
  }
};