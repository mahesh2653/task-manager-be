import { Router } from "express";
import TaskController from "../controller/tast.controller";

const taskRouter = Router();

taskRouter.get("/", TaskController.getAllTasks);
taskRouter.get("/:id", TaskController.getTaskById);
taskRouter.post("/", TaskController.createTask);
taskRouter.put("/:id", TaskController.updateTask);
taskRouter.delete("/:id", TaskController.deleteTask);
taskRouter.get("/user/:userId", TaskController.getTaskByUserId);

export default taskRouter;
