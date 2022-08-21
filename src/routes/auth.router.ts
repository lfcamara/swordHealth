import { Router } from "express";
import { AuthController } from "../controllers/auth.controller"

class AuthRouter {
    public router: Router;

    public constructor() {
        this.router = Router({ mergeParams: true });
        this.init();
    }

    init() {
        this.router.get('/login', AuthController.login);
        //this.router.delete('/logout', AuthController.logout);
    }
}

export default new AuthRouter().router;