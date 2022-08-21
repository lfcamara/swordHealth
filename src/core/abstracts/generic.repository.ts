import { EntityRepository } from "../../repository/data.repository";
import { TaskBusiness } from "../entities/taks.entity";
import { UserBusiness } from "../entities/user.entity";

export interface IRepository<T> {
    create(item: T): Promise <T>;
    findAll(): Promise<T[]>;
    find(filters: any): Promise<T>;
    update(input: any);
    delete(id: string): Promise<void>;
}

export class DataRepository {
    tasks(): IRepository<TaskBusiness.Task> {
        return new EntityRepository<TaskBusiness.Task>(TaskBusiness.Task);
    }

    users(): IRepository<UserBusiness.User> {
        return new EntityRepository<UserBusiness.User>(UserBusiness.User);
    }
}
