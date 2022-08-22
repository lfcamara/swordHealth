import { Router } from "express";
import { body, header } from "express-validator";
import { UsersController } from "../controllers/users.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { RequestValidation } from "../middlewares/request.validation.middleware";

class UserRouter {
    public router: Router;

    public constructor() {
        this.router = Router({ mergeParams: true });
        this.init()
    }

    init() {
        this.router.get('/:id', 
            AuthMiddleware.checkPermissions,
            UsersController.find
        );
        this.router.get('/',
            AuthMiddleware.checkPermissions,
            UsersController.findAll
        );
        this.router.post('/', 
            body('username').isString(),
            body('password').isString().isLength({ min: 5 }),
            AuthMiddleware.checkPermissions,
            RequestValidation.validateRequest,
            UsersController.create
        );
        this.router.patch('/:id', 
            body('username').optional().isString(),
            body('password').optional().isString(),
            body('role').optional().isString(),
            AuthMiddleware.checkPermissions,
            RequestValidation.validateRequest,
            UsersController.update
        );
        this.router.delete('/:id', 
            AuthMiddleware.checkPermissions,
            UsersController.delete
        );
    }
}

export default new UserRouter().router;