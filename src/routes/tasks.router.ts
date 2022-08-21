import { Router } from "express";
import { TasksController } from "../controllers/tasks/tasks.controller";

class TasksRouter {
    public router: Router;

    public constructor() {
        this.router = Router({ mergeParams: true });
        this.init()
    }

    init() {
        //TODO: Validar dados de entrada utilizando express-validator
        this.router.post('/', TasksController.create);
        this.router.patch('/', TasksController.update);
        this.router.get('/', TasksController.findAll);
    }
}

export default new TasksRouter().router;