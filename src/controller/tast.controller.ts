import { Request, Response, NextFunction } from "express";
import TaskService from "../services/task.services";
import successResponse from "../utils/successResponse";
import taskSchema from "../validator/task.validator";

export default class TaskController {
  static createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validate = await taskSchema.validateAsync(req.body);
      const newTask = await TaskService.createTastk(validate);
      res
        .status(201)
        .json(successResponse(201, "Task created successfully", newTask));
    } catch (error) {
      next(error);
    }
  };

  static getAllTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tasks = await TaskService.getAllTasks();
      if (!tasks) {
        res.status(404).json(successResponse(404, "No tasks found", []));
        return;
      }
      res.status(200).json(successResponse(200, "Tasks found", tasks));
    } catch (error) {
      next(error);
    }
  };

  static getTaskById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const task = await TaskService.getTaskById(id);
      if (!task) {
        res.status(404).json(successResponse(404, "Task not found", []));
        return;
      }
      res.status(200).json(successResponse(200, "Task found", task));
    } catch (error) {
      next(error);
    }
  };

  static getTaskByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params;
      const task = await TaskService.getTaskByUserId(userId);
      res.status(200).json(successResponse(200, "Task found", task));
    } catch (error) {
      next(error);
    }
  };

  static updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const task = req.body;
      const updatedTask = await TaskService.updateTask(id, task);
      res.status(200).json(successResponse(200, "Task updated", updatedTask));
    } catch (error) {
      next(error);
    }
  };

  static deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const deletedTask = await TaskService.deleteTask(id);
      if (!deletedTask) {
        res.status(404).json(successResponse(404, "Task not found", []));
        return;
      }
      res
        .status(200)
        .json(successResponse(200, "Task deleted successfully", deletedTask));
    } catch (error) {
      next(error);
    }
  };
}
