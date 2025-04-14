import mongoose, { Schema } from "mongoose";

export interface ITask {
  title: string;
  description: string;
  status: boolean;
  userId: string;
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true, default: false },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model<ITask>("task", taskSchema);

export default TaskModel;
