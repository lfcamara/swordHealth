import { DataRepository, IRepository } from "../core/abstracts/generic.repository";
import { TaskBusiness } from "../core/entities/taks.entity";
import { ApplicationError, ErrorTypes } from "../core/errors";
import { UsersService } from "./users.service";

export class TasksService {
    public constructor(private tasksRepository: IRepository<TaskBusiness.Task>) {}
    
    public async create(input: TaskBusiness.ICreate): Promise<TaskBusiness.Task> {
        const usersService = new UsersService(new DataRepository().users());
        input.user = await usersService.find({ id: input.userId });

        const newTask = TaskBusiness.Task.compose(input);
        return this.tasksRepository.create(newTask);
    }

    public async findAll() {
        return this.tasksRepository.findAll();
    }

    public async find(filters: any) {
        return this.tasksRepository.find(filters);
    }

    public async update(userId: number, input: TaskBusiness.IUpdate): Promise<TaskBusiness.Task> {
        await this.checkIfIsSameUser(userId, input.id);
        await this.tasksRepository.update(userId, input); 
        return this.find(input.id);
    }

    public async delete(id: string): Promise<void> {
        await this.tasksRepository.delete(id);
    }

    async checkIfIsSameUser(userId: number, taskId: number) {
        const task = await this.find(taskId);
        if (task.user.id != userId) {
            throw new ApplicationError(ErrorTypes.Forbidden());
        }
    }
}