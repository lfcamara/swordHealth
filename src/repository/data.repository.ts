import { BaseEntity } from "typeorm";
import { IRepository } from "../core/abstracts/generic.repository";

export class Repository<T extends BaseEntity> implements IRepository<T> {
    async create(item: T): Promise<T> {
        return item.save();
    }
    findAll(): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
    update(id: string, item: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}