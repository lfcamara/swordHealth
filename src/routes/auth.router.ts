import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/auth.controller"
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { RequestValidation } from "../middlewares/request.validation.middleware";

class AuthRouter {
    public router: Router;

    public constructor() {
        this.router = Router({ mergeParams: true });
        this.init();
    }

    init() {
        this.router.get('/login', 
            body('username').isString(),
            body('password').isString(),
            RequestValidation.validateRequest,
            AuthController.login
        );
        this.router.delete('/logout', 
            AuthMiddleware.checkAuthentication,
            AuthController.logout
        );
    }
}

export default new AuthRouter().router;