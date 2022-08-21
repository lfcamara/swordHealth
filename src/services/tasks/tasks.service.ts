import { IRepository } from "../../core/abstracts/generic.repository";
import { CreateTaskDTO } from "../../core/dtos/create-task.dto";
import { Task } from "../../core/entities/taks.entity";

export class TasksService {
    public constructor(private tasksRepository: IRepository<Task>) {}
    public async create(input: CreateTaskDTO) {
        const newTask = Task.compose(input);
        return this.tasksRepository.create(newTask);
    }
}