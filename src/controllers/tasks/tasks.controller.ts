import { Request, Response } from "express";
import { DataRepository } from "../../core/abstracts/generic.repository";
import { TaskBusiness } from "../../core/entities/taks.entity";
import { TasksService } from "../../services/tasks/tasks.service";

export class TasksController {
    static async create(req: Request, res: Response) {
        try {
            const input: TaskBusiness.ICreate = req.body;
            const tasksService = new TasksService(new DataRepository().tasks());
            const result = await tasksService.create(input);
            res.status(201).json(result);
        } catch (error: any) {
            throw error;
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const input: TaskBusiness.IUpdate = req.body;
            const tasksService = new TasksService(new DataRepository().tasks());
            const result = await tasksService.update(input);
            res.status(200).json(result);
        } catch (error: any) {
            throw error;
        }
    }

    static async find(req: Request, res: Response) {
        try {
            const tasksService = new TasksService(new DataRepository().tasks());
            const result = await tasksService.find(Number(req.params.id));
            res.send(result);
        } catch (error: any) {
            throw error;
        }
    }

    static async findAll(req: Request, res: Response) {
        try {
            const tasksService = new TasksService(new DataRepository().tasks());
            const result = await tasksService.findAll();
            res.status(200).json(result);
        } catch (error: any) {
            throw error;
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const tasksService = new TasksService(new DataRepository().tasks());
            await tasksService.delete(req.params.id);
            res.status(204);
        } catch (error: any) {
            throw error;
        }
    }
}