import TaskModel, { ITask } from "../model/task.model";

export default class TaskService {
  static createTastk = async (task: any) => {
    const newTask = await TaskModel.create(task);
    return newTask;
  };

  static getAllTasks = async () => {
    const tasks = await TaskModel.find({}).sort({ createdAt: -1 });
    return tasks.length > 0 ? tasks : null;
  };

  static getTaskById = async (id: string) => {
    const task = await TaskModel.findById(id);
    if (!task) {
      return null;
    }
    return task;
  };

  static updateTask = async (id: string, task: ITask) => {
    const update = await TaskModel.findByIdAndUpdate(id, task, {
      new: true,
      runValidators: true,
    });
    return update;
  };

  static getTaskByUserId = async (userId: string) => {
    const tasks = await TaskModel.find({ userId }).sort({ createdAt: -1 });
    return tasks;
  };

  static deleteTask = async (id: string) => {
    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) {
      return null;
    }
    return task;
  };
}
