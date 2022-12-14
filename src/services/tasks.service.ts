import { IRepository } from "../core/abstracts/generic.repository";
import { TaskBusiness } from "../core/entities/taks.entity";
import { ApplicationError, ErrorTypes } from "../core/errors";
import { IUsersService } from "./users.service";

export interface ITasksService {
    create(input: TaskBusiness.ICreate): Promise<TaskBusiness.Task>;
    findAll(): Promise<TaskBusiness.Task[]>;
    find(filters: any): Promise<TaskBusiness.Task>;
    update(userId: number, input: TaskBusiness.IUpdate): Promise<TaskBusiness.Task>;
    delete(id: number): Promise<void>
}
export class TasksService implements ITasksService{
    public constructor(
        private tasksRepository: IRepository<TaskBusiness.Task>,
        private usersService?: IUsersService 
    ) {
        this.usersService = usersService;
    }
    
    public async create(input: TaskBusiness.ICreate): Promise<TaskBusiness.Task> {
        input.user = await this.usersService.find({ id: input.userId });
        const newTask = TaskBusiness.Task.compose(input);
        return this.tasksRepository.create(newTask);
    }

    public async findAll(): Promise<TaskBusiness.Task[]> {
        return this.tasksRepository.findAll();
    }

    public async find(filters: any): Promise<TaskBusiness.Task> {
        return this.tasksRepository.find(filters);
    }

    public async update(userId: number, input: TaskBusiness.IUpdate): Promise<TaskBusiness.Task> {
        const task = await this.checkIfIsSameUser(userId, input.id);
        input.summary ? task.summary = input.summary : task.status = input.status;
        
        return this.tasksRepository.create(task);
    }

    public async delete(id: number): Promise<void> {
        await this.tasksRepository.delete(id);
    }

    async checkIfIsSameUser(userId: number, taskId: number) {
        const task = await this.find({ id: taskId });
        if (Number(task.user) != userId) {
            throw new ApplicationError(ErrorTypes.Forbidden());
        }
        return task;
    }
}