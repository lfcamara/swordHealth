import { IRepository } from "../../core/abstracts/generic.repository";
import { Task } from "../../core/entities/taks.entity";

export class TasksService {
    public constructor(private tasksRepository: IRepository<Task.Model>) {}
    
    public async create(input: Task.ICreate): Promise<Task.Model> {
        const newTask = Task.Model.compose(input);
        return this.tasksRepository.create(newTask);
    }

    // public find(id: number): Promise<Task.Model> {
    //     return this.tasksRepository.find(id, Task.Model);
    // }

    // public async update(id: number, input: Task.IUpdate): Promise<Task.Model> {
    //     return this.tasksRepository.update(id, input); 
    // }
}