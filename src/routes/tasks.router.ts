import { Router } from "express";
import { body } from "express-validator";
import { TasksController } from "../controllers/tasks.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { RequestValidation } from "../middlewares/request.validation.middleware";

class TasksRouter {
    public router: Router;

    public constructor() {
        this.router = Router({ mergeParams: true });
        this.init();
    }

    init() {
        this.router.get('/', 
            AuthMiddleware.checkPermissions,
            TasksController.findAll
        );
        this.router.get('/:id', TasksController.find);
        this.router.post('/',
            body('summary').isString().isLength({ min: 1, max: 2500 }),
            RequestValidation.validateRequest,
            TasksController.create);
        this.router.patch('/:id',
            (body('summary') || body('status')).isString(),
            RequestValidation.validateRequest, 
            TasksController.update);
        this.router.delete('/:id',
            TasksController.delete);
    }
}

export default new TasksRouter().router;