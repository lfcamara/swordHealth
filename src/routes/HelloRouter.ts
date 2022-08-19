import { Router } from "express";
import { HelloController } from "../controllers/HelloController";

class HelloRouter {
    public router: Router;

    public constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        const controller = new HelloController();
        this.router.get('/', controller.hello);
    }
}

export default new HelloRouter().router;