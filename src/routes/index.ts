import { Router } from "express";
import userRouter from "./user.route";
import taskRouter from "./task.route";

const router = Router();

const allRouters = [
  {
    name: "/users",
    route: userRouter,
  },
  {
    name: "/tasks",
    route: taskRouter,
  },
];

allRouters.forEach(({ name, route }) => {
  router.use(name, route);
});

export default router;
