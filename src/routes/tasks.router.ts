import { Router } from "express";
import { TasksController } from "../controllers/tasks/tasks.controller";

class TasksRouter {
    public router: Router;

    public constructor() {
        this.router = Router({ mergeParams: true });
        this.init()
    }

    init() {
        this.router.post('/', TasksController.create);
    }
}

export default new TasksRouter().router;