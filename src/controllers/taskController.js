import {createTask,fetchTasks} from "../service/taskService.js";


//create a task and return a response

export const handleCreateTask = async (req, res) => {

    try {   
        const taskRequest = req.body;
        const newTask = await createTask(taskRequest);
        res.status(201).json(newTask); // 201 for resource created

    }catch (e) {
        res.status(400).json({ error: e.message });
    }

}

//fetch all tasks and return a response

export const handleFetchTasks = async (req, res) => {        

    try {
        const tasks = await fetchTasks();
        res.status(200).json(tasks);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }   
 }
