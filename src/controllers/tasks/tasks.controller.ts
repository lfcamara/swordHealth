import { Request, Response } from "express";
import { DataRepository } from "../../core/abstracts/generic.repository";
import { CreateTaskDTO } from "../../core/dtos/create-task.dto";
import { TasksService } from "../../services/tasks/tasks.service";

export class TasksController {
    static async create(req: Request, res: Response) {
        try {
            const input: CreateTaskDTO = req.body;
            const tasksService = new TasksService(new DataRepository().tasks());
            const result = await tasksService.create(input);
            res.status(201).json(result);
        } catch (error: any) {
            throw error;
        }
    }
}