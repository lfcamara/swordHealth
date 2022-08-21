import { Repository } from "../../repository/data.repository";
import { Task } from "../entities/taks.entity";

export interface IRepository<T> {
    create(item: T): Promise <T>;
    findAll(): Promise<T[]>;
    find(id: string): Promise<T>;
    update(id: string, item: T): Promise<T>;
    delete(id: string): Promise<void>;
}

export class DataRepository {
    tasks(): IRepository<Task> {
        return new Repository<Task>;
    }
}
