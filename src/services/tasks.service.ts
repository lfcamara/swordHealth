import { IRepository } from "../core/abstracts/generic.repository";
import { TaskBusiness } from "../core/entities/taks.entity";
import { ApplicationError, ErrorTypes } from "../core/errors";

export class TasksService {
    public constructor(private tasksRepository: IRepository<TaskBusiness.Task>) {}
    
    public async create(input: TaskBusiness.ICreate): Promise<TaskBusiness.Task> {
        const newTask = TaskBusiness.Task.compose(input);
        return this.tasksRepository.create(newTask);
    }

    public async findAll() {
        return this.tasksRepository.findAll();
    }

    public async find(taskId: number) {
        return this.tasksRepository.find(taskId);
    }

    public async update(userId: number, input: TaskBusiness.IUpdate): Promise<TaskBusiness.Task> {
        await this.checkIfIsSameUser(userId, input.id);
        await this.tasksRepository.update(input); 
        return this.find(input.id);
    }

    public async delete(id: string): Promise<void> {
        await this.tasksRepository.delete(id);
    }

    async checkIfIsSameUser(userId: number, taskId: number) {
        const task = await this.find(taskId);
        if(task.ownerId != userId) {
            throw new ApplicationError(ErrorTypes.Forbidden());
        }
    }
}