import db from "../config/db.js";

//post tasks
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
      createdAt: new Date(),
    };
  } catch (e) {
    throw new Error("Database error: " + e.message);
  }
};

//get tasks from database
export const getAllTasks = async () => {
  const sql = "SELECT * FROM tasks";

  try {
    const [rows] = await db.query(sql);
    return rows;
  } catch (e) {
    throw new Error("Database error: " + e.message);
  }
};

//get task by id

export const fetchTaskById = async (id) => {
  const params = [id];
  const sql = "SELECT * FROM tasks WHERE id = ?";

  try{
    const [rows] = await db.execute(sql, params);
    return rows[0];
    }catch(e){      

         throw new Error("Database error: " + e.message);
    }

};

//update task

export const updateTaskDetails = async (id, data) => {
  const { title, priority } = data;

  const sql = `
    UPDATE tasks
    SET title = ?, priority = ?
    WHERE id = ?
  `;

  try {
    const [result] = await db.execute(sql, [title, priority, id]);
    return result.affectedRows; 
  } catch (e) {
    throw new Error("Database error: " + e.message);
  }
 
};

//update task status

export const updateTaskStatus = async (taskId, status) => {
  
    const sql = `
    UPDATE tasks
    SET status = ?
    WHERE id = ?
  `;

  try {
    const [result] = await db.execute(sql, [status, taskId]);
    return result.affectedRows; 
  } catch (e) {
    throw new Error("Database error: " + e.message);
  }

}
