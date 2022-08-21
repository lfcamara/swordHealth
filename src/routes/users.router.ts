import { Router } from "express";
import { UsersController } from "../controllers/users.controller";

class UserRouter {
    public router: Router;

    public constructor() {
        this.router = Router({ mergeParams: true });
        this.init()
    }

    init() {
        //TODO: Validar dados de entrada utilizando express-validator
        //TODO: Validar autenticacao
        this.router.get('/', UsersController.findAll);
        this.router.get('/:id', UsersController.find);
        this.router.post('/', UsersController.create);
        this.router.patch('/', UsersController.update);
        this.router.delete('/:id', UsersController.delete);
    }
}

export default new UserRouter().router;