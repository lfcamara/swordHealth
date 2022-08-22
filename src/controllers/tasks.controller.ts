import { Request, Response } from "express";
import { DataRepository } from "../core/abstracts/generic.repository";
import { TaskBusiness } from "../core/entities/taks.entity";
import { TasksService } from "../services/tasks.service";

export class TasksController {
    static async create(req: Request, res: Response) {
        try {
            const input: TaskBusiness.ICreate = {
                userId: req.session.userId,
                summary: req.body.summary
            };
            const tasksService = new TasksService(new DataRepository().tasks());
            const result = await tasksService.create(input);
            delete result.user.password;
            res.status(201).json(result);
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const input: TaskBusiness.IUpdate = {
                id: Number(req.params.id),
                ...req.body
            };
            const tasksService = new TasksService(new DataRepository().tasks());
            const result = await tasksService.update(req.session.userId, input);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }

    static async find(req: Request, res: Response) {
        try {
            const tasksService = new TasksService(new DataRepository().tasks());
            const result = await tasksService.find({ id: Number(req.params.id) });
            res.send(result);
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }

    static async findAll(req: Request, res: Response) {
        try {
            const tasksService = new TasksService(new DataRepository().tasks());
            const result = await tasksService.findAll();
            res.status(200).json(result);
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }

    static async findUserTasks(req: Request, res: Response) {
        try {
            const tasksService = new TasksService(new DataRepository().tasks());
            const result = await tasksService.find({ ownerId: req.session.userId });
            res.send(result);
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const tasksService = new TasksService(new DataRepository().tasks());
            await tasksService.delete(req.params.id);
            res.status(204).send();
        } catch (error: any) {
            res.status(error.status).json(error);
        }
    }
}