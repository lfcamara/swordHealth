import { Request, Response } from "express";
import { DataRepository } from "../core/abstracts/generic.repository";
import { UsersService } from "../services/users.service";

export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const userService = new UsersService(new DataRepository().users());
            await userService.login(username, password);
            res.status(204);
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }
}