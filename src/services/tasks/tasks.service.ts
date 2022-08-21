import { IRepository } from "../../core/abstracts/generic.repository";
import { TaskBusiness } from "../../core/entities/taks.entity";

export class TasksService {
    public constructor(private tasksRepository: IRepository<TaskBusiness.Task>) {}
    
    public async create(input: TaskBusiness.ICreate): Promise<TaskBusiness.Task> {
        const newTask = TaskBusiness.Task.compose(input);
        return this.tasksRepository.create(newTask);
    }

    // public find(id: number): Promise<Task.Model> {
    //     return this.tasksRepository.find(id, Task.Model);
    // }

    public async update(input: TaskBusiness.IUpdate): Promise<TaskBusiness.Task> {
        return this.tasksRepository.update(input); 
    }
}