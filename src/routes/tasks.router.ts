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
        //TODO: Validar autenticacao
        this.router.get('/', TasksController.findAll);
        this.router.get('/:id', TasksController.find);
        this.router.post('/', TasksController.create);
        this.router.patch('/', TasksController.update);
        this.router.delete('/:id', TasksController.delete);
    }
}

export default new TasksRouter().router;