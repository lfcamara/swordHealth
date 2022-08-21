import { Router } from "express";
import { body, header } from "express-validator";
import { TasksController } from "../controllers/tasks.controller";
import { RequestValidation } from "../middlewares/request.validation.middleware";

class TasksRouter {
    public router: Router;

    public constructor() {
        this.router = Router({ mergeParams: true });
        this.init();
    }

    init() {
        //TODO: Validar autenticacao
        this.router.get('/', TasksController.findAll);
        this.router.get('/:id', TasksController.find);
        this.router.post('/', 
            header('userId').exists(),
            body('summary').isLength({ min: 1, max: 2500 }),
            RequestValidation.validateRequest,
            TasksController.create);
        this.router.patch('/:id',
            (body('summary') || body('status')).exists(),
            RequestValidation.validateRequest, 
            TasksController.update);
        this.router.delete('/:id',
            TasksController.delete);
    }
}

export default new TasksRouter().router;