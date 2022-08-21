import { Router } from "express";
import { body, header } from "express-validator";
import { UsersController } from "../controllers/users.controller";
import { RequestValidation } from "../middlewares/request.validation.middleware";

class UserRouter {
    public router: Router;

    public constructor() {
        this.router = Router({ mergeParams: true });
        this.init()
    }

    init() {
        //TODO: Validar autenticacao
        this.router.get('/', UsersController.findAll);
        this.router.get('/:id', UsersController.find);
        this.router.post('/', 
            body('username').exists(),
            body('password').isLength({ min: 5 }),
            RequestValidation.validateRequest,
            UsersController.create);
        this.router.patch('/', 
            (body('username') || body('password') || body('role')).exists(),
            RequestValidation.validateRequest,
            UsersController.update);
        this.router.delete('/:id', UsersController.delete);
    }
}

export default new UserRouter().router;