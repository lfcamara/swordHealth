import { EntityRepository } from "../../repository/data.repository";
import { Task } from "../entities/taks.entity";

export interface IRepository<T> {
    create(item: T): Promise <T>;
    findAll(): Promise<T[]>;
    find(id: number): Promise<T>;
    update(id: number, item: T): Promise<T>;
    delete(id: string): Promise<void>;
}

export class DataRepository {
    tasks(): IRepository<Task.Model> {
        return new EntityRepository<Task.Model>(Task.Model);
    }
}
