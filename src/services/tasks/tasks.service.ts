import { IRepository } from "../../core/abstracts/generic.repository";
import { TaskBusiness } from "../../core/entities/taks.entity";

export class TasksService {
    public constructor(private tasksRepository: IRepository<TaskBusiness.Task>) {}
    
    public async create(input: TaskBusiness.ICreate): Promise<TaskBusiness.Task> {
        const newTask = TaskBusiness.Task.compose(input);
        return this.tasksRepository.create(newTask);
    }

    public async findAll() {
        return this.tasksRepository.findAll();
    }

    public async find(id: number) {
        return this.tasksRepository.find(id);
    }

    public async update(input: TaskBusiness.IUpdate): Promise<TaskBusiness.Task> {
        return this.tasksRepository.update(input); 
    }
}