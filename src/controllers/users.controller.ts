import { Request, Response } from "express";
import { DataRepository } from "../core/abstracts/generic.repository";
import { UserBusiness } from "../core/entities/user.entity";
import { UsersService } from "../services/users.service";

export class UsersController {
    static async create(req: Request, res: Response) {
        try {
            const input: UserBusiness.ICreate = req.body;
            const usersService = new UsersService(new DataRepository().users());
            const result = await usersService.create(input);
            delete result.password;
            res.status(201).json(result);
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const input: UserBusiness.IUpdate = req.body;
            const usersService = new UsersService(new DataRepository().users());
            const result = await usersService.update(Number(req.params.id), input);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }

    static async find(req: Request, res: Response) {
        try {
            const usersService = new UsersService(new DataRepository().users());
            const result = await usersService.find({ id: Number(req.params.id)});
            delete result.password;
            
            res.status(200).json(result);
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }

    static async findAll(req: Request, res: Response) {
        try {
            const usersService = new UsersService(new DataRepository().users());
            const result = await usersService.findAll();
            const finalResult = result.map((user) => {
                delete user.password
                return user;
            })

            res.status(200).json(finalResult);
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const usersService = new UsersService(new DataRepository().users());
            await usersService.delete(Number(req.params.id));
            res.status(204).send();
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }
}